import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
import "./usedCar.less";
import ajax from "../../utils/ajax";
import UsedCarReports from '../../components/reportCom/usedCarReports'
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'

class UsedCar extends React.Component {
    state = {
        startValue1: null,
        endValue1: null,
        loading: false,
        previewVisible: false,
        datalist: [],
        total: 0
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
        getPrice('second_hand_car_info').then(res=>{
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
        console.log(field, 'change', valStr);
        this.setState({
            [field]: valStr,
        });
    };
    //select选择option更改state
    onChangeSelect(field, value) {
        this.setState({
            [field]: value,
        });
        console.log(field, 'change', value);
    };

    go_search () {
        var _this = this
        if (!this.state.realName) {
            message.error("请输入车辆所有人！");
            return
        }else if (!this.state.licensePlateNo) {
            message.error("请输入车牌号！");
            return
        }else if (!this.state.licensePlateType) {
            message.error("请选择号牌类型！");
            return
        }
        var result = false
        var result1 = false
        var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{5}[A-Z0-9挂学警港澳]{1}$/;
        var express1 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        result = express.test(this.state.licensePlateNo);
        result1 = express1.test(this.state.licensePlateNo);
        if (!result && !result1) {
            message.error('车牌号格式不正确');
            return
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
            title: '确定查询该二手车档案？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                _this.setState({
                    loading: true
                })
                ajax.post('/admin/riskControlPlatform/second/car/info/v2', {realName: _this.state.realName, licensePlateNo: _this.state.licensePlateNo, licensePlateType: _this.state.licensePlateType})
                .then(response => {
                    if(response.code == "0") {
                        _this.setState({
                            previewVisible: true,
                            datalist: _this.getArr(response.data)
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
    getArr (data) {
        return [
            {name: '车辆品牌名称', value: data.brand},
            {name: '车身颜色', value: data.color},
            {name: '使用性质', value: data.properties},
            {name: '车牌型号', value: data.type},
            {name: '车辆类型', value: data.vehicleType},
            {name: '发动机号', value: data.engine},
            {name: '发动机型号', value: data.engineType},
            {name: '初次登记日期', value: data.record},
            {name: '机动车所有人', value: data.man},
            {name: '车辆状态', value: data.state},
            {name: '核定载客数', value: data.passengers},
            {name: '强制报废期止', value: data.retirement},
            {name: '燃料种类', value: data.fuel},
            {name: '排量', value: data.cc},
            {name: '出厂日期', value: data.pps},
            {name: '最大功率（KW）', value: data.MaxJourney},
            {name: '轴数', value: data.shaft},
            {name: '轴距', value: data.wheelBase},
            {name: '前轮距', value: data.frontTread},
            {name: '后轮距', value: data.rearTread},
            {name: '总质量', value: data.crossWeight},
            {name: '整备质量', value: data.curbWeight},
            {name: '核定载质量', value: data.loadWeight},
            {name: '车架号', value: data.vin},
            {name: '车牌号', value: data.plate},
            {name: '车辆类型', value: data.variety},
            {name: '年检日期', value: data.jianCheTime}
        ]
    }
    closedata () {
        this.setState({ previewVisible: false })
    }

    go_record() {
        window.location.hash = "/usedCar/usedCarList"
    }

    render() {
        const licensePlateTypes = [
            <Option key="01 " value="01 ">大型汽车</Option>,
            <Option key="02" value="02">小型汽车</Option>,
            <Option key="03" value="03">使馆汽车</Option>,
            <Option key="04" value="04">领馆汽车</Option>,
            <Option key="05" value="05">境外汽车</Option>,
            <Option key="06" value="06">外籍汽车</Option>,
            <Option key="07" value="07">普通摩托车</Option>,
            <Option key="08" value="08">轻便摩托车</Option>,
            <Option key="09" value="09">使馆摩托车</Option>,
            <Option key="10" value="10">领馆摩托车</Option>,
            <Option key="11" value="11">境外摩托车</Option>,
            <Option key="12" value="12">外籍摩托车</Option>,
            <Option key="13" value="13">低速车</Option>,
            <Option key="14" value="14">拖拉机</Option>,
            <Option key="15" value="15">挂车</Option>,
            <Option key="16" value="16">教练汽车</Option>,
            <Option key="17" value="17">教练摩托车</Option>,
            <Option key="20" value="20">临时入境汽车</Option>,
            <Option key="21" value="21">临时入境摩托车</Option>,
            <Option key="22" value="22">临时行驶车</Option>,
            <Option key="23" value="23">警用汽车</Option>,
            <Option key="24" value="24">警用摩托</Option>,
            <Option key="51" value="51">大型新能源汽车</Option>,
            <Option key="52" value="52">小型新能源汽车</Option>
        ]
        return(
            <div style={{height: '100%' }}>
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>
                        二手车档案核查
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}} className="usedCarItem">
                    <div id="info" style={{padding:"80px 0"}}>
                        <div className="common_search_top">
                            <div>二手车档案核查</div>
                            <span>二手车档案披露车辆精准信息，包括车辆型号，车架号、发动机号、是否营运、所有者是否一致、登记报废时间、违章情况、查封情况等等。</span>
                        </div>
                        <FormItem
                            label="车辆所有人"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="realName" name="realName" placeholder="请输入车辆所有人"   onChange={this.onChange.bind(this, 'realName')}/>
                        </FormItem>
                        <FormItem
                            label="车牌号"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" maxLength="8" className="ant-form-text" name="licensePlateNo" placeholder="请输入车牌号" onChange={this.onChange.bind(this, 'licensePlateNo')}/>
                        </FormItem>
                        <FormItem
                            label="号牌类型"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Select className="ant-form-text" placeholder="请选择号牌类型" name="licensePlateType" onChange={this.onChangeSelect.bind(this, 'licensePlateType')}>
                                {licensePlateTypes}
                            </Select>
                        </FormItem>
                        <div className="submit_search">
                            <span className="submit_left"></span>
                            <Button type="primary" loading={this.state.loading} onClick={this.go_search.bind(this)} style={{width:"100px"}}>查询</Button>
                        </div>
                        {this.state.priceData?
                            <SearchCost priceData={this.state.priceData} total={this.state.total} word="查询"></SearchCost>:''
                        }
                        {this.state.previewVisible?
                        <UsedCarReports
                            datalist = {this.state.datalist} 
                            closeMoadl = {this.closedata.bind(this)}
                        >
                        </UsedCarReports>:''}
                    </div>
                </div>
            </div>
        )
    }
}
const usedCar = Form.create()(UsedCar);
export default usedCar;