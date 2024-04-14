import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Use 'react-router-dom' instead of 'react-router'

export default function CompanyProfile() { // Rename function to start with an uppercase letter
  const [company, setCompany] = useState(null);
  const { companyId } = useParams(); // Destructure the parameter from useParams()

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/company/${companyId}`);
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompany();
  }, [companyId]);

  return (
    <div>
      {company ? (
        <div>
          <h2>{company.companyname}</h2>
          <p><b>Industry:</b> {company.industry}</p>
          {/* Render other details about the company */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
