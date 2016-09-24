import React from 'react';
import { Menu, Icon } from 'antd';
import Header from '../common/Header';
import AdList from '../AdList';
import AdNew from '../AdNew';
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
        <div className="main-container">
          <Menu mode="horizontal" 
            onClick={this.onMenuClick.bind(this)} selectedKeys={[this.state.current]}>
            <Menu.Item key="list">
              <Icon type="bars" />广告主列表
            </Menu.Item>
            <Menu.Item key="new">
              <Icon type="plus-circle-o" />新增广告主 
            </Menu.Item>
          </Menu>
     
          <div className="panel">
            <AdList hidden={this.state.current != "list"} />   
            <AdNew hidden={this.state.current != "new"} />
          </div>
        </div>
      </div>
    );
  }
}

export default homePage;