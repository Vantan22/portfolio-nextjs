"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ExperienceTimeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const experiences = [
    {
      id: 1,
      role: "Intern Front-End Developer",
      company: "CMC Global",
      period: "12/2022 - 03/2023",
      description:
        "Lead a team of interns to develop a test project from scratch, managed task assignment and code reviews, directly contributed to building key front-end components, and ensured project delivery on schedule while learning and applying modern front-end workflows.",
      achievements: [
        "Developed 5+ UI features for user management module",
        "Wrote component usage guides for the team",
        "Supported CSS optimization to enhance mobile experience",
        "Collaborated with the front-end team to build reusable components",
        "Learned modern development workflows",
      ],
      technologies: ["React", "JavaScript", "SCSS", "Vue.js"],
    },
    {
      id: 2,
      role: "Software Engineer / Front-End Developer",
      company: "CMC Global | SamSung SDS",
      period: "04/2023 - 01/2024",
      description:
        "Contributed to two large-scale projects: a business analytics platform (React.js) and a customer management portal (Vue.js). Developed responsive web applications, collaborated closely with UI/UX designers to deliver pixel-perfect interfaces, and ensured cross-browser compatibility. Took ownership of key features and regularly participated in team code reviews.",
      achievements: [
        "Collaborated closely with the design team to turn complex UI/UX concepts into high-quality, user-friendly interfaces",
        "Developed and maintained reusable component libraries for both React and Vue projects",
        "Implemented advanced state management and optimized front-end performance for scalability",
        "Actively participated in Agile Scrum processes: sprint planning, daily stand-ups, and product demos",
        "Delivered key product features on schedule, contributing directly to client satisfaction",
        "Facilitated knowledge sharing sessions to help upskill team members in modern front-end technologies",
      ],

      technologies: ["React", "Vue.js", "JavaScript", "SCSS"],
    },
    {
      id: 3,
      role: "Freelance Website Developer",
      company: "Freelance",
      period: "01/2024 - Present",
      description:
        "Worked as a freelance developer handling diverse client projects remotely. Delivered end-to-end website solutions, focusing on user experience, performance, and modern visual design. Proactively learned and applied Next.js and Node.js to upgrade project architecture and expand backend capabilities.",
      achievements: [
        "Designed and developed 4+ client websites for businesses in various sectors",
        "Built several full-stack web applications using Next.js and Node.js",
        "Implemented mobile-first responsive design and modern UI/UX best practices",
        "Optimized websites for SEO, performance, and Core Web Vitals",
        "Managed project communication, requirements gathering, and delivery independently",
      ],
      technologies: [
        "Next.js",
        "Node.js",
        "Tailwind CSS",
        "TypeScript",
        "React",
        "SCSS",
        "CSS",
      ],
    },
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
      className="relative py-20 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden"
      id="experience"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="px-3 py-1 text-sm bg-purple-900/50 text-purple-200 mb-4 rounded-full inline-block backdrop-blur-sm">
            Experience
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Work History
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {experiences.reverse().map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="flex-1">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {experience.role}
                    </h3>
                    <Badge className="mt-2 md:mt-0 w-fit md:ml-auto bg-purple-900/50 text-purple-200">
                      {experience.period}
                    </Badge>
                  </div>

                  <h4 className="text-lg font-medium text-purple-400 mb-4">
                    {experience.company}
                  </h4>

                  <p className="text-gray-300 mb-4">{experience.description}</p>

                  <h5 className="font-medium text-white mb-2">
                    Key Achievements:
                  </h5>
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-purple-200 border-purple-500"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
