import React, {Component} from 'react';
import {connect} from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    signUp: true,
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false
      }
    }
  };

  changeHandler = (event, inputIdentifier) => {
    // create deep-clone of orderDetails by first creating a shallow clone
    let newControls = {...this.state.controls};
    // then create shallow clone of the correct input (i.e. email)
    let control = {...newControls[inputIdentifier]};
    // then change value of new input clone
    control.value = event.target.value;
    // check validity
    control.valid = this.checkValidation(control.value, control.validation);
    // then change input from orderDetails clone with the updated input
    newControls[inputIdentifier] = control;
    // check if all are valid
    let formIsValid = true;
    for(let control in newControls) {
      formIsValid = newControls[control].valid && formIsValid;
    }
    // finally set state
    this.setState({controls: newControls, formIsValid: formIsValid});
  };

  checkValidation = (value, rules) => {
    let isValid = true;
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.replace(/ /g, '').length >= rules.minLength && isValid
    }
    if(rules.maxLength) {
      isValid = value.replace(/ /g, '').length <= rules.maxLength && isValid
    }
    if(rules.isEmail) {
      isValid = (/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+/g).test(value) && isValid
    }
    return isValid;
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.auth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.signUp);
  };

  signUpToggle = () => {
    this.setState(prevState => {
      return {
        signUp: !prevState.signUp
      }
    })
  };

  errorHandler = (errorMsg) => {
    let message = '';
    switch (errorMsg) {
      case 'EMAIL_EXISTS':
        message = 'Email already in use!';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'Email or Password is wrong!';
        break;
      case 'INVALID_PASSWORD':
        message = 'Email or Password is wrong!';
        break;
      default:
        message = 'Unknown error, please try it later again!'
        break;
    }
    return (<p style={{color: 'red', textStyle: 'bold'}}>{message}</p>);
  };

  render() {
    let formArray = [];
    for (let key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = (
      <form onSubmit={this.onSubmit}>
        {formArray.map(item => {
          return (
            <Input
              key={item.id}
              id={item.id}
              elementType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.config.value}
              changed={(event) => {this.changeHandler(event, item.id)}}
              valid={item.config.valid}
              shouldValidate={item.config.validation}
            />
          );
        })}
        <Button
          btnType={"Success"}
          disabled={!this.state.formIsValid}
        >Submit</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner/>;
    }

    let errorMsg = null;
    if (this.props.error) {
      errorMsg = this.errorHandler(this.props.error.message);
    }
    return (
      <div className={classes.Auth}>
        <h4>
          Please {this.state.signUp ? 'Sign-Up' : 'Sign-In'}
        </h4>
        {errorMsg}
        {form}
        <Button
          clicked={this.signUpToggle}
          btnType={'Danger'}
        >Switch to {this.state.signUp ? 'Sign-In' : 'Sign-Up'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);