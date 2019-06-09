import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  hideSideDrawer = () => {
    this.setState({
      showSideDrawer: false
    })
  };

  showSideDrawer = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar showSideDrawer={this.showSideDrawer}/>
        <SideDrawer
          show={this.state.showSideDrawer}
          hideSideDrawer={this.hideSideDrawer}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
};

export default Layout;