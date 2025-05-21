"use client";

import { useMobile } from "@/hooks/use-mobile";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const hideCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      target.style.cursor = "none";
    };

    document.addEventListener("mouseover", hideCursor);

    let mouseX = 0;
    let mouseY = 0;
    let trailDots: HTMLDivElement[] = [];
    const maxTrails = 5;

    // Create trail dots
    for (let i = 0; i < maxTrails; i++) {
      const dot = document.createElement("div");
      dot.className = "w-1 h-1 rounded-full absolute bg-white/30 blur-[1px]";
      trailsRef.current?.appendChild(dot);
      trailDots.push(dot);
    }

    const animateCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Animate all cursors with no duration for instant response
      gsap.set([cursorRef.current, cursorOuterRef.current, ...trailDots], {
        x: mouseX,
        y: mouseY,
      });
    };

    const handleMouseDown = () => {
      setCursorVariant("click");
      gsap.set([cursorRef.current, cursorOuterRef.current], {
        scale: 0.8,
      });
    };

    const handleMouseUp = () => {
      setCursorVariant("default");
      gsap.set([cursorRef.current, cursorOuterRef.current], {
        scale: 1,
      });
    };

    const handleLinkHover = () => {
      setCursorVariant("hover");
      gsap.set([cursorRef.current, cursorOuterRef.current], {
        scale: 1.5,
      });
    };

    const handleLinkLeave = () => {
      setCursorVariant("default");
      gsap.set([cursorRef.current, cursorOuterRef.current], {
        scale: 1,
      });
    };

    const handleWheel = (e: WheelEvent) => {
      // Scale effect based on scroll direction
      const scaleAmount = e.deltaY > 0 ? 0.7 : 1.3;

      // Animate cursor on wheel
      gsap.to([cursorRef.current, cursorOuterRef.current], {
        scale: scaleAmount,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to([cursorRef.current, cursorOuterRef.current], {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });

      // Stretch effect for outer cursor
      gsap.to(cursorOuterRef.current, {
        borderRadius: "40%",
        rotation: e.deltaY > 0 ? 45 : -45,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(cursorOuterRef.current, {
            borderRadius: "50%",
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });

      // Animate trail dots
      trailDots.forEach((dot, index) => {
        gsap.to(dot, {
          opacity: 0.1,
          scale: 0.5,
          duration: 0.2,
          delay: index * 0.02,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(dot, {
              opacity: 0.3,
              scale: 1,
              duration: 0.2,
              ease: "power2.out",
            });
          },
        });
      });
    };

    window.addEventListener("mousemove", animateCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheel);

    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    return () => {
      window.removeEventListener("mousemove", animateCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("mouseover", hideCursor);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHover);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });

      // Reset cursor styles
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };
  }, [isMobile]);

  return (
    <>
      <div
        ref={trailsRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />

      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${
          cursorVariant === "default"
            ? "w-4 h-4 -ml-2 -mt-2"
            : cursorVariant === "hover"
            ? "w-6 h-6 -ml-3 -mt-3"
            : "w-3 h-3 -ml-1.5 -mt-1.5"
        }`}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </div>

      <div
        ref={cursorOuterRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] border-2 border-white rounded-full ${
          cursorVariant === "default"
            ? "w-10 h-10 -ml-5 -mt-5"
            : cursorVariant === "hover"
            ? "w-16 h-16 -ml-8 -mt-8"
            : "w-8 h-8 -ml-4 -mt-4"
        }`}
      />
    </>
  );
}
