import React from "react";

const SearchCV = ({ personId, handleInputChange, handleFetchData }) => {
  console.log(personId);
  return (
    <div>
      <label htmlFor="personId">Enter Person ID:</label>
      <input
        type="text"
        id="personId"
        name="personId"
        value={personId}
        onChange={handleInputChange}
      />
      <button onClick={handleFetchData}>Fetch Data</button>
    </div>
  );
};

export default SearchCV;
