import { useTimelines } from '../../lib/timelines-provider';

import styles from './styles.module.scss';

import Caret from '@/shared/assets/icons/caret.svg';

const normalizeIndex = (index: number) => index.toString().padStart(2, '0');

export const TimelineSelectorControls = () => {
  const { timelines, setActiveTimelineIndex, activeTimelineIndex } = useTimelines();

  const timelinesCount = timelines.length;

  const currentTimeline = normalizeIndex(activeTimelineIndex + 1);
  const maxTimeline = normalizeIndex(timelinesCount);

  const handleDecIndex = () => setActiveTimelineIndex(activeTimelineIndex - 1);
  const handleIncIndex = () => setActiveTimelineIndex(activeTimelineIndex + 1);

  return (
    <div className={styles['controls-wrapper']}>
      <p>
        {currentTimeline}/{maxTimeline}
      </p>
      <div className={styles['buttons-wrapper']}>
        <button
          className={styles.back}
          disabled={activeTimelineIndex === 0}
          onClick={handleDecIndex}
        >
          <Caret />
        </button>
        <button disabled={activeTimelineIndex === timelinesCount - 1} onClick={handleIncIndex}>
          <Caret />
        </button>
      </div>
    </div>
  );
};
