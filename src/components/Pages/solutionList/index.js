import React from 'react';
import Layout from '../../common/Layout';
import {Table} from 'antd';
import { Link } from 'react-router';
import classNames from 'classnames';
import Moment from 'moment';
import './style.less';


const columns = [{
  title: '名称',
  render: record => <Link to={'/'+record.aid+'/solution/'+record.id+'/edit'}>{record.name}</Link>,
}, {
  title: '开始时间',
  dataIndex: 'start',
}, {
  title: '结束时间',
  dataIndex: 'end',
}, {
  title: '日预算',
  dataIndex: 'budget',
}];


class solutionListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      nodata: false
    };

    this.paginBarVisible = this.state.tableData.length> 15;
  }

  componentWillMount(){
    const postUrl = `/api/v1/solution/ad/${this.props.params.aid}`;

    fetch(postUrl).then(res =>
      res.json()
    ).then(data => {
      let nodata = false;      
       
      if(data.length<1){
        nodata = true;
      }

      let tableData = this.tableDataFilter(data);

      this.setState({
        tableData: this.tableDataFilter(data),
        nodata: nodata
      })

    },function(err){
      console.log(err)
    })
  }

  tableDataFilter(data){
    let table = [];
    data.map(item => {
      table.push({
        id: item.id,
        aid: item.advertiser_id,
        name: item.solution_name,
        start: Moment(item.start_date).format('YYYY-MM-DD'),        
        end: item.end_date ? Moment(item.end_date).format('YYYY-MM-DD') : '',
        price: item.price,
        budget: item.budget
      })
    })

    return table;
  }

  goNew(){
    window.location.hash = `/${this.props.params.aid}/solution`
  }

  render() {
    let nodataClass = classNames({
      'nodata' : true,
      'hidden' : !this.state.nodata
    })

    return (
      <Layout current="solutionList" open="solutionManagement">
        <h1 className="page-title"> 推广计划管理 </h1>

        <div className={nodataClass}>
          <h2>当前广告主暂无推广计划</h2>
          <h1>请先<a data-goto="new" onClick={this.goNew.bind(this)}>前往新增推广计划</a></h1>
        </div>

        <Table className={this.props.hidden?'hidden':''}
              columns={columns} dataSource={this.state.tableData} pagination={this.paginBarVisible}/>

        
      </Layout>
    );
  }
}

export default solutionListPage;