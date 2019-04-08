import React from 'react';
import { Link } from "react-router";
import { Form, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col,Modal,Popconfirm,Tabs,Radio,Input } from 'antd';
import Result from 'ant-design-pro/lib/Result'
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
import "./riskQuery.less";
import ajax from "../../utils/ajax";
import FreeTool from '../../components/freeTools/freeTools'
import Tool from '../../components/tools/tools'

class RiskQuery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actionsType: window.localStorage.getItem("actionsType"),
            toolsData: []
        };

    };
    componentWillMount(){
        ajax.post('/admin/payItemConfig/web/pay/item/list', {})
        .then(response => {
            if(response.code == "0") {
                this.setState({
                    toolsData: response.data
                })
            }else {
                message.error(response.msg);
            }
        });
    }
    getNidUrl(nid) {
        switch (nid) {
            case 'vin_car_info'://vin码查询
            return '/vinCode/vincode';
            case 'driving_license_score'://驾驶证查验
            return '/usedCar/licensInspection';
            case 'vehicle_violation_info'://车辆违章
            return '/vehicleViolation/vehicleViolation';
            case 'ocr_invoice'://发票校验
            return '/invoiceInspection/invoiceInspection';
            case 'tongdun_car'://多维度反欺诈
            return '/riskQueryEdit/1';
            case 'anti_fraud_simple'://反欺诈(简)
            return '/riskQueryEdit/2';
            case 'miguan_car'://大数据防控
            return '/riskQueryEdit/3';
            case 'umeng_score'://手机行为画像
            return '/equipment/equipment';
            case 'bank_bill_info'://银行流水
            return '/bankFlow/bankFlow';
            case 'social_security'://社保查询
            return '/socialSecurity/socialSecurity';
            case 'provident_fund'://公积金查询
            return '/accumulationFund/accumulationFund';
            case 'work_address_verify'://地址查验
            return '/address/address';
            case 'house_price_info'://房产评估
            return '/houseProperty/houseProperty';
            case 'second_hand_car_info'://二手车档案
            return '/usedCar/usedCar';
        }
    }
    render() {
        return (
            <div id="risk_query" style={{padding:'24px', minHeight: '624px' }}>
                <div className="free_tools_box">
                    <h3>限免工具<span>每天免费5次</span></h3>
                    <div className="free_tools_box_inner">
                        {this.state.toolsData.length?this.state.toolsData[0].items.map((item)=>{
                            return (
                                <FreeTool name={item.name} times={item.count} url={this.getNidUrl(item.nid)} imgSrc={item.picUrl}></FreeTool>
                            )
                        }):''}
                    </div>
                </div>
                <div className="tools_box_list">
                    <div className="tools_box_item">
                        <h3>贷前工具</h3>
                        <div className="tools_box_item_inner">
                            {this.state.toolsData.length?this.state.toolsData[1].items.map((item)=>{
                                return(
                                    <Tool name={item.name} money={item.price} url={this.getNidUrl(item.nid)} imgSrc={item.picUrl}></Tool>
                                )
                            }):''}
                        </div>
                    </div>
                    <div className="tools_box_item">
                        <h3>贷前验真</h3>
                        <div className="tools_box_item_inner">
                            {this.state.toolsData.length?this.state.toolsData[2].items.map((item)=>{
                                return(
                                    <Tool name={item.name} money={item.price} url={this.getNidUrl(item.nid)} imgSrc={item.picUrl}></Tool>
                                )
                            }):''}
                        </div>
                    </div>
                    <div className="tools_box_item">
                        <h3>汽车金融</h3>
                        <div className="tools_box_item_inner">
                            {this.state.toolsData.length?this.state.toolsData[3].items.map((item)=>{
                                return(
                                    <Tool name={item.name} money={item.price} url={this.getNidUrl(item.nid)} imgSrc={item.picUrl}></Tool>
                                )
                            }):''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const riskQuery = Form.create()(RiskQuery);
export default riskQuery;