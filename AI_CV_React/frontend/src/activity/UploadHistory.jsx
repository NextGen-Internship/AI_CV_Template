import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadHistory = () => {
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
      setUploadHistory(JSON.stringify(response.data));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  return (
    <div>
      <p onClick={fetchUploadHistory}>Upload History</p>
    </div>
  );
};

export default UploadHistory;
