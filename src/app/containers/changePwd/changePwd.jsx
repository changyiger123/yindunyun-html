import React from 'react';
import { Link } from "react-router";
import { Form, Alert, Radio, Button, Input ,validator, Breadcrumb, Pagination , Row, Col } from 'antd';
import CryptoJS from "crypto-js";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import "./changePwd.less";
import {message} from "antd/lib/index";
import ajax from "../../utils/ajax";

class changePwdForm extends React.Component {
    state={
        oldPwdError: '',
        passwordError: '',
        confirmPasswordError: '',
        otherError: ''
    }
    onChange ( field, e) {
        let valStr = e.target.value;
        this.setState({
            [field]: valStr
        })
    }
    changeSubmit () {
        this.setState({
            oldPwdError: '',
            passwordError: '',
            confirmPasswordError: '',
            otherError: ''
        })
        var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{0,20}$/
        if(!this.state.oldPwd) {
            this.setState({
            oldPwdError: '请输入旧密码！'
            })
            return
        }else if (!this.state.password) {
            this.setState({
                passwordError: '请输入新密码！'
            })
            return
        }else if (!this.state.confirmPassword) {
            this.setState({
                confirmPasswordError: '请再次输入新密码！'
            })
            return
        }else if (this.state.password && !reg.test(this.state.password)) {
            this.setState({
                passwordError: '新密码不合规'
            })
            return
        }else if (this.state.password.length<6) {
            this.setState({
                passwordError: '新密码不得小于6位'
            })
            return
        }else if (this.state.password != this.state.confirmPassword) {
            console.log(this.state.password,this.state.confirmPassword)
            this.setState({
                confirmPasswordError: '两次输入密码不一致'
            })
            return
        }
        if(this.state.oldPwd == this.state.passWord){
            this.setState({
                passwordError: '新密码不能与旧密码相同！'
            })
            return
        }
        let oldPwd= this.state.oldPwd,
            passWord= this.state.password,
            confirmPassword= this.state.confirmPassword;
        let data={oldPwd:oldPwd,passWord:passWord,confirmPassword:confirmPassword};
        ajax.post("/admin/resetPwd/save", data)
            .then(response => {
                console.log(response);
                if (response == "success") {
                    message.success("修改密码成功！");
                    window.localStorage.removeItem("access_token");
                    window.location.hash="/login"
                } else {
                    this.setState({
                        otherError: response.msg
                    })
                }
            })
    };

    render() {
        let self = this;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="changePwd systemSetup">
                <Breadcrumb style={{ padding: '16px 28px',fontSize:'20px',fontWeight:'bold',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
                    <Breadcrumb.Item>修改登录密码</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{ margin: 24,padding:'150px 20px 0', background: '#fff',boxSizing:"border-content", minHeight: 630 }}>
                    <div className="changeCont">
                        <div className="passwordItem">
                            <span>旧密码</span>
                            <Input className="login-input" type="password" placeholder="请输入旧密码" onChange={this.onChange.bind(this, 'oldPwd')}/>
                        </div>
                        <div className="passwordError">{this.state.oldPwdError}</div>
                        <div className="passwordItem">
                            <span>新密码</span>
                            <Input className="login-input" type="password" placeholder="请输入新密码" onChange={this.onChange.bind(this, 'password')}/>
                        </div>
                        <div className="passwordError">{this.state.passwordError}</div>
                        <div className="passwordItem">
                            <span>再次输入新密码</span>
                            <Input className="login-input" type="password" placeholder="请再次输入新密码" onChange={this.onChange.bind(this, 'confirmPassword')}/>
                        </div>
                        <div className="passwordError">{this.state.confirmPasswordError}</div>
                        <div className="passwordItem">
                            <span></span>
                            <Button className="ok_btn" type="primary" onClick={this.changeSubmit.bind(this)}>确定</Button>
                            <Button className="cancel_btn" style={{marginLeft:'8px'}}>
                                <Link to="this.props.history.goBack()" >取消</Link>
                            </Button>
                        </div>
                        <div className="passwordError">{this.state.otherError}</div>
                    </div>
                </div>
            </div>
        )
    }
}
const changePwd = Form.create()(changePwdForm);
export default changePwd;