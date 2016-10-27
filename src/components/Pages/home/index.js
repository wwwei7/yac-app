import React from 'react';
import { Menu, Icon } from 'antd';
import Header from '../../common/Header';
import AdList from '../../AdList';
import AdNew from '../../AdNew';
import style from './style.less';
import 'antd/dist/antd.css';


class homePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "list",
      user: {}
    };
  }

  componentDidMount(){
    this.setState({
      user: this.props.route.user
    })
  }

  onMenuClick(e){
    this.setState({
      current: e.key
    })
  }

  changeTab(val){
    this.setState({
      current: val
    })
  }

  render() {
    return (
      <div className="wrap">
        <Header user={this.state.user}/>
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
            <AdList changeTab={this.changeTab.bind(this)} hidden={this.state.current != "list"} uid={this.state.user.uid}/>   
            <AdNew changeTab={this.changeTab.bind(this)} hidden={this.state.current != "new"} uid={this.state.user.uid}/>
          </div>
        </div>
      </div>
    );
  }
}

export default homePage;