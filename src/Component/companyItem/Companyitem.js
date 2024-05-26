import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyItem.css'
import { Link } from "react-router-dom";



export default function CompanyItem({ companyItem }) {
  
  const [user, setUser] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [sentimentScore, setSentimentScore] = useState('');

  useEffect(() => {
    const getCompanyAnalysis = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/companyanalysis/${companyItem._id}`);
      // const res = await axios.get(`http://localhost:8080/api/companyanalysis/8`);
       setSentimentScore(res.data.sentimentScore || 'N/A'); // Default to empty string if not available
      } catch (error) {
        console.error('Error fetching company analysis details: ', error);
      }
    };
    getCompanyAnalysis();
  }, [companyItem._id]);

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

  function ScoreColor( score ) {
    if (score > 8) {
     return'very-high';
    } else if (score > 6) {
     return'high';
    } else if (score > 4) {
      return'medium';
    } else if(score >2)
    {
      return 'low'
    }else if(score>=0){
      return 'very-low'
    }
  }
  

  return (
    
     <div className='item-container'>
      <div className='item'>
        <Link to={`/company/${companyItem._id}`} className='item-left' >

          <h4 className='item-title' >{companyItem.companyname}</h4>
          <p className='item-category'><b>Industry: </b> {companyItem.industry}</p>
          <p className='item-score'>
            <b>Sentiment Score: </b>
            <span className={`item-score-val ${ScoreColor(sentimentScore)}`}> {sentimentScore || 'N/A'}</span>
          </p>
        </Link>
        <div className='item-right'>
          {isAdded ? (
            <button className='watchlistAdded' disabled>Added</button>
          ) : (
            <div className='item-right-top'>
              <button className='watchlistNotAdded' onClick={()=>addToWatchlist(companyItem._id)}>Watchlist</button>
              <i className="fa-solid fa-plus watchlist"></i>
          </div>
          )}
        </div>
      </div>
   </div>
  );
}
