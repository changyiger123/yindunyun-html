import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
import moment from 'moment'
const FormItem = Form.Item;
const confirm = Modal.confirm;
import "./socialSecurity.less";
import ajax from "../../utils/ajax";
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'
import SocialSecurityReport from '../../components/reportCom/socialSecurityReports'

class SocialSecurity extends React.Component {
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
        getPrice('social_security').then(res=>{
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
        }else if (!this.state.cardId) {
            message.error("请输入身份证号码！");
            return
        }
        if (this.state.total-0 <  this.state.priceData.discountsPrice-0) {
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
            title: '确定查询该用户的社保缴纳情况？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                _this.setState({
                    loading: true
                })
                ajax.post('/admin/riskControlPlatform/socialSecurity/rc/query', {realName: _this.state.realName,cardId: _this.state.cardId})
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
    }

    go_record() {
        window.location.hash = "/socialSecurity/socialSecurityList"
    }

    render() {
        return(
            <div style={{height: '100%' }}>
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>
                        社保查询
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}} className="bankFlowItem">
                    <div id="info" style={{padding:"80px 0"}}>
                        <div className="common_search_top">
                            <div>社保查询</div>
                            <span>社保查询披露近一年社保缴纳月数，缴纳平均值，连续停缴月数。</span>
                        </div>
                        <FormItem
                            label="姓名"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="realName" name="realName" placeholder="请输入姓名"   onChange={this.onChange.bind(this, 'realName')}/>
                        </FormItem>
                        <FormItem
                            label="身份证号"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="cardId" name="cardId" placeholder="请输入身份证号"   onChange={this.onChange.bind(this, 'cardId')}/>
                        </FormItem>
                        <div className="submit_search">
                            <span className="submit_left"></span>
                            <Button type="primary" loading={this.state.loading} onClick={this.go_search.bind(this)} style={{width:"100px"}}>查询</Button>
                        </div>
                        {this.state.priceData?
                            <SearchCost priceData={this.state.priceData} total={this.state.total} word="查询"></SearchCost>:''
                        }
                        {this.state.previewVisible?<SocialSecurityReport
                            datalist = {this.state.datalist} 
                            closeModal = {this.closedata.bind(this)}
                            reportType = "1"
                        ></SocialSecurityReport>:''}
                    </div>
                </div>
            </div>
        )
    }
}
const socialSecurity = Form.create()(SocialSecurity);
export default socialSecurity;