"use client";

import { useEffect, useRef } from "react";

interface ConfettiBurstProps {
  trigger?: boolean;
  withSound?: boolean;
}

interface Particle {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  scaleX: number;
  vScale: number;
  opacity: number;
}

const CONFETTI_COLORS = [
  "#10b981", // Emerald
  "#3b82f6", // Blue
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#eab308", // Yellow Gold
];

export function playVictoryFanfare() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    // Triumphant 4-note chord arpeggio: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === notes.length - 1 ? "triangle" : "sine";
      const start = now + idx * 0.1;
      const duration = idx === notes.length - 1 ? 0.6 : 0.25;

      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.22, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    });
  } catch {}
}

export function ConfettiBurst({ trigger = true, withSound = true }: ConfettiBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!trigger) return;

    if (withSound) {
      playVictoryFanfare();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Create 80 confetti particles from center-bottom firing upwards
    const particles: Particle[] = [];
    const count = Math.min(90, Math.floor(width / 12));

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 180) * (230 + Math.random() * 80); // Upward cone
      const speed = 12 + Math.random() * 16;
      particles.push({
        x: width * 0.5 + (Math.random() * 80 - 40),
        y: height * 0.65,
        w: 6 + Math.random() * 7,
        h: 8 + Math.random() * 10,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.4),
        vy: Math.sin(angle) * speed,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        scaleX: 1,
        vScale: (Math.random() - 0.5) * 0.15,
        opacity: 1,
      });
    }

    let animationFrameId: number;
    let startTime: number | null = null;
    const DURATION = 3200; // 3.2 seconds

    const render = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = elapsed / DURATION;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Gravity
        p.vx *= 0.985; // Air resistance
        p.rot += p.vRot;
        p.scaleX += p.vScale;
        if (p.scaleX > 1 || p.scaleX < -1) p.vScale = -p.vScale;

        // Fade out towards the end
        if (progress > 0.6) {
          p.opacity = Math.max(0, 1 - (progress - 0.6) / 0.4);
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.scale(p.scaleX, 1);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < DURATION) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [trigger, withSound]);

  if (!trigger) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
}
