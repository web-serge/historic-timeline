import { TimelineSelectorDesktop } from './desktop';
import { TimelineSelectorMobile } from './mobile';

import { useIsMobile } from '@/shared/lib/hooks/use-is-mobile';

export const TimelineSelector = () => {
  const isMobile = useIsMobile();

  return isMobile ? <TimelineSelectorMobile /> : <TimelineSelectorDesktop />;
};
