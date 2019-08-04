import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';
import BuildControls from './BuildControls/BuildControls';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngredient key={igkey + i} type={igkey}></BurgerIngredient>
        });
    }).reduce((arrEl, el)=>{
        return arrEl.concat(el);
    }, []);
    // console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients='Start Adding Ingredients';
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>

            {transformedIngredients}

            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
            
        </div>
    );
}



export default burger;