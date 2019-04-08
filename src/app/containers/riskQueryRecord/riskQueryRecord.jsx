import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./riskQueryRecord.less";
import ajax from "../../utils/ajax";
import noData from "../../images/noData.png"
import TongDReports from "../../components/reportCom/tongDReports.jsx"
import V3Reports from "../../components/reportCom/v3Reports.jsx"
import TongDSimpleReports from "../../components/reportCom/tongDSimpleReports.jsx"

class RiskQueryRecord extends React.Component {
    state = {
        isEditing: false,
        startValue1: null,
        endValue1: null,
        data1: [],
        pagination1: {},
        loading: false,
        loadingData: true,
        isEmpty: false,
        selectedRowKeys1: [],
        storeLists:[],

        key:"1",
        page1:1,
        pageSize1: 10,
        total1:undefined,
        type:undefined,
        applyNo1: undefined,
        status1:undefined,
        startApplyDate1: undefined,
        endApplyDate1:undefined,
        previewVisible: false,
        v3SearchData: {},
        previewVisible1: false,
        tongdunData: {},

        dataCont1: []
    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
    };

    componentWillMount= (e) =>{
        console.log(this.props.params.id,111111111)
        ajax.post("/admin/rcQueryLog/list",{type:this.props.params.id})
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
    };
    componentWillUnMount() {
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
    disabledEndDate1(endValue){
        if (!endValue || !this.state.startApplyDate1) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startApplyDate1.toDate().getTime();
    };

    changePage1 = (page) => {
        const currentPage=page;
        this.setState({
            page1:currentPage,
            loadingData: true,
            isEmpty: false,
        },()=>{

        });
        let data = {realName: this.state.realName, mobilePhone: this.state.mobilePhone, type: this.props.params.id,addTimeBegin: this.state.startApplyDate1, addTimeEnd: this.state.endApplyDate1, page: currentPage};
        ajax.post("/admin/rcQueryLog/list",data)
        .then(response => {
            if(response.code == "0") {
                if (response.data.length == 0) {
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
    search_record () {
        this.setState({
            page1: 1,
            loadingData: true,
            isEmpty: false,
        })
        var data = {realName: this.state.realName, mobilePhone: this.state.mobilePhone, type: this.props.params.id,addTimeBegin: this.state.startApplyDate1, addTimeEnd: this.state.endApplyDate1, page: 1}
        ajax.post("/admin/rcQueryLog/list",data)
        .then(response => {
            if(response.code == "0") {
                if (response.data.length == 0) {
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

    myShowReport (i,e) {
        var _this = this
        ajax.post("/admin/rcQueryLog/info",{wfid: i[0]})
        .then(response => {
            if(response.code == "0") {
                var json = $.parseJSON(response.data)
                console.log("查看数据：");
                console.log(json)
                if(i[1] == 1) {
                    _this.setState({
                        previewVisible1: true,
                        tongdunData: json
                    })
                }else if (i[1] == 2){
                    _this.setState({
                        previewVisible2: true,
                        tongdunData: json
                    })
                } else if (i[1] == 5) {
                    _this.setState({
                        previewVisible: true,
                        v3SearchData: json
                    })
                }
            }else {
                message.error(response.msg);
            }
        });
    }
    closedata () {
        this.setState({
            previewVisible: false,
            previewVisible1: false,
            previewVisible2: false
        })
    }


    render() {

        const columns1 = [{
            title: '编号',
            dataIndex: 'rcNo',
            key: 'rcNo',

        }, {
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
        }, {
            title: '手机号',
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
        }, {
            title: '身份证号',
            dataIndex: 'cardId',
            key: 'cardId',
        },{
            title: '查询项目',
            dataIndex: 'rcType',
            key: 'rcType',
            render: (text, record) =><span>{record.rcType == 1? '多维度反欺诈报告':record.rcType == 2?'反欺诈报告简版': record.rcType == 5?'大数据防控报告': '银联信用分报告'}</span>
        }, {
            title: '查询时间',
            dataIndex: 'addTime',
            key: 'addTime',
        },{
            title: '操作人',
            dataIndex: 'operatorName',
            key: 'operatorName',
            render: (text,record)=> <span>{record.operatorName?record.operatorName:'管理员'}</span>
        },{
            title: '报告',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) =><a onClick={this.myShowReport.bind(this,[record.rcNo,record.rcType,record.realName])}>查看</a>
        }];
        const dataCont1 = this.state.dataCont1;

        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>{this.props.params.id=="1"?"多维度反欺诈报告":this.props.params.id=="2"?"反欺诈报告简版":"大数据防控报告"}查询记录</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780}}>
                    <Form>
                        <FormItem label="姓名：">
                            <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName')}/>
                        </FormItem>
                        <FormItem label="手机号：">
                            <Input placeholder="请输入手机号"  onChange={this.onChange1.bind(this, 'mobilePhone')}/>
                        </FormItem>
                        {/* <FormItem label="查询项目：">
                            <Select placeholder="请选择查询项目"  onChange={this.onChangeSelect.bind(this, 'type')}>
                                <Option key='0' value=''>查询所有</Option>
                                <Option key="1" value="1" >多维度反欺诈报告</Option>
                                <Option key="2" value="2" >银联信用报告</Option>
                                <Option key="5" value="5" >大数据防控报告</Option>
                            </Select>
                        </FormItem> */}
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
                            onChange:this.changePage1,
                        }} />
                        {this.state.isEmpty?
                        <div className="table_noData">
                            <img src={noData} alt='noData'/>
                            <div>暂时没有数据</div>
                        </div>
                        :''
                        }
                        
                    </div>
                </div>
                {this.state.previewVisible?
                <V3Reports
                    datalist={this.state.v3SearchData}
                    closeMoadl = {this.closedata.bind(this)}
                ></V3Reports>
                :''
                }
                {this.state.previewVisible1?
                <TongDReports
                    data={this.state.tongdunData}
                    closeMoadl = {this.closedata.bind(this)}
                ></TongDReports>
                :
                ''}
                {this.state.previewVisible2?
                <TongDSimpleReports
                    data={this.state.tongdunData}
                    closeMoadl = {this.closedata.bind(this)}
                ></TongDSimpleReports>
                :
                ''}
            </div>
        )
    }
}
const riskQueryRecord = Form.create()(RiskQueryRecord);
export default riskQueryRecord;