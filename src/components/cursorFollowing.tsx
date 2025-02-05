// CursorFollower.tsx
'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCursor } from '@/context/CursorContext';
import { useGSAP } from "@gsap/react";
import { ArrowRight } from 'lucide-react';

interface CursorFollowerProps {
  size?: number;  // Optional prop for cursor size
  delay?: number; // Optional prop for cursor delay
}

const CursorFollower: React.FC<CursorFollowerProps> = ({
  size = 20, 
  delay = 0.1 // Default delay of 0.1s
}) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const { isHovering } = useCursor();

  useGSAP(() => {
    if (typeof window !== "undefined") {
      const cursor = cursorRef.current;

      const moveCursor = (e: MouseEvent): void => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          ease: "power2.out",
          delay: delay,
        });
      };

      window.addEventListener("mousemove", moveCursor);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
      };
    }
  }, [delay]); // Added delay to dependency array

  useGSAP(() => {
    gsap.to(cursorRef.current, {
      width: isHovering ? "45px" : "20px",
      height: isHovering ? "45px" : "20px",
      ease: "power3.out", // Smooth easing
      duration: 0.4, // Reduced duration for a snappier feel
    });
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className='hidden lg:flex fixed top-0 left-0 rounded-full bg-brand-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2'
      style={{
        backgroundColor: 'var(--brand-primary)',
        width: `${size}px`,
        height: `${size}px`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isHovering && (
        <ArrowRight className="text-white"/>
      )}
    </div>
  );
};

export default CursorFollower;
