import React from 'react';
import { Icon, Modal } from 'antd';
import { Link } from 'react-router'; 
import style from './style.less';
import store from '../../../js/store'

const roleMap = {
  'agency': '代理商用户'
}

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount(){
    this.setState({
      user: store.getUser()
    })
    // this.user = store.getUser();
  }

  logout(){
     Modal.confirm({
      title: '是否退出当前账户',
      onOk() {
        window.location = '/';
        fetch('/action/logout',{
          credentials: 'include',
          method: 'GET'
        })
      },
      onCancel() {},
    });
  }

  render(){
    return(
      <div className="header">
        <div className="container clearfix">
          <Link className="header-logo" to='/home'>Your Ad Cloud</Link>
          <div className="header-user">
            <span>欢迎：{this.state.user.name}</span>
            <span>{roleMap[this.state.user.role]}</span>            
            <span className="header-logout" onClick={this.logout}><Icon type="logout" />注销</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;