import React, {Component} from 'react';
import { Table } from 'antd';
import { Link } from 'react-router'; 
import style from './style.less';

const columns = [{
  title: '广告主名称',
  // dataIndex: 'name',
  render: record => <Link to={'/advertiser/'+record.key}>{record.name}</Link>,
}, {
  title: '年龄',
  dataIndex: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
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

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
  onChange(selectedRowKeys, selectedRows) {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll(selected, selectedRows, changeRows) {
    console.log(selected, selectedRows, changeRows);
  },
};



class AdList extends Component{
    constructor(props){
        super(props);
        this.state = {}
        this.paginBar = data.length>15;

        console.log(props);
    }

    render(){
        return(
             <Table columns={columns} dataSource={data} pagination={this.paginBar}/>
        ) 
    }
}

export default AdList;