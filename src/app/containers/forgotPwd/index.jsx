import React from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, Input, Button, Icon, message, } from "antd";
import CryptoJS from "crypto-js";

import "./index.less";
import ajax from "../../utils/ajax";

const FormItem = Form.Item;
const error = () => {
  message.error("Please check your username and password and try again.");
};
export class ForgotPwd extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values.passWord,values.confirmPassword)
                let passWord= CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(values.passWord)),
                confirmPassword= CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(values.confirmPassword));
                let data={mobilePhone: values.mobilePhone, mobileCode: values.mobileCode, passWord:passWord, confirmPassword:confirmPassword};
                ajax.post("/admin/resetPwd/save", data)
                    .then(response => {
                        console.log(response);
                        if (response.code == "0") {
                            message.success("提交成功！");
                            this.props.history.push = "#";
                        } else {
                            message.error(response.msg);
                        }
                    })
            }
        });
    };

  handleReset = () => {
    this.props.form.resetFields();
    window.location.reload();
  }

  state = {
    dlgTipTxt: '发送验证码',
    seconds: 5
  };
  timerRun = e => {
    e.preventDefault();
    ajax.post("/admin/mobile-code/get", {mobilePhone:this.props.form.getFieldValue('mobilePhone'), type: 2 })
      .then(response => {
          console.log(response);
          if (response.code == "0") {
              console.log(response)
          } else {
              message.error(response.msg);
          }
      })
    let siv = setInterval(() => {
      this.setState((preState) => ({
        seconds: preState.seconds - 1,
        dlgTipTxt: `${preState.seconds - 1}s`,
      }), () => {
        if (this.state.seconds == 0) {
          this.setState((preState) => ({
            seconds: 5,
            dlgTipTxt: '重新发送',
          }))
          clearInterval(siv);
        }
      });
    }, 1000)
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="forgot-container">
        <div className="login-mask" />
        <Form
          className="login-content"
          layout="horizontal"
          onSubmit={this.handleSubmit}
        >
          <h2>修改密码</h2>
          <FormItem label="" hasFeedback>
            {getFieldDecorator("mobilePhone", {
              rules: [
                { required: true, message: "请输入手机号！" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                className="login-input"
                placeholder="请输入手机号"
              />
            )}
          </FormItem>
          <FormItem style={{ position: "relative" }}>
              {getFieldDecorator('mobileCode', {
                rules: [{ required: true, message: '请输入验证码！' }],
              })(
                <Input
                  prefix={
                    <i className="imgCode" style={{ color: "rgba(0,0,0,.25)" }}></i>
                  }
                  type="text"
                  placeholder="请输入验证码"
                />
              )}
              <input id="timer" type="button" onClick={this.timerRun.bind(this)}  value={this.state.dlgTipTxt}/>
          </FormItem>

          <FormItem label="" hasFeedback>
              {getFieldDecorator("passWord", {
                  rules: [
                      { required: true, message: "请输入新密码！" }
                  ]
              })(
                  <Input
                      prefix={
                        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      className="login-input"
                      type="password"
                      placeholder="请输入新密码"
                  />
              )}
          </FormItem>
          <FormItem label="" hasFeedback>
            {getFieldDecorator("confirmPassword", {
              rules: [
                { required: true, message: "请再次输入新密码！" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                className="login-input"
                type="password"
                placeholder="请再次输入新密码"
              />
            )}
          </FormItem>

          <FormItem style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              确定
            </Button>
            <Button className="login-form-button" onClick={this.handleReset}>取消
              {/*<Link to="/login" >取消</Link>*/}
            </Button>
          </FormItem>

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
  connect(mapStateToProps, mapDispatchToProps)(ForgotPwd)
);
