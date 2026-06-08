"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
}

interface Connection {
  from: number;
  to: number;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let nodes: Node[] = [];
    let connections: Connection[] = [];
    const NODE_COUNT = 80;
    const MAX_DIST = 180;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse interaction
    let mouse = { x: -9999, y: -9999 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep black background
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Subtle mouse repulsion
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          node.x += (dx / dist) * 0.8;
          node.y += (dy / dist) * 0.8;
        }
      });

      // Build connections (spider web lines)
      connections = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            connections.push({ from: i, to: j });
          }
        }
      }

      // Draw web lines
      connections.forEach(({ from, to }) => {
        const a = nodes[from];
        const b = nodes[to];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Proximity-based opacity — closer = more visible
        const opacity = Math.pow(1 - dist / MAX_DIST, 2) * 0.75;

        // Pulse along the line
        const pulse = Math.sin(frame * 0.015 + a.pulseOffset) * 0.5 + 0.5;

        // Main web line — deep crimson red
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(180, 10, 20, ${opacity * 0.85})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Glowing highlight on closer lines
        if (opacity > 0.35) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          const glowOpacity = (opacity - 0.35) * pulse * 0.6;
          ctx.strokeStyle = `rgba(255, 40, 50, ${glowOpacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Energy pulse travelling along the line
        if (opacity > 0.5 && frame % 3 === 0) {
          const t = ((frame * 0.008 + a.pulseOffset) % 1 + 1) % 1;
          const px = a.x + (b.x - a.x) * t;
          const py = a.y + (b.y - a.y) * t;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 80, 80, ${opacity * 0.9})`;
          ctx.fill();
        }
      });

      // Draw nodes (web junction dots)
      nodes.forEach((node, i) => {
        const pulse = Math.sin(frame * 0.02 + node.pulseOffset) * 0.5 + 0.5;

        // Count connections for this node — busier hubs glow brighter
        const hubCount = connections.filter(
          (c) => c.from === i || c.to === i
        ).length;
        const isHub = hubCount >= 4;

        // Outer glow
        const glowRadius = node.radius * (isHub ? 5 : 3) * (0.8 + pulse * 0.4);
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        gradient.addColorStop(0, `rgba(220, 20, 30, ${isHub ? 0.55 : 0.35})`);
        gradient.addColorStop(1, "rgba(180, 10, 20, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (isHub ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fillStyle = isHub
          ? `rgba(255, 60, 60, ${0.8 + pulse * 0.2})`
          : `rgba(200, 30, 30, ${0.6 + pulse * 0.3})`;
        ctx.fill();
      });

      // Subtle red vignette at the very edges
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.height
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(60,0,0,0.35)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
