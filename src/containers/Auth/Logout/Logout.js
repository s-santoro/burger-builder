import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router";
import * as actions from '../../../store/actions/index';

class Logout extends Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <Redirect to={'/'}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.authLogout())
  }
};

export default connect(null, mapDispatchToProps)(Logout);