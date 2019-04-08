import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table, Pagination , Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import "./newApplication.less";
import {message} from "antd/lib/index";
import ajax from "../../utils/ajax";

class applicationForm extends React.Component {
    state = {
        isEditing: false,
        startValue: null,
        endValue: null,
        data: [],
        pagination: {},
        loading: false,
        selectedRowKeys: [],
        employeeLists:[],
        total:undefined,

        page:1,
        pageSize:10,
        applyNo:undefined,
        applyEmployeeCode: undefined,
        realName: undefined,
        mobilePhone: undefined,
        startApplyDate: undefined,
        endApplyDate:undefined
    };
    constructor(props) {
        super(props);
        this.disabledStartDate = this.disabledStartDate.bind(this);
        this.disabledEndDate = this.disabledEndDate.bind(this);
        this.onChange1 = this.onChange1.bind(this);
    };

    componentWillMount() {
        this._isMounted = true;
        let {page,pageSize,applyNo,applyEmployeeCode,realName,mobilePhone,startApplyDate,endApplyDate}=this.state;
        let redata = {page:page,pageSize:pageSize,applyNo:applyNo,applyEmployeeCode:applyEmployeeCode,realName:realName,mobilePhone:mobilePhone,startApplyDate:startApplyDate,endApplyDate:endApplyDate};
        ajax.post("/admin/autoloanApply/waitEdit/list",redata)
            .then(response =>{
                console.log(response);
                if(response.code=="0"){
                    var data = response.result,
                        total=response.totalCount;
                    this.setState({
                        data:data,
                        total:total
                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })

        //获取员工下拉框 列表
        ajax.post("/admin/admin/getEmployee", null)
            .then(response => {
                // console.log(response);
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
    onChange1(field, e) {
        let valStr = e.target.value;
        this.setState({
            [field]: valStr,
        }, ()=> {
        });
    };
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
                let {page,pageSize,applyNo,applyEmployeeCode,realName,mobilePhone,startApplyDateup,endApplyDateup}=this.state;
                let redata = {page:page,pageSize:pageSize,applyNo:applyNo,applyEmployeeCode:applyEmployeeCode,realName:realName,mobilePhone:mobilePhone,startApplyDate:startApplyDateup,endApplyDate:endApplyDateup};
                ajax.post("/admin/autoloanApply/waitEdit/list",redata)
                    .then(response =>{
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

    changePage=(pages)=>{
        const currentPage=pages;
        this.setState({
            page:currentPage,
        },()=>{
        });
        let {page,pageSize,applyNo,applyEmployeeCode,realName,mobilePhone,startApplyDate,endApplyDate}=this.state;
        let redata = {page:page,pageSize:pageSize,applyNo:applyNo,applyEmployeeCode:applyEmployeeCode,realName:realName,mobilePhone:mobilePhone,startApplyDate:startApplyDate,endApplyDate:endApplyDate};
        ajax.post("/admin/autoloanApply/waitEdit/list",redata)
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
            title: '身份证号',
            dataIndex: 'cardId',
            key: 'cardId',
        }, {
            title: '申请时间',
            dataIndex: 'applyDate',
            key: 'applyDate',
        },{
            title: '操作',
            key: 'operation',
            render: (text, record) => <Link to={'/newApplication/newEditParameter/' + record.applyNo } name="operate">编辑</Link>
        }];
        const data = this.state.data;

        let employeeLists = this.state.employeeLists,
            employeeOption = [];
             employeeOption.push(<Option key='-1' value=''>查询所有</Option>);
        for (let i = 0; i < employeeLists.length; i++) {
            employeeOption.push(<Option key={employeeLists[i].userCode} value={employeeLists[i].userCode} >{employeeLists[i].realName}</Option>);
        }

        return(
            <div className="staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
                    <Breadcrumb.Item>申请单列表</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    {/*查询选项*/}
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            id="userId"
                            label="申请单号：">
                            <Input id="userId" placeholder="请输入申请单号"  onChange={this.onChange1.bind(this, 'applyNo')}/>
                        </FormItem>
                        <FormItem label="业务员：">
                            <Select placeholder="请选择业务员"  onChange={this.onChangeSelect.bind(this, 'applyEmployeeCode')}>
                                {employeeOption}
                            </Select>
                        </FormItem>
                        <FormItem
                            id="userName"
                            label="客户姓名：">
                            <Input id="userName" placeholder="请输入客户姓名" onChange={this.onChange1.bind(this, 'realName')} />
                        </FormItem>
                        <FormItem
                            label="手机号码："
                        >
                            <Input id="mobilePhone" placeholder="请输入手机号码" onChange={this.onChange1.bind(this, 'mobilePhone')}/>
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

                        <FormItem>
                            <Button type="primary" htmlType="submit" >查询</Button>
                        </FormItem>
                    </Form>
                    <Button type="primary" ><Icon type="plus" /><Link to="/newApplication/newEdit">新建</Link></Button>

                    <div className="ant-form-split">
                        <Table rowKey={(record) => record.applyNo} columns={columns} dataSource={data} pagination={this.state.pagination}  pagination={{
                            simple:false,
                            current:this.state.page,
                            total:this.state.total,
                            onChange:this.changePage,
                        }}/>
                    </div>
                </div>
            </div>
        )
    }
}
const application = Form.create()(applicationForm);
export default application;