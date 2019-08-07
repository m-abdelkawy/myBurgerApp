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
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'cheapest',
                valid: true,
                touched: false
            }
        },
        isFormValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(event);
        console.log(this.props.ingredients);
        console.log(this.props.totalPrice);

        const formData = {};

        for (let formDataIdentifier in this.state.orderForm) {
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

    checkValidation = (value, rules) => {
        let isValid = false;
        if (rules) {
            if (rules.required)
                isValid = value.trim() !== '';
            if (rules.minLength)
                isValid = isValid ? value.length >= rules.minLength : isValid;
            if (rules.maxLength)
                isValid = isValid ? value.length <= rules.maxLength : isValid;
            return isValid;
        }
    }


    inputChangeHandler = (event, element) => {
        console.log(event.target.value);
        console.log(element.id);
        const updatedOrderForm = { ...this.state.orderForm };

        const updatedFormElement = { ...updatedOrderForm[element.id] };
        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        //debugging
        console.log(updatedFormElement.valid);

        updatedOrderForm[element.id] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
        this.validatingForm(updatedOrderForm);
        console.log('[isFormValid: ]', this.state.isFormValid);
    }

    validatingForm = (form) => {
        let isFormValid = true;

        for (let inputIdentifier in form) {
            if (form[inputIdentifier].validation) {
                if (!form[inputIdentifier].valid) {
                    isFormValid = false;
                    break;
                }
            }
        }

        this.setState({ isFormValid: isFormValid });
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
                            changed={(event) => this.inputChangeHandler(event, el)}
                            invalid={!el.config.valid}
                            shouldValidate={el.config.validation}
                            isTouched={el.config.touched} />)
                })}

                <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
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