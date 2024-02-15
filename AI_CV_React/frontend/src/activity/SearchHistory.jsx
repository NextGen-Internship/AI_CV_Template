import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchHistory.css";

const SearchHistory = ({ onSearchItemClicked }) => {
  const [searchHistory, setSearchHistory] = useState([]);
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
      const lastTenItems = response.data.slice(-11).reverse();
      setSearchHistory(lastTenItems);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const handleItemClick = (item) => {
    onSearchItemClicked(item);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date + "Z").toLocaleDateString();
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="search-history">
        {searchHistory.map((item) => (
          <div
            key={item.id}
            className="search-item"
            onClick={() => handleItemClick(item)}
          >
            <p>
              CV: {item.personEmail} - Date:
              {formatDate(item.createdDate)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
