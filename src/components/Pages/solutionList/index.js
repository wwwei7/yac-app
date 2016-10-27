import React from 'react';
import Layout from '../../common/Layout';
import {Table} from 'antd';
import { Link } from 'react-router';
import style from './style.less';


const columns = [{
  title: '广告主名称',
  // dataIndex: 'name',
  render: record => <Link to={'/advertiser/'+record.key}>{record.name}</Link>,
}, {
  title: '广告主类型',
  dataIndex: 'type',
}, {
  title: '账户状态',
  dataIndex: 'status',
}, {
  title: '公司名称',
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
    };

    this.paginBarVisible = data.length> 15;
  }


  render() {
    return (
      <Layout current="solutionList" open="solutionManagement">
        <h1 className="page-title"> 推广计划管理 </h1>
        <Table className={this.props.hidden?'hidden':''}
              columns={columns} dataSource={data} pagination={this.paginBarVisible}/>
      </Layout>
    );
  }
}

export default solutionListPage;