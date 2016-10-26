import React from 'react';
import { Button, Form, Input, Select, Spin, Modal } from 'antd';
import style from './style.less';
const createForm = Form.create;
const FormItem = Form.Item;


let AdNewForm = React.createClass({
  getInitialState () {
    return {
      loading: false
    };
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
      this.postForm(values);
    });
  },

  postForm(values){
    const postUrl = '/api/v1/advertiser';

    const postBody = {
        user_id: this.props.uid,
        name: values.name,
        contacter: values.contacter,
        contact_number: values.contactNum,
        website: values.website,
        landing_white: values.whiteList
      };
    
    let self = this;

    this.state.loading = true;

    fetch(postUrl,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    }).then(function(res){
      if(res.ok){
        self.saveSuccess();
      }
    }, function(err){

    })
  },

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      const url = '/api/v1/advertiser/name/' + value;
      fetch(url).then(function(res){
        var a;
        return res.json()
      }).then(function(data){
        if(!data.name){
          callback()
        }else{
          callback([new Error('对不起，名称 '+value+ ' 已经存在')])
        }
      },function(err){

      })
    }
  },

  saveSuccess(){
    this.setState({loading:false});
    const self = this;
    const modal = Modal.success({
      title: '保存成功',
      onOk: function(){
        window.location.hash = 'advertiser/1'
      }
    });

  },

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;

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
        <Spin tip="正在存储...." size="large"
          spinning={this.state.loading}>
        <FormItem
          {...formItemLayout}
          label="广告主名称"
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
        >
          {getFieldDecorator('name', {
            rules: [
              { required: true, min: 5, max: 16, message: '用户名长度范围需要在5~16个字符之间' },
              { validator: this.userExists },
            ],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="联系人"
          name="contacter"
        >
          {getFieldDecorator('contacter', {
            rules: [
              {required: false, max: 10, message: '请勿超过10个字符'}
            ]
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="联系电话"
        >
          {getFieldDecorator('contactNum', {
            rules: [
              { max: 12, message: '请勿超过12个字符'}
            ]
          })(
            <Input type="tel"/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}        
          label="网址"
        >
          {getFieldDecorator('website')(
            <Input type="url" addonBefore={protocol} placeholder="mysite.com" id="site" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="广告落地页白名单"
        >
          {getFieldDecorator('whiteList')(
            <Input type="textarea" placeholder="请使用分号（；）分隔" id="textarea" name="textarea" />
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
        </Spin>
      </Form>
    );
  },
});

AdNewForm = createForm()(AdNewForm);

export default AdNewForm;