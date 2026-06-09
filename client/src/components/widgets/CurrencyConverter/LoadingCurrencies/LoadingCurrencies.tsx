import { Card } from '../../../ui/Card/Card';
import styles from './LoadingCurrencies.module.scss';

export const LoadingCurrencies = () => {
  return (
    <Card>
      <p className={styles.loading}>Loading currencies...</p>
    </Card>
  );
};
