import React from 'react'
import {Form, Select, Input, Button, Checkbox, Table, Breadcrumb, Pagination, Row, Col} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

import "./staffManage.less";
import reqwest from 'reqwest';
import {message} from "antd/lib/index";
import ajax from "../../utils/ajax";
import {Link} from "react-router";




class staffStoreFormNew extends React.Component {
    state = {
        storeLists: [],
        userData: {},
        myRoles: [],
        status: '',
        userName: '',
        role: [],
        realName: '',
        mobilePhone: '',
        idCard: '',
        password: '',
        storeRoles: []

    };

    constructor(props) {
        super(props);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeCheckBox = this.onChangeCheckBox.bind(this);

    };

    componentWillMount = (e) => {
        //查询员工信息
        ajax.post("/admin/admin/add", {})
            .then(response => {
                if (response.code == "0") {
                    var list = response.data;
                    console.log(list);
                    this.setState({
                        storeRoles: list.storeRoles
                    });
                } else {
                    console.log("staffEdit" + response.msg);
                    message.error(response.msg);
                }
            })
    };

    //select选择option更改state
    onChangeSelect(field, value) {
        console.log(value);
        this.setState({
            [field]: value,
        }, () => {
        });
    };

    //普通字段输入更改state
    onChange(field, e) {
        let valStr = e.target.value;
        this.setState({
            [field]: valStr,
        });
    };

    onChangeCheckBox(filed, checkedValues) {
        this.setState({
            [filed]: checkedValues
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var userData = this.state.userData;
                var redata = {
                    userName: this.state.userName,
                    realName: this.state.realName, idCard: this.state.idCard,
                    status: this.state.status, mobilePhone: this.state.mobilePhone,
                    roleIds: this.state.role, pwd: this.state.password
                }
                console.log(redata);
                ajax.post("/admin/admin/save", redata)
                    .then(response => {
                        console.log(response);
                        if (response.code == "0") {
                            this.props.router.push('/staffManage/store');
                        } else {
                            message.error(response.msg);
                        }
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let userData = this.state.userData || {};
        let storeLists = this.state.storeLists || {},
            storeOption = [];
        let storeRoles = this.state.storeRoles,
            roleOption = [];
        if (storeLists != null) {
            for (let i = 0; i < storeLists.length; i++) {
                storeOption.push(<Option key={storeLists[i].code}
                                         value={storeLists[i].code}>{storeLists[i].name}</Option>);
            }
        }
        if (storeRoles != null) {
            for (let i = 0; i < storeRoles.length; i++) {
                roleOption.push({label: storeRoles[i].name, value: storeRoles[i].id});
            }
        }
        return (
            <div className="staffManageEdit">
                <Breadcrumb style={{padding: '16px 28px', background: "#fff"}}>
                    <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
                </Breadcrumb>
                <Breadcrumb style={{
                    padding: '16px 28px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: "#fff",
                    borderBottom: "1px solid #E8E8E8"
                }}>
                    <Breadcrumb.Item>新建员工账号</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{margin: 24, padding: '0 20px', background: '#fff', minHeight: 780}}>
                    <Form
                        className="edig-content"
                        layout="horizontal"
                        onSubmit={this.handleSubmit}
                        style={{paddingTop: '28px'}}
                    >
                        <FormItem label="工号：" hasFeedback>
                            {getFieldDecorator("userName", {
                                rules: [
                                    {required: true, message: "请输入工号！"}
                                ]
                            })(
                                <Input
                                    className="login-input"
                                    placeholder="请输入工号"
                                    onChange={this.onChange.bind(this, 'userName')}
                                />
                            )}
                        </FormItem>
                        <FormItem label="姓名：" hasFeedback>
                            {getFieldDecorator("realName", {
                                rules: [
                                    {required: true, message: "请输入姓名！"}
                                ]
                            })(
                                <Input
                                    className="login-input"
                                    type="text"
                                    placeholder="请输入姓名"
                                    onChange={this.onChange.bind(this, 'realName')}
                                />
                            )}
                        </FormItem>
                        <FormItem label="手机号：" hasFeedback>
                            {getFieldDecorator("mobilePhone", {
                                rules: [
                                    {required: true, message: "请输入手机号！"}
                                ]
                            })(
                                <Input
                                    className="login-input"
                                    type="tel"
                                    placeholder="请输入手机号"
                                    maxLength = '11'
                                    onChange={this.onChange.bind(this, 'mobilePhone')}
                                />
                            )}
                        </FormItem>
                        <FormItem label="身份证号：" hasFeedback>
                            {getFieldDecorator("idCard", {
                                rules: [
                                    {required: true, message: "请输入身份证号！"}
                                ]
                            })(
                                <Input
                                    className="login-input"
                                    type="text"
                                    placeholder="请输入身份证号"
                                    maxLength = '18'
                                    onChange={this.onChange.bind(this, 'idCard')}
                                />
                            )}
                        </FormItem>
                        <FormItem label="账号密码：" hasFeedback>
                            {getFieldDecorator("password", {
                                rules: [
                                    {required: true, message: "请输入账号密码！"}
                                ]
                            })(
                                <Input
                                    className="login-input"
                                    // type="password"
                                    placeholder="请输入账号密码"
                                    onChange={this.onChange.bind(this, 'password')}
                                />
                            )}
                        </FormItem>
                        <FormItem label="角色（可多选）：">
                            {getFieldDecorator("role", {
                                rules: []
                            })(
                                <CheckboxGroup options={roleOption}
                                               onChange={this.onChangeCheckBox.bind(this, 'role')}/>
                            )}
                        </FormItem>

                        <FormItem
                            label="状态："
                        >
                            {getFieldDecorator("status", {
                                rules: [
                                    {required: true, message: "请选择状态！"}
                                ]
                            })(
                                <Select placeholder="请选择状态" name="status"
                                        onChange={this.onChangeSelect.bind(this, 'status')}>
                                    <Option key='0' value="0">正常</Option>
                                    <Option key='2' value="2">离职</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem style={{textAlign: "center"}}>
                            <Button type="primary" htmlType="submit" className="editform-button">
                                提交
                            </Button>
                            <Button><Link to={'/staffManage/store'}>取消</Link></Button>

                        </FormItem>

                    </Form>
                </div>
            </div>
        )
    };


    componentDidMount = () => {

    };

}

const staffManageStoreNew = Form.create()(staffStoreFormNew);
export default staffManageStoreNew;