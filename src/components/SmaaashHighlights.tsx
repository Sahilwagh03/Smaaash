'use client'
import Heading from './ui/heading'
import Description from './ui/description'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { smaaashHighlight } from '@/constant/home'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const SmaaashHighlights = () => {
  const highlightWrapperRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Initial fade animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: highlightWrapperRef.current,
          start: 'top 100%',
          end: 'bottom 50%',
          scrub: 2,
        }
      })

      tl.fromTo(
        highlightWrapperRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0 }
      )

      // Text gradient animation
      gsap.to('.highlight-name', {
        backgroundPositionX: '-100%',
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          end: 'bottom 0%',
          scrub: 2,
        },
        stagger: 1
      })

      const mm = gsap.matchMedia()

      // Function to calculate scroll distance
      const calculateScrollDistance = () => {
        if (!contentRef.current) return 0
        const totalWidth = contentRef.current.scrollWidth
        const containerWidth = contentRef.current.offsetWidth
        return -(totalWidth - containerWidth)
      }

      // Common ScrollTrigger configuration for all devices
      const createScrollTrigger = () => ({
        trigger: highlightRef.current,
        start: 'top top',
        end: () => `+=${Math.abs(calculateScrollDistance())}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
      })

      // Desktop, Tablet, and Mobile animations all use the same configuration
      // to maintain consistency across devices
      mm.add("all", () => {
        ScrollTrigger.saveStyles([contentRef.current])

        const tween = gsap.to(contentRef.current, {
          x: calculateScrollDistance,
          ease: "none",
          scrollTrigger: createScrollTrigger()
        })

        return () => {
          tween.kill()
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className='bg-[#f5f4fe] py-12 md:py-16 h-auto w-full relative'>
      <div ref={highlightRef} className='relative'>
        <div 
          ref={highlightWrapperRef}
          className='flex flex-col px-2 md:px-5 lg:pl-10 highlight-wrapper'
        >
          <div className='overflow-hidden'>
            <Heading
              size='md'
              className='pb-2 font-semibold tracking-tighter inline-block'
            >
              Smaaash Highlights
            </Heading>
          </div>
          <Description size='xs' className='max-w-4xl'>
            From cutting-edge virtual reality marvels to classic arcade favorites, experience the ultimate gaming extravaganza, catering to every taste and age, ensuring an unforgettable vibe for everyone who steps in.
          </Description>
        </div>
        
        <div className='w-full h-auto overflow-x-hidden uppercase mt-5 md:mt-8 px-2 md:px-5'>
          <div 
            ref={contentRef}
            className='h-auto w-full'
          >
            <div className='flex flex-row justify-start items-center h-full w-max'>
              {smaaashHighlight.map(({ imgUrl, highlightDescription, highlightName }) => (
                <div key={highlightName} className='w-auto h-auto mr-4 lg:mr-6 flex-shrink-0'>
                  <div className='flex flex-col h-full w-full'>
                    <div className='hightlight-img-wrapper flex justify-center rounded-xl w-full h-auto'>
                      <Image
                        src={imgUrl}
                        alt={highlightName}
                        width={400}
                        height={400}
                        className='hightlight-img rounded-xl h-auto w-60'
                      />
                    </div>
                    <div>
                      <Heading size='xs' className='pt-1 lg:pt-2 font-semibold tracking-tighter text-center highlight-name text-transparent bg-[linear-gradient(90deg,_#e0eeee_50%,_var(--brand-primary)_50%)] bg-clip-text bg-[length:200%_100%]'>
                        {highlightName}
                      </Heading>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SmaaashHighlights