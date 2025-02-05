'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CustomNavigationMenu } from './_components/NavigationMenu'
import MobileMenu from './_components/MobileMenu'
import { Button } from '../ui/button'
import SignUpForm from '../signUpForm'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const { isUserVerified, setIsUserVerified, handleSignUpClick, handleLoginClick, handleLogout, formTitle, isSignUpOpen, setIsSignUpOpen } = useAuth()

  return (
    <>
      <div id='header' className="sticky top-0 z-50 flex items-center bg-[#ffffffb3] justify-between p-2 shadow-md bg-white">
        <Link href="/" className="flex items-center" aria-label="home">
          <Image
            loading="lazy"
            src="/images/newsmaaashlogotwo.png.jpg"
            alt="smaaash-logo"
            className="w-32 md:w-40 lg:w-32"
            width={150}
            height={100}
          />
        </Link>

        <div className="hidden lg:flex">
          <CustomNavigationMenu />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isUserVerified ? (
            <>
              <Avatar className='cursor-pointer'>
                <Link href='/profile'>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>CN</AvatarFallback>
                </Link>
              </Avatar>
              <Button onClick={handleLogout} className='min-w-24 rounded-xl bg-brand_primary text-white font-medium transition'>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleLoginClick} className="min-w-24 rounded-xl bg-brand_secondary text-white font-medium hover:bg-[#2f2e47] transition">
                Login
              </Button>
              <Button onClick={handleSignUpClick} className="min-w-24 rounded-xl bg-brand_primary text-white font-medium hover:bg-[#c9293b] transition">
                Sign Up
              </Button>
            </>
          )}
          <div className='block lg:hidden'>
            <MobileMenu />
          </div>
        </div>

        <div className='md:hidden'>
          <MobileMenu />
        </div>
      </div>

      <SignUpForm
        formTitle={formTitle}
        isOpen={isSignUpOpen}
        onOpenChange={setIsSignUpOpen}
      />
    </>
  )
}
