import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';
import setAuthToken from './utils/setAuthToken';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUserAction } from './actions/auth';


AsyncStorage.getItem('token').then(token=>{
    if(token)setAuthToken(token);
});

const App = () => {
    useEffect(()=>{
        store.dispatch(loadUserAction())
    }, []);
    return(
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path="/" component={Landing}/>
                    <section className="container">
                        <Alert />
                        <Switch>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
)};

export default App;
