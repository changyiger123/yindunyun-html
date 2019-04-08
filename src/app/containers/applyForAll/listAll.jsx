import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table, Pagination , Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import "./listAll.less";
import ajax from "../../utils/ajax";
import {message} from "antd/lib/index";

class applicationForm extends React.Component {
    state = {
        startValue: null,
        endValue: null,
        data: [],
        pagination: {},
        loading: false,
        selectedRowKeys: [],
        employeeLists:[],
        page:1,
        pageSize:10,
        applyNo:undefined,
        applyEmployeeCode:undefined,
        realName:undefined,
        autoType:undefined,
        status:undefined,
        startApplyDate: undefined,
        endApplyDate:undefined
    };
    constructor(props) {
        super(props);
        this.disabledStartDate = this.disabledStartDate.bind(this);
        this.disabledEndDate = this.disabledEndDate.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        // this.showCurRowMessage = this.showCurRowMessage.bind(this);
    };

    componentDidMount= (e) =>{
        this._isMounted = true;
        let redata={ page:1,pageSize:'',applyNo:'',applyEmployeeCode:'',realName:'',autoType:'',status:'',startApplyDate:'',endApplyDate:''};
        ajax.post("/admin/autoloanApply/head/all/list",redata)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.result,
                        total=response.totalCount;
                    this.setState({
                        data:datalist,
                        total:total
                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });

        ajax.post("/admin/admin/getEmployee",{isAll:1})
            .then(response => {
                if (response.code == "0") {
                    var data = response.data;
                    this.setState({
                        employeeLists: data
                    })
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });
    };
    componentWillUnmount() {
        this._isMounted = false
    }

    disabledStartDate(startValue){
        if (!startValue || !this.state.endApplyDate) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endApplyDate.toDate().getTime();
    };
    disabledEndDate(endValue){
        if (!endValue || !this.state.startApplyDate) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startApplyDate.toDate().getTime();
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
    onChangeStartDate=(value, dateString) =>{
        this.setState({
            startApplyDate: value,
            startApplyDateup: dateString,
        }, ()=> {
            console.log(this.state.startApplyDate)
        });
    };
    onChangeEndDate=(value, dateString) =>{
        this.setState({
            endApplyDate: value,
            endApplyDateup: dateString,
        }, ()=> {
            console.log(this.state.endApplyDate)
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    page:1,
                })
                let data = {
                    page:1,
                    pageSize:this.state.pageSize,
                    applyNo:this.state.applyNo,
                    applyEmployeeCode:this.state.applyEmployeeCode,
                    realName:this.state.realName,
                    autoType:this.state.autoType,
                    status:this.state.status,
                    startApplyDate:this.state.startApplyDateup,
                    endApplyDate:this.state.endApplyDateup
                };
                ajax.post("/admin/autoloanApply/head/all/list",data)
                    .then(response =>{
                        console.log(response);
                        if(response.code=="0"){
                            var datalist=response.result,
                                total=response.totalCount;
                            this.setState({
                                data:datalist,
                                total:total
                            });
                            console.log(this.state.data);
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

    changePage=(page)=>{
        const currentPage=page;
        this.setState({
            page:currentPage,
        },()=>{
            console.log(this.state.page);
        });
        let data = {
            page:currentPage,
            pageSize:this.state.pageSize,
            applyNo:this.state.applyNo,
            applyEmployeeCode:this.state.applyEmployeeCode,
            realName:this.state.realName,
            autoType:this.state.autoType,
            status:this.state.status,
            startApplyDate:this.state.startApplyDate,
            endApplyDate:this.state.endApplyDate
        };
        ajax.post("/admin/autoloanApply/head/all/list",data)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.result,
                        total=response.totalCount;
                    this.setState({
                        data:datalist,
                        total:total
                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
    }

    render() {
        let self = this;
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '申请单号',
            dataIndex: 'applyNo',
            key: 'applyNo',

        }, {
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
            title: '申请详情',
            dataIndex: 'applyDetail',
            key: 'applyDetail',
            render: (text, record) =><Link to={'/auditList/detail/' + record.applyNo} name="operate" disabled={record.applyDetail==0?false:true}>{record.applyDetail==0?'详情':'-'}</Link>
        },{
            title: '审核详情',
            dataIndex: 'auditDetail',
            key: 'auditDetail',
            render: (text, record) => <Link to={'/ApplicationForPayment/remitPassOrNo/' + record.applyNo+'/0/1'} name="operate" disabled={record.auditDetail==0?false:true}>{record.auditDetail==0?'详情':'-'}</Link>
        }];
        const dataCont =this.state.data;
        let employeeLists = this.state.employeeLists,
            employeeOption = [];
             employeeOption.push(<Option key='-1' value=''>查询所有</Option>);
        for (let i = 0; i < employeeLists.length; i++) {
            employeeOption.push(<Option key={employeeLists[i].userCode} value={employeeLists[i].userCode} >{employeeLists[i].realName}</Option>);
        }
        return(
            <div className="staffManage auditList">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
                    <Breadcrumb.Item>审核列表</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{ margin: 24,padding:'0 32px', background: '#fff', minHeight: 780 }}>
                    {/*查询选项*/}
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="申请单号：">
                            <Input placeholder="请输入申请单号" onChange={this.onChange1.bind(this, 'applyNo')}/>
                        </FormItem>
                        <FormItem label="业务员：">
                            <Select placeholder="请选择业务员" onChange={this.onChangeSelect.bind(this, 'applyEmployeeCode')}>
                                {employeeOption}
                            </Select>
                        </FormItem>
                        <FormItem label="客户姓名：">
                            <Input placeholder="请输入客户姓名" onChange={this.onChange1.bind(this, 'realName')}/>
                        </FormItem>
                        <FormItem label="车辆类型：">
                            <Select placeholder="请选择车辆类型" onChange={this.onChangeSelect.bind(this, 'autoType')}>
                                <Option key='-1' value=''>查询所有</Option>
                                <Option key="0" value="0" >新车</Option>
                                <Option key="1" value="1" >二手车</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="申请时间："
                        >
                            <Col span="11" style={{display:'inline-block'}}>
                                <DatePicker disabledDate={this.disabledStartDate}
                                            placeholder="开始日期"
                                            onChange={this.onChangeStartDate}
                                />
                            </Col>
                            <Col span="1" style={{display:'inline-block'}}>
                                <p className="ant-form-split">-</p>
                            </Col>
                            <Col span="11" style={{display:'inline-block'}}>
                                <DatePicker  disabledDate={this.disabledEndDate}
                                             placeholder="截止日期"
                                             onChange={this.onChangeEndDate}
                                />
                            </Col>
                        </FormItem>
                        <FormItem label="申请状态：">
                            <Select placeholder="请选择申请状态" onChange={this.onChangeSelect.bind(this, 'status')}>
                                <Option key='-1' value=''>查询所有</Option>
                                <Option key="0" value="-1" >已撤销</Option>
                                <Option key="0" value="11" >征信审核通过(未提交)</Option>
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
                                <Option key="1" value="100" >已抵押</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </FormItem>
                    </Form>
                   {/* <Button type="primary"><Icon type="plus" /><Link to="/newApplication/newEdit">新建</Link></Button>*/}
                    <div className="ant-form-split">
                        <Table className="listTable" rowKey={(record) => record.applyNo} columns={columns} dataSource={dataCont} pagination={{
                            simple:false,
                            current:this.state.page,
                            total:this.state.total,
                            onChange:this.changePage,
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}
const application = Form.create()(applicationForm);
export default application;