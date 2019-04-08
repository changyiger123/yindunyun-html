import React from 'react';
import {Link} from "react-router";
import {
    Form,
    Input,
    Select,
    DatePicker,
    Breadcrumb,
    Button,
    Icon,
    Table,
    message,
    Pagination,
    Row,
    Col,
    Tabs,
    Modal
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import "./mortgageRegistration.less";
import ajax from "../../utils/ajax";

class applicationForm extends React.Component {
    state = {
        isEditing: false,
        startValue1: null,
        endValue1: null,
        startValue2: null,
        endValue2: null,
        data1: [],
        data2: [],
        pagination1: {},
        pagination2: {},
        loading: false,
        selectedRowKeys1: [],
        selectedRowKeys2: [],
        autoTypeList: [],

        key: "1",
        page1: '1',
        page2: '1',
        pageSize1: '',
        pageSize2: '',
        autoType1: undefined,
        autoType2: undefined,
        applyNo1: undefined,
        applyNo2: undefined,
        realName1: undefined,
        realName2: undefined,
        startApplyDate1: undefined,
        endApplyDate1: undefined,
        startApplyDate2: undefined,
        endApplyDate2: undefined,
        flag: false
    };

    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
        this.disabledStartDate2 = this.disabledStartDate2.bind(this);
        this.disabledEndDate2 = this.disabledEndDate2.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.getDataListNotMortgage = this.getDataListNotMortgage.bind(this);
        this.getDataListMortgage = this.getDataListMortgage.bind(this);
    };

    //未抵押列表
    getDataListNotMortgage = (page) => {
        this._isMounted = true;
        const currentPage = page;
        this.setState({
            page1: currentPage,
        });
        let redata = {
            page: currentPage,
            pageSize: this.state.pageSize1,
            autoType: this.state.autoType1,
            applyNo: this.state.applyNo1,
            startApplyDate: this.state.startApplyDate1,
            endApplyDate: this.state.endApplyDate1,
            storeCode: this.state.storeCode1,
            realName: this.state.realName1
        };
        ajax.post("/admin/autoloanApply/notMortgage/list", redata)
            .then(response => {
                if (response.code == "0") {
                    var totalCount = response.totalCount;
                    var datalist = response.result;
                    this.setState({
                        data1: datalist,
                        totalCount1:totalCount
                    }, () => {
                        // console.log([field]);
                    });
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });
    };

    //已抵押
    getDataListMortgage = (page) => {
        console.log(page);
        this._isMounted = true;
        const currentPage = page;
        this.setState({
            page2: currentPage,
        });
        let redata = {
            page: currentPage,
            pageSize: this.state.pageSize2,
            autoType: this.state.autoType2,
            applyNo: this.state.applyNo2,
            startApplyDate: this.state.startApplyDate2,
            endApplyDate: this.state.endApplyDate2,
            storeCode: this.state.storeCode2,
            realName: this.state.realName2
        };
        ajax.post("/admin/autoloanApply/hasMortgage/list", redata)
            .then(response => {
                if (response.code == "0") {
                    var totalCount = response.totalCount;
                    var datalist = response.result;
                    this.setState({
                        data2: datalist,
                        totalCount2:totalCount
                    }, () => {
                        // console.log([field]);
                    });
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });
    };

    getDataList(){
        this._isMounted = true;
        let redata = {
            page: this.state.page1,
            pageSize: this.state.pageSize1,
            autoType: this.state.autoType1,
            applyNo: this.state.applyNo1,
            realName: this.state.realName1,
            startApplyDate: this.state.startApplyDate1,
            endApplyDate: this.state.endApplyDate1
        };
        ajax.post("/admin/autoloanApply/notMortgage/list", redata)
            .then(response => {
                if (response.code == "0") {
                    var datalist = response.result;
                    var totalCount = response.totalCount;
                    this.setState({
                        data1: datalist,
                        totalCount1:totalCount

                    });
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });

        //已抵押
        let data2 = {
            page: this.state.page2,
            pageSize: this.state.pageSize2,
            autoType: this.state.autoType2,
            applyNo: this.state.applyNo2,
            startApplyDate: this.state.startApplyDate2,
            endApplyDate: this.state.endApplyDate2
        };
        ajax.post("/admin/autoloanApply/hasMortgage/list", data2)
            .then(response => {
                if (response.code == "0") {
                    var datalist2 = response.result;
                    var totalCount = response.totalCount;

                    this.setState({
                        data2: datalist2,
                        totalCount2:totalCount

                    });
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            })
    }

    componentWillMount = (e) => {
        this.getDataList();
    };

    componentWillUnMount() {
        this._isMounted = false
    }

    callback(key) {
        console.log(key);
        this.setState({
            key: key
        });
    }


    disabledStartDate1(startValue) {
        if (!startValue || !this.state.endApplyDate1) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endApplyDate1.toDate().getTime();
    };

    disabledStartDate2(startValue) {
        if (!startValue || !this.state.endApplyDate2) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endApplyDate2.toDate().getTime();
    };

    disabledEndDate1(endValue) {
        if (!endValue || !this.state.startApplyDate1) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startApplyDate1.toDate().getTime();
    };

    disabledEndDate2(endValue) {
        if (!endValue || !this.state.startApplyDate2) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startApplyDate2.toDate().getTime();
    };

    //普通字段输入更改state
    onChange1(field, e) {
        let valStr = e.target.value;
        console.log(field, 'change', valStr);
        this.setState({
            [field]: valStr,
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

    onChangeStartDate1=(value, dateString) =>{
        this.setState({
            startApplyDate1: value,
            startApplyDate1up: dateString,
        }, ()=> {
            console.log(this.state.startApplyDate1)
        });
    };
    onChangeEndDate1=(value, dateString) =>{
        this.setState({
            endApplyDate1: value,
            endApplyDate1up: dateString,
        }, ()=> {
            console.log(this.state.endApplyDate1)
        });
    };
    onChangeStartDate2=(value, dateString) =>{
        this.setState({
            startApplyDate2: value,
            startApplyDate2up: dateString,
        }, ()=> {
            console.log(this.state.startApplyDate2)
        });
    };
    onChangeEndDate2=(value, dateString) =>{
        this.setState({
            endApplyDate2: value,
            endApplyDate2up: dateString,
        }, ()=> {
            console.log(this.state.endApplyDate2)
        });
    };

    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data1 = {
                    page: this.state.page1,
                    pageSize: this.state.pageSize1,
                    autoType: this.state.autoType1,
                    applyNo: this.state.applyNo1,
                    realName: this.state.realName1,
                    startApplyDate: this.state.startApplyDate1up,
                    endApplyDate: this.state.endApplyDate1up
                };
                ajax.post("/admin/autoloanApply/notMortgage/list", data1)
                    .then(response => {
                        if (response.code == "0") {
                            var datalist1 = response.result;
                            var totalCount = response.totalCount;
                            this.setState({
                                data1: datalist1,
                                totalCount1:totalCount
                            });
                        } else {
                            console.log("list" + response.msg);
                            message.error(response.msg);
                        }
                    });
            } else {
                message.error("输入信息有误！");
            }
        });
    };
    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    page: this.state.page2,
                    pageSize: this.state.pageSize2,
                    autoType: this.state.autoType2,
                    applyNo: this.state.applyNo2,
                    realName: this.state.realName2,
                    startApplyDate: this.state.startApplyDate2up,
                    endApplyDate: this.state.endApplyDate2up
                };
                ajax.post("/admin/autoloanApply/hasMortgage/list", data)
                    .then(response => {
                        console.log(response);
                        if (response.code == "0") {
                            var totalCount = response.totalCount;

                            var datalist = response.result;
                            this.setState({
                                data2: datalist,
                                totalCount2:totalCount

                            });
                            console.log(this.state.data2);
                        } else {
                            console.log("list" + response.msg);
                            message.error(response.msg);
                        }
                    })
            } else {
                message.error("输入信息有误！");
            }
        });
    };



    changeStatus = (e, record) => {
        let self  = this;
        confirm({
            title: '您是否确认'+e.operation+'操作?',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                ajax.post("/admin/autoloanApply/noMortgage/send", {applyNo: e.applyNo})
                    .then(response => {
                        console.log(response);
                        if (response.code == "0") {
                            self.getDataList();
                        } else {
                            message.error(response.msg);
                        }
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    render() {
        let self = this;

        const {getFieldDecorator} = this.props.form;
        const columns1 = [{
            title: '申请单号',
            dataIndex: 'applyNo',
            key: 'applyNo',

        }, {
            title: '门店',
            dataIndex: 'storeName',
            key: 'storeName',
        }, {
            title: '客户姓名',
            dataIndex: 'realName',
            key: 'realName',
        }, {
            title: '手机号码',
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
        }, {
            title: '车辆类型',
            dataIndex: 'autoType',
            key: 'autoType',
        }, {
            title: '贷款金额',
            dataIndex: 'loadMoney',
            key: 'loadMoney',
        }, {
            title: '申请时间',
            dataIndex: 'applyDate',
            key: 'applyDate',
        }, {
            title: '申请状态',
            dataIndex: 'statusStr',
            key: 'statusStr',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => <div  style={{color:'#1890FF',cursor:'pointer'}}
                                            onClick={this.changeStatus.bind(this, record)}>{record.status == 1 ? '已寄件' : ''}</div>
        }];
        const columns2 = [{
            title: '申请单号',
            dataIndex: 'applyNo',
            key: 'applyNo',

        }, {
            title: '门店',
            dataIndex: 'storeName',
            key: 'storeName',
        }, {
            title: '客户姓名',
            dataIndex: 'realName',
            key: 'realName',
        }, {
            title: '手机号码',
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
        }, {
            title: '车辆类型',
            dataIndex: 'autoType',
            key: 'autoType',
        }, {
            title: '贷款金额',
            dataIndex: 'loadMoney',
            key: 'loadMoney',
        }, {
            title: '申请时间',
            dataIndex: 'applyDate',
            key: 'applyDate',
        }];
        const dataCont1 = this.state.data1,
            dataCont2 = this.state.data2;
        const pagination1 = {
            total: dataCont1.length,
            current: 1,
            showSizeChanger: true,
            onShowSizeChange: function (current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: function (current) {
                console.log('Current: ', current);
            }
        };
        const pagination2 = {
            total: dataCont2.length,
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
            <div className="distributionList staffManage">
                <Breadcrumb style={{padding: '16px 28px', background: "#fff"}}>
                    <Breadcrumb.Item>门店抵押登记</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="未抵押" key="1">
                        <div style={{margin: 24, padding: '0 20px', background: '#fff', minHeight: 780}}>
                            <Form onSubmit={this.handleSubmit1}>
                                <FormItem label="申请单号：">
                                    <Input placeholder="请输入申请单号" onChange={this.onChange1.bind(this, 'applyNo1')}/>
                                </FormItem>
                                <FormItem label="客户姓名：">
                                    <Input placeholder="请输入客户姓名" onChange={this.onChange1.bind(this, 'realName1')}/>
                                </FormItem>
                                <FormItem label="车辆类型：">
                                    <Select placeholder="请选择车辆类型" defaultValue=''
                                            onChange={this.onChangeSelect.bind(this, 'autoType1')}>
                                        <Option key="" value="">请选择车辆类型</Option>
                                        <Option key="0" value="0">新车</Option>
                                        <Option key="1" value="1">二手车</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="申请时间：">
                                    <Col span="11" style={{display: 'inline-block'}}>
                                        <DatePicker disabledDate={this.disabledStartDate1}
                                                    placeholder="开始日期"
                                                    onChange={this.onChangeStartDate1}
                                        />
                                    </Col>
                                    <Col span="1" style={{display: 'inline-block'}}>
                                        <p className="ant-form-split">-</p>
                                    </Col>
                                    <Col span="11" style={{display: 'inline-block'}}>
                                        <DatePicker disabledDate={this.disabledEndDate1}
                                                    placeholder="截止日期"
                                                    onChange={this.onChangeEndDate1}
                                        />
                                    </Col>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns1} dataSource={dataCont1}
                                       pagination={{
                                           simple: false,
                                           current: this.state.page1,
                                           total: this.state.totalCount1,
                                           onChange: this.getDataListNotMortgage,
                                       }}/>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="已抵押" key="2">
                        <div style={{margin: 24, padding: '0 20px', background: '#fff', minHeight: 780}}>
                            <Form onSubmit={this.handleSubmit2}>
                                <FormItem label="申请单号：">
                                    <Input placeholder="请输入申请单号" onChange={this.onChange1.bind(this, 'applyNo2')}/>
                                </FormItem>
                                <FormItem label="客户姓名：">
                                    <Input placeholder="请输入客户姓名" onChange={this.onChange1.bind(this, 'realName2')}/>
                                </FormItem>
                                <FormItem label="车辆类型：">
                                    <Select placeholder="请选择车辆类型" defaultValue=''
                                            onChange={this.onChangeSelect.bind(this, 'autoType2')}>
                                        <Option key="" value="">请选择车辆类型</Option>
                                        <Option key="0" value="0">新车</Option>
                                        <Option key="1" value="1">二手车</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="申请时间：">
                                    <Col span="11" style={{display: 'inline-block'}}>
                                        <DatePicker disabledDate={this.disabledStartDate2}
                                                    placeholder="开始日期"
                                                    onChange={this.onChangeStartDate2}
                                        />
                                    </Col>
                                    <Col span="1" style={{display: 'inline-block'}}>
                                        <p className="ant-form-split">-</p>
                                    </Col>
                                    <Col span="11" style={{display: 'inline-block'}}>
                                        <DatePicker disabledDate={this.disabledEndDate2}
                                                    placeholder="截止日期"
                                                    onChange={this.onChangeEndDate2}
                                        />
                                    </Col>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns2} dataSource={dataCont2}
                                       pagination={{
                                           simple: false,
                                           current: this.state.page2,
                                           total: this.state.totalCount2,
                                           onChange: this.getDataListMortgage,
                                       }}/>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}

const application = Form.create()(applicationForm);
export default application;