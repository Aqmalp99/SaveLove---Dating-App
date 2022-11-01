import {React, useState, useEffect} from 'react'
import {useCookies} from "react-cookie"
import { Button } from './Button';
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  const [isLogin, setLogin] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken

  return (
    <div className='hero-container'>
      <video src={require('.//videos/background.mp4')}autoPlay loop muted />

      <h3>LOVE AWAITS</h3>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link='/signup'
          isLogin={isLogin}
          setLogin={setLogin}
        >
          SIGN UP
        </Button>
        
      </div>
    </div>
  );
}

export default HeroSection;