import React, { useState } from 'react';
import styles from './style.module.scss';

const FileInput = ({ label = 'העלה קובץ' }) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  return (
    <div className={styles.fileInputWrapper}>
      <input
        type="file"
        id="file"
        name="file"
        className={styles.fileInput}
        onChange={handleChange}
      />
      <label htmlFor="file" className={styles.fileInputLabel}>
        {label}
      </label>
      {fileName && <div className={styles.fileName}>Selected file: {fileName}</div>}
    </div>
  );
};

export default FileInput;
