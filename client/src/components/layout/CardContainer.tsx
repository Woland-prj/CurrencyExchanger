import styles from './CardContainer.module.scss';
import type { ReactNode } from 'react';

export const CardContainer = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
