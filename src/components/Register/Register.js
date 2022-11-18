import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import '../login/login.css';

const Register = () => {
    const {registerUser,error,user,SignInUsingGoogle}=useAuth();
    const navigate=useNavigate();
    const location =useLocation();
    const redirect_url= location.state?.from || '/Shop';
    const HandleGoogloLogIn=()=>{
        SignInUsingGoogle()
         .then((result) => {
               navigate(redirect_url)
            })
    }
    const [userData,setUserData]=useState({})
        const handleChange=e=>{
            const textField=e.target.name;
            const inputValue=e.target.value;
            const newData={...userData};
            newData[textField]=inputValue;
            setUserData(newData);
        }
    const handleFormSubmit=e=>{
        if(userData.password!==userData.passwordRecheck){
            alert('Your password did not match')
            
        }
        registerUser(userData.email,userData.password,userData.name,navigate)
        e.preventDefault();
        setUserData({})
    }
    return (
        <div className='loginForm'>
            <h2>Please Create Account</h2>
            <div>
               <form  onSubmit={handleFormSubmit}>
                    <input name="name" type="text" onChange={handleChange}  placeholder="Your Name" />
                    <br/><br/>
                    <input name="email" type="email" onChange={handleChange}  placeholder="Your Email" />
                    <br /><br />
                    <input type="password" name="password" onChange={handleChange}  placeholder="your password"/>
                    <br /><br />
                    <input type="password" name="passwordRecheck"  onChange={handleChange} placeholder="re-enter password " />
                    <br /><br />
                    <input className="submitBtn" type="submit"/>
                    <br />
               </form>
            </div>
             <Link to="/login">Already have an account?</Link>
             {error &&  alert(error)}
             <p>- - - - - - or - - - - - -</p> 
            <button onClick={HandleGoogloLogIn} className="submitBtn">Google Sign In</button>
        </div>
    );
};

export default Register;