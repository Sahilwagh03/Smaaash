import React from 'react';
import Marquee from 'react-fast-marquee';
import Heading from './ui/heading';
import Image from 'next/image';

const CustomMarquee = () => {
    return (
        <Marquee
            gradient={false}
            speed={100}
            className="overflow-hidden"
        >
            <div className="flex items-center p-[0_0.15vw] gap-[2vw] flex-shrink-0">
                <Heading className="text-brand_primary opacity-75 font-bold">OFFER</Heading>
                <Image
                    width={1000}
                    height={1000}
                    src="/images/offer-1.png"
                    alt="offer-1"
                    className="w-[25vw] h-auto"
                />
            </div>
            <div className="flex items-center p-[0_0.15vw] gap-[2vw] flex-shrink-0">
                <Heading className="text-brand_primary opacity-75 font-bold">OFFER</Heading>
                <Image
                    width={1000}
                    height={1000}
                    src="/images/offer-2.png"
                    alt="offer-2"
                    className="w-[25vw] h-auto"
                />
            </div>
        </Marquee>
    );
};

export default CustomMarquee;