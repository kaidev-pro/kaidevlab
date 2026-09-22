"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const particles = [[13, 28, 0], [27, 76, -2.4], [45, 16, -4.2], [61, 67, -1.1], [78, 24, -3.2], [91, 73, -5.1]];
const clamp = (value: number, min = -1, max = 1) => Math.min(max, Math.max(min, value));

export function KaiParallaxHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [motionOn, setMotionOn] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreferences = () => {
      setIsTouch(coarse.matches);
      if (reduced.matches) setMotionOn(false);
    };
    syncPreferences();
    coarse.addEventListener("change", syncPreferences);
    reduced.addEventListener("change", syncPreferences);
    return () => {
      coarse.removeEventListener("change", syncPreferences);
      reduced.removeEventListener("change", syncPreferences);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !motionOn || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-kai-depth]"));
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const maxTravel = isTouch ? 12 : 34;
    const easing = isTouch ? 0.085 : 0.13;
    let frame = 0;
    let visible = false;
    let dragging = false;

    const render = (time = 0) => {
      if (isTouch && !dragging) {
        target.x = Math.sin(time * 0.00025) * 0.1;
        target.y = Math.cos(time * 0.00019) * 0.055;
      }
      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.kaiDepth || 0);
        const x = -current.x * maxTravel * depth;
        const y = -current.y * maxTravel * depth * 0.48;
        layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });
      if (visible) frame = window.requestAnimationFrame(render);
    };
    const start = () => { if (!frame && visible) frame = window.requestAnimationFrame(render); };
    const stop = () => { window.cancelAnimationFrame(frame); frame = 0; };
    const reset = () => { target.x = 0; target.y = 0; };
    const pointerInput = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch" && !dragging) return;
      const bounds = stage.getBoundingClientRect();
      target.x = clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
      target.y = clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
    };
    const pointerDown = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "touch") return;
      dragging = true;
      stage.setPointerCapture?.(event.pointerId);
      pointerInput(event);
    };
    const pointerUp = (event: globalThis.PointerEvent) => {
      dragging = false;
      if (stage.hasPointerCapture?.(event.pointerId)) stage.releasePointerCapture(event.pointerId);
      reset();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0.05 });

    observer.observe(stage);
    stage.addEventListener("pointermove", pointerInput);
    stage.addEventListener("pointerdown", pointerDown);
    stage.addEventListener("pointerup", pointerUp);
    stage.addEventListener("pointercancel", pointerUp);
    stage.addEventListener("pointerleave", reset);
    return () => {
      stop();
      observer.disconnect();
      stage.removeEventListener("pointermove", pointerInput);
      stage.removeEventListener("pointerdown", pointerDown);
      stage.removeEventListener("pointerup", pointerUp);
      stage.removeEventListener("pointercancel", pointerUp);
      stage.removeEventListener("pointerleave", reset);
      layers.forEach((layer) => { layer.style.transform = ""; });
    };
  }, [isTouch, motionOn]);

  return (
    <div ref={stageRef} className="cinematic-hero" aria-label="Interactive cinematic portrait of Kai">
      <div className="cinematic-layer cinematic-background" data-kai-depth="0.12" aria-hidden="true">
        <Image src="/media/kai-cinematic/studio-background-final.png" alt="" fill priority sizes="100vw" />
      </div>
      <div className="cinematic-layer cinematic-light-arc" data-kai-depth="0.28" aria-hidden="true"><i /><i /></div>
      <div className="cinematic-layer cinematic-atmosphere" data-kai-depth="0.36" aria-hidden="true"><i /><i /><i /></div>
      <div className="cinematic-layer cinematic-kai" data-kai-depth="0.7">
        <div className="cinematic-kai-halo" aria-hidden="true" />
        <picture>
          <source media="(max-width: 820px)" srcSet="/media/kai-cinematic/kai-portrait-mobile.png" />
          <Image src="/media/kai-cinematic/kai-portrait-final.png" alt="Kai, creative technologist and independent builder" fill priority sizes="(max-width: 820px) 95vw, 66vw" />
        </picture>
        <span className="cinematic-pendant-glint" aria-hidden="true" />
      </div>
      <div className="cinematic-layer cinematic-reflections" data-kai-depth="1.02" aria-hidden="true"><i /><i /></div>
      <div className="cinematic-layer cinematic-particles" data-kai-depth="1.34" aria-hidden="true">
        {particles.map(([left, top, delay], index) => (
          <i key={index} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }} />
        ))}
      </div>
      <div className="cinematic-scrim" aria-hidden="true" />

      <div className="cinematic-copy hero-reveal">
        <p className="eyebrow">Creative Technologist &amp; Independent Builder</p>
        <h1>Building products, systems, and stories at the intersection of <em>AI, code, and creativity.</em></h1>
        <p className="lead">I turn ideas into digital products, intelligent systems, and meaningful creative experiences.</p>
        <div className="cinematic-actions">
          <a className="primary" href="#work">Explore My Work</a>
          <a className="secondary" href="#about">Meet Kai</a>
        </div>
        <p className="meta">
          Based in Japan · Building independently · <a href="https://x.com/Kiminoheroo" target="_blank" rel="noreferrer" style={{ color: "var(--brand-primary)", textDecoration: "underline", textUnderlineOffset: "3px" }}>@Kiminoheroo on X ↗</a>
        </p>
      </div>
    </div>
  );
}
