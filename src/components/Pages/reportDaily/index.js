import React from 'react';
import {render} from 'react-dom';
import Layout from '../../common/Layout';
import ReactEcharts from 'echarts-for-react';
import Echart from 'echarts';
import map from 'echarts/map/js/china.js';
import style from './style.less';
import 'antd/dist/antd.css';



class reportDailyPage extends React.Component {
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
                feature: {
                    dataView: {show: false, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:['竞价次数','竞价成功数','花费']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} 千次'
                    }
                },
                {
                    type: 'value',
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
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name:'竞价成功数',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name:'花费',
                    type:'line',
                    yAxisIndex: 1,
                    data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
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
      <Layout current='reportDaily' open='reportManagement'>
        <h1 className='page-title'>全天报表（仅为示例）</h1>
        
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

export default reportDailyPage;