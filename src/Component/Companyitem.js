import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="card w-75 mb-3" style={{ backgroundColor: '#ADD8E6' }} >
      <div className="card-body">
        <h5 className="card-title">{companyItem.companyname}</h5>
        <p className="card-text">industry: {companyItem.industry}</p>
        {isAdded ? (
          <button className="btn btn-success" disabled>Added to Watchlist</button>
        ) : (
          <button className="btn btn-primary" onClick={() => addToWatchlist(companyItem._id)}>Add to Watchlist</button>
        )}
      </div>
    </div>
  );
}
