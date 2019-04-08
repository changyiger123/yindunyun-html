import React, { Component } from 'react'
import './register.less'
import {Input, Button, Checkbox, Popover, message} from 'antd'
import ajax from '../../utils/ajax'

import logo from '../../images/logo.png'
import steps03 from '../../images/steps03.png'
import success from '../../images/failer.png'
import user from '../../images/user.png'

class RegisterAlready extends Component {
    state = {
        true_mobile: true,
        userNumber: undefined
    }
    componentWillMount () {
        if (!window.localStorage.getItem("access_token")) {
            window.location.hash = "login";
        } else {
            this.setState({
                userNumber: window.localStorage.getItem("mobilePhone")
            })
        }
    }
    logout () {
        window.location.hash="/login"
    }
    go_homepage () {
        window.location.hash="/"
    }
    
    render() {
        return (
            <div className="RegisterAlready">
                <header className="common-header">
                    <img onClick={this.go_homepage.bind(this)} className="logo1" src={logo} alt=""/>
                    <div className="go-login"><img src={user} alt="user" style={{marginRight:"10px"}}/>{this.state.userNumber}, <span onClick={this.logout.bind(this)}>退出</span></div>
                </header>
                <div className="registerAlready-msg">
                    <h2>资料审核</h2>
                    <img src={steps03} alt="steps" />
                    <div className="steps01-details">
                        <span className="step1">注册银盾云</span>
                        <span className="step2">完善企业资料</span>
                        <span className="step3">资料审核</span>
                    </div>
                    <div className="registerAlready-content">
                        <img src={success} alt="success"/>
                        <div>恭喜您已成功提交资料</div>
                        <p>我们将在三个工作日内核实信息，通过后我们将以邮件形式通知您，请注意查收。</p>
                        <p>如有问题请拨打客服电话：400-966-0800</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterAlready;
