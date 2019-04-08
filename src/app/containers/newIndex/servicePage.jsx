import React, { Component } from 'react'
import {Input, Button, Checkbox, message} from 'antd'
// import { Link } from 'react-router-dom'
import './newIndex.less'
import logo from '../../images/logo01.png'
import user from '../../images/user.png'
import service_banner from '../../images/service_banner.png'
import td_report from '../../images/td_report.png'
import v3_report from '../../images/v3_report.png'
import equipment_report from '../../images/equipment_report.png'
import usedCar_report from '../../images/usedCar_report.png'
import bankFlow_report from '../../images/bankFlow_report.png'
import invoiceInspection_report from '../../images/invoiceInspection_report.png'
import licensInspection_report from '../../images/licensInspection_report.png'
import vehicleViolation_report from '../../images/vehicleViolation_report.png'
import liabilities from '../../images/liabilities.png'
import continuous_lending from '../../images/continuous_lending.png'
import dishonest from '../../images/dishonest.png'
import overdue_blacklist from '../../images/overdue_blacklist.png'
import information_forgery from '../../images/information_forgery.png'
import loan_fraud from '../../images/loan_fraud.png'
import reserve_machine from '../../images/reserve_machine.png'
import change_sign from '../../images/change_sign.png'

class Home extends Component {
    state = {
        isLogin: false,
        userNumber: undefined,
        active_report: 1
    }
    componentWillMount () {
        if (!window.localStorage.getItem("access_token")) {
        } else {
            this.setState({
                userNumber: window.localStorage.getItem("mobilePhone"),
                isLogin: true
            })
        }
    }
    componentDidMount () {
        
    }
    go_login () {
        window.location.hash = "/login";
    }
    go_register () {
        window.location.hash = "/register"
    }

