import React, { Component } from 'react';
import Aux from '../../hoc/AuxComp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount() {
        console.log('[BurgerBuilder] componentDidMount 1');

        axios.get('https://react-my-burger-14dd1.firebaseio.com/ingredients.json').then(res => {
            console.log('[BurgerBuilder] componentDidMount 2');
            this.setState({ ingredients: res.data })
            
        }).catch(err=>{
            console.log(err); 
            this.setState({error: true})
        });
    }

    updatePurchaseableState = (updatedIngredients) => {
        let totalItems = Object.keys(updatedIngredients).map(igkey => {
            return updatedIngredients[igkey];
        }).reduce((totalItems, el) => { return totalItems + el }, 0);
        console.log(totalItems);

        this.setState({ purchaseable: totalItems > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // if(oldCount >=4){
        //     return;
        // }
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        updatedIngredients[type] = updatedCount;

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedTotalPrice });

        this.updatePurchaseableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // if (oldCount <= 0) {
        //     return;
        // }
        const updatedCount = oldCount - 1;
        const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedTotalPrice });

        this.updatePurchaseableState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        // alert('Continue and checkout');
        this.setState({ loading: true }); //start loading

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        let btnAddDisabledInfo = { ...this.state.ingredients };
        for (let key in btnAddDisabledInfo) {
            btnAddDisabledInfo[key] = btnAddDisabledInfo[key] >= 4;
        }

        let btnRemoveDisabledInfo = { ...this.state.ingredients };
        for (let key in btnRemoveDisabledInfo) {
            btnRemoveDisabledInfo[key] = btnRemoveDisabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burgernBurgerControlsComponent = this.state.error? <p>Ingredients can't be loaded</p> :<Spinner />;
        if (this.state.ingredients) {
            orderSummary = (<OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                continueClicked={this.purchaseContinueHandler}
                cancelClicked={this.purchaseCancelHandler} />);

            burgernBurgerControlsComponent = (
                < Aux >
                    <Burger ingredients={this.state.ingredients} />;
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        btnAddDisabled={btnAddDisabledInfo}
                        btnRemoveDisabled={btnRemoveDisabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        orderNow={this.purchaseHandler} />
                </Aux >);
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                {/* <div>Burger</div> */}
                <Modal show={this.state.purchasing} hideModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgernBurgerControlsComponent}

            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);