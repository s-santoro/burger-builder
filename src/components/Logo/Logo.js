import React from 'react';

// Webpack will take path to logo and create an public asset-folder for production, where the
// optimized picture is then stored.
import burgerLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="MyBurger"/>
    </div>
  );
};

export default logo;