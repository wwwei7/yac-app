import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import style from './style.less';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

let AdNewForm = React.createClass({
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  },

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  },

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd'], { force: true });
    }
    callback();
  },

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '用户名至少为 5 个字符' },
        { validator: this.userExists },
      ],
    });
    const companyProps = getFieldProps('company',{});
    const contactorProps = getFieldProps('company',{});    
    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    });
    const textareaProps = getFieldProps('textarea', {
      
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const protocol = (
      <Select defaultValue="http://" style={{ width: 70 }}>
        <Option value="http">http://</Option>
        <Option value="https">https://</Option>
      </Select>
    )
    return (
      <Form horizontal className={this.props.hidden?'adnew-form hidden':'adnew-form'}>
        <FormItem
          {...formItemLayout}
          label="广告主名称"
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
        >
          <Input {...nameProps} placeholder="" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="联系人"
        >
          <Input {...contactorProps} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="联系电话"
        >
          <Input {...contactorProps} />
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
          <Input {...textareaProps} type="textarea" placeholder="请使用分号（；）分隔" id="textarea" name="textarea" />
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  },
});

AdNewForm = createForm()(AdNewForm);

export default AdNewForm;