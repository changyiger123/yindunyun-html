import React from 'react';
import {Link} from "react-router";
import {Form, Input, Select, DatePicker, Breadcrumb, Button, Icon, Table, Pagination, Row, Col, message} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
import "./staffManage.less";
import ajax from "../../utils/ajax";

class staffManageStaffForm extends React.Component {
    state = {
        isEditing: false,
        startValue: null,
        endValue: null,
        data: [],
        pagination: {},
        loading: false,
        selectedRowKeys: [],
        dealerLists: [],
        userName: '',//工号
        realName: '',//姓名
        status: '',
        page: 1,
        totalCount:0

    };

    constructor(props) {
        super(props);
        this.disabledStartDate = this.disabledStartDate.bind(this);
        this.disabledEndDate = this.disabledEndDate.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.getStaffStorePage = this.getStaffStorePage.bind(this);

    };

    getStaffStorePage=(page)=>{
        this._isMounted = true;
        const currentPage = page;
        this.setState({
            page: currentPage,
        });

        var redata = {
            page: page, userName: this.state.userName,
            status: this.state.status,
            pageSize: this.state.pageSize, realName: this.state.realName,
            registerTimeBegin:this.state.startValue,registerTimeEnd:this.state.endValue
        };
        ajax.post("/admin/admin/list", redata)
            .then(response => {
                if (response.code == "0") {
                    var datalist = response.data.result;
                    var totalCount = response.data.totalRow;

                    this.setState({
                        data: datalist,
                        totalCount : totalCount
                    });
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });
    }

    componentWillMount = (e) => {
        this._isMounted = true;
        var redata = {
            page: this.state.page

        };
        ajax.post("/admin/admin/list", redata)
            .then(response => {
                console.log(response);
                if (response.code == "0") {
                    var data = response.data;
                    var datalist = data.result;
                    var totalCount = data.totalRow;
                    this.setState({
                        data: datalist,
                        totalCount:totalCount
                    });
                    console.log(this.state.data);
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });
    };

    componentWillUnmount() {
        this._isMounted = false
    }

    disabledStartDate(startValue) {
        if (!startValue || !this.state.endValue) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endValue.toDate().getTime();
    };

    disabledEndDate(endValue) {
        if (!endValue || !this.state.startValue) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startValue.toDate().getTime();
    };

    //普通字段输入更改state
    onChange(field, e) {
        let valStr = e.target.value;
        console.log(field, 'change', valStr);
        this.setState({
            [field]: valStr,
        });
    };

    onChange1(field, value) {
        console.log(field, 'change', value);
        this.setState({
            [field]: value,
        });
    };

    //select选择option更改state
    onChangeSelect(field, value) {
        console.log(value);
        this.setState({
            [field]: value,
        }, () => {
            // console.log([field]);
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!err) {
                    var redata = {
                        page: this.state.page, userName: this.state.userName,
                         status: this.state.status,
                        pageSize: this.state.pageSize, realName: this.state.realName,
                        registerTimeBegin:this.state.startValue,registerTimeEnd:this.state.endValue
                    };
                    ajax.post("/admin/admin/list", redata)
                        .then(response => {
                            if (response.code == "0") {
                                var datalist = response.data.result;
                                this.setState({
                                    data: datalist
                                });
                            } else {
                                console.log("list" + response.msg);
                                message.error(response.msg);
                            }
                        });
                } else {
                    message.error("输入信息有误！");
                }
            }
        });
    };

    render() {
        let self = this;
        const {getFieldDecorator} = this.props.form;
        const columns = [{
            title: '工号',
            dataIndex: 'userName',
            key: 'userName',

        }, {
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
        }, {
            title: '手机号码',
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
        }, {
            title: '身份证号',
            dataIndex: 'idCard',
            key: 'cardId',
        }, {
            title: '添加时间',
            dataIndex: 'registerTime',
            key: 'registerTime',
        }, {
            title: '状态',
            dataIndex: 'statusStr',
            key: 'statusStr',
        }, {
            title: '操作',
            key: 'id',
            dataIndex: 'id',
            render: (text, record) => <Link to={'/staffManage/store/' + record.id} name="operate">编辑</Link>
        }];
        const dataCont = this.state.data;

        const pagination = {
            total: dataCont == null ? 0 : dataCont.length,
            current: 1,
            showSizeChanger: true,
            onShowSizeChange: function (current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: function (current) {
                console.log('Current: ', current);
            }
        };


        return (
            <div className="staffManage">
                <Breadcrumb style={{padding: '16px 28px', background: "#fff", borderBottom: "1px solid #E8E8E8"}}>
                    <Breadcrumb.Item>门店员工管理</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{margin: 24, padding: '0 32px', background: '#fff', minHeight: 780}}>
                    {/*查询选项*/}
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            label="工号：">
                            <Input id="userName" placeholder="请输入工号" onChange={this.onChange.bind(this, 'userName')}/>
                        </FormItem>
                        <FormItem
                            label="姓名：">
                            <Input id="realName" placeholder="请输入姓名" onChange={this.onChange.bind(this, 'realName')}/>
                        </FormItem>

                        <FormItem
                            label="添加时间："
                        >
                            <Col span="11" style={{display: 'inline-block'}}>
                                <DatePicker disabledDate={this.disabledStartDate}
                                            placeholder="开始日期"
                                            value={this.state.startValue}
                                            onChange={this.onChange1.bind(this, 'startValue')}
                                />
                            </Col>
                            <Col span="1" style={{display: 'inline-block'}}>
                                <p className="ant-form-split">-</p>
                            </Col>
                            <Col span="11" style={{display: 'inline-block'}}>
                                <DatePicker disabledDate={this.disabledEndDate}
                                            placeholder="截止日期"
                                            value={this.state.endValue}
                                            onChange={this.onChange1.bind(this, 'endValue')}
                                />
                            </Col>
                        </FormItem>
                        <FormItem label="状态：" >
                            <Select placeholder="请选择状态" onChange={this.onChangeSelect.bind(this, 'status')}>
                                <Option key="" value="">请选择状态</Option>
                                <Option key='0' value="0">正常</Option>
                                <Option key='2' value="2">离职</Option>
                            </Select>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </FormItem>
                    </Form>
                    <Button type="primary"><Icon type="plus"/><Link to="/staffManage/store/new">新建</Link></Button>

                    <div className="ant-form-split">
                        <Table rowKey={(record) => record.id} columns={columns} dataSource={dataCont}
                               pagination={{
                                   simple: false,
                                   current: this.state.page,
                                   total: this.state.totalCount,
                                   onChange: this.getStaffStorePage,
                               }}/>
                    </div>
                </div>
            </div>
        )
    }
}

const staffManageStaff = Form.create()(staffManageStaffForm);
export default staffManageStaff;