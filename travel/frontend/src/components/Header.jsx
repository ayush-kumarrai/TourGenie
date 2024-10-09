import React from 'react';
import oneImg from '../assets/assets/header-1.jpg';
import twoImg from '../assets/assets/header-2.jpg';
import threeImg from '../assets/assets/story.jpg';
import './Header.css';

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="section__container header__container">
          <div className="header__images">
            <img className="header__img" src={oneImg} alt="Beautiful travel scenery" />
            <img className="header__img" src={twoImg} alt="Another beautiful travel scenery" />
          </div>
          <div className="header__content">
            
            <p className="section__subtitle">
              Make your travel more enjoyable with us. We are the best travel agency, providing the best travel services for our clients.
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
