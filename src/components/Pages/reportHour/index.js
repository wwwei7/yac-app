import React from 'react';
import Layout from '../../common/Layout';
import ReactEcharts from 'echarts-for-react';
import { DatePicker, message, Table } from 'antd';
import Moment from 'moment';
import map from 'echarts/map/js/china.js';
import './style.less';

const columns = [{
  title: '小时段',
  dataIndex: 'hour',
}, {
  title: '点击数',
  dataIndex: 'click',
}, {
  title: '展示数',
  dataIndex: 'show',
}, {
  title: '花费',
  dataIndex: 'money',
}];

class reportHourPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    // 初始化日期
    this.day = Moment().subtract(1, 'days');    

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
          data: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
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
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
          name:'点击数',
          type:'bar',
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
    this.renderChart()
  }

  setChartData(data){
    this.chartData = data;

    this.chartOption.series[0].data = data.showArr;
    this.chartOption.series[1].data = data.clickArr;

    this.chart.setOption(this.chartOption); 
  }
  
  setTableData(data){
    let tableArr = [];
    for(let i=0;i<24;i++){
      tableArr.push({
        hour: i,
        show: data.showArr[i],
        click: data.clickArr[i],
        money: data.moneyArr[i]
      })
    }
    this.setState({
      tableData: tableArr
    })
  }

  renderChart(){

    const reportUrl = `/api/v1/report/${this.props.params.aid}/hour/${this.day.format('YYYY-MM-DD')}`;

    this.chart.showLoading();

    fetch(reportUrl).then(res =>
      res.json()
    ).then(data => {
      this.setChartData(data);
      this.setTableData(data);
      this.chart.hideLoading();      
    },function(err){
      message.error('获取报表数据失败', 4);
      this.chart.hideLoading();      
    })
  }

  setDay(day){
    this.day = day;
  }

  dateChange(date){
    if(date.format('YYYY-MM-DD') == this.day.format('YYYY-MM-DD'))
      return;

    this.setDay(date);
    
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
      <Layout current='reportHour' open='reportManagement'>
        <h1 className='page-title'>小时报表</h1>
        
        <div className='query-container'>
            <label>请选择要查看的报表日期：</label>
            <DatePicker 
              showToday={false}
              defaultValue={this.day}
              disabledDate={this.disabledDate}
              onChange={this.dateChange.bind(this)} />
        </div>
        <ReactEcharts
          ref='chart'
          option={this.chartOption} 
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{height: '450px', width: '100%'}} 
          onChartReady={this.onChartReadyCallback}
          onEvents={onChartEvents} />

        <Table
            columns={columns} dataSource={this.state.tableData}/>
        
      </Layout>
    );
  }
}

export default reportHourPage;