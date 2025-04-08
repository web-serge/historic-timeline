import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

import { ITimeline } from '../../model/timeline.type';

import styles from './styles.module.scss';

type Props = {
  startYear: ITimeline['startYear'];
  endYear: ITimeline['endYear'];
};

export const TimelineSelectorYears = ({ startYear, endYear }: Props) => {
  const container = useRef(null);

  const startYearMemo = useRef(startYear);
  const endYearMemo = useRef(endYear);

  useGSAP(
    () => {
      const { current: start } = startYearMemo;
      const { current: end } = endYearMemo;

      if (startYear === start || endYear === end) return;

      gsap.from('.counter-start', {
        innerText: start,
        duration: 1,
        snap: {
          innerText: 1,
        },
      });

      gsap.from('.counter-end', {
        innerText: end,
        duration: 1,
        snap: {
          innerText: 1,
        },
      });

      if (start !== startYear) {
        startYearMemo.current = startYear;
      }

      if (end !== endYear) {
        endYearMemo.current = endYear;
      }
    },
    { dependencies: [startYear, endYear], scope: container },
  );

  return (
    <div ref={container} className={styles['years_wrapper']}>
      <h2 className={styles.text}>
        <span className={`${styles.primary} counter-start`}>{startYear}</span>
        <span className={styles.spacer}> </span>
        <span className={`${styles.secondary} counter-end`}>{endYear}</span>
      </h2>
    </div>
  );
};
