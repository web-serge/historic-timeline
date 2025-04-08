'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MouseEventHandler, PropsWithChildren, useRef, useState } from 'react';

import styles from './styles.module.scss';

type Props = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  isActive?: boolean;
}>;

export const ExpandDot = ({ children, onClick, title, isActive = false }: Props) => {
  const container = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  useGSAP(
    () => {
      if (!container.current) return;

      if (isHovered || isActive) {
        gsap.to('.circle', {
          width: 60,
          height: 60,
          backgroundColor: '#f5f6fa',
        });

        gsap.to('.textp', {
          opacity: 1,
        });
      }

      if (!isHovered && !isActive) {
        gsap.to('.circle', {
          width: 6,
          height: 6,
          backgroundColor: '#42567A',
        });

        gsap.to('.textp', {
          opacity: 0,
        });
      }
    },
    { dependencies: [isHovered, isActive], scope: container },
  );

  useGSAP(
    () => {
      if (!container.current) return;

      if (isActive) {
        gsap.to('.title', {
          scale: 1,
          opacity: 1,
          delay: 0.5,
        });
      }
    },
    { dependencies: [isActive], scope: container, revertOnUpdate: true },
  );

  return (
    <button
      ref={container}
      className={styles.wrapper}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.circle} circle`} />
      <p className={`${styles.text} textp`}>{children}</p>
      <h3 className={`${styles.title} title`}>{title}</h3>
    </button>
  );
};
