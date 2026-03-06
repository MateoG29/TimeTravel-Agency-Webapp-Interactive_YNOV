import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaDir: number;
  trail: { x: number; y: number }[];
}

function useParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      const count = Math.min(Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000), 120);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        trail: [],
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        p.alpha += p.alphaDir * 0.004;
        if (p.alpha >= 0.8 || p.alpha <= 0.15) p.alphaDir *= -1;

        for (let i = 0; i < p.trail.length; i++) {
          const t = p.trail[i];
          const trailAlpha = (i / p.trail.length) * p.alpha * 0.3;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(228, 181, 68, ${trailAlpha})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228, 181, 68, ${p.alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        glow.addColorStop(0, `rgba(228, 181, 68, ${p.alpha * 0.15})`);
        glow.addColorStop(1, 'rgba(228, 181, 68, 0)');
        ctx.fillStyle = glow;
        ctx.fill();
      }

      const connectionDist = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(228, 181, 68, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return canvasRef;
}

export default function Hero() {
  const canvasRef = useParticleCanvas();

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Cosmic background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/60 to-dark-950" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-400/[0.03] blur-[120px] animate-[drift_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-400/[0.02] blur-[100px] animate-[drift_25s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/5 mb-8 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-xs text-gold-300 tracking-[0.2em] uppercase font-medium">
            Voyages temporels depuis 2847
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gold-50 leading-[1.1] tracking-tight mb-6">
          Traversez
          <span className="block text-gold-400 italic mt-1">le Temps</span>
        </h1>

        <p className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Vivez des experiences extraordinaires a travers les epoques les plus
          fascinantes de l'histoire. Le luxe n'a pas de frontiere temporelle.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#destinations"
            onClick={(e) => scrollTo(e, 'destinations')}
            className="group relative px-8 py-3.5 bg-gold-400 text-dark-950 font-medium rounded hover:bg-gold-300 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 tracking-wide">Explorer les Epoques</span>
            <div className="absolute inset-0 bg-gold-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#about"
            onClick={(e) => scrollTo(e, 'about')}
            className="px-8 py-3.5 border border-gold-400/30 text-gold-300 rounded hover:border-gold-400/60 hover:text-gold-200 transition-all duration-300 tracking-wide cursor-pointer"
          >
            Decouvrir l'Agence
          </a>
        </div>
      </div>

      <a
        href="#destinations"
        onClick={(e) => scrollTo(e, 'destinations')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-400/50 hover:text-gold-400 transition-colors duration-300 animate-bounce cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </a>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(30px, -20px); }
          50% { transform: translate(-20px, 30px); }
          75% { transform: translate(20px, 20px); }
        }
      `}</style>
    </section>
  );
}
