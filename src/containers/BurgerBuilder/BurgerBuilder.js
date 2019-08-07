import React, { Component } from 'react';
import Aux from '../../hoc/AuxComp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../Store/actions';



class BurgerBuilder extends Component {

    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log('[BurgerBuilder] componentDidMount 1');

        // axios.get('https://react-my-burger-14dd1.firebaseio.com/ingredients.json').then(res => {
        //     console.log('[BurgerBuilder] componentDidMount 2');
        //     this.setState({ ingredients: res.data })

        // }).catch(err=>{
        //     console.log(err); 
        //     this.setState({error: true})
        // });
    }

    updatePurchaseableState = (updatedIngredients) => {
        let totalItems = Object.keys(updatedIngredients).map(igkey => {
            return updatedIngredients[igkey];
        }).reduce((totalItems, el) => { return totalItems + el }, 0);
        console.log(totalItems);

        // this.setState({ purchaseable: totalItems > 0 })
        return totalItems > 0;
    }

    addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // // if(oldCount >=4){
        // //     return;
        // // }
        // const updatedCount = oldCount + 1;

        // const updatedIngredients = {
        //     ...this.state.ingredients
        // }

        // const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        // updatedIngredients[type] = updatedCount;

        // this.setState({ ingredients: updatedIngredients, totalPrice: updatedTotalPrice });

        // this.updatePurchaseableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // // if (oldCount <= 0) {
        // //     return;
        // // }
        // const updatedCount = oldCount - 1;
        // const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        // const updatedIngredients = { ...this.state.ingredients };
        // updatedIngredients[type] = updatedCount;

        // this.setState({ ingredients: updatedIngredients, totalPrice: updatedTotalPrice });

        // this.updatePurchaseableState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        // console.log(this.props.history);
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    }

    render() {
        let btnAddDisabledInfo = { ...this.props.ings };
        for (let key in btnAddDisabledInfo) {
            btnAddDisabledInfo[key] = btnAddDisabledInfo[key] >= 4;
        }

        let btnRemoveDisabledInfo = { ...this.props.ings };
        for (let key in btnRemoveDisabledInfo) {
            btnRemoveDisabledInfo[key] = btnRemoveDisabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burgernBurgerControlsComponent = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.ings) {
            orderSummary = (<OrderSummary
                price={this.props.price}
                ingredients={this.props.ings}
                continueClicked={this.purchaseContinueHandler}
                cancelClicked={this.purchaseCancelHandler} />);

            burgernBurgerControlsComponent = (
                < Aux >
                    <Burger ingredients={this.props.ings} />;
                    <BuildControls
                        addIngredient={this.props.onAddIngredient}
                        removeIngredient={this.props.onRemoveIngredient}
                        btnAddDisabled={btnAddDisabledInfo}
                        btnRemoveDisabled={btnRemoveDisabledInfo}
                        totalPrice={this.props.price}
                        purchaseable={this.updatePurchaseableState(this.props.ings)}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload: { ingredientName: ingName } }),
        onRemoveIngredient: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: { ingredientName: ingName } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));