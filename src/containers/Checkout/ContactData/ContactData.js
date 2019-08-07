import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';



class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(event);
        console.log(this.props.ingredients);
        console.log(this.props.totalPrice);

        const formData ={};

        for(let formDataIdentifier in this.state.orderForm){
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
        }
        // alert('Continue and checkout');
        this.setState({ loading: true }); //start loading

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
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

    inputChangeHandler = (event, element) => {
        console.log(event.target.value);
        console.log(element.id);
        const orderForm = { ...this.state.orderForm };

        const formElemNew = { ...orderForm[element.id] };
        formElemNew.value = event.target.value;

        orderForm[element.id] = formElemNew;
        this.setState({ orderForm: orderForm });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = this.state.loading ? <Spinner /> : (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(el => {
                    return (
                        <Input
                            key={el.id}
                            elementType={el.config.elementType}
                            elementConfig={el.config.elementConfig}
                            value={el.config.value}
                            changed={(event) => this.inputChangeHandler(event, el)} />)
                })}

                <Button btnType="Success">ORDER</Button>
            </form>)
        return (
            <div>
                <h4>Enter contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice.toFixed(2)
    }
}

export default connect(mapStateToProps)(ContactData);