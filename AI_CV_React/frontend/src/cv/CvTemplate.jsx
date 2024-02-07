import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "./CvTemplate.css";
import image from "/public/logo.png";

const CvTemplate = ({
  personName,
  personSummary,
  technologies,
  education,
  experiences,
}) => {
  const [editableIndex, setEditableIndex] = useState(false);
  const [newTechnology, setNewTechnology] = useState("");
  const [showNewTechnologyInput, setShowNewTechnologyInput] = useState(false);

  const handleEdit = (index) => {
    setEditableIndex(index);
  };

  const handleSave = () => {
    // Implement saving logic here
    // For example, send an HTTP request to update the person's details
    const updatedPerson = {
      email: 'person@email.com', // Replace with the actual email of the person
      // Include other fields you want to update
    };

    axios.put(`/person/update/${updatedPerson.email}`, updatedPerson)
      .then(response => {
        // Handle successful response
        console.log("Person updated successfully:", response.data);
        setEditableIndex(-1); // Reset editable index after saving
      })
      .catch(error => {
        // Handle error
        console.error("Error updating person:", error);
      });
  };

  const handleParagraphClick = (index) => {
    setEditableIndex(index);
  };

  const handleNewTechnologyChange = (e) => {
    setNewTechnology(e.target.value);
  };

  const handleAddTechnology = () => {
    // Implement logic to add new technology
    // For example, you could update the state to include the new technology
    // Here, I'll simply log the new technology for demonstration
    console.log("New technology:", newTechnology);
    setNewTechnology(""); // Clear the input field after adding the technology
    setShowNewTechnologyInput(false); // Hide the input field after adding the technology
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
                  defaultValue={personSummary}
                  onBlur={handleSave}
                  autoFocus
                />
              ) : (
                <p onClick={() => handleEdit(personSummary)}>
                  {personSummary}
                </p>
              )}
            </div>
            <div className="first" onClick={() => setShowNewTechnologyInput(true)}>
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
              {/* Show input field for adding new technology when clicked */}
              {showNewTechnologyInput && (
                <div>
                  <input
                    type="text"
                    value={newTechnology}
                    onChange={handleNewTechnologyChange}
                    placeholder="Add new technology"
                  />
                  <button onClick={handleAddTechnology}>Add</button>
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
          <h3>EXPERIENCE</h3>
            <div className="line"></div>
            {experiences.map((exp, index) => (
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
                    onBlur={handleSave}
                    autoFocus
                  />
                ) : (
                  <p id="description" onClick={() => handleEdit(index)}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
  );
};

export default CvTemplate;
