import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

class Modal extends Component {

  // Set condition to only re-render Modal when show is changed
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log("[Modal] WillUpdate");
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.cancelOrder}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }

}

export default Modal;