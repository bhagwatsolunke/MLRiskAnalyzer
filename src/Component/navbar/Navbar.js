import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/login");
  };

  return (
    <div className='top'>
        <div className="topLeft">
            <Link className="link title" to="/mlriskanalyzer">
               MLRiskAnalyzer
              </Link>
        </div>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/watchlist">
                Watchlist
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/analysis">
                Analysis
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/news">
                News
              </Link>
            </li>
          </ul>
      </div>
      <div className='topRight'>
        {!localStorage.getItem('token') ? (
          <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" type="button">Signup</Link>
          </form>
        ) : (
          <>
          <Link to="/profile" className='link' > <i class="fa-regular fa-user" title="Profile"></i></Link>
          <button onClick={handleLogout} className=" btn btn-primary logout"> Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
