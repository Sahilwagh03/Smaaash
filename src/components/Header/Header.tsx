import Image from 'next/image';
import Link from 'next/link';
import { CustomNavigationMenu } from './_components/NavigationMenu';
import MobileMenu from './_components/MobileMenu';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <div className="sticky top-0 lg:top-3 z-50 lg:mx-4 flex items-center bg-[#ffffffb3] justify-between p-4 shadow-md lg:rounded-xl bg-white">
      <Link href="/" className="flex items-center" aria-label="home">
        <Image
          loading="lazy"
          src="/images/newsmaaashlogotwo.png.jpg"
          alt="smaaash-logo"
          className="w-32 md:w-40 lg:w-32"  // Adjust logo size for responsiveness
          width={150}
          height={100}
        />
      </Link>

      <div className="hidden lg:flex">
        <CustomNavigationMenu />
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Button
          className="min-w-24 rounded-full bg-brand_secondary text-white font-medium hover:bg-[#2f2e47] transition"
        >
          Login
        </Button>
        <Button
          className="min-w-24 rounded-full bg-brand_primary text-white font-medium hover:bg-[#c9293b] transition"
        >
          Sign Up
        </Button>
        <div className='block lg:hidden'>
          <MobileMenu />
        </div>
      </div>

      <div className='md:hidden'>
        <MobileMenu />
      </div>
    </div>
  );
}
