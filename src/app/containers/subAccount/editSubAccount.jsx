import React from 'react';
import { Link } from "react-router";
import { Form, Input, Radio, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col,Modal,Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
import "./index.less";
import ajax from "../../utils/ajax";

class EditSubAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jurisdiction: this.props.params.type - 0,
            realName: this.props.params.name,
            mobilePhone: this.props.params.mobile,
            stop_use_show:false
        };
    };

    componentWillMount() {
        console.log(this.props.params)
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
    changeMobile () {
        window.location.hash="editSubAccountMobile/"+this.state.mobilePhone
    }
    go_submit () {
        ajax.post("/admin/admin/permission/update",{mobile:this.state.mobilePhone,actionsType:this.state.jurisdiction})
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
    show_stop_use() {
        this.setState({
            stop_use_show: true
        })
    }
    do_stop_use () {
        ajax.post("/admin/admin/subAccount/stop",{mobile:this.state.mobilePhone})
        .then(response => {
            if(response.code === "0") {
                message.success('停用成功')
                window.location.hash="subAccount"
            } else {
                message.error(response.msg)
            }
        });
    }
    cancel_stop_use () {
        this.setState({
            stop_use_show: false
        })
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
            <Breadcrumb.Item>编辑子账户</Breadcrumb.Item>
            </Breadcrumb>
            <div className="addSubAccount" style={{ margin: 24,padding:'0 32px', background: '#fff', minHeight: 780 }}>
                <div id="info" style={{padding:"80px 0"}}>
                    <div className="sub_item">
                        <span>姓名：</span>
                        <Input disabled type="text" className="sub_input" value={this.state.realName} id="realName" name="realName"/>
                    </div>
                    <div className="sub_item" style={{marginBottom:"6px"}}>
                        <span>手机号码：</span>
                        <Input disabled type="text" className="sub_input" value={this.state.mobilePhone} id="mobilePhone" name="mobilePhone"/>
                    </div>
                    <div className="sub_item">
                        <span>&nbsp;</span>
                        <div className="other_do"><span onClick={this.changeMobile.bind(this)}>修改手机号 </span> | <span onClick={this.show_stop_use.bind(this)}> 停用账户</span></div>
                    </div>
                    <div className="sub_item">
                        <span>权限：</span>
                        <RadioGroup onChange={this.changeType.bind(this)} value={this.state.jurisdiction}>
                            <Radio style={radioStyle} value={0}>可查询（可查询所有付费项目）</Radio>
                            <Radio style={radioStyle} value={1}>仅查看（不可查询项目，只可查看已有记录）</Radio>
                        </RadioGroup>
                    </div>
                    <div className="sub_item">
                        <span>&nbsp;</span>
                        <Button onClick={this.go_submit.bind(this)} type="primary" style={{width:"100px",marginRight:"10px"}}>确定</Button>
                        <Button onClick={this.go_cancel.bind(this)} style={{width:"100px"}}>取消</Button>
                    </div>
                </div>
            </div>
            {this.state.stop_use_show?
            <div className="checkChoose">
                <div className="stopUse">
                    <h3>账户 {this.state.realName} 即将被停用，您是否确定本次操作？</h3>
                    <div>
                        <Button onClick={this.do_stop_use.bind(this)} type="primary" style={{width:"90px",marginRight:"10px"}}>停用账户</Button>
                        <Button onClick={this.cancel_stop_use.bind(this)} style={{width:"90px"}}>取消</Button>
                    </div>
                </div>
            </div>:''}
        </div>
        )
    }
}
const editSubAccount = Form.create()(EditSubAccount);
export default editSubAccount;