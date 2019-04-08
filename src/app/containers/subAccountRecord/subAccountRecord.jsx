import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import ajax from "../../utils/ajax";
import noData from "../../images/noData.png"

class SubAccountRecord extends React.Component {
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
        datalist: [],
        user_data:[],
        type_data: []
    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
    };

    componentWillMount= (e) =>{
        this.getList();
        ajax.post("/admin/admin/adminInfo/list")
        .then(response => {
            if(response.code == "0") {
                this.setState({
                    user_data: response.data
                })
            }else {
                message.error(response.msg);
            }
        });
        ajax.post("/admin/sConfig/pay/type/list")
        .then(response => {
            if(response.code == "0") {
                this.setState({
                    type_data: response.data
                })
            }else {
                message.error(response.msg);
            }
        });
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
    search_record () {
        var _this = this
        this.setState({
            page1: 1
        },() => {
            this.getList();
        })
    }

    getList () {
        this.setState({
            loadingData: true,
            isEmpty: false,
        })
        ajax.post("/admin/accountLog/users/payLog",{rcNo: this.state.rcNo, rcType: this.state.rcType ,userCode: this.state.userCode, queryStartTime: this.state.startApplyDate1up, queryEndTime: this.state.endApplyDate1up, page: this.state.page1})
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
            dataIndex: 'rcNo',
            key: 'rcNo',
        }, {
            title: '查询项目',
            dataIndex: 'name',
            key: 'name',
        },{
            title: '查询时间',
            dataIndex: 'addTime',
            key: 'addTime',
        }, {
            title: '金额',
            dataIndex: 'money',
            key: 'money',
            render:(text,record)=><span>{record.money}元</span>
        }, {
            title: '余额',
            dataIndex: 'total',
            key: 'total',
            render:(text,record)=><span>{record.total}元</span>
        },{
            title: '操作人',
            dataIndex: 'operateName',
            key: 'operateName',
            render: (text,record)=> <span>{record.operateName?record.operateName:'管理员'}</span>
        }];
        const dataCont1 = this.state.dataCont1;
        var typeData = [<Option key={null} value={null}>查询全部</Option>];
        for (var i=0;i<this.state.type_data.length;i++) {
            typeData.push(<Option key={this.state.type_data[i].type} value={this.state.type_data[i].type}>{this.state.type_data[i].name}</Option>)
        }
        var userData = [<Option key={null} value={null}>查询全部</Option>]
        for (var i = 0;i<this.state.user_data.length;i++) {
            userData.push(<Option key={this.state.user_data[i].userCode} value={this.state.user_data[i].userCode}>{this.state.user_data[i].realName?this.state.user_data[i].realName:'管理员'}</Option>)
        }
        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>查询记录</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    <Form>
                        <FormItem label="编号">
                            <Input placeholder="请输入车辆所有人"  onChange={this.onChange.bind(this, 'rcNo')}/>
                        </FormItem>
                        <FormItem label="查询项目">
                            <Select placeholder="请选择查询项目" onChange={this.onChangeSelect.bind(this, 'rcType')}>
                                {typeData}
                            </Select>
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
                        <FormItem label="操作人">
                            <Select placeholder="请选择操作人" onChange={this.onChangeSelect.bind(this, 'userCode')}>
                                {userData}
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.search_record.bind(this)}>查询</Button>
                        </FormItem>
                    </Form>
                    <div className="ant-form-split common_table">
                        <Table rowKey={(record) => record.code} loading={this.state.loadingData} columns={columns1} dataSource={dataCont1} pagination={{
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
                </div>
            </div>
        )
    }
}
const subAccountRecord = Form.create()(SubAccountRecord);
export default subAccountRecord;