import React, { Component } from 'react'
import './register.less'
import {Input, Button, Checkbox, Popover, message} from 'antd'
import ajax from '../../utils/ajax'

import logo from '../../images/logo.png'
import steps03 from '../../images/steps03.png'
import failer from '../../images/failer.png'
import success from '../../images/failer.png'
import user from '../../images/user.png'

class RegisterAlreadyFail extends Component {
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
            ajax.post("/admin/userInfo/audit/info",{ucode:window.localStorage.getItem("ucode")})
            .then(response => {
                if (response.code == "0") {
                    if(response.data.auditOpinion == "通过") {
                        window.location.hash = "riskQuery"
                    }
                    this.setState({
                        audit_result:response.data.auditOpinion
                    })
                }else {
                }
            });
        }
    }

    logout () {
        window.location.hash="/login"
    }
    go_homepage () {
        window.location.hash="/"
    }
    go_resubmit () {
        window.location.hash="/enterpriseInfo"
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
                        <img src={failer} alt="failer"/>
                        <div>资料审核失败</div>
                        <p>{this.state.audit_result}</p>
                        <p>如有问题请拨打客服电话：400-966-0800</p>
                        <Button onClick={this.go_resubmit.bind(this)} type="primary" style={{width:"320px", height:"40px",marginLeft:"128px",marginTop:"20px"}}>重新提交资料</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterAlreadyFail;
