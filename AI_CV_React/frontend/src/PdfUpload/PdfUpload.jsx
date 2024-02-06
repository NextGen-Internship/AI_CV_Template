import React, { useState } from "react";
import axios from "axios";
import "./PdfUpload.css";
import PdfDownload from "../PdfDownload/PdfDownload";
import CvTemplate from "../cv/CvTemplate";

const PdfUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccessful, setIsUploadSuccessful] = useState(true);
  const [response, setResponse] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      const storedToken = localStorage.getItem("jwtToken");
      formData.append("file", selectedFile);

      const response = axios
        .post("http://localhost:8080/pdf/upload", formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setSelectedFile(null);
          setResponse(response);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div id="upload-div">
      <label id="upload-pdf">Upload PDF:</label>
      <i className="fa fa-download" aria-hidden="true"></i>
      <label htmlFor="upload-file-input" id="upload-file-label">
        {selectedFile ? (
          <>
            <iframe
              src={`${URL.createObjectURL(selectedFile)}#toolbar=0`}
              type="application/pdf"
              className="preview"
            />
            <button onClick={handleRemove} id="remove-button">
              Remove PDF
            </button>
          </>
        ) : (
          "Choose PDF File"
        )}
      </label>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        id="upload-file-input"
      />
      <button onClick={handleUpload} id="upload-button">
        Upload PDF
      </button>
      <PdfDownload></PdfDownload>
      {response && (
        <div>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
