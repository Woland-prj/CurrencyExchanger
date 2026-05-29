import styles from './AmountInput.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const AmountInput = ({ value, onChange }: Props) => {
  return <input className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} />;
};
