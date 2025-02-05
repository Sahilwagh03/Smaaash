'use client';

import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { navigationLinks, thrillZoneActivities, partiesAndEvents } from '../../../constant/navigationLink';

export default function MobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThrillZoneOpen, setIsThrillZoneOpen] = useState(false);
  const [isPartiesAndEventsOpen, setIsPartiesAndEventsOpen] = useState(false);
  const { isUserVerified, handleLoginClick, handleSignUpClick, handleLogout } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleThrillZone = () => setIsThrillZoneOpen((prev) => !prev);
  const togglePartiesAndEvents = () => setIsPartiesAndEventsOpen((prev) => !prev);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand_primary"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[3.5rem] right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 z-40 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <nav className="p-4 pb-20 space-y-6">
          <ul className="space-y-4">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={toggleMobileMenu}
                  className="block text-lg font-medium text-gray-700 hover:text-brand_primary"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Thrill Zone Dropdown */}
          <div>
            <button
              onClick={toggleThrillZone}
              className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-brand_primary focus:outline-none"
            >
              <span>Thrill Zone</span>
              {isThrillZoneOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {isThrillZoneOpen && (
              <ul className="space-y-2 mt-2">
                {thrillZoneActivities.map((activity) => (
                  <li key={activity.href} className="p-2">
                    <Link
                      href={activity.href}
                      onClick={toggleMobileMenu}
                      className="block text-gray-600 hover:text-brand_primary"
                    >
                      {activity.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Parties & Events Dropdown */}
          <div>
            <button
              onClick={togglePartiesAndEvents}
              className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-brand_primary focus:outline-none"
            >
              <span>Parties & Events</span>
              {isPartiesAndEventsOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {isPartiesAndEventsOpen && (
              <ul className="space-y-2 mt-2">
                {partiesAndEvents.map((event) => (
                  <li key={event.href} className="p-2">
                    <Link
                      href={event.href}
                      onClick={toggleMobileMenu}
                      className="block text-gray-600 hover:text-brand_primary"
                    >
                      {event.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Authentication Section */}
          <div className="mt-6 border-t pt-4">
            {isUserVerified ? (
              <div className="flex justify-start gap-4 flex-col space-x-4">
                <div className='flex justify-center items-center'>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={"https://github.com/shadcn.png"} alt="User" />
                    <AvatarFallback>{'CN'}</AvatarFallback>
                  </Avatar>
                </div>
                <Button
                  onClick={handleLogout}
                  className="min-w-24 rounded-xl bg-brand_primary text-white font-medium transition"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
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
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
