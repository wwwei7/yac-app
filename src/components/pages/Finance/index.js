import React from 'react';
import { Button, Form, Input, Select, InputNumber, Spin, Modal, Table } from 'antd';
import Layout from '../../common/Layout';
import Moment from 'moment'
import classNames from 'classnames';
import Store from '../../../js/store';
import './style.less'

const createForm = Form.create;
const FormItem = Form.Item;

const logColumns = [{
    title: '充值金额',
    dataIndex: 'money',
    key: 'money',
  }, {
    title: '广告主ID',
    dataIndex: 'advertiser_id',
    key: 'advertiser_id',
  }, {
    title: '操作人',
    dataIndex: 'user_name',
    key: 'user_name',
  }, {
    title: '充值时间',
    dataIndex: 'opt_time',
    key: 'opt_time'
  }];

class FinanceForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalVisible: false,
      money: 0,
      balance: 0.00,
      log: []
    };
  }

  handleSubmit() {
    if(this.state.money <1){
      Modal.warning({
        title: '请输入有效的充值金额，至少为壹元人民币',
      });
    }else
      this.setState({
        modalVisible: true
      })
  }

  handleReset() {
    this.setState({
      money: 0
    })
  }

  componentDidMount(){
    this.refreshBalance();
    this.refreshLog();
    this.role = Store.getUser().role; 
  }

  presetData(data){
    data.map(item => {
      item.money = '￥' + item.money + '.00'; 
      item.opt_time = Moment(item.opt_time).format('YYYY-MM-DD HH:mm:ss');
    })
    return data;
  }

  //广告主余额刷新
  refreshBalance(){
    const balance = `/api/v1/balance/${Store.getAdvertiser().id}`;

    fetch(balance).then(res =>
      res.json()
    ).then(data => {

      this.setState({
        balance: parseFloat(data.money).toFixed(2)
      })

    },function(err){
      console.log(err)
    })
  }

  // 充值记录表格刷新
  refreshLog(){
    const chargeLog = `/api/v1/charge/${Store.getAdvertiser().id}`;

    fetch(chargeLog).then(res =>
      res.json()
    ).then(data => {

      const tableData = this.presetData(data);

      this.setState({
        log: tableData
      })

    },function(err){
      console.log(err)
    })
  }

  modalOk(){
    const chargeURL = `/api/v1/charge/`;
    const adObj = Store.getAdvertiser();
    const user = Store.getUser();
    const postData = {
      money: this.state.money,
      advertiser_id: adObj.id,
      user_id: user.uid,
      user_name: user.name
    }
    
    this.setState({
      confirmLoading: true
    });

    fetch(chargeURL, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)  
    }).then(res =>
      res.json()
    ).then(data => {

      this.refreshLog()

      this.setState({
        confirmLoading: false,
        modalVisible: false
      })

      this.refreshBalance();

      Modal.success({
        title: '充值成功' 
      })
      
    },function(err){
      Modal.error({
        title: '充值失败' 
      })
    })
  }

  modalCancel(){
    if(this.state.confirmLoading){
      return;
    }
    this.setState({
      modalVisible: false
    })
  }

  moneyChange(value){
    this.setState({
      money: value
    })
  }


  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    };

    let logTable = classNames({
      chargelog: true,
      hidden: this.state.log.length == 0
    })
    return (
      <Layout current="financeManagement">
        <h1 className="page-title">充值管理</h1>
        <Modal title="充值确认"
          visible={this.state.modalVisible}
          onOk={this.modalOk.bind(this)}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.modalCancel.bind(this)}
          className="charge-modal"
        >
          <p>是否确定为当前广告主充值：</p>
          <p><b className="red">￥{this.state.money}.00</b> 元</p>
        </Modal>

        <div className={this.role=="advertiser"?'hidden':''}>
          <FormItem
              {...formItemLayout}
              label="为当前广告主充值金额"
          >
            <InputNumber value={this.state.money} className="money" min={0} max={100000} step={1} onChange={this.moneyChange.bind(this)}/>
          </FormItem>
          <div className="opts">
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>充值</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
          </div>
        </div>


        <h2 className="balance">当前广告主账户可用余额为：<span>￥{this.state.balance} </span>元</h2>

        <h3>充值历史</h3>
        <div className={logTable}>
          <Table dataSource={this.state.log} columns={logColumns} />
        </div>

      </Layout>
    );
  }
}


FinanceForm = createForm()(FinanceForm);

export default FinanceForm;