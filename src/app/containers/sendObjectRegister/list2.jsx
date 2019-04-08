import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

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
        total1:null,
        total2:null,
        loading: false,
        selectedRowKeys1: [],
        selectedRowKeys2: [],

        key:"1",
        page1:1,
        page2:1,
        pageSize1:10,
        pageSize2:10,
        storeCode1:undefined,
        storeCode2:undefined,
        applyNo1: undefined,
        applyNo2: undefined,
        realName1: undefined,
        realName2: undefined,
        autoType1: undefined,
        autoType2: undefined,
        startApplyDate1: undefined,
        endApplyDate1:undefined,
        startApplyDate2: undefined,
        endApplyDate2:undefined,
        flag:false,

    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
        this.disabledStartDate2 = this.disabledStartDate2.bind(this);
        this.disabledEndDate2 = this.disabledEndDate2.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.getData = this.getData.bind(this);
    };

    componentWillMount= (e) =>{
        this.getData();
    };
    componentWillUnMount() {
        this._isMounted = false
    }

    callback(key) {
        console.log(key);
        this.setState({
            key:key
        });
    }

    getData(){
        this._isMounted = true;
        let {page1,pageSize1,applyNo1,realName1,autoType1,startApplyDate1,endApplyDate1}=this.state;
        var redata1 = {page:page1,pageSize:pageSize1,applyNo:applyNo1,autoType:autoType1,realName:realName1,startApplyDate:startApplyDate1,endApplyDate:endApplyDate1};
        ajax.post("/admin/autoloanApply/notReceive/list",redata1)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.result;
                    var total1=response.totalCount;
                    this.setState({
                        data1:datalist,
                        total1:total1
                    });
                    // console.log(this.state.data1);
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });

        //未收件
        let redata2 = {
            page: this.state.page2,
            pageSize:this.state.pageSize2,
            storeCode:this.state.storeCode2,
            applyNo: this.state.applyNo2,
            realName:this.state.realName2,
            autoType:this.state.autoType2,
            startApplyDate: this.state.startApplyDate2,
            endApplyDate:this.state.endApplyDate2
        };
        ajax.post("/admin/autoloanApply/hasReceive/list",redata2)
            .then(response =>{
                if(response.code=="0"){
                    var datalist2=response.result;
                    var total2=response.totalCount;
                    this.setState({
                        data2:datalist2,
                        total2:total2
                    });
                    // console.log(this.state.data2);
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
    }

    disabledStartDate1(startValue){
        if (!startValue || !this.state.endApplyDate1) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endApplyDate1.toDate().getTime();
    };
    disabledStartDate2(startValue){
        if (!startValue || !this.state.endApplyDate2) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endApplyDate2.toDate().getTime();
    };
    disabledEndDate1(endValue){
        if (!endValue || !this.state.startApplyDate1) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startApplyDate1.toDate().getTime();
    };
    disabledEndDate2(endValue){
        if (!endValue || !this.state.startApplyDate2) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startApplyDate2.toDate().getTime();
    };

    //普通字段输入更改state
    onChange1(field, e){
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
        }, ()=> {
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
                this.setState({
                    page1:1,
                })
                let data1 = {
                    page: 1,
                    pageSize:this.state.pageSize1,
                    applyNo: this.state.applyNo1,
                    realName:this.state.realName1,
                    autoType:this.state.autoType1,
                    startApplyDate: this.state.startApplyDate1up,
                    endApplyDate:this.state.endApplyDate1up
                };
                ajax.post("/admin/autoloanApply/notReceive/list",data1)
                    .then(response =>{
                        // console.log(response);
                        if(response.code=="0"){
                            var datalist1=response.result;
                            var total1=response.totalCount;
                            this.setState({
                                data1:datalist1,
                                total1:total1,
                            });
                            // console.log(this.state.data1);
                        }else{
                            console.log("list"+response.msg);
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
                this.setState({
                    page2:1,
                })
                let data = {
                    page: 1,
                    pageSize:this.state.pageSize2,
                    applyNo: this.state.applyNo2,
                    realName:this.state.realName2,
                    autoType:this.state.autoType2,
                    startApplyDate: this.state.startApplyDate2up,
                    endApplyDate:this.state.endApplyDate2up
                };
                ajax.post("/admin/autoloanApply/hasReceive/list",data)
                    .then(response =>{
                        console.log(response);
                        if(response.code=="0"){
                            var datalist=response.result;
                            var total2=response.totalCount;
                            this.setState({
                                data2:datalist,
                                total2:total2
                            });
                            console.log(this.state.data2);
                        }else{
                            console.log("list"+response.msg);
                            message.error(response.msg);
                        }
                    })
            } else {
                message.error("输入信息有误！");
            }
        });
    };

    changeStatus = (e, record) => {
        let _this = this;
        confirm({
            title: '您是否确认'+e.operation+'操作?',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                ajax.post("/admin/autoloanApply/receive/confirm", {applyNo: e.applyNo})
                    .then(response => {
                        console.log(response);
                        if (response.code == "0") {
                            _this.getData();
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

    changePage1=(page)=>{
        const currentPage=page;
        this.setState({
            page1:currentPage,
        });
        let data1 = {
            page:currentPage,
            pageSize:this.state.pageSize1,
            applyNo: this.state.applyNo1,
            realName:this.state.realName1,
            autoType:this.state.autoType1,
            startApplyDate: this.state.startApplyDate1,
            endApplyDate:this.state.endApplyDate1
        };
        ajax.post("/admin/autoloanApply/notReceive/list",data1)
            .then(response =>{
                // console.log(response);
                if(response.code=="0"){
                    var datalist1=response.result;
                    var total1=response.totalCount;
                    this.setState({
                        data1:datalist1,
                        total1:total1,
                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
    }
    changePage2=(page)=>{
        const currentPage=page;
        this.setState({
            page2:currentPage,
        });
        let data = {
            page:currentPage,
            pageSize:this.state.pageSize2,
            applyNo: this.state.applyNo2,
            realName:this.state.realName2,
            autoType:this.state.autoType2,
            startApplyDate: this.state.startApplyDate2,
            endApplyDate:this.state.endApplyDate2
        };
        console.log("提交参数：",data);
        ajax.post("/admin/autoloanApply/hasReceive/list",data)
            .then(response =>{
                console.log(response);
                if(response.code=="0"){
                    var datalist=response.result;
                    var total2=response.totalCount;
                    this.setState({
                        data2:datalist,
                        total2:total2,
                    });
                    console.log(this.state.data2);
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })
    };

    render() {
        let self = this;
        const { getFieldDecorator } = this.props.form;
        const flag=this.state.flag;

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
            title: '贷款银行',
            dataIndex: 'loanBankName',
            key: 'loanBankName',
            },{
            title: '贷款金额（元）',
            dataIndex: 'loadMoney',
            key: 'loadMoney',
        },{
            title: '申请时间',
            dataIndex: 'applyDate',
            key: 'applyDate',
        },{
            title: '状态',
            dataIndex: 'isSendStr',
            key: 'isSendStr',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => <div  style={{color:'#1890FF',cursor:'pointer'}}
                                            onClick={this.changeStatus.bind(this, record)}>{record.operation}</div>
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
            title: '贷款银行',
            dataIndex: 'loanBankName',
            key: 'loanBankName',
        },{
            title: '贷款金额（元）',
            dataIndex: 'loadMoney',
            key: 'loadMoney',
        },{
            title: '申请时间',
            dataIndex: 'applyDate',
            key: 'applyDate',
        }];
        const dataCont1 =this.state.data1,
              dataCont2 =this.state.data2;
        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>收件登记</Breadcrumb.Item>
                </Breadcrumb>
                {/* {this.state.key == "1" ? <Button className="toOpinion" type="primary" htmlType="submit" onClick={this.onChangeFlag}>{this.state.btnMsg}</Button> : null} */}
                {/*查询选项*/}
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="未收件" key="1">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit1}>
                                <FormItem label="申请单号：">
                                    <Input placeholder="请输入申请单号"  onChange={this.onChange1.bind(this, 'applyNo1')}/>
                                </FormItem>
                                <FormItem label="客户姓名：">
                                    <Input placeholder="请输入客户姓名"  onChange={this.onChange1.bind(this, 'realName1')}/>
                                </FormItem>
                                <FormItem label="车辆类型：">
                                    <Select placeholder="请选择车辆类型" defaultValue={'所有'} onChange={this.onChangeSelect.bind(this, 'autoType1')}>
                                        <Option key="0" value="" >所有</Option>
                                        <Option key="0" value="0" >新车</Option>
                                        <Option key="0" value="1" >二手车</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="申请时间：" >
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker disabledDate={this.disabledStartDate1}
                                                    placeholder="开始日期"
                                                    onChange={this.onChangeStartDate1}
                                        />
                                    </Col>
                                    <Col span="1" style={{display:'inline-block'}}>
                                        <p className="ant-form-split">-</p>
                                    </Col>
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker  disabledDate={this.disabledEndDate1}
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
                                <Table rowKey={(record) => record.id} columns={columns1} dataSource={dataCont1} pagination={{
                                    simple:false,
                                    current:this.state.page1,
                                    total:this.state.total1,
                                    onChange:this.changePage1,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="已收件" key="2">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit2}>
                                <FormItem label="申请单号：">
                                    <Input placeholder="请输入申请单号"  onChange={this.onChange1.bind(this, 'applyNo2')}/>
                                </FormItem>
                                <FormItem label="客户姓名：">
                                    <Input placeholder="请输入客户姓名"  onChange={this.onChange1.bind(this, 'realName2')}/>
                                </FormItem>
                                <FormItem label="车辆类型：">
                                    <Select placeholder="请选择车辆类型" defaultValue={'所有'} onChange={this.onChangeSelect.bind(this, 'autoType2')}>
                                        <Option key="0" value="" >所有</Option>
                                        <Option key="0" value="0" >新车</Option>
                                        <Option key="0" value="1" >二手车</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="申请时间：" >
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker disabledDate={this.disabledStartDate2}
                                                    placeholder="开始日期"
                                                    onChange={this.onChangeStartDate2}
                                        />
                                    </Col>
                                    <Col span="1" style={{display:'inline-block'}}>
                                        <p className="ant-form-split">-</p>
                                    </Col>
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker  disabledDate={this.disabledEndDate2}
                                                     placeholder="截止日期"
                                                     onChange={this.onChangeEndDate2}
                                        />
                                    </Col>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" style={{marginLeft: '32px' }}>查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns2} dataSource={dataCont2} pagination={{
                                    simple:false,
                                    current:this.state.page2,
                                    total:this.state.total2,
                                    onChange:this.changePage2,
                                }} />
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