import { useEffect, useRef } from 'react';

const MorphingParticles = ({ color = 'rgba(255, 26, 26, 0.05)', count = 3 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Get parent bounds
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Watch for parent resize via ResizeObserver to ensure absolute precision
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    class Blob {
      constructor(w, h) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Large soft size
        this.radius = Math.random() * 100 + 100;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        
        // Morphing parameters
        this.points = [];
        this.pointCount = 8;
        this.angleStep = (Math.PI * 2) / this.pointCount;
        this.time = Math.random() * 100;
        this.speed = Math.random() * 0.01 + 0.005;

        for (let i = 0; i < this.pointCount; i++) {
          this.points.push({
            x: Math.cos(i * this.angleStep),
            y: Math.sin(i * this.angleStep),
            offset: Math.random() * 30 + 10
          });
        }
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        // Keep inside bounds
        if (this.x < -this.radius) this.x = w + this.radius;
        if (this.x > w + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = h + this.radius;
        if (this.y > h + this.radius) this.y = -this.radius;

        this.time += this.speed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.beginPath();
        
        // Calculate points with sine morphs
        const drawPoints = [];
        for (let i = 0; i < this.pointCount; i++) {
          const p = this.points[i];
          // Overlapping sine waves for complex fluid deformation
          const deformation = Math.sin(this.time + i * 1.5) * Math.cos(this.time * 0.8 + i) * p.offset;
          const currentRadius = this.radius + deformation;
          
          drawPoints.push({
            x: Math.cos(i * this.angleStep) * currentRadius,
            y: Math.sin(i * this.angleStep) * currentRadius
          });
        }

        // Draw bezier curve through points
        ctx.moveTo(drawPoints[0].x, drawPoints[0].y);
        for (let i = 0; i < this.pointCount; i++) {
          const nextIndex = (i + 1) % this.pointCount;
          const xc = (drawPoints[i].x + drawPoints[nextIndex].x) / 2;
          const yc = (drawPoints[i].y + drawPoints[nextIndex].y) / 2;
          ctx.quadraticCurveTo(drawPoints[i].x, drawPoints[i].y, xc, yc);
        }

        ctx.closePath();

        // Create gradient fill with safe radial overshoot to ensure soft edges
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 1.5);
        grad.addColorStop(0, color);
        grad.addColorStop(0.4, color.replace(/[\d.]+\)$/, '0.015)'));
        grad.addColorStop(0.7, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
    }

    const blobs = [];
    for (let i = 0; i < count; i++) {
      blobs.push(new Blob(canvas.width, canvas.height));
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render blobs
      blobs.forEach(b => {
        b.update(canvas.width, canvas.height);
        b.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
    };
  }, [color, count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
      }}
    />
  );
};

export default MorphingParticles;
