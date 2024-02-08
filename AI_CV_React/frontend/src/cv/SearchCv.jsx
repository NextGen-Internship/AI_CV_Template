import React from "react";

const SearchCV = ({ email, handleInputChange, handleFetchData }) => {
  console.log(email);
  return (
    <div>
      <label htmlFor="personId">Enter Person Email:</label>
      <input
        type="text"
        email="email"
        name="email"
        value={email}
        onChange={handleInputChange}
      />
      <button onClick={handleFetchData}>Fetch Data</button>
    </div>
  );
};

export default SearchCV;
