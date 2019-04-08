import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
import moment from 'moment'
const FormItem = Form.Item;
const confirm = Modal.confirm;
import "./bankFlow.less";
import ajax from "../../utils/ajax";
import BackReports from '../../components/reportCom/bankReports'
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'

class BankFlow extends React.Component {
    state = {
        startValue1: null,
        endValue1: null,
        loading: false,
        startApplyDate1: undefined,
        endApplyDate1:undefined,
        previewVisible: false,
        datalist: [],
        total: 0,
        timeInterval: 2
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
        getPrice('bank_bill_info').then(res=>{
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

    go_search () {
        var _this = this
        if (!this.state.realName) {
            message.error("请输入姓名！");
            return
        }else if (!this.state.bankCardCode) {
            message.error("请输入银行卡号！");
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
            title: '确定查询该用户的银行流水？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                ajax.post('/admin/riskControlPlatform/bank/bill/info/V2', {realName: _this.state.realName, bankCardCode: _this.state.bankCardCode,timeInterval:_this.state.timeInterval})
                .then(response => {
                    if(response.code == "0") {
                        _this.setState({
                            previewVisible: true,
                            datalist: response.data
                        })
                    }else {
                        message.error(response.msg);
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
        
    }
    
    //select选择option更改state
    onChangeSelect(field, value) {
        this.setState({
            [field]: value,
        });
        console.log(field, 'change', value);
    };
    closedata () {
        this.setState({ previewVisible: false })
    }

    go_record() {
        window.location.hash = "/bankFlow/bankFlowList"
    }

    render() {
        const dateTypes = [
            <Option value="1">近三个月</Option>,
            <Option value="2">近六个月</Option>,
            <Option value="3">近十二个月</Option>
        ]
        return(
            <div style={{height: '100%' }}>
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>
                        银行流水验真
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}} className="bankFlowItem">
                    <div id="info" style={{padding:"80px 0"}}>
                        <div className="common_search_top">
                            <div>银行流水验真</div>
                            <span>银行流水验真将查询上传银行卡号选定期限内的随机五笔银行流水，每笔金额都会做模糊处理，如207.6元的消费记录会处理成200元，您可以根据查询结果核对客户流水是否为真。</span>
                        </div>
                        <FormItem
                            label="姓名："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="realName" name="realName" placeholder="请输入姓名"   onChange={this.onChange.bind(this, 'realName')}/>
                        </FormItem>
                        <FormItem
                            label="银行卡号："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" name="bankCardCode" placeholder="请输入银行卡号" onChange={this.onChange.bind(this, 'bankCardCode')}/>
                        </FormItem>
                        <FormItem
                            label="查询时间"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Select style={{width:"100%"}} className="ant-form-text" defaultValue='近六个月' name="timeInterval" onChange={this.onChangeSelect.bind(this, 'timeInterval')}>
                                {dateTypes}
                            </Select>
                        </FormItem>
                        <div className="submit_search">
                            <span className="submit_left"></span>
                            <Button type="primary" loading={this.state.loading} onClick={this.go_search.bind(this)} style={{width:"100px"}}>查询</Button>
                        </div>
                        {this.state.priceData?
                            <SearchCost priceData={this.state.priceData} total={this.state.total} word="查验"></SearchCost>:''
                        }
                        {this.state.previewVisible?
                        <BackReports
                            datalist = {this.state.datalist} 
                            closeModal = {this.closedata.bind(this)}
                        >
                        </BackReports>:''}
                    </div>
                </div>
            </div>
        )
    }
}
const bankFlow = Form.create()(BankFlow);
export default bankFlow;