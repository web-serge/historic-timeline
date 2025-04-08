import { useEffect } from 'react';
import { useSwiper } from 'swiper/react';

import { EventsProps } from './desktop';

export const RestoreSwiper = ({ events }: EventsProps) => {
  const swiper = useSwiper();

  useEffect(() => {
    swiper.slideTo(0, 0);
  }, [events]);

  return <></>;
};
