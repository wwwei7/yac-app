import React from 'react';
import { Icon, Modal } from 'antd';
import { Link } from 'react-router'; 
import style from './style.less';

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    let self = this;
    const roleMap = {
      'agency': '代理商用户'
    }
  }

  logout(){
     Modal.confirm({
      title: '是否退出当前账户',
      onOk() {
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
            <span>欢迎：{this.props.user?this.props.user.name:''}</span>
            <span>{this.props.user?this.props.user.role:''}</span>            
            <span className="header-logout" onClick={this.logout}><Icon type="logout" />注销</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;