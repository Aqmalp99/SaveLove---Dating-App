import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie"

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

const LINKS = ['/login', '/signup'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    link,
    isLogin,
    setLogin
}) => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken

  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const checkLink = LINKS.includes(link) ? link : LINKS[0];

  const onClick_Logout = () => {
    if (authToken) {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
        return
    }

    setLogin(false)
}

  return (
      <Link to={`${checkLink}`} className='btn-mobile'>
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={isLogin? onClick_Logout : onClick}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
};