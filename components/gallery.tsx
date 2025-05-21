"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const skills = [
    "React",
    "Next.js",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "SCSS/SASS",
    "Node.js",
    "MongoDB",
    "Git",
    "Figma",
    "Photoshop",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > (canvas?.width || 0)) this.x = 0;
        if (this.x < 0) this.x = canvas?.width || 0;
        if (this.y > (canvas?.height || 0)) this.y = 0;
        if (this.y < 0) this.y = canvas?.height || 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas?.width || 0) / 8), 150);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950"
      id="skills"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="px-3 py-1 text-sm bg-purple-900/50 text-purple-200 mb-4 rounded-full inline-block backdrop-blur-sm">
            Professional Skills
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Technical Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              className="group perspective"
            >
              <div className="relative transform-gpu transition-all duration-500 group-hover:rotate-y-180">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg blur-xl group-hover:scale-110 transition-all duration-500" />
                <Badge
                  className="w-full h-full px-6 py-3 text-base font-medium bg-gray-800/80 text-purple-200 border-2 border-purple-500/30 rounded-lg backdrop-blur-sm
                  hover:bg-purple-900/50 hover:border-purple-400 transition-all duration-500
                  flex items-center justify-center shadow-lg hover:shadow-purple-500/20"
                >
                  {skill}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
