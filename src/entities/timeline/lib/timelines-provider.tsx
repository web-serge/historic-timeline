import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { ITimeline } from '../model/timeline.type';

const TimelinesContext = createContext<{
  activeTimelineIndex: number;
  setActiveTimelineIndex: (value: number) => void;
  timelines: ITimeline[];
  setTimelines: (value: ITimeline[]) => void;
} | null>(null);

export const TimelinesProvider = ({ children }: PropsWithChildren) => {
  const [timelines, setTimelines] = useState<ITimeline[] | null>(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState<number | null>(0);

  return (
    <TimelinesContext.Provider
      value={{ timelines, setTimelines, activeTimelineIndex, setActiveTimelineIndex }}
    >
      {children}
    </TimelinesContext.Provider>
  );
};

export const useTimelines = () => {
  const context = useContext(TimelinesContext);

  if (!context) {
    throw new Error('useTimelines должен использоваться внутри TimelinesProvider');
  }

  return context;
};
