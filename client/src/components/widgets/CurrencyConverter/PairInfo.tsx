import styles from './PairInfo.module.scss';

export const PairInfo = ({ pair }: { pair: string }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.divider}></div>

      <div className={styles.badge}>{pair}: about ↑</div>
    </div>
  );
};
