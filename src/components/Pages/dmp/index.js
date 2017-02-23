import React from 'react';
import { Button, Form, Input, Switch, Alert, Row, Col } from 'antd';
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
            <Col span={4}></Col>
            <Col span={12}>            
            <Alert
              message="人群定向:开启后,系统会尽可能地投放广告主的访客人群,不管推广计划是否设置人群定向"
              type="info"
            />
            </Col>
          </Row>

          <Row className="row">
            <Col span={4}>DMP标签激活：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>
          <Row className="row">
            <Col span={4}></Col>
            <Col span={12}>            
            <Alert
              message="DMP标签激活:开启后,系统会根据所搜集的人群,计算出所属标签"
              type="info"
            />
            </Col>
          </Row>

          <Row className="row">
            <Col span={4}>出价兴趣定向：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>
          <Row className="row">
            <Col span={4}></Col>
            <Col span={12}>            
            <Alert
              message="出价兴趣定向:当访客的兴趣标签属性与广告主的一致时,溢价30%,以提高胜出的概率"
              type="info"
            />
            </Col>
          </Row>

          <Row className="row">
            <Col span={4}>猜你喜欢定向：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>
          <Row className="row">
            <Col span={4}></Col>
            <Col span={12}>            
            <Alert
              message="猜你喜欢定向:根据用户访客的兴趣标签,在全网中寻找相同兴趣标签的人群"
              type="info"
            />
            </Col>
          </Row>
          
          <Row className="row">
            <Col span={4}>高分人群定向：</Col>
            <Col span={2}><Switch defaultChecked={true} onChange={this.onChange} /></Col>
          </Row>   
          <Row className="row">
            <Col span={4}></Col>
            <Col span={12}>            
            <Alert
              message="高分人群:结合访客的浏览行为(访问页面,类型,次数,停留时间等),给每个访客打分,分数高者即为高分人群.开启后,广告优先投放该人群"
              type="info"
            />
            </Col>
          </Row>      
        </div>


      </Layout>
    );
  }
}


export default Dmp;