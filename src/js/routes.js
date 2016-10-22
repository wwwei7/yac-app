import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, IndexRedirect } from 'react-router';

import auth from './auth'

import homePage from '../components/homePage';
import reportMediaPage from '../components/reportMediaPage';
import solutionListPage from '../components/solutionListPage';
import solutionNewPage from '../components/solutionNewPage';
import budgetPage from '../components/pages/Budget';
import adInfoPage from '../components/pages/AdInfo';
import financePage from '../components/pages/Finance';


class Routes extends Component{
    constructor(){
        super();
        this.state = {
            user: null
        }
    }

    getUser() {

    }

    render(){
        return (
            <Router puth="/" history={hashHistory}>
                <Route path="/">
                    <IndexRedirect to="home" />
                </Route>
                <Route path="home" component={homePage} onEnter={auth}></Route>
                <Route path="reportmedia" component={reportMediaPage} ></Route>
                <Route path="solution" component={solutionNewPage} ></Route>    
                <Route path="solution/:id" component={solutionNewPage} ></Route>                                       
                <Route path="solutionlist" component={solutionListPage} ></Route>
                <Route path="advertiser/:id" component={solutionListPage}></Route>
                <Route path="budget" component={budgetPage} ></Route>
                <Route path="adinfo" component={adInfoPage} ></Route>    
                <Route path="finance" component={financePage} ></Route>                                                                                                                                                          
            </Router>
        )
    }
}

export default Routes;