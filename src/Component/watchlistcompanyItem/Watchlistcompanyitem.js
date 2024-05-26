import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./WatchlistcompanyItem.css"

export default function WatchlistCompanyItem({ companyItem }) {
  const [user, setUser] = useState(null);
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
        <Link to={`/company/${companyItem._id}`}className='item-left'>
          <h4 className='item-title'>{companyItem.companyname}</h4>
          <p className='item-category'><b>Sector: </b> {companyItem.industry}</p>
          <p className='item-score'>
            <b>Sentiment Score: </b>
            <span className={`item-score-val ${ScoreColor(sentimentScore)}`}> {sentimentScore || 'N/A'}</span>
          </p>
        </Link>
        <div className='item-right-top'>
        <a href="#" className="Removewatchlist" onClick={() => removefromWatchlist(companyItem._id)} >Remove</a>
        <i class="fa-solid fa-minus watchlist"></i>
        </div>
      </div>
      </div>
  );
}
