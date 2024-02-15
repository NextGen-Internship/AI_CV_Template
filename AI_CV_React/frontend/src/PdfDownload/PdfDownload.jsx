import React, { useEffect, useState, useRef } from "react";
import { usePDF } from "react-to-pdf";
import axios from "axios";
import CvTemplate from "../cv/CvTemplate";
import SearchCv from "../cv/SearchCv";
import "./PdfDownload.css";
import { useReactToPrint } from "react-to-print";

const ComponentToPrint = React.forwardRef(
  (
    {
      personId,
      email,
      personName,
      personSummary,
      technologies,
      education,
      experiences,
    },
    ref
  ) => (
    <div ref={ref}>
      <CvTemplate
        personId={personId}
        personEmail={email}
        personName={personName}
        personSummary={personSummary}
        technologies={technologies}
        education={education}
        experiences={experiences}
      />
    </div>
  )
);

const PdfDownload = ({ email }) => {
  const [personId, setPersonId] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personData, setPersonData] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personSummary, setPersonSummary] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [emailError, setEmailError] = useState("");
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputEmail === "") {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(inputEmail)) {
      setEmailError("Enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const fetchByEmail = async (email) => {
    try {
      const storedToken = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `http://localhost:8080/person/${email}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log(response.data);
      setPersonId(response.data.id);
      console.log(personId);
      setPersonData(response.data);
      setPersonName(response.data.name);
      setPersonSummary(response.data.summary);
      setExperiences(response.data.experience);
      setEducation(response.data.education);
      setTechnologies(response.data.technologies);
    } catch (error) {
      console.error("Error fetching person data:", error);
    }
  };

  const handleInputChange = (e) => {
    setPersonEmail(e.target.value);
    setPersonId(e.target.value);
  };

  const handleButtonClick = () => {
    const isValid = validateEmail(personEmail);
    if (isValid) {
      fetchByEmail(personEmail);
    }
  };

  useEffect(() => {
    if (email) {
      fetchByEmail(email);
    }
  }, [email]);

  if (personData != null) {
    const { id, email, name, summary, education, experiences } = personData;
  }

  return (
    <div id="download-div">
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div className="search-section">
          <div className="section-label-search">Find CV & Download</div>
          <SearchCv
            email={personEmail}
            handleInputChange={handleInputChange}
            handleFetchData={handleButtonClick}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <div className="section-label-download">Download PDF:</div>
          <button className="btn-download" onClick={handlePrint}>
            Download Pdf
          </button>
        </div>
        <div className="cv-section">
          <div className="entire-cv">
            <ComponentToPrint
              ref={componentRef}
              personId={personId}
              personEmail={email}
              personName={personName}
              personSummary={personSummary}
              technologies={technologies}
              education={education}
              experiences={experiences}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDownload;
