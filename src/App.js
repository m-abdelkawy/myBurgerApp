import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  // state={
  //   show:true
  // }

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({show:false});
  //   }, 5000);
  // }

  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
          {/* {this.state.show ? <BurgerBuilder/>:null} */}
          {/* <BurgerBuilder><div>xxx</div></BurgerBuilder> */}
        </Layout>
      </div>
    )
  }
}

export default App;
