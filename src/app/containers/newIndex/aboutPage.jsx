import React, { Component } from 'react'
import {Input, Button, Checkbox, message} from 'antd'
// import { Link } from 'react-router-dom'
import './newIndex.less'
import logo from '../../images/logo.png'
import user from '../../images/user_active.png'
import company_profile from '../../images/company_profile.png'
import mission from '../../images/mission.png'
import company_map from '../../images/company_map.png'
import sell_before from '../../images/sell_before.png'
import sell_after from '../../images/sell_after.png'
import before03 from '../../images/before03.png'
import after03 from '../../images/after03.png'
import app03 from '../../images/app03.png'

class About extends Component {
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
    mouseover (i, e) {
        this.setState({
            active_report: i
        })
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
    go_servicePage() {
        window.location.hash="/servicePage"
    }
    go_homePage() {
        window.location.hash="/"
    }
    render() {
        return (
            <div className="home">
                <div className="header_warp2">
                    <header className="home-header">
                        <img className="logo1" src={logo} alt="logo"/>
                        <div className="page_box">
                            <div onClick={this.go_homePage.bind(this)} className="index_page_btn">
                                <div>首页</div>
                            </div>
                            <div onClick={this.go_servicePage.bind(this)} className="service_page_btn">
                                <div>产品与服务</div>
                            </div>
                            <div className="about_page_btn active">
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
                            <div className="register-btn" onClick={this.go_register.bind(this)} style={{"color":"#031B4E"}}>注册</div>
                        </div>
                        }
                    </header>
                </div>
                <div className="about_content">
                    <div className="left_tabs">
                        <div onMouseOver={this.mouseover.bind(this,1)} className={this.state.active_report == 1?"about_tab active":"about_tab"}>公司简介</div>
                        <div onMouseOver={this.mouseover.bind(this,2)} className={this.state.active_report == 2?"about_tab active":"about_tab"}>企业文化</div>
                        <div onMouseOver={this.mouseover.bind(this,3)} className={this.state.active_report == 3?"about_tab active":"about_tab"}>联系我们</div>
                    </div>
                    <div className="right_page">
                        {this.state.active_report == 1?
                        <div className="about_page1">
                            <p>杭州微云开呗科技有限公司成立于2017年6月，总部位于浙江杭州，旗下独立自主研发的银盾云大数据风控系统于2018年12月21日正式上线。银盾云基于数亿级权威数据源的调用，并结合线上、线下海量数据构建场景化及智能化的信用风险体系，涵盖了反欺诈、黑名单、信用评级、贷后监控、白户骗贷等风控服务。 </p>
                            <p>银盾云坚持以开放和共享为经营理念，依托微云开呗大数据实验室及权威平台数据对接，专注于打造国内领先的一站式掌上大数据风险管理服务商，通过灵活的模块配置，打造整体及定制化风控解决方案，帮助客户低成本搭建风控系统，快速缩短业务流程，提升企业风控效率，不断满足汽车金融、消费金融、小额信贷、现金贷、供应链金融等多场景的风控需求。 </p>
                            <img src={company_profile} />
                        </div>
                        :''}
                        {this.state.active_report == 2?<div className="about_page2">
                            <div className="about_item">
                                <div className="item_title">YINDUN文化</div>
                                <ul className="item_content">
                                    <li className="yonth">
                                        <div className="li_left">活力四射</div>
                                        <div className="li_right">我们的激情和速度从未熄灭，旺盛的生命力不断焕发出新的活力，斗志昂扬，开启新的征程。 </div>
                                    </li>
                                    <li className="innovation">
                                        <div className="li_left">创新不息</div>
                                        <div className="li_right">致力于模式创新、技术创新、产品创新和业务创新，以创新的意识、创新的精神、创新的思路去工作。 </div>
                                    </li>
                                    <li className="normalizing">
                                        <div className="li_left">严格标准</div>
                                        <div className="li_right">严格指定标准化流程，快速反应，合理分工，相互配合，及时沟通。</div>
                                    </li>
                                    <li className="duty">
                                        <div className="li_left">践行责任</div>
                                        <div className="li_right">重契约，守信用，敢承担，将责任融入企业成长，积极参与各项社会公益事业，将责任融入社会发展，帮助更多需要帮助的人。 </div>
                                    </li>
                                    <li className="unity">
                                        <div className="li_left">团结一致</div>
                                        <div className="li_right">没有完美的个人只有完美的团队，积极融入团队，有大局观，相信伙伴，能与其他团队相互配合，共同达成目标。 </div>
                                    </li>
                                    <li className="never_give_up">
                                        <div className="li_left">永不服输</div>
                                        <div className="li_right">一心一意干好一件事情, 看准目标向前冲, 坚持不懈，永不言弃，坚持为客户创造价值，为员工创造机会，为社会创造财富。</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="about_item">
                                <div className="item_title">我们的使命与愿景</div>
                                <div className="item_content2">
                                    <img src={mission} />
                                    <div>
                                        <div>
                                            <h3>我们的使命</h3>
                                            <div>坚持让合作伙伴“放心”“安心”“省心”为奋斗使命，持续完善产品，提升服务品质，追求极致体验，为客户创造持久价值。 </div>
                                        </div>
                                        <div>
                                            <h3>我们的愿景</h3>
                                            <div>打造无风险的掌上数字智能世界，让天下没有复杂的风控。 </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :''}
                        {this.state.active_report == 3?<div className="about_page3">
                            <div>
                                <div>
                                    <h3>公司地址</h3>
                                    <div>杭州江干区城星路59号东杭大厦15楼</div>
                                </div>
                                <div>
                                    <h3>电话咨询</h3>
                                    <div>0571-87328260</div>
                                </div>
                                <div>
                                    <h3>邮箱咨询</h3>
                                    <div>市场合作：marketing@yinduncloud.com<br/>技术支持：supporting@yinduncloud.com</div>
                                </div>
                                <div>
                                    <h3>售前售后咨询</h3>
                                    <div className="call_box">
                                        <div>
                                            <img src={sell_before} />
                                            <div>售前服务</div>
                                        </div>
                                        <div>
                                            <img src={sell_after} />
                                            <div>售后服务</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img src={company_map} />
                        </div>
                        :''}
                    </div>
                </div>
                <div className="tool_bar">
                    <div className="tool_item">
                        <div className="tool1">
                            <img src={before03}/>
                        </div>
                    </div>
                    <div className="tool_item">
                        <div className="tool2">
                            <img src={after03}/>
                        </div>
                    </div>
                    <div className="tool_item">
                        <div className="tool3">
                            <img src={app03}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
