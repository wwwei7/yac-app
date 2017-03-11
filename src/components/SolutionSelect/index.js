import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;
class SolutionSelect extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      solutionOption: []
    };
  }

  componentDidMount(){
    const postUrl = `/api/v1/solution/ad/${this.props.aid}`;
    fetch(postUrl).then(res =>
      res.json()
    ).then(data => {
      if(data.length>1){
        this.setState({
          solutionOption: data
        })
      }
    },function(err){
      console.log(err)
    })
  }

  onSelect(value, option){
    this.props.onSelect(value);
  }

  getOptions(){

    let dom =  this.state.solutionOption.map((item,i)=>
        (
          <Option
            key={String(item.id)}
            name={item.solution_name}
          >
            {item.solution_name}
          </Option>
        )
      )
    if(this.props.includeAll)
      dom.unshift((
        <Option key={"0"} name="所有推广计划">所有推广计划</Option>
        ))      
    return dom;
  }

  render(){
    const options = this.getOptions();
    const width = this.props.width || '200px'
    return(
      <Select
        style={{ width: width }}
        defaultValue="0"
        placeholder="请选择推广组"
        optionFilterProp="children"
        onSelect={this.onSelect.bind(this)}
        filterOption={(input, option) => option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {options}
      </Select>
    )
  }
}

export default SolutionSelect;