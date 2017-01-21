import React from 'react';
import { Button, Form, Input, Switch, Row, Col } from 'antd';
import Layout from '../../common/Layout';
import './style.less';


class Dmp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  handleSubmit(){

  }

  onChange(){

  }

  render() {

    return (
      <Layout current="dmpManagement">
        <h1 className="page-title">DMP定向管理</h1>

        <div>
          <Row className="row">
            <Col span={4}>人群定向：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>
          <Row className="row">
            <Col span={4}>DMP标签激活：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>
          <Row className="row">
            <Col span={4}>出价兴趣定向：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>
          <Row className="row">
            <Col span={4}>重定向：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>
          <Row className="row">
            <Col span={4}>猜你喜欢定向：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>
          <Row className="row">
            <Col span={4}>高分人群定向：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>         
        </div>


      </Layout>
    );
  }
}


export default Dmp;