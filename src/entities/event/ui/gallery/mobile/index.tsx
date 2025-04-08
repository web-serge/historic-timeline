import { A11y, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EventCard } from '../../card';
import { EventsProps } from '../desktop';
import { RestoreSwiper } from '../restore-swiper';

import styles from './styles.module.scss';

export const MobileEventsGallery = ({ events }: EventsProps) => {
  return (
    <Swiper
      navigation
      pagination
      className={styles.wrapper}
      containerModifierClass={styles['swiper-wrapper']}
      modules={[A11y, Pagination]}
      slidesOffsetAfter={20}
      slidesOffsetBefore={20}
      slidesPerView='auto'
      spaceBetween={20}
    >
      <RestoreSwiper events={events} />
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <EventCard event={event} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
