import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import classes from './ContactData/ContactData.module.css';
import { connect } from 'react-redux';


class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

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
                    ingredients={this.props.ings}
                    checkoutCancel={this.onCheckoutCancelHandler}
                    checkoutContinue={this.onCheckoutContinueHandler} />

                {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(Checkout);