'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

type Props = {}

function Gallery({ }: Props) {
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.img',
                scrub: true
            }
        })
            .to('.img', {
                stagger: 0.08,
                y: -300,
                scrub: true,
                duration: 0.4
            })
    }, [])
    return (
        <section className='overflow-y-hidden pt-7 lg:pt-14'>
            <div className='grid grid-cols-3 h-vh mx-0 my-auto'>
                <div className="img"></div>
                <div className="img"></div>
                <div className="img"></div>
                <div className="img"></div>
                <div className="img"></div>
                <div className="img"></div>
                <div className="img"></div>
                <div className="img"></div>
                <div className="img"></div>
            </div>
        </section >
    )
}

export default Gallery