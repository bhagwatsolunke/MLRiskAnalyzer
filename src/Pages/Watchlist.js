import React from 'react'
import { useEffect,useState } from "react";
import axios from 'axios';
import WatchlistCompanyItem from '../Component/Watchlistcompanyitem';


export default function Watchlist() {
  const [companies,setCompanies] = useState([]);
  const [user, setUser] = useState(null);

    useEffect(() => {
      // Retrieve user information from localStorage
      const storedUser = localStorage.getItem('user');
      
      // Parse the stored user information
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  
      setUser(parsedUser);
    }, []);



    useEffect(() => {
      const fetchCompanies = async () => {
          try {
              // Check if user is null before attempting to fetch watchlist
              if (user) {
                  // Make a GET request to fetch watchlist based on user ID
                  const res = await axios.get(`http://localhost:8080/api/company/watchlist/${user.userId}`);
  
                  // Set the state with the data from the API response
                  setCompanies(res.data);
              } else {
                  console.log('User is null or userId is null');
              }
          } catch (error) {
              console.error('Error fetching companies:', error);
              // Handle error if necessary
          }
      };
  
      fetchCompanies();
  }, [user]); // Include 'user' in the dependency array since you're using it inside the effect
  

// This useEffect will run whenever 'companies' state changes
useEffect(() => {
    console.log(companies); // Log 'companies' when it changes
}, [companies]);



  return (
    <>
    <div className="company-item">
      {companies.length > 0 ? (
        companies.map((company) => (
          <WatchlistCompanyItem key={company._id} companyItem={company} />
        ))
      ) : (
        <p>No companies to display</p>
      )}
    </div>
    </>
  )
}
