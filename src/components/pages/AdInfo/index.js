import React from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import Layout from '../../common/Layout';

const createForm = Form.create;
const FormItem = Form.Item;

class AdInfoForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
    };
    const protocol = (
      <Select defaultValue="http://" style={{ width: 70 }}>
        <Option value="http">http://</Option>
        <Option value="https">https://</Option>
      </Select>
    )
    return (
      <Layout current="adInfoManagement">
        <h1 className="page-title">广告主信息管理</h1>
        <Form horizontal className={this.props.hidden?'adnew-form hidden':'adnew-form'}>
          <FormItem
            {...formItemLayout}
            label="广告主名称"
            hasFeedback
            help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
            >
            <Input placeholder="" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="联系人"
            >
            <Input />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="联系电话"
            >
            <Input />
          </FormItem>

          <FormItem
            {...formItemLayout}        
            label="网址"
            >
            <Input addonBefore={protocol} placeholder="mysite.com" id="site" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="广告落地页白名单"
            >
            <Input type="textarea" placeholder="请使用分号（；）分隔" id="textarea" name="textarea" />
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Form>
      </Layout>
    );
  }
}


AdInfoForm = createForm()(AdInfoForm);

export default AdInfoForm;