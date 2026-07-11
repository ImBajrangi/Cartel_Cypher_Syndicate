import { useEffect, useRef } from 'react';

const CyberBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (ref structure to bypass React state updates)
    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    // Tunnel segments
    const segmentCount = 20;
    const segments = [];

    // Initialize segments at deep Z depth
    for (let i = 0; i < segmentCount; i++) {
      segments.push({
        z: (i / segmentCount) * 100, // Z depth percentage (0 to 100)
        color: 'rgba(255, 26, 26, 0.08)',
      });
    }

    const handleMouseMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      mouse.tx = width / 2;
      mouse.ty = height / 2;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Clear screen
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse coordinates (inertia delay for elegant movement)
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      const centerX = width / 2;
      const centerY = height / 2;

      // 3D perspective shifts based on cursor coordinates
      const offsetX = (mouse.x - centerX) * 0.2;
      const offsetY = (mouse.y - centerY) * 0.2;

      // Render concentric 3D perspective tunnel grids
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];

        // Move segment closer
        seg.z -= 0.18; // Speed of travel forward

        // Reset segment if it goes past the screen
        if (seg.z <= 0) {
          seg.z = 100;
        }

        // Project Z coordinate into 3D scale factor (Perspective Division)
        const scale = 150 / (seg.z + 1);

        // Coordinates of center for this Z depth segment
        const cx = centerX + offsetX * (1 - seg.z / 100);
        const cy = centerY + offsetY * (1 - seg.z / 100);

        // Square/rect dimensions
        const sizeW = width * scale * 0.8;
        const sizeH = height * scale * 0.8;

        // Fading opacity based on Z depth
        const opacity = Math.min(0.09, (100 - seg.z) * 0.0015);
        ctx.strokeStyle = `rgba(255, 26, 26, ${opacity})`;
        ctx.lineWidth = Math.max(0.5, scale * 0.4);

        // Draw perspective grid segment
        ctx.strokeRect(cx - sizeW / 2, cy - sizeH / 2, sizeW, sizeH);

        // Draw connecting corner rails
        if (i === segments.length - 1) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 26, 26, 0.02)';
          ctx.lineWidth = 0.5;
          // Connect corners to center projection
          const corners = [
            [-sizeW / 2, -sizeH / 2],
            [sizeW / 2, -sizeH / 2],
            [sizeW / 2, sizeH / 2],
            [-sizeW / 2, sizeH / 2],
          ];
          corners.forEach(([x, y]) => {
            ctx.beginPath();
            ctx.moveTo(cx + x, cy + y);
            ctx.lineTo(centerX + offsetX, centerY + offsetY);
            ctx.stroke();
          });
        }
      }

      // Render a soft spotlight glow behind sections
      const spotlight = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 500
      );
      // Soft color stops fading completely to transparent to avoid hard edges
      spotlight.addColorStop(0, 'rgba(255, 26, 26, 0.03)');
      spotlight.addColorStop(0.4, 'rgba(255, 26, 26, 0.01)');
      spotlight.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
      spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CyberBackground;
