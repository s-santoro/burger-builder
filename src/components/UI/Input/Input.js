import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

  let inputElement = null;
  let inputClasses = [classes.InputElement];
  let errorMessage = null;
  if(!props.valid && props.shouldValidate && props.value.length > 0) {
    inputClasses.push(classes.Invalid);
    errorMessage = <p style={{font: 'bold', color: 'red'}}>Please enter a valid {props.id}</p>;
  }


  switch (props.elementType) {
    case 'input':
      inputElement =
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />;
      break;
    case 'textarea':
      inputElement =
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />;
      break;
    case 'select':
      inputElement =
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>;
      break;
    default:
      inputElement =
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />;
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );

};

export default input;