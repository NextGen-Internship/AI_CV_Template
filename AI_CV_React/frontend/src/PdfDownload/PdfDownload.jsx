import React, { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import axios from "axios";
import CvTemplate from "../cv/CvTemplate";
import SearchCV from "../cv/SearchCV";

const PdfDownload = ({ email }) => {
  const [personEmail, setPersonEmail] = useState("");
  const [personData, setPersonData] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personSummary, setPersonSummary] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const { toPDF, targetRef } = usePDF({ filename: personName + ".pdf" });

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
    setPersonEmail(e.target.value);
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

  if (personData != null) {
    const { name, summary, education, experiences } = personData;
  }

  return (
    <div id="download-div">
      <SearchCV
        personEmail={personEmail}
        handleInputChange={handleInputChange}
        handleFetchData={handleFetchData}
      />
      <button onClick={() => toPDF()}>Download Pdf</button>
      <div ref={targetRef}>
        <CvTemplate
          personName={personName}
          personSummary={personSummary}
          technologies={technologies}
          education={education}
          experiences={experiences}
        />
      </div>
    </div>
  );
};

export default PdfDownload;
