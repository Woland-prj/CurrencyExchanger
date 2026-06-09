import styles from './PriceNotification.module.scss';

type PriceNotificationProps = {
  type: 'error' | 'loading';
  message: string;
};

export const PriceNotification = ({ type, message }: PriceNotificationProps) => {
  const className = `${styles.notification} ${styles[type]}`;

  return <div className={className}>{message}</div>;
};
