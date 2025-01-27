import React from 'react'
import Heading from './ui/heading'
import Description from './ui/description'

type Props = {}

function SmaaashHighlights({}: Props) {
  return (
    <section className='py-28 px-5 h-auto w-full'>
        <div className='flex flex-col gap-4'>
            <Heading size='md' className='font-semibold tracking-tighter'>Smaaash Highlights</Heading>
            <Description size='xs' className='max-w-4xl'>From cutting-edge virtual reality marvels to classic arcade favorites, experience the ultimate gaming extravaganza, catering to every taste and age, ensuring an unforgettable vibe for everyone who steps in.</Description>
        </div>
        <div></div>
    </section>
  )
}

export default SmaaashHighlights