import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

import ajax from "../../utils/ajax";

class staffListForm extends React.Component {
    state = {
        resultData1: [],
        resultData2: [],
        resultData3: [],
        resultData4: [],
        resultData5: [],
        resultData6: [],
        resultData7: [],
        resultData8: [],
        resultData9: [],
        resultData10: [],
        totalCount1: null,
        totalCount2: null,
        totalCount7: null,
        totalCount9: null,

        key:"2",
        pageNumber1:1,
        pageNumber2:1,
        pageNumber7:1,
        pageNumber9:1,
        pageSize1:10,
        roleId: undefined,
        roleId7: undefined,
        conditionId7: '7',
        realName1: undefined,
        realName2: undefined,
        realName7: undefined,
        realName9: undefined,
        userName1: undefined,
        userName2: undefined,
        userName7: undefined,
        userName9: undefined,
        roleId9: undefined,
        conditionId9: '9',
    };
    constructor(props) {
        super(props);
        this.onChange1 = this.onChange1.bind(this);
    };

    componentWillMount= (e) =>{
        this._isMounted = true;
        let {pageNumber,pageSize1,roleId1,realName1,storeName1,userName1,key}=this.state;
        var reData1 = {pageNumber:pageNumber,pageSize:pageSize1,conditionId:key,realName:realName1,storeName:storeName1,userName:userName1};
        ajax.post("/admin/statistics/oneStoreInfo",reData1)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data;
                    var totalCount = 0;
                    if(this.isOwnEmpty(datalist)){
                        totalCount=datalist[0].totalCount;
                    }
                    this.setState({
                        resultData1:datalist,
                        totalCount1:totalCount,
                    });
                    console.log("totalCount1:"+this.state.totalCount1);
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
    };
    componentWillUnMount() {
        this._isMounted = false
    }

