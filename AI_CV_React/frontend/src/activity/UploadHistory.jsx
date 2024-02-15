import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadHistory.css";

const UploadHistory = ({ onSearchItemClicked }) => {
  const [uploadHistory, setUploadHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const storedToken = localStorage.getItem("jwtToken");

  const fetchUploadHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/activity/uploaded",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const lastTenItems = response.data.slice(-11).reverse();
      setUploadHistory(lastTenItems);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date + "Z").toLocaleDateString();
  };

  const handleItemClick = (item) => {
    onSearchItemClicked(item);
  };

  useEffect(() => {
    fetchUploadHistory();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="upload-history">
        {uploadHistory.map((item) => (
          <div
            key={item.id}
            className="upload-item"
            onClick={() => handleItemClick(item)}
          >
            <p>
              CV: {item.personEmail} - Date: {formatDate(item.createdDate)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadHistory;
