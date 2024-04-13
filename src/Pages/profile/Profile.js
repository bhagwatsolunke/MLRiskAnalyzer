// ProfilePage.js

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
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>

      {user && (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add other user details as needed */}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
