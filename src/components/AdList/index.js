import React, {Component} from 'react';
import { Card } from 'antd';
import { Link } from 'react-router'; 
import classNames from 'classnames';
import style from './style.less';


class AdList extends Component{
  constructor(props){
    super(props);
    this.state = {
      adList: [],
      nodata: false
    }
  }

  componentWillReceiveProps(props){

    if(!props.uid){
      return;
    }

    const adlistUrl = `/api/v1/advertiser/user/${props.uid}`;

    fetch(adlistUrl).then(res =>
      res.json()
    ).then(data => {
      this.setState({
        adList: data
      })
      if(data.length<1){
        this.setState({
          nodata: true
        })
      }
    },function(err){
      console.log(err)
    })
  }

  getVisible(){
    return (this.props.hidden? ' hidden' : '')
  }

  goNew(){
    this.props.changeTab('new');
  }

  render(){
    let nodataClass = classNames({
      'nodata' : true,
      'hidden' : !this.state.nodata
    })
    return(
        <div className={'adlist'+this.getVisible()}>
          {this.state.adList.map(function(ad, index){
            return (
              <Card className="adlist-item" 
                title={ad.name} key={index} 
                extra = {<Link to='solutionlist/'>进入更多操作</Link>} 
                >
                <p>联系人：{ad.contacter?ad.contacter:'(未设置)'}</p>
              </Card>
            )
          })}
          <div className={nodataClass}>
            <h2>当前用户暂无广告主</h2>
            <h1>请先<a data-goto="new" onClick={this.goNew.bind(this)}>前往新增广告主</a></h1>
          </div>
        </div>
    ) 
  }
}

export default AdList;