import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate,  useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import './login.css';

const LogIn = () => {
    const location =useLocation();
    const navigate = useNavigate();
    const {loginUser,error,SignInUsingGoogle}=useAuth()
    const [userData,setUserData]=useState({})

    const redirect_url= location.state?.from || '/Shop';
    const handleChange=e=>{
        const textField=e.target.name;
        const inputValue=e.target.value;
        const newData={...userData};
        newData[textField]=inputValue;
        setUserData(newData);
    }
    const handleFormSubmit=e=>{
        loginUser(userData.email,userData.password,navigate,location)
        e.preventDefault();
    }
    const HandleGoogloLogIn=()=>{
        SignInUsingGoogle()
         .then((result) => {
               navigate(redirect_url)
            })
    }
    return (
        <div className="loginForm">
            <h2>Please login</h2>
            <form onSubmit={handleFormSubmit} >
                <input type="email"  onChange={handleChange} placeholder="your email" />
                <br /><br />
                <input type="password" onChange={handleChange} placeholder="your password" />
                <br /><br />
                <input type="submit" className='submitBtn' />
                <br /><br />
            </form>
            <p>New to X-plexo ? <Link to="/register">Create Account </Link> </p>
               <p>- - - - - - or - - - - - -</p>
               {error && alert(error)}
               <br />
            <button  onClick={HandleGoogloLogIn} >Google Sign In</button>
        </div>
    );
};

export default LogIn;