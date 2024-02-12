import React, { useState } from "react";
import "./SearchCv.css";

const SearchCV = ({ email, handleInputChange, handleFetchData }) => {
  const [emailError, setEmailError] = useState("");

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputEmail === "") {
      setEmailError("Email is required");
    } else if (!emailRegex.test(inputEmail)) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleInputValidation = (e) => {
    handleInputChange(e);
    validateEmail(e.target.value);
  };

  const handleButtonClick = () => {
    validateEmail(email);

    if (emailError === "") {
      handleFetchData();
      handleInputChange({ target: { name: "email", value: "" } });
    }
  };

  return (
    <div className="search-form">
      <label className="label-input-mail" htmlFor="personId">
        Enter Person Email:{" "}
      </label>
      <input
        className="input-email"
        type="text"
        name="email"
        value={email}
        onChange={handleInputValidation}
      />
      {emailError && <p className="error-message">{emailError}</p>}
      <button className="find-cv" onClick={handleButtonClick}>
        Find CV
      </button>
    </div>
  );
};

export default SearchCV;
