'use client'
import Heading from './ui/heading'
import Description from './ui/description'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type Props = {}

function SmaaashHighlights({ }: Props) {
  useGSAP(() => {
    
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
        }
      }
    )

    gsap.fromTo(
      '.highlight-description',
      { opacity: 0,},
      {
        opacity: 1,
        scrollTrigger: {
          trigger: '.highlight-description',
          start: 'top 100%',  // Start when the element reaches 80% of the viewport height
          end: 'bottom 50%',
          scrub: true,
        }
      }
    )

    gsap.to('#page2 h1' , {
      transform:'translateX(-150%)',
      scrollTrigger:{
        trigger:'#page2',
        start:'top 0%',
        end:'top -100%',
        pin:true,
        scrub:2,
      }
    })
  }, [])

  return (
    <section className='py-14 md:py-24 h-auto w-full'>
      <div className='flex flex-col px-2 md:px-5'>
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
      <div id='page2' className='w-full h-full bg-blue-400 overflow-x-hidden uppercase mt-10'>
        <h1 className='text-[40vw]'>Experiences</h1>
      </div>
    </section>
  )
}

export default SmaaashHighlights