    tabClick(key) {
        console.log(key);
        this.setState({key: key});
        var conditionId = key;
        var reqData1 = {};
        switch(key){
            case "2":
                this.setState({pageNumber1: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName1,
                    storeName:this.state.storeName1,
                    userName:this.state.userName1}; break;
            case "1":
                this.setState({pageNumber2: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName2,
                    storeName:this.state.storeName2,
                    userName:this.state.userName2}; break;
            case "7":
                this.setState({pageNumber7: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    roleId:this.state.roleId7,
                    conditionId:this.state.conditionId7,
                    realName:this.state.realName7,
                    storeName:this.state.storeName7,
                    userName:this.state.userName7}; break;
            case "9":
                this.setState({pageNumber9: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    roleId:this.state.roleId9,
                    conditionId: this.state.conditionId9,
                    realName:this.state.realName9,
                    storeName:this.state.storeName9,
                    userName:this.state.userName9}; break;
            default:return null;
        };
        ajax.post("/admin/statistics/oneStoreInfo",reqData1)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data;
                    var totalCount = 0;
                    if(this.isOwnEmpty(datalist)){
                        totalCount=datalist[0].totalCount;
                    }
                    switch(this.state.key){
                        case "2":this.setState({resultData1: datalist,totalCount1:totalCount}); break;
                        case "1":this.setState({resultData2: datalist,totalCount2:totalCount});break;
                        case "7":this.setState({resultData7: datalist,totalCount7:totalCount}); break;
                        case "9":this.setState({resultData9: datalist,totalCount9:totalCount}); break;
                        default:return null;
                    };
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let reqData2 = {};
                var conditionId = this.state.key;
                switch(conditionId){
                    case "2":
                        reqData2 = {pageNumber:this.state.pageNumber1,
                            pageSize:this.state.pageSize1,
                            // roleId:roleId,
                            conditionId: conditionId,
                            realName:this.state.realName1,
                            storeName:this.state.storeName1,
                            userName:this.state.userName1}; break;
                    case "1":
                        reqData2 = {pageNumber:this.state.pageNumber2,
                            pageSize:this.state.pageSize1,
                            // roleId:roleId,
                            conditionId: conditionId,
                            realName:this.state.realName2,
                            storeName:this.state.storeName2,
                            userName:this.state.userName2}; break;
                    case "7":
                        reqData2 = {pageNumber:this.state.pageNumber7,
                            pageSize:this.state.pageSize1,
                            roleId:this.state.roleId7,
                            conditionId: conditionId,
                            realName:this.state.realName7,
                            storeName:this.state.storeName7,
                            userName:this.state.userName7}; break;
                    case "9":
                        reqData2 = {pageNumber:this.state.pageNumber9,
                            pageSize:this.state.pageSize1,
                            roleId:this.state.roleId9,
                            conditionId: conditionId,
                            realName:this.state.realName9,
                            storeName:this.state.storeName9,
                            userName:this.state.userName9}; break;
                    default:return null;
                };
                ajax.post("/admin/statistics/oneStoreInfo",reqData2)
                    .then(response =>{
                        // console.log(response);
                        if(response.code=="0"){
                            var datalist=response.data;
                            var totalCount = 0;
                            if(this.isOwnEmpty(datalist)){
                                totalCount=datalist[0].totalCount;
                            }
                            switch(this.state.key){
                                case "2":this.setState({resultData1: datalist,totalCount1:totalCount}); break;
                                case "1":this.setState({resultData2: datalist,totalCount2:totalCount});break;
                                case "7":this.setState({resultData7: datalist,totalCount7:totalCount}); break;
                                case "9":this.setState({resultData9: datalist,totalCount9:totalCount}); break;
                                default:return null;
                            };
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

    changePage1=(page)=>{
        const currentPage=page;
        var conditionId = this.state.key;
        let reqData3 = {};
        switch(conditionId){
            case "2":
                this.setState({
                    pageNumber1:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    // roleId:roleId,
                    conditionId: conditionId,
                    realName:this.state.realName1,
                    storeName:this.state.storeName1,
                    userName:this.state.userName1}; break;
            case "1":
                this.setState({
                    pageNumber2:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    // roleId:roleId,
                    conditionId: conditionId,
                    realName:this.state.realName2,
                    storeName:this.state.storeName2,
                    userName:this.state.userName2}; break;
            case "7":
                this.setState({
                    pageNumber7:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    roleId:this.state.roleId7,
                    conditionId: conditionId,
                    realName:this.state.realName7,
                    storeName:this.state.storeName7,
                    userName:this.state.userName7}; break;
            case "9":
                this.setState({
                    pageNumber9:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    roleId:this.state.roleId9,
                    conditionId: conditionId,
                    realName:this.state.realName9,
                    storeName:this.state.storeName9,
                    userName:this.state.userName9}; break;
            default:return null;
        };
        console.log("提交参数：",reqData3);
        ajax.post("/admin/statistics/oneStoreInfo",reqData3)
            .then(response =>{
                console.log(response);
                if(response.code=="0"){
                    var datalist=response.data;
                    var totalCount = 0;
                    if(this.isOwnEmpty(datalist)){
                        totalCount=datalist[0].totalCount
                    }
                    switch(this.state.key){
                        case "2":this.setState({resultData1: datalist,totalCount1:totalCount}); break;
                        case "1":this.setState({resultData2: datalist,totalCount2:totalCount});break;
                        case "7":this.setState({resultData7: datalist,totalCount7:totalCount}); break;
                        case "9":this.setState({resultData9: datalist,totalCount9:totalCount}); break;
                        default:return null;
                    };
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })
    };

    isOwnEmpty=(obj)=>
    {
        for(var name in obj)
        {
            if(obj.hasOwnProperty(name))
            {
                return true;
            }
        }
        return false;
    };

    render() {
        let self = this;
        const { getFieldDecorator } = this.props.form;
        const flag=this.state.flag;

        const columns1 = [{
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
        }, {
            title: '门店',
            dataIndex: 'storeName',
            key: 'storeName',
        }, {
            title: '工号',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '周申请单数',
            dataIndex: 'weekApplyCount',
            key: 'weekApplyCount',
        }, {
            title: '月申请单数',
            dataIndex: 'monthApplyCount',
            key: 'monthApplyCount',
        }, {
            title: '年申请单数',
            dataIndex: 'yearApplyCount',
            key: 'yearApplyCount',
        },{
            title: '年通过率',
            dataIndex: 'yearPassedRate',
            key: 'yearPassedRate',
        },{
            title: '年抵押率',
            dataIndex: 'yearMortgageRate',
            key: 'yearMortgageRate',
        }];
        const columns4 = [{
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',

        }, {
            title: '职位',
            dataIndex: 'roleName',
            key: 'roleName',
        }, {
            title: '门店',
            dataIndex: 'storeName',
            key: 'storeName',
        }, {
            title: '工号',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '周登记单数',
            dataIndex: 'weekApplyCount',
            key: 'weekApplyCount',
        }, {
            title: '月登记单数',
            dataIndex: 'monthApplyCount',
            key: 'monthApplyCount',
        }, {
            title: '年登记单数',
            dataIndex: 'yearApplyCount',
            key: 'yearApplyCount',
        },];
        const dataCont1 =this.state.resultData1;
        const dataCont2 =this.state.resultData2;
        const dataCont7 =this.state.resultData7;
        const dataCont9 =this.state.resultData9;

        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>员工统计</Breadcrumb.Item>
                </Breadcrumb>
                {this.state.key == "2" ? null: null}
                <Tabs defaultActiveKey="2" onChange={this.tabClick.bind(this)}>
                    <TabPane tab="业务员" key="2">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName1')}/>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName1')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns1} dataSource={dataCont1} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber1,
                                    total:this.state.totalCount1,
                                    onChange:this.changePage1,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="门店内勤" key="1">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName2')}/>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName2')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns1} dataSource={dataCont2} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber2,
                                    total:this.state.totalCount2,
                                    onChange:this.changePage1,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="寄件管理" key="7">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName7')}/>
                                </FormItem>
                                {/* <FormItem label="职位：">
                                    <Select placeholder="请选择职位" defaultValue={'2'} onChange={this.onChangeSelect.bind(this, 'roleId7')}>
                                        <Option key="0" value="7" >寄件管理</Option>
                                        <Option key="0" value="2" >业务员</Option>
                                        <Option key="0" value="1" >门店内勤</Option>
                                    </Select>
                                </FormItem> */}
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName7')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns4} dataSource={dataCont7} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber7,
                                    total:this.state.totalCount7,
                                    onChange:this.changePage1,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="抵押管理" key="9">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName9')}/>
                                </FormItem>
                                {/* <FormItem label="职位：">
                                    <Select placeholder="请选择职位" defaultValue={'2'} onChange={this.onChangeSelect.bind(this, 'roleId9')}>
                                        <Option key="0" value="9" >抵押管理</Option>
                                        <Option key="0" value="2" >业务员</Option>
                                        <Option key="0" value="1" >门店内勤</Option>
                                    </Select>
                                </FormItem> */}
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName9')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns4} dataSource={dataCont9} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber9,
                                    total:this.state.totalCount9,
                                    onChange:this.changePage1,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
const application = Form.create()(staffListForm);
export default application;