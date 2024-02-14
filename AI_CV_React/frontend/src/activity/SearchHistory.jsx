import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchHistory = () => {
  const [searchHistory, setSearhHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const storedToken = localStorage.getItem("jwtToken"); 

    const fetchSearchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/activity/searched",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setSearhHistory(JSON.stringify(response.data)); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
     <p onClick={fetchSearchHistory}>Search History</p>
    </div>
  );
};

export default SearchHistory;
