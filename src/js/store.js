let userStore = {};
let advertiserStore = {};

const getUser = () => userStore;

const getAdvertiser = () => {
  if(advertiserStore.id){
    return advertiserStore;
  }
  return {id: sessionStorage.getItem('aid')}
}

const setUser = user => {
  Object.assign(userStore,user);
  if(user.role == 'advertiser'){
    setAdvertiser({id: user.advertiserid})
  }
}

const setAdvertiser = advertiser => {
  Object.assign(advertiserStore,advertiser); 
  sessionStorage.setItem('aid',advertiser.id)
}

const clear = () => {
  userStore = {};
  advertiserStore = {};
  sessionStorage.clear();
}

const storeAction = {
  setUser: setUser,
  getUser: getUser,
  setAdvertiser: setAdvertiser,
  getAdvertiser: getAdvertiser,
  clear: clear
}

export default storeAction;