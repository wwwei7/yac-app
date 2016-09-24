import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import homePage from '../components/homePage';
import reportMediaPage from '../components/reportMediaPage';
import solutionListPage from '../components/solutionListPage';

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
                <Route path="reportmedia" component={reportMediaPage} ></Route>
                <Route path="solutionlist" component={solutionListPage} ></Route>              
                <Route path="advertiser/:id" component={solutionListPage}></Route>
            </Router>
        )
    }
}

export default Routes;