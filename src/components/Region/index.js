import React from 'react';
import { Radio, Input, Cascader, Form, TreeSelect } from 'antd';
import style from './style.less';
const RadioGroup = Radio.Group;
const FromItem = Form.FormItem;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const treeData = [{"label":"重庆","value":"21","oid":21,"key":"21","children":[]},{"label":"北京","value":"20","oid":20,"key":"20","children":[]},{"label":"天津","value":"293","oid":293,"key":"293","children":[]},{"label":"上海","value":"281","oid":281,"key":"281","children":[]},{"label":"安徽","value":"2","oid":2,"key":"2","children":[{"label":"铜陵","value":"17","key":"17"},{"label":"宿州","value":"16","key":"16"},{"label":"淮北","value":"9","key":"9"},{"label":"宣城","value":"19","key":"19"},{"label":"阜阳","value":"8","key":"8"},{"label":"合肥","value":"10","key":"10"},{"label":"六安","value":"14","key":"14"},{"label":"池州","value":"6","key":"6"},{"label":"滁州","value":"7","key":"7"},{"label":"蚌埠","value":"4","key":"4"},{"label":"马鞍山","value":"15","key":"15"},{"label":"黄山","value":"12","key":"12"},{"label":"芜湖","value":"18","key":"18"},{"label":"淮南","value":"11","key":"11"},{"label":"安庆","value":"3","key":"3"},{"label":"亳州","value":"13","key":"13"}]},{"label":"福建","value":"22","oid":22,"key":"22","children":[{"label":"南平","value":"26","key":"26"},{"label":"莆田","value":"27","key":"27"},{"label":"泉州","value":"28","key":"28"},{"label":"厦门","value":"30","key":"30"},{"label":"福州","value":"23","key":"23"},{"label":"龙岩","value":"24","key":"24"},{"label":"漳州","value":"31","key":"31"},{"label":"宁德","value":"25","key":"25"},{"label":"三明","value":"29","key":"29"}]},{"label":"广东","value":"32","oid":32,"key":"32","children":[{"label":"茂名","value":"41","key":"41"},{"label":"湛江","value":"51","key":"51"},{"label":"潮州","value":"33","key":"33"},{"label":"阳江","value":"49","key":"49"},{"label":"肇庆","value":"52","key":"52"},{"label":"江门","value":"39","key":"39"},{"label":"河源","value":"37","key":"37"},{"label":"云浮","value":"48","key":"48"},{"label":"清远","value":"43","key":"43"},{"label":"中山","value":"53","key":"53"},{"label":"汕头","value":"45","key":"45"},{"label":"揭阳","value":"40","key":"40"},{"label":"广州","value":"36","key":"36"},{"label":"佛山","value":"35","key":"35"},{"label":"惠州","value":"38","key":"38"},{"label":"梅州","value":"42","key":"42"},{"label":"珠海","value":"50","key":"50"},{"label":"深圳","value":"47","key":"47"},{"label":"东莞","value":"34","key":"34"},{"label":"汕尾","value":"46","key":"46"},{"label":"韶关","value":"44","key":"44"}]},{"label":"甘肃","value":"54","oid":54,"key":"54","children":[{"label":"武威地区","value":"67","key":"67"},{"label":"临夏州","value":"62","key":"62"},{"label":"甘南州","value":"57","key":"57"},{"label":"陇南地区","value":"61","key":"61"},{"label":"张掖地区","value":"68","key":"68"},{"label":"白银市","value":"55","key":"55"},{"label":"庆阳地区","value":"65","key":"65"},{"label":"嘉峪关","value":"60","key":"60"},{"label":"天水","value":"66","key":"66"},{"label":"酒泉","value":"59","key":"59"},{"label":"平凉地区","value":"64","key":"64"},{"label":"金昌市","value":"58","key":"58"},{"label":"定西地区","value":"56","key":"56"},{"label":"兰州","value":"63","key":"63"}]},{"label":"贵州","value":"81","oid":81,"key":"81","children":[{"label":"黔南州","value":"84","key":"84"},{"label":"黔东南州","value":"86","key":"86"},{"label":"安顺","value":"82","key":"82"},{"label":"黔西南州","value":"367","key":"367"},{"label":"遵义","value":"89","key":"89"},{"label":"六盘水","value":"87","key":"87"},{"label":"贵阳","value":"85","key":"85"},{"label":"毕节","value":"83","key":"83"},{"label":"铜仁","value":"88","key":"88"}]},{"label":"河南","value":"90","oid":90,"key":"90","children":[{"label":"新乡","value":"104","key":"104"},{"label":"信阳","value":"105","key":"105"},{"label":"商丘","value":"102","key":"102"},{"label":"焦作","value":"94","key":"94"},{"label":"三门峡","value":"101","key":"101"},{"label":"开封","value":"95","key":"95"},{"label":"郑州","value":"108","key":"108"},{"label":"漯河","value":"96","key":"96"},{"label":"许昌","value":"103","key":"103"},{"label":"驻马店","value":"107","key":"107"},{"label":"安阳","value":"91","key":"91"},{"label":"濮阳","value":"100","key":"100"},{"label":"平顶山","value":"99","key":"99"},{"label":"周口","value":"106","key":"106"},{"label":"鹤壁","value":"92","key":"92"},{"label":"南阳","value":"98","key":"98"},{"label":"洛阳","value":"97","key":"97"}]},{"label":"湖北","value":"109","oid":109,"key":"109","children":[{"label":"荆州","value":"115","key":"115"},{"label":"鄂州","value":"111","key":"111"},{"label":"武汉","value":"120","key":"120"},{"label":"十堰","value":"117","key":"117"},{"label":"黄冈","value":"112","key":"112"},{"label":"荆门","value":"114","key":"114"},{"label":"恩施","value":"110","key":"110"},{"label":"咸宁","value":"123","key":"123"},{"label":"黄石","value":"113","key":"113"},{"label":"孝感","value":"122","key":"122"},{"label":"宜昌","value":"125","key":"125"},{"label":"随州","value":"118","key":"118"}]},{"label":"河北","value":"126","oid":126,"key":"126","children":[{"label":"张家口","value":"137","key":"137"},{"label":"邢台","value":"136","key":"136"},{"label":"沧州","value":"129","key":"129"},{"label":"石家庄","value":"134","key":"134"},{"label":"秦皇岛","value":"133","key":"133"},{"label":"廊坊","value":"132","key":"132"},{"label":"邯郸","value":"130","key":"130"},{"label":"保定","value":"127","key":"127"},{"label":"承德","value":"128","key":"128"},{"label":"唐山","value":"135","key":"135"},{"label":"衡水","value":"131","key":"131"}]},{"label":"海南","value":"138","oid":138,"key":"138","children":[{"label":"海口","value":"140","key":"140"},{"label":"三亚","value":"141","key":"141"}]},{"label":"黑龙江","value":"143","oid":143,"key":"143","children":[{"label":"哈尔滨","value":"146","key":"146"},{"label":"鸡西","value":"149","key":"149"},{"label":"双鸭山市","value":"392","key":"392"},{"label":"大兴安岭","value":"145","key":"145"},{"label":"齐齐哈尔","value":"152","key":"152"},{"label":"伊春","value":"156","key":"156"},{"label":"绥化","value":"154","key":"154"},{"label":"七台河","value":"153","key":"153"},{"label":"牡丹江","value":"151","key":"151"},{"label":"黑河","value":"148","key":"148"},{"label":"鹤岗","value":"147","key":"147"},{"label":"佳木斯","value":"150","key":"150"},{"label":"大庆","value":"144","key":"144"}]},{"label":"湖南","value":"157","oid":157,"key":"157","children":[{"label":"株洲","value":"171","key":"171"},{"label":"邵阳","value":"166","key":"166"},{"label":"郴州","value":"160","key":"160"},{"label":"娄底","value":"165","key":"165"},{"label":"湘西州","value":"164","key":"164"},{"label":"长沙","value":"159","key":"159"},{"label":"怀化","value":"161","key":"161"},{"label":"益阳","value":"163","key":"163"},{"label":"永州","value":"169","key":"169"},{"label":"常德","value":"158","key":"158"},{"label":"张家界","value":"170","key":"170"},{"label":"湘潭","value":"167","key":"167"},{"label":"衡阳","value":"162","key":"162"},{"label":"岳阳","value":"168","key":"168"}]},{"label":"吉林","value":"172","oid":172,"key":"172","children":[{"label":"四平","value":"178","key":"178"},{"label":"延边","value":"181","key":"181"},{"label":"吉林市","value":"176","key":"176"},{"label":"通化","value":"180","key":"180"},{"label":"长春","value":"175","key":"175"},{"label":"白山","value":"174","key":"174"},{"label":"松原","value":"179","key":"179"},{"label":"辽源","value":"177","key":"177"},{"label":"白城","value":"173","key":"173"}]},{"label":"江苏","value":"182","oid":182,"key":"182","children":[{"label":"盐城","value":"193","key":"193"},{"label":"徐州","value":"192","key":"192"},{"label":"南通","value":"187","key":"187"},{"label":"苏州","value":"189","key":"189"},{"label":"宿迁","value":"188","key":"188"},{"label":"连云港","value":"185","key":"185"},{"label":"淮安","value":"184","key":"184"},{"label":"常州","value":"183","key":"183"},{"label":"泰州","value":"190","key":"190"},{"label":"南京","value":"186","key":"186"},{"label":"无锡","value":"191","key":"191"},{"label":"扬州","value":"194","key":"194"},{"label":"镇江","value":"195","key":"195"}]},{"label":"江西","value":"196","oid":196,"key":"196","children":[{"label":"萍乡","value":"203","key":"203"},{"label":"抚州","value":"197","key":"197"},{"label":"新余","value":"205","key":"205"},{"label":"南昌","value":"202","key":"202"},{"label":"九江","value":"201","key":"201"},{"label":"吉安","value":"199","key":"199"},{"label":"景德镇","value":"200","key":"200"},{"label":"鹰潭","value":"207","key":"207"},{"label":"宜春","value":"206","key":"206"},{"label":"赣州","value":"198","key":"198"},{"label":"上饶","value":"204","key":"204"}]},{"label":"辽宁","value":"208","oid":208,"key":"208","children":[{"label":"辽阳","value":"218","key":"218"},{"label":"大连","value":"213","key":"213"},{"label":"阜新","value":"215","key":"215"},{"label":"朝阳","value":"211","key":"211"},{"label":"沈阳","value":"220","key":"220"},{"label":"锦州","value":"217","key":"217"},{"label":"葫芦岛","value":"661","key":"661"},{"label":"盘锦","value":"219","key":"219"},{"label":"本溪","value":"210","key":"210"},{"label":"抚顺","value":"214","key":"214"},{"label":"营口","value":"222","key":"222"},{"label":"铁岭","value":"221","key":"221"},{"label":"丹东","value":"212","key":"212"},{"label":"鞍山","value":"209","key":"209"}]},{"label":"内蒙古","value":"224","oid":224,"key":"224","children":[{"label":"巴彦淖尔","value":"226","key":"226"},{"label":"阿拉善盟","value":"660","key":"660"},{"label":"乌兰察布市","value":"232","key":"232"},{"label":"通辽","value":"231","key":"231"},{"label":"包头","value":"225","key":"225"},{"label":"呼伦贝尔","value":"230","key":"230"},{"label":"锡林郭勒","value":"235","key":"235"},{"label":"赤峰","value":"227","key":"227"},{"label":"呼和浩特","value":"229","key":"229"},{"label":"乌海","value":"233","key":"233"},{"label":"鄂尔多斯","value":"228","key":"228"},{"label":"兴安盟","value":"234","key":"234"}]},{"label":"四川","value":"241","oid":241,"key":"241","children":[{"label":"绵阳","value":"253","key":"253"},{"label":"内江","value":"255","key":"255"},{"label":"广安","value":"247","key":"247"},{"label":"阿坝","value":"242","key":"242"},{"label":"攀枝花","value":"256","key":"256"},{"label":"广元","value":"248","key":"248"},{"label":"资阳","value":"262","key":"262"},{"label":"泸州","value":"251","key":"251"},{"label":"巴中","value":"243","key":"243"},{"label":"南充","value":"254","key":"254"},{"label":"达州","value":"246","key":"246"},{"label":"成都","value":"244","key":"244"},{"label":"德阳","value":"245","key":"245"},{"label":"遂宁","value":"257","key":"257"},{"label":"凉山州","value":"258","key":"258"},{"label":"雅安","value":"259","key":"259"},{"label":"乐山","value":"250","key":"250"},{"label":"自贡","value":"261","key":"261"},{"label":"宜宾","value":"260","key":"260"},{"label":"眉山","value":"252","key":"252"},{"label":"甘孜州","value":"249","key":"249"}]},{"label":"山东","value":"263","oid":263,"key":"263","children":[{"label":"临沂","value":"271","key":"271"},{"label":"滨州","value":"264","key":"264"},{"label":"潍坊","value":"276","key":"276"},{"label":"聊城","value":"270","key":"270"},{"label":"菏泽","value":"267","key":"267"},{"label":"济南","value":"268","key":"268"},{"label":"淄博","value":"279","key":"279"},{"label":"枣庄","value":"280","key":"280"},{"label":"烟台","value":"278","key":"278"},{"label":"莱芜","value":"272","key":"272"},{"label":"日照","value":"274","key":"274"},{"label":"青岛","value":"273","key":"273"},{"label":"威海","value":"277","key":"277"},{"label":"东营","value":"265","key":"265"},{"label":"泰安","value":"275","key":"275"},{"label":"济宁","value":"269","key":"269"},{"label":"德州","value":"266","key":"266"}]},{"label":"山西","value":"282","oid":282,"key":"282","children":[{"label":"长治","value":"283","key":"283"},{"label":"太原","value":"291","key":"291"},{"label":"吕梁","value":"288","key":"288"},{"label":"阳泉","value":"659","key":"659"},{"label":"朔州","value":"290","key":"290"},{"label":"晋城","value":"285","key":"285"},{"label":"临汾","value":"287","key":"287"},{"label":"忻州","value":"289","key":"289"},{"label":"大同","value":"284","key":"284"},{"label":"晋中","value":"286","key":"286"},{"label":"运城","value":"292","key":"292"}]},{"label":"陕西","value":"295","oid":295,"key":"295","children":[{"label":"西安","value":"301","key":"301"},{"label":"铜川","value":"299","key":"299"},{"label":"宝鸡","value":"297","key":"297"},{"label":"安康","value":"296","key":"296"},{"label":"汉中","value":"298","key":"298"},{"label":"渭南","value":"300","key":"300"},{"label":"商洛","value":"673","key":"673"},{"label":"榆林","value":"304","key":"304"},{"label":"咸阳","value":"302","key":"302"},{"label":"延安","value":"303","key":"303"}]},{"label":"云南","value":"315","oid":315,"key":"315","children":[{"label":"丽江","value":"322","key":"322"},{"label":"迪庆藏族自治州","value":"665","key":"665"},{"label":"红河州","value":"320","key":"320"},{"label":"普洱","value":"662","key":"662"},{"label":"保山","value":"316","key":"316"},{"label":"文山","value":"325","key":"325"},{"label":"昭通","value":"327","key":"327"},{"label":"临沧","value":"663","key":"663"},{"label":"德宏州","value":"318","key":"318"},{"label":"怒江傈僳族自治州","value":"664","key":"664"},{"label":"曲靖","value":"323","key":"323"},{"label":"楚雄","value":"317","key":"317"},{"label":"西双版纳","value":"326","key":"326"},{"label":"大理","value":"319","key":"319"},{"label":"昆明","value":"321","key":"321"},{"label":"玉溪","value":"328","key":"328"}]},{"label":"浙江","value":"329","oid":329,"key":"329","children":[{"label":"宁波","value":"335","key":"335"},{"label":"丽水","value":"334","key":"334"},{"label":"台州","value":"338","key":"338"},{"label":"温州","value":"339","key":"339"},{"label":"舟山","value":"340","key":"340"},{"label":"绍兴","value":"337","key":"337"},{"label":"嘉兴","value":"333","key":"333"},{"label":"湖州","value":"330","key":"330"},{"label":"杭州","value":"331","key":"331"},{"label":"金华","value":"332","key":"332"},{"label":"衢州","value":"336","key":"336"}]},{"label":"青海","value":"239","oid":239,"key":"239","children":[{"label":"海西州","value":"342","key":"342"},{"label":"海南藏族自治州","value":"677","key":"677"},{"label":"玉树藏族自治州","value":"679","key":"679"},{"label":"海北藏族自治州","value":"675","key":"675"},{"label":"果洛藏族自治州","value":"678","key":"678"},{"label":"黄南藏族自治州","value":"676","key":"676"},{"label":"海东地区","value":"674","key":"674"},{"label":"西宁","value":"240","key":"240"}]},{"label":"广西","value":"69","oid":69,"key":"69","children":[{"label":"贺州","value":"364","key":"364"},{"label":"玉林","value":"80","key":"80"},{"label":"柳州","value":"76","key":"76"},{"label":"崇左","value":"361","key":"361"},{"label":"北海","value":"70","key":"70"},{"label":"河池","value":"75","key":"75"},{"label":"来宾","value":"365","key":"365"},{"label":"梧州","value":"79","key":"79"},{"label":"桂林","value":"74","key":"74"},{"label":"钦州","value":"78","key":"78"},{"label":"南宁","value":"77","key":"77"},{"label":"百色","value":"71","key":"71"},{"label":"防城","value":"72","key":"72"},{"label":"贵港","value":"73","key":"73"}]},{"label":"西藏","value":"314","oid":314,"key":"314","children":[{"label":"那曲","value":"670","key":"670"},{"label":"日喀则","value":"669","key":"669"},{"label":"林芝","value":"672","key":"672"},{"label":"阿里","value":"671","key":"671"},{"label":"山南","value":"668","key":"668"},{"label":"昌都","value":"667","key":"667"},{"label":"拉萨","value":"666","key":"666"}]},{"label":"宁夏","value":"236","oid":236,"key":"236","children":[{"label":"吴忠","value":"680","key":"680"},{"label":"固原","value":"681","key":"681"},{"label":"中卫","value":"682","key":"682"},{"label":"银川","value":"238","key":"238"},{"label":"石嘴山","value":"237","key":"237"}]},{"label":"新疆","value":"305","oid":305,"key":"305","children":[{"label":"阿勒泰地区","value":"706","key":"706"},{"label":"乌鲁木齐","value":"313","key":"313"},{"label":"巴音郭楞蒙古自治州","value":"699","key":"699"},{"label":"博尔塔拉蒙古自治州","value":"701","key":"701"},{"label":"伊犁州","value":"309","key":"309"},{"label":"喀什","value":"311","key":"311"},{"label":"塔城地区","value":"702","key":"702"},{"label":"阿克苏","value":"306","key":"306"},{"label":"克拉玛依","value":"310","key":"310"},{"label":"昌吉回族自治州","value":"700","key":"700"},{"label":"克孜勒苏柯尔克孜自治州","value":"698","key":"698"},{"label":"哈密","value":"307","key":"307"},{"label":"吐鲁番地区","value":"703","key":"703"},{"label":"和田","value":"308","key":"308"}]}];



