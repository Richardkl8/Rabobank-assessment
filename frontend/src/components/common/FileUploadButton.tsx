import React, { FC, useRef } from 'react';

interface FileUploadButtonProps {
  handleFile: (file: File) => void;
  className?: string;
}

export const FileUploadButton: FC<FileUploadButtonProps> = ({ handleFile, className }) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      handleFile(fileUploaded);
    }
  };
  return (
    <div className={className}>
      <button
        className="w-full rounded-md bg-white px-4 py-2  font-bold text-blue-900 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={handleClick}
      >
        Upload
      </button>
      <input type="file" onChange={handleChange} ref={hiddenFileInput} className="hidden" />
    </div>
  );
};
