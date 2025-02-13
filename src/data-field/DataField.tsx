import styles from './DataField.module.css';

interface IDataField {
  label: string;
  content: string | number;
}

export default function DataField({ label, content }: Readonly<IDataField>) {
  return (
    <div className={styles['data-field-container']}>
      <p className={styles.label}>{label}: </p>
      <p className={styles.content}>{content}</p>
    </div>
  );
}
