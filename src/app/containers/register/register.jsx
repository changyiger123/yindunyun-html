import React, { Component } from 'react'
import './register.less'
import {Input, Button, Checkbox, Popover, message} from 'antd'
import ajax from '../../utils/ajax'

import logo from '../../images/logo.png'
import steps01 from '../../images/steps01.png'

class Register extends Component {
    state = {
        true_mobile: '',
        reciprocal: 0,
        set_code_words: '发送验证码',
        code_errorMsg: '',
        password_errorMsg: '',
        common_error_msg: '',
        password: '',
        doSet: false
    }
    openBase () {
        alert(1)
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

    go_login () {
        window.location.hash="/login"
    }
    go_homepage () {
        window.location.hash="/"
    }

    set_code () {
        var _this = this
        var test = /^1[34578]\d{9}$/
        var result = test.test(this.state.mobile)
        if(!result) {
            this.setState({
                true_mobile: '请输入正确的手机号码'
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
                })
                var timer = setInterval(function () {
                    _this.setState({reciprocal: _this.state.reciprocal - 1,set_code_words:'重新发送验证码'})
                    if(_this.state.reciprocal == 0) {
                        clearInterval(timer)
                    }
                },1000)
            }else if(response.code == "704"){
                _this.setState({
                    code_errorMsg: response.msg
                })
            }else if(response.code == "813"){
                _this.setState({
                    true_mobile: response.msg
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
    submit_rig () {
        var _this = this
        if (!this.state.checked) {
            this.setState({
                common_error_msg: '请阅读并勾选《银盾云网站注册协议》'
            })
            return
        } else if (!this.state.mobile) {
            this.setState({
                true_mobile: '请输入正确的手机号码'
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
        } else if (!this.state.password_r) {
            this.setState({
                password_errorMsg2: '请再次输入密码'
            })
            return
        }else if (this.state.password != this.state.password_r) {
            return
        }else if (this.state.password.length<6) {
            return
        }
        // var reg = /^((?=.*\d)(?=.*[A-z_])|(?=.*[A-z])(?=.*_))\w*$/
        var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$/
        if(!reg.test(this.state.password)) {
            return
        }
        ajax.post("/admin/register/enterprise/register",{mobile: this.state.mobile, password: this.state.password, code: this.state.code, deviceId: "deviceId", deviceName: "deviceName"})
        .then(response => {
            if(response.code == "0") {
                localStorage.setItem("access_token",response.data.token);
                localStorage.setItem('realName',response.data.mobilePhone);
                localStorage.setItem('mobilePhone',response.data.mobilePhone);
                localStorage.setItem('storeCode',response.data.storeCode);
                localStorage.setItem('status',response.data.status);
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
                    true_mobile: response.msg
                })
            }else {
                _this.setState({
                    common_error_msg: response.msg
                })
            }
        });
    }
    doCheck = (e) => {
        this.setState({
            checked: e.target.checked,
            common_error_msg: ''
        })
    }
    onBlur (e) {
        var test = /^1[34578]\d{9}$/
        var result = test.test(e.target.value)
        if (!result) {
            this.setState({
                true_mobile: '请输入正确的手机号码'
            })
        } else {
            this.setState({
                true_mobile: ''
            })
        }
    }
    password_blur () {
        var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{0,20}$/
        if(this.state.password && !reg.test(this.state.password)) {
            this.setState({
                password_errorMsg: '密码不合规'
            })
        }else if (this.state.password && this.state.password_r && this.state.password != this.state.password_r) {
            this.setState({
                password_errorMsg: '两次输入密码不一致'
            })
        }else if (this.state.password && this.state.password.length<6) {
            this.setState({
                password_errorMsg: '密码长度太短'
            })
        } else {
            this.setState({
                password_errorMsg: '',
                password_errorMsg2: ''
            })
        }
    }
    render() {
        const content = (
            <div className="pass-pop">
                <p>6-20个字符，只能包含字母、数字以及特殊符号（除空格），字母、数字和特殊符号至少包含2种</p>
            </div>
        )
        return (
            <div className="Register">
                <header className="common-header">
                    <img onClick={this.go_homepage.bind(this)} className="logo1" src={logo} alt=""/>
                    <div className="go-login">已有账户， <span onClick={this.go_login.bind(this)}>登录</span></div>
                </header>
                <div className="register-msg">
                    <h2>欢迎注册银盾云</h2>
                    <img src={steps01} alt="steps" />
                    <div className="steps01-details">
                        <span className="step1">注册银盾云</span>
                        <span className="step2">完善企业资料</span>
                        <span className="step3">资料审核</span>
                    </div>
                    <div className="set-register-msg">
                        <div className="mobile-number">
                            <Input maxLength="11" onBlur={this.onBlur.bind(this)} onChange={this.onChange.bind(this, 'mobile')} placeholder="请输入手机号" style={{height:"40px", marginBottom:"20px"}}/>
                            {this.state.true_mobile?
                            <div className="mobile-error-msg">*{this.state.true_mobile}</div>
                            :
                            ''
                            }
                        </div>
                        <div className="set-verification-code">
                            <Input placeholder="请输入验证码" onChange={this.onChange.bind(this, 'code')} maxLength="6" style={{height:"40px"}}/>
                            {this.state.code_errorMsg?
                            <div className="code-error-msg">*{this.state.code_errorMsg}</div>
                            :''
                            }
                            {this.state.reciprocal == 0?
                            <span onClick={this.set_code.bind(this)}>{this.state.set_code_words}</span>
                            :
                            <span>{this.state.reciprocal}秒后重发</span>
                            }
                            {this.state.password_errorMsg?
                            <div className="password-error-msg">*{this.state.password_errorMsg}</div>
                            :''
                            }
                            {this.state.password_errorMsg2?
                            <div className="password-error-msg2">*{this.state.password_errorMsg2}</div>
                            :''
                            }
                        </div>
                        <Popover placement="rightTop" content={content} trigger="focus">
                            <Input onBlur={this.password_blur.bind(this)} placeholder="请输入登录密码" maxLength="20" onChange={this.onChange.bind(this, 'password')} type="password" style={{height:"40px", marginBottom:"20px"}}/>
                        </Popover>
                        <Input onBlur={this.password_blur.bind(this)} placeholder="请再次输入登录密码" maxLength="20" onChange={this.onChange.bind(this, 'password_r')} type="password" style={{height:"40px", marginBottom:"20px"}}/>
                        <Button type="primary" style={{width:"320px", height:"40px",marginBottom:"20px"}} onClick={this.submit_rig.bind(this)}>同意条款并注册</Button>
                        <Checkbox onChange={this.doCheck.bind(this)} checked={this.state.checked}>我已同意并阅读<a style={{color:"#1890ff"}} target="_brank" href="/#/registerAgreement">《银盾云网站服务条款》</a> 和 <a style={{color:"#1890ff"}} target="_brank" href="/#/legalDeclaration">《法律声明及隐私权政策》</a></Checkbox>
                        {this.state.common_error_msg?
                            <div className="error_msg_common">*{this.state.common_error_msg}</div>
                            :
                            ''
                        }
                    </div>
                </div>
                {/* <div className="do-more-warp">
                    <div className="do-more-body">
                        <div className="close-warp">x</div>
                        <div className="do-more-title">重新发送验证</div>
                        <p>由于您第三次请求发送短信验证码，请点击下方继续操作</p>
                        <div className="do-more-btn"></div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default Register;
