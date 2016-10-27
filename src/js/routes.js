import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, IndexRedirect } from 'react-router';

import auth from './auth'

import homePage from '../components/Pages/home';
import reportMediaPage from '../components/Pages/reportMedia';
import solutionListPage from '../components/Pages/solutionList';
import solutionNewPage from '../components/Pages/solutionNew';
import budgetPage from '../components/Pages/Budget';
import adInfoPage from '../components/Pages/AdInfo';
import financePage from '../components/Pages/Finance';


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
            <Router path="/" history={hashHistory}>
                <Route path="/">
                    <IndexRedirect to="home" />
                </Route>
                <Route path="home" component={homePage} onEnter={auth}></Route>
                <Route path="reportmedia" component={reportMediaPage} ></Route>
                <Route path="solution" component={solutionNewPage} ></Route>    
                <Route path="solution/:id" component={solutionNewPage} ></Route>                                       
                <Route path="solutionlist" component={solutionListPage} ></Route>
                <Route path="budget" component={budgetPage} ></Route>
                <Route path="adinfo" component={adInfoPage} ></Route>    
                <Route path="finance" component={financePage} ></Route>                                                                                                                                                          
            </Router>
        )
    }
}

export default Routes;