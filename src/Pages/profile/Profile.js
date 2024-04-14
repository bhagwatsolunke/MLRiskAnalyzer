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
                <div className={`profile-value ${user.lastname? '' : 'na'}`}>{user.lastname ? user.name : 'NA'}</div>
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
                <div className={`profile-value ${user.designation? '' : 'na'}`}>{user.designation ? user.name : 'NA'}</div>
                <div className='profile-label'>Organistion: </div>
                <div className={`profile-value ${user.organisation? '' : 'na'}`}>{user.organisation ? user.name : 'NA'}</div>
              </div>
            </div>
              <div className='profLocation'>
                <div className='profile-label'>Location: </div>
                <div className={`profile-value ${user.location? '' : 'na'}`}>{user.location ? user.name : 'NA'}</div>
              </div>
          </div>
          <Link className='updateProfile' to='/updateProfile' role="button">Update Profile</Link>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
