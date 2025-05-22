"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useRef, useState } from "react";
const projects = [
  {
    id: 2,
    year: "2023",
    title: "Sally",
    description:
      "Digital Transformation Assessment tool for customer data collection and digital readiness evaluation.",
    longDescription:
      "Contributed to building a digital transformation assessment (DTA) tool that provides simple surveys and delivers instant assessment results. The system supports marketing campaigns, customer data collection, and management.",
    technologies: ["Java", "Spring Webflux", "MongoDB", "Vue.js"],
    image: "/projects/sally-dta.jpg",
    siteLink: "https://sally.coach",
    githubLink: null,
    achievements: [
      "Proactively proposed and implemented new features based on user needs and product goals.",
      "Contributed to front-end architecture design and ensured efficient, coherent data flows.",
      "Directly developed and optimized core functionalities and user interfaces.",
      "Actively participated in code reviews, enhancing product quality and standardizing team workflows.",
      "Collaborated seamlessly with backend, QA, and design teams to ensure on-time project delivery.",
    ],
    features: [
      "User-friendly digital transformation surveys",
      "Instant customer assessment results",
      "Customer data management and segmentation",
      "Admin dashboard for campaign tracking",
      "Marketing integration: notifications and emails",
      "User role and permission management",
    ],
  },
  {
    id: 3,
    year: "2023",
    title: "Monoly",
    description:
      "A secure platform for business task management, group discussions, e-signatures, and file sharing.",
    longDescription:
      "Monoly is a multi-functional application for enterprise users, offering streamlined task management, multi-party group communication, secure electronic document signing, and safe file sharing. The platform enhances communication efficiency, reduces security risks, and optimizes modern workflow processes.",
    technologies: [
      "Javascript",
      "React.js",
      "Redux",
      "Material-UI",
      "Web Socket",
    ],
    image: "/projects/monoly.jpg",
    siteLink: "https://monoly.com/",
    githubLink: null,
    achievements: [
      "Developed and maintained core features, ensuring the stability and scalability of the platform.",
      "Proactively identified and resolved complex bugs within a large codebase, improving product quality.",
      "Suggested UX enhancements and participated in regular code reviews.",
      "Collaborated effectively in an Agile Scrum team, meeting sprint deadlines and supporting teammates.",
      "Continually updated skills in React, Redux, and real-time communication security best practices.",
    ],
    features: [
      "Multi-party group chat and discussions",
      "Task management with permissions and progress tracking",
      "Secure electronic document signing",
      "Safe file sharing with access control",
      "Real-time notifications via WebSocket",
      "Enterprise-grade document storage",
    ],
  },
  {
    id: 1,
    year: "2024",
    title: "May Bom Vu Anh",
    description:
      "Warehouse management app for pumps with serial scanning, stock operations, product verification, and warranty activation.",
    longDescription:
      "Developed a specialized warehouse management system for the pump industry, featuring advanced serial number scanning, real-time inventory updates, automated reporting, product categorization by specification, and robust product warranty management and activation. The app minimizes manual errors, streamlines warehouse processes, and enhances after-sales service quality.",
    technologies: ["Javascript", "Go", "Next.js", "SQL", "Tailwind CSS"],
    siteLink: "https://maybomvuanh.com/he-thong/san-pham",
    githubLink: null,
    achievements: [
      "Implemented full workflow for importing, exporting, and verifying stock via serial code scanning.",
      "Integrated product warranty management and activation for end-users.",
      "Automated inventory reporting and product categorization processes.",
      "Reduced manual data entry errors, improving operational accuracy and warehouse productivity.",
    ],
    features: [
      "Serial code scanning for stock entry",
      "Exporting products to distributor agents",
      "Stock verification and product lookup",
      "Product warranty activation and management",
      "Automated inventory reporting",
      "Product categorization by technical specifications",
      "User-friendly interface",
    ],
  },
  {
    id: 7,
    year: "2024",
    title: "Huyndai Vinh Yen Website",
    description:
      "Website doanh nghiệp Hyundai Vĩnh Yên, cung cấp thông tin showroom, dịch vụ và bảo hành.",
    longDescription:
      "Xây dựng giao diện website cho Hyundai Vĩnh Yên, nhấn mạnh hình ảnh showroom, thông tin dịch vụ, bảo dưỡng và các gói bảo hành chính hãng. Giao diện chuyên nghiệp, đúng chuẩn nhận diện thương hiệu Hyundai toàn cầu 3S.",
    technologies: ["Javascript", "HTML", "CSS"],
    image: "/projects/hyundai-vinhyen.jpg",
    siteLink: "https://hyundaivinhyen.com.vn/",
    githubLink: null,
    achievements: [
      "Phát triển website chuẩn branding, tối ưu cho khách hàng doanh nghiệp.",
      "Đảm bảo đồng nhất hình ảnh thương hiệu và trải nghiệm người dùng.",
      "Tối ưu website về tốc độ và khả năng truy cập thông tin dễ dàng.",
    ],
    features: [
      "Đồng bộ nhận diện thương hiệu Hyundai",
      "Giới thiệu chi tiết dịch vụ và gói bảo hành",
      "Thông tin showroom và đội ngũ",
      "Form liên hệ & yêu cầu tư vấn",
      "Giao diện responsive, thân thiện",
    ],
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-black"
      id="projects"
    >
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="px-3 py-1 text-sm bg-purple-900/50 text-purple-200 mb-4 rounded-full inline-block backdrop-blur-sm">
            Projects
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Project Highlights
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto space-x-6 pb-8 cursor-grab no-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-none w-[300px] md:w-[400px]"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <Badge className="bg-purple-900/70 text-purple-200 mb-4">
                    {project.year}
                  </Badge>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-purple-200 border-purple-500"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-purple-200 border-purple-500"
                      >
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      {project.siteLink && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            window.open(project.siteLink || "", "_blank")
                          }
                        >
                          <ExternalLink size={14} className="mr-2" />
                          Visit Live Site
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            window.open(project.githubLink || "", "_blank")
                          }
                        >
                          <Github size={14} className="mr-2" />
                          View Source Code
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                      className="w-full bg-purple-900/70 text-purple-200 hover:bg-purple-900/80 border-purple-500 hover:border-purple-400 hover:text-purple-200"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          {selectedProject && (
            <DialogContent className="w-full max-w-4xl bg-gray-900 text-white overflow-y-auto max-h-[90vh] p-4 md:p-8">
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Overview</h4>
                    <p className="text-gray-300 text-sm md:text-base">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
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

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-gray-300 text-sm md:text-base space-y-1">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedProject.achievements.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        Achievements
                      </h4>
                      <ul className="list-disc list-inside text-gray-300 text-sm md:text-base space-y-1">
                        {selectedProject.achievements.map(
                          (achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-3">
                {selectedProject.siteLink && (
                  <Button
                    variant="secondary"
                    className="w-full md:w-auto"
                    onClick={() =>
                      window.open(selectedProject.siteLink, "_blank")
                    }
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Visit Live Site
                  </Button>
                )}
                {selectedProject.githubLink && (
                  <Button
                    variant="default"
                    className="w-full md:w-auto"
                    onClick={() =>
                      window.open(selectedProject.githubLink || "", "_blank")
                    }
                  >
                    <Github size={16} className="mr-2" />
                    View Source Code
                  </Button>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}
