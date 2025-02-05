'use client'
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import Image from 'next/image';

type Props = {};

function CallToAction({ }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const playWithRef = useRef<HTMLSpanElement>(null);
  const passionRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  const { contextSafe } = useGSAP(() => {
    // Create timeline for sequential text animation
    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        end: 'bottom 0%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animate "Play with" first
    textTimeline.from(playWithRef.current, {
      x: -500,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    // Then animate "Passion" with a more dynamic effect
    .from(passionRef.current, {
      x: -200,
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      clearProps: "all"
    }, "-=0.2")
    // Animate the description text
    .from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, "-=0.3")
    // Finally, animate the button
    .from(buttonRef.current, {
      rotation: -10,
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    }, "-=0.5");

  }, []);

  const handleBookingEnter = contextSafe(() => {
    gsap.to(buttonRef.current, {
      rotate: '0deg',
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    });
  });

  const handleBookingLeave = contextSafe(() => {
    gsap.to(buttonRef.current, {
      rotate: '-2deg',
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    });
  });

  return (
    <section ref={sectionRef} className='callout-section relative h-auto w-full'>
      <div className="p-10 sm:p-10 m-5 rounded-3xl bg-white text-black flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center text-center lg:text-left z-10">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase leading-tight tracking-tight">
                <span ref={playWithRef} className="inline-block">Play with</span>{' '}
                <span ref={passionRef} className="sm:text-4xl md:text-5xl lg:text-8xl text-brand_primary inline-block">Passion</span>
              </h1>
              <p ref={textRef} className="mt-4 text-base sm:text-lg md:text-xl font-medium text-balance">
                Step into the ultimate gaming experience. VR, Arcade, Cricket, and more – all in one place.
              </p>
            </div>

            <div className="relative flex items-center sm:m-10">
              <div 
                ref={buttonRef} 
                onMouseEnter={handleBookingEnter} 
                onMouseLeave={handleBookingLeave} 
                className="cursor-pointer relative z-10 bg-gray-800 p-4 sm:p-6 -right-1/2 -translate-x-1/2 grow text-center shadow-2xl -rotate-2 rounded-xl text-nowrap border-slate-950 border-b-4 border-r-8"
              >
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white">
                  Book Now
                </h2>
                <p className="hidden lg:flex mt-1 text-sm sm:text-base font-light text-gray-400">
                  Unleash the thrill, challenge your skills, and level up your game.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;