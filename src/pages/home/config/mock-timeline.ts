import {
  MockEventsAnimals,
  MockEventsMisc,
  MockEventsMovies,
  MockEventsPeople,
  MockEventsScience, MockEventsTechnology,
} from './mock-events';

import { ITimeline } from '@/entities/timeline';

export const timelines: ITimeline[] = [
  { id: 1, name: 'Наука', startYear: 1980, endYear: 1987, events: MockEventsScience },
  { id: 2, name: 'Фильмы', startYear: 1988, endYear: 1994, events: MockEventsMovies },
  { id: 3, name: 'Люди', startYear: 1995, endYear: 1999, events: MockEventsPeople },
  { id: 4, name: 'Разное', startYear: 2000, endYear: 2006, events: MockEventsMisc },
  { id: 5, name: 'Животные', startYear: 2007, endYear: 2020, events: MockEventsAnimals },
  { id: 6, name: 'Технологии', startYear: 2021, endYear: 2025, events: MockEventsTechnology }
];
