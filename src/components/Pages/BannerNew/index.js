import React from 'react';
import Layout from '../../common/Layout';
import { Link } from 'react-router';
import { Steps, Upload, Icon, message, Button } from 'antd';
import classNames from 'classnames';
import style from './style.less';

const Step = Steps.Step;
const Dragger = Upload.Dragger;

const sizeList = ['200x200', '250x250', '320x250', '320x320', '640x180', '640x320'];


class solutionListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      solutionList: [],
      curSul: '',
      nodata: false
    };

    this.fileUp = {
      name: 'file',
      showUploadList: false,
      action: '/action/upload',
      beforeUpload(arg) {
        console.log(arg)
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
        }
      },
    };

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

  setSolution(e){
    const step = 1;
    const curSul = e.target.innerHTML;
    this.setState({step, curSul})    
  }


  render() {

    let step1Class = classNames({
      stepct: true,
      hidden: this.state.step != 0
    })

    let step2Class = classNames({
      stepct: true,
      hidden: this.state.step == 0
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
          <p className="subtitle">请先选择素材将要添加的推广组</p>
          <ul className="solutionlist">
            {
              this.state.solutionList.map((sul, i) => {
                let sname = sul.solution_name;
                
                return (<li key={i} className="item" onClick={this.setSolution.bind(this)}>{sname}</li>)
              })
            }
          </ul>
        </div>

        <div className={step2Class}>
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
            <Dragger {...this.fileUp}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">单击或拖拽本地图片到这里</p>
              <p className="ant-upload-hint">支持单个文件上传，大小不超过100kB，且格式为 png 、jpg 、gif。</p>
            </Dragger>
          </div>

        </div>

        

      </Layout>
    );
  }
}

export default solutionListPage;