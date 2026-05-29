import styles from './Card.module.scss';
import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

export const Card = ({ children }: CardProps) => {
  return <div className={styles.card}>{children}</div>;
};
