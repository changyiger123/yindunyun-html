import React from 'react';
import { Link } from "react-router";
import { Form, Input, Radio, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col,Modal,Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
import "./index.less";
import ajax from "../../utils/ajax";

class EditSubAccountMobile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jurisdiction: 0,
            isGetCode: false,
            codeName: '发送验证码'
        };
    };

    componentWillMount() {
        this.setState({
            oldMobile: this.props.params.mobile
        })
    };
    //普通字段输入更改state
    onChange(field, e){
        let valStr = e.target.value;
        this.setState({
            [field]: valStr,
        });
    };
    changeType (e) {
        this.setState({
            jurisdiction: e.target.value,
        });
    }
    getCode () {
        if(!this.state.newMobile) {
            message.error('请输入新手机号码！');
            return
        }
        this.setState({
            isGetCode: true,
            codeName: '59s'
        })
        var leftTime = 59
        var _this = this
        var timer=setInterval(function(){
            leftTime = leftTime - 1
            _this.setState({
                codeName: leftTime+'s'
            })
            if (leftTime == 0) {
                clearInterval(timer)
                _this.setState({
                    codeName: '重新发送',
                    isGetCode: false
                })
            }
        },1000)
        ajax.post("/admin/admin/updateMobile/getMobileCode",{mobile:this.state.newMobile})
        .then(response => {
            if(response.code === "0") {
                
            } else {
                message.error(response.msg)
                clearInterval(timer)
                _this.setState({
                    codeName: '重新发送',
                    isGetCode: false
                })
            }
        });
    }
    go_submit () {
        ajax.post("/admin/admin/mobile/update",{oldMobile:this.state.oldMobile,oldPwd:this.state.oldPwd,newMobile:this.state.newMobile,code:this.state.code})
        .then(response => {
            if(response.code === "0") {
                message.success('修改成功')
                window.location.hash="subAccount"
            } else {
                message.error(response.msg)
            }
        });
    }
    go_cancel () {
        window.history.back();
    }
    render() {
        const radioStyle = {
            display: 'block',
            height: '40px',
            lineHeight: '40px',
        };
        return (
        <div className="subAccount">
            <Breadcrumb style={{ padding: '16px 28px',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
            <Breadcrumb.Item>修改手机号</Breadcrumb.Item>
            </Breadcrumb>
            <div className="addSubAccount" style={{ margin: 24,padding:'0 32px', background: '#fff', minHeight: 780 }}>
                <div id="info" style={{padding:"80px 0"}}>
                    <div className="sub_item">
                        <span>原手机号码：</span>
                        <Input disabled type="text" className="sub_input" value={this.state.oldMobile}/>
                    </div>
                    <div className="sub_item">
                        <span>原账户密码：</span>
                        <Input type="password" className="sub_input" id="oldPwd" name="oldPwd" placeholder="请输入原账户密码"   onChange={this.onChange.bind(this, 'oldPwd')}/>
                    </div>
                    <div className="sub_item">
                        <span>新手机号码：</span>
                        <Input type="text" className="sub_input" id="newMobile" name="newMobile" placeholder="请输入新手机号码"   onChange={this.onChange.bind(this, 'newMobile')}/>
                    </div>
                    <div className="sub_item">
                        <span>验证码：</span>
                        <Input type="text" className="sub_input2" id="code" name="code" placeholder="请输入验证码"   onChange={this.onChange.bind(this, 'code')}/>
                        <button disabled={this.state.isGetCode} onClick={this.getCode.bind(this)} className={this.state.isGetCode?"get_code":"get_code active"}>{this.state.codeName}</button>
                    </div>
                    <div className="sub_item">
                        <span>&nbsp;</span>
                        <Button onClick={this.go_submit.bind(this)} type="primary" style={{width:"100px",marginRight:"10px"}}>确定</Button>
                        <Button onClick={this.go_cancel.bind(this)} style={{width:"100px"}}>取消</Button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
const editSubAccountMobile = Form.create()(EditSubAccountMobile);
export default editSubAccountMobile;