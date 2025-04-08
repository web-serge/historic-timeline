import { IEvent } from '../../model/event.type';

import styles from './styles.module.scss';
type Props = {
  event: IEvent;
};

export const EventCard = ({ event }: Props) => {
  const { year, body } = event;

  return (
    <div className={styles.wrapper}>
      <h5>{year}</h5>
      <p>{body}</p>
    </div>
  );
};
