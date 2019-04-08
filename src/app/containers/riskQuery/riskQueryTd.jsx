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
import ajax from "../../utils/ajax";
import TongDReports from "../../components/reportCom/tongDReports.jsx"
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'

class RiskQueryTd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '多维度反欺诈报告查询',
            isMarried: 0,
            show_more_item: false,
            cost_money: 8,
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
        getPrice('tongdun_car').then(res=>{
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
        var url = '/admin/riskControlPlatform/tongdun/rc/query'
        var data = {
            realName: this.state.realName,
            mobilePhone: this.state.mobilePhone,
            cardId: this.state.cardId,
            bankCardCode: this.state.bankCardCode,
            familyAddress: this.state.familyAddress,
            incomePerMonth: this.state.incomePerMonth,
            workTime: this.state.workTime,
            career: this.state.career,
            homeAddress: this.state.homeAddress,
            isMarried: this.state.isMarried,
            diploma: this.state.diploma,
            companyName: this.state.companyName,
            companyAddress: this.state.companyAddress,
            telPhone: this.state.telPhone,
            qqCode: this.state.qqCode,
            email: this.state.email,
            firstContactName: this.state.firstContactName,
            firstContactSocialRelation: this.state.firstContactSocialRelation,
            firstContactMobilePhone: this.state.firstContactMobilePhone,
            firstContactCardId: this.state.firstContactCardId,
            hasSecondContact: this.state.hasSecondContact,
            secondContactName: this.state.secondContactName,
            secondContactSocialRelation: this.state.secondContactSocialRelation,
            secondContactMobilePhone: this.state.secondContactMobilePhone,
            secondContactCardId: this.state.secondContactCardId,
            hasThirdContact: this.state.hasThirdContact,
            thirdContactName: this.state.thirdContactName,
            thirdContactSocialRelation: this.state.thirdContactSocialRelation,
            thirdContactMobilePhone: this.state.thirdContactMobilePhone,
            thirdContactCardId: this.state.thirdContactCardId,
            hasCommonContact: this.state.hasCommonContact,
            commonContactRealName: this.state.commonContactRealName,
            commonContactSocialRelation: this.state.commonContactSocialRelation,
            commonContactMobilePhone: this.state.commonContactMobilePhone,
            commonContactCardId: this.state.commonContactCardId,
            commonContactTelPhone: this.state.commonContactTelPhone,
            commonContactHomeAddress: this.state.commonContactHomeAddress,
            commonContactCompanyAddress: this.state.commonContactCompanyAddress,
            hasGuarantee: this.state.hasGuarantee,
            guaranteeRealName: this.state.guaranteeRealName,
            guaranteeSocialRelation: this.state.guaranteeSocialRelation,
            guaranteeMobilePhone: this.state.guaranteeMobilePhone,
            guaranteeCardId: this.state.guaranteeCardId,
            guaranteeTelPhone: this.state.guaranteeTelPhone,
            guaranteeHomeAddress: this.state.guaranteeHomeAddress,
            guaranteeCompanyAddress: this.state.guaranteeCompanyAddress,
            loanTime: this.state.loanTime,
            loanMoney: this.state.loanMoney,
            autotype: this.state.autotype,
            isNewEnergyCar: this.state.isNewEnergyCar,
            autoPrice: this.state.autoPrice,
            firstScale: this.state.firstScale,
            lastScale: this.state.lastScale,
            autoBrand: this.state.autoBrand,
            autoModel: this.state.autoModel
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
                        // $.showReport([json],_this.state.realName)
                        _this.setState({
                            previewVisible1: true,
                            tongdunData: json
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
    closedata1 () {
        this.setState({
            previewVisible1: false
        })
    }
    go_record() {
        window.location.hash = "/riskQueryRecord/1"
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
                        多维度反欺诈报告查询
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}}>
                    <Form className="editContent">
                        <div id="info" style={{padding:"80px 0"}}>
                            <div className="common_search_top">
                                <div>多维度反欺诈报告</div>
                                <span>报告披露用户自然人身份识别、多头借贷详情、公安涉案、法院失信执行、借款人逾期、黑名单命中、社交关系等等。</span>
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
                            {this.state.show_more_item?
                                <div className="more_item">
                                    <div className="show_more" onClick={this.showMoreItem.bind(this,"2")}><span></span>收起<Icon type="up" theme="outlined" /></div>
                                    <FormItem
                                        label="银行卡号："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("bankCardCode", {
                                            initialValue: formData.bankCardCode
                                        })(
                                            <Input type="text" className="ant-form-text" name="bankCardCode"
                                                placeholder="请输入银行卡号" onChange={this.onChange.bind(this, 'bankCardCode')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="户籍地址："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("familyAddress", {
                                            initialValue: formData.familyAddress
                                        })(
                                            <Input type="text" className="ant-form-text" id="familyAddress" name="familyAddress"
                                                placeholder="请输入户籍地址" onChange={this.onChange.bind(this, 'familyAddress')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="月均收入"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("incomePerMonth", {
                                            initialValue: formData.incomePerMonth
                                        })(
                                            <Input type="text" className="ant-form-text" id="incomePerMonth" name="incomePerMonth"
                                                placeholder="请输入月均收入(选填)" onChange={this.onChange.bind(this, 'incomePerMonth')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="工作时间"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("workTime", {
                                            initialValue: formData.workTime
                                        })(
                                            <Select placeholder="请选择工作时间(选填)" name="workTime" onChange={this.onChangeSelect.bind(this, 'workTime')}>
                                                {workingLife}
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="职业"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("career", {
                                            initialValue: formData.career
                                        })(
                                            <Input type="text" className="ant-form-text" id="career" name="career"
                                                placeholder="请输入职业(选填)" onChange={this.onChange.bind(this, 'career')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="居住地址："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("homeAddress", {
                                            initialValue: formData.homeAddress,
                                            rules: [
                                                {required: false, message: "请输入居住地址！"}
                                            ]
                                        })(
                                            <Input type="text" className="ant-form-text" id="homeAddress" name="homeAddress"
                                                placeholder="请输入居住地址" onChange={this.onChange.bind(this, 'homeAddress')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="婚姻状况："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("isMarried", {
                                            initialValue: this.state.isMarried + "" || undefined
                                        })(
                                            <RadioGroup name="isMarried" onChange={this.onChange.bind(this, 'isMarried')}>
                                                <Radio value="0" checked>未婚</Radio>
                                                <Radio value="1">已婚</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="学历"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("diploma", {
                                            initialValue: formData.diploma
                                        })(
                                            <Select placeholder="请选择学历(选填)" name="diploma" onChange={this.onChangeSelect.bind(this, 'diploma')}>
                                                {education}
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="工作单位"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("companyName", {
                                            initialValue: formData.companyName
                                        })(
                                            <Input type="text" className="ant-form-text" id="companyName" name="companyName"
                                                placeholder="请输入工作单位(选填)" onChange={this.onChange.bind(this, 'companyName')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="工作单位地址"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("companyAddress", {
                                            initialValue: formData.companyAddress,
                                            rules: [
                                                {required: false, message: "请输入工作单位地址！"}
                                            ]
                                        })(
                                            <Input type="text" className="ant-form-text" id="companyAddress" name="companyAddress"
                                                placeholder="请输入工作单位地址" onChange={this.onChange.bind(this, 'companyAddress')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="座机"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("telPhone", {
                                            initialValue: formData.telPhone
                                        })(
                                            <Input type="text" className="ant-form-text" id="telPhone" name="telPhone"
                                                placeholder="请输入座机(选填)" onChange={this.onChange.bind(this, 'telPhone')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="QQ"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("qqCode", {
                                            initialValue: formData.qqCode
                                        })(
                                            <Input type="text" className="ant-form-text" id="qqCode" name="qqCode"
                                                placeholder="请输入QQ(选填)" onChange={this.onChange.bind(this, 'qqCode')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="邮箱"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("email", {
                                            initialValue: formData.email
                                        })(
                                            <Input type="text" className="ant-form-text" id="email" name="email"
                                                placeholder="请输入邮箱(选填)" onChange={this.onChange.bind(this, 'email')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="第一联系人姓名："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("firstContactName", {
                                            initialValue: formData.firstContactName
                                        })(
                                            <Input type="text" className="ant-form-text" id="firstContactName"
                                                name="firstContactName" placeholder="请输入第一联系人姓名（选填）"
                                                onChange={this.onChange.bind(this, 'firstContactName')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="第一联系人社会关系："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("firstContactSocialRelation", {
                                            initialValue: formData.firstContactSocialRelation
                                        })(
                                            <Select placeholder="请选择第一联系人社会关系(选填)" name="firstContactSocialRelation" onChange={this.onChangeSelect.bind(this, 'firstContactSocialRelation')}>
                                                {socialRelations}
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="第一联系人手机号码："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("firstContactMobilePhone", {
                                            initialValue: formData.firstContactMobilePhone
                                        })(
                                            <Input type="text" className="ant-form-text" id="firstContactMobilePhone"
                                                name="firstContactMobilePhone" placeholder="请输入第一联系人手机号码(选填)"
                                                onChange={this.onChange.bind(this, 'firstContactMobilePhone')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="第一联系人身份证号码："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("firstContactCardId", {
                                            initialValue: formData.firstContactCardId
                                        })(
                                            <Input type="text" className="ant-form-text" id="firstContactCardId" name="firstContactCardId"
                                                placeholder="请输入第一联系人身份证号码(选填)"
                                                onChange={this.onChange.bind(this, 'firstContactCardId')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="第二联系人："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("hasSecondContact", {
                                            initialValue: formData.hasSecondContact + "" || undefined
                                        })(
                                            <RadioGroup name="hasSecondContact"
                                                        onChange={this.onChange.bind(this, 'hasSecondContact')}>
                                                <Radio value="1">有</Radio>
                                                <Radio value="0">无</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <div style={{display: this.state.hasSecondContact == 1 ? 'block' : 'none'}}>
                                        <FormItem
                                            label="第二联系人姓名："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("secondContactName", {
                                                initialValue: formData.secondContactName
                                            })(
                                                <Input type="text" className="ant-form-text" id="secondContactName"
                                                    name="secondContactName" placeholder="请输入第二联系人姓名（选填）"
                                                    onChange={this.onChange.bind(this, 'secondContactName')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="第二联系人社会关系："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("secondContactSocialRelation", {
                                                initialValue: formData.secondContactSocialRelation
                                            })(
                                                <Select placeholder="请选择第二联系人社会关系(选填)" name="secondContactSocialRelation" onChange={this.onChangeSelect.bind(this, 'secondContactSocialRelation')}>
                                                    {socialRelations}
                                                </Select>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="第二联系人手机号码："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("secondContactMobilePhone", {
                                                initialValue: formData.secondContactMobilePhone
                                            })(
                                                <Input type="text" className="ant-form-text" id="secondContactMobilePhone"
                                                    name="secondContactMobilePhone" placeholder="请输入第二联系人手机号码(选填)"
                                                    onChange={this.onChange.bind(this, 'secondContactMobilePhone')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="第二联系人身份证号码："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("secondContactCardId", {
                                                initialValue: formData.secondContactCardId
                                            })(
                                                <Input type="text" className="ant-form-text" id="secondContactCardId" name="secondContactCardId"
                                                    placeholder="请输入第二联系人身份证号码(选填)"
                                                    onChange={this.onChange.bind(this, 'secondContactCardId')}/>
                                            )}
                                        </FormItem>
                                    </div>
                                    <FormItem
                                        label="第三联系人："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("hasThirdContact", {
                                            initialValue: formData.hasThirdContact + "" || undefined
                                        })(
                                            <RadioGroup name="hasThirdContact"
                                                        onChange={this.onChange.bind(this, 'hasThirdContact')}>
                                                <Radio value="1">有</Radio>
                                                <Radio value="0">无</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <div style={{display: this.state.hasThirdContact == 1 ? 'block' : 'none'}}>
                                        <FormItem
                                            label="第三联系人姓名："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("thirdContactName", {
                                                initialValue: formData.thirdContactName
                                            })(
                                                <Input type="text" className="ant-form-text" id="thirdContactName"
                                                    name="thirdContactName" placeholder="请输入第三联系人姓名（选填）"
                                                    onChange={this.onChange.bind(this, 'thirdContactName')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="第三联系人社会关系："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("thirdContactSocialRelation", {
                                                initialValue: formData.thirdContactSocialRelation
                                            })(
                                                <Select placeholder="请选择第三联系人社会关系(选填)" name="thirdContactSocialRelation" onChange={this.onChangeSelect.bind(this, 'thirdContactSocialRelation')}>
                                                    {socialRelations}
                                                </Select>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="第三联系人手机号码："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("thirdContactMobilePhone", {
                                                initialValue: formData.thirdContactMobilePhone
                                            })(
                                                <Input type="text" className="ant-form-text" id="thirdContactMobilePhone"
                                                    name="thirdContactMobilePhone" placeholder="请输入第三联系人手机号码(选填)"
                                                    onChange={this.onChange.bind(this, 'thirdContactMobilePhone')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="第三联系人身份证号码："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("thirdContactCardId", {
                                                initialValue: formData.thirdContactCardId
                                            })(
                                                <Input type="text" className="ant-form-text" id="thirdContactCardId" name="thirdContactCardId"
                                                    placeholder="请输入第三联系人身份证号码(选填)"
                                                    onChange={this.onChange.bind(this, 'thirdContactCardId')}/>
                                            )}
                                        </FormItem>
                                    </div>
                                    {/*共同借款人*/}
                                    <FormItem
                                        label="共同借款人："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("hasCommonContact", {
                                            initialValue: formData.hasCommonContact + "" || undefined
                                        })(
                                            <RadioGroup name="hasCommonContact"
                                                        onChange={this.onChange.bind(this, 'hasCommonContact')}>
                                                <Radio value="1">有</Radio>
                                                <Radio value="0">无</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <div style={{display: formData.hasCommonContact == 1 ? 'block' : 'none'}}>
                                        <FormItem
                                            label="共同借款人姓名："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("commonContactRealName", {
                                                initialValue: formData.commonContactRealName
                                            })(
                                                <Input type="text" className="ant-form-text" id="commonContactRealName"
                                                    name="commonContactRealName" placeholder="请输入共同借款人姓名(选填)"
                                                    onChange={this.onChange.bind(this, 'commonContactRealName')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="共同借款人社会关系："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("commonContactSocialRelation", {
                                                initialValue: formData.commonContactSocialRelation
                                            })(
                                                <Select placeholder="请选择共同借款人社会关系(选填)" name="commonContactSocialRelation" onChange={this.onChangeSelect.bind(this, 'commonContactSocialRelation')}>
                                                    {socialRelations}
                                                </Select>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="共同借款人手机号码："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("commonContactMobilePhone", {
                                                initialValue: formData.commonContactMobilePhone
                                            })(
                                                <Input type="text" className="ant-form-text" id="commonContactMobilePhone"
                                                    name="commonContactMobilePhone" placeholder="请输入共同借款人手机号码(选填)"
                                                    onChange={this.onChange.bind(this, 'commonContactMobilePhone')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="共同借款人身份证号码："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("commonContactCardId", {
                                                initialValue: formData.commonContactCardId
                                            })(
                                                <Input type="text" className="ant-form-text" id="commonContactCardId" name="commonContactCardId"
                                                    placeholder="请输入共同借款人身份证号码(选填)"
                                                    onChange={this.onChange.bind(this, 'commonContactCardId')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="共同借款人座机："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("commonContactTelPhone", {
                                                initialValue: formData.commonContactTelPhone
                                            })(
                                                <Input type="text" className="ant-form-text" id="commonContactTelPhone"
                                                    name="commonContactTelPhone" placeholder="请输入共同借款人座机（选填）"
                                                    onChange={this.onChange.bind(this, 'commonContactTelPhone')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="共同借款人住址："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("commonContactHomeAddress", {
                                                initialValue: formData.commonContactHomeAddress
                                            })(
                                                <Input type="text" className="ant-form-text" id="commonContactHomeAddress"
                                                    name="commonContactHomeAddress" placeholder="请输入共同借款人住址（选填）"
                                                    onChange={this.onChange.bind(this, 'commonContactHomeAddress')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="共同借款人单位地址："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("commonContactCompanyAddress", {
                                                initialValue: formData.commonContactCompanyAddress
                                            })(
                                                <Input type="text" className="ant-form-text" id="commonContactCompanyAddress"
                                                    name="commonContactCompanyAddress" placeholder="请输入共同借款人单位地址（选填）"
                                                    onChange={this.onChange.bind(this, 'commonContactCompanyAddress')}/>
                                            )}
                                        </FormItem>
                                    </div>
                                    {/*担保人信息*/}
                                    <FormItem
                                        label="担保人："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("hasGuarantee", {
                                            initialValue: formData.hasGuarantee + "" || undefined
                                        })(
                                            <RadioGroup name="hasGuarantee"
                                                        onChange={this.onChange.bind(this, 'hasGuarantee')}>
                                                <Radio value="1">有</Radio>
                                                <Radio value="0">无</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <div style={{display: formData.hasGuarantee == 1 ? 'block' : 'none'}}>
                                        <FormItem
                                            label="担保人姓名："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("guaranteeRealName", {
                                                initialValue: formData.guaranteeRealName
                                            })(
                                                <Input type="text" className="ant-form-text" id="guaranteeRealName"
                                                    name="guaranteeRealName" placeholder="请输入担保人姓名(选填)"
                                                    onChange={this.onChange.bind(this, 'guaranteeRealName')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="担保人社会关系："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("guaranteeSocialRelation", {
                                                initialValue: formData.guaranteeSocialRelation
                                            })(
                                                <Select placeholder="请选择担保人社会关系(选填)" name="guaranteeSocialRelation" onChange={this.onChangeSelect.bind(this, 'guaranteeSocialRelation')}>
                                                    {socialRelations}
                                                </Select>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="担保人手机号："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("guaranteeMobilePhone", {
                                                initialValue: formData.guaranteeMobilePhone
                                            })(
                                                <Input type="text" className="ant-form-text" id="guarantorPhone"
                                                    name="guaranteeMobilePhone" placeholder="请输入担保人手机号(选填)"
                                                    onChange={this.onChange.bind(this, 'guaranteeMobilePhone')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="担保人身份证号码："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}
                                            required>
                                            {getFieldDecorator("guaranteeCardId", {
                                                initialValue: formData.guaranteeCardId
                                            })(
                                                <Input type="text" className="ant-form-text" id="guaranteeCardId"
                                                    name="guaranteeCardId" placeholder="请输入担保人身份证号码(选填)"
                                                    onChange={this.onChange.bind(this, 'guaranteeCardId')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="担保人座机："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}
                                            required>
                                            {getFieldDecorator("guaranteeTelPhone", {
                                                initialValue: formData.guaranteeTelPhone
                                            })(
                                                <Input type="text" className="ant-form-text" id="guaranteeTelPhone"
                                                    name="guaranteeTelPhone" placeholder="请输入担保人座机(选填)"
                                                    onChange={this.onChange.bind(this, 'guaranteeTelPhone')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="担保人住址："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}
                                            required>
                                            {getFieldDecorator("guaranteeHomeAddress", {
                                                initialValue: formData.guaranteeHomeAddress
                                            })(
                                                <Input type="text" className="ant-form-text" id="guaranteeHomeAddress"
                                                    name="guaranteeHomeAddress" placeholder="请输入担保人住址(选填)"
                                                    onChange={this.onChange.bind(this, 'guaranteeHomeAddress')}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label="担保人单位地址："
                                            labelCol={{span: 6}}
                                            wrapperCol={{span: 18}}>
                                            {getFieldDecorator("guaranteeCompanyAddress", {
                                                initialValue: formData.guaranteeCompanyAddress
                                            })(
                                                <Input type="text" className="ant-form-text" id="guaranteeCompanyAddress"
                                                    name="guaranteeCompanyAddress" placeholder="请输入担保人单位地址（选填）"
                                                    onChange={this.onChange.bind(this, 'guaranteeCompanyAddress')}/>
                                            )}
                                        </FormItem>
                                    </div>
                                    <FormItem
                                        label="贷款期限："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("loanTime", {
                                            initialValue: formData.loanTime
                                        })(
                                            <Input type="text" className="ant-form-text" name="loanTime" addonAfter="期"
                                                placeholder="请输入贷款期限（选填）" onChange={this.onChange.bind(this, 'loanTime')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="贷款金额："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("loanMoney", {
                                            initialValue: formData.loanMoney
                                        })(
                                            <Input type="text" className="ant-form-text" name="loanMoney" addonAfter="元"
                                                placeholder="请输入贷款金额（选填）" onChange={this.onChange.bind(this, 'loanMoney')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="车辆类型："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("autoType", {
                                            initialValue: formData.autoType + "" || undefined
                                        })(
                                            <RadioGroup name="autoType" onChange={this.onChange.bind(this, 'autoType')}>
                                                <Radio value="0">新车</Radio>
                                                <Radio value="1">二手车</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="是否为能源车："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("isNewEnergyCar", {
                                            initialValue: formData.isNewEnergyCar + "" || undefined
                                        })(
                                            <RadioGroup name="isNewEnergyCar" onChange={this.onChange.bind(this, 'isNewEnergyCar')}>
                                                <Radio value="1">是</Radio>
                                                <Radio value="0">否</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="车辆价格："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("autoPrice", {
                                            initialValue: formData.autoPrice
                                        })(
                                            <Input type="text" className="ant-form-text" name="autoPrice" addonAfter="元"
                                                placeholder="请输入车辆价格（选填）" onChange={this.onChange.bind(this, 'autoPrice')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="首付比例："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("firstScale", {
                                            initialValue: this.state.firstScale
                                        })(
                                            <Input type="text" className="ant-form-text" name="firstScale" addonAfter="%"
                                                placeholder="请输入首付比例（选填）" onChange={this.onChange.bind(this, 'firstScale')}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="尾款比例："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("lastScale", {
                                            initialValue: formData.lastScale
                                        })(
                                            <Input type="text" className="ant-form-text" name="lastScale" addonAfter="%"
                                                placeholder="请输入尾款比例（选填）" onChange={this.onChange.bind(this, 'lastScale')}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="车辆品牌："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("autoBrand", {
                                            initialValue: formData.autoBrand
                                        })(
                                            <Input type="text" className="ant-form-text" name="autoBrand" placeholder="请输入车辆品牌（选填）"
                                                onChange={this.onChange.bind(this, 'autoBrand')}/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="车辆型号："
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}>
                                        {getFieldDecorator("autoModel", {
                                            initialValue: formData.autoModel,
                                        })(
                                            <Input type="text" className="ant-form-text" name="autoModel"
                                                placeholder="请输入车辆型号（选填）" onChange={this.onChange.bind(this, 'autoModel')}/>
                                        )}
                                    </FormItem>
                                </div>
                                :
                                <div>
                                    <div className="show_more" onClick={this.showMoreItem.bind(this,"1")}><span></span>高级查询<Icon type="down" theme="outlined" /></div>
                                </div>
                            }
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
                {this.state.previewVisible1?
                <TongDReports
                    data={this.state.tongdunData}
                    closeMoadl = {this.closedata1.bind(this)}
                ></TongDReports>
                :
                ''}
            </div>
        )
    }
}
const riskQueryTd = Form.create()(RiskQueryTd);
export default riskQueryTd;