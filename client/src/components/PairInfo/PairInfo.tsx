import styles from './PairInfo.module.scss';

type PairInfoProps = {
  pair: string;
};

export const PairInfo = ({ pair }: PairInfoProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.divider}></div>

      <div className={styles.badge}>{pair}: about ↑</div>
    </div>
  );
};
