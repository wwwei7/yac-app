import React from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import Layout from '../../common/Layout';

const createForm = Form.create;
const FormItem = Form.Item;

class BudgetForm extends React.Component{
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
      <Layout current="budgetManagement">
        <h1 className="page-title"> 预算管理</h1>
          <Form horizontal className={this.props.hidden?'adnew-form hidden':'adnew-form'}>
            <FormItem
              {...formItemLayout}
              label="CPM"
            >
              <InputNumber min={0} max={10000} step={0.01} />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="CPC"
              >
              <InputNumber min={0} max={10000} step={0.01} />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="CTR"
              >
              <InputNumber min={0} max={10000} step={0.01} />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="日预算花费上限"
              >
              <InputNumber min={0} max={10000} step={0.01} />
            </FormItem>

            <FormItem
                {...formItemLayout}
                label="月预算花费上限"
              >
              <InputNumber min={0} max={10000} step={0.01} />
            </FormItem>

            <FormItem wrapperCol={{ span: 6, offset: 4 }}>
              <Button type="primary" onClick={this.handleSubmit}>保存</Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="ghost" onClick={this.handleReset}>重置</Button>
            </FormItem>
          </Form>
      </Layout>
    );
  }
}


BudgetForm = createForm()(BudgetForm);

export default BudgetForm;