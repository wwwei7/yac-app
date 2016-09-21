import React from 'react';
import style from './style.less';

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  logout(){
    alert('log out')
  }

  render(){
    return(
      <div className="header">
        <div className="container clearfix">
          <a className="header-logo">Your Ad Cloud</a>
          <div className="header-user">
            <span>欢迎：{this.props.name}</span>
            <span>{this.props.role} 用户</span>            
            <span onClick={this.logout}>注销</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;