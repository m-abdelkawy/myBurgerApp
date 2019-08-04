import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import classes from './ContactData/ContactData.module.css';


class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        console.log('query entries', query.entries());
        console.log('query', query);
        console.log('props', this.props);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            //['salad', '1']
            if (param[0] !== 'price')
                ingredients[param[0]] = +param[1];
            else
                totalPrice = +param[1];

        }

        this.setState({ ingredients: ingredients, totalPrice: totalPrice.toFixed(2) });
    }

    onCheckoutCancelHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.onCheckoutCancelHandler}
                    checkoutContinue={this.onCheckoutContinueHandler} />

                {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }
}

export default Checkout;