import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';


function Navbar({authToken, isLogIn, setLogin}){
    const [click, setClick] =useState(false);
    const [button, setButton]=useState(true);  

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);  

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    window.addEventListener('resize',showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo'>SAFELOVE
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/map' className='nav-links' onClick={closeMobileMenu} >
                                MapLoader
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/chat' className='nav-links' onClick={closeMobileMenu} >
                                Message
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/view-dates' className='nav-links' onClick={closeMobileMenu}>
                                My Dates
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/test-positive' className='nav-links' onClick={closeMobileMenu}>
                                Tested Positive
                            </Link>
                        </li>
                    </ul>    
                    {button && <Button buttonStyle='btn--outline' link={isLogIn? 'logout' : 'login'}>{isLogIn? 'LOG OUT' : 'LOG IN'}</Button>}               
                </div>
            </nav>
        </>
    );
}

export default Navbar;