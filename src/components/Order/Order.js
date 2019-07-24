import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];
  for(let i in props.ingredients) {
    ingredients.push({
      name: i,
      amount: props.ingredients[i]
    });
  }
  const output = ingredients.map(i => {
    return (
      <span key={i.name} style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
      }}>
        {i.name}: ({i.amount})
      </span>
    );
  })
  return (
    <div className={classes.Order}>
      <p>{output}</p>
      <p style={{
        display: "inline-block",
        margin: "0 8px"
      }}
      >Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;