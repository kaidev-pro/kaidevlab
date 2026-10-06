const fs=require('node:fs');
const Module=require('node:module');
const path=require('node:path');
const ts=require('typescript');
const test=require('node:test');
const assert=require('node:assert/strict');
const target=path.resolve(__dirname,'../src/lib/study-routes.ts');
let api={};
if(fs.existsSync(target)){
  const loaded=new Module(target,module);loaded.filename=target;loaded.paths=module.paths;
  loaded._compile(ts.transpileModule(fs.readFileSync(target,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,target);api=loaded.exports;
}
test('recognizes each original study tool and its sidebar group',()=>{
  for(const [route,group] of [['tango-n3','n3'],['bunpou-n3','n3'],['dokkai-n3','n3'],['n3-suite','n3'],['fe-study','fe'],['library','tools']]){
    assert.equal(api.getStudyRoute(`/tools/${route}/`).group,group);
    assert.equal(api.getStudyRoute(`/tools/${route}`).href,`/tools/${route}/`);
  }
});
test('does not apply study module chrome to portfolio or similarly named unknown routes',()=>{
  for(const route of ['/','/work/','/about/','/tools/tango/','/tools/tango-n3-other/','/learn/focus/'])assert.equal(api.getStudyRoute(route),null);
});
