import React from 'react';
import { Steps, Upload, Icon, Modal, Button, Alert, Spin, Input, message, Table, Row, Col } from 'antd';
import classNames from 'classnames';
import Store from '../../../js/store';
import style from './editor.less';


class BannerListEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    
  }

  save(){
    const name= this.refs.bannerName.refs.input.value || this.state.img.name;
    let link= this.refs.bannerLocation.refs.input.value || '';
    const memo= this.refs.bannerMemo.refs.input.value || '';
    const images = this.state.uploadedList.map(file=> file.response);
    const solutionid = this.sid;
    const advertiserid = Store.getAdvertiser().id;

    const postUrl = '/api/v1/banner';

    link = link.replace(/ /g,'');
    if(!link){
      message.error('跳转地址不能为空', 3);
      return false;
    }

    this.setState({
      uploading3: true
    })

    fetch(postUrl,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, link, memo, images, solutionid, advertiserid})
    }).then(res => {
      if(res.ok){
        this.setState({
          uploading3: false
        });
        this.refs.bannerName.refs.input.value = '';
        this.refs.bannerLocation.refs.input.value = '';
        this.refs.bannerMemo.refs.input.value = '';

        const self = this;

        Modal.success({
          title: `创意素材：${name} 保存成功！`,
          okText: '继续上传创意素材',
          onOk() {
            self.toStep2();
          },
        });
      }
    }, function(err){
      console.log(err)
    })
    
  }

  updateBannerInfo(index, type, e){
    let fileList = this.props.fileList;
    const val = e.target.value;
    fileList[index][type] = val;
    this.props.updateFileList(fileList)
  }

  copy(index,type){
    let fileList = this.props.fileList;
    const val = fileList[index][type];
    fileList.map(file=>{
      file[type] = val
    })
    this.props.updateFileList(fileList);
  }

  deleteRow(index){
    let fileList = this.props.fileList;
    const file = fileList[index];
    const self = this;    
    Modal.confirm({
      title: `是否删除尺寸为${file.dimension}的创意元素？`,
      content: (
        <div>
          <img src={file.url} />
        </div>),
      onOk(){
        fileList.splice(index,1);
        self.props.updateFileList(fileList);    
      }
    })
  }

  getList() {
    const fileList = this.props.fileList || [];
    return fileList.map((file,i) => {
      return (
        <div className="ant-row banner-edit-list-row" key={'frow'+i}>
          <Col className="banner-edit-list-col" span={3}>{file.dimension}</Col>
          <Col className="banner-edit-list-col" span={5}>
            <Input value={file.name} onChange={this.updateBannerInfo.bind(this,i,'name')}/>
            <Button shape="circle" icon="copy" onClick={this.copy.bind(this,i,'name')}/>  
          </Col>
          <Col className="banner-edit-list-col" span={6}>
            <Input value={file.clickUrl} placeholder="请输入点击地址" onChange={this.updateBannerInfo.bind(this,i,'clickUrl')} />
            <Button shape="circle" icon="copy" onClick={this.copy.bind(this,i,'clickUrl')}/>
          </Col>   
          <Col className="banner-edit-list-col" span={5}><Input placeholder="请输入备注" onChange={this.updateBannerInfo.bind(this,i,'memo')} /></Col>
          <Col className="banner-edit-list-col" span={3}><Button type="danger" icon="delete" onClick={this.deleteRow.bind(this,i)}/></Col>                            
        </div>
      )
    })
  }


  render() {
    const List  = this.getList();
    return (
      <div className="banner-edit-list">
        <Row className="banner-edit-list-header">
          <Col className="banner-edit-list-col" span={3}>尺寸</Col>
          <Col className="banner-edit-list-col" span={5}>创意名称</Col>
          <Col className="banner-edit-list-col" span={6}>点击地址</Col>
          <Col className="banner-edit-list-col" span={5}>备注</Col>   
          <Col className="banner-edit-list-col" span={3}>删除</Col>                           
        </Row>
        {List}
      </div>
    );
  }
}

export default BannerListEditor;