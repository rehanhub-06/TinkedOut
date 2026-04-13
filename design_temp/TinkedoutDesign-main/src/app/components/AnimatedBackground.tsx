import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  opacityDir: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Layer 1 — Floating orbs
    const orbColors = [
      "255,106,61",    // accent orange
      "120,60,200",    // deep purple
      "80,100,220",    // blue-violet
      "200,80,120",    // rose
    ];

    const orbs: Orb[] = orbColors.map((color, i) => ({
      x: W * (0.15 + (i * 0.25)),
      y: H * (0.2 + Math.random() * 0.6),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 200 + Math.random() * 200,
      color,
      opacity: 0.04 + Math.random() * 0.06,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      phase: Math.random() * Math.PI * 2,
    }));

    // Layer 2 — Particles
    const PARTICLE_COUNT = 100;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 1.5 + Math.random() * 1,
      opacity: 0.15 + Math.random() * 0.2,
    }));

    let t = 0;

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, W, H);

      // Background fill
      ctx.fillStyle = "#0F1115";
      ctx.fillRect(0, 0, W, H);

      // LAYER 1 — Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges with padding
        if (orb.x < -orb.radius) orb.x = W + orb.radius;
        if (orb.x > W + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = H + orb.radius;
        if (orb.y > H + orb.radius) orb.y = -orb.radius;

        // Pulse opacity
        orb.opacity += orb.opacityDir * 0.0003;
        if (orb.opacity > 0.12 || orb.opacity < 0.04) orb.opacityDir *= -1;

        const pulsedOpacity = orb.opacity + Math.sin(t + orb.phase) * 0.02;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `rgba(${orb.color},${pulsedOpacity})`);
        grad.addColorStop(1, `rgba(${orb.color},0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // LAYER 2 — Particle mesh
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const lineOpacity = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,255,255,${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      // LAYER 3 — Subtle scanline shimmer
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = `rgba(0,0,0,${0.015 + (y % 8 === 0 ? 0.01 : 0)})`;
        ctx.fillRect(0, y, W, 1);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.9,
      }}
    />
  );
}
