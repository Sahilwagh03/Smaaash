'use client'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {}

const OurCenter = (props: Props) => {
    const containerRef = useRef(null)
    const cityRefs = useRef<(HTMLLIElement | null)[]>([])

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
        )
    }, [])

    // Reordered cities for better design aesthetics
    const cities = [
        "Mumbai", "Gurugram", "Mangalore", "Noida", "Vijayawada",
        "Hyderabad", "Madurai", "Ludhiana", "Gwalior", "Barnala"
    ];

    // Unique hover colors for each city
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

        // gsap.killTweensOf([actualLetters, hoveringLetters])
        gsap.to(actualLetters, {
            y: -150,
            rotate: 10,
            stagger: 0.07,
            duration: 1.2,
            ease: "back.out(1.7)"
        });

        gsap.to(hoveringLetters, {
            y: 0,
            rotate: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 1.2,
            ease: "back.out(1.7)",
            color: cityColors[city]  // Change color dynamically
        });
    };

    const handledDownAnimation = (e: React.MouseEvent<HTMLDivElement>) => {
        const cityElement = e.currentTarget;
        const actualLetters = cityElement.querySelectorAll('.actual');
        const hoveringLetters = cityElement.querySelectorAll('.hovering');

        // gsap.killTweensOf([actualLetters, hoveringLetters])
        gsap.to(actualLetters, {
            y: 0,
            rotate: 0,
            stagger: 0.07,
            duration: 1.2,
            ease: "back.out(1.7)"
        });

        gsap.to(hoveringLetters, {
            y: 150,
            rotate: 10,
            opacity: 0,
            stagger: 0.07,
            duration: 1.2,
            ease: "back.out(1.7)"
        });
    };

    return (
        <section ref={containerRef} className='px-2 md:px-5 py-12 md:py-16 relative flex justify-center items-center'>
            <div className='our-center-wrapper h-full w-full container flex justify-center items-center'>
                <ul className='flex flex-col justify-center items-center list-none'>
                    {cities.map((city, index) => (
                        <li key={index} ref={el => { cityRefs.current[index] = el }} className='relative w-fit z-[1] my-3 opacity-0'>
                            <div className='city text-5xl md:text-6xl lg:text-9xl font-main font-black relative opacity-[2] scale-[1] overflow-hidden' 
                                onMouseEnter={(e) => handleUpAnimation(e, city)} 
                                onMouseLeave={handledDownAnimation}>
                                
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
    )
}

export default OurCenter;
