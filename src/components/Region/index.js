import React from 'react';
import { Radio, Input, Cascader, Form } from 'antd';
import style from './style.less'
const RadioGroup = Radio.Group;
const FromItem = Form.FormItem;

const cityOptions = [{
  value: '浙江',
  label: '浙江',
  children: [{
    value: 'hangzhou',
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
    };
    this.type = 1;
    // 初始化城市选择框和ip输入框
    this.cityValue = [];
    this.ipValue = '';
  }

  // 监听radio onchagne
  radioOnChange(e) {
    let type = e.target.value;
    let inputValue = '';
    switch(type){
      case 1:
        inputValue = '';
        break;
      case 2:
        inputValue = this.cityValue;
        break;
      case 3:
        inputValue = this.ipValue;
        break;
    }
    this.type = type;
    this.popValue(type, inputValue)
  }

  // 监听子选项输入框 onchange
  inputOnChange(e){
    let value = '';
    switch(this.type){
      case 1:
        break;
      case 2:
        value = e;
        this.cityValue = value;
        break;
      case 3:
        value = e.target.value;
        this.ipValue = value;
        break;
    }
    this.popValue(this.type, value)
  }

  // 更新父表单元素值
  popValue(type,value){
    value = (type == 2 && value.join? value.join(',') : value);
    this.props.setRegion({
      type: type,
      value: value
    });
  }

  getInputValue(type){
    //先从当前缓存里取值
    switch(type){
      case 2:
        this.cityValue = this.cityValue.length>0? this.cityValue : this.props.value.value;
        return this.cityValue;
      case 3:
        this.ipValue =  this.ipValue || this.props.value.value;
        return this.ipValue;
    }
  }

  render() {
    const type = this.props.value.type;
    const cityValue = this.getInputValue(type)
    const ipValue = this.getInputValue(type)

    this.type =  type;

    return (
      <RadioGroup onChange={this.radioOnChange.bind(this)} value={type} className="region-group">
        <Radio className="radio-item" key="r1" value={1}>无地域定向（全网）</Radio>
        <Radio className="radio-item" key="r2" value={2}>选择城市定向</Radio>
        <div className={type==2 ? 'city' : 'hidden'}>
          <Cascader ref="cityInput" size="large" options={cityOptions} 
            value={cityValue}
            onChange={this.inputOnChange.bind(this)} changeOnSelect />
        </div>
        
        <Radio className="radio-item" key="r3" value={3}>自定义IP地域库</Radio>
        <div className={type==3 ? 'ip' : 'hidden'}>
            <Input ref="ipInput" type="textarea" placeholder="请使用分号（；）分隔" 
            value={ipValue}
            onChange={this.inputOnChange.bind(this)} />
        </div>
      </RadioGroup>
    );
  }
}

export default Region;