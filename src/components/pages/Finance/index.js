import React from 'react';
import { Button, Form, Input, Select, InputNumber, Spin } from 'antd';
import Layout from '../../common/Layout';

const createForm = Form.create;
const FormItem = Form.Item;

class FinanceForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit() {

  }

  handleReset() {
    
  }


  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    };
    return (
      <Layout current="financeManagement">
        <h1 className="page-title">充值管理</h1>
        <Spin size="large">
        <Form horizontal className={this.props.hidden?'adnew-form hidden':'adnew-form'}>
          <FormItem
              {...formItemLayout}
              label="当前广告主充值金额"
          >
            <InputNumber min={0} max={10000} step={0.01} />
          </FormItem>

          <FormItem wrapperCol={{ span: 6, offset: 2 }}>
              <Button type="primary" onClick={this.handleSubmit}>充值</Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Form>
        </Spin>
      </Layout>
    );
  }
}


FinanceForm = createForm()(FinanceForm);

export default FinanceForm;