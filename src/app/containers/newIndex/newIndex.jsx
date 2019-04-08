import React, { Component } from 'react'
import {Input, Button, Checkbox, message} from 'antd'
import ajax from '../../utils/ajax'
// import { Link } from 'react-router-dom'
import './newIndex.less'
import banner_msg from '../../images/banner_msg.png'
import logo from '../../images/logo01.png'
import camera from '../../images/camera.png'
import threshold from '../../images/threshold.png'
import file from '../../images/file.png'
import credit_risk from '../../images/credit_risk.png'
import do_risk from '../../images/do_risk.png'
import inner_risk from '../../images/inner_risk.png'
import msg_risk from '../../images/msg_risk.png'
import consumption_risk from '../../images/consumption_risk.png'
import service from '../../images/service.png'
import efficiency from '../../images/efficiency.png'
import used from '../../images/used.png'
import user from '../../images/user.png'
import cooperation from '../../images/cooperation.png'
import before03 from '../../images/before03.png'
import after03 from '../../images/after03.png'
import app03 from '../../images/app03.png'

class Home extends Component {
    state = {
        risk_type: 1,
        isLogin: false,
        userNumber: undefined,
        checked: false,
        reciprocal: 0,
        set_code_words: '发送验证码',
        doSet: false,
        mobile_errorMsg: '',
        code_errorMsg: '',
        password_errorMsg: '',
        isOut: false,
        common_error_msg: ''
    }
    componentWillMount () {
        if (!window.localStorage.getItem("access_token")) {
        } else {
            this.setState({
                userNumber: window.localStorage.getItem("mobilePhone"),
                isLogin: true
            })
        }
        var _this = this
        $(function() {
            //滚动条滚动到指定位置触发下面事件
            $(window).scroll(function(){
                if ($(window).scrollTop() > 830 && _this.state.isOut == false){
                    _this.setState({
                        isOut : true
                    })
                    $('.footer').show().animate({bottom:"0"},500);
                }else if ($(window).scrollTop() < 830 && _this.state.isOut == true) {
                    _this.setState({
                        isOut : false
                    })
                    $('.footer').animate({bottom:"-80px"},500,function() {
                        $('.foot').hide()
                    });
                }
            })
        });
    }
    componentDidMount () {
        particlesJS('particles-js', {
            particles: {
              color: '#fff',
              shape: 'circle', // "circle", "edge" or "triangle"
              opacity: 1,
              size: 4,
              size_random: true,
              nb: 150,
              line_linked: {
                enable_auto: true,
                distance: 100,
                color: '#fff',
                opacity: 1,
                width: 1,
                condensed_mode: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 600
                }
              },
              anim: {
                enable: true,
                speed: 1
              }
            },
            interactivity: {
              enable: true,
              mouse: {
                distance: 300
              },
              detect_on: 'canvas', // "canvas" or "window"
              mode: 'grab',
              line_linked: {
                opacity: .5
              },
              events: {
                onclick: {
                  enable: true,
                  mode: 'push', // "push" or "remove"
                  nb: 4
                }
              }
            },
            /* Retina Display Support */
            retina_detect: true
          });
    }
    onChange ( field, e) {
        let valStr = e.target.value;
        this.setState({
            [field]: valStr
        })
        if([field] == "code") {
            this.setState({
                code_errorMsg: ''
            })
        }
    }

    changeRisk(i, e) {
        this.setState({
            risk_type: i
        })
    }
    set_code () {
        var _this = this
        var test = /^1[34578]\d{9}$/
        var result = test.test(this.state.mobile)
        if(!result) {
            this.setState({
                mobile_errorMsg: '请输入正确的手机号码'
            })
            return
        }
        if(this.state.doSet) {
            return
        }
        this.setState({
            doSet: true
        })
        ajax.post("/admin/register/getMobileCode",{mobile: this.state.mobile})
        .then(response => {
            if(response.code == "0") {
                _this.setState({
                    reciprocal: 60
                },()=>{
                    _this.setState({
                        set_code_words: _this.state.reciprocal+'s后重新发送'
                    })
                })
                var timer = setInterval(function () {
                    _this.setState({reciprocal: _this.state.reciprocal - 1},()=>{
                        _this.setState({
                            set_code_words: _this.state.reciprocal+'s后重新发送'
                        })
                    })
                    if(_this.state.reciprocal == 0) {
                        clearInterval(timer)
                        _this.setState({
                            set_code_words:'重新发送验证码'
                        })
                    }
                },1000)
            }else if(response.code == "704"){
                _this.setState({
                    code_errorMsg: response.msg
                })
            }else if(response.code == "813"){
                _this.setState({
                    mobile_errorMsg: response.msg
                })
            }else {
                _this.setState({
                    common_error_msg: response.msg
                })
            }
            _this.setState({
                doSet: false
            })
        });
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

    doCheck = (e) => {
        this.setState({
            checked: e.target.checked,
            common_error_msg: ''
        })
    }
    submit_rig () {
        var _this = this
        if (!this.state.checked) {
            this.setState({
                common_error_msg: '请阅读并勾选《银盾云网站服务条款》'
            })
            return
        } else if (!this.state.mobile) {
            this.setState({
                mobile_errorMsg: '请输入正确的手机号码'
            })
            return
        } else if (!this.state.code) {
            this.setState({
                code_errorMsg: '请输入手机验证码'
            })
            return
        } else if (!this.state.password) {
            this.setState({
                password_errorMsg: '请输入密码'
            })
            return
        }
        var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{0,20}$/
        if(!reg.test(this.state.password)) {
            this.setState({
                password_errorMsg: '密码不合规'
            })
            return
        }else if (this.state.password && this.state.password.length<6) {
            this.setState({
                password_errorMsg: '密码长度太短'
            })
            return
        }
        ajax.post("/admin/register/enterprise/register",{mobile: this.state.mobile, password: this.state.password, code: this.state.code, deviceId: "deviceId", deviceName: "deviceName"})
        .then(response => {
            if(response.code == "0") {
                localStorage.setItem("access_token",response.data.token);
                localStorage.setItem('realName',response.data.mobilePhone);
                localStorage.setItem('mobilePhone',response.data.mobilePhone);
                localStorage.setItem('storeCode',response.data.storeCode);
                window.location.hash = '/enterpriseInfo'
            }else if(response.code == "701"){
                _this.setState({
                    code_errorMsg: response.msg
                })
            }else if(response.code == "703"){
                _this.setState({
                    code_errorMsg: response.msg
                })
            }else if(response.code == "813"){
                _this.setState({
                    mobile_errorMsg: response.msg
                })
            }else {
                _this.setState({
                    common_error_msg: response.msg
                })
            }
        });
    }
    onBlur (e) {
        var test = /^1[34578]\d{9}$/
        var result = test.test(e.target.value)
        if (!result) {
            this.setState({
                mobile_errorMsg: '请输入正确的手机号码'
            })
        } else {
            this.setState({
                mobile_errorMsg: ''
            })
        }
    }
    password_blur () {
        var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{0,20}$/
        if(this.state.password && !reg.test(this.state.password)) {
            this.setState({
                password_errorMsg: '密码不合规'
            })
        }else if (this.state.password && this.state.password.length<6) {
            this.setState({
                password_errorMsg: '密码长度太短'
            })
        } else {
            this.setState({
                password_errorMsg: ''
            })
        }
    }

    openBase () {
    }
    go_servicePage() {
        window.location.hash="/servicePage"
    }
    go_aboutPage() {
        window.location.hash="/aboutPage"
    }
    render() {
        const risk_info=[
            {
                risk_title: '信用风险',
                risk_msg: '提供全周期的风控服务，一站式满足贷前、贷中、贷后的风控需要，甄别借款人是否曾经在公安机关、法院、银行、运营商、学校、信贷机构、消费金融等出现过不良信用记录，帮助机构筛选出优质目标人群。对用户多方信用风险评级，生成用户信用风险数据报告。',
                risk_img: credit_risk
            },
            {
                risk_title: '信息风险',
                risk_msg: '从身份证、手机号、银行卡、流水等多个维度，多维度分析个人基本信息，发现身份证、手机号、银行卡等存在的情况异常和既存风险，帮助机构节约人力和时间成本。',
                risk_img: msg_risk
            },{
                risk_title: '行为风险',
                risk_msg: '依托银盾云海量数据，从申请人的身份证、手机号码、移动设备、使用习惯、欺诈特征、申贷行为等全方位解读借款人是否存在养号码、养备用机、白户骗贷、连续借款、高频换号等不正常行为，从而帮助金融机构避免这类老大难骗贷问题。',
                risk_img: do_risk
            },{
                risk_title: '内部风险',
                risk_msg: '使用更个性的评分机制，评分阈值自由定制，深度贴合业务逻辑。为行业提供参考分值和相关等级评测，可以有效提高效率，为规范化管理提供合理化建议报告。',
                risk_img: inner_risk
            },{
                risk_title: '消费风险',
                risk_msg: '依托银盾云海量数据，从申请人的身份证、手机号、银行卡等信息，生成通讯行为画像和消费画像，为用户提供多维度的测评分数和评估依据，精确的筛选出优质目标人群。',
                risk_img: consumption_risk
            },
        ]
        return (
            <div className="home">
                <div className="home-bg">
                    <div className="home-banner">
                        <div id="particles-js"></div>
                    </div>
                    <div className="quick-register-bg"></div>
                    <div className="some-risk-bg"></div>
                    <div className="high-efficiency-bg"></div>
                    <div className="cooperation-bg"></div>
                    {!this.state.isLogin?
                    <div className="foot-bg2"></div>
                    :''}
                </div>
                <div className="home-inner">
                    <header className="home-header">
                        <img className="logo1" src={logo} alt="logo"/>
                        <div className="page_box">
                            <div className="index_page_btn active">
                                <div>首页</div>
                            </div>
                            <div onClick={this.go_servicePage.bind(this)} className="service_page_btn">
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
                    <div className="banner-msg">
                        <img src={banner_msg} alt="banner"/>
                        <div className="sth-msg">
                            <h2>多场景的金融数据服务</h2>
                            <p>对全网多渠道风险数据整合建模，构建以金融大数据为核心的数据决策平台，以帮助金融机构简化审批流程、降低人力成本、降低客户违约风险并降低资金交易成本。</p>
                        </div>
                    </div>
                    <div className="home-content">
                        <div className="quick-register">
                            <ul className="advantage">
                                <li>
                                    <img src={camera} alt="camera" />
                                    <div>
                                        <h3>即查即得</h3>
                                        <p>1分钟极速查询结果</p>
                                    </div>
                                </li>
                                <li>
                                    <img src={file} alt="file" />
                                    <div>
                                        <h3>全面立体</h3>
                                        <p>解决白户、伪造等疑难问题</p>
                                    </div>
                                </li>
                                <li>
                                    <img src={threshold} alt="threshold" />
                                    <div>
                                        <h3>0门槛</h3>
                                        <p>极低的准入门槛</p>
                                    </div>
                                </li>
                            </ul>
                            {this.state.isLogin?
                            <div className="sign-in">
                                <img src={used} alt="used" />
                                <div>
                                    <h3>一键查询风控报告</h3>
                                    <p>按次查询 长效数据 低门槛</p>
                                    <Button onClick={this.go_searchRisk.bind(this)} type="primary" style={{width:"380px", height:"48px", marginTop:"18px", marginBottom:"18px"}}>立即查询</Button>
                                </div>
                            </div>
                            :
                            <div className="quick-body">
                                <div className="quick-title">一分钟注册银盾云</div>
                                <Input maxLength="11" placeholder="请输入手机号" onBlur={this.onBlur.bind(this)} onChange={this.onChange.bind(this, 'mobile')} value={this.state.mobile} style={{height:"48px"}}/>
                                <div className="verification-code">
                                    <Input placeholder="请输入验证码" onChange={this.onChange.bind(this, 'code')} value={this.state.code} style={{width:"280px", height:"48px", float:"left", marginRight:"10px"}}/>
                                    <Button type="primary" disabled={this.state.reciprocal} onClick={this.set_code.bind(this)} style={{width:"140px", height:"48px", float:"left"}}>{this.state.set_code_words}</Button>
                                    {this.state.mobile_errorMsg?
                                    <div className="mobile-error-msg">*{this.state.mobile_errorMsg}</div>
                                    :''}
                                    {this.state.code_errorMsg?
                                    <div className="code-error-msg">*{this.state.code_errorMsg}</div>
                                    :''}
                                    {this.state.password_errorMsg?
                                    <div className="password-error-msg">*{this.state.password_errorMsg}</div>
                                    :''}
                                </div>
                                <Input placeholder="请输入登录密码" maxLength="20" onBlur={this.password_blur.bind(this)} onChange={this.onChange.bind(this, 'password')} value={this.state.password} type="password" style={{height:"48px"}}/>
                                <Button onClick={this.submit_rig.bind(this)} type="primary" style={{width:"430px", height:"48px", marginTop:"18px", marginBottom:"18px"}}>同意条款并注册</Button>
                                <Checkbox onChange={this.doCheck.bind(this)} checked={this.state.checked}>我已同意并阅读<a style={{color:"#1890ff"}} target="_brank" href="/#/registerAgreement">银盾云网站服务条款</a>和<a style={{color:"#1890ff"}} target="_brank" href="/#/legalDeclaration">法律声明及隐私权政策</a></Checkbox>
                                {this.state.common_error_msg?
                                    <div className="error_msg_common">*{this.state.common_error_msg}</div>
                                    :
                                    ''
                                }
                            </div>
                            }
                        </div>
                        <div className="some-risk div_md">
                            <h2 className="risk-title">多种查询工具识别5大风险</h2>
                            <div className="risk-content">
                                <ul className="risk-tabs">
                                    <li onMouseOver={this.changeRisk.bind(this, 1)} className={this.state.risk_type===1?'active': ''}>信用风险</li>
                                    <li onMouseOver={this.changeRisk.bind(this, 2)} className={this.state.risk_type===2?'active': ''}>信息风险</li>
                                    <li onMouseOver={this.changeRisk.bind(this, 3)} className={this.state.risk_type===3?'active': ''}>行为风险</li>
                                    <li onMouseOver={this.changeRisk.bind(this, 4)} className={this.state.risk_type===4?'active': ''}>内部风险</li>
                                    <li onMouseOver={this.changeRisk.bind(this, 5)} className={this.state.risk_type===5?'active': ''}>消费风险</li>
                                </ul>
                                <div className="risk-msg">
                                    <h3>{risk_info[this.state.risk_type-1].risk_title}</h3>
                                    <div>{risk_info[this.state.risk_type-1].risk_msg}</div>
                                </div>
                                <img src={risk_info[this.state.risk_type-1].risk_img} alt="risk_img" />
                            </div>
                        </div>
                        <div className="high-efficiency">
                            <h2 className="high-efficiency-title">银盾云省时省力 高效低价</h2>
                            <div className="high-efficiency-content">
                                <div>传统风控系统 VS 银盾云系统</div>
                                <img src={efficiency} alt="efficiency" />
                            </div>
                        </div>
                        <div className="cooperation">
                            <div className="cooperation-title">战略合作伙伴</div>
                            <div className="cooperation-box">
                                <img src={cooperation} alt="" />
                            </div>
                            <div className="web_msg">
                                <div className="cus_tel">客服电话：0571-87328250 (工作日09:00-21:00)</div>
                                <div className="web_code">浙ICP备18046114号</div>
                            </div>
                        </div>
                        {!this.state.isLogin?
                        <footer className="footer">
                            <div className="foot-box">
                                <span>一分钟快速注册 立享精准风控报告</span>
                                <Button type="primary" onClick={this.go_register.bind(this)} style={{width:"140px", height:"46px", fontWeight:"500", fontSize:"16px"}}>立即注册</Button>
                            </div>
                        </footer>
                        :
                        ''
                        }
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

export default Home;
