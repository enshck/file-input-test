import { FC } from 'react';

import styles from './progress.module.css';

interface ProgressProps {
  /**
   * Progress of uploading(in percents), cannot be more 100
   */
  percents: number;
  /**
   * Function-callback for cancel uploading
   */
  onCancel: () => void;
  /**
   * (Optional) allow multiple files to be uploaded
   */
  allowMultiple?: boolean;
}

export const Progress: FC<ProgressProps> = ({
  onCancel,
  percents,
  allowMultiple,
}) => {
  const correctPercents = percents > 100 ? 100 : percents;

  return (
    <div className={styles['main-container']}>
      <p>Uploading file{allowMultiple && '(s)'}</p>
      <div className={styles['progress-container']}>
        <div className={styles['progress-background']}>
          <div
            className={styles.progress}
            style={{
              width: `${correctPercents}%`,
            }}
          />
        </div>
        <span>{correctPercents}%</span>
      </div>
      <div className={styles.button} onClick={onCancel}>
        Cancel
      </div>
    </div>
  );
};
