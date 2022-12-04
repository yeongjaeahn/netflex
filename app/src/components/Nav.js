import React, { useEffect, useState } from 'react';
import './css/Nav.css';
function Nav() {
  const [show, HandleShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      HandleShow(true);
    } else {
      HandleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => {
      window.removeEventListener('scroll', transitionNavBar);
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav_black'}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png"
        alt="NETFLX LOGO"
      />
      <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="NETFLX avatar"
      />
    </div>
  );
}

export default Nav;
