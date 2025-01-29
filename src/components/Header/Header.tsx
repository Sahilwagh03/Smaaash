'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CustomNavigationMenu } from './_components/NavigationMenu'
import MobileMenu from './_components/MobileMenu'
import { Button } from '../ui/button'
import SignUpForm from '../signUpForm' // Adjust path as needed
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Header() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [formTitle, setFormTitle] = useState<string>('Sign Up') // Default to 'Sign Up'
  const [isUserVerified, setIsUserVerified] = useState<boolean>(false)

  const handleSignUpClick = () => {
    setFormTitle('Sign Up')
    setIsSignUpOpen(true)
  }

  const handleLoginClick = () => {
    setFormTitle('Login')
    setIsSignUpOpen(true)
  }

  useEffect(() => {
    if (localStorage.getItem('user_verified') === 'true') {
      setIsUserVerified(true)
    }
  }, [])

  return (
    <>
      <div id='header' className="sticky top-0 lg:top-3 z-50 lg:mx-4 flex items-center bg-[#ffffffb3] justify-between p-2 shadow-md lg:rounded-xl bg-white">
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
          {isUserVerified
            ?
            <>
              <Avatar className='cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button onClick={()=>{localStorage.removeItem('user_verified')}} className='min-w-24 rounded-xl bg-brand_primary text-white font-medium transition'>Logout</Button>
            </>
            :
            <>
              <Button
                onClick={handleLoginClick}
                className="min-w-24 rounded-xl bg-brand_secondary text-white font-medium hover:bg-[#2f2e47] transition"
              >
                Login
              </Button>
              <Button
                onClick={handleSignUpClick}
                className="min-w-24 rounded-xl bg-brand_primary text-white font-medium hover:bg-[#c9293b] transition"
              >
                Sign Up
              </Button>
            </>
          }
          <div className='block lg:hidden'>
            <MobileMenu />
          </div>
        </div>

        <div className='md:hidden'>
          <MobileMenu />
        </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpForm
        formTitle={formTitle}
        isOpen={isSignUpOpen}
        onOpenChange={setIsSignUpOpen}
      />
    </>
  )
}
