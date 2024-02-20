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
  const [educationForm, setEducationForm] = useState({
    degree: "",
    college: "",
    startYear: "",
    endYear: "",
  });
  const [isStartYearVisible, setIsStartYearVisible] = useState(false);
  const [isEndYearVisible, setIsEndYearVisible] = useState(false);
  const [isEducationFormVisible, setIsEducationFormVisible] = useState(false);
  useEffect(() => {
    setPersonExperiences([...experiences]);
  }, [experiences]);

  useEffect(() => {
    setSummary(personSummary);
  }, [personSummary]);

  const handleSummaryChange = (newSummary) => {
    setSummary(newSummary);
  };

  const handleEdit = (index) => {
    setEditableIndex(index);
    setIsParagraphClicked(true);
  };

  const handleSaveTechnology = () => {
    const storedToken = localStorage.getItem("jwtToken");
    console.log("newt" + newTechnology);
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
        console.log(response.data);
        setNewTechnology("");
        setShowNewTechnologyInput(false);
      })
      .catch((error) => {
        console.error("Error adding technology:", error);
      });
  };
  const handleCancel = (e) => {
    setShowNewTechnologyInput(false);
    e.stopPropagation();
  };

  const handleSaveExperience = (field, updatedValue, index) => {
    const updatedExperiences = [...personExperiences];
    updatedExperiences[index][field] = updatedValue;
    setPersonExperiences(updatedExperiences);
    setEditableIndex(-1);
    setIsParagraphClicked(true);
  };

  const handleSave = () => {
    const updatedPerson = {
      id: personId,
      email: personEmail,
      summary: summary,
      technologies: technologies,
      education: education,
      experience: personExperiences,
    };
    const storedToken = localStorage.getItem("jwtToken");
    axios
      .put(`http://localhost:8080/person/update`, updatedPerson, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setEditableIndex(-1);
        setIsParagraphClicked(false);
      })
      .catch((error) => {
        console.error("Error updating person:", error);
      });
  };

  const handleParagraphClick = (index) => {
    setEditableIndex(index);
    setShowNewTechnologyInput(false);
    setIsParagraphClicked(true);
  };

  const handleNewTechnologyChange = (e) => {
    setNewTechnology(e.target.value);
  };

  const handleEducationFormChange = (e) => {
    const { name, value } = e.target;
    setEducationForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    const storedToken = localStorage.getItem("jwtToken");
    axios
      .post(`http://localhost:8080/education`, educationForm, {
        params: { personId },
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setEducationForm({
          degree: "",
          college: "",
          startYear: "",
          endYear: "",
        });
        setIsEducationFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding education:", error);
      });
  };

  const handleCancelEducation = (e) => {
    e.stopPropagation();
    setIsEducationFormVisible(false);
  };

  const generateYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <div>
      <div className="pdf-container">
        <div className="background"></div>
        <div id="cv" className="cv">
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
                      handleParagraphClick(false);
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
                  <div id="tech">
                    <input
                      id="plAddTech"
                      type="text"
                      value={newTechnology}
                      onChange={handleNewTechnologyChange}
                      placeholder="Add new technology"
                      // onBlur={(e) => handleCancel(e)}
                    />
                    <img
                      id="cancel"
                      src={"public/cancel.webp"}
                      alt="cancel"
                      onClick={(e) => handleCancel(e)}
                    />
                    <img
                      id="addTech"
                      src="public/check-mark-icon-green-0.png"
                      alt="bb"
                      onClick={handleSaveTechnology}
                    />
                  </div>
                )}
              </div>
              <div
                className="first"
                onClick={() =>
                  setIsEducationFormVisible(!isEducationFormVisible)
                }
              >
                <h3>Education</h3>
                <div className="line"></div>
                <ul>
                  {education.map((edu, index) => (
                    <li key={index}>
                      <i>
                        {edu.degree} - {edu.college}, {edu.startYear} -{" "}
                        {edu.endYear ? edu.endYear : "Present"}
                      </i>
                    </li>
                  ))}
                </ul>
                {isEducationFormVisible && (
                  <div id="educationForm" onClick={(e) => e.stopPropagation()}>
                    <div id="inputs">
                      <input
                        type="text"
                        placeholder="Degree"
                        name="degree"
                        value={educationForm.degree}
                        onChange={handleEducationFormChange}
                      />
                      <input
                        type="text"
                        placeholder="College"
                        name="college"
                        value={educationForm.college}
                        onChange={handleEducationFormChange}
                      />
                    </div>
                    <div id="years">
                      <div className="year-select-wrapper">
                        <div
                          className={`select-wrapper ${
                            isStartYearVisible ? "open" : ""
                          }`}
                          onClick={() =>
                            setIsStartYearVisible(!isStartYearVisible)
                          }
                        >
                          <input
                            type="text"
                            placeholder="Start Year"
                            name="startYear"
                            value={educationForm.startYear}
                            onChange={handleEducationFormChange}
                            readOnly
                          />
                          <ul className="options">
                            {generateYears(1920).map((year) => (
                              <li
                                key={year}
                                onClick={(e) => {
                                  handleEducationFormChange({
                                    target: { name: "startYear", value: year },
                                  });
                                  setIsStartYearVisible(false);
                                }}
                              >
                                {year}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="year-select-wrapper">
                        <div
                          className={`select-wrapper ${
                            isEndYearVisible ? "open" : ""
                          }`}
                          onClick={() => setIsEndYearVisible(!isEndYearVisible)}
                        >
                          <input
                            type="text"
                            placeholder="End Year"
                            name="endYear"
                            value={educationForm.endYear}
                            onChange={handleEducationFormChange}
                            readOnly
                          />
                          <ul className="options">
                            {generateYears(
                              parseInt(educationForm.startYear) || 1920
                            ).map((year) => (
                              <li
                                key={year}
                                onClick={() => {
                                  handleEducationFormChange({
                                    target: { name: "endYear", value: year },
                                  });
                                  setIsEndYearVisible(false);
                                }}
                              >
                                {year}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div id="choice">
                      <img
                        id="cancelEd"
                        src={"public/cancel.webp"}
                        alt="cancel"
                        onClick={(e) => handleCancelEducation(e)}
                      />
                      <img
                        id="addEd"
                        src="public/check-mark-icon-green-0.png"
                        alt="bb"
                        onClick={handleAddEducation}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div id="Experience">
              <h3>Experience</h3>
              <div className="line"></div>
              {experiences.map((exp, index) => (
                <div
                  className="exp"
                  key={index}
                  style={{ paddingTop: index === 0 ? 0 : "5mm" }}
                >
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
                      onBlur={(e) =>
                        handleSaveExperience(
                          "description",
                          e.target.value,
                          index
                        )
                      }
                      rows={10}
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
            <button onClick={handleSave}>Save changes</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CvTemplate;
