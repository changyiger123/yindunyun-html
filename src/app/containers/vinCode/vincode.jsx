import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
import moment from 'moment'
const FormItem = Form.Item;
const confirm = Modal.confirm;
import "./vincode.less";
import ajax from "../../utils/ajax";
import VinReport from '../../components/reportCom/vinReports'
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'

class Vincode extends React.Component {
    state = {
        loading:false
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
        getPrice('vin_car_info').then(res=>{
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
        if (!this.state.vin) {
            message.error("请输入车架号！");
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
            title: '确定查询该车架号的VIN码？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                _this.setState({
                    loading: true
                })
                ajax.post('/admin/riskControlPlatform/vin/car/info', {vin: _this.state.vin})
                .then(response => {
                    if(response.code == "0") {
                        _this.setState({
                            previewVisible: true,
                            datalist: response.data
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
        window.location.hash = "/vinCode/vincodeList"
    }

    render() {
        return(
            <div style={{height: '100%' }}>
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>
                        VIN码查询
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}} className="bankFlowItem">
                    <div id="info" style={{padding:"80px 0"}}>
                        <div className="common_search_top">
                            <div>VIN码查询</div>
                            <span>vin码查询披露相关车辆型号价格信息。</span>
                        </div>
                        <FormItem
                            label="车架号"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="mobilePhone" name="mobilePhone" placeholder="请输入车架号"   onChange={this.onChange.bind(this, 'vin')}/>
                        </FormItem>
                        <div className="submit_search">
                            <span className="submit_left"></span>
                            <Button type="primary" loading={this.state.loading} onClick={this.go_search.bind(this)} style={{width:"100px"}}>查询</Button>
                        </div>
                        {this.state.priceData?
                            <SearchCost priceData={this.state.priceData} total={this.state.total} word="查验"></SearchCost>:''
                        }
                    </div>
                    {this.state.previewVisible?<VinReport
                        datalist = {this.state.datalist} 
                        closeModal = {this.closedata.bind(this)}
                    ></VinReport>:''}
                </div>
            </div>
        )
    }
}
const vincode = Form.create()(Vincode);
export default vincode;