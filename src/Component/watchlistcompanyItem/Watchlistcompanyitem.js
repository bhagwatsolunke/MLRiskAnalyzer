import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./WatchlistcompanyItem.css"

export default function WatchlistCompanyItem({ companyItem }) {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    
    // Parse the stored user information
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    setUser(parsedUser);
  }, []);

  if (!companyItem) {
    return null; 
  }

  const Id = user?.userId; // Use optional chaining to avoid errors if user is null

  // Function to add a company to the watchlist
  const removefromWatchlist = async (companyId) => {
    try {
      if (!Id) {
        console.error('User ID not found');
        return;
      }
      // Make a PUT request to add the company to the watchlist
      await axios.put(`http://localhost:8080/api/company/${Id}/removewatchlist`, { userId: Id, companyId });
      console.log('company removed from watchlist successfully');
      window.location.reload();

      // You can update the UI or show a success message if needed
    } catch (error) {
      console.error('Error adding company to watchlist:', error);
      // Handle error if necessary
    }
  };


  return (
    <Link to={`/`} className='item-container'>
      <div className='item'>
        <div className='item-left'>
          <h4 className='item-title'>{companyItem.companyname}</h4>
          <p className='item-category'><b>Sector: </b> {companyItem.industry}</p>
        </div>
        <div className='item-right'>
        <a href="#" className="btn btn-primary watchlist" onClick={() => removefromWatchlist(companyItem._id)} >Remove</a>
        </div>
      </div>
    </Link>
  );
}
