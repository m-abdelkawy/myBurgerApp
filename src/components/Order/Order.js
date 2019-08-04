import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let key in props.ingredients) {
        ingredients.push([key, props.ingredients[key]])
    }

    

    return (
        <div className={classes.Order}>
            <p>Ingredients:</p>
            {ingredients.map(el => {
                return (
                    <div key={el[0]}>
                        <span key={el[0]}>{el[0]}: ({el[1]})</span>
                        <hr />
                    </div>
                )
            })}
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
}
export default order;