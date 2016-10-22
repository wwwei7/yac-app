import React from 'react';
import { Button, Form, Input, Select ,DatePicker, InputNumber, 
  Radio, Card} from 'antd';
import Layout from '../common/Layout';
import style from './style.less';
import Region from '../Region';

const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.RadioGroup;


let SolutionPage = React.createClass({
  getInitialState() {
    return {
      value: 1,
    };
  },
  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  },

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
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    };

    return (
      <Layout current='solutionNew' open='solutionManagement' className="solutionnew">
        <h1 className="page-title">新增推广计划</h1>
        <Form horizontal className={this.props.hidden?'adnew-form hidden':'adnew-form'}>
          <FormItem
            {...formItemLayout}
            label="推广计划名称"
          >
            <Input {...contactorProps} />
          </FormItem>
        
          <FormItem
            {...formItemLayout}
            label="开始时间"
            hasFeedback
          >
            <DatePicker></DatePicker>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="结束时间"
            hasFeedback
          >
            <DatePicker></DatePicker>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="出价设置"
          >
            <InputNumber min={0} max={10000} step={0.01} />
          </FormItem>

          <div className="ant-row ant-form-item region">
            <div className="ant-col-5 ant-form-item-label">
            <label className="">地域</label></div>
            <div className="ant-col-12">
              <div className="ant-form-item-control ">
              <Region></Region>
              </div>
            </div>
          </div>

          <FormItem
            {...formItemLayout}
            label="ADX渠道"
            style={{height:80}}
          >
           <Card style={{ width: 300 }}>
              <p>Baidu</p>
            </Card>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="媒体范围"
          >
            <Input type="textarea" {...contactorProps} placeholder="请输入域名使用分号；分隔"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="日预算上限设置"
          >
            <InputNumber min={0} max={10000} step={1} />
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Form>
      </Layout>

    );
  },
});

SolutionPage = createForm()(SolutionPage);

export default SolutionPage;