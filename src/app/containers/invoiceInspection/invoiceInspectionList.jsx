import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./invoiceInspection.less";
import ajax from "../../utils/ajax";
import noData from "../../images/noData.png"
import InvoiceReports from '../../components/reportCom/invoiceReports'

class InvoiceInspectionList extends React.Component {
    state = {
        startValue1: null,
        endValue1: null,
        startValue2: null,
        endValue2: null,
        data1: [],
        pagination1: {},
        loading: false,
        loadingData: true,
        isEmpty: false,

        page1:1,
        pageSize1: 10,
        total1:undefined,
        startApplyDate1: undefined,
        endApplyDate1:undefined,
        startApplyDate2: undefined,
        endApplyDate2:undefined,

        dataCont1: [],
        previewVisible: false,
        datalist: []
    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
        this.disabledStartDate2 = this.disabledStartDate2.bind(this);
        this.disabledEndDate2 = this.disabledEndDate2.bind(this);
    };

    componentWillMount= (e) =>{
        this.getList();
    };
    disabledStartDate1(startValue){
        if (!startValue || !this.state.endApplyDate1) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endApplyDate1.toDate().getTime();
    };
    disabledEndDate1(endValue){
        if (!endValue || !this.state.startApplyDate1) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startApplyDate1.toDate().getTime();
    };
    disabledStartDate2(startValue){
        if (!startValue || !this.state.endApplyDate2) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endApplyDate2.toDate().getTime();
    };
    disabledEndDate2(endValue){
        if (!endValue || !this.state.startApplyDate2) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startApplyDate2.toDate().getTime();
    };

    changePage = (page) => {
        const currentPage=page;
        this.setState({
            page1:currentPage,
        },()=>{
            this.getList();
        });
    }

    //普通字段输入更改state
    onChange(field, e){
        let valStr = e.target.value;
        console.log(field, 'change', valStr);
        this.setState({
            [field]: valStr,
        });
    };
    //select选择option更改state
    onChangeSelect(field, value) {
        this.setState({
            [field]: value,
        });
        console.log(field, 'change', value);
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
    search_record () {
        var _this = this
        this.setState({
            page1: 1
        },() => {
            this.getList();
        })
    }
    closedata () {
        this.setState({ previewVisible: false })
    }

    myshowReport (i,e) {
        var _this = this
        ajax.post("/admin/ocrInvoice/info",{id: i})
        .then(response => {
            if(response.code == "0") {
                _this.setState({
                    previewVisible: true,
                    datalist: {...JSON.parse(response.data.invoiceCheck), ...JSON.parse(response.data.invoiceInfo)}
                },() => {
                    console.log(this.state.datalist)
                })
            }else {
                message.error(response.msg);
            }
        });
    }
    getList () {
        this.setState({
            loadingData: true,
            isEmpty: false,
        })
        ajax.post("/admin/ocrInvoice/list",{code: this.state.code, createTimeBegin : this.state.startApplyDate2up ,createTimeEnd: this.state.endApplyDate2up, queryTimeBegin : this.state.startApplyDate1up, queryTimeEnd : this.state.endApplyDate1up, pageNumber: this.state.page1,pageSize: 10})
        .then(response => {
            if(response.code == "0") {
                if (response.data.list.length == 0) {
                    this.setState({
                        isEmpty: true,
                    })
                }else {
                    this.setState({
                        isEmpty: false,
                    })
                }
                this.setState({
                    dataCont1: response.data.list,
                    total1: response.data.totalCount
                })
            }else {
                message.error(response.msg);
            }
            this.setState({
                loadingData: false
            })
        });
    }


    render() {
        const columns1 = [{
            title: '发票代码',
            dataIndex: 'code',
            key: 'code',

        }, {
            title: '发票类型',
            dataIndex: 'typeName',
            key: 'typeName',
        }, {
            title: '开票日期',
            dataIndex: 'createTime',
            key: 'createTime',
        }, {
            title: '发票金额',
            dataIndex: 'taxAmount',
            key: 'taxAmount',
        },{
            title: '查询时间',
            dataIndex: 'queryTime',
            key: 'queryTime',
        },{
            title: '查验结果',
            dataIndex: 'checkResult',
            key: 'checkResult',
            render: (text, record) =><span>{record.checkResult == "true"? '查验成功' : '查验失败'}</span>
        },{
            title: '报告',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) =><a onClick={this.myshowReport.bind(this,record.id)} disabled={record.checkResult == "false"}>{record.checkResult == "false"? '' : '查看'}</a>
        }];
        const dataCont1 = this.state.dataCont1;
        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>发票查验记录</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div className="invoice_inspection_list" style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    <Form>
                        <FormItem label="发票代码">
                            <Input placeholder="请输入发票代码"  onChange={this.onChange.bind(this, 'code')}/>
                        </FormItem>
                        <FormItem label="开票日期" >
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
                        <FormItem label="查询时间" >
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
                            <Button type="primary" onClick={this.search_record.bind(this)}>查询</Button>
                        </FormItem>
                    </Form>
                    <div className="ant-form-split common_table">
                        <Table rowKey={(record) => record.id} loading={this.state.loadingData} columns={columns1} dataSource={dataCont1} pagination={{
                            simple:false,
                            current:this.state.page1,
                            total:this.state.total1,
                            onChange:this.changePage,
                        }} />
                        {this.state.isEmpty?
                        <div className="table_noData">
                            <img src={noData} alt='noData'/>
                            <div>暂时没有数据</div>
                        </div>
                        :''
                        }
                    </div>
                    {this.state.previewVisible?
                        <InvoiceReports
                            closeMoadl = {this.closedata.bind(this)}
                            datalist = {this.state.datalist}
                        ></InvoiceReports>
                        :
                        ''
                    }
                    
                </div>
            </div>
        )
    }
}
const invoiceInspectionList = Form.create()(InvoiceInspectionList);
export default invoiceInspectionList;