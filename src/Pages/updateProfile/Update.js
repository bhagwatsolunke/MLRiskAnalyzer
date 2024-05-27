import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Update.css';

const apiEndpoint = "http://localhost:8080";

export default function UpdateProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser);
    }, []);
   

    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        email: '',
        designation: '',
        organization: '',
        location: '',
    });
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setUser(parsedUser);
        if (parsedUser) {
            setUserData({
                name: parsedUser.name,
                lastname: parsedUser.lastname,
                email: parsedUser.email,
                designation: parsedUser.designation,
                organization: parsedUser.organization,
                location: parsedUser.location,
            });
        }
    }, []);

    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the updated info to server
        console.log(userData);
        try {
            const response = await fetch(`${apiEndpoint}/api/edit/${user.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                // Redirect user back to profile page
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                const json = await response.json()
                localStorage.setItem('token', json.authtoken);
                localStorage.setItem('user', JSON.stringify(json.user));
                navigate('/profile');
            } else {
                console.error('Failed to update profile: ', response.statusText);
            }
        } catch (error) {
            console.error('Failed to update profile:', error.message);
        }
    };

    return (
        <div className='update-profile'>
            <div className='update-header'>
                <h2>Update Profile</h2>
            </div>

            <form className='update-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <span className='subtitle'>Personal Details</span>
                    <div className='form-name'>
                        <label htmlFor='firstName' className='update-label'>First Name: </label>
                        <input 
                            className='update-input'
                            type='text'
                            id='firstName'
                            name='name'
                            value={userData.name}
                            onChange={handleChange}
                        />
                        <label htmlFor='lastName' className='update-label'>Last Name: </label>
                        <input 
                            className='update-input'
                            type='text'
                            id='lastname'
                            name='lastname'
                            value={userData.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-email'>
                        <label htmlFor='email' className='update-label'>Email: </label>
                        <input
                            className='update-input email'
                            type='text'
                            id='email'
                            name='email'
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <span className='subtitle'>Professional Details</span>
                    <div className='form-job'>
                        <label htmlFor='designation' className='update-label'>Designation: </label>
                        <input 
                            className='update-input'
                            type='text'
                            id='designation'
                            name='designation'
                            value={userData.designation}
                            onChange={handleChange}
                        />
                        <label htmlFor='organization' className='update-label'>Organization: </label>
                        <input
                            className='update-input'
                            type='text'
                            id='organization'
                            name='organization'
                            value={userData.organization}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-location'>
                        <label htmlFor='location' className='update-label'>Location: </label>
                        <input 
                            className='update-input'
                            type='text'
                            id='location'
                            name='location'
                            value={userData.location}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <button type='submit' className='update-button'>Submit</button>
                </div>
            </form>
        </div>
    );
}
