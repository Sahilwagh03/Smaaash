'use client';

import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { navigationLinks, thrillZoneActivities, partiesAndEvents } from '../../../constant/navigationLink';

export default function MobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

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
        className={`fixed top-[3.5rem] right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
          <div>
            <h3 className="block text-lg font-medium text-gray-700 hover:text-brand_primary">Thrill Zone</h3>
            <ul className="space-y-2">
              {thrillZoneActivities.map((activity) => (
                <li key={activity.href} className='p-2'>
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
          </div>
          <div>
            <h3 className="block text-lg font-medium text-gray-700 hover:text-brand_primary">Parties & Events</h3>
            <ul className="space-y-2">
              {partiesAndEvents.map((event) => (
                <li key={event.href} className='p-2'>
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
          </div>
        </nav>
      </div>
    </>
  );
}
