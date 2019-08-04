import React, { Component } from 'react';
import Aux from '../Aux';
import styleClasses from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
                <main className={styleClasses.Content}>
                    {this.props.children}
                </main>

            </Aux>
        )
    }
}

// const layout = (props) => (
//     <Aux>
//         <Toolbar />
//         <SideDrawer />
//         <main className={styleClasses.Content}>
//             {props.children}
//         </main>

//     </Aux>
// )


export default Layout;