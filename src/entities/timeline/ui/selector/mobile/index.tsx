import { TimelineSelectorTitle } from '../title';
import { useTimelines } from '../../../lib/timelines-provider';
import { TimelineSelectorYears } from '../years';
import styles from '../styles.module.scss';

export const TimelineSelectorMobile = () => {
  const { timelines, activeTimelineIndex } = useTimelines();

  const { startYear, endYear } = timelines[activeTimelineIndex];

  return (
    <div className={styles.wrapper}>
      <TimelineSelectorTitle />
      <TimelineSelectorYears endYear={endYear} startYear={startYear} />
    </div>
  );
};
