import { Meta } from '@storybook/react';
import { useState, FC } from 'react';

import { FileDropzone, FileDropzoneProps } from './file-dropzone';

export default {
  title: 'File Dropzone',
  component: FileDropzone,
} as Meta<typeof FileDropzone>;

const requestEmulation = () =>
  new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(true);
      clearTimeout(timeout);
    }, 10000);
  });

const CommonDropzone: FC<FileDropzoneProps> = (props) => {
  const [isUploading, setUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState<number | null>(
    null
  );

  const cancelRequest = () => {
    setUploading(false);
    setUploadingProgress(null);
  };

  const startRequest = async () => {
    // Emulation of uploading
    setUploading(true);

    const interval = setInterval(() => {
      setUploadingProgress((oldProgress) => (oldProgress || 0) + 10);
    }, 1000);

    await requestEmulation();

    clearInterval(interval);

    cancelRequest();
  };

  const onFilesSelected = () => {
    void startRequest();
  };

  return (
    <FileDropzone
      {...props}
      onFilesSelected={onFilesSelected}
      progressData={
        uploadingProgress && isUploading
          ? {
              percents: uploadingProgress,
              onCancel: cancelRequest,
            }
          : undefined
      }
    />
  );
};

export const SingleDropzone = () => {
  return <CommonDropzone onFilesSelected={() => {}} />;
};

export const MultipleDropzone = () => {
  return <CommonDropzone onFilesSelected={() => {}} allowMultiple />;
};

export const ImagesDropzone = () => {
  return (
    <CommonDropzone
      onFilesSelected={() => {}}
      accept={{
        'image/*': ['.jpeg', '.png'],
      }}
    />
  );
};

export const PdfDropzone = () => {
  return (
    <CommonDropzone
      onFilesSelected={() => {}}
      accept={{
        'pdf/*': ['.pdf'],
      }}
    />
  );
};
