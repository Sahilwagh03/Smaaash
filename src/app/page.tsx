'use client'
import HomePage from "@/components/Pages/HomePage";
import useMousePosition from "@/utils/useMousePosition";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  const { x, y } = useMousePosition();
  useGSAP(() => {
    gsap.to('#cursor', { x: (x ?? 0) - 5, y: (y ?? 0) - 5, ease:'sine' })
  }, [x, y])
  return (
    <main className="relative z-10 -mt-24">
      <div className='hidden md:flex w-8 h-8 top-10 left-0 rounded-full fixed bg-[var(--brand-primary)] mix-blend-difference z-[100]' id='cursor'></div>
      <HomePage />
    </main>
  );
}
