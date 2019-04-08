import React from 'react';
import { Link } from "react-router";
import { Form, Input, Radio, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col,Modal,Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
import "./index.less";
import ajax from "../../utils/ajax";

class AddSubAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jurisdiction: 0,
            isGetCode: false,
            codeName: '发送验证码'
        };
    };

    componentWillMount() {
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
        ajax.post("/admin/admin/addSubAccount/getMobileCode",{mobile:this.state.mobilePhone})
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
        ajax.post("/admin/admin/subAccount/add",{mobile:this.state.mobilePhone,realName:this.state.realName,code:this.state.code,actionsType:this.state.jurisdiction})
        .then(response => {
            if(response.code === "0") {
                message.success('添加成功')
                window.location.hash="subAccount"
            } else {
                message.error(response.msg)
            }
        });
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
            <Breadcrumb.Item>新建子账户</Breadcrumb.Item>
            </Breadcrumb>
            <div className="addSubAccount" style={{ margin: 24,padding:'0 32px', background: '#fff', minHeight: 780 }}>
                <div id="info" style={{padding:"80px 0"}}>
                    <div className="sub_item">
                        <span>姓名：</span>
                        <Input type="text" className="sub_input" id="realName" name="realName" placeholder="请输入姓名"   onChange={this.onChange.bind(this, 'realName')}/>
                    </div>
                    <div className="sub_item">
                        <span>手机号码：</span>
                        <Input type="text" className="sub_input" id="mobilePhone" name="mobilePhone" placeholder="请输入手机号码"   onChange={this.onChange.bind(this, 'mobilePhone')}/>
                    </div>
                    <div className="sub_item">
                        <span>验证码：</span>
                        <Input type="text" className="sub_input2" id="code" name="code" placeholder="请输入验证码"   onChange={this.onChange.bind(this, 'code')}/>
                        <button disabled={this.state.isGetCode} onClick={this.getCode.bind(this)} className={this.state.isGetCode?"get_code":"get_code active"}>{this.state.codeName}</button>
                    </div>
                    <div className="sub_item">
                        <span>权限：</span>
                        <RadioGroup onChange={this.changeType.bind(this)} value={this.state.jurisdiction}>
                            <Radio style={radioStyle} value={0}>可查询（可查询所有付费项目）</Radio>
                            <Radio style={radioStyle} value={1}>仅查看（不可查询项目，只可查看已有记录）</Radio>
                        </RadioGroup>
                    </div>
                    <div className="submit_search">
                        <span className="submit_left"></span>
                        <Button onClick={this.go_submit.bind(this)} type="primary" style={{width:"100px"}}>提交</Button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
const addSubAccount = Form.create()(AddSubAccount);
export default addSubAccount;