import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
import store from '../../../js/store'
import style from './style.less';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;

class Sider extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.current
    };
  }

  // 设置advertiserID
  componentWillMount(){
    this.aid = store.getAdvertiser().id;
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
  }

  render() {
    return (
      <Menu onClick={this.handleClick.bind(this)}
        style={{ width: 240 }}
        defaultOpenKeys={[this.props.open]}
        selectedKeys={[this.state.current]}
        mode="inline"
        id="yac-sider" 
      >
        <SubMenu key="reportManagement" title={<span><Icon type="bar-chart" /><span>报表</span></span>}>
          <Menu.Item key="reportDaily"><Icon type="clock-circle-o" />
            <Link to={`/${this.aid}/reportdaily`}>全天报表</Link>
          </Menu.Item>
          <Menu.Item key="reportHour"><Icon type="line-chart" />
            <Link to={`/${this.aid}/reporthour`}>小时报表</Link>
          </Menu.Item>
          <Menu.Item key="reportMedia"><Icon type="area-chart" />
            <Link to={`/${this.aid}/reportmedia`}>媒体报表</Link>
          </Menu.Item>          
        </SubMenu>

        <SubMenu key="solutionManagement" title={<span><Icon type="cloud-o" /><span>投放管理</span></span>}>
          <Menu.Item key="solutionNew"><Icon type="plus-square" />
            <Link to={`/${this.aid}/solution`}>新增推广计划</Link>
          </Menu.Item>
          <Menu.Item key="solutionList"><Icon type="edit" />
            <Link to={`/${this.aid}/solutionlist`}>现有推广计划管理</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="budgetManagement"><Icon type="calculator" />
          <Link to="/budget">预算管理</Link>
        </Menu.Item>

        <Menu.Item key="6"><Icon type="team" />DMP人群管理</Menu.Item>

        <Menu.Item key="financeManagement"><Icon type="pay-circle-o" />
          <Link to="/finance">财务管理</Link>
        </Menu.Item>

        <SubMenu key="bannerManagement" title={<span><Icon type="picture" /><span>素材管理</span></span>}>
          <Menu.Item key="bannerList"><Icon type="windows" />
            <Link to={`/${this.aid}/bannerlist`}>素材列表</Link>
          </Menu.Item>
          <Menu.Item key="bannerNew"><Icon type="plus-square" />
            <Link to={`/${this.aid}/bannernew`}>新增素材</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="adInfoManagement"><Icon type="solution" />
          <Link to="/adinfo">广告主信息管理</Link>
        </Menu.Item>
        
      </Menu>
    );
  }
}

export default Sider;