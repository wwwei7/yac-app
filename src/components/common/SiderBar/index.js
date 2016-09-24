import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
import style from './style.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;

const Sider = React.createClass({
  getInitialState() {
    return {
      current: this.props.current,
      openKeys: [this.props.open],
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }, 
  onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
    });
  },
  render() {
    return (
      <Menu onClick={this.handleClick}
        style={{ width: 240 }}
        openKeys={this.state.openKeys}
        onOpen={this.onToggle}
        onClose={this.onToggle}
        selectedKeys={[this.state.current]}
        mode="inline"
        id="yac-sider" 
      >
        <SubMenu key="reportManagement" title={<span><Icon type="bar-chart" /><span>报表</span></span>}>
          <Menu.Item key="reportDaily"><Icon type="clock-circle-o" />小时报表</Menu.Item>
          <Menu.Item key="reportMonthly"><Icon type="line-chart" />全天报表</Menu.Item>
          <Menu.Item key="reportMedia"><Icon type="area-chart" /><Link to="/reportmedia">媒体报表</Link></Menu.Item>          
        </SubMenu>
        <SubMenu key="solutionManagement" title={<span><Icon type="cloud-o" /><span>投放管理</span></span>}>
          <Menu.Item key="solutionNew"><Icon type="plus-square" />新增推广计划</Menu.Item>
          <Menu.Item key="solutionList"><Icon type="edit" /><Link to="/solutionlist">现有推广计划管理</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="5"><Icon type="calculator" />预算管理</Menu.Item>
        <Menu.Item key="6"><Icon type="team" />DMP人群管理</Menu.Item>
        <Menu.Item key="7"><Icon type="pay-circle-o" />财务管理</Menu.Item>
        <Menu.Item key="8"><Icon type="solution" />广告主信息管理</Menu.Item>
      </Menu>
    );
  },
});

export default Sider;