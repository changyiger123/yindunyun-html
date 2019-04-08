import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./bankFlow.less";
import ajax from "../../utils/ajax";
import noData from "../../images/noData.png"
import BackReports from '../../components/reportCom/bankReports'

class BankFlowList extends React.Component {
    state = {
        startValue1: null,
        endValue1: null,
        data1: [],
        pagination1: {},
        loading: false,
        loadingData: true,
        isEmpty: false,

        key:"1",
        page1:1,
        pageSize1: 10,
        total1:undefined,
        startApplyDate1: undefined,
        endApplyDate1:undefined,

        dataCont1: [],
        previewVisible: false,
        datalist: []
    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
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
        ajax.post("/admin/bankCardBillLog/info",{code: i})
        .then(response => {
            if(response.code == "0") {
                _this.setState({
                    previewVisible: true,
                    datalist: response.data
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
        ajax.post("/admin/bankCardBillLog/list",{realName: this.state.realName, bankCardCode: this.state.bankCardCode, addTimeBegin: this.state.startApplyDate1up, addTimeEnd: this.state.endApplyDate1up, page: this.state.page1})
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
            title: '编号',
            dataIndex: 'code',
            key: 'code',

        }, {
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
        }, {
            title: '银行卡号',
            dataIndex: 'bankCardCode',
            key: 'bankCardCode',
        }, {
            title: '日期',
            dataIndex: 'addTime',
            key: 'addTime',
        },{
            title: '查询时间',
            dataIndex: 'addTime',
            key: 'addTime1',
        },{
            title: '操作人',
            dataIndex: 'operatorName',
            key: 'operatorName',
            render: (text,record)=> <span>{record.operatorName?record.operatorName:'管理员'}</span>
        },{
            title: '查询结果',
            dataIndex: 'isValid',
            key: 'isValid',
            render: (text, record) =><span>{record.isValid? '查询失败' : '查询成功'}</span>
        },{
            title: '报告',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) =><a onClick={this.myshowReport.bind(this,record.code)}>{record.isValid? '' : '查看'}</a>
        }];
        const dataCont1 = this.state.dataCont1;

        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>银行流水查询记录</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    <Form>
                        <FormItem label="姓名：">
                            <Input placeholder="请输入姓名"  onChange={this.onChange.bind(this, 'realName')}/>
                        </FormItem>
                        <FormItem label="银行卡号：">
                            <Input placeholder="请输入银行卡号"  onChange={this.onChange.bind(this, 'bankCardCode')}/>
                        </FormItem>
                        <FormItem label="查询时间：" >
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
                    <BackReports
                        datalist = {this.state.datalist} 
                        closeModal = {this.closedata.bind(this)}
                    >
                    </BackReports>:''}
                </div>
            </div>
        )
    }
}
const bankFlowList = Form.create()(BankFlowList);
export default bankFlowList;