// 'use client'
// import Heading from './ui/heading'
// import Description from './ui/description'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { gsap } from 'gsap'
// import Image from 'next/image'
// import { useGSAP } from '@gsap/react'
// import { smaaashHighlight } from '@/constant/home'

// gsap.registerPlugin(ScrollTrigger)

// const SmaaashHighlights = () => {
//   useGSAP(() => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.highlight-wrapper',
//         start: 'top 100%',
//         end: 'bottom 50%',
//         scrub: 2,
//       }
//     })

//     // Heading & Description Animating Together
//     tl.fromTo(
//       '.highlight-wrapper',
//       { opacity: 0, y: 50 },
//       { opacity: 1, y: 0 }
//     )

//     // Horizontal Scroll Effect
//     gsap.to('#highlight-content', {
//       x: '-100%',
//       scrollTrigger: {
//         trigger: '#highlight',
//         start: 'top -10%',
//         end: 'top -110%',
//         pin: true,
//         scrub: 2,
//       }
//     })

//     // Highlight Name Text Color Change on Scroll
//     gsap.to('.highlight-name', {
//       backgroundPositionX: '-100%',
//       duration: 1,
//       scrollTrigger: {
//         trigger: '#highlight-content',
//         start: 'top 80%',
//         end: 'bottom 0%',
//         scrub: true,
//       },
//       stagger:1
//     })
//   }, [])

//   return (
//     <section className='py-14 md:py-24 h-auto w-full'>
//       <div id='highlight'>
//         <div className='flex flex-col px-2 md:px-5 highlight-wrapper'>
//           <div className='overflow-hidden'>
//             <Heading
//               size='md'
//               className='pb-2 font-semibold tracking-tighter inline-block'
//             >
//               Smaaash Highlights
//             </Heading>
//           </div>
//           <Description size='xs' className='max-w-4xl'>
//             From cutting-edge virtual reality marvels to classic arcade favorites, experience the ultimate gaming extravaganza, catering to every taste and age, ensuring an unforgettable vibe for everyone who steps in.
//           </Description>
//         </div>
        
//         <div className='w-full h-full overflow-x-hidden uppercase mt-5 md:mt-8 px-2 md:px-5'>
//           <div id='highlight-content' className='h-auto w-full'>
//             <div className='flex flex-row justify-start items-center h-full w-full'>
//               {smaaashHighlight.map(({ imgUrl, highlightDescription, highlightName }) => (
//                 <div key={highlightName} className='w-auto h-auto mr-4 flex-shrink-0'>
//                   <div className='flex flex-col h-full w-full'>
//                     <div className='hightlight-img-wrapper flex justify-center rounded-xl w-full h-auto'>
//                       <Image
//                         src={imgUrl}
//                         alt={highlightName}
//                         width={400}
//                         height={400}
//                         className='hightlight-img rounded-xl h-auto w-72'
//                       />
//                     </div>
//                     <div>
//                       <Heading size='xs' className='font-semibold tracking-tighter text-center highlight-name text-transparent bg-[linear-gradient(90deg,_#e0eeee_50%,_var(--brand-primary)_50%)] bg-clip-text bg-[length:200%_100%]'>
//                         {highlightName}
//                       </Heading>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SmaaashHighlights
