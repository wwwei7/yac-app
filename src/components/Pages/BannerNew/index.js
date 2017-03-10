import React from 'react';
import Layout from '../../common/Layout';
import { Steps, Upload, Icon, Modal, Button, Alert, Spin, Input, message, Table, Row, Col } from 'antd';
import classNames from 'classnames';
import Store from '../../../js/store';
import BannerListEditor from './bannerListEditor'
import style from './style.less';

const Step = Steps.Step;
const Dragger = Upload.Dragger;
const sizeList = ['336x280', '300x250', '960x90', '728x90', '250x250', '120x240'];

class solutionListPage extends React.Component {
  constructor(props) {
    super(props);

    const self = this;
    let uploadTimer;

    this.state = {
      step: 0,
      img: {},
      solutionList: [],
      curSul: '',
      nodata: false,
      uploading: false,
      uploading3: false,
      fileList: [], //当前上传的所有文件
      uploadedList: [], //上传成功的所有文件
      uploadedFailList: [] //上传失败的所有文件
    };

    this.fileUp = {
      showUploadList: true,
      multiple: true,
      action: '/action/upload',
      accept: '.jpg,.png,.gif',
      beforeUpload() {
        //传递推广组id
        this.data.sid = self.sid;
        self.setState({
          uploading: true
        })
      },
      onChange(info) {
        let fileList = info.fileList;

        let successList = fileList.filter((file) => {
          if (file.response) {
            file.url = file.response.url;
            file.width = file.response.width;
            file.height = file.response.height;
            file.dimension = file.response.dimension;
            return file.response.status === 'success';
          }
          
          return true;
        });

        let failList = fileList.filter((file)=>{
          if (file.response){
            file.dimension = file.response.dimension;            
            return file.response.status !== 'success';                          
          }
          return true;
        })

        self.setState({fileList: fileList})
        self.setState({uploadedList: successList})
        self.setState({uploadedFailList: failList})
        
        if(uploadTimer){
          clearTimeout(uploadTimer)
        }
        uploadTimer = setTimeout(()=>{
          let loadingEnd = self.state.fileList.every(file => {
            return file.status != 'uploading'
          })
          if(loadingEnd){
            self.setState({
              uploading: false
            })
            if(self.state.uploadedList.length>0){
              self.setState({
                step: 2
              })
            }
            else{
              self.uploadErrModal();
            }            
          }
        },500)
      },
    };

  }

  initUploadState(){
    this.setState({
      fileList: [], //当前上传的所有文件
      uploadedList: [], //上传成功的所有文件
      uploadedFailList: [] //上传失败的所有文件
    })
  }

  uploadErrModal(){
    let failList = [],
        self = this;
    failList = this.state.uploadedFailList.map(file=>{
      return file.dimension
    })
    Modal.error({
      title: `尺寸为：${failList.join('、')} ，上传失败`,
      okText: '重新上传创意素材',
      onOk() {
        self.initUploadState();
      },
    })
  }

  componentDidMount(){
    const solutionUrl = `/api/v1/solution/ad/${this.props.params.aid}`;

    fetch(solutionUrl).then(res =>
      res.json()
    ).then(data => {
      let nodata = false;      
       
      if(data.length<1){
        nodata = true;
      }

      this.setState({
        solutionList: data
      })

    },function(err){
      console.log(err)
    })
  }

  toStep1(){
    this.setState({step: 0})        
  }

  toStep2(){
    this.initUploadState();
    this.setState({step: 1})        
  }

  getPostBanerData(sid, aid){
    const list = this.state.uploadedList;
    const len=list.length;
    const urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi); 
    let arr = [], 
        fileItem,
        i = 0,
        sizeKey={};
    for(;i<len;i++){
      fileItem = list[i];
      const link = fileItem.clickUrl || '';
      if(link.trim().length==0)
        return {err: '点击地址不能为空', index: i, content: `第${i+1}行，尺寸为${fileItem.dimension}的创意`}
      if(!link.trim().match(urlRegex))
        return {err: '错误的点击地址', index: i, content: `第${i+1}行，尺寸为${fileItem.dimension}的创意`}
      if(sizeKey[fileItem.dimension]){
        return {err: '重复的素材尺寸', index: i, content: `第${i+1}行与第${sizeKey[fileItem.dimension].index+1}行，尺寸都为${fileItem.dimension}，请删除一项或重新上传`}
      }
      sizeKey[fileItem.dimension] = {index: i};

      arr.push([
        fileItem.name.trim(),
        link.trim(),
        String(fileItem.width),
        String(fileItem.height),
        fileItem.url,
        fileItem.memo,
        aid,
        sid
      ])
    }