class Region extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.type = 1;
    // 初始化城市选择框和ip输入框
    this.cityValue = [];
    this.ipValue = '';
  }

  // 监听radio onchagne
  radioOnChange(e) {
    let type = e.target.value;
    let inputValue = '';
    switch(type){
      case 1:
        inputValue = '';
        break;
      case 2:
        inputValue = this.cityValue;
        break;
      case 3:
        inputValue = this.ipValue;
        break;
    }
    this.type = type;
    this.popValue(type, inputValue)
  }

  // 监听子选项输入框 onchange
  inputOnChange(e){
    let value = '';
    switch(this.type){
      case 1:
        break;
      case 2:
        value = e;
        this.cityValue = value;
        break;
      case 3:
        value = e.target.value;
        this.ipValue = value;
        break;
    }
    this.popValue(this.type, value)
  }

  // 更新父表单元素值
  popValue(type,value){
    value = (type == 2 && value.join? value.join(',') : value);
    this.props.setRegion({
      type: type,
      value: value
    });
  }

  getInputValue(type){
    //先从当前缓存里取值
    switch(type){
      case 2:
        this.cityValue = this.cityValue.length>0? this.cityValue : this.props.value.value;
        return this.cityValue;
      case 3:
        this.ipValue =  this.ipValue || this.props.value.value;
        return this.ipValue;
    }
  }

  render() {
    const type = this.props.value.type;
    const inputValue = this.getInputValue(type);

    this.type =  type;

    let cityProps = {
      treeData,
      multiple: true,
      className: 'solution',
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择省/市',
      onChange: this.inputOnChange.bind(this),
      value: inputValue,
      getPopupContainer: () => document.getElementById('yac-content'),
      style: {
        width: 600
      },
    };

    return (
      <RadioGroup onChange={this.radioOnChange.bind(this)} value={type} className="region-group">
        <Radio className="radio-item" key="r1" value={1}>无地域定向（全网）</Radio>
        <Radio className="radio-item" key="r2" value={2}>选择城市定向</Radio>
        <div className={type==2 ? 'city' : 'hidden'}>
          <TreeSelect {...cityProps}/>
        </div>
        
        <Radio className="radio-item" key="r3" value={3}>自定义IP地域库</Radio>
        <div className={type==3 ? 'ip' : 'hidden'}>
            <Input ref="ipInput" type="textarea" placeholder="请使用分号（；）分隔" 
            value={inputValue}
            onChange={this.inputOnChange.bind(this)} />
        </div>
      </RadioGroup>
    );
  }
}

export default Region;