    logout () {
        window.location.hash="/login"
    }
    go_searchRisk () {
        window.location.hash="/riskQuery"
    }
    go_homePage() {
        window.location.hash="/"
    }
    go_aboutPage() {
        window.location.hash="/aboutPage"
    }
    change_report (i,e) {
        this.setState({
            active_report: i
        })
    }
    openReport(i,e) {
        if(i == "1") {
            window.open('https://static.yinmimoney.com/yinmi/yindunyunReport/usedCarReport.html');
        }else if (i == "2") {
            window.open('https://static.yinmimoney.com/yinmi/yindunyunReport/violationReport.html');
        }else if (i == "3") {
            window.open('https://static.yinmimoney.com/yinmi/yindunyunReport/licenseReport.html');
        }else if (i == "4") {
            window.open('https://static.yinmimoney.com/yinmi/yindunyunReport/bankFlowReport.html');
        }else if (i == "5") {
            window.open('https://static.yinmimoney.com/yinmi/yindunyunReport/invoiceReport.html');
        }else if (i == "6") {
            window.open('https://static.yinmimoney.com/yinmi/yindunyunReport/equipmentReport.html');
        }else if (i == "7") {
            window.open('https://static.yinmimoney.com/yinmi/yindunyunReport/bigDataReport.html');
        }else if (i == "8") {
            window.open('https://static.yinmimoney.com/yinmi/yindunyunReport/dimensionReport.html');
        }
    }
    render() {
        return (
            <div className="home">
                <div className="header_warp">
                    <header className="home-header">
                        <img className="logo1" src={logo} alt="logo"/>
                        <div className="page_box">
                            <div onClick={this.go_homePage.bind(this)} className="index_page_btn">
                                <div>首页</div>
                            </div>
                            <div className="service_page_btn active">
                                <div>产品与服务</div>
                            </div>
                            <div onClick={this.go_aboutPage.bind(this)} className="about_page_btn">
                                <div>关于我们</div>
                            </div>
                        </div>
                        {this.state.isLogin?
                        <div className="top-button">
                            <div className="login-btn" onClick={this.go_searchRisk.bind(this)}>操作台</div>
                            <div className="login-msg">
                                <img src={user} alt="user" />
                                <span>{this.state.userNumber}, <label onClick={this.logout.bind(this)}>退出</label></span>
                            </div>
                        </div>
                        :
                        <div className="top-button">
                            <div className="login-btn" onClick={this.go_login.bind(this)}>登录</div>
                            <div className="register-btn" onClick={this.go_register.bind(this)}>注册</div>
                        </div>
                        }
                    </header>
                    <div className="service_banner">
                        <img className="service_banner_pic" src={service_banner} />
                        <div className="service_msg">
                            <h3>大数据风控解决方案</h3>
                            <ul>
                                <li><i></i>多维度反欺诈查询</li>
                                <li><i></i>大数据防控查询</li>
                                <li><i></i>行为画像分析</li>
                                <li><i></i>其他相关信息查验</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="content_warp">
                    <div className="content_item">
                        <h3>多维度反欺诈报告</h3>
                        <div className="item_normal">
                            <div className="item_normal_left">
                                <img src={td_report} />
                                <div onClick={this.openReport.bind(this,'8')}>查看示例报告</div>
                            </div>
                            <div className="item_normal_right">
                                <div className="production_details">
                                    <h3>产品简介</h3>
                                    <div>通过信息三要素（姓名、身份证号、手机号），一键查询当事人的各项信贷风险信息，包括三要素是否一致、多头借贷查询、公安涉案信息查询等，多维度评定反欺诈综合风险，生成用户信用风险数据报告，帮助企业机构筛选出优质目标人群。 </div>
                                </div>
                                <div className="production_details">
                                    <h3>产品优势</h3>
                                    <div>权威数据源、极简设计、即查即用、起充门槛低、性价比高</div>
                                </div>
                                <div className="production_details">
                                    <h3>应对风险</h3>
                                    <ul>
                                        <li>
                                            <img src={liabilities} />
                                            <div>多头负债</div>
                                        </li>
                                        <li>
                                            <img src={continuous_lending} />
                                            <div>连续借款</div>
                                        </li>
                                        <li>
                                            <img src={dishonest} />
                                            <div>失信人员</div>
                                        </li>
                                        <li>
                                            <img src={overdue_blacklist} />
                                            <div>逾期黑名单</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content_warp" style={{background:"#F3F5F9"}}>
                    <div className="content_item">
                        <h3>大数据防控报告</h3>
                        <div className="item_normal">
                            <div className="item_normal_left">
                                <img src={v3_report} />
                                <div onClick={this.openReport.bind(this,'7')}>查看示例报告</div>
                            </div>
                            <div className="item_normal_right">
                                <div className="production_details">
                                    <h3>产品简介</h3>
                                    <div>通过信息三要素（姓名、身份证号、手机号），一键查询当事人的基本信息，社交通讯行为，黑名单查询等，依托银盾云海量数据挖掘，结合业务场景可实现独立有效的风险防控支持，帮助企业机构节约人力成本和时间成本。</div>
                                </div>
                                <div className="production_details">
                                    <h3>产品优势</h3>
                                    <div>权威数据源、极简设计、即查即用、起充门槛低、性价比高</div>
                                </div>
                                <div className="production_details">
                                    <h3>应对风险</h3>
                                    <ul>
                                        <li>
                                            <img src={information_forgery} />
                                            <div>信息伪造</div>
                                        </li>
                                        <li>
                                            <img src={loan_fraud} />
                                            <div>白户骗贷</div>
                                        </li>
                                        <li>
                                            <img src={reserve_machine} />
                                            <div>养备用机</div>
                                        </li>
                                        <li>
                                            <img src={change_sign} />
                                            <div>高频换号</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content_warp">
                    <div className="content_item">
                        <h3>行为画像分析</h3>
                        <div className="item_normal">
                            <div className="item_normal_left">
                                <img src={equipment_report} />
                                <div onClick={this.openReport.bind(this,'6')}>查看示例报告</div>
                            </div>
                            <div className="item_normal_right">
                                <div className="production_details">
                                    <h3>产品简介</h3>
                                    <div>通过输入手机号，一键查询当事人手机设备的基本信息和APP活跃度，生成通讯行为画像和消费画像，为用户提供更多的评估依据，从而更精确地做好风险防范。 </div>
                                </div>
                                <div className="production_details">
                                    <h3>产品优势</h3>
                                    <div>权威数据源、极简设计、即查即用、起充门槛低、性价比高</div>
                                </div>
                                <div className="production_details">
                                    <h3>应对风险</h3>
                                    <ul>
                                        <li>
                                            <img src={information_forgery} />
                                            <div>信息伪造</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content_warp" style={{background:"#F3F5F9"}}>
                    <div className="content_item">
                        <h3>其他相关信息查验</h3>
                        <div className="item_normal">
                            <div className="item_normal_left">
                                <img src={this.state.active_report == 1?usedCar_report:this.state.active_report == 2?vehicleViolation_report:this.state.active_report == 3?licensInspection_report:this.state.active_report == 4?bankFlow_report:invoiceInspection_report} />
                                <div onClick={this.openReport.bind(this,this.state.active_report)}>查看示例报告</div>
                                <ul>
                                    <li onMouseOver={this.change_report.bind(this,1)} className={this.state.active_report == 1?"active":""}></li>
                                    <li onMouseOver={this.change_report.bind(this,2)} className={this.state.active_report == 2?"active":""}></li>
                                    <li onMouseOver={this.change_report.bind(this,3)} className={this.state.active_report == 3?"active":""}></li>
                                    <li onMouseOver={this.change_report.bind(this,4)} className={this.state.active_report == 4?"active":""}></li>
                                    <li onMouseOver={this.change_report.bind(this,5)} className={this.state.active_report == 5?"active":""}></li>
                                </ul>
                            </div>
                            <div className="item_normal_right">
                                <div className="production_details">
                                    <h3>产品简介</h3>
                                    <div>包含二手车档案查询、车辆违章查询、驾驶证查验、银行流水验真、发票查验等功能，可上传车牌号、驾驶证、银行卡号、发票等信息进行核验，帮助企业机构最快速地甄别用户资料的真伪。 </div>
                                </div>
                                <div className="production_details">
                                    <h3>产品优势</h3>
                                    <div>权威数据源、极简设计、即查即用、起充门槛低、性价比高</div>
                                </div>
                                <div className="production_details">
                                    <h3>应对风险</h3>
                                    <ul>
                                        <li>
                                            <img src={information_forgery} />
                                            <div>信息伪造</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
