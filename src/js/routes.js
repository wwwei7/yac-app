import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, IndexRedirect } from 'react-router';

import auth from './auth'

import homePage from '../components/Pages/home';
import reportDailyPage from '../components/Pages/reportDaily';
import reportHourPage from '../components/Pages/reportHour';
import reportMediaPage from '../components/Pages/reportMedia';
import solutionListPage from '../components/Pages/solutionList';
import solutionNewPage from '../components/Pages/solutionNew';
import solutionEditPage from '../components/Pages/solutionEdit';
import budgetPage from '../components/Pages/Budget';
import adInfoPage from '../components/Pages/AdInfo';
import financePage from '../components/Pages/Finance';
import bannerListPage from '../components/Pages/BannerList';
import bannerPage from '../components/Pages/BannerNew';


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
                <Route path="/:aid/reportdaily" component={reportDailyPage} onEnter={auth}></Route>
                <Route path="/:aid/reporthour" component={reportHourPage} onEnter={auth}></Route>
                <Route path="/:aid/reportmedia" component={reportMediaPage} onEnter={auth}></Route>                
                <Route path="/:aid/solution" component={solutionNewPage} onEnter={auth}></Route>                               
                <Route path="/:aid/solutionlist" component={solutionListPage} onEnter={auth}></Route>
                <Route path="/:aid/solution/:sid/edit" component={solutionEditPage} onEnter={auth}></Route>                
                <Route path="budget" component={budgetPage} onEnter={auth}></Route>
                <Route path="adinfo" component={adInfoPage} onEnter={auth}></Route>    
                <Route path="finance" component={financePage} onEnter={auth}></Route>
                <Route path="/:aid/bannerlist" component={bannerListPage} onEnter={auth}></Route>                                                                                                                                                                          
                <Route path="/:aid/bannernew" component={bannerPage} onEnter={auth}></Route>                                                                                                                                                          
            </Router>
        )
    }
}

export default Routes;