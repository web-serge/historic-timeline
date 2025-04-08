import { sortTimelinesByStartDate } from '../lib/sort-timelines-by-startdate';

import { TimelineContent } from './content';

import { ITimeline, TimelinesProvider } from '@/entities/timeline';

export type TimelinesProps = {
  timelines: ITimeline[];
};

export const TimelinesBlock = ({ timelines }: TimelinesProps) => {
  const timelinesCount = timelines.length;

  if (timelinesCount < 2 || timelinesCount > 6) {
    return <p>От 2 до 6 временных линий</p>;
  }

  const sortedTimelines = sortTimelinesByStartDate(timelines);

  return (
    <TimelinesProvider>
      <TimelineContent timelines={sortedTimelines} />
    </TimelinesProvider>
  );
};
