import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CvTemplate.css';
import image from '/public/logo.png';
import PersonIdInput from './SearchCv';

const CvTemplate = () => {
  const [personId, setPersonId] = useState('');
  const [personData, setPersonData] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personSummary, setPersonSummary] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const handleInputChange = (e) => {
    setPersonId(e.target.value);
  };

  const handleFetchData = async () => {
    try {
      const storedToken = localStorage.getItem("jwtToken");
  
      const response = await axios.get(`http://localhost:8080/pdf/${personId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
  
      setPersonData(response.data);
      setPersonName(response.data.name)
      setPersonSummary(response.data.summary)
      setExperiences(response.data.experience)
      setEducation(response.data.education)
      setTechnologies(response.data.technologies)
      console.log(response.data.technologies)
    } catch (error) {
      console.error('Error fetching person data:', error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [personId]);
  if (personData != null){
    const { name, summary, education, experiences } = personData;
  }

  return (
    
    <div>
      <PersonIdInput
        personId={personId}
        handleInputChange={handleInputChange}
        handleFetchData={handleFetchData}
      />
      <div id='cv'>
      <div id='nameAndRole'>
        <img src={image} alt='edf' />
        <h1>{personName}</h1>
        {experiences.length > 0 && (
          <h2>{experiences[0].role}</h2>
        )}
      </div>
      <div id='all'>
        <div id='STE'>
          <div className='first'>
            <h3>Summary</h3>
            <p>{personSummary}</p>
          </div>
          <div className='first'>
            <h3>Technologies</h3>
          <i>
    {technologies.map((tech, index) => (
      <React.Fragment key={index}>
        {tech.name}
        {index < technologies.length - 1 ? ', ' : ''}
      </React.Fragment>
    ))}
  </i>
</div>
          <div className='first'>
            <h3>Education</h3>
            <ul>
            {education.map((edu, index) => (
      <li key={index}>
        <i>{edu.degree} - {edu.college}, {edu.startYear} - {edu.endYear}</i>
      </li>
    ))}
            </ul>
          </div>
          </div>
          <div id='Experience'>
            <h3>EXPERIENCE</h3>
            {experiences.map((exp, index) => (
              <div className='exp' key={index}>
                <h4 id='role'>{exp.role}</h4>
                <div id='CR'>
                  <h4 id='company'>{exp.companyName}</h4>
                  <h4 id='when'>
                    {exp.startYear} - {exp.endYear || 'Present'}
                  </h4>
                </div>
                <p id='description'>{exp.description}</p>
              </div>
            ))}
          </div>
      </div>
      </div>
    </div>
  );
};
export default CvTemplate;

