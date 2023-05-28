import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { FC } from 'react';
import { useSnackbar } from 'notistack';

import styles from './file-dropzone.module.css';
import fileIcon from './assets/icons/file-icon.png';
import { Progress } from './components/progress/progress';

/**
 * (Optional) Data and handler for progress UI
 */
interface ProgressData {
  /**
   * Progress of uploading(in percents), cannot be more 100
   */
  percents: number;
  /**
   * Function-callback for cancel uploading
   */
  onCancel: () => void;
}

export interface FileDropzoneProps {
  /**
   * Callback for when files selected
   */
  onFilesSelected: (files: File[]) => void;
  /**
   * (Optional) Allow multiple files to be uploaded
   */
  allowMultiple?: boolean;
  /**
   * (Optional) `Accept` object, to be parsed by the `react-dropzone` library.
   * For more details, refer to the [documentation for `react-dropzone`][1].
   *
   * [1]: https://react-dropzone.js.org/#!/Accepting%20specific%20file%20types
   */
  accept?: Accept;
  /**
   * (Optional) Data for progress bar
   */
  progressData?: ProgressData | null;
}

/**
 * FileDropzone component
 */
export const FileDropzone: FC<FileDropzoneProps> = ({
  onFilesSelected,
  accept,
  allowMultiple = false,
  progressData,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    // Warn and do nothing if adding multiple files when disallowed
    if (!allowMultiple && acceptedFiles.length + rejectedFiles.length > 1) {
      enqueueSnackbar('Only one file can be added', { variant: 'error' });
      return;
    }
    // Warn if trying to add unsupported file
    if (rejectedFiles.length) {
      enqueueSnackbar('Only supported files can be added', {
        variant: 'error',
      });
      return;
    }

    onFilesSelected(acceptedFiles);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept,
    multiple: allowMultiple,
    useFsAccessApi: false,
  });

  if (progressData) {
    return (
      <div className={styles['main-container']}>
        <div className={styles['drop-container']}>
          <Progress
            percents={progressData.percents}
            onCancel={progressData.onCancel}
            allowMultiple={allowMultiple}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['main-container']} {...getRootProps()}>
      <div className={styles['drop-container']}>
        <div className={styles.controls}>
          <input {...getInputProps()} data-testid="file-dropzone-input" />
          <h1>
            Add file{allowMultiple && 's'} to check container or start signing
            by uploading document
            {allowMultiple && 's'}
          </h1>
          <div className={styles.button} onClick={open}>
            <img src={fileIcon as string} />
            Add file
            {allowMultiple && 's'}
          </div>
          <p>
            or drop document
            {allowMultiple && 's'} here
          </p>
        </div>
      </div>
    </div>
  );
};
