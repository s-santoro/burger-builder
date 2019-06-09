import React from 'react';

import classes from './HamburgerIcon.module.css';

const hamburgerIcon = (props) => (
  <div className={classes.HamburgerIcon} onClick={props.clicked}>
    <div className={classes.Bar}></div>
    <div className={classes.Bar}></div>
    <div className={classes.Bar}></div>
  </div>
);

export default hamburgerIcon;
