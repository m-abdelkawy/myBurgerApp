import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
    //this could be a functional component
    componentWillUpdate() {//no need
        console.log('[OrderSummary] will update');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igkey => {
            return (
                <li key={igkey}>
                    <span style={{ textTransform: 'capitalize' }}>{igkey}</span>
                    : {this.props.ingredients[igkey]}
                </li>
            )
        });

        return (

            <Aux>
                <h3>Your order</h3>
                <p>Delicious burger with these Ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.cancelClicked} btnType="Danger">Cancel</Button>
                <Button clicked={this.props.continueClicked} btnType="Success">Continue</Button>
            </Aux>

        )
    }
}

export default OrderSummary;