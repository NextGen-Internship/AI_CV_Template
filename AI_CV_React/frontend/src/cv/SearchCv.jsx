import React from "react";
import "./SearchCv.css";

const SearchCV = ({ email, handleInputChange, handleFetchData }) => {
  return (
    <div className="search-form">
      <label htmlFor="personId">Enter Person Email: </label>
      <input
        type="text"
        email="email"
        name="email"
        value={email}
        onChange={handleInputChange}
      />
      <button className="find-cv" onClick={handleFetchData}>
        Find CV
      </button>
    </div>
  );
};

export default SearchCV;
