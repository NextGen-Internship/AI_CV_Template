import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CvTemplate.css";
import image from "/public/logo.png";

const CvTemplate = ({
  personName,
  personSummary,
  technologies,
  education,
  experiences,
}) => {
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
              <p>{personSummary}</p>
            </div>
            <div className="first">
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
                <p id="description">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CvTemplate;
