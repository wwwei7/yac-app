import React, { Component } from 'react';
import { Router, Route, hashHistory, Redirect, IndexRedirect } from 'react-router';

import { login, homeRedirect } from './auth';

import agHomePage from '../components/Pages/agHome';
import reportDailyPage from '../components/Pages/reportDaily';
import reportHourPage from '../components/Pages/reportHour';
import reportMediaPage from '../components/Pages/reportMedia';
import solutionListPage from '../components/Pages/solutionList';
import solutionFormPage from '../components/Pages/solution';
import solutionNewPage from '../components/Pages/solutionNew';
import solutionEditPage from '../components/Pages/solutionEdit';
import budgetPage from '../components/Pages/Budget';
import dmpPage from '../components/Pages/dmp';
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

    render(){
        return (
            <Router path="/" history={hashHistory}>
                <Route path="/" onEnter={homeRedirect}></Route>
                <Route path="/agency" component={agHomePage} onEnter={login}></Route>
                <Route path="/:aid/reportdaily" component={reportDailyPage} onEnter={login}></Route>
                <Route path="/:aid/reporthour" component={reportHourPage} onEnter={login}></Route>
                <Route path="/:aid/reportmedia" component={reportMediaPage} onEnter={login}></Route>                
                <Route path="/:aid/solution/" component={solutionFormPage} editable={false} onEnter={login}></Route>                               
                <Route path="/:aid/solutionlist" component={solutionListPage} onEnter={login}></Route>
                <Route path="/:aid/solution/:sid" component={solutionFormPage} editable={true} onEnter={login}></Route>                
                <Route path="/budget" component={budgetPage} onEnter={login}></Route>
                <Route path="/dmp" component={dmpPage} onEnter={login}></Route>
                <Route path="/:aid/adinfo" component={adInfoPage} onEnter={login}></Route>    
                <Route path="/finance" component={financePage} onEnter={login}></Route>
                <Route path="/:aid/bannerlist" component={bannerListPage} onEnter={login}></Route>                                                                                                                                                                          
                <Route path="/:aid/bannernew" component={bannerPage} onEnter={login}></Route>                                                                                                                                                          
            </Router>
        )
    }
}

export default Routes;