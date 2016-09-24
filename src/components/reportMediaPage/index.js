import React from 'react';
import {render} from 'react-dom';
import {Chart} from 'react-google-charts';
import Layout from '../common/Layout';
import style from './style.less';
import 'antd/dist/antd.css';

const chartData = [['Month','Bolivia','Ecuador','Madagascar','Papua New Guinea','Rwanda','Average'],['2004/05',165,938,522,998,450,614.6],['2005/06',135,1120,599,1268,288,682],['2006/07',157,1167,587,807,397,623],['2007/08',139,1110,615,968,215,609.4],['2008/09',136,691,629,1026,366,569.6]]



class reportMediaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Layout current='reportMedia' open='reportManagement'>
        <h1 className='page-title'>媒体报表（举个栗子）</h1>
        <Chart chartType = 'ComboChart' data = {chartData} 
            options = {{
                // 'title':'这是一个简单的例子',
                'vAxis':{'title':'Cups'},'hAxis':{'title':'Month'},'seriesType':'bars',
                'series':{'5':{'type':'line'}}
            }} 
            graph_id = 'ComboChart'  
            width={'80%'} 
            height={'400px'}  
            legend_toggle={true} />
      </Layout>
    );
  }
}

export default reportMediaPage;