import React from 'react';
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';
import Header from '../common/Header';
import style from './style.less';

class homePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div>
        <Header />
        <div style={{ width: 400, margin: '100px auto' }}>
          <DatePicker onChange={value => this.handleChange(value)} />
          <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
        </div>
      </div>
    );
  }
}

export default homePage;