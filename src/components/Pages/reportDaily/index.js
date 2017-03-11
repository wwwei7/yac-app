import React from 'react';
import Layout from '../../common/Layout';
import ReactEcharts from 'echarts-for-react';
import { DatePicker, message, Button, Table } from 'antd';
import Moment from 'moment';
import Store from '../../../js/store';
import SolutionSelect from '../../SolutionSelect'
import CsvData from '../../../service/reportCsvData'
import DownloadCsv from '../../../service/createCSV'
import './style.less';

const RangePicker = DatePicker.RangePicker;

let columns = [{
  title: '日期',
  dataIndex: 'day',
}, {
  title: '点击数',
  dataIndex: 'click',
}, {
  title: '展示数',
  dataIndex: 'show',
}, {
  title: '花费',
  dataIndex: 'money',
}, {
  title: '服务费',
  dataIndex: 'service'
}];

class reportDailyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvDisable: true
    };

    // chart
    this.chartOption = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        right: '10%'
      },
      toolbox: {
        right: 80,
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
        data:['展示数','点击数','花费','服务费']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {alignWithLabel: true},
          axisLabel: {interval: 'auto'},
          data: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '展示',          
          axisLine: {
            lineStyle: {
              color: '#5793f3'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '点击',          
          position: 'right',
          axisLine: {
            lineStyle: {
              color: '#009a61'
            }
          },
          axisLabel: {
              formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '费用',
          offset: 50,
          axisLine: {
            lineStyle: {
              color: '#d14a61'
            }
          },          
          axisLabel: {
              formatter: '{value}'
          }
        }
      ],
      color: ['#5793f3', '#009a61', '#d14a61','#f1c300'],
      series: [
        {
          name:'展示数',
          type:'bar',
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
          name:'点击数',
          type:'line',
          yAxisIndex: 1,
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
          name:'花费',
          type:'bar',
          yAxisIndex: 2,
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
          name:'服务费',
          type:'bar',
          yAxisIndex: 2,
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }
      ],
      dataZoom: {
          backgroundColor: 'rgba(0,0,0,0)',       // 背景颜色
          dataBackgroundColor: '#eee',            // 数据背景颜色
          fillerColor: 'rgba(144,197,237,0.2)',   // 填充颜色
          handleColor: 'rgba(70,130,180,0.8)'     // 手柄颜色
      }
    }

    this.roleSwitch();
  }

  componentDidMount(){
    // 初始化echart实例
    this.chart = this.refs.chart.getEchartsInstance();

    // 默认显示昨天报表数据
    const yesterday = Moment().subtract(1, 'days').format('YYYY-MM-DD');
    this.setDay([yesterday, yesterday])

    // 渲染报表
    this.renderChart()
  }

  roleSwitch(){
    const userRole = this.userRole = Store.getUser().role;
    // 广告主报表界面
    if(userRole == 'advertiser'){
      // 修改图例
      this.chartOption.legend.data.splice(-1,1);
      // 去掉服务费轴
      this.chartOption.series.splice(-1,1);
      // 表格去掉服务费
      columns.pop();
    }
  }

  computeMaxMark(max){
    let maxMark = 1;
    if(max>1){
        let fill = '';
        for(let i=0;i<String(max).split('.')[0].length-1;i++){
            fill += '0';
        }
        maxMark = parseInt(parseInt(String(max).substring(0,1))+1 + fill);
    }

    if(max<1){
        maxMark = parseFloat(String(max).match(/0\.?(0*)/g)[0] + '1')*10;
    }

    return maxMark;
  }

  setShowAxis(max){
    const maxMark = this.computeMaxMark(max);

    this.chartOption.yAxis[0].max = maxMark;
    this.chartOption.yAxis[0].interval = maxMark/5
  }

  setMoneyAxis(max){
    const maxMark = this.computeMaxMark(max);

    this.chartOption.yAxis[2].max = maxMark;
    this.chartOption.yAxis[2].interval = maxMark/5
  }

  setChartData(data){
    
    const days = Object.keys(data);
    let showArray = [];
    let clickArray = [];
    let moneyArray = [];
    let serviceArray = [];
    let maxShow = 0;
    let maxClick = 0;
    let maxMoney = 0;

    for (let day of days){
        let dayData = data[day];
        showArray.push(dayData.show);
        clickArray.push(dayData.click);
        moneyArray.push(dayData.money);
        serviceArray.push(dayData.service);

        maxShow = dayData.show > maxShow ? dayData.show : maxShow;
        maxClick = dayData.click > maxClick ? dayData.click : maxClick;        
        maxMoney = dayData.money > maxMoney ? dayData.money : maxMoney;                        
    }

    this.setShowAxis(maxShow);
    // this.setMoneyAxis(maxMoney);

    // 日期坐标轴（x)
    this.chartOption.xAxis[0].data = days;
    if(days.length>10){
        this.chartOption.xAxis[0].axisLabel.interval = parseInt(days.length/10);        
    }else{
        this.chartOption.xAxis[0].axisLabel.interval = 0
    }    
    
    // 数据
    this.chartOption.series[0].data = showArray,
    this.chartOption.series[1].data = clickArray;
    this.chartOption.series[2].data = moneyArray;
    if(this.userRole == 'agency')
      this.chartOption.series[3].data = serviceArray;
    
    this.chart.setOption(this.chartOption);
    this.setState({
      csvDisable: false
    })
  }

  setTableData(data){
    let tableArr = [];
    for(let day in data){
      let row = {
        key: day,
        day: day,
        show: data[day].show,
        click:  data[day].click,
        money:  data[day].money
      }
      if(this.userRole != 'advertiser'){
        row.service =  data[day].service;
      }
      tableArr.push(row);
    }
    this.setState({
      tableData: tableArr
    })
  }

  downloadCsvFile(){
    let head = ['日期', '展示数', '点击数', '花费'];
    let text = CsvData(this.userRole, head, this.chartOption.xAxis[0].data, this.chartOption);

    DownloadCsv(text, `${this.start}至${this.end}全天报表.csv`);    
  }

  renderChart(){
    const daysQuery = `${this.start}t${this.end}`;
    const solutionQeury = this.solution ? this.solution :'';
    const reportUrl = `/api/v1/report/${this.props.params.aid}/days/${daysQuery}/${solutionQeury}`;

    this.chart.showLoading();
    this.setState({
      csvDisable: true
    })

    fetch(reportUrl,{
      credentials: 'include'
    }).then(res =>
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

  solutionChange(sid){
    if(sid === this.solution)
      return;
    if(sid === "0")
      sid = undefined;
    this.solution = sid;

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
    const defaultRanges = {
        '本周': [Moment().startOf('week'), Moment().endOf('week')],
        '上周': [Moment().startOf('week').subtract(7, 'days'), Moment().endOf('week').subtract(7, 'days')],
        '本月': [Moment().startOf('month'), Moment().endOf('month')],
        '上月': [Moment().month(Moment().month()-1).startOf('month'),Moment().month(Moment().month()-1).endOf('month')]
    }
    return (
      <Layout current='reportDaily' open='reportManagement'>
        <h1 className='page-title'>全天报表</h1>
        
        <div className='query-container'>
          <div className='query-date'>
            <label>日期范围：</label>
            <RangePicker
                disabledDate={this.disabledDate}
                onChange={this.dateChange.bind(this)}
                ranges={defaultRanges}
                defaultValue={[Moment().subtract(1,'days'), Moment().subtract(1,'days')]}
            />
          </div>
          <div className='query-solution'>
            <label>推广计划：</label>
            <SolutionSelect 
              width='281px'
              aid={this.props.params.aid} 
              includeAll={true}
              onSelect={this.solutionChange.bind(this)}
            />
          </div>
          <Button type="primary" icon="download" className="btn-csv"
            onClick={this.downloadCsvFile.bind(this)} 
            disabled={this.state.csvDisable}>报表CSV下载</Button>
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

        <Table
          pagination={false}
          columns={columns}
          dataSource={this.state.tableData}/>
        
      </Layout>
    );
  }
}

export default reportDailyPage;