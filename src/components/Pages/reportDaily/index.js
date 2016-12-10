import React from 'react';
import Layout from '../../common/Layout';
import ReactEcharts from 'echarts-for-react';
import { DatePicker, message } from 'antd';
import Moment from 'moment';
import map from 'echarts/map/js/china.js';
import './style.less';

const RangePicker = DatePicker.RangePicker;

class reportDailyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    // chart
    this.chartOption = {
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
        // data:['展示数','点击数','花费']
        data:['展示数','点击数']        
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          nameLocation: 'start',
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
              formatter: '{value}'
          }
        },
        {
          type: 'value',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
              formatter: '{value}'
          }
        }
      ],
      color: ['#bfe3f5', '#009a61', '#a94442'],
      series: [
        {
          name:'展示数',
          type:'bar',
          data: []
        },
        {
          name:'点击数',
          type:'bar',
          data: []
        },
        // {
        //   name:'花费',
        //   type:'line',
        //   yAxisIndex: 1,
        //   data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        // }
      ],
      dataZoom: {
          backgroundColor: 'rgba(0,0,0,0)',       // 背景颜色
          dataBackgroundColor: '#eee',            // 数据背景颜色
          fillerColor: 'rgba(144,197,237,0.2)',   // 填充颜色
          handleColor: 'rgba(70,130,180,0.8)'     // 手柄颜色
      }
    }
  }

  componentDidMount(){
    // 初始化echart实例
    this.chart = this.refs.chart.getEchartsInstance();

    // 渲染报表
    // this.renderChart()
  }

  setChartData(data){
    
    const days = Object.keys(data);
    let showArray = [];
    let clickArray = [];
    let moneyArray = [];

    for (let day of days){
        showArray.push(data[day].show);
        clickArray.push(data[day].click);
        moneyArray.push(data[day].money);        
    }

    // 日期坐标轴（x)
    this.chartOption.xAxis[0].data = days;    
    
    // 数据
    this.chartOption.series[0].data = showArray,
    this.chartOption.series[1].data = clickArray;
    
    this.chart.setOption(this.chartOption)
    
  }

  renderChart(){

    const reportUrl = `/api/v1/report/${this.props.params.aid}/days/${this.start}t${this.end}`;

    this.chart.showLoading();

    fetch(reportUrl).then(res =>
      res.json()
    ).then(data => {
      this.setChartData(data);
      this.chart.hideLoading();      
    },function(err){
      message.error('获取报表数据失败', 4);
      this.chart.hideLoading();      
    })
  }

  setDay(days){
    this.start = days[0];
    this.end = days[1];
  }

  dateChange(moments, days){
    if(this.start == days[0] && this.end == days[1])
      return;

    this.setDay(days);
    
    this.renderChart()
  }

  disabledDate(current) {
    return current && current.valueOf() > Date.now();
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
        <h1 className='page-title'>全天报表</h1>
        
        <div className='query-container'>
            <label>请选择日期范围：</label>
            <RangePicker 
                disabledDate={this.disabledDate}
                onChange={this.dateChange.bind(this)}
            />
        </div>
        <ReactEcharts
          ref='chart'
          option={this.chartOption} 
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{height: '450px', width: '100%', marginTop: '20px'}} 
          onChartReady={this.onChartReadyCallback}
          onEvents={onChartEvents} />
        
      </Layout>
    );
  }
}

export default reportDailyPage;