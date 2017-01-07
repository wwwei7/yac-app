import React from 'react';
import { Button, Form, Input, Select, InputNumber, Cascader, message } from 'antd';
import Layout from '../../common/Layout';

const createForm = Form.create;
const FormItem = Form.Item;

const cascaderOptions = [{"value":51,"label":"安全安保","children":[{"value":5101,"label":"安保服务"},{"value":5102,"label":"安保器材"},{"value":5103,"label":"安全防伪"},{"value":5104,"label":"防盗报警"},{"value":5105,"label":"交通消防"},{"value":5106,"label":"智能楼宇"}]},{"value":52,"label":"办公文教","children":[{"value":5201,"label":"办公设备"},{"value":5202,"label":"教具"},{"value":5203,"label":"文具"}]},{"value":53,"label":"彩票","children":[{"value":5301,"label":"彩票"}]},{"value":54,"label":"车辆物流","children":[{"value":5401,"label":"物流"},{"value":5402,"label":"车辆"},{"value":5403,"label":"火车"},{"value":5404,"label":"船舶"},{"value":5405,"label":"飞机"}]},{"value":55,"label":"成人用品","children":[{"value":5501,"label":"成人用品"}]},{"value":56,"label":"出版传媒","children":[{"value":5601,"label":"出版印刷"},{"value":5602,"label":"影视传媒"},{"value":5603,"label":"广播有线电视"}]},{"value":57,"label":"电脑硬件","children":[{"value":5701,"label":"电脑整机"},{"value":5702,"label":"电脑配件"},{"value":5703,"label":"网络设备"},{"value":5704,"label":"电脑服务"}]},{"value":58,"label":"电子电工","children":[{"value":5801,"label":"电子元器件"},{"value":5802,"label":"电机设备"},{"value":5803,"label":"电线电缆"},{"value":5804,"label":"供电设备"},{"value":5805,"label":"照明设备"},{"value":5806,"label":"仪器仪表"}]},{"value":59,"label":"房地产建筑装修","children":[{"value":5901,"label":"建筑工程"},{"value":5902,"label":"房屋租售"},{"value":5903,"label":"物业管理"},{"value":5904,"label":"装修服务"},{"value":5905,"label":"建筑装修材料"}]},{"value":60,"label":"分类平台","children":[{"value":6001,"label":"网上商城"},{"value":6002,"label":"导购网站"},{"value":6003,"label":"团购网站"},{"value":6004,"label":"社交平台"},{"value":6005,"label":"分类服务平台"},{"value":6006,"label":"生活服务网站"},{"value":6007,"label":"休闲娱乐网站"}]},{"value":61,"label":"服装鞋帽","children":[{"value":6101,"label":"服装"},{"value":6102,"label":"鞋帽"},{"value":6103,"label":"纺织原料"}]},{"value":62,"label":"箱包饰品","children":[{"value":6201,"label":"箱包"},{"value":6202,"label":"饰品"}]},{"value":63,"label":"化工原料制品","children":[{"value":6301,"label":"涂料"},{"value":6302,"label":"化工原料"},{"value":6303,"label":"橡胶"},{"value":6304,"label":"塑料"},{"value":6305,"label":"能源"},{"value":6306,"label":"冶金"},{"value":6307,"label":"包装材料"}]},{"value":64,"label":"机械设备","children":[{"value":6401,"label":"通用机械设备"},{"value":6402,"label":"通用零配件"},{"value":6403,"label":"建筑工程机械"},{"value":6404,"label":"勘探机械"},{"value":6405,"label":"化工机械"},{"value":6406,"label":"木材石材加工机械"},{"value":6407,"label":"印刷机械"},{"value":6408,"label":"模具"},{"value":6409,"label":"食品机械"},{"value":6410,"label":"农林机械"},{"value":6411,"label":"纸制造加工设备"},{"value":6412,"label":"制鞋纺织机械"},{"value":6413,"label":"商业设备"},{"value":6414,"label":"包装机械"},{"value":6415,"label":"制药设备"},{"value":6416,"label":"冶炼铸造设备"},{"value":6417,"label":"机床机械"},{"value":6418,"label":"五金工具"},{"value":6419,"label":"物流设备"},{"value":6420,"label":"清洁通风设备"},{"value":6421,"label":"焊接材料设备"},{"value":6422,"label":"玻璃橡塑设备"},{"value":6423,"label":"金属材料"},{"value":6424,"label":"电子产品制造设备"}]},{"value":65,"label":"家庭日用品","children":[{"value":6501,"label":"家具"},{"value":6502,"label":"家纺家饰"},{"value":6503,"label":"厨具餐具"},{"value":6504,"label":"日化用品"}]},{"value":66,"label":"家用电器","children":[{"value":6601,"label":"大型家电"},{"value":6602,"label":"厨用电器"},{"value":6603,"label":"卫浴家电"},{"value":6604,"label":"健康电器"},{"value":6605,"label":"生活小家电"}]},{"value":67,"label":"教育培训","children":[{"value":6701,"label":"学前教育"},{"value":6702,"label":"小初高教育"},{"value":6703,"label":"高教自考"},{"value":6704,"label":"留学"},{"value":6705,"label":"IT培训"},{"value":6706,"label":"语言培训"},{"value":6707,"label":"职业培训"},{"value":6708,"label":"文体培训"},{"value":6709,"label":"企业培训拓展"},{"value":6710,"label":"特殊人群教育"}]},{"value":68,"label":"节能环保","children":[{"value":6801,"label":"污染处理"},{"value":6802,"label":"废旧回收"},{"value":6803,"label":"节能"}]},{"value":69,"label":"金融服务","children":[{"value":6901,"label":"理财"},{"value":6902,"label":"银行"},{"value":6903,"label":"保险"},{"value":6904,"label":"投资担保"},{"value":6905,"label":"典当"}]},{"value":70,"label":"礼品","children":[{"value":7001,"label":"礼品"}]},{"value":71,"label":"旅游住宿","children":[{"value":7101,"label":"旅游"},{"value":7102,"label":"宾馆酒店"},{"value":7103,"label":"交通票务"},{"value":7104,"label":"文体票务"}]},{"value":72,"label":"美容化妆","children":[{"value":7201,"label":"化妆品"},{"value":7202,"label":"美容"}]},{"value":73,"label":"母婴护理","children":[{"value":7301,"label":"母婴护理"}]},{"value":74,"label":"农林牧渔","children":[{"value":7401,"label":"兽医兽药"},{"value":7402,"label":"农药"},{"value":7403,"label":"化肥"},{"value":7404,"label":"养殖"},{"value":7405,"label":"种植"},{"value":7406,"label":"园林景观"}]},{"value":75,"label":"软件","children":[{"value":7501,"label":"操作系统"},{"value":7502,"label":"中间件软件"},{"value":7503,"label":"应用软件"},{"value":7504,"label":"杀毒软件"},{"value":7505,"label":"监控安全软件"},{"value":7506,"label":"数据库软件"},{"value":7507,"label":"企业软件"},{"value":7508,"label":"行业专用软件"},{"value":7509,"label":"支付结算软件"},{"value":7510,"label":"教学软件"}]},{"value":76,"label":"商务服务","children":[{"value":7601,"label":"出国"},{"value":7602,"label":"招聘"},{"value":7603,"label":"翻译"},{"value":7604,"label":"设计"},{"value":7605,"label":"广告"},{"value":7606,"label":"公关策划"},{"value":7607,"label":"咨询"},{"value":7608,"label":"拍卖"},{"value":7609,"label":"代理"},{"value":7610,"label":"调查"},{"value":7611,"label":"法律服务"},{"value":7612,"label":"会计审计"},{"value":7613,"label":"铃声短信"}]},{"value":77,"label":"生活服务","children":[{"value":7701,"label":"搬家"},{"value":7702,"label":"家政"},{"value":7703,"label":"征婚交友"},{"value":7704,"label":"仪式典礼"},{"value":7705,"label":"摄影"},{"value":7706,"label":"汽车租赁"},{"value":7707,"label":"家电维修"},{"value":7708,"label":"居民服务"}]},{"value":78,"label":"食品保健品","children":[{"value":7801,"label":"生活食材"},{"value":7802,"label":"休闲零食"},{"value":7803,"label":"饮料"},{"value":7804,"label":"保健食品"},{"value":7805,"label":"烟酒"},{"value":7806,"label":"餐馆"}]},{"value":79,"label":"手机数码","children":[{"value":7901,"label":"手机"},{"value":7902,"label":"数码产品"}]},{"value":80,"label":"通讯服务设备","children":[{"value":8001,"label":"通讯服务"},{"value":8002,"label":"通讯设备"}]},{"value":81,"label":"网络服务","children":[{"value":8101,"label":"网站建设"},{"value":8102,"label":"域名空间"}]},{"value":82,"label":"医疗服务","children":[{"value":8201,"label":"男科"},{"value":8202,"label":"妇科"},{"value":8203,"label":"美容整形"},{"value":8204,"label":"专科医院"},{"value":8205,"label":"中医"},{"value":8206,"label":"体检机构"},{"value":8207,"label":"综合医院"},{"value":8208,"label":"药品"},{"value":8209,"label":"医疗器械"}]},{"value":83,"label":"游戏","children":[{"value":8301,"label":"游戏开发"},{"value":8302,"label":"游戏运营"},{"value":8303,"label":"游戏周边"}]},{"value":84,"label":"运动休闲娱乐","children":[{"value":8401,"label":"体育器械"},{"value":8402,"label":"休闲活动"},{"value":8403,"label":"运势测算"},{"value":8404,"label":"宠物服务"},{"value":8405,"label":"玩具模型"},{"value":8406,"label":"乐器"}]},{"value":85,"label":"招商加盟","children":[{"value":8501,"label":"服装饰品加盟"},{"value":8502,"label":"美容化妆加盟"},{"value":8503,"label":"礼品加盟"},{"value":8504,"label":"食品保健品加盟"},{"value":8505,"label":"生活服务加盟"},{"value":8506,"label":"教育培训加盟"},{"value":8507,"label":"机械电子建材加盟"},{"value":8508,"label":"汽车加盟"},{"value":8509,"label":"旅游住宿加盟"},{"value":8510,"label":"干洗加盟"},{"value":8511,"label":"综合招商"},{"value":8514,"label":"养殖加盟"}]},{"value":86,"label":"学术公管社会组织","children":[{"value":8601,"label":"学术公管社会组织"}]},{"value":87,"label":"国际组织","children":[{"value":8701,"label":"国际组织"}]},{"value":99,"label":"其他","children":[{"value":9901,"label":"其他"}]}];


class AdInfoForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    const postUrl = `/api/v1/advertiser/${this.props.params.aid}`;

    fetch(postUrl).then(res =>
      res.json()
    ).then(data => {
      let nodata = false;      
       
      if(data.length<1){
        nodata = true;
      }

      const formData = this.presetForm(data);

      this.props.form.setFieldsValue(formData);

    },function(err){
      console.log(err)
    })
  }

  presetForm(data){
    if(data.industry){
      let industry_s = String(data.industry);
      data.industry = [parseInt(industry_s.slice(0,2)), parseInt(industry_s)];
    }
    data.contactNum = data.contact_number;
    return data;
  }

  presetPost(data){
    if(data.industry){
      data.industry = data.industry[1];
    }
    data.contact_number = data.contactNum;

    return {
      ...data,
      industry:  data.industry? data.industry[1]: null,
      contactNum: data.contact_number
    }
  }

  handleSubmit(){
    this.props.form.validateFields((errors, fieldsValue) => {
      if (!!errors) {
        return;
      }
      // this.postForm(fieldsValue);
    });
  }

  postForm(data){
    
    const updateUrl = `/api/v1/advertiser/${this.props.params.aid}`;

    fetch(updateUrl, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      if(res.ok){
        message.success('更改成功')
      }
    }, err => {

    })
  }


  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
    };
    const protocol = (
      <Select defaultValue="http://" style={{ width: 70 }}>
        <Option value="http">http://</Option>
        <Option value="https">https://</Option>
      </Select>
    )
    return (
      <Layout current="adInfoManagement">
        <h1 className="page-title">广告主信息管理</h1>
        <Form horizontal className={this.props.hidden?'adnew-form hidden':'adnew-form'}>
          <FormItem
            {...formItemLayout}
            label="广告主名称"
            hasFeedback
            help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
            >
            {getFieldDecorator('name', {
            })(
              <Input />
            )}            
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="公司全称"
          >
            {getFieldDecorator('company', {
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="行业类型"
          >
            {getFieldDecorator('industry', {
            })(
              <Cascader options={cascaderOptions} placeholder="" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="联系人"
            name="contacter"
          >
            {getFieldDecorator('contacter', {
              rules: [
                {required: false, max: 10, message: '请勿超过10个字符'}
              ]
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="联系电话"
          >
            {getFieldDecorator('contactNum', {
              rules: [
                { max: 12, message: '请勿超过12个字符'}
              ]
            })(
              <Input type="number"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}        
            label="网址"
          >
            {getFieldDecorator('website')(
              <Input type="url" addonBefore={protocol} placeholder="mysite.com" id="site" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="广告落地页白名单"
          >
            {getFieldDecorator('whiteList')(
              <Input type="textarea" placeholder="请使用分号（；）分隔" id="textarea" name="textarea" />
            )}
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>更新</Button>
            &nbsp;&nbsp;&nbsp;
          </FormItem>
        </Form>
      </Layout>
    );
  }
}


AdInfoForm = createForm()(AdInfoForm);

export default AdInfoForm;