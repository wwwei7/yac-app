import store from './store'

export const login = function(nextState, replace, next){
    
    fetch('/action/check',{
        credentials: 'include',
        method: 'GET'
    }).then(function(res){
        return res.json()
    }).then(function(data){
        console.log(data);
        if(data.user){
            // set user object to store
            store.setUser(data.user);
            next();
        }else{
            replace({
                pathname: '/'
            })
        }
    }).catch(function(e){
        window.location = '/';
    })
}

export const homeRedirect = function(nextState, replace, next){
    fetch('/action/check',{
        credentials: 'include',
        method: 'GET'
    }).then(function(res){
        return res.json()
    }).then(function(data){
        if(data.user){
            // set user object to store            
            store.setUser(data.user);
            // redirect            
            switch(data.user.role){
                case 'agency':
                    replace({
                        pathname: '/agency'
                    })
                    break;
                case 'advertiser':
                    replace({
                        pathname: `/${data.user.advertiserid}/solutionlist`
                    })
                    break;
            }
            next();
        }else{
            replace({
                pathname: '/'
            })
        }
    }).catch(function(e){
        window.location = '/';
    })
};