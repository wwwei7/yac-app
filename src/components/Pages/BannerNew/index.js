import React from 'react';
import Layout from '../../common/Layout';
import { Link } from 'react-router';
import { Steps, Upload, Icon, message } from 'antd';
import classNames from 'classnames';
import style from './style.less';

const Step = Steps.Step;
const Dragger = Upload.Dragger;

const sizeList = ['200x200', '250x250', '320x250', '320x320', '640x180', '640x320'];
const fileUp = {
  name: 'file',
  showUploadList: false,
  action: '/action/upload',
  disabled: false,
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

class solutionListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
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

  sizeClick(e){
    const step =1;
    const curSize = e.target.innerHTML;
    this.setState({step, curSize})
  }

  render() {

    return (
      <Layout current="bannerNew" open="bannerManagement">
        <h1 className="page-title"> 素材管理 </h1>

        <Steps className="steps" current={this.state.step}>
          <Step title="请选择素材尺寸" />
          <Step title="上传素材图片" />
          <Step title="完成上传" />
        </Steps>

        <ul className="sizelist">
          {
            sizeList.map((size,i) =>{
              let cls = this.state.curSize == size ? 'active' : 'item';
              
              return (<li key={i} className={cls} onClick={this.sizeClick.bind(this)}>{size}</li>)
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

      </Layout>
    );
  }
}

export default solutionListPage;