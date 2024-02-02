import React from 'react'
import './CvTemplate.css'
import image from '/public/logo.png'
import axios from 'axios'; // Import axios

const CvTemplate = () => {


 const handleUpload = () => {
    
      const formData = new FormData();
      const storedToken = localStorage.getItem("jwtToken");
      

      axios.get("http://localhost:8080/pdf/1", formData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        const dto = response.data;
        console.log(dto)

        // onUploadSuccess();
      })
      .catch((error) => {
        console.error("wrong id");
      });
    
  };
  

  return (

    
   <div id='cv'>
<label htmlFor="" onClick={handleUpload}>ppp</label>
    <div id='nameAndRole'>
    <img src={image} alt="edf" />
        <h1>name</h1>
        <h2>Java Developer, Blankfactor</h2>
        </div>
        <div id='all'>
        <div id='STE'>
        <div className='first'>
        <h3>Summary</h3>
        <p>Motivated self-starter with over a decade
          of solid development experience designing
          innovative and detailed solutions.
          Quickly adaptable to changing technologies
          and business requirements with an entrepreneurial initiative and drive. 
        </p>
        </div>
        <div className='first'>
        <h3>Technologies</h3>
        <ul>
          <li>
            <i>GOLANG, </i>
            <i>NODE, </i>
            <i>RUBY, </i>
            <i>.NET, </i>
            <i>CORE ANGULAR, </i>
            <i>CORE ANGULAR, </i>
            <i>EMBER AND REACT AWS, </i>
            <i>DIGITALOCEAN, </i>
            <i>HEROKU, </i>
            <i>AZURE GIT, </i>
            <i>GITHUB DOCKER, </i>
            <i>DOCKER SWARM, </i>
            <i>KUBERNETES MYSQL, </i>
            <i>MSSQL, </i>
            <i>POSTGRES, </i>
            <i>REDIS</i>  
          </li>
        </ul>
        </div>
        <div className='first'>
        <h3>Education</h3>
          <ul>
            <li>
              <i></i>
            </li>
          </ul>
        </div>
        </div>
        <div id='Experience'>
          <h3>EXPERIENCE</h3>
             <h4 id='role'>Senior Vice President, Product Engineering,</h4>
             <div id='CR'>
             <h4 id='company'>Blankfactor </h4>
             <h4 id='when'> 2022 - Present</h4>
             </div>
             <p id='description'>Responsible for leading and delivering successful technology solutions in the payments and banking industries. 
</p>
         
        </div>
        
       </div>

       </div>
        
  )
}

export default CvTemplate
