import React from 'react';
import { Menu, Icon } from 'antd';
import Header from '../common/Header';
import AdList from '../AdList';
import style from './style.less';
import 'antd/dist/antd.css';




class homePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "list"
    };
  }

  onMenuClick(e){
    this.setState({
      current: e.key
    })
  }

  render() {
    return (
      <div className="wrap">
        <Header />
        <div className="container">
          <Menu mode="horizontal" current={this.state.current}
            onClick={this.onMenuClick.bind(this)} selectedKeys={[this.state.current]}>
            <Menu.Item key="list">
              <Icon type="mail" />列表
            </Menu.Item>
            <Menu.Item key="new">
              <Icon type="appstore" />新建
            </Menu.Item>
          </Menu>

          <AdList hidden={this.state.current != "list"}/>       
        </div>
      </div>
    );
  }
}

export default homePage;