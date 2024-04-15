import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Update.css'

const apiEndpoint= "http://localhost:8080";

export default function UpdateProfilePage(){

    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => {
        // Retrieve user information from localStorage
        const storedUserData = localStorage.getItem('user');
        
        // Parse the stored user information
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

        setStoredUser(parsedUserData);
    }, []);

    const [userData, setUserData] = useState({
        name: storedUser ? storedUser.name || '' : '',
        lastName : storedUser ? storedUser.lastName || '' : '',
        email : storedUser ? storedUser.email || '' : '',
        designation : storedUser ? storedUser.designation || '' : '',
        organization: storedUser ? storedUser.organization || '' : '',
        location : storedUser ? storedUser.location || '' : '',
    });


    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setUserData({...userData,[name] : value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(userData);
        //Send the updated info to server
        try{
            const response = await fetch(`${apiEndpoint}/api/auth/edituser`,{
                method : 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(userData),
            });
            if(response.ok){
                //redirect user back to profile page
                navigate('/profile')
            }else{
                console.error('Failed to update profile: ',response.statusText);
            }
        }catch(error){
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
                            value={userData.firstName}
                            onChange={handleChange}
                        />
                        <label htmlFor='lastName' className='update-label'>Last Name: </label>
                        <input 
                            className='update-input'
                            type='text'
                            id='lastName'
                            name='lastName'
                            value={userData.lastName}
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
                            value ={userData.email}
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
                            name='Designation'
                            value={userData.designation}
                            onChange={handleChange}
                        />
                        <label htmlFor='organization' className='update-label'>Organistion: </label>
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
                            name='Location'
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
    )

}