    return arr;
  }

  save(){

    const solutionid = this.sid;
    const advertiserid = Store.getAdvertiser().id;
    const postData = this.getPostBanerData(solutionid, advertiserid)
    const self = this;
    
    if(postData.err){
      Modal.error({
        title: postData.err,
        content: postData.content
      })
      return false;
    }

    const postUrl = '/api/v1/banner';

    this.setState({
      uploading3: true
    })

    fetch(postUrl,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(res => res.json()
    ).then(data=>{
      if(data.status=="200"){
        this.setState({
          uploading3: false
        });

        Modal.success({
          title: `创意素材保存成功！`,
          okText: '继续上传创意素材',
          onOk() {
            self.initUploadState();
            self.toStep2();
          },
        });
      }else{
        Modal.error({
          title: `创意素材保存失败！`,
          okText: '重新上传创意素材',
          onOk() {
            self.initUploadState();
            self.toStep2();
          },
        });
      }
    }, function(err){
      console.log(err)
    })
    
  }

  setSolution(e){
    const step = 1;
    const curSul = e.target.innerHTML;
    this.sid = e.target.dataset.sid;
    this.setState({step, curSul})    
  }

  updateFileList(uploadedList){
    this.setState({
      uploadedList
    })
  }


  render() {

    let step1Class = classNames({
      stepct: true,
      hidden: this.state.step != 0
    })

    let step2Class = classNames({
      stepct: true,
      hidden: this.state.step != 1
    })

    let step3Class = classNames({
      stepct: true,
      step3: true,
      hidden: this.state.step != 2
    })

    return (
      <Layout current="bannerNew" open="bannerManagement">
        <h1 className="page-title"> 素材管理 </h1>

        <Steps className="steps" current={this.state.step}>
          <Step title="选择推广组" />
          <Step title="上传素材图片" />
          <Step title="完成上传" />
        </Steps>

        <div className={step1Class}>
          <p className="subtitle">
            {
              this.state.nodata ?
              '当前广告主还未建立推广组，请先新增推广组' :
              '请先选择素材将要添加的推广组'
            }        
          </p>
          <ul className="solutionlist">
            {
              this.state.solutionList.map((sul, i) => {
                let sname = sul.solution_name;
                
                return (<li key={i} data-sid={sul.id} className="item" onClick={this.setSolution.bind(this)}>{sname}</li>)
              })
            }
          </ul>
        </div>

        <div className={step2Class}>
          <Spin spinning={this.state.uploading}
            tip='正在上传图片...'
            >
          <p className="subtitle">当前素材将会添加至推广组：<b>{this.state.curSul}</b>
             <Button type="ghost" icon="rollback" onClick={this.toStep1.bind(this)}>重选推广组</Button>
          </p>
          <p className="sizetitle">所支持的图片尺寸（单位：像素）</p>
          <ul className="sizelist">
            {
              sizeList.map((size,i) =>{
                let cls = this.state.curSize == size ? 'active' : 'item';
                
                return (<li key={i} className={cls} >{size}</li>)
              })
            }       
          </ul>
          
          <div className="fileup">
            <Dragger {...this.fileUp} fileList={this.state.fileList}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">单击或拖拽本地图片到这里</p>
              <p className="ant-upload-hint">支持单个文件上传，大小不超过100kB，且格式为 png 、jpg 、gif。</p>
            </Dragger>
          </div>
          </Spin>
        </div>

        <div className={step3Class}>
          <Spin spinning={this.state.uploading3}
            tip='正在保存...'
            >
          <section className="title">
            {
              this.state.uploadedFailList.length > 0 && 
              <Alert
                message = {`上传失败文件尺寸：${this.state.uploadedFailList.map(file=>file.dimension).join('、')}`}       
                type="error"
                showIcon
              />
            }
            <Alert
              message = {`上传成功文件尺寸：${this.state.uploadedList.map(file=>file.dimension).join('、')}`}
              description = "请继续完善下列信息"          
              type="success"
              showIcon
              />
          </section>

          <section className="banner-form">
            <BannerListEditor 
              fileList={this.state.uploadedList}
              updateFileList={this.updateFileList.bind(this)}/>
          </section>

          <section className="opts">
            <Button size="large"
              onClick={this.toStep2.bind(this)}>
              返回
            </Button>
            <Button type="primary" size="large"
              onClick={this.save.bind(this)}>
              保存
            </Button>
          </section>
          </Spin>
        </div>

      </Layout>
    );
  }
}

export default solutionListPage;