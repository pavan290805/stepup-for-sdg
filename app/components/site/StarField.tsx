"use client";

import { useEffect, useRef } from "react";

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.6 + 0.3,
      speed: Math.random() * 0.008 + 0.002,
      offset: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      t += 0.012;

      // Background
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#07111f");
      bg.addColorStop(0.4, "#0b1a2e");
      bg.addColorStop(0.7, "#0e2038");
      bg.addColorStop(1, "#07111f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Nebula glow
      const neb = ctx.createRadialGradient(w * 0.35, h * 0.75, 0, w * 0.35, h * 0.75, w * 0.45);
      neb.addColorStop(0, "rgba(30, 80, 200, 0.22)");
      neb.addColorStop(0.5, "rgba(20, 50, 160, 0.12)");
      neb.addColorStop(1, "transparent");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, w, h);

      const neb2 = ctx.createRadialGradient(w * 0.2, h * 0.85, 0, w * 0.2, h * 0.85, w * 0.3);
      neb2.addColorStop(0, "rgba(40, 100, 220, 0.15)");
      neb2.addColorStop(1, "transparent");
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, w, h);

      // Draw stars
      stars.forEach((s) => {
        const twinkle = Math.sin(t * s.speed * 60 + s.offset) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha * twinkle})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  );
}
