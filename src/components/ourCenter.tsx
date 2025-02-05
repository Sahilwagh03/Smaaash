'use client'
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useCursor } from '@/context/CursorContext';
import Heading from './ui/heading';
import useDeviceSize from '@/hooks/useDevice';  // Import the hook
import Image from 'next/image';

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
        {
            cityName: "Mumbai",
            imageUrl: "/images/silhouette/mumbai-city.avif",
            alt:"mumbai-city"
        },
        {
            cityName: "Gurgaon",
            imageUrl: "/images/silhouette/ncr.avif",
            alt:"gurgaon-city"
        },
        {
            cityName: "Mangalore",
            imageUrl: "/images/silhouette/bang-city.png",
            alt:'mangalore-city'
        },
        {
            cityName: "Vijayawada",
            imageUrl: "/images/silhouette/chen-city.avif", // Placeholder URL
            alt:"vijayawada-city"
        },
        {
            cityName: "Hyderabad",
            imageUrl: "/images/silhouette/Hyderabad-city.png",
            alt:'hyderabad-city'
        },
        {
            cityName: "Noida",
            imageUrl: "/images/silhouette/ncr.avif",
            alt:'noida-city'
        },
        {
            cityName: "Madurai",
            imageUrl: "/images/silhouette/chen-city.avif",
            alt:"madurai-city"
        },
        {
            cityName: "Ludhiana",
            imageUrl: "/images/silhouette/chd-city.avif",
            alt:'ludhiana-city' 
        },
        {
            cityName: "Gwalior",
            imageUrl: "/images/silhouette/ahd-city.avif",
            alt:'gwalior-city'
        },
        {
            cityName: "Amritsar",
            imageUrl: "/images/silhouette/chd-city.avif",
            alt:'amritsar-city' 
        }
    ];

    const cityColors: { [key: string]: string } = {
        Mumbai: "#ff5733",      // Warm orange-red
        Gurgaon: "#3498db",    // Cool blue
        Mangalore: "#27ae60",   // Vibrant green
        Noida: "#9b59b6",       // Purple
        Vijayawada: "#f39c12",  // Golden yellow
        Hyderabad: "#2ecc71",   // Fresh green
        Madurai: "#e74c3c",     // Deep red
        Ludhiana: "#1abc9c",    // Teal
        Gwalior: "#8e44ad",     // Dark purple
        Amritsar: "#d35400",     // Burnt orange
    };

    const handleUpAnimation = (e: React.MouseEvent<HTMLDivElement>, cityName: string) => {
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
            color: cityColors[cityName]
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
                    {cities.map(({cityName,imageUrl , alt}, index) => (
                        <li key={index} ref={el => { cityRefs.current[index] = el }} className='relative w-fit z-[1] my-3 opacity-0'>
                            <div className='city text-xl md:text-5xl lg:text-7xl font-main font-black relative opacity-[2] scale-[1] overflow-hidden'
                                onMouseEnter={isMobile ? undefined : (e) => handleUpAnimation(e, cityName)}
                                onMouseLeave={isMobile ? undefined : handledDownAnimation}> 

                                <div className='leading-[1] md:leading-[1.4] flex items-baseline md:items-center' >
                                    <Image src={imageUrl} alt={alt} width={1000} height={1000} className='w-10 h-10 lg:w-20 lg:h-20' />
                                    {cityName.split(" ").map((word) => (
                                        <span className='inline-block' key={word}>
                                            {word.split("").map((letter, lIndex) => (
                                                <span key={lIndex} className="actual inline-block">{letter}</span>
                                            ))}
                                        </span>
                                    ))}
                                </div>

                                <div className='absolute top-0 left-0 h-full w-full leading-[1] md:leading-[1.4] flex items-center' style={{ color: cityColors[cityName] }}>
                                    <Image src={imageUrl} alt={alt} width={1000} height={1000} className='w-10 h-10 lg:w-20 lg:h-20' />
                                    {cityName.split(" ").map((word) => (
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
