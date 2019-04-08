import React from 'react';
import { Link } from "react-router";
import { Form, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col,Modal,Popconfirm,Tabs,Radio,Input } from 'antd';
import Result from 'ant-design-pro/lib/Result'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
import "./riskQuery.less";
import V3Reports from "../../components/reportCom/v3Reports.jsx"
import ajax from "../../utils/ajax";
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'

class RiskQueryMg extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '多维度反欺诈报告查询',
            isMarried: 0,
            show_more_item: false,
            cost_money: 10,
            hasSecondContact: 0,
            hasThirdContact: 0,
            hasCommonContact: 0,
            hasGuarantee: 0,
            autoType: 0,
            isNewEnergyCar: 1,
            number: 1,
            loading: false,
            total: 0,
            v3SearchData: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
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
        getPrice('miguan_car').then(res=>{
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
    onChange(field, e) {
        let valStr = e.target.value;
        this.setState({
           [field]: valStr,
        });
    };
    //select选择option更改state
    onChangeSelect(field, value) {
        console.log(value);
        this.setState({
            [field]: value,
        });

        console.log(field, 'change', value);
    };

    showMoreItem(i,e) {
        this.setState({
            show_more_item: i=="1"? true: false
        })
    }
    go_search () {
        if (!this.state.realName) {
            message.error("请输入姓名！");
            return
        }else if (!this.state.mobilePhone) {
            message.error("请输入手机号码！");
            return
        }else if (!this.state.cardId) {
            message.error("请输入身份证号码！");
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
        var url = '/admin/riskControlPlatform/miguan/rc/query'
        var data = {
                realName: this.state.realName,
                mobilePhone: this.state.mobilePhone,
                cardId: this.state.cardId,
            }
        var _this = this
        confirm({
            title: '确定查询该用户的风控数据？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                _this.setState({
                    loading: true
                })
                ajax.post(url, data)
                .then(response => {
                    if(response.code == "0") {
                        var json = $.parseJSON(response.data)
                        _this.setState({
                            previewVisible: true,
                            v3SearchData: json
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
        console.log(data)
    }

    closedata () {
        this.setState({
            previewVisible: false
        })
    }
    go_record() {
        window.location.hash = "/riskQueryRecord/5"
    }
    
    render() {
        const {getFieldDecorator} = this.props.form;
        const formData = this.state;
        const education = [
            <Option key="PRE_HIGH_SCHOOL" value="PRE_HIGH_SCHOOL">高中以下</Option>,
            <Option key="HIGH_SCHOOL" value="HIGH_SCHOOL">高中/中专</Option>,
            <Option key="JUNIOR_COLLEGE" value="JUNIOR_COLLEGE">大专</Option>,
            <Option key="UNDER_GRADUATE" value="UNDER_GRADUATE">本科</Option>,
            <Option key="POST_GRADUATE" value="POST_GRADUATE">研究生</Option>
        ]
        const workingLife = [
            <Option key="1年以下 " value="1年以下 ">1年以下</Option>,
            <Option key="1年" value="1年">1年</Option>,
            <Option key="2年" value="2年">2年</Option>,
            <Option key="3-4年" value="3-4年">3-4年</Option>,
            <Option key="5-7年" value="5-7年">5-7年</Option>,
            <Option key="8-9年" value="8-9年">8-9年</Option>,
            <Option key="10年以上" value="10年以上">10年以上</Option>
        ]
        const socialRelations = [
            <Option key="coworker" value="coworker">同事</Option>,
            <Option key="mother" value="mother">母亲</Option>,
            <Option key="father" value="father">父亲</Option>,
            <Option key="other_relative" value="other_relative">其他亲属</Option>,
            <Option key="friend" value="friend">朋友</Option>,
            <Option key="spouse" value="spouse">配偶</Option>,
            <Option key="child" value="child">子女</Option>,
            <Option key="others" value="others">其他</Option>
        ]
        return (
            <div style={{height: '100%' }}>
                <Breadcrumb style={{padding: '16px 28px', background: "#fff", borderBottom: "1px solid #E8E8E8"}}>
                    <Breadcrumb.Item>
                        大数据防控报告查询
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}}>
                    <Form className="editContent">
                        <div id="info" style={{padding:"80px 0"}}>
                            <div className="common_search_top">
                                <div>大数据防控报告</div>
                                <span>报告披露借款人社交关系特征、身份证信息、手机存疑预警、借贷机构查询历史、注册信息反欺诈查询等等。</span>
                            </div>
                            <FormItem
                                label="姓名："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("realName", {
                                    initialValue: formData.realName,
                                    rules: [
                                        {required: true, message: "请输入姓名！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="realName" name="realName"
                                           placeholder="请输入姓名"   onChange={this.onChange.bind(this, 'realName')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="手机号："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("mobilePhone", {
                                    initialValue: formData.mobilePhone,
                                    rules: [
                                        {required: true,len:11,pattern:"^1[3|4|5|7|8|9]\\d{9}$", message: "请输入正确的手机号！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="mobilePhone" maxLength="11"
                                           placeholder="请输入手机号码" onChange={this.onChange.bind(this, 'mobilePhone')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="身份证号码："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("cardId", {
                                    initialValue:formData.cardId,
                                    rules: [
                                        {required: true,pattern:"(^\\d{6}(18|19|20)\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|[xX])$|^\\d{6}\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}$)", message: "请输入正确的身份证号码！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="cardId" name="cardId" maxLength="18"
                                           placeholder="请输入身份证号码" onChange={this.onChange.bind(this, 'cardId')}/>
                                )}
                            </FormItem>
                            <div className="submit_search">
                                <span className="submit_left"></span>
                                <Button type="primary" loading={this.state.loading} onClick={this.go_search.bind(this)} style={{width:"100px"}}>查询</Button>
                            </div>
                            {this.state.priceData?
                                <SearchCost priceData={this.state.priceData} total={this.state.total} word="查询"></SearchCost>:''
                            }
                        </div>
                    </Form>
                </div>
                {this.state.previewVisible? 
                <V3Reports
                    datalist={this.state.v3SearchData}
                    closeMoadl = {this.closedata.bind(this)}
                >
                </V3Reports>
                :''
                }
            </div>
        )
    }
}
const riskQueryMg = Form.create()(RiskQueryMg);
export default riskQueryMg;