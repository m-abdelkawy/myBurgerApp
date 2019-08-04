import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(el => {
            return <BuildControl
                addClicked={() => props.addIngredient(el.type)}
                removeClicked={() => props.removeIngredient(el.type)}
                key={el.type}
                label={el.label}
                btnAddDisabled={props.btnAddDisabled[el.type]}
                btnRemoveDisabled={props.btnRemoveDisabled[el.type]} />
        })}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchaseable} 
        onClick={props.orderNow}>Order Now</button>
    </div>
)


export default buildControls;