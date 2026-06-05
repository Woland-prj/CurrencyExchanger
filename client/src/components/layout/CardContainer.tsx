import styles from './CardContainer.module.scss';
import type { ReactNode } from 'react';

type CardContainerProps = {
  children: ReactNode;
};

export const CardContainer = ({ children }: CardContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};
