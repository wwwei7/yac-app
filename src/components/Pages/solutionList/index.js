import React from 'react';
import Layout from '../../common/Layout';
import {Table, Modal} from 'antd';
import { Link } from 'react-router';
import classNames from 'classnames';
import Moment from 'moment';
import './style.less';



class solutionListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      nodata: false,
      pauseModalVisible: false,
      pauseLoading: false,
      pauseModalTitle: ''
    };

    this.columns = [{
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
    }, {
      title: '投放状态',
      render: record => {
        const status = `${record.status} ${record.disabled}`;
        let str;
        switch(status){
          case '0 0':
          case '0 1':
            str = '停投';
            break;
          case '1 1':
            str = '暂停';
            break;
          default:
            str = '正常';
        }
        return str;
      }
    }, {
      title: '操作',
      render: record=> <div><a data-sid={record.id} data-sts={record.disabled} onClick={this.pause.bind(this)}>{record.disabled?'开启':'暂停'}</a></div>
    }];

    this.paginBarVisible = this.state.tableData.length> 15;
  }

  componentWillMount(){
    this.updateTable()
  }

  updateTable(){
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
        status: item.status,
        disabled: item.disabled,
        price: item.price,
        budget: item.budget
      })
    })

    return table;
  }

  goNew(){
    window.location.hash = `/${this.props.params.aid}/solution`
  }

  pause(e){
    let target = e.target;
    if(target.dataset.sts==0){
      this.setState({
        pauseModalTitle: '是否暂停投放此推广计划',
        pauseModalVisible: true
      });

      this.handleSolution = {
        id: target.dataset.sid,
        sts: 1
      }
    }else{
      this.setState({
        pauseModalTitle: '是否继续投放此推广计划',
        pauseModalVisible: true
      });

      this.handleSolution = {
        id: target.dataset.sid,
        sts: 0
      }
    }


  }
  
  doPause(){
    this.setState({
      pauseLoading: true
    })

    const postUrl = `/api/v1/solution/pause/${this.handleSolution.id}`;

    fetch(postUrl,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: this.handleSolution.sts})
    }).then(res =>{
      if(res.ok){
        this.setState({
          pauseModalVisible: false,
          pauseLoading: false
        })
      }
      this.updateTable()
    },function(err){
      console.log(err)
    })
  }

  pauseCancel(){
    if(this.state.pauseLoading)
      return false;
    this.setState({
      pauseModalVisible: false,
      pauseLoading: false
    })
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

        <Modal title={this.state.pauseModalTitle}
          visible={this.state.pauseModalVisible}
          onOk={this.doPause.bind(this)}
          confirmLoading={this.state.pauseLoading}
          onCancel={this.pauseCancel.bind(this)}
        />

        <Table className={this.props.hidden?'hidden':''}
              columns={this.columns} dataSource={this.state.tableData} pagination={this.paginBarVisible}/>

        
      </Layout>
    );
  }
}

export default solutionListPage;