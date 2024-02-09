import React from "react";
import "./SearchCv.css";

const SearchCV = ({ email, handleInputChange, handleFetchData }) => {
  return (
    <div className="search-form">
      <label className="label-input-mail" htmlFor="personId">
        Enter Person Email:{" "}
      </label>
      <input
        className="input-email"
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
