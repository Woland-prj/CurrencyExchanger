import styles from './ExchangeRateHeader.module.scss';

type ExchangeRateHeaderProps = {
  rate: number;
  from: string;
  to: string;
  updateDate: Date;
};

export const ExchangeRateHeader = ({ rate, from, to, updateDate }: ExchangeRateHeaderProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false
  }).format(updateDate);

  return (
    <div className={styles.header}>
      <span className={styles.info}>1 {from} is</span>
      <h1 className={styles.title}>
        {rate} {to}
      </h1>
      <small className={styles.date}>{formattedDate} UTC</small>
    </div>
  );
};
