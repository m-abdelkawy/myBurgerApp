import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(event);
        console.log(this.props.ingredients);
        console.log(this.props.totalPrice);

        // alert('Continue and checkout');
        this.setState({ loading: true }); //start loading

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Hamada 1',
                address: {
                    street: 'Test Street 1',
                    zipCode: '32235',
                    city: 'Cairo'
                },
                email: 'hamada1@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        let form = this.state.loading ? <Spinner /> : (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postCode" placeholder="Post Code" />

            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>)
        return (
            <div>
                <h4>Enter contact Data</h4>
                {form}

            </div>
        )
    }
}

export default ContactData;