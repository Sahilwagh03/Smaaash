'use client'
import React, { useEffect, useState } from 'react';
import { heroSectionData } from '@/constant/home';
import gsap from 'gsap';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type Props = {
    enableVideo?: boolean; // Add a prop to conditionally render the video
}

const videoList = [
    "/Videos/bowling-2.mp4",
    "/Videos/gokarting.mp4",
    "/Videos/cricket.mp4",
    "/Videos/VR.mp4"
];

const Hero = ({ enableVideo = false }: Props) => {
    const { title, description } = heroSectionData;
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        if (enableVideo) {
            setCurrentVideoIndex(0);
        }
    }, [enableVideo]);

    const handleVideoEnd = () => {
        setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videoList.length);
    };

    useEffect(() => {
        gsap.to('#hero_title span', {
            y: 0,
            opacity: 1,
            stagger: 0.05,
        })
        gsap.to('#hero_description', {
            opacity: 1,
            y: 0,
        })
        gsap.to('#hero_button', {
            opacity: 1,
            scale: 1.2,
            duration: 0.5,
        })
        gsap.to('.social-icons', {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.3,
        },);

        gsap.to(['.hero-video', '.overlay'], {
            scale: 0.95,
            duration: 1,
            borderBottomLeftRadius: '3rem',
            borderBottomRightRadius: '3rem',
            scrollTrigger: {
                trigger: '#hero_container',
                start: 'top -20%',
                end: 'bottom 60%',
                scrub: 1
            }
        })

    }, []); // Ensure context is available before using it

    const splitTitle = title.split(' ').map((word, index) => (
        <span key={index} className="translate-y-48 inline-block">{word}&nbsp;</span>
    ));

    return (
        <div id='hero_container' className='relative -mt-24 px-2 md:px-4 pt-24 lg:pt-28 flex justify-center items-center gap-4 flex-col min-h-[106vh] min-w-full text-center'>
            {enableVideo && (
                <>
                    <video
                        src={videoList[currentVideoIndex]}
                        autoPlay
                        loop={false}
                        muted
                        onEnded={handleVideoEnd}
                        className="hero-video absolute top-0 left-0 w-full h-full object-cover -z-30"
                    />
                    <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-60 -z-30"></div>
                </>
            )}
            <div className='overflow-hidden relative z-10'>
                <h1
                    id="hero_title"
                    className={cn('pb-3 text-4xl font-semibold font-main', enableVideo ? 'text-white' : 'text-[var(--brand-secondary)]',
                        'sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl')}
                >
                    {splitTitle}
                </h1>
            </div>
            <p
                id="hero_description"
                className={`opacity-0 max-w-2xl text-sm font-sub ${enableVideo ? 'text-white' : 'text-[var(--brand-secondary)]'} 
                sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl`}
            >
                {description}
            </p>
            <button className="relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-filter duration-250 user-select-none -webkit-user-select-none touch-action-manipulation focus:outline-none" role="button">
                
                <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-black/25 will-change-transform translate-y-[2px] transition-transform duration-600 ease-[cubic-bezier(.3,.7,.4,1)]"></span>
                
                <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-[hsl(340deg,100%,16%)] via-[hsl(340deg,100%,32%)] to-[hsl(340deg,100%,16%)]"></span>
                
                <span className="block relative px-[27px] py-[12px] rounded-xl text-[1.1rem] text-white bg-[hsl(345deg,100%,47%)] will-change-transform -translate-y-[4px] transition-transform duration-600 ease-[cubic-bezier(.3,.7,.4,1)]">
                    Book Now
                </span>
            </button>
        </div>
    );
}

export default Hero;
