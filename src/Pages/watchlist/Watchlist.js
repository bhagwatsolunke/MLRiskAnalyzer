import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WatchlistCompanyItem from '../../Component/watchlistcompanyItem/Watchlistcompanyitem';
import "./Watchlist.css"


export default function Watchlist() {
  const [companies, setCompanies] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        if (user) {
          const res = await axios.get(`http://localhost:8080/api/company/watchlist/${user.userId}`);
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
  }, [user]);

  return (
    <>
      {user ? (
        <div className="watchlist">
          {companies.length > 0 ? (
            companies.map((company) => (
              <WatchlistCompanyItem key={company._id} companyItem={company} />
            ))
          ) : (
            <p>No companies to display</p>
          )}
        </div>
      ) : (
        <h3>Please log in to view your watchlist!...</h3>
      )}
    </>
  );
}
