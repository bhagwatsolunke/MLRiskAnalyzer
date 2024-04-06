import React from 'react'
import Companyitem from '../Component/Companyitem'
import { useEffect,useState } from "react";
import axios from 'axios';



export default function Homepage() {
  const [companies,setCompanies] = useState([]);


  useEffect(() => {
    const fetchCompanies = async () => {
        try {
            // Make a GET request to fetch all companies
            const res = await axios.get("http://localhost:8080/api/company");

            // Set the state with the data from the API response
            setCompanies(res.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
            // Handle error if necessary
        }
    };

    fetchCompanies();
}, []); 



// // This useEffect will run whenever 'companies' state changes
// useEffect(() => {
//     console.log(companies); // Log 'companies' when it changes
// }, [companies]);



  return (
    <>
    <div className="company-item">
      {companies.length > 0 ? (
        companies.map((company) => (
          <Companyitem   key={company._id} companyItem={company} />
        ))
      ) : (
        <p>No companies to display</p>
      )}
    </div>
    </>
  )
}
