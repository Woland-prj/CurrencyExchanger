import styles from './Card.module.scss';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Card = ({ children }: Props) => {
  return <div className={styles.card}>{children}</div>;
};
