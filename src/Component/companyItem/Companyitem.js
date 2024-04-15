import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyItem.css'
import { Link } from "react-router-dom";



export default function CompanyItem({ companyItem }) {
  const [user, setUser] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);

    if (parsedUser) {
      checkIfAddedToWatchlist(parsedUser.userId, companyItem._id);
    }
  }, [companyItem]);

  const checkIfAddedToWatchlist = async (userId, companyId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/company/watchlist/${userId}`);
      const watchlist = response.data || [];
      const isAdded = watchlist.some(item => item._id === companyId);
      setIsAdded(isAdded);
    } catch (error) {
      console.error('Error checking if added to watchlist:', error);
      setIsAdded(false);
    }
  };

  const addToWatchlist = async (companyId) => {
    try {

      if (!user || !user.userId) {
        console.error('User ID not found');
        return;
      }
      await axios.put(`http://localhost:8080/api/company/${user.userId}/addwatchlist`, { userId: user.userId, companyId });
      console.log('Company added to watchlist successfully');
      setIsAdded(true); // Set state to true to indicate the company is added to the watchlist
    } catch (error) {
      console.error('Error adding company to watchlist:', error);
    }
  };

  

  return (
    
     <Link to={`/company/${companyItem._id}`} className='item-container'>
      <div className='item'>
        <div className='item-left' >

          <h4 className='item-title' >{companyItem.companyname}</h4>
          <p className='item-category'><b>Sector: </b> {companyItem.industry}</p>

        </div>
        <div className='item-right'>
          {isAdded ? (
            <button className='watchlistAdded' disabled>Added</button>
          ) : (
            <div className='item-right-top'>
              <button className='watchlistNotAdded' onClick={()=>addToWatchlist(companyItem._id)}>Watchlist</button>
              <i class="fa-solid fa-plus watchlist"></i>
          </div>
          )}
        </div>
      </div>
   </Link>
  );
}
