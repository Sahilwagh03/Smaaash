import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navigationLinks ,thrillZoneActivities, partiesAndEvents } from '@/constant/navigationLink';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <Image
                src="/images/newsmaaashlogotwo.png.jpg"
                alt="Smaaash Logo"
                width={1000}
                height={1000}
                className="w-40 h-auto"
              />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Quick Links
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {navigationLinks.map((link) => (
                  <li key={link.href} className="mb-4">
                    <Link href={link.href} className="hover:underline">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Thrill Zone
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {thrillZoneActivities.map((activity) => (
                  <li key={activity.href} className="mb-4">
                    <Link href={activity.href} className="hover:underline">
                      {activity.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Parties & Events
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                {partiesAndEvents.map((event) => (
                  <li key={event.href} className="mb-4">
                    <Link href={event.href} className="hover:underline">
                      {event.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear} <a href="/" className="hover:underline">Smaaash</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
