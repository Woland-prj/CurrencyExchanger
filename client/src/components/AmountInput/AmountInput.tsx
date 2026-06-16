import styles from './AmountInput.module.scss';

type AmountInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const AmountInput = ({ value, onChange }: AmountInputProps) => {
  return <input className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} />;
};
