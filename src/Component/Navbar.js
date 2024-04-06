import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/login")
  }
  let location = useLocation();

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Home</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="watchlist">My Watchlist</a>
              <a class="nav-link active" aria-current="page" href="analysis">Analysis</a>
              <a class="nav-link active " aria-current="true" href='/about'>About Us</a>
              <a class="nav-link active " aria-current="true" href='/profile'>Profile</a>
            </div>
          </div>
          {!localStorage.getItem('token') ?
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" type="button">Signup</Link>
            </form> : <button onClick={handleLogout} className=" btn btn-primary"> Logout</button>
          }
        </div>
      </nav>
    </div>
  )
}
