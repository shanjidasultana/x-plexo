import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import './Header.css';
const Header = () => {
    const {user,logoutUser} =useAuth();
    return (
               <nav>
                <h2>X-Plexo</h2>
               <div className='nav-links'>
                <NavLink to="Shop">Shop</NavLink>
                <NavLink to="review">Order Review</NavLink>
                    <p className='userName'>{user?.displayName}</p>
                    {user.email?
                        <button className='logoutBtn' onClick={logoutUser}>Log Out</button>
                        :
                        <NavLink to="login">LogIn</NavLink>

                    }
                    
              
               </div>
            </nav>
            
            
      
    );
};

export default Header;