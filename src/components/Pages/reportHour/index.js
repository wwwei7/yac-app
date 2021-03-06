import React from 'react';
import Layout from '../../common/Layout';
import ReactEcharts from 'echarts-for-react';
import { DatePicker, message, Table, Button } from 'antd';
import Moment from 'moment';
import Store from '../../../js/store';
import SolutionSelect from '../../SolutionSelect'
import CsvData from '../../../service/reportCsvData'
import DownloadCsv from '../../../service/createCSV'
import './style.less';

let columns = [{
  title: '日期',
  dataIndex: 'hour',
  sorter: (a, b) => a.hour - b.hour
}, {
  title: '点击数',
  dataIndex: 'click',
  sorter: (a, b) => a.click - b.click
}, {
  title: '展示数',
  dataIndex: 'show',
  sorter: (a, b) => a.show - b.show
}, {
  title: '花费',
  dataIndex: 'money',
  sorter: (a, b) => a.money - b.money
}, {
  title: '服务费',
  dataIndex: 'service',
  sorter: (a, b) => a.service - b.service
}];

class reportHourPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvDisable: true
    };

    // 默认显示当天数据
    // this.day = Moment().subtract(1, 'days');
    this.day = Moment();    

    // chart
    this.chartOption = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        right: '10%'
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
        data:['展示数','点击数','花费','服务费']    
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {alignWithLabel: true},
          data: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
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
      color: ['#5793f3', '#009a61', '#d14a61', '#f1c300'],
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
    
    // 默认显示所有推广计划
    this.solution = {id: '0', name: '* 所有推广计划 *'}

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
    this.chartOption.yAxis[2].interval = maxMark/5;
  }

  setChartData(data){
    this.chartData = data;

    this.chartOption.series[0].data = data.showArr;
    this.chartOption.series[1].data = data.clickArr;
    this.chartOption.series[2].data = data.moneyArr;
    if(this.userRole == 'agency')
      this.chartOption.series[3].data = data.serviceArr;    

    this.chart.setOption(this.chartOption); 
    this.setState({
      csvDisable: false
    })
  }
  
  setTableData(data){
    let tableArr = [];
    for(let i=0;i<24;i++){
      let row = {
        key: 'hour'+i,
        hour: i,
        show: data.showArr[i],
        click: data.clickArr[i],
        money: data.moneyArr[i]
      }
      if(this.userRole != 'advertiser'){
        row.service = data.serviceArr[i];
      }
      tableArr.push(row);
    }
    this.setState({
      tableData: tableArr
    })
  }

  renderChart(){
    const solutionQeury = this.solution.id != '0' ? this.solution.id :'';
    const reportUrl = `/api/v1/report/${this.props.params.aid}/hour/${this.day.format('YYYY-MM-DD')}/${solutionQeury}`;

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

  solutionChange(value, option){
    if(value === this.solution.id)
      return;
    this.solution = {
      id: value,
      name: option.props.name
    };

    this.renderChart()
  }

  onChartClick(e){

  }

  onChartLegendselectchanged(e){

  }

  downloadCsvFile(){
    let head = ['小时段', '推广计划名称', '展示数', '点击数', '花费'];
    let text = CsvData(this.userRole, head, this.solution.name, this.chartOption.xAxis[0].data, this.chartOption);

    DownloadCsv(text, `${this.day.format('YYYY-MM-DD')}小时报表.csv`);    
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
          <div className='query-date'>
            <label>选择日期：</label>
            <DatePicker 
              showToday={false}
              defaultValue={this.day}
              disabledDate={this.disabledDate}
              onChange={this.dateChange.bind(this)} />
          </div>
          <div className='query-solution'>
            <label>推广计划：</label>
            <SolutionSelect 
              width='200px'
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

export default reportHourPage;