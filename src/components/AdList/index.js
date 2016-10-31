import React, {Component} from 'react';
import { Card } from 'antd';
import { Link } from 'react-router'; 
import classNames from 'classnames';
import style from './style.less';
import store from '../../js/store'


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
      let nodata = false;      
       
      if(data.length<1){
        nodata = true;
      }

      this.setState({
        adList: data,
        nodata: nodata
      })

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

  setAdvertiser(e){
    store.setAdvertiser(this.state);
  }

  render(){
    let nodataClass = classNames({
      'nodata' : true,
      'hidden' : !this.state.nodata
    })
    return(
        <div className={'adlist'+this.getVisible()}>
          {this.state.adList.map((ad, index) => {
            return (
              <Card className="adlist-item" 
                title={ad.name} key={index} 
                extra = {<Link to={`/${ad.id}/solutionlist/`} state={ad} onClick={this.setAdvertiser}>进入更多操作</Link>} 
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