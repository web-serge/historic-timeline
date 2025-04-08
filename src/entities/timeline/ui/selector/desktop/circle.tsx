import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useTimelines } from '../../../lib/timelines-provider';
import { calculateDotPosition } from '../../../lib/calc-dot-position';

import desktopStyles from './styles.module.scss';

import { ExpandDot } from '@/shared/ui/expand-dot';
import { radToDeg } from '@/shared/lib/utils/rad-to-deg';

export const TimelineCircle = () => {
  const { setActiveTimelineIndex, timelines, activeTimelineIndex } = useTimelines();

  const container = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const radius = 265;
  const startAngle = -Math.PI / 6;
  const totalDots = timelines.length;

  const [dots] = useState(timelines.map(({ id }) => id));

  useEffect(() => {
    handleDotClick(activeTimelineIndex);
  }, [activeTimelineIndex]);

  const { contextSafe } = useGSAP(
    () => {
      dots.forEach((_, index) => {
        const { x, y } = calculateDotPosition(radius, index, totalDots, startAngle);

        gsap.set(`.dot-${index}`, { x, y });

        // Устанавливаем вращение круга так, как будто нажали на первую точку
        const clickedAngle = ((2 * Math.PI) / totalDots) * 0;
        const rotateBy = startAngle - clickedAngle;

        gsap.set(circleRef.current, {
          rotation: radToDeg(rotateBy),
        });

        dots.forEach((_, dotIndex) => {
          const angleOffset = -radToDeg(rotateBy);

          gsap.set(`.dot-${dotIndex}`, {
            rotation: angleOffset,
          });
        });
      });
    },
    { scope: container },
  );

  const handleDotClick = contextSafe((index: number) => {
    const clickedAngle = ((2 * Math.PI) / totalDots) * index;
    const rotateBy = startAngle - clickedAngle;
    const degrees = radToDeg(rotateBy);

    // Поворачиваем контейнер
    gsap.to(circleRef.current, {
      duration: 1,
      rotation: degrees,
      ease: 'power2.inOut',
    });

    // Поворачиваем каждую точку в противоположную сторону
    dots.forEach((_, dotIndex) => {
      const angleOffset = -degrees;

      gsap.to(`.dot-${dotIndex}`, {
        duration: 1,
        rotation: angleOffset,
        ease: 'power2.inOut',
      });
    });

    setActiveTimelineIndex(index);
  });

  return (
    <div ref={container} className={desktopStyles['circle-wrapper']}>
      <div
        ref={circleRef}
        className={desktopStyles.circle}
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {dots.map((_, index) => (
          <div key={index} className={`${desktopStyles['dot-wrapper']} dot-${index}`}>
            <ExpandDot
              isActive={activeTimelineIndex === index}
              title={timelines[index].name}
              onClick={() => handleDotClick(index)}
            >
              {index + 1}
            </ExpandDot>
          </div>
        ))}
      </div>
    </div>
  );
};
