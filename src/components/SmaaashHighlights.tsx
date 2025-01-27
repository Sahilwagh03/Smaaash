'use client'
import React, { useEffect } from 'react'
import Heading from './ui/heading'
import Description from './ui/description'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

gsap.registerPlugin(ScrollTrigger)

type Props = {}

function SmaaashHighlights({ }: Props) {
  useEffect(() => {
    // GSAP animation setup for scroll trigger
    gsap.fromTo(
      '.highlight-heading',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '.highlight-heading',
          start: 'top 100%',  // Start when the element reaches 80% of the viewport height
          end: 'bottom 50%', // End when the element is fully out of view
          scrub: true,
          markers:true
        }
      }
    )

    gsap.fromTo(
      '.highlight-description',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '.highlight-description',
          start: 'top 100%',  // Start when the element reaches 80% of the viewport height
          end: 'bottom 50%',
          scrub: true,
        }
      }
    )
  }, [])

  return (
    <section className='py-28 px-5 h-[100vh] w-full'>
      <div className='flex flex-col'>
        <div className='overflow-hidden'>
          <Heading
            size='md'
            className='pb-2 font-semibold tracking-tighter highlight-heading inline-block'
          >
            Smaaash Highlights
          </Heading>
        </div>
        <Description
          size='xs'
          className='max-w-4xl highlight-description'
        >
          From cutting-edge virtual reality marvels to classic arcade favorites, experience the ultimate gaming extravaganza, catering to every taste and age, ensuring an unforgettable vibe for everyone who steps in.
        </Description>
      </div>
      <div></div>
    </section>
  )
}

export default SmaaashHighlights
