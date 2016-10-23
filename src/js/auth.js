

const auth = function(){
    

    fetch('/i/user/123',{
        method: 'GET'
    }).then(function(res){
        console.log('from: '+ res)
        return res.json()
    }).then(function(data){
        console.log(data)
    }).catch(function(e){
        console.log('error')
    })
}

export default auth;