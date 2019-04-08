import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
import "./usedCar.less";
import ajax from "../../utils/ajax";
import VehicleReports from '../../components/reportCom/vehicleReports'
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'

class VehicleViolation extends React.Component {
    state = {
        loading: false,
        previewVisible: false,
        datalist: [],
        total: 0,
        provinceData: [],
        cityData: [],
        selectDefault: null,
        myProvince: null,
        myCity: null,
        isNext: true,
        data: [],

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
        ajax.post("/admin/youfenCityCode/listProvince",null)
        .then(response =>{
            if(response.code == "0"){
                var list =response.data;
                this.setState({
                    provinceData:list
                });
            }else{
                message.error(response.msg);
            }
        });
        getPrice('vehicle_violation_info').then(res=>{
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
    };

    go_next () {
        var result = false
        var result1 = false
        var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{5}[A-Z0-9挂学警港澳]{1}$/;
        var express1 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        result = express.test(this.state.licensePlateNo);
        result1 = express1.test(this.state.licensePlateNo);
        if (!this.state.licensePlateNo) {
            message.error('车牌号不能为空');
            return
        } else if (!result && !result1) {
            message.error('车牌号格式不正确');
            return
        }
        ajax.post("/admin/secondHandCarLog/plateNo",{"licensePlateNo":this.state.licensePlateNo})
            .then(response =>{
            if(response.code == "0"){
                this.setState({
                    engineNo: response.data.engineNo,
                    vin: response.data.vin,
                    licensePlateType: response.data.licensePlateType,
                    isNext: false
                });
            }else{
                this.setState({
                    isNext: false
                });
            }
        });
        
    }

    go_search () {
        var _this = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
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
                    title: '确定查询该车辆违规记录？',
                    okText: "确认",
                    cancelText: "取消",
                    onOk() {
                        _this.setState({
                            loading: true
                        })
                        ajax.post("/admin/riskControlPlatform/vehicle/violation",{"licensePlateNo":_this.state.licensePlateNo, "licensePlateType":_this.state.licensePlateType, "cityCode": _this.state.myCity, "engineNo": _this.state.engineNo, "vin": _this.state.vin})
                            .then(response =>{
                            if(response.code == "0"){
                                _this.setState({
                                    data: response.data.record,
                                    previewVisible: true
                                });
                            }else{
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
            }else {
                message.error('输入信息有误');
            }
        })
    }
    closedata () {
        this.setState({
            previewVisible: false
        })
        window.location.reload()
    }
    handleChangeProvince(field,value) {
        this.setState({
            myCity:null,
	        [field]: value
        }, () => {
            this.props.form.setFieldsValue({
                city: null,
            })
        })
        ajax.post("/admin/youfenCityCode/listCity",{"provinceName":value})
            .then(response =>{
                if(response.code == "0"){
                var list =response.data;
                this.setState({
                    cityData:list,
                    myCity:null
                });
            }else{
                message.error(response.msg);
            }
        });
    }

    handleChangeCity(field,value) {
        this.setState({ 
	    [field]: value
        });
    }

    go_record() {
        window.location.hash = "/vehicleViolation/vehicleViolationList"
    }
    

    render() {
        const { getFieldDecorator } = this.props.form;
        const provinceData =this.state.provinceData;
        const cityData =this.state.cityData;
        const provinceOptions = [];
        const data = this.state.data
        var tmpVar;

        provinceOptions.push(<Option key={this.state.selectDefault} value={this.state.selectDefault}>请选择</Option>);

        for (let i = 0; i < provinceData.length; i++) {  
            tmpVar=""+provinceData[i];
            provinceOptions.push(<Option key={tmpVar} value={tmpVar}>{provinceData[i]}</Option>);  
        }


        const cityOptions = [];
        cityOptions.push(<Option key={this.state.selectDefault} value={this.state.selectDefault}>请选择</Option>);
        for (let i = 0; i < cityData.length; i++) {
	        tmpVar=""+cityData[i].cityCode;
            cityOptions.push(<Option key={tmpVar} value={tmpVar}>{cityData[i].cityName}</Option>);
        }

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
                        车辆违章查询
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}} className="usedCarItem">
                    <div id="info" style={{padding:"80px 0"}}>
                        <div className="common_search_top">
                            <div>车辆违章查询</div>
                            <span>车辆违章披露公安在录违章信息，包括具体违章时间、违章地点、违章扣分、违章金额、是否处理等等。</span>
                        </div>
                        <FormItem
                            label="车牌号"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            {getFieldDecorator("licensePlateNo", {
                                initialValue:this.state.licensePlateNo,
                                rules: [{ required: true, message: '请输入车牌号!' }]
                            })(
                                <Input maxLength="8" type="text" className="ant-form-text" name="licensePlateNo" placeholder="请输入车牌号" onChange={this.onChange.bind(this, 'licensePlateNo')}/>
                            )}
                        </FormItem>
                        <FormItem 
                            label="可查城市列表"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>    
                            <div>
			                    {getFieldDecorator("province", {
					                initialValue:this.state.myProvince,
					                rules: [{ required: true, message: '请选择省份!' }]
				                })(
                                    <Select style={{width: 172}} onChange={this.handleChangeProvince.bind(this,'myProvince')}>
                                        {provinceOptions}
                                    </Select>
                                )}
                                 - 
				                {getFieldDecorator("city", {
					                initialValue:this.state.myCity,
					                rules: [{ required: true, message: '请选择市!' }]
				                })(
                                    <Select style={{width: 172}} onChange={this.handleChangeCity.bind(this,'myCity')}>
                                        {cityOptions}
                                    </Select>
                                )}
                                <Icon style={{marginLeft: "4px",cursor: "pointer"}} type="info-circle" theme="outlined" title="部分车管所不支持查询"/>
				            </div>         
                        </FormItem>
                        {this.state.isNext == false?
                        <div>
                            <FormItem
                                label="号牌类型"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("licensePlateType", {
                                    initialValue:this.state.licensePlateType,
                                    rules: [{ required: true, message: '请选择号牌类型!' }]
                                })(
                                    <Select style={{width: "100%"}} placeholder="请选择号牌类型" onChange={this.onChangeSelect.bind(this, 'licensePlateType')}>
                                        {licensePlateTypes}
                                    </Select>
                                )}
                            </FormItem>
                            
                            <FormItem
                                label="车架号"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("vin", {
                                    initialValue:this.state.vin,
                                    rules: [{ required: true, message: '请填写车架号!' }]
                                })(
                                    <Input type="text" className="ant-form-text" name="vin" placeholder="请输入车架号" onChange={this.onChange.bind(this, 'vin')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="发动机号"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("engineNo", {
                                    initialValue:this.state.engineNo,
                                    rules: [{ required: true, message: '请填写发动机号!' }]
                                })(
                                    <Input type="text" className="ant-form-text" name="engineNo" placeholder="请输入发动机号" onChange={this.onChange.bind(this, 'engineNo')}/>
                                )}
                            </FormItem>
                        </div>
                        :
                        ''}
                        {this.state.isNext?
                        <div className="submit_search">
                            <span className="submit_left"></span>
                            <Button type="primary" loading={this.state.loading} onClick={this.go_next.bind(this)} style={{width:"100px"}}>下一步</Button>
                        </div>
                        :
                        <div className="submit_search">
                            <span className="submit_left"></span>
                            <Button type="primary" loading={this.state.loading} onClick={this.go_search.bind(this)} style={{width:"100px"}}>查询</Button>
                        </div>
                        }
                        {this.state.priceData?
                            <SearchCost priceData={this.state.priceData} total={this.state.total} word="查询"></SearchCost>:''
                        }
                    </div>
                </div>
                {this.state.previewVisible? 
                    <VehicleReports
                        datalist = {this.state.data} 
                        closeMoadl = {this.closedata.bind(this)}
                    >
                    </VehicleReports>
                    :
                    ''
                }
            </div>
        )
    }
}
const vehicleViolation = Form.create()(VehicleViolation);
export default vehicleViolation;