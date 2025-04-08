import styles from './styles.module.scss';

export const TimelineSelectorTitle = () => {
  return (
    <div className={styles['title-wrapper']}>
      <div className={styles['accent-line']} />
      <h1>
        Исторические
        <br />
        даты
      </h1>
    </div>
  );
};
