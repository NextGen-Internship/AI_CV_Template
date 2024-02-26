import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Compare.css";

const Compare = ({ email }) => {
  console.log("email" + email);
  const [urld, setUrld] = useState("");
  useEffect(() => {
    const fetchPerson = async (email) => {
      if (!email) return; // Return early if email is null

      const storedToken = localStorage.getItem("jwtToken");

      try {
        const emailExistsResponse = await axios.get(
          `http://localhost:8080/person/emailExists/${email}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (!emailExistsResponse.data) {
          return;
        }
      } catch (error) {
        console.error(
          "An error occurred while checking email existence:",
          error
        );
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/person/${email}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setUrld(response.data.s3URL);
        console.log(response.data);
      } catch (error) {
        console.error("An error occurred while fetching person data:", error);
      }
    };

    fetchPerson(email);
  }, [email]);

  return email && urld ? (
    <label className="pdf-container">
      <iframe
        id="asd"
        src={`${urld}#toolbar=0`}
        type="application/pdf"
        className="preview"
      />
    </label>
  ) : null;
};

export default Compare;
