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


class staffManageFormStaff extends React.Component {
    state = {
        userId: this.props.params.id,
        roleLists: [],
        storeLists: [],
        userData: {},
        myRoles: [],
        status: '',
        userName: '',
        role: [],
        realName: '',
        mobilePhone: '',
        idCard: '',
        storeCode: '',
        storeRoles: [],
        tempRoles:[]

    };

    constructor(props) {
        super(props);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
        this.getRolesForSbumit = this.getRolesForSbumit.bind(this);

    };

    componentWillMount = (e) => {
        const userId = this.state.userId;
        //如果不是新建渲染下页面
        if (userId != 'new') {
            //查询员工信息
            ajax.post("/admin/admin/hq/add", {id: userId})
                .then(response => {
                    if (response.code == "0") {
                        var list = response.data;
                        this.setState({
                            userData: list.bean,
                            storeLists: list.stores,
                            roleLists: list.roles,
                            myRoles: list.myRoles,
                            storeRoles: list.storeRoles
                        });
                        this.setState({
                            status: this.state.userData.status,
                            userName: this.state.userData.userName,
                            realName: this.state.userData.realName,
                            mobilePhone: this.state.userData.mobilePhone,
                            idCard: this.state.userData.idCard,
                            storeCode: this.state.userData.storeCode,
                            role: this.state.myRoles
                        });
                    } else {
                        message.error(response.msg);
                    }
                })
        }

    };

    componentWillReceiveProps() {

    };

    //select选择option更改state
    onChangeSelect(field, value) {
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
    };

    getRolesForSbumit(){
        var roleIds = this.state.role;
        var storeCode = this.state.storeCode;
        var storeRoles = this.state.storeRoles;
        var tempRoles=[];
        if (storeCode != 'hq00000000') {
            if (storeRoles != null) {
                let length = storeRoles.length;
                let len = roleIds.length;
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < length; j++) {
                        if(roleIds[i] == storeRoles[j].id){
                            tempRoles.push(roleIds[i]);
                        }
                    }
                }
                return tempRoles;
            }
        }else{
           return tempRoles=roleIds;
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var storeCode = this.state.storeCode;
                var tempRoles = this.getRolesForSbumit();
                var redata = {
                    id: this.state.userId, userName: this.state.userName,
                    realName: this.state.realName, idCard: this.state.idCard,
                    status: this.state.status, mobilePhone: this.state.mobilePhone,
                    storeCode: storeCode, roleIds: tempRoles
                };
                ajax.post("/admin/admin/hq/save", redata)
                    .then(response => {
                        if (response.code == "0") {
                            this.props.router.push('/staffManage/staff');
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
        let myRoles = this.state.myRoles || {};
        let storeLists = this.state.storeLists || {},
            storeOption = [];
        let roleLists = this.state.roleLists,
            storeRoles = this.state.storeRoles,
            roleOption = [];
        if (storeLists != null) {
            for (let i = 0; i < storeLists.length; i++) {
                storeOption.push(<Option key={storeLists[i].code}
                                         value={storeLists[i].code}>{storeLists[i].name}</Option>);
            }
        }
        const storeCode = this.state.storeCode;
        if (storeCode == 'hq00000000' || storeCode == undefined || storeCode == '') {
            if (roleLists != null) {
                for (let i = 0; i < roleLists.length; i++) {
                    roleOption.push({label: roleLists[i].name, value: roleLists[i].id});
                }
            }
        } else {
            if (storeRoles != null) {
                for (let i = 0; i < storeRoles.length; i++) {
                    roleOption.push({label: storeRoles[i].name, value: storeRoles[i].id});
                }
            }
        }
        return (
            <div className="staffManageEdit">
                {/*<Breadcrumb style={{padding: '16px 28px', background: "#fff"}}>
                    <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
                </Breadcrumb>*/}
                <Breadcrumb style={{
                    padding: '16px 28px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: "#fff",
                    borderBottom: "1px solid #E8E8E8"
                }}>
                    <Breadcrumb.Item>编辑员工账号</Breadcrumb.Item>
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
                                initialValue: userData.userName,
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
                                initialValue: userData.realName,
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
                                initialValue: userData.mobilePhone,
                                rules: [
                                    {required: true, message: "请输入手机号！"}
                                ]
                            })(
                                <Input
                                    className="login-input"
                                    type="tel"
                                    maxLength = '11'
                                    placeholder="请输入手机号"
                                    onChange={this.onChange.bind(this, 'mobilePhone')}
                                />
                            )}
                        </FormItem>
                        <FormItem label="身份证号：" hasFeedback>
                            {getFieldDecorator("idCard", {
                                initialValue: userData.idCard,
                                rules: [
                                    {required: true, message: "请输入身份证号！"}
                                ]
                            })(
                                <Input
                                    className="login-input"
                                    type="text"
                                    maxLength = '18'
                                    placeholder="请输入身份证号"
                                />
                            )}
                        </FormItem>
                        <FormItem label="权限（可多选）：">
                            {getFieldDecorator("role", {
                                initialValue: myRoles,
                                rules: []
                            })(
                                <CheckboxGroup options={roleOption}
                                               onChange={this.onChangeCheckBox.bind(this, 'role')}/>
                            )}
                        </FormItem>
                        <FormItem label="所属门店：">
                            {getFieldDecorator("storeCode", {
                                initialValue: userData.storeCode,
                                rules: [
                                    {required: true, message: "请选择门店！"}
                                ]
                            })(
                                <Select name="storeCode" placeholder="请选择门店"
                                        onChange={this.onChangeSelect.bind(this, 'storeCode')}>
                                    {storeOption}
                                </Select>
                            )}

                        </FormItem>

                        <FormItem
                            label="状态："
                        >
                            {getFieldDecorator("status", {
                                initialValue: userData.status + '',
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
                            <Button><Link to={'/staffManage/staff'}>取消</Link></Button>


                        </FormItem>

                    </Form>
                </div>
            </div>
        )
    };


    componentDidMount = () => {

    };

}

const staffManageEdit = Form.create()(staffManageFormStaff);
export default staffManageEdit;