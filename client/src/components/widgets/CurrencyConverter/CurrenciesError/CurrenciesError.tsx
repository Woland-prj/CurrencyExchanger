import { Card } from '../../../ui/Card/Card';
import styles from './CurrenciesError.module.scss';

type CurrenciesErrorProps = {
  error: string;
};

export const CurrenciesError = ({ error }: CurrenciesErrorProps) => {
  return (
    <Card>
      <div className={styles.error}>
        <p className={styles.message}>Server is unavailable. Please try again later.</p>
        <p className={styles.detail}>{error}</p>
      </div>
    </Card>
  );
};
