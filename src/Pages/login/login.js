import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import Alert from '../../Component/alert/Alert'
import './login.css'

//const apiEndpoint="https://inotebook-backend-0rtu.onrender.com"

const apiEndpoint= "http://localhost:8080"

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiEndpoint}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('user', JSON.stringify(json.user));
            props.showAlert(" Logged in  Successfully ", "success");
            navigate("/");

        }
        else{
           props.showAlert("Invalid Credentials", "danger");


        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='login'>
            <span className='loginTitle'>Login </span>
            <form className='loginForm' onSubmit={handleSubmit}>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="loginInput" placeholder="Enter your email..."value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="loginInput" placeholder="Enter your password..."value={credentials.password} onChange={onChange} name="password" id="password" />
             

                <button type="submit" className="loginButton">Submit</button>
            </form>
        </div>
    )
}

export default Login  