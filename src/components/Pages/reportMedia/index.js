import React from 'react';
import { DatePicker, Alert } from 'antd';
import Layout from '../../common/Layout';
import ReactEcharts from 'echarts-for-react';
import Echart from 'echarts';
import Moment from 'moment';
import './style.less';

const RangePicker = DatePicker.RangePicker;

class reportMediaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

		this.chartOption = {
				tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
				},
				grid: {
						left: '3%',
						right: '50px',
						bottom: '5%',
						containLabel: true
				},
				legend: {
						data: ['展示', '点击', '花费']
				},
				color: [new Echart.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color: 'lightBlue' // 0% 处的颜色
							}, {
									offset: 1,
									color: '#3398DB' // 100% 处的颜色
							}], false),
							new Echart.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color: 'lightGreen' // 0% 处的颜色
							}, {
									offset: 1,
									color: '#009a61' // 100% 处的颜色
							}], false), 
							new Echart.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color: '#ea96a4' // 0% 处的颜色
							}, {
									offset: 1,
									color: '#d14a61' // 100% 处的颜色
							}], false)],

				yAxis: [{
						type: 'category',
						data: [],
						axisTick: {
							show: false,
								alignWithLabel: true
						}
				}],
				xAxis: [{
					type: 'value',
					name: '展示',	
					axisLine: {
							lineStyle: {color: '#5793f3'}
					}       
				},{
					type: 'value',
					name: '点击',			
					position: 'bottom',			
					offset: 30,
					axisLine: {
						lineStyle: { color: '#009a61'}
					}
				},{
					type: 'value',
					name: '花费',			
					offset: 10,
					axisLine: {
						lineStyle: { color: '#d14a61'}
					}
				}],
				backgroundColor: '#ffffff',
				series: [{
						name: '展示',
						type: 'bar',
						data: [],
						label: {
								normal: {
										show: true,
										position: 'insideRight',
										textStyle: {color: 'white'}
								}
						}
					},{
						name: '点击',
						type: 'bar',
						data: [],
						xAxisIndex: 1,
						label: {
								normal: {
										show: true,
										position: 'insideRight',
										textStyle: {color: 'white'}
								}
						}
					},{
						name: '花费',
						type: 'bar',
						data: [],
						xAxisIndex: 2,
						label: {
								normal: {
										show: true,
										position: 'insideRight',
										textStyle: {color: 'white'}
								}
						}
					}]
			};
  }

  componentDidMount(){
    // 初始化echart实例
    this.chart = this.refs.chart.getEchartsInstance();
  }

  renderChart(){

    const reportUrl = `/api/v1/report/${this.props.params.aid}/media/${this.start}t${this.end}`;

    this.chart.showLoading('default',{text:'加载中...'});

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

	setChartData(data){

		this.chartOption.yAxis[0].data = data.media.reverse();
		this.chartOption.series[0].data = data.show.reverse();
    this.chartOption.series[1].data = data.click.reverse();
    this.chartOption.series[2].data = data.money.reverse();

		this.chart.setOption(this.chartOption)
	}

  disabledDate(current) {
    return current && current.valueOf() > Date.now();
  }

	setDay(days){
    this.start = days[0];
    this.end = days[1];
  }

  dateChange(moments, days){
    if(this.start == days[0] && this.end == days[1])
      return;
    
		this.setDay(days)
    this.renderChart()
  }

  render() {
		const defaultRanges = {
				'昨天': [Moment().subtract(1,'day'), Moment().subtract(1,'day')],
        '本周': [Moment().startOf('week'), Moment().endOf('week')],
        '上周': [Moment().startOf('week').subtract(7, 'days'), Moment().endOf('week').subtract(7, 'days')],
        '本月': [Moment().startOf('month'), Moment().endOf('month')],
        '上月': [Moment().month(Moment().month()-1).startOf('month'),Moment().month(Moment().month()-1).endOf('month')]
    }
    return (
      <Layout current='reportMedia' open='reportManagement'>
        <h1 className='page-title'>媒体报表</h1>

        <div className='query-container'>
            <label>请选择日期范围：</label>
            <RangePicker 
                disabledDate={this.disabledDate}
                onChange={this.dateChange.bind(this)}
                ranges={defaultRanges}
            />
        </div>

        <ReactEcharts
					ref='chart'
          option={this.chartOption} 
          notMerge={true}
          lazyUpdate={true}
          style={{height: '600px', width: '100%', marginTop: '20px'}}  
          theme={"macarons"} />

				<Alert type="info" showIcon
					style={{marginLeft:'88px',width: '500px'}}
					message="当前媒体报表暂时只显示花费TOP10媒体，如需更细媒体数据，请咨询客服" />
      </Layout>
    );
  }
}

export default reportMediaPage;