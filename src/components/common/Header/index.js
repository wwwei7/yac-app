import React from 'react';
import { Icon, Modal } from 'antd';
import { Link } from 'react-router'; 
import style from './style.less';

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  logout(){
     Modal.confirm({
      title: '是否退出当前账户',
      onOk() {
        console.log('确定');
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
            <span>欢迎：{this.props.name}React</span>
            <span>{this.props.role} 代理商用户</span>            
            <span className="header-logout" onClick={this.logout}><Icon type="logout" />注销</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;