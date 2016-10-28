import React from 'react';
import Layout from '../../common/Layout';
import {Table} from 'antd';
import { Link } from 'react-router';
import classNames from 'classnames';
import style from './style.less';


const columns = [{
  title: '名称',
  render: record => <Link to={'/advertiser/'+record.key}>{record.name}</Link>,
}, {
  title: '结束时间',
  dataIndex: 'type',
}, {
  title: '出价',
  dataIndex: 'status',
}, {
  title: '日预算',
  dataIndex: 'company',
}];
const data = [{
  key: '1',
  name: '梅赛德斯',
  age: 32,
  address: '西湖区湖底公园1号',
}, {
  key: '2',
  name: '西门子',
  age: 42,
  address: '西湖区湖底公园1号',
}, {
  key: '3',
  name: '三菱',
  age: 32,
  address: '西湖区湖底公园1号',
}];


class solutionListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodata: false
    };

    this.paginBarVisible = data.length> 15;
  }

  componentDidMount(){

  }

  goNew(){
    window.location.hash = '/solution'
  }

  render() {
    let nodataClass = classNames({
      'nodata' : true,
      'hidden' : !this.state.nodata
    })

    return (
      <Layout current="solutionList" open="solutionManagement">
        <h1 className="page-title"> 推广计划管理 </h1>

        <Table className={this.props.hidden?'hidden':''}
              columns={columns} dataSource={data} pagination={this.paginBarVisible}/>

        <div className={nodataClass}>
          <h2>当前广告主暂无推广计划</h2>
          <h1>请先<a data-goto="new" onClick={this.goNew}>前往新增推广计划</a></h1>
        </div>
      </Layout>
    );
  }
}

export default solutionListPage;