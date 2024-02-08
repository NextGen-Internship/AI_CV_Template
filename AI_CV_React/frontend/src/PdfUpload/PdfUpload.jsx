import React, { useState } from "react";
import axios from "axios";
import "./PdfUpload.css";
import PdfDownload from "../PdfDownload/PdfDownload";
import CvTemplate from "../cv/CvTemplate";

const PdfUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [gmail, setGmail] = useState("");
  const [uploadSuccessful, setIsUploadSuccessful] = useState(true);
  const [response, setResponse] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleGmailChange = (event) => {
    const { value } = event.target;
    setGmail(value);
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (selectedFile && gmail) {
      const formData = new FormData();
      const storedToken = localStorage.getItem("jwtToken");
      formData.append("file", selectedFile);
      formData.append("gmail", gmail);

      axios
        .post("http://localhost:8080/pdf/upload", formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setSelectedFile(null);
          setGmail("");
          setResponse(response);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.log("Please select a file and enter a Gmail address.");
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

      <label htmlFor="gmail-input">Enter Gmail Address:</label>
      <input
        type="email"
        id="gmail-input"
        value={gmail}
        onChange={handleGmailChange}
      />

      <button onClick={handleUpload} id="upload-button">
        Upload PDF
      </button>

      {response && (
        <div>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
