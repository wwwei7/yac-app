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
      type: 'all',
      value: '',
      cityValue: [],
      ipValue: ''
    };
  }

  // 监听radio onchagne
  radioOnChange(e) {
    let type = e.target.value;
    let inputValue = '';
    switch(type){
      case 'all':
        inputValue = '';
        break;
      case 'city':
        inputValue = this.state.cityValue;
        break;
      case 'ip':
        inputValue = this.state.ipValue;
        break;
    }
    this.setState({
      type: type,
      value: inputValue
    })
    this.popValue(type, inputValue)
  }

  // 监听子选项输入框 onchange
  inputOnChange(e){
    let value = '';
    switch(this.state.type){
      case 'all':
        break;
      case 'city':
        value = e;
        this.setState({
          value: value,
          cityValue: e
        })
        break;
      case 'ip':
        value = e.target.value;
        this.setState({
          value: value,
          ipValue: value
        })
        break;
    }
    this.popValue(this.state.type, value)
  }

  // 更新父表单元素值
  popValue(type,value){
    value = (type == 'city'? value.join(',') : value);
    this.props.setRegion({
      type: type,
      value: value
    });
  }

  render() {
    return (
      <RadioGroup onChange={this.radioOnChange.bind(this)} value={this.state.type} className="region-group">
        <Radio className="radio-item" key="r1" value={"all"}>无地域定向（全网）</Radio>
        <Radio className="radio-item" key="r2" value={"city"}>选择城市定向</Radio>
        <div className={this.state.type=="city" ? 'city' : 'hidden'}>
          <Cascader ref="cityInput" size="large" options={cityOptions} 
            value={this.state.cityValue}
            onChange={this.inputOnChange.bind(this)} changeOnSelect />
        </div>
        
        <Radio className="radio-item" key="r3" value={"ip"}>自定义IP地域库</Radio>
        <div className={this.state.type=='ip' ? 'ip' : 'hidden'}>
            <Input ref="ipInput" type="textarea" placeholder="请使用分号（；）分隔" 
            value={this.state.ipValue}
            onChange={this.inputOnChange.bind(this)} />
        </div>
      </RadioGroup>
    );
  }
}

export default Region;