import React, { useState } from 'react';
import './PdfUpload.css';

const PdfUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Selected File:', selectedFile);
      
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('localhost:9090/pdf/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('File upload failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('File uploaded successfully:', data);
        setSelectedFile(null)
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div id='upload-div'>
      <label id='upload-pdf'>Upload PDF:</label>
      <label htmlFor="upload-file-input" id='upload-file-label'>
        {selectedFile ? selectedFile.name : 'Choose PDF File'}
      </label>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        id='upload-file-input'
      />
      <button onClick={handleUpload} id='upload-button'>
        Upload PDF
      </button>
    </div>
  );
};

export default PdfUpload;
