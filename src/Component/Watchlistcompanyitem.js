import React, { useEffect, useState } from 'react';
import axios from 'axios';


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
    <div className="card w-75 mb-3" style={{ backgroundColor: '#ADD8E6' }} >
      <div className="card-body">
        <h5 className="card-title">{companyItem.companyname}</h5>
        <p className="card-text">industry: {companyItem.industry}</p>
        <a href="#" className="btn btn-primary" onClick={() => removefromWatchlist(companyItem._id)} >Remove from Watchlist</a>
      </div>
    </div>
  );
}
