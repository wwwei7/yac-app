import React from 'react';
import Layout from '../../common/Layout';
import { Table, Modal } from 'antd';
import { Link } from 'react-router';
import classNames from 'classnames';
import './style.less';


class bannerListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      nodata: false
    };

    let self = this;

    this.columns = [{
      title: '素材图片',
      render: record => (<div className="preview">
          <a href={record.image} target="_blank">
            <img className="preview-img" src={record.image}/>
          </a>
          <div className="origin-img">
            <img src={record.image}/>
          </div>
        </div>)
    },{
      title: '创意名称',
      dataIndex: 'name'
    }, {
      title: '所在推广组',
      dataIndex: 'sname',
    }, {
      title: '素材尺寸',
      render: record => `${record.width} x ${record.height}`
    }, {
      title: '点击地址',
      dataIndex: 'link'
    }, {
      title: '操作',
      render: record => <a data-bid={record.id} onClick={this.delete.bind(this)}>删除</a>
    }];
  }

  componentWillMount(){
    const postUrl = `/api/v1/banner/ad/${this.props.params.aid}`;

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
        id: item.ID,
        sid: item.solutionid,
        name: item.name,
        sname: item.solution_name,
        image: item.image,        
        width: item.width,
        height: item.height,
        link: item.link
      })
    })
    return table;
  }

  goNew(){
    window.location.hash = `/${this.props.params.aid}/bannernew`
  }

  delete(e){
    console.log(e.target.dataset.bid)
    Modal.warning({
      title: '功能马上做!',
      content: '',
    });
  }

  render() {
    let nodataClass = classNames({
      'nodata' : true,
      'hidden' : !this.state.nodata
    })

    return (
      <Layout current="bannerList" open="bannerManagement">
        <h1 className="page-title"> 素材列表 </h1>

        <div className={nodataClass}>
          <h2>当前广告主暂无创意素材</h2>
          <h1>请先<a data-goto="new" onClick={this.goNew.bind(this)}>前往新增创意素材</a></h1>
        </div>

        <Table className={this.props.hidden?'hidden':''}
              columns={this.columns} dataSource={this.state.tableData} pagination={this.paginBarVisible}/>
        
      </Layout>
    );
  }
}

export default bannerListPage;