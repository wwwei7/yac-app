import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import homePage from '../components/homePage';
import testPage from '../components/testPage';

class Routes extends Component{
    constructor(){
        super();
        this.state = {
            user: null
        }

        //this.getUser()
    }

    getUser() {

    }

    render(){
        return (
            <Router puth="/" history={hashHistory}>
                <Route path="home" component={homePage} ></Route>
                <Route path="test" component={testPage} ></Route>
                <Route path="advertiser/:id" component={testPage}></Route>
            </Router>
        )
    }
}

export default Routes;