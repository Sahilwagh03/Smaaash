'use client'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

type Props = {}

function CalloutSection({ }: Props) {

  return (
    <section className='callout-section relative py-7 lg:py-14 h-auto w-full'>
      <div className="p-10 sm:p-10 m-5 rounded-3xl bg-white text-black flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            <div className="flex flex-col justify-center text-center lg:text-left z-10">
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-8xl font-extrabold uppercase leading-tight tracking-tight">
                Play with <span className="text-brand_primary">Passion</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-xl font-medium  text-balance">
                Step into the ultimate gaming experience. VR, Arcade, Cricket, and more – all in one place.
              </p>
            </div>

            <div className="relative flex items-center sm:m-10">
              <div className="cursor-pointer relative z-10 bg-gray-800 p-4 sm:p-6 -right-1/2 -translate-x-1/2 grow text-center shadow-2xl -rotate-2 rounded-xl text-nowrap border-slate-950 border-b-4 border-r-8">
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white">
                  Book Now
                </h2>
                <p className="hidden lg:flex mt-1 text-sm sm:text-base font-light text-gray-400">
                  Unleash the thrill, challenge your skills, and level up your game.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CalloutSection