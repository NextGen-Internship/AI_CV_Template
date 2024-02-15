import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CvTemplate.css";
import image from "/public/logo.png";

const CvTemplate = ({
  personId,
  personEmail,
  personName,
  personSummary,
  technologies,
  education,
  experiences,
}) => {
  const [editableIndex, setEditableIndex] = useState(false);
  const [newTechnology, setNewTechnology] = useState("");
  const [showNewTechnologyInput, setShowNewTechnologyInput] = useState(false);
  const [summary, setSummary] = useState("");
  const [personExperiences, setPersonExperiences] = useState([]);
  const [isParagraphClicked, setIsParagraphClicked] = useState(false);

  useEffect(() => {
    setSummary(personSummary);
  }, [personSummary]);

  useEffect(() => {
    // Create a deep copy of experiences
    const copiedExperiences = experiences.map((exp) => ({ ...exp }));

    // Set the copied experiences to personExperiences state
    setPersonExperiences(copiedExperiences);
  }, [experiences]);

  // Function to update summary
  const handleSummaryChange = (newSummary) => {
    setSummary(newSummary);
  };

  const handleEdit = (index) => {
    setEditableIndex(index);
    setIsParagraphClicked(true); // Set to true when paragraph is clicked
  };

  const handleSaveTechnology = () => {
    const storedToken = localStorage.getItem("jwtToken");
    const addTech = {
      name: newTechnology,
    };

    axios
      .post(`http://localhost:8080/technology`, addTech, {
        params: { personId },
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        console.log("New technology added", response.data);
        setEditableIndex(-1);
        setNewTechnology("");
        setShowNewTechnologyInput(false);
      })
      .catch((error) => {
        console.error("Error adding technology:", error);
      });
  };

  const handleSaveExperience = (field, updatedValue, index) => {
    console.log("Updating experience:", index);
    console.log("Field:", field);
    console.log("Updated value:", updatedValue);

    // Create a new copy of the personExperiences array
    const updatedPersonExperiences = [...personExperiences];
    // Update the specific experience within the new copy
    updatedPersonExperiences[index] = {
      ...updatedPersonExperiences[index],
      description: updatedValue,
    };

    console.log("Updated experiences:", updatedPersonExperiences);

    // Update the state with the new copy of personExperiences
    setPersonExperiences(updatedPersonExperiences);

    console.log("Person experiences after update:", personExperiences);

    // Reset editable index
    setEditableIndex(-1);
    setIsParagraphClicked(true); // Set to true when paragraph is clicked
  };

  const handleSave = (updatedSummary, updatedPersonExperiences) => {
    console.log(personExperiences);
    const updatedPerson = {
      id: personId,
      email: personEmail,
      summary: updatedSummary,
      technologies: technologies,
      education: education,
      experience: updatedPersonExperiences,
    };
    const storedToken = localStorage.getItem("jwtToken");
    axios
      .put(`http://localhost:8080/person/update`, updatedPerson, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        console.log("Person updated successfully:", response.data);
        setEditableIndex(-1);
        setIsParagraphClicked(false); // Reset to false after save
      })
      .catch((error) => {
        console.error("Error updating person:", error);
      });
  };

  const handleParagraphClick = (index) => {
    setEditableIndex(index);
    setShowNewTechnologyInput(false);
    setIsParagraphClicked(true); // Set to true when paragraph is clicked
  };

  const handleNewTechnologyChange = (e) => {
    setNewTechnology(e.target.value);
  };

  return (
    <div>
      <div id="cv">
        <div id="nameAndRole">
          <img src={image} alt="edf" />
          <h1>{personName}</h1>
          {experiences.length > 0 && <h2>{experiences[0].role}</h2>}
        </div>
        <div id="all">
          <div id="STE">
            <div className="first">
              <h3>Summary</h3>
              <div className="line"></div>
              {editableIndex === personSummary ? (
                <textarea
                  className="textArea"
                  defaultValue={summary}
                  rows={10}
                  onBlur={(e) => {
                    handleSummaryChange(e.target.value);
                  }}
                  autoFocus
                />
              ) : (
                <p onClick={() => handleEdit(personSummary)}>{summary}</p>
              )}
            </div>
            <div
              className="first"
              onClick={() => setShowNewTechnologyInput(true)}
            >
              <h3>Technologies</h3>
              <div className="line"></div>
              <i>
                {technologies.map((tech, index) => (
                  <React.Fragment key={index}>
                    {tech.name}
                    {index < technologies.length - 1 ? ", " : ""}
                  </React.Fragment>
                ))}
              </i>
              {showNewTechnologyInput && (
                <div>
                  <input
                    type="text"
                    value={newTechnology}
                    onChange={handleNewTechnologyChange}
                    placeholder="Add new technology"
                  />
                  <button onClick={handleSaveTechnology}>Add</button>
                </div>
              )}
            </div>
            <div className="first">
              <h3>Education</h3>
              <div className="line"></div>
              <ul>
                {education.map((edu, index) => (
                  <li key={index}>
                    <i>
                      {edu.degree} - {edu.college}, {edu.startYear} -{" "}
                      {edu.endYear}
                    </i>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div id="Experience">
            <h3>Experience</h3>
            <div className="line"></div>
            {personExperiences.map((exp, index) => (
              <div className="exp" key={index}>
                <h4 id="role">{exp.role}</h4>
                <div id="CR">
                  <h4 id="company">{exp.companyName}</h4>
                  <h4 id="when">
                    {exp.startYear} - {exp.endYear || "Present"}
                  </h4>
                </div>
                {editableIndex === index ? (
                  <textarea
                    className="textArea"
                    defaultValue={exp.description}
                    rows={10}
                    onBlur={(e) =>
                      handleSaveExperience(
                        exp.description,
                        e.target.value,
                        index
                      )
                    }
                    autoFocus
                  />
                ) : (
                  <p
                    id="description"
                    onClick={() => handleParagraphClick(index)}
                  >
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        {isParagraphClicked && (
          <button onClick={() => handleSave(summary, personExperiences)}>
            Save changes
          </button>
        )}
      </div>
    </div>
  );
};

export default CvTemplate;
