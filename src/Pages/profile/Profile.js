// ProfilePage.js

import { Link } from 'react-router-dom';
import './Profile.css';
import React, { useEffect, useState } from 'react';

function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Retrieve user information from localStorage
      const storedUser = localStorage.getItem('user');
      
      // Parse the stored user information
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  
      setUser(parsedUser);
    }, []);



    console.log(user);
  return (
    <div className="profile">
      <div className="profile-header">
        <h2>Profile Details</h2>
      </div>

      {user && (
        <div className="profile-details">
          {/* Personal Details */}
          <span className='subtitle'>Personal Details</span>
          <div className='personalDetails'>
            <div className='profileBox'>
              <div className='profileName'>
                <div className="profile-label">First Name:</div>
                <div className={`profile-value ${user.name? '' : 'na'}`}>{user.name ? user.name : 'NA'}</div>
                <div class="profile-label">Last Name:</div>
                <div className={`profile-value ${user.lastname? '' : 'na'}`}>{user.lastname ? user.lastname : 'NA'}</div>
              </div>
            </div>
            <div className='profileBox'>
              <div class="profile-label">Email: </div>
              <div className={`profile-value email ${user.email?'':'na'}`}>{user.email ? user.email : 'NA'}</div>
            </div>
          </div>
          {/* Prof details */}
          <div className='profDetails'>
            <span className='subtitle'>Professional Details</span>
            <div className='profileBox'>
              <div className='profPosition'>
                <div className='profile-label'>Designation: </div>
                <div className={`profile-value ${user.designation? '' : 'na'}`}>{user.designation ? user.designation : 'NA'}</div>
                <div className='profile-label'>Organization: </div>
      <div className={`profile-value ${user.organization ? '' : 'na'}`}>{user.organization ? user.organization : 'NA'}</div>
              </div>
            </div>
              <div className='profLocation'>
                <div className='profile-label'>Location: </div>
                <div className={`profile-value ${user.location? '' : 'na'}`}>{user.location ? user.location : 'NA'}</div>
              </div>
          </div>
          <Link className='updateProfile' to='/updateProfile' role="button">Update Profile</Link>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
