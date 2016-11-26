import React from 'react';
import {render} from 'react-dom';
import Layout from '../../common/Layout';
import ReactEcharts from 'echarts-for-react';
import Echart from 'echarts';
import map from 'echarts/map/js/china.js';
import style from './style.less';
import 'antd/dist/antd.css';



class reportHourPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getOption(){
      return {
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            right: 50,
            itemGap: 15,
            height: 100,
            feature: {
                dataView: {show: false, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['竞价次数','竞价成功数','平均花费']
        },
        xAxis: [
            {
                type: 'category',
                data: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '千次',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '￥ {value}'
                }
            }
        ],
        series: [
            {
                name:'竞价次数',
                type:'bar',
                data:[3.0, 4.9, 17.0, 28.2, 35.6, 76.7, 195.6, 202.2, 72.6, 20.0, 6.4, 3.3, 4.0, 8.9, 12.0, 53.2, 35.6, 76.7, 185.6, 222.2, 52.6, 23.0, 12.4, 3.3]
            },
            {
                name:'竞价成功数',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
                name:'平均花费',
                type:'line',
                yAxisIndex: 1,
                data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2, 2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ],
        dataZoom: {
            orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                    // 'horizontal' ¦ 'vertical'
            // x: {number},            // 水平安放位置，默认为根据grid参数适配，可选为：
                                    // {number}（x坐标，单位px）
            // y: {number},            // 垂直安放位置，默认为根据grid参数适配，可选为：
                                    // {number}（y坐标，单位px）
            // width: {number},        // 指定宽度，横向布局时默认为根据grid参数适配
            // height: {number},       // 指定高度，纵向布局时默认为根据grid参数适配
            backgroundColor: 'rgba(0,0,0,0)',       // 背景颜色
            dataBackgroundColor: '#eee',            // 数据背景颜色
            fillerColor: 'rgba(144,197,237,0.2)',   // 填充颜色
            handleColor: 'rgba(70,130,180,0.8)'     // 手柄颜色
        }
    };
  }

  onChartClick(e){

  }

  onChartLegendselectchanged(e){

  }

  render() {
    let onChartEvents = {
        'click': this.onChartClick,
        'legendselectchanged': this.onChartLegendselectchanged
    }
    return (
      <Layout current='reportHour' open='reportManagement'>
        <h1 className='page-title'>小时报表（仅为示例）</h1>
        
        <ReactEcharts
            option={this.getOption()} 
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            style={{height: '450px', width: '100%'}} 
            onChartReady={this.onChartReadyCallback}
            onEvents={onChartEvents} />
        
      </Layout>
    );
  }
}

export default reportHourPage;