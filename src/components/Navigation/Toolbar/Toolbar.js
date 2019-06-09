import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

import classes from './Toolbar.module.css';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <HamburgerIcon clicked={props.showSideDrawer}/>
      <div className={classes.Logo}>
        <Logo/>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems/>
      </nav>
    </header>
  );
};

export default toolbar;