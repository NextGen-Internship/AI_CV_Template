import React, { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import axios from "axios";
import CvTemplate from "../cv/CvTemplate";
import SearchCv from "../cv/SearchCv";
import "./PdfDownload.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfDownload = ({ email }) => {
  const [personId, setPersonId] = useState("");
  const [personData, setPersonData] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personSummary, setPersonSummary] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // const { toPDF, targetRef } = usePDF({
  //   filename: personName + ".pdf",
  //   scale: 2,
  //   options: {
  //     format: "A4",
  //   },
  // });

  const downloadPDF = () => {
    const capture = document.querySelector(".entire-cv");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save(personName + ".pdf");
    });
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
    setPersonId(e.target.value);
  };

  const handleFetchData = () => {
    if (email) {
      fetchByEmail(email);
    } else if (personId !== "") {
      fetchByEmail(personId);
    }
  };

  useEffect(() => {
    if (email) {
      fetchByEmail(email);
    }
  }, [email]);

  if (personData != null) {
    const { name, summary, education, experiences } = personData;
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
          <button className="btn-download" onClick={downloadPDF}>
            Download Pdf
          </button>
        </div>
        <div className="cv-section">
          <div className="entire-cv">
            <CvTemplate
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
