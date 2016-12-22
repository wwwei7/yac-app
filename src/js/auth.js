import store from './store'

const auth = function(nextState, replace, next){
    
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
            // alert('need login')
            // redirect login page
            window.location = '/';
        }
    }).catch(function(e){
        console.log(e)
    })
}

export default auth;