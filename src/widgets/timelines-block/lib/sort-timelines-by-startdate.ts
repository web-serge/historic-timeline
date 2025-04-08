import { ITimeline } from '@/entities/timeline';

export const sortTimelinesByStartDate = (timelines: ITimeline[]) =>
  timelines.sort((a, b) => Math.floor(a.startYear - b.startYear));
