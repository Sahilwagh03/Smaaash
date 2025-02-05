// useDeviceSize.ts
import { useState, useEffect } from 'react';

const useDeviceSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // 1024px as a breakpoint for mobile/tablet
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useDeviceSize;
