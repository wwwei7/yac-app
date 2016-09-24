import React from 'react';
import { Menu, Icon } from 'antd';
import Header from '../Header';
import SiderBar from '../SiderBar';
import style from './style.less';


class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div className="wrap">
        <Header />
        <SiderBar current={this.props.current} open={this.props.open} />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;