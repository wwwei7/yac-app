import React from 'react';
import {render} from 'react-dom';
import Layout from '../../common/Layout';
import ReactEcharts from 'echarts-for-react';
import Echart from 'echarts';
import map from 'echarts/map/js/china.js';
import style from './style.less';
import 'antd/dist/antd.css';



var option = {
    //color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: [{
        type: 'category',
        data: ['搜狐', '你好影视网', '哈哈论坛', '无敌小说网', '风行视频', '网易', '360那啥网', '艾奇艺', '新浪网', '百度'],
        axisTick: {
            alignWithLabel: true
        }
    }],
    xAxis: [{
        type: 'value'       
    }],
    backgroundColor: '#ffffff',
    series: [{
        name: 'Top 10',
        type: 'bar',
        data: [7700, 8800, 9900, 11100, 14200, 16000, 18400, 20500, 22600, 24700],
        label: {
            normal: {
                show: true,
                position: 'insideRight',
                textStyle: {
                    color: 'white' //color of value
                }
            }
        },
        itemStyle: {
            normal: {
                color: new Echart.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: 'lightBlue' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: '#3398DB' // 100% 处的颜色
                }], false)
            }
        }
    }]
};

class reportMediaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Layout current='reportMedia' open='reportManagement'>
        <h1 className='page-title'>媒体报表（仅为示例）</h1>

        <ReactEcharts
          option={option} 
          notMerge={true}
          lazyUpdate={true}
          style={{height: '550px', width: '100%', marginTop: '-20px'}}  
          theme={"macarons"} />
      </Layout>
    );
  }
}

export default reportMediaPage;