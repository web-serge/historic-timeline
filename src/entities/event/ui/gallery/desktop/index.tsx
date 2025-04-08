import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EventCard } from '../../card';
import { IEvent } from '../../../model/event.type';
import { RestoreSwiper } from '../restore-swiper';

import styles from './styles.module.scss';

export type EventsProps = {
  events: IEvent[];
};

export const DesktopEventsGallery = ({ events }: EventsProps) => {
  return (
    <Swiper
      grabCursor
      navigation
      className={styles.wrapper}
      containerModifierClass={styles['swiper-wrapper']}
      modules={[Navigation, A11y]}
      slidesOffsetAfter={100}
      slidesPerView={3}
      spaceBetween={60}
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
