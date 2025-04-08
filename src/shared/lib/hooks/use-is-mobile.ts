import { useEffect, useState } from 'react';

export const useIsMobile = (screenWidth = 1100) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < screenWidth);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < screenWidth;

      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return isMobile;
};
