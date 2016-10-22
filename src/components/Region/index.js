import React from 'react';
import { Radio, Input, Cascader, Form } from 'antd';
import style from './style.less'
const RadioGroup = Radio.Group;
const FromItem = Form.FormItem;

const cityOptions = [{
  value: '浙江',
  label: '浙江',
  children: [{
    value: '',
    label: '杭州',
    children: [{
      value: 'town',
      label: '市区',
    }],
  }],
}, {
  value: '江苏',
  label: '江苏',
  children: [{
    value: '南京',
    label: '南京',
    children: [{
      value: 'new',
      label: '新城区',
    },{
      value: 'old',
      label: '老城区'
    }],
  }],
}];

class Region extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }
  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
    // this.state.value = e.target.value;
  }
  cityOnChange(e){

  }
  render() {
    return (
      <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value} className="region-group">
        <Radio className="radio-item" key="a" value={1}>无地域定向（全网）</Radio>
        <Radio className="radio-item" key="b" value={2}>选择城市定向</Radio>
        <div className={this.state.value==2 ? 'city' : 'hidden'}>
          <Cascader size="large" options={cityOptions} onChange={this.cityOnChange} changeOnSelect />
        </div>
        
        <Radio className="radio-item" key="d" value={3}>自定义IP地域库</Radio>
        <div className={this.state.value==3 ? 'ip' : 'hidden'}>
            <Input  type="textarea" placeholder="请使用分号（；）分隔" id="textarea" name="textarea" />
        </div>
      </RadioGroup>
    );
  }
}

export default Region;