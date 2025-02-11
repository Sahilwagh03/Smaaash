'use client'

import Heading from './ui/heading'
import Description from './ui/description'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { smaaashHighlight } from '@/constant/home'

gsap.registerPlugin(ScrollTrigger)

const SmaaashHighlights = () => {
  
  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.highlight-wrapper',
          start: 'top 100%',
          end: 'bottom 50%',
          scrub: 2,
        }
      })

      gsap.from('.highlight-heading', {
        x: '-100%',
        duration: 1,
        scrollTrigger: {
          trigger: '.highlight-wrapper',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      })

      gsap.from('.highlight-description', {
        y: '100%',
        duration: 1,
        scrollTrigger: {
          trigger: '.highlight-wrapper',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      })

      gsap.to('#highlight-content', {
        x: '-130%',
        scrollTrigger: {
          trigger: '.highlight',
          start: 'top -10%',
          end: 'top -110%',
          pin: true,
          scrub: 2,
        }
      })

    } else {
      gsap.from('.highlight-wrapper', {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: '.highlight-wrapper',
          start: 'top 80%',
        }
      })
    }
  }, [])

  return (
    <section className='py-7 lg:py-14 h-auto w-full'>
      <div className='highlight'>
        <div className='flex flex-col text-center lg:text-left md:text-md px-2 md:px-5 highlight-wrapper'>
          <div className='overflow-hidden'>
            <Heading
              size='md'
              className='pb-2 font-semibold tracking-tighter inline-block highlight-heading'
            >
              Smaaash Highlights
            </Heading>
          </div>
          <p className='font-sub text-lg font-semibold max-w-4xl hidden md:flex highlight-description'>
            From cutting-edge virtual reality marvels to classic arcade favorites,
            experience the ultimate gaming extravaganza, catering to every taste
            and age, ensuring an unforgettable vibe for everyone who steps in.
          </p>
        </div>

        {/* Desktop View - Horizontal Scroll */}
        <div className='w-full h-full hidden lg:block overflow-x-hidden uppercase mt-5 md:mt-8 px-2 md:px-5'>
          <div id='highlight-content' className='h-auto w-full'>
            <div className='flex flex-row justify-start items-center h-full w-full'>
              {smaaashHighlight.map(({ imgUrl, videoUrl, highlightName }) => (
                <div key={highlightName} className='w-auto h-auto mr-4 flex-shrink-0 relative group'>
                  <div className='flex flex-col h-full w-full'>
                    <div className='hightlight-img-wrapper flex justify-center rounded-xl w-full h-auto overflow-hidden'>
                      <Image
                        src={imgUrl}
                        alt={highlightName}
                        width={1000}
                        height={1000}
                        className='hightlight-img rounded-xl h-[30vw] w-[30vw] object-cover group-hover:hidden'
                      />
                      <video
                        src={videoUrl}
                        className='hightlight-video h-[30vw] w-[30vw] object-cover hidden group-hover:block'
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                    </div>
                    <div>
                      <Heading
                        size='xs'
                        className='font-semibold tracking-tighter !text-brand_primary text-center highlight-name text-transparent bg-[linear-gradient(90deg,_#e0eeee_50%,_var(--brand-primary)_50%)] bg-clip-text bg-[length:200%_100%]'
                      >
                        {highlightName}
                      </Heading>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet View - Grid Layout */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:hidden mt-5 px-2 md:px-5'>
          {smaaashHighlight.map(({ imgUrl, highlightName }) => (
            <div key={highlightName} className='flex flex-col items-center'>
              <div className='w-full aspect-square relative overflow-hidden rounded-xl'>
                <Image
                  src={imgUrl}
                  alt={highlightName}
                  fill
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                  className='object-cover rounded-xl transform hover:scale-105 transition-transform duration-300'
                />
              </div>
              <Heading
                size='xs'
                className='font-semibold tracking-tighter text-center mt-2 md:mt-4 text-sm md:text-base'
              >
                {highlightName}
              </Heading>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SmaaashHighlights