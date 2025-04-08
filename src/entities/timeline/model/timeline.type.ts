import { IEvent } from '@/entities/event';

export interface ITimeline {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  events: IEvent[];
}
