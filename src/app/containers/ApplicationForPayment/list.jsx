import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./distributionList.less";
import {message} from "antd/lib/index";
import ajax from "../../utils/ajax";

class applicationForPaymentListForm extends React.Component {
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
        dealerLists:[],

        key:"1",
        page1:'1',
        page2:'1',
        pageSize1: '',
        pageSize2: '',
        autoType1:undefined,
        autoType2:undefined,
        applyNo1: undefined,
        applyNo2: undefined,
        realName1:undefined,
        realName2:undefined,
        startApplyDate1: undefined,
        endApplyDate1:undefined,
        startApplyDate2: undefined,
        endApplyDate2:undefined,
        flag:false
    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
        this.disabledStartDate2 = this.disabledStartDate2.bind(this);
        this.disabledEndDate2 = this.disabledEndDate2.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.onChangeFlag = this.onChangeFlag.bind(this);
        // this.showCurRowMessage = this.showCurRowMessage.bind(this);
    };

    componentWillMount= (e) =>{
        this._isMounted = true;
        //未审核
        let data1 = {
            page:this.state.page1,
            pageSize: this.state.pageSize1,
            autoType:this.state.autoType1,
            applyNo: this.state.applyNo1,
            realName:this.state.realName1,
            startApplyDate: this.state.startApplyDate1,
            endApplyDate:this.state.endApplyDate1,
        };
        ajax.post("/admin/autoloanApply/waitRemitApply/list",data1)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.result;
                    this.setState({
                        data1:datalist
                    });
                    // console.log(this.state.data1);
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });

        //已审核
        let data2 = {
            page:this.state.page2,
            pageSize: this.state.pageSize2,
            autoType:this.state.autoType2,
            applyNo: this.state.applyNo2,
            realName:this.state.realName2,
            startApplyDate: this.state.startApplyDate2,
            endApplyDate:this.state.endApplyDate2,
        };
        ajax.post("/admin/autoloanApply/afterFinanceAudit/list",data2)
            .then(response =>{
                if(response.code=="0"){
                    var datalist2=response.result;
                    this.setState({
                        data2:datalist2
                    });
                    // console.log(this.state.data2);
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })

        //车行列表
        ajax.post("/admin/autoDealer/getDealers", null)
            .then(response => {
                // console.log(response);
                if (response.code == "0") {
                    var data = response.data;
                    if (this._isMounted) {
                        this.setState({
                            dealerLists: data
                        })
                    }
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });

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

    onChangeFlag = (e) => {
        this.setState({
            flag: true
        });
    }

    disabledStartDate1(startValue){
        if (!startValue || !this.state.endValue1) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endValue1.toDate().getTime();
    };
    disabledStartDate2(startValue){
        if (!startValue || !this.state.endValue2) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endValue2.toDate().getTime();
    };
    disabledEndDate1(endValue){
        if (!endValue || !this.state.startValue1) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startValue1.toDate().getTime();
    };
    disabledEndDate2(endValue){
        if (!endValue || !this.state.startValue2) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startValue2.toDate().getTime();
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
            startApplyDate1: dateString,
        }, ()=> {
            console.log(this.state.startApplyDate1)
        });
    };
    onChangeEndDate1=(value, dateString) =>{
        this.setState({
            endApplyDate1: dateString,
        }, ()=> {
            console.log(this.state.endApplyDate1)
        });
    };
    onChangeStartDate2=(value, dateString) =>{
        this.setState({
            startApplyDate2: dateString,
        }, ()=> {
            console.log(this.state.startApplyDate2)
        });
    };
    onChangeEndDate2=(value, dateString) =>{
        this.setState({
            endApplyDate2: dateString,
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
                    pageSize:this.state.pageSize1,
                    storeCode:this.state.storeCode1,
                    applyNo: this.state.applyNo1,
                    status:this.state.status1,
                    startApplyDate: this.state.startApplyDate1,
                    endApplyDate:this.state.endApplyDate1
                };
                ajax.post("/admin/autoloanApply/all/list",data1)
                    .then(response =>{
                        // console.log(response);
                        if(response.code=="0"){
                            var datalist1=response.result;
                            this.setState({
                                data1:datalist1
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
                let data = {
                    page: this.state.page2,
                    pageSize:this.state.pageSize2,
                    storeCode:this.state.storeCode2,
                    applyNo: this.state.applyNo2,
                    status:this.state.status2,
                    startApplyDate: this.state.startApplyDate2,
                    endApplyDate:this.state.endApplyDate2
                };
                ajax.post("/admin/autoloanApply/audit/all/list",data)
                    .then(response =>{
                        console.log(response);
                        if(response.code=="0"){
                            var datalist=response.result;
                            this.setState({
                                data2:datalist
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

    render() {
        let self = this;
        const { getFieldDecorator } = this.props.form;
        const flag=this.state.flag;

        const columns1 = [{
            title: '申请单号',
            dataIndex: 'applyNo',
            key: 'applyNo',

        },{
            title: '业务员',
            dataIndex: 'applyEmployeeName',
            key: 'applyEmployeeName',
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
        },{
            title: '申请时间',
            dataIndex: 'applyDate',
            key: 'applyDate',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },{
            title: '风控报告',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) =><Link to={flag == true ? '/auditList/detailOpinion2/' + record.applyNo  : '/auditList/list2'}>初审</Link>
            // render: (text, record) =><Link to={'/auditList/detail/' + record.applyNo}>初审</Link>
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) =><Link to={flag == true ? '/auditList/detailOpinion2/' + record.applyNo  : '/auditList/list2'}>初审</Link>
            // render: (text, record) =><Link to={'/auditList/detail/' + record.applyNo}>初审</Link>
        }];
        const columns2 = [{
            title: '申请单号',
            dataIndex: 'applyNo',
            key: 'applyNo',

        }, {
            title: '门店',
            dataIndex: 'applyEmployeeName',
            key: 'applyEmployeeName',
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
            dataIndex: 'loadBankName',
            key: 'loadBankName',
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
            dataIndex: 'status',
            key: 'status',
        },{
            title: '审核员意见',
            dataIndex: 'firstOpinion',
            key: 'firstOpinion',
        },{
            title: '复评师意见',
            dataIndex: 'secondOpinion',
            key: 'secondOpinion',
        },{
            title: '复评师意见',
            dataIndex: 'lastOpinion',
            key: 'lastOpinion',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => <Link to={record.operation == "0" ? '/auditList/detail/' + record.applyNo  : '/newApplication/list/' + record.applyNo} name="operate">{record.operation == "0" ? "详情" : "编辑"}</Link>
        }];
        const dataCont1 =this.state.data1,
            dataCont2 =this.state.data2;
        const pagination1 = {
            total: dataCont1.length,
            current: 1,
            showSizeChanger: true,
            onShowSizeChange: function(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: function(current) {
                console.log('Current: ', current);
            }
        };
        const pagination2 = {
            total: dataCont2.length,
            current: 1,
            showSizeChanger: true,
            onShowSizeChange: function(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: function(current) {
                console.log('Current: ', current);
            }
        };

        //门店选项
        let dealerLists = this.state.dealerLists,
            dealerOption = [];
        for (let i = 0; i < dealerLists.length; i++) {
            dealerOption.push(<Option key={dealerLists[i].code} value={dealerLists[i].code} >{dealerLists[i].name}</Option>);
        }

        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>初审列表</Breadcrumb.Item>
                </Breadcrumb>
                {this.state.key == "1" ? <Button className="toOpinion" type="primary" htmlType="submit" onClick={this.onChangeFlag}>开始审单</Button> : null}
                {/*查询选项*/}
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="未审核" key="1">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit1}>
                                <FormItem label="申请单号：">
                                    <Input placeholder="请输入申请单号"  onChange={this.onChange1.bind(this, 'applyNo1')}/>
                                </FormItem>
                                <FormItem label="客户姓名：">
                                    <Input placeholder="请输入客户姓名" onChange={this.onChange1.bind(this, 'realName1')}/>
                                </FormItem>
                                <FormItem label="车辆类型：">
                                    <Select placeholder="请选择车辆类型" onChange={this.onChangeSelect.bind(this, 'autoType1')}>
                                        <Option key="0" value="0" >新车</Option>
                                        <Option key="1" value="1" >二手车</Option>
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
                                    <Button type="primary" htmlType="submit" style={{marginLeft: '32px' }}>查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns1} dataSource={dataCont1} pagination={this.state.pagination1} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="其他" key="2">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit2}>
                                <FormItem label="申请单号：">
                                    <Input placeholder="请输入申请单号"  onChange={this.onChange1.bind(this, 'applyNo2')}/>
                                </FormItem>
                                <FormItem label="申请状态：">
                                    <Select placeholder="请选择申请状态" onChange={this.onChangeSelect.bind(this, 'status2')}>
                                        <Option key="0" value="-1" >已撤销</Option>
                                        <Option key="0" value="20" >待初审</Option>
                                        <Option key="0" value="21" >初审通过(待复审)</Option>
                                        <Option key="0" value="22" >初审不通过</Option>
                                        <Option key="0" value="23" >初审补充资料</Option>
                                        <Option key="0" value="24" >待初审重审</Option>
                                        <Option key="0" value="30" >复审通过(待终审)</Option>
                                        <Option key="0" value="31" >复审不通过</Option>
                                        <Option key="1" value="32" >复审补充资料</Option>
                                        <Option key="0" value="33" >待复审重审</Option>
                                        <Option key="0" value="40" >待家访</Option>
                                        <Option key="0" value="41" >终审不通过</Option>
                                        <Option key="0" value="42" >终审补充资料</Option>
                                        <Option key="0" value="43" >待终审重审</Option>
                                        <Option key="1" value="50" >抵达家访地址</Option>
                                        <Option key="1" value="51" >家访完成</Option>
                                        <Option key="1" value="58" >财务审核补充资料</Option>
                                        <Option key="1" value="59" >门店打款申请重审</Option>
                                        <Option key="1" value="60" >门店打款申请</Option>
                                        <Option key="1" value="61" >财务审核通过</Option>
                                        <Option key="1" value="62" >财务审核不通过</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店"  onChange={this.onChangeSelect.bind(this, 'storeCode2')}>
                                        {dealerOption}
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
                                <Table rowKey={(record) => record.id} columns={columns2} dataSource={dataCont2} pagination={this.state.pagination2} />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}
const applicationForPaymentList = Form.create()(applicationForPaymentListForm);
export default applicationForPaymentList;