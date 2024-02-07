import React, { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";
import axios from "axios";
import CvTemplate from "../cv/CvTemplate";
import SearchCV from "../cv/SearchCV";

const PdfDownload = ({ selectedEmail }) => {
  const [personId, setPersonId] = useState("");
  const [personData, setPersonData] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personSummary, setPersonSummary] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const { toPDF, targetRef } = usePDF({ filename: personName + ".pdf" });

  const handleInputChange = (e) => {
    setPersonId(e.target.value);
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

  const fetchById = async () => {
    try {
      const storedToken = localStorage.getItem("jwtToken");

      const response = await axios.get(
        `http://localhost:8080/pdf/${personId}`,
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

  useEffect(() => {
    if (selectedEmail) {
      fetchByEmail(selectedEmail);
    } else {
      fetchById(personData?.id);
    }
  }, [selectedEmail]);

  if (personData != null) {
    const { name, summary, education, experiences } = personData;
  }

  return (
    <div id="download-div">
      {/* <SearchCV
        personId={personId}
        handleInputChange={handleInputChange}
        handleFetchData={handleFetchData}
      /> */}
      <SearchCV
        handleInputChange={(e) => setPersonData(null)}
        handleFetchData={() => fetchById(personData?.id)}
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
