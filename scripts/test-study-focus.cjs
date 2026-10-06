const fs = require('node:fs');
const Module = require('node:module');
const test = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const path = require('node:path');
const cache=new Map();
function loadSource(filename){
  const target=path.resolve(__dirname,'../src',filename);
  if(cache.has(target))return cache.get(target).exports;
  const loaded=new Module(target,module);loaded.filename=target;loaded.paths=module.paths;cache.set(target,loaded);
  loaded.require=id=>id.startsWith('@/')?loadSource(id.slice(2)+'.ts'):id.startsWith('.')?loadSource(path.relative(path.resolve(__dirname,'../src'),path.resolve(path.dirname(target),id))+'.ts'):require(id);
  loaded._compile(ts.transpileModule(fs.readFileSync(target,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,target);
  return loaded.exports;
}
const target = path.resolve(__dirname, '../src/lib/study-focus.ts');
let api = {};
if (fs.existsSync(target)) {
  const code = ts.transpileModule(fs.readFileSync(target, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const loaded = new Module(target, module); loaded.filename = target; loaded.paths = module.paths; loaded._compile(code, target); api = loaded.exports;
}
const catalog = [
  {id:'new',group:'ch1'}, {id:'due-mastered',group:'ch1'}, {id:'future',group:'ch1'},
  {id:'weak',group:'ch1'}, {id:'locked',group:'ch2'}
];
const snapshot = {mastered:['due-mastered','future'],review:['weak','future'],nextReview:{'due-mastered':'2026-10-05',future:'2026-10-09'},unlocked:['ch1']};
test('prioritizes due mastered cards and weak review, excludes future and locked content',()=>{
  assert.equal(typeof api.selectFocusItems,'function');
  assert.deepEqual(api.selectFocusItems(catalog,snapshot,'2026-10-06',10),['due-mastered','weak','new']);
});
test('never schedules the same card twice, including duplicate catalog entries',()=>{
  assert.equal(typeof api.selectFocusItems,'function');
  assert.deepEqual(api.selectFocusItems([...catalog,catalog[0]],snapshot,'2026-10-06',2),['due-mastered','weak']);
});
test('does not reopen future-only mastered content as new material',()=>{
  assert.equal(typeof api.selectFocusItems,'function');
  assert.deepEqual(api.selectFocusItems([{id:'future',group:'ch1'}],snapshot,'2026-10-06',10),[]);
});
test('an empty review queue selects only unmastered unlocked content',()=>{
  assert.equal(typeof api.selectFocusItems,'function');
  assert.deepEqual(api.selectFocusItems(catalog,{mastered:['new'],review:[],unlocked:['ch1']},'2026-10-06',2),['due-mastered','future']);
});
test('committing the expected item advances the cursor once and preserves outcomes',()=>{
  assert.equal(typeof api.createFocusSession,'function');
  const session=api.createFocusSession('tango',['new','weak'],123);
  const updated=api.commitFocusAnswer(session,'new','mastered');
  assert.equal(updated.cursor,1); assert.equal(updated.results[0].rating,'mastered');
  assert.equal(api.commitFocusAnswer(updated,'new','forgot'),updated);
  assert.equal(session.cursor,0);
});
test('last answer marks session complete, further submissions have no effect',()=>{
  assert.equal(typeof api.createFocusSession,'function');
  const updated=api.commitFocusAnswer(api.createFocusSession('fe',['new'],123),'new','forgot');
  assert.equal(updated.completed,true); assert.equal(updated.cursor,1);
  assert.equal(api.commitFocusAnswer(updated,'new','mastered'),updated);
});
test('resumes an unfinished cursor and outcomes through persistence without changing other progress',()=>{
  assert.equal(typeof api.saveFocusSession,'function');
  const map=new Map([['kaidevlab_tango_n3_progress_v1','keep-me']]);
  const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};
  const state=api.commitFocusAnswer(api.createFocusSession('tango',['new','weak'],123),'new','unsure');
  assert.equal(api.saveFocusSession(state,storage),true);
  const restored=api.loadFocusSession(storage); assert.equal(restored.cursor,1); assert.equal(restored.results[0].rating,'unsure');
  assert.equal(map.get('kaidevlab_tango_n3_progress_v1'),'keep-me');
});
test('rejects corrupt, oversize, foreign track and inconsistent cursor snapshots',()=>{
  assert.equal(typeof api.loadFocusSession,'function');
  const valid=api.createFocusSession('tango',['new','weak'],123);
  for(const state of ['broken',{...valid,track:'https://evil.invalid'},{...valid,cursor:20},{...valid,itemIds:['new','new']},{...valid,cursor:1,results:[]},{...valid,itemIds:Array.from({length:99},(_,i)=>`id${i}`)}]){
    assert.equal(api.loadFocusSession({getItem:()=>typeof state==='string'?state:JSON.stringify(state)}),null);
  }
});
test('storage failure is reported and safe to read',()=>{
  assert.equal(typeof api.saveFocusSession,'function');
  const blocked={getItem(){throw Error('blocked')},setItem(){throw Error('quota')}};
  assert.equal(api.saveFocusSession(api.createFocusSession('tango',['new'],123),blocked),false);
  assert.equal(api.loadFocusSession(blocked),null);
});
test('validates resumed IDs against the available catalog before showing content',()=>{
  assert.equal(typeof api.isSessionAvailable,'function');
  assert.equal(api.isSessionAvailable(api.createFocusSession('tango',['removed'],123),catalog),false);
  assert.equal(api.isSessionAvailable(api.createFocusSession('tango',['new'],123),catalog),true);
});
test('keeps checked grammar answers across reload without advancing the unfinished pattern',()=>{
  assert.equal(typeof api.commitFocusQuestion,'function');
  const map=new Map(); const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};
  const checked=api.commitFocusQuestion(api.createFocusSession('bunpou',['pattern1'],123),'question1',{choice:'2',correct:false});
  api.saveFocusSession(checked,storage);
  const resumed=api.loadFocusSession(storage); assert.equal(resumed.cursor,0); assert.equal(resumed.answers.question1.choice,'2');
  assert.equal(api.commitFocusQuestion(checked,'question1',{choice:'1',correct:true}),checked);
});
test('incorrect grammar or reading answers remain in review after completion and leave after correction',()=>{
  const exercises=[{id:'pattern1',questions:[{id:'q1'},{id:'q2'}]},{id:'pattern2',questions:[{id:'q3'}]}];
  assert.deepEqual(api.getExerciseReviewIds(exercises,{q1:{isCorrect:false},q2:{isCorrect:true}},['pattern2']),['pattern2','pattern1']);
  assert.deepEqual(api.getExerciseReviewIds(exercises,{q1:{isCorrect:true},q2:{isCorrect:true}},['pattern2']),['pattern2']);
});
test('resume rejects remaining locked content while allowing already completed locked cards',()=>{
  const session=api.createFocusSession('tango',['new','locked'],123);
  assert.equal(api.isSessionAvailable(session,catalog,['ch1']),false);
  const answered=api.commitFocusAnswer(api.createFocusSession('tango',['locked','new'],123),'locked','mastered');
  assert.equal(api.isSessionAvailable(answered,catalog,['ch1']),true);
});
test('real card adapter refuses to advance when original progress write fails but session storage works',()=>{
  const map=new Map(); const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>{if(k==='kaidevlab_tango_n3_progress_v1')throw Error('quota');map.set(k,v);}};
  global.window={localStorage:storage,dispatchEvent(){}};global.localStorage=storage;
  const previousError=console.error;console.error=()=>{};
  try{
    const adapter=loadSource('lib/study-focus-data.ts');
    assert.equal(adapter.recordFocusCard('tango','tango-0001','mastered'),false);
    assert.equal(api.saveFocusSession(api.createFocusSession('tango',['tango-0001'],123),storage),true);
    assert.equal(map.has('kaidevlab_tango_n3_progress_v1'),false);
  }finally{console.error=previousError;delete global.window;delete global.localStorage;}
});
test('real adapters preserve wrong-answer review, bookmarks, and original progress while reporting blocked writes',()=>{
  const map=new Map();let rejectedKey='';
  const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>{if(k===rejectedKey)throw Error('quota');map.set(k,v);}};
  global.window={localStorage:storage,dispatchEvent(){}};global.localStorage=storage;
  const previousError=console.error;console.error=()=>{};
  try{
    const adapter=loadSource('lib/study-focus-data.ts');
    const pattern=loadSource('data/bunpou-n3/grammar-items.ts').BUNPOU_ITEMS[0];
    const passage=loadSource('data/dokkai-n3/passages.ts').DOKKAI_PASSAGES[0];
    assert.equal(adapter.recordFocusQuestion('bunpou',pattern.id,pattern.questions[0].id,{order:[3,2,1,0],correct:false},true),true);
    assert.equal(adapter.planFocusSession('bunpou').itemIds[0],pattern.id);
    assert.equal(adapter.recordFocusQuestion('dokkai',passage.id,passage.questions[0].id,{choice:'2',correct:false},true),true);
    assert.equal(adapter.planFocusSession('dokkai').itemIds[0],passage.id);
    const fe=loadSource('data/fe-study-data.ts').FE_CARDS[0];
    assert.equal(adapter.recordFocusCard('fe',fe.id,'mastered'),true);
    const feStore=loadSource('lib/fe-study-storage.ts');feStore.toggleStarCard(fe.id);
    assert.equal(adapter.planFocusSession('fe').itemIds[0],fe.id);
    for(const [track,key] of [['fe','kaidevlab_fe_study_progress_v1'],['bunpou','kaidevlab_bunpou_n3_progress_v1'],['dokkai','kaidevlab_dokkai_n3_progress_v1']]){
      rejectedKey=key;const before=map.get(key);
      const saved=track==='fe'?adapter.recordFocusCard('fe',fe.id,'forgot'):adapter.recordFocusQuestion(track,track==='bunpou'?pattern.id:passage.id,track==='bunpou'?pattern.questions[0].id:passage.questions[0].id,{choice:'1',correct:true},true);
      assert.equal(saved,false);assert.equal(map.get(key),before);
    }
  }finally{console.error=previousError;delete global.window;delete global.localStorage;}
});
