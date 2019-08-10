import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import lazyComponent from './hoc/lazyComponent/lazyComponent';

const lazyOrders = lazyComponent(() => {
  return import('./containers/Orders/Orders')
});

const lazyCheckout = lazyComponent(() => {
  return import('./containers/Checkout/Checkout')
});

const lazyAuth = lazyComponent(() => {
  return import('./containers/Auth/Auth')
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path={'/auth'} component={lazyAuth}/>
        <Route path={'/'} exact component={BurgerBuilder}/>
        <Redirect to={'/'}/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path={'/checkout'} component={lazyCheckout}/>
          <Route path={'/orders'} component={lazyOrders}/>
          <Route path={'/logout'} component={Logout}/>
          {/*/auth route is needed in order to render auth with /checkout redirect*/}
          <Route path={'/auth'} component={lazyAuth}/>
          <Route path={'/'} exact component={BurgerBuilder}/>
          <Redirect to={'/'}/>
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.authCheckState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
