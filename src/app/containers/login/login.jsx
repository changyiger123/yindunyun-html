import React from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, Input, Button, Icon, message, Row, Col,Checkbox } from "antd";
const FormItem = Form.Item;
import {server_host} from "../../config/apiUrl";//apiUrl地址
import deviceId from '../../utils/deviceId';
import 'whatwg-fetch';
import "./login.less";

import logo from '../../images/logo.png'
import login_bg from '../../images/login_bg.png'

const error = () => {
  message.error("输入信息有误！");
};


export class Login extends React.Component {
    state = {
        imgSrc: server_host+'/code',
        forgetcom: 0,
        isCheckCode: 0
    };
    constructor(props) {
        super(props);
        this.setAliCheck = this.setAliCheck.bind(this);
    };

    componentWillMount() {
     // sessionStorage.clear();
      window.localStorage.removeItem("access_token");
    }
    componentDidMount () {
        this.setAliCheck()
    }

    setAliCheck() {
        var _this = this
        var nc_token = ["FFFF0N00000000007282", (new Date()).getTime(), Math.random()].join(':');
        var NC_Opt =
        {
            renderTo: "#your-dom-id",
            appkey: "FFFF0N00000000007282",
            scene: "nc_login",
            token: nc_token,
            customWidth: 320,
            trans: { "key1": "code0" },
            elementID: ["usernameID"],
            is_Opt: 0,
            language: "cn",
            isEnabled: true,
            timeout: 3000,
            times: 5,
            apimap: {
            // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
            // 'get_captcha': '//b.com/get_captcha/ver3',
            // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
            // 'get_img': '//c.com/get_img',
            // 'checkcode': '//d.com/captcha/checkcode.jsonp',
            // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
            // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
            // 'umid_serUrl': 'https://g.com/service/um.json'
            },
            callback: function (data) {
                window.console && console.log(nc_token)
                window.console && console.log(data.csessionid)
                window.console && console.log(data.sig)
                _this.setState({
                    nc_token: nc_token,
                    csessionid: data.csessionid,
                    sig: data.sig,
                    scene: 'nc_login',
                    isCheckCode: 2
                })
            }
        }
        var nc = new noCaptcha(NC_Opt)
        nc.upLang('cn', {
        _startTEXT: "请按住滑块，拖动到最右边",
        _yesTEXT: "验证通过",
        _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
        _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
        })
    }
    onChange ( field, e) {
        let valStr = e.target.value;
        this.setState({
            [field]: valStr
        })
    }
    go_homepage () {
        window.location.hash="/"
    }
    go_register () {
        window.location.hash="/register"
    }
    getPicImg = () =>{
        this.setState(
            Object.assign({}, {
                imgSrc:server_host+'/code?rnd='+Math.random()
            }),() => console.log(this.state)
        )
    };
    /**
   * 表单提交
   * 详情见antd：https://ant.design/components/form-cn/
   */
    go_login () {
        var _this = this
        var loginData={}
        if(this.state.isCheckCode == 0 || this.state.isCheckCode == 1) {
            this.setState({
                isCheckCode: 1
            })
            return
        }
        if(!this.state.mobilePhone) {
            this.setState({
                mobilePhone_error: '请输入您的手机号码'
            })
            return
        } else if (!this.state.passWord) {
            this.setState({
                password_error: '请输入您的密码'
            })
            return
        }
        loginData.deviceId=deviceId;
        loginData.deviceName="deviceName";
        loginData.sessionId=this.state.csessionid
        loginData.sig=this.state.sig
        loginData.tokenVerify=this.state.nc_token
        loginData.scene='nc_login'
        loginData.mobilePhone=this.state.mobilePhone
        loginData.passWord=this.state.passWord
        fetch(server_host+'/admin/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(function(res) {
            if(res.code=="0"){
                var data=res.data;
                console.log(data);
                localStorage.setItem("access_token",data.admin.token);
                localStorage.setItem('realName',data.admin.mobilePhone);
                localStorage.setItem('mobilePhone',data.admin.mobilePhone);
                localStorage.setItem('storeCode',data.admin.storeCode);
                localStorage.setItem('ucode',data.admin.ucode);
                localStorage.setItem('status',data.status);
                localStorage.setItem('actionsType',data.admin.actionsType);
                // if (data.status == 0) {
                //     window.location.hash = "/enterpriseInfo";
                // } else if (data.status == 1) {
                //     window.location.hash = "/registerAlready";
                // } else if (data.status == 2) {
                    window.location.hash = "/riskQuery";
                // } else if (data.status == 3) {
                //     window.location.hash = "/registerAlreadyFail";
                // }
            }else if (res.code=="811") {
                _this.setState({
                    other_error: '',
                    password_error: res.msg,
                    mobilePhone_error: '',
                })
            }else if (res.code=="810"||res.code=="805"||res.code=="826"||res.code=="831") {
                _this.setState({
                    other_error: '',
                    mobilePhone_error: res.msg,
                    password_error: ''
                })
            }else{
                _this.setState({
                    other_error: res.msg,
                    mobilePhone_error: '',
                    password_error: ''
                })
            }
            _this.setState({
                isCheckCode: 0
            })
            _this.setAliCheck()
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        var imgSrc = this.state.imgSrc;
        return (
            <div className="login-container">
                <header className="common-header" style={{background:"rgba(245,248,255,1)"}}>
                    <img className="logo1" src={logo} alt="" onClick={this.go_homepage.bind(this)}/>
                    <div className="go-login">没有账号, <span onClick={this.go_register.bind(this)}>立即注册</span></div>
                </header>
                {/* <div className="login-mask" /> */}
                <Form style={{height:"calc(100% - 80px)"}} className="login-content" layout="horizontal" onSubmit={this.handleSubmit} >
                    <div className="login_box">
                        <img className="login_bg" src={login_bg} alt="bg"/>
                        <div className="inner_login">
                            <h2>欢迎登录银盾云</h2>
                            <div className="account_info">
                                <Input maxLength="11" onChange={this.onChange.bind(this, 'mobilePhone')} name="mobilePhone" className="login-input" placeholder="请输入手机号" />
                            </div>
                            <div className="error_account">{this.state.mobilePhone_error}</div>
                            <div className="account_info">
                                <Input name="passWord" onChange={this.onChange.bind(this, 'passWord')} className="login-input" type="password" placeholder="请输入登录密码" />
                            </div>
                            <div className="error_account">{this.state.password_error}</div>
                            <div id="your-dom-id" className="alicheck nc-container"></div>
                            {this.state.isCheckCode==1?
                            <div className="code-warning">请按住滑块，拖到最右边！</div>
                            :
                            ''
                            }
                            <div className="account_info">
                                <Button type="primary" onClick={this.go_login.bind(this)} className="login-form-button">登录</Button>
                            </div>
                            <div className="error_account">{this.state.other_error}</div>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      dispatch
    },
    dispatch
  )
});

export default Form.create()(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
