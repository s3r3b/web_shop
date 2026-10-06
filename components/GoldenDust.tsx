'use client';
import { useEffect, useRef } from 'react';

export default function GoldenDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Track scroll velocity
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      // Apply momentum based on scroll direction and speed
      scrollVelocity = delta * 0.5; // Sensitivity multiplier
      lastScrollY = currentScrollY;
      
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Canvas sizing
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Particle System
    const PARTICLE_COUNT = Math.min(width / 10, 150); // Scale count based on screen width, max 150
    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      baseSpeedY: number;
      opacity: number;
      parallaxFactor: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Depth simulation (parallax layers)
        // 1 = front (fastest, biggest), 0.2 = back (slowest, smallest)
        this.parallaxFactor = Math.random() * 0.8 + 0.2; 
        
        this.size = (Math.random() * 2 + 0.5) * this.parallaxFactor;
        
        // Base drift speed
        this.baseSpeedY = -0.2 - (Math.random() * 0.3);
        this.speedY = this.baseSpeedY;
        this.speedX = (Math.random() - 0.5) * 0.4;
        
        this.opacity = (Math.random() * 0.5 + 0.1) * this.parallaxFactor;
      }

      update() {
        // Apply smooth friction to scroll velocity
        if (!isScrolling) {
          scrollVelocity *= 0.95; // Friction slows it down smoothly
        }

        // Apply scroll force based on depth (front particles move more)
        const currentSpeedY = this.baseSpeedY - (scrollVelocity * this.parallaxFactor * 0.05);
        
        this.y += currentSpeedY;
        this.x += this.speedX + (Math.sin(this.y * 0.01) * 0.2); // Gentle horizontal swaying

        // Wrap around screen
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Init
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
}
