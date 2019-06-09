import React from 'react';
import NavigationsItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
  let usedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    usedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.hideSideDrawer}/>
      <div className={usedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationsItems/>
        </nav>
      </div>
    </Aux>
  )
};

export default sideDrawer;