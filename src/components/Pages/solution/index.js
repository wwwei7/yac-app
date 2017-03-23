import React from 'react';
import { Button, Form, Input, Select, DatePicker, InputNumber, 
  Radio, Card, Spin, Modal, Alert} from 'antd';
import Layout from '../../common/Layout';
import Region from '../../Region';
import moment from 'moment';
import './style.less';


const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.RadioGroup;
const Option = Select.Option;


let SolutionPage = React.createClass({
  getInitialState() {
    return {
      loading: false,
      loadingTips: '',
      region: {},
      editable: this.props.route.editable
    };
  },

  componentDidMount(){
    if(!this.state.editable)
      return;
    this.setState({
      loading: true,
      loadingTips: '数据读取中...'
    })
    const url = `/api/v1/solution/${this.props.params.sid}`;
    fetch(url).then(res =>
      res.json()
    ).then(data=>{
      this.setState({
        loading: false
      })
      // 调整初始化表单数据格式
      const initData = this.initData = this.presetInitData(data);
      this.props.form.setFieldsValue(initData);
      this.setState({
        region: initData.region,
        name: initData.name
      })
    }, err=>{
      alert('Read solution error')
    })
  },

  componentWillReceiveProps(props){
    const editable = props.route.editable;
    if(editable != this.state.editable){
      this.setState({
        editable: this.props.route.editable
      })
      this.reset();
    }    
  },

  presetInitData(data){
    const initData = {
      ...data,
      name: data.solution_name,
      start: moment(data.start_date,'YYYY-MM-DD'),
      end: data.end_date ? moment(data.end_date,'YYYY-MM-DD') : null,
      price: data.price ? data.price : 0,
      region: this.presetRegion(data.region_type, data.region_value),
      os: data.os ? data.os.split(',') : [],
      browser: data.browser ? data.browser.split(',') : []
    }
    // initData.price =  data.price ? data.price : 0;
    // initData.os = data.os ? data.os.split(',') : [];
    // initData.browser =  data.browser ? data.browser.split(',') : [];
    return initData;
  },

  presetRegion(type,value) {
    let region = {};
    region.type = type;
    if(type==2){
      region.value = value.split(',')
    }else{
      region.value = value;
    }
    return region;
  },

  reset() {
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
    const that = this;
    if (!value) {
      callback();
    } else {
      const url = `/api/v1/solution/${this.props.params.aid}/name/${value}`;
      fetch(url).then(res => 
        res.json()
      ).then( data => {
        let nameRepeat;
        if(data.solution_name){
          nameRepeat =  that.state.editable ?  data.solution_name != that.state.name : true;
        }else
          nameRepeat = false;
        if(!nameRepeat){
          callback()
        }else{
          callback([new Error(`对不起，名称 ${value} 已经存在`)])
        }
      },function(err){
        console.log(err)
      })
    }
  },

  priceValidate(rule, val, callback){
    if(val<=0)
      callback([new Error(`出价设置需要大于0元`)])
    else
      callback()
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
    let postUrl;
    if(this.state.editable)
      postUrl = '/api/v1/solution/'+ this.props.params.sid;
    else
      postUrl = '/api/v1/solution';

    const postBody = {
        advertiser_id: this.props.params.aid,
        solution_name: values.name,
        region_type: values.region.type,
        region_value: values.region.value,
        adx: 'baidu',
        media: values.media,
        start_date: values.start,
        end_date: values.end || '2030-12-31',
        budget: values.budget,
        os: values.os ? values.os.join(',') : '',
        browser: values.browser ? values.browser.join(',') : '',
        price: values.price
      };

    this.setState({
      loading: true,
      loadingTips: '正在保存...'
    })

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
  },

  saveSuccess(){
    this.setState({ loading: false });
    const modal = Modal.success({
      title: '保存成功',
      onOk: ()=>{
        this.reset();
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
      <Layout current={this.state.editable ? 'solutionList' : 'solutionNew'} 
        open='solutionManagement' className='solution-form'>
        <h1 className="page-title">
          { this.state.editable ? '编辑推广计划' : '新增推广计划' }
        </h1>
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
            {getFieldDecorator('price',{
              rules: [
                { required: true, message: '出价不能为空' },
                { validator: this.priceValidate },
              ],
            })(
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

          {/*<FormItem
            {...formItemLayout}
            label="ADX渠道"
            style={{height:80}}
          >
           <Card style={{ width: 300 }}>
              <p>Baidu</p>
            </Card>
          </FormItem>*/}

          <FormItem
            {...formItemLayout}
            label="媒体范围"
          >
            {getFieldDecorator('media')(
              <Input type="textarea" placeholder="示例：163.com, sina.com.cn"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="操作系统定向"
          >
            {getFieldDecorator('os')(
              <Select tags
                style={{ width: '100%' }}
                placeholder="空为不限"
              >
                <Option key="1" value="WINDOWS">Windows</Option>
                <Option key="2" value="MAC_OS">Mac</Option>
                <Option key="3" value="LINUX">Linux</Option>
                <Option key="4" value="ANDROID">Android</Option>
                <Option key="5" value="IOS">Ios</Option>
                <Option key="6" value="OTHERS">其他</Option>
              </Select>

            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="浏览器定向"
          >
            {getFieldDecorator('browser')(
              <Select tags
                style={{ width: '100%' }}
                placeholder="空为不限"
              >
                <Option key="1" value="IE">IE</Option>
                <Option key="2" value="CHROME">Chrome</Option>
                <Option key="3" value="SAFARI">Safari</Option>
                <Option key="4" value="FIREFOX">Firefox</Option>
                <Option key="5" value="OTHERS">其他</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="日预算上限设置"
          >
            {getFieldDecorator('budget')(
              <InputNumber min={0} max={10000} step={1} />
            )}
            <Alert type="warning" showIcon style={{display:'inline-block'}}
              message="空为不限" />
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.reset}>重置</Button>
          </FormItem>
        </Form>
        </Spin>
      </Layout>

    );
  },
});

SolutionPage = createForm()(SolutionPage);

export default SolutionPage;