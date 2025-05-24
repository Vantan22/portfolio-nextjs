"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, useInView } from "framer-motion";
import { Facebook, Github, Youtube } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(100, Math.floor(canvas.width / 10));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

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
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-black to-gray-900 py-20"
      id="about"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20"
      />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <div className="px-3 py-1 text-sm bg-purple-900/50 text-purple-200 mb-4 rounded-full inline-block backdrop-blur-sm">
            About Me
          </div>
          <h2 className="mb-4 text-3xl md:text-5xl font-bold tracking-tighter text-white">
            Who I Am
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/CV-photo.jpg"
                alt="Alex Johnson working"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Web Developer with a passion for transforming ideas into
              beautiful, user-friendly websites (and making both users and
              browsers happy).
            </h3>

            <p className="mb-8">
              I specialize in crafting responsive interfaces and digital
              experiences that run smoother than a fresh cup of coffee—no
              caffeine crash included! Armed with React, Next.js, and all the
              shiny tools of the modern web, I love turning Figma dreams into
              pixel-perfect reality. Problem-solving is my daily brain gym, and
              I genuinely enjoy those Agile “plot twists” that keep things
              interesting. I’m always up for learning new tricks, refactoring
              that “one last” component, or sprinkling a bit of Node.js magic on
              the backend when things get spicy. Ready to build something
              awesome together? Bonus points if your team appreciates the
              occasional meme or two along the way!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-bold text-white mb-2">Name</h4>
                <p>Nguyen Van Tan</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-bold text-white mb-2">Email</h4>
                <p>vawntan.dev@gmail.com</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-bold text-white mb-2">Location</h4>
                <p>Ha Noi, Vietnam</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-bold text-white mb-2">Availability</h4>
                <p>Freelance / Full-time</p>
              </div>
            </div>

            <div className="flex gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/80"
                      onClick={() =>
                        window.open("https://github.com/vantan22", "_blank")
                      }
                    >
                      <Github className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/80"
                      onClick={() =>
                        window.open(
                          "https://www.facebook.com/vantan22",
                          "_blank"
                        )
                      }
                    >
                      <Facebook />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Facebook</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/80"
                      onClick={() =>
                        window.open(
                          "https://www.youtube.com/@1977Vlog",
                          "_blank"
                        )
                      }
                    >
                      <Youtube />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Youtube</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
