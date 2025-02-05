'use client'
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useCursor } from '@/context/CursorContext';
import Heading from './ui/heading';
import useDeviceSize from '@/hooks/useDevice';  // Import the hook

gsap.registerPlugin(ScrollTrigger);

type Props = {};

const OurCenter = (props: Props) => {
    const containerRef = useRef(null);
    const cityRefs = useRef<(HTMLLIElement | null)[]>([]);
    const { setHovering } = useCursor();
    const isMobile = useDeviceSize(); // Get screen size information

    useEffect(() => {
        gsap.fromTo(
            cityRefs.current,
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%", 
                    toggleActions: "play none none reverse",
                }
            }
        );
    }, []);

    const cities = [
        "Mumbai", "Gurugram", "Mangalore", "Noida", "Vijayawada",
        "Hyderabad", "Madurai", "Ludhiana", "Gwalior", "Barnala"
    ];

    const cityColors: { [key: string]: string } = {
        Mumbai: "#ff5733",      // Warm orange-red
        Gurugram: "#3498db",    // Cool blue
        Mangalore: "#27ae60",   // Vibrant green
        Noida: "#9b59b6",       // Purple
        Vijayawada: "#f39c12",  // Golden yellow
        Hyderabad: "#2ecc71",   // Fresh green
        Madurai: "#e74c3c",     // Deep red
        Ludhiana: "#1abc9c",    // Teal
        Gwalior: "#8e44ad",     // Dark purple
        Barnala: "#d35400",     // Burnt orange
    };

    const handleUpAnimation = (e: React.MouseEvent<HTMLDivElement>, city: string) => {
        const cityElement = e.currentTarget;
        const actualLetters = cityElement.querySelectorAll('.actual');
        const hoveringLetters = cityElement.querySelectorAll('.hovering');

        gsap.to(actualLetters, {
            y: -150,
            rotate: 10,
            stagger: 0.07,
            duration: 1.2,
            ease: "back.out(2)"
        });

        gsap.to(hoveringLetters, {
            y: 0,
            rotate: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 1.2,
            ease: "back.out(1.7)",
            color: cityColors[city]
        });

        setHovering(true); // Set hovering state to true
    };

    const handledDownAnimation = (e: React.MouseEvent<HTMLDivElement>) => {
        const cityElement = e.currentTarget;
        const actualLetters = cityElement.querySelectorAll('.actual');
        const hoveringLetters = cityElement.querySelectorAll('.hovering');

        gsap.to(actualLetters, {
            y: 0,
            rotate: 0,
            stagger: 0.07,
            duration: 1.2,
            ease: "back.out(2)"
        });

        gsap.to(hoveringLetters, {
            y: 150,
            rotate: 10,
            opacity: 0,
            stagger: 0.07,
            duration: 1.2,
            ease: "back.out(2)"
        });

        setHovering(false); // Set hovering state to false
    };

    return (
        <section ref={containerRef} id='our-centers' className='bg-white dark:bg-black relative z-10 px-2 md:px-5 py-4 flex justify-center items-center'>
            <div className='our-center-wrapper h-full w-full container flex gap-5 lg:gap-0 flex-col lg:flex-row justify-center items-center'>
                <Heading className='lg:hidden font-bold'>Our centers</Heading>
                <ul className='grid grid-cols-2 lg:grid-cols-1 gap-x-8 md:gap-x-16 lg:gap-0 lg:justify-items-center items-center list-none'>
                    {cities.map((city, index) => (
                        <li key={index} ref={el => { cityRefs.current[index] = el }} className='relative w-fit z-[1] my-3 opacity-0'>
                                                        <div className='city text-2xl md:text-5xl lg:text-7xl font-main font-black relative opacity-[2] scale-[1] overflow-hidden' 
                                onMouseEnter={isMobile ? undefined : (e) => handleUpAnimation(e, city)} // Disable hover on mobile
                                onMouseLeave={isMobile ? undefined : handledDownAnimation}> {/* Disable hover on mobile */}
                                  
                                <div className='leading-[1]' >
                                    {city.split(" ").map((word) => (
                                        <span className='inline-block' key={word}>
                                            {word.split("").map((letter, lIndex) => (
                                                <span key={lIndex} className="actual inline-block">{letter}</span>
                                            ))}
                                        </span>
                                    ))}
                                </div>

                                <div className='absolute top-0 left-0 h-full w-full leading-[1]' style={{ color: cityColors[city] }}>
                                    {city.split(" ").map((word) => (
                                        <span className='inline-block' key={word}>
                                            {word.split("").map((letter, lIndex) => (
                                                <span key={lIndex} className="hovering inline-block transform translate-x-0 opacity-0 translate-y-[150px] rotate-[20deg]">
                                                    {letter}
                                                </span>
                                            ))}
                                        </span>
                                    ))}
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default OurCenter;
