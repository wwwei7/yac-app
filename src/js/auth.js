const auth = function(){
    console.log('auth')
    
    fetch('http://localhost:3000/i/user/123',{
        mode: 'no-cors'
    }).then(function(res){
        console.log('from: '+ res.user)
    },function(e){
        console.log('error')
    })
}

export default auth;