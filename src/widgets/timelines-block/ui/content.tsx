import { useEffect } from 'react';

import styles from './styles.module.scss';

import { TimelinesProps } from '.';

import { EventsGallery } from '@/entities/event';
import { TimelineSelector, TimelineSelectorControls, useTimelines } from '@/entities/timeline';
import { useIsMobile } from '@/shared/lib/hooks/use-is-mobile';

export const TimelineContent = ({ timelines }: TimelinesProps) => {
  const {
    setTimelines,
    setActiveTimelineIndex,
    timelines: storeTimelines,
    activeTimelineIndex,
  } = useTimelines();

  const isMobile = useIsMobile();

  useEffect(() => {
    setTimelines(timelines);
    setActiveTimelineIndex(0);
  }, []);

  if (!storeTimelines || activeTimelineIndex === null) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <TimelineSelector />
      <EventsGallery />
      <div className={styles['middle-separator']} />
      {isMobile && <TimelineSelectorControls />}
    </section>
  );
};
