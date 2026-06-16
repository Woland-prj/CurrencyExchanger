import styles from './AmountInput.module.scss';

type AmountInputProps = {
  value: string;
  onChange: (value: string) => void;
  isBlocked: boolean;
};

export const AmountInput = ({ value, onChange, isBlocked }: AmountInputProps) => {
  return (
    <input className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} readOnly={isBlocked} />
  );
};
