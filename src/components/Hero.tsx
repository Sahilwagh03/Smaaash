'use client'
import React, { useEffect, useState } from 'react'
import { heroSectionData } from '@/constant/home'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type Props = {
    enableVideo?: boolean; // Add a prop to conditionally render the video
}

const videoList = [
    "/Videos/bowling-2.mp4",
    "/Videos/gokarting.mp4",
    "/Videos/cricket.mp4",
    "/Vidoes/VR.mp4"
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

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { duration: 1, ease: 'power2.out' },
        });

        tl.from('#hero_title span', {
            y: 100,
            opacity: 0,
            stagger: 0.05,
        })
            .from('#hero_description', {
                opacity: 0,
                y: 50,
            }, "-=0.5")
            .to('#hero_button', {
                opacity: 1,
                scale: 1.2,
                duration: 0.5,
            }, "-=0.3")
            .from('.social-icons', {
                opacity: 0,
                x: 50,
                duration: 1,
                stagger: 0.3,
            }, "-=0.2");
    }, []);

    const splitTitle = title.split(' ').map((word, index) => (
        <span key={index} className="inline-block">{word}&nbsp;</span>
    ));

    return (
        <div className='relative -mt-24 px-2 md:px-4 pt-24 lg:pt-28 flex justify-center items-center gap-4 flex-col min-h-[106vh] min-w-full text-center'>
            {enableVideo && (
                <>
                    <video
                        src={videoList[currentVideoIndex]}
                        autoPlay
                        loop={false}
                        muted
                        onEnded={handleVideoEnd}
                        className="absolute top-0 left-0 w-full h-full object-cover -z-30"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 -z-30"></div>
                </>
            )}
            <div className='overflow-hidden relative z-10'>
                <h1
                    id="hero_title"
                    className={cn('pb-3 text-4xl font-semibold font-main' , enableVideo ? 'text-white' : 'text-[var(--brand-secondary)]', 
                    'sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl')}
                >
                    {splitTitle}
                </h1>
            </div>
            <p
                id="hero_description"
                className={`max-w-2xl text-sm font-sub ${enableVideo ? 'text-white' : 'text-[var(--brand-secondary)]'} 
                sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl`}
            >
                {description}
            </p>
            <Button id='hero_button' className='opacity-0 mt-2 text-white text-lg font-main bg-[var(--brand-primary)]'>
                Book Now
            </Button>
        </div>
    )
}

export default Hero
