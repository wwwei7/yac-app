

const auth = function(nextState, replace, next){
    
    fetch('/action/check',{
        credentials: 'include',
        method: 'GET'
    }).then(function(res){
        return res.json()
    }).then(function(data){
        console.log(data);
        if(data.user){
            // set user object to next component
            nextState.routes[0].user = data.user;
            next();
        }else{
            // alert('need login')
            // redirect login page
            window.location = '/';
        }
    }).catch(function(e){
        console.log('error')
    })
}

export default auth;