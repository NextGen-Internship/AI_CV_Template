import React, { useEffect, useState, useRef } from "react";
import { usePDF } from "react-to-pdf";
import axios from "axios";
import CvTemplate from "../cv/CvTemplate";
import SearchCv from "../cv/SearchCv";
import "./PdfDownload.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import SearchHistory from "../activity/SearchHistory";
import UploadHistory from "../activity/UploadHistory";

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
  const [activeTab, setActiveTab] = useState(0);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
      setPersonId(response.data.id);
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

  const fetchCVTemplate = async (item) => {
    try {
      fetchByEmail(item.personEmail);
    } catch (error) {
      console.error("Error fetching CV template:", error);
    }
  };

  const handleSearchItemClicked = (item) => {
    fetchCVTemplate(item);
  };

  const handleInputChange = (e) => {
    setPersonEmail(e.target.value);
    setPersonId(e.target.value);
  };

  const handleFetchData = () => {
    if (email) {
      fetchByEmail(email);
    } else if (personEmail !== "") {
      fetchByEmail(personEmail);
    }
  };

  useEffect(() => {
    if (email) {
      fetchByEmail(email);
    }
  }, [email]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  if (personData != null) {
    const { id, email, name, summary, education, experiences } = personData;
  }

  return (
    <div id="download-div">
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div className="search-section">
          <div className="section-label-search">Find CV & Download</div>
          <SearchCv
            personId={personId}
            handleInputChange={handleInputChange}
            handleFetchData={handleFetchData}
          />
          <div className="section-label-download">Download PDF:</div>
          <button className="btn-download" onClick={handlePrint}>
            Download Pdf
          </button>
          <div className="tabs-container">
            <div className="tabs">
              <span
                className={activeTab === 0 ? "tab active" : "tab"}
                onClick={() => handleTabClick(0)}
              >
                Upload History
              </span>
              <span
                className={activeTab === 1 ? "tab active" : "tab"}
                onClick={() => handleTabClick(1)}
              >
                Search History
              </span>
            </div>
            <div className="tab-content">
              {activeTab === 0 && (
                <div className="content">
                  <UploadHistory
                    onSearchItemClicked={handleSearchItemClicked}
                  ></UploadHistory>
                </div>
              )}
              {activeTab === 1 && (
                <div className="content">
                  <SearchHistory
                    onSearchItemClicked={handleSearchItemClicked}
                  ></SearchHistory>
                </div>
              )}
            </div>
          </div>
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
