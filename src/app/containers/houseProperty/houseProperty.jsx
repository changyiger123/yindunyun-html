import React from 'react';
import { Form,Input, Select, Cascader, Checkbox , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
import ajax from "../../utils/ajax";
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'
import './houseProperty.less'
import HousePropertyReport from '../../components/reportCom/housePropertyReports'

class HouseProperty extends React.Component {
    state = {
        loading:false,
        show_city_list: false,
        citylist: [],
        houseList:[],
        tags:[],
        house_name: '',
        choosedCity:{name:'',pinyin:''}
    };
    constructor(props) {
        super(props);
    };
    componentDidMount () {
        ajax.post("/admin/account/info").then(response => {
            if(response.code == "0") {
                this.setState({
                    total: response.data.total
                })
            }else {
                message.error(response.msg);
            }
        })
        ajax.post('/admin/communityInfo/city/query/all', {})
        .then(response => {
            if(response.code == "0") {
                this.setState({
                    citylist: response.data,
                })
            }else {
                message.error(response.msg);
            }
        });
        getPrice('house_price_info').then(res=>{
            if(res.code == "0") {
                this.setState({
                    priceData: res.data
                })
            }else {
                message.error(res.msg)
            }
        })
    }


    //普通字段输入更改state
    onChange(field, e){
        let valStr = e.target.value;
        this.setState({
            [field]: valStr,
        });
    };
    onChangeSelect(field, value) {
        this.setState({
            [field]: value,
        });
    };
    onChangeOption(i,e){
        this.setState({
            [i]:e
        })
    }
    onChangetags(e){
        this.setState({
            tags: e
        })
    }

    go_search () {
        var _this = this
        if (!this.state.house_id) {
            message.error("请选择小区！");
            return
        }else if (!this.state.buildFinishYear) {
            message.error("请选择建筑年代！");
            return
        }else if (!this.state.area) {
            message.error("请输入面积！");
            return
        }else if (!this.state.roomType) {
            message.error("请选择户型！");
            return
        }else if (!this.state.orientation) {
            message.error("请选择朝向！");
            return
        }else if (!this.state.floor) {
            message.error("请输入楼层！");
            return
        }else if (!this.state.totalFloor) {
            message.error("请输入总楼层！");
            return
        }
        var tags = ''
        if(this.state.tags.length) {
            this.state.tags.map((item,index)=>{
                if(index){
                    tags=tags+','+item
                }else {
                    tags=item
                }
            })
        }else{
            tags = undefined
        }
        var upData = {
            communityId:this.state.house_id,
            roomCount:this.state.roomType[0],
            hallCount:this.state.roomType[1],
            toiletCount:this.state.roomType[2],
            orientation:this.state.orientation,
            area:this.state.area,
            floor:this.state.floor,
            totalFloor:this.state.totalFloor,
            buildFinishYear:this.state.buildFinishYear,
            tags: tags
        }
        if (this.state.total-0 < this.state.priceData.discountsPrice-0) {
            confirm({
                title: '您的账户余额已不足，请先去账户中心充值',
                okText: "去充值",
                cancelText: "取消",
                onOk() {
                    window.location.hash="/accountCenter"
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
            return
        }
        confirm({
            title: '确定对该房产进行评估？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                _this.setState({
                    loading: true
                })
                ajax.post('/admin/riskControlPlatform/house/price/info',upData)
                .then(response => {
                    if(response.code == "0") {
                        upData.communityName = _this.state.house_name
                        _this.setState({
                            previewVisible: true,
                            datalist: response.data,
                            otherData: upData
                        })
                    }else {
                        message.error(response.msg);
                    }
                    _this.setState({
                        loading: false
                    })
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    
    closedata () {
        this.setState({ previewVisible: false })
        window.location.reload();
    }

    go_record() {
        window.location.hash = "/houseProperty/housePropertyList"
    }

    cityChoose() {
        this.setState({
            show_city_list: true,
            choosedCityTem: this.state.choosedCity
        })
    }
    close_city_list(){
        this.setState({
            show_city_list: false,
        })
    }
    choosedCity(i,e){
        this.setState({
            choosedCityTem: i
        })
    }
    check_choosed_list() {
        this.setState({
            choosedCity: this.state.choosedCityTem,
            show_city_list: false,
        })
    }

    showHouseList(){
        this.setState({
            show_house_list: true
        })
    }
    searchHouse(e){
        console.log(e.target.value)
        this.setState({
            house_name:e.target.value
        })
        if(!e.target.value) {
            return
        }
        ajax.post('/admin/communityInfo/community/info', {city: this.state.choosedCity.name,communityName: e.target.value})
        .then(response => {
            if(response.code == "0") {
                this.setState({
                    houseList: response.data
                })
            }else {
                message.error(response.msg);
            }
        });
    }
    chooseHouse(i,e) {
        this.setState({
            house_name: i.communityName,
            house_id: i.communityId,
            show_house_list:false
        })
    }

    render() {
        var newDate = new Date();
        var thisYear = newDate.getFullYear();
        var yearList = []
        for(var i=0;i<60;i++){
            yearList.push(<Select.Option value={thisYear - i}>{thisYear - i}年</Select.Option>)
        }
        var washRoom = []
        for(var i=0;i<10;i++) {
            washRoom.push({value:i,label:i+'卫'})
        }
        var livingRoom = []
        for(var i=0;i<10;i++){
            livingRoom.push({value:i,label:i+'厅',children:washRoom})
        }
        var room = []
        for(var i=0;i<10;i++){
            room.push({value:i,label:i+'室',children:livingRoom})
        }
        const orientation = [
            <Select.Option value="东">东</Select.Option>,
            <Select.Option value="南">南</Select.Option>,
            <Select.Option value="西">西</Select.Option>,
            <Select.Option value="北">北</Select.Option>,
            <Select.Option value="东北">东北</Select.Option>,
            <Select.Option value="东南">东南</Select.Option>,
            <Select.Option value="西北">西北</Select.Option>,
            <Select.Option value="西南">西南</Select.Option>,
            <Select.Option value="东西">东西</Select.Option>,
            <Select.Option value="南北">南北</Select.Option>,
        ]
        return(
            <div style={{height: '100%' }}>
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>
                        房产评估
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}} className="bankFlowItem">
                    <div id="info" style={{padding:"80px 0"}}>
                        <div className="common_search_top">
                            <div>房产评估</div>
                            <span>房产评估针对相关房产信息做出相对公允价格评估。</span>
                        </div>
                        <FormItem
                            label="城市"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <div className="cityChoose" onClick={this.cityChoose.bind(this)}>
                                {this.state.choosedCity.name?this.state.choosedCity.name:'请选择城市'}
                                <span className="ant-select-arrow" unselectable="on"><b></b></span>
                            </div>
                        </FormItem>
                        <FormItem
                            label="小区"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <div className="houseChoose">
                                <Input.Search onChange={this.searchHouse.bind(this)} onFocus={this.showHouseList.bind(this)} value={this.state.house_name} type="text" id="community" name="community" placeholder="请输入小区名称或街道名称"/>
                                <ul className={this.state.show_house_list?"active":""}>
                                    <li className="noChooseLi">请选择下面列表中的小区</li>
                                    {this.state.houseList.length?this.state.houseList.map((item)=>{
                                        return(
                                            <li className="canChooseLi" onClick={this.chooseHouse.bind(this,item)}>{item.communityName}</li>
                                        )
                                    }):<li className="noChooseLi">数据库未匹配到结果，请重新输入地址</li>}
                                    
                                </ul>
                            </div>
                        </FormItem>
                        <FormItem
                            label="年代"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Select style={{width:"100%"}} className="ant-form-text" placeholder='请选择年代' name="buildFinishYear" onChange={this.onChangeSelect.bind(this, 'buildFinishYear')}>
                                {yearList}
                            </Select>
                        </FormItem>
                        <FormItem
                            label="面积"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="area" name="area" placeholder="请输入面积" addonAfter="平米" onChange={this.onChange.bind(this, 'area')}/>
                        </FormItem>
                        <FormItem
                            label="户型"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Cascader style={{width:"100%"}} options={room} onChange={this.onChangeOption.bind(this,'roomType')} placeholder="请选择户型" />
                        </FormItem>
                        <FormItem
                            label="朝向"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Select style={{width:"100%"}} className="ant-form-text" placeholder='请选择朝向' name="orientation" onChange={this.onChangeSelect.bind(this, 'orientation')}>
                                {orientation}
                            </Select>
                        </FormItem>
                        <FormItem
                            label="楼层"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="floor" name="floor" placeholder="请输入楼层" addonAfter="层" onChange={this.onChange.bind(this, 'floor')}/>
                        </FormItem>
                        <FormItem
                            label="总层数"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="totalFloor" name="totalFloor" placeholder="请输入总层数" addonAfter="层" onChange={this.onChange.bind(this, 'totalFloor')}/>
                        </FormItem>
                        <FormItem
                            label="房屋特征"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangetags.bind(this)}>
                                <Checkbox value="满五">满五</Checkbox>
                                <Checkbox value="精装修">精装修</Checkbox>
                                <Checkbox value="学区房">学区房</Checkbox>
                                <Checkbox value="地铁房">地铁房</Checkbox>
                                <Checkbox value="唯一">唯一</Checkbox>
                            </Checkbox.Group>
                        </FormItem>
                        <div className="submit_search">
                            <span className="submit_left"></span>
                            <Button type="primary" loading={this.state.loading} onClick={this.go_search.bind(this)} style={{width:"100px"}}>查询</Button>
                        </div>
                        {this.state.priceData?
                            <SearchCost priceData={this.state.priceData} total={this.state.total} word="查询"></SearchCost>:''
                        }
                        {this.state.previewVisible?<HousePropertyReport
                            datalist = {this.state.datalist} 
                            otherData = {this.state.otherData}
                            closeModal = {this.closedata.bind(this)}
                        ></HousePropertyReport>:''}
                    </div>
                    {this.state.show_city_list?<div className="cityListWarp">
                        <div className="cityListInner">
                            <h3>请选择城市</h3>
                            <ul>
                                {this.state.citylist.length?this.state.citylist.map((item)=>{
                                    return(
                                        <li>
                                            <span>{item.firstChar}</span>
                                            <div>
                                                {item.cities.map((itemInner)=>{
                                                    return(
                                                        <div onClick={this.choosedCity.bind(this,itemInner)} className={this.state.choosedCityTem.pinyin==itemInner.pinyin?"active":''}>{itemInner.name}</div>
                                                    )
                                                })}
                                            </div>
                                        </li>
                                    )
                                }):''}
                            </ul>
                            <div>
                                <Button onClick={this.close_city_list.bind(this)} type="ghost" style={{width:"100px",float:"right",marginRight:"40px"}}>取消</Button>
                                <Button onClick={this.check_choosed_list.bind(this)} type="primary" style={{width:"100px",float:"right",marginRight:"8px"}}>确定</Button>
                            </div>
                        </div>
                    </div>:''}
                </div>
            </div>
        )
    }
}
const houseProperty = Form.create()(HouseProperty);
export default houseProperty;