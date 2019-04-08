import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./auditList.less";
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
        storeLists:[],

        key:"1",
        page1:1,
        page2:1,
        pageSize1: 10,
        pageSize2: 10,
        total1:"",
        total2:"",
        storeCode1:undefined,
        storeCode2:undefined,
        applyNo1: undefined,
        applyNo2: undefined,
        status1:undefined,
        status2:undefined,
        startApplyDate1: undefined,
        endApplyDate1:undefined,
        startApplyDate2: undefined,
        endApplyDate2:undefined,
    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
        this.disabledStartDate2 = this.disabledStartDate2.bind(this);
        this.disabledEndDate2 = this.disabledEndDate2.bind(this);
        this.onChange1 = this.onChange1.bind(this);
    };

    componentWillMount= (e) =>{
        this._isMounted = true;
        let {page1,pageSize1,applyNo1,storeCode1,startApplyDate1,endApplyDate1,status1}=this.state;
        var redata = {page:page1,applyNo:applyNo1,pageSize:pageSize1,storeCode:storeCode1,status:status1,startApplyDate:startApplyDate1,endApplyDate:endApplyDate1};
        ajax.post("/admin/autoloanApply/second/audit/list",redata)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.result,
                        total1=response.totalCount;
                    this.setState({
                        data1:datalist,
                        total1:total1
                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });

        //其他
        let data2 = {
            page: this.state.page2,
            pageSize:this.state.pageSize2,
            storeCode:this.state.storeCode2,
            applyNo: this.state.applyNo2,
            status:this.state.status2,
            startApplyDate: this.state.startApplyDate2,
            endApplyDate:this.state.endApplyDate2
        };
        ajax.post("/admin/autoloanApply/audit/all/list",data2)
            .then(response =>{
                if(response.code=="0"){
                    var datalist2=response.result,
                        total2=response.totalCount;
                    this.setState({
                        data2:datalist2,
                        total2:total2
                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })

        //车行列表
        ajax.post("/admin/store/getList", null)
            .then(response => {
                if (response.code == "0") {
                    var data = response.data;
                    if (this._isMounted) {
                        this.setState({
                            storeLists: data
                        })
                    }
                } else {
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
                    page1:1
                });
                let data1 = {
                    page: 1,
                    pageSize:this.state.pageSize1,
                    storeCode:this.state.storeCode1,
                    applyNo: this.state.applyNo1,
                    status:this.state.status1,
                    startApplyDate: this.state.startApplyDate1up,
                    endApplyDate:this.state.endApplyDate1up,
                    mobilePhone: this.state.mobilePhone
                };
                ajax.post("/admin/autoloanApply/second/audit/list",data1)
                    .then(response =>{
                        if(response.code=="0"){
                            var datalist1=response.result,
                                total1=response.totalCount;
                            this.setState({
                                data1:datalist1,
                                total1:total1
                            });
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
                });
                let data = {
                    page:1,
                    pageSize:this.state.pageSize2,
                    storeCode:this.state.storeCode2,
                    applyNo: this.state.applyNo2,
                    status:this.state.status2,
                    startApplyDate: this.state.startApplyDate2up,
                    endApplyDate:this.state.endApplyDate2up
                };
                ajax.post("/admin/autoloanApply/audit/all/list",data)
                    .then(response =>{
                        console.log(response);
                        if(response.code=="0"){
                            var datalist=response.result,
                                total2=response.totalCount;
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
    changePage1=(page)=>{
        const currentPage=page;
        this.setState({
            page1:currentPage,
        },()=>{

        });
        let data1 = {
            page: currentPage,
            pageSize:this.state.pageSize1,
            storeCode:this.state.storeCode1,
            applyNo: this.state.applyNo1,
            status:this.state.status1,
            startApplyDate: this.state.startApplyDate1,
            endApplyDate:this.state.endApplyDate1,
            mobilePhone: this.state.mobilePhone
        };
        ajax.post("/admin/autoloanApply/second/audit/list",data1)
            .then(response =>{
                // console.log(response);
                if(response.code=="0"){
                    var datalist1=response.result,
                        total1=response.totalCount;
                    this.setState({
                        data1:datalist1,
                        total1:total1
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
        },()=>{

        });
        let data = {
            page:currentPage,
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
                    var datalist2=response.result,
                        total2=response.totalCount;
                    this.setState({
                        data2:datalist2,
                        total2:total2
                    });
                    console.log(this.state.data2);
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })
    }

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
            title: '贷款期数',
            dataIndex: 'periodsId',
            key: 'periodsId',
        },{
            title: '申请时间',
            dataIndex: 'storeApplyDate',
            key: 'storeApplyDate',
        }, {
            title: '申请状态',
            dataIndex: 'status',
            key: 'status',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) =><Link to={'/auditList/detailOpinion3/' + record.applyNo}>审核</Link>
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
            title: '业务员',
            dataIndex: 'applyEmployeeName',
            key: 'applyEmployeeName',
        },{
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
            title: '贷款期数',
            dataIndex: 'periodsId',
            key: 'periodsId',
        }, {
            title: '申请时间',
            dataIndex: 'storeApplyDate',
            key: 'storeApplyDate',
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
            title: '终审意见',
            dataIndex: 'lastOpinion',
            key: 'lastOpinion',
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => <Link to={'/auditList/detail/' + record.applyNo} name="operate">详情</Link>
        }];
        const dataCont1 =this.state.data1,
            dataCont2 =this.state.data2;

        //门店选项
        let storeLists = this.state.storeLists,
            storeOption = [];
            storeOption.push( <Option key='-1' value=''>查询所有</Option>);
        for (let i = 0; i < storeLists.length; i++) {
            storeOption.push(<Option key={storeLists[i].code} value={storeLists[i].code} >{storeLists[i].name}</Option>);
        }

        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>复审列表</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="待审核" key="1">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit1}>
                                <FormItem label="申请单号：">
                                    <Input placeholder="请输入申请单号"  onChange={this.onChange1.bind(this, 'applyNo1')}/>
                                </FormItem>
                                <FormItem label="申请状态：">
                                    <Select placeholder="请选择申请状态" onChange={this.onChangeSelect.bind(this, 'status1')}>
                                        <Option key='-1' value=''>查询所有</Option>
                                        <Option key="0" value="21" >初审通过(待复审)</Option>
                                        <Option key="1" value="33" >待复审重审</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店"  onChange={this.onChangeSelect.bind(this, 'storeCode1')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="手机号码："
                                >
                                    <Input id="mobilePhone" placeholder="请输入手机号码" onChange={this.onChange1.bind(this, 'mobilePhone')}/>
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
                                }}/>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="全部" key="2">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit2}>
                                <FormItem label="申请单号：">
                                    <Input placeholder="请输入申请单号"  onChange={this.onChange1.bind(this, 'applyNo2')}/>
                                </FormItem>
                                <FormItem label="申请状态：">
                                    <Select placeholder="请选择申请状态" onChange={this.onChangeSelect.bind(this, 'status2')}>
                                        <Option key='-1' value=''>查询所有</Option>
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
                                    </Select>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店"  onChange={this.onChangeSelect.bind(this, 'storeCode2')}>
                                        {storeOption}
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
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns2} dataSource={dataCont2}  pagination={{
                                    simple:false,
                                    current:this.state.page2,
                                    total:this.state.total2,
                                    onChange:this.changePage2,
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