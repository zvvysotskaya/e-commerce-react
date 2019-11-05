import React, { useEffect, lazy, Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { GlobalStyle } from './global.styles';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));

const App = ({ checkUserSession, currentUser }) => {
    useEffect(() => { checkUserSession() }, [checkUserSession]);
    return (
        <div>
            <GlobalStyle />
            <ErrorBoundary>
                <Header />
            </ErrorBoundary>
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner/>}>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/shop' component={ShopPage} />
                        <Route exact path='/signin' render={() =>
                        currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)
                    }
                    />
                        <Route exact path='/checkout' component={CheckoutPage} />
                    </Suspense>
                </ErrorBoundary>
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
