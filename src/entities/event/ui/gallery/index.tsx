import './swiper.global.css';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { IEvent } from '../../model/event.type';

import { DesktopEventsGallery } from './desktop';
import styles from './styles.module.scss';
import { MobileEventsGallery } from './mobile';

import { useTimelines } from '@/entities/timeline';
import { useIsMobile } from '@/shared/lib/hooks/use-is-mobile';

export const EventsGallery = () => {
  const isMobile = useIsMobile();
  const { timelines, activeTimelineIndex } = useTimelines();

  const { events } = timelines[activeTimelineIndex];

  const [eventsData, setEventsData] = useState<IEvent[]>([]);

  const container = useRef(null);

  useGSAP(() => {
    gsap.set(container.current, { opacity: 0, y: 20 });
  });

  useGSAP(
    () => {
      gsap.to(container.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => setEventsData(events),
      });

      gsap.set(container.current, { opacity: 0, y: 20, delay: 0.5 });
      gsap.to(container.current, { opacity: 1, y: 0, delay: 1 });
    },
    { dependencies: [activeTimelineIndex] },
  );

  return (
    <div ref={container} className={styles.wrapper}>
      {isMobile ? (
        <MobileEventsGallery events={eventsData} />
      ) : (
        <DesktopEventsGallery events={eventsData} />
      )}
    </div>
  );
};
