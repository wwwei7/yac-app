import React from 'react';
import { Button, Form, Input, Select, DatePicker, InputNumber, 
  Radio, Card, Spin, Modal} from 'antd';
import Layout from '../../common/Layout';
import Region from '../../Region';
import moment from 'moment';
import './style.less';


const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.RadioGroup;


let SolutionPage = React.createClass({
  getInitialState() {
    return {
      loading: false
    };
  },

  handleReset() {
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, fieldsValue) => {
      if (!!errors) {
        return;
      }
      const values = {
        ...fieldsValue,
        'start': fieldsValue['start'].format('YYYY-MM-DD'),
        'end': fieldsValue['end'] ? fieldsValue['end'].format('YYYY-MM-DD') : fieldsValue['end']
      };
      this.postForm(values);
    });
  },

  nameExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      const url = `/api/v1/solution/${this.props.params.aid}/name/${value}`;
      fetch(url).then(function(res){
        return res.json()
      }).then(function(data){
        if(!data.solution_name){
          callback()
        }else{
          callback([new Error(`对不起，名称 ${value} 已经存在`)])
        }
      },function(err){
        console.log(err)
      })
    }
  },

  setRegion(val){
    this.props.form.setFieldsValue({
      region: val
    })
  },

  disabledStartDate(current){
    let yesterday = ((date = new Date()) => date.setDate(date.getDate()-1))();
    return current && current.valueOf() <= yesterday;  
  },

  disabledEndDate(current){
    let startDate = this.props.form.getFieldValue('start');
    if(startDate)
      return current && current.valueOf() <= startDate.valueOf();
    else{
      let yesterday = ((date = new Date()) => date.setDate(date.getDate()-1))();    
      return current && current.valueOf() <= yesterday;  
    }
  },

  endDateBeyondStart(rule, value, callback){
    let startDate = this.props.form.getFieldValue('start')
    if(startDate && value && startDate.valueOf() > value.valueOf()){
      callback([new Error(`结束日期不得小于开始日期`)])      
    }else
      callback()    
  },


  postForm(values){
    const postUrl = '/api/v1/solution';

    const postBody = {
        advertiser_id: this.props.params.aid,
        solution_name: values.name,
        region_type: values.region.type,
        region_value: values.region.value,
        adx: 'baidu',
        media: values.media,
        start: values.start,
        end: values.end,
        budget: values.budget,
        price: values.price
      };

    fetch(postUrl,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    }).then(res => {
      if(res.ok){
        this.saveSuccess();
      }
    }, function(err){
      console.log(err)
    })

    this.state.loading = true;
  },

  saveSuccess(){
    this.state.loading = false;
    const modal = Modal.success({
      title: '保存成功',
      onOk: ()=>{
        this.handleReset();
        location.hash = `/${this.props.params.aid}/solutionlist`
      }
    });
  },

  

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    };

    return (
      <Layout current='solutionNew' open='solutionManagement'>
        <h1 className="page-title">新增推广计划</h1>
        <Spin tip="正在存储...." size="large"
          spinning={this.state.loading}>
        <Form horizontal className={this.props.hidden?'hidden':''}>
          <FormItem
            {...formItemLayout}
            label="推广计划名称"
            hasFeedback
            help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
          >
            {getFieldDecorator('name', {
              rules: [
                { required: true, min: 2, max: 16, message: '推广计划名称长度范围需要在2~16个字符之间' },
                { validator: this.nameExists },
              ],
            })(
              <Input />
            )}
          </FormItem>
        
          <FormItem
            {...formItemLayout}
            label="开始时间"
          >
            {getFieldDecorator('start', {
              initialValue: moment(),
              rules: [
                { type: 'object', required: true, message: '开始时间不能为空' }           
              ]
            })(
              <DatePicker disabledDate={this.disabledStartDate}></DatePicker>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="结束时间"

            help={ getFieldError('end') }
          >
            {getFieldDecorator('end', {
              rules: [
                { type: 'object', validator: this.endDateBeyondStart }                
              ]
            })(
              <DatePicker disabledDate={this.disabledEndDate}></DatePicker>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="出价设置"
          >
            {getFieldDecorator('price')(
            <InputNumber min={0} max={10000} step={0.01} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="地域"
            className="region"
          >
            {getFieldDecorator('region',{
              initialValue: {type:1,value:''}
            })(
              <Region setRegion={this.setRegion}></Region>
            )}
          </FormItem>

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
            {getFieldDecorator('media')(
              <Input type="textarea" placeholder="请输入域名使用分号；分隔"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="日预算上限设置"
          >
            {getFieldDecorator('budget')(
              <InputNumber min={0} max={10000} step={1} />
            )}
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Form>
        </Spin>
      </Layout>

    );
  },
});

SolutionPage = createForm()(SolutionPage);

export default SolutionPage;