import React, { useEffect} from 'react';

import HomePage from './pages/homepage/homepage.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { GlobalStyle } from './global.styles';

const App = ({ checkUserSession, currentUser }) => {
    useEffect(() => { checkUserSession() }, [checkUserSession]);
    return (
        <div>
            <GlobalStyle/>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={ShopPage} />
                <Route exact path='/signin' render={() =>
                    currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)
                }
                />
                <Route exact path='/checkout' component={CheckoutPage} />
            </Switch>
        </div>
    );
};


const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser    
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
