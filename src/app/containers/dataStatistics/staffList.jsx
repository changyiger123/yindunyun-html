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
        storeList1:[],
        roleList1:[],
        totalCount1: null,
        totalCount2: null,
        totalCount3: null,
        totalCount4: null,
        totalCount5: null,
        totalCount6: null,
        totalCount7: null,
        totalCount8: null,
        totalCount9: null,
        totalCount10: null,

        key:"2",
        pageNumber1:1,
        pageNumber2:1,
        pageNumber3:1,
        pageNumber4:1,
        pageNumber5:1,
        pageNumber6:1,
        pageNumber7:1,
        pageNumber8:1,
        pageNumber9:1,
        pageNumber10:1,
        pageSize1:10,
        conditionId: undefined,
        roleId: undefined,
        roleId7: undefined,
        roleId8: undefined,
        roleId9: undefined,
        roleId10: undefined,
        realName1: undefined,
        realName2: undefined,
        realName3: undefined,
        realName4: undefined,
        realName5: undefined,
        realName6: undefined,
        realName7: undefined,
        realName8: undefined,
        realName9: undefined,
        realName10: undefined,
        storeName1: undefined,
        storeName2: undefined,
        storeName3: undefined,
        storeName4: undefined,
        storeName5: undefined,
        storeName6: undefined,
        storeName7: undefined,
        storeName8: undefined,
        storeName9: undefined,
        storeName10: undefined,
        userName1: undefined,
        userName2: undefined,
        userName3: undefined,
        userName4: undefined,
        userName5: undefined,
        userName6: undefined,
        userName7: undefined,
        userName8: undefined,
        userName9: undefined,
        userName10: undefined,

    };
    constructor(props) {
        super(props);
        this.onChange1 = this.onChange1.bind(this);
    };

    componentWillMount= (e) =>{
        this._isMounted = true;
        let {pageNumber,pageSize1,roleId1,realName1,storeName1,userName1,key}=this.state;
        var reData1 = {pageNumber:pageNumber,pageSize:pageSize1,conditionId:key,realName:realName1,storeName:storeName1,userName:userName1};
        ajax.post("/admin/statistics/allStoreInfo",reData1)
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
        ajax.post("/admin/store/getList", null)
            .then(response => {
                // console.log(response);
                if (response.code == "0") {
                    var data = response.data;
                    this.setState({
                        storeList1: data
                    })
                } else {
                    console.log("list" + response.msg);
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
            case "3":
                this.setState({pageNumber3: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName3,
                    storeName:this.state.storeName3,
                    userName:this.state.userName3}; break;
            case "4":
                this.setState({pageNumber4: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName4,
                    storeName:this.state.storeName4,
                    userName:this.state.userName4}; break;
            case "5":
                this.setState({pageNumber5: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName5,
                    storeName:this.state.storeName5,
                    userName:this.state.userName5}; break;
            case "6":
                this.setState({pageNumber6: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName6,
                    storeName:this.state.storeName6,
                    userName:this.state.userName6}; break;
            case "7":
                this.setState({pageNumber7: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    roleId:this.state.roleId7,
                    realName:this.state.realName7,
                    storeName:this.state.storeName7,
                    userName:this.state.userName7}; break;
            case "8":
                this.setState({pageNumber8: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId: conditionId,
                    roleId:this.state.roleId8,
                    realName:this.state.realName8,
                    storeName:this.state.storeName8,
                    userName:this.state.userName8}; break;
            case "9":
                this.setState({pageNumber9: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId: conditionId,
                    roleId:this.state.roleId9,
                    realName:this.state.realName9,
                    storeName:this.state.storeName9,
                    userName:this.state.userName9}; break;
            case "10":
                this.setState({pageNumber10: 1});
                reqData1 = {pageNumber:1,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    roleId:this.state.roleId10,
                    realName:this.state.realName10,
                    storeName:this.state.storeName10,
                    userName:this.state.userName10}; break;
            default:return null;
        };
        ajax.post("/admin/statistics/allStoreInfo",reqData1)
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
                        case "3":this.setState({resultData3: datalist,totalCount3:totalCount}); break;
                        case "4":this.setState({resultData4: datalist,totalCount4:totalCount}); break;
                        case "5":this.setState({resultData5: datalist,totalCount5:totalCount}); break;
                        case "6":this.setState({resultData6: datalist,totalCount6:totalCount}); break;
                        case "7":this.setState({resultData7: datalist,totalCount7:totalCount}); break;
                        case "8":this.setState({resultData8: datalist,totalCount8:totalCount}); break;
                        case "9":this.setState({resultData9: datalist,totalCount9:totalCount}); break;
                        case "10":this.setState({resultData10: datalist,totalCount10:totalCount}); break;
                        default:return null;
                    };
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
        ajax.post("/admin/store/getList", null)
            .then(response => {
                // console.log(response);
                if (response.code == "0") {
                    var data = response.data;
                    this.setState({
                        storeList1: data
                    })
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });
        ajax.post("/admin/roles/roleList", null)
            .then(response => {
                // console.log(response);
                if (response.code == "0") {
                    var data = response.data;
                    this.setState({
                        roleList1: data
                    })
                } else {
                    console.log("list" + response.msg);
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
                            conditionId:conditionId,
                            realName:this.state.realName1,
                            storeName:this.state.storeName1,
                            userName:this.state.userName1}; break;
                    case "1":
                        reqData2 = {pageNumber:this.state.pageNumber2,
                            pageSize:this.state.pageSize1,
                            conditionId:conditionId,
                            realName:this.state.realName2,
                            storeName:this.state.storeName2,
                            userName:this.state.userName2}; break;
                    case "3":
                        reqData2 = {pageNumber:this.state.pageNumber3,
                            pageSize:this.state.pageSize1,
                            conditionId:conditionId,
                            realName:this.state.realName3,
                            storeName:this.state.storeName3,
                            userName:this.state.userName3}; break;
                    case "4":
                        reqData2 = {pageNumber:this.state.pageNumber4,
                            pageSize:this.state.pageSize1,
                            conditionId:conditionId,
                            realName:this.state.realName4,
                            storeName:this.state.storeName4,
                            userName:this.state.userName4}; break;
                    case "5":
                        reqData2 = {pageNumber:this.state.pageNumber5,
                            pageSize:this.state.pageSize1,
                            conditionId:conditionId,
                            realName:this.state.realName5,
                            storeName:this.state.storeName5,
                            userName:this.state.userName5}; break;
                    case "6":
                        reqData2 = {pageNumber:this.state.pageNumber6,
                            pageSize:this.state.pageSize1,
                            conditionId:conditionId,
                            realName:this.state.realName6,
                            storeName:this.state.storeName6,
                            userName:this.state.userName6}; break;
                    case "7":
                        reqData2 = {pageNumber:this.state.pageNumber7,
                            pageSize:this.state.pageSize1,
                            conditionId:conditionId,
                            roleId:this.state.roleId7,
                            realName:this.state.realName7,
                            storeName:this.state.storeName7,
                            userName:this.state.userName7}; break;
                    case "8":
                        reqData2 = {pageNumber:this.state.pageNumber8,
                            pageSize:this.state.pageSize1,
                            conditionId:conditionId,
                            roleId:this.state.roleId8,
                            realName:this.state.realName8,
                            storeName:this.state.storeName8,
                            userName:this.state.userName8}; break;
                    case "9":
                        reqData2 = {pageNumber:this.state.pageNumber9,
                            pageSize:this.state.pageSize1,
                            conditionId:conditionId,
                            roleId:this.state.roleId9,
                            realName:this.state.realName9,
                            storeName:this.state.storeName9,
                            userName:this.state.userName9}; break;
                    case "10":
                        reqData2 = {pageNumber:this.state.pageNumber10,
                            pageSize:this.state.pageSize1,
                            conditionId:conditionId,
                            roleId:this.state.roleId10,
                            realName:this.state.realName10,
                            storeName:this.state.storeName10,
                            userName:this.state.userName10}; break;
                    default:return null;
                };
                ajax.post("/admin/statistics/allStoreInfo",reqData2)
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
                                case "3":this.setState({resultData3: datalist,totalCount3:totalCount}); break;
                                case "4":this.setState({resultData4: datalist,totalCount4:totalCount}); break;
                                case "5":this.setState({resultData5: datalist,totalCount5:totalCount}); break;
                                case "6":this.setState({resultData6: datalist,totalCount6:totalCount}); break;
                                case "7":this.setState({resultData7: datalist,totalCount7:totalCount}); break;
                                case "8":this.setState({resultData8: datalist,totalCount8:totalCount}); break;
                                case "9":this.setState({resultData9: datalist,totalCount9:totalCount}); break;
                                case "10":this.setState({resultData10: datalist,totalCount10:totalCount}); break;
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

    changePage=(page)=>{
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
                    conditionId:conditionId,
                    realName:this.state.realName1,
                    storeName:this.state.storeName1,
                    userName:this.state.userName1}; break;
            case "1":
                this.setState({
                    pageNumber2:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName2,
                    storeName:this.state.storeName2,
                    userName:this.state.userName2}; break;
            case "3":
                this.setState({
                    pageNumber3:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName3,
                    storeName:this.state.storeName3,
                    userName:this.state.userName3}; break;
            case "4":
                this.setState({
                    pageNumber4:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName4,
                    storeName:this.state.storeName4,
                    userName:this.state.userName4}; break;
            case "5":
                this.setState({
                    pageNumber5:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName5,
                    storeName:this.state.storeName5,
                    userName:this.state.userName5}; break;
            case "6":
                this.setState({
                    pageNumber6:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    realName:this.state.realName6,
                    storeName:this.state.storeName6,
                    userName:this.state.userName6}; break;
            case "7":
                this.setState({
                    pageNumber7:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    roleId:this.state.roleId7,
                    realName:this.state.realName7,
                    storeName:this.state.storeName7,
                    userName:this.state.userName7}; break;
            case "8":
                this.setState({
                    pageNumber8:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    roleId:this.state.roleId8,
                    realName:this.state.realName8,
                    storeName:this.state.storeName8,
                    userName:this.state.userName8}; break;
            case "9":
                this.setState({
                    pageNumber9:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    roleId:this.state.roleId9,
                    realName:this.state.realName9,
                    storeName:this.state.storeName9,
                    userName:this.state.userName9}; break;
            case "10":
                this.setState({
                    pageNumber10:currentPage,
                });
                reqData3 = {pageNumber:currentPage,
                    pageSize:this.state.pageSize1,
                    conditionId:conditionId,
                    roleId:this.state.roleId10,
                    realName:this.state.realName10,
                    storeName:this.state.storeName10,
                    userName:this.state.userName10}; break;
            default:return null;
        };
        console.log("提交参数：",reqData3);
        ajax.post("/admin/statistics/allStoreInfo",reqData3)
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
                        case "3":this.setState({resultData3: datalist,totalCount3:totalCount}); break;
                        case "4":this.setState({resultData4: datalist,totalCount4:totalCount}); break;
                        case "5":this.setState({resultData5: datalist,totalCount5:totalCount}); break;
                        case "6":this.setState({resultData6: datalist,totalCount6:totalCount}); break;
                        case "7":this.setState({resultData7: datalist,totalCount7:totalCount}); break;
                        case "8":this.setState({resultData8: datalist,totalCount8:totalCount}); break;
                        case "9":this.setState({resultData9: datalist,totalCount9:totalCount}); break;
                        case "10":this.setState({resultData10: datalist,totalCount10:totalCount}); break;
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
        const columns2 = [{
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',

        }, {
            title: '工号',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '职位',
            dataIndex: 'roleName',
            key: 'roleName',
        }, {
            title: '周审核单数',
            dataIndex: 'weekApplyCount',
            key: 'weekApplyCount',
        }, {
            title: '月审核单数',
            dataIndex: 'monthApplyCount',
            key: 'monthApplyCount',
        }, {
            title: '年审核单数',
            dataIndex: 'yearApplyCount',
            key: 'yearApplyCount',
        },];
        const columns3 = [{
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',

        }, {
            title: '工号',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '职位',
            dataIndex: 'roleName',
            key: 'roleName',
        }, {
            title: '周审批单数',
            dataIndex: 'weekApplyCount',
            key: 'weekApplyCount',
        }, {
            title: '月审批单数',
            dataIndex: 'monthApplyCount',
            key: 'monthApplyCount',
        }, {
            title: '年审批单数',
            dataIndex: 'yearApplyCount',
            key: 'yearApplyCount',
        },];
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
        const columns5 = [{
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',

        }, {
            title: '工号',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '职位',
            dataIndex: 'roleName',
            key: 'roleName',
        }, {
            title: '周标记单数',
            dataIndex: 'weekApplyCount',
            key: 'weekApplyCount',
        }, {
            title: '月标记单数',
            dataIndex: 'monthApplyCount',
            key: 'monthApplyCount',
        }, {
            title: '年标记单数',
            dataIndex: 'yearApplyCount',
            key: 'yearApplyCount',
        },];
        const dataCont1 =this.state.resultData1;
        const dataCont2 =this.state.resultData2;
        const dataCont3 =this.state.resultData3;
        const dataCont4 =this.state.resultData4;
        const dataCont5 =this.state.resultData5;
        const dataCont6 =this.state.resultData6;
        const dataCont7 =this.state.resultData7;
        const dataCont8 =this.state.resultData8;
        const dataCont9 =this.state.resultData9;
        const dataCont10 =this.state.resultData10;

        //门店选项
        let storeList = this.state.storeList1,
            storeOption = [];
        storeOption.push(<Option key={''} value='' >{'全部门店'}</Option>);
        for (let i = 0; i < storeList.length; i++) {
            storeOption.push(<Option key={storeList[i].code} value={storeList[i].name} >{storeList[i].name}</Option>);
        }
        //职位选项
        let roleList = this.state.roleList1,
            roleOption = [];
        roleOption.push(<Option key={''} value='' >{'所有'}</Option>);
        for (let i = 0; i < roleList.length; i++) {
            roleOption.push(<Option key={roleList[i].id} value={roleList[i].id} >{roleList[i].name}</Option>);
        }

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
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName1')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName1')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.userName} columns={columns1} dataSource={dataCont1} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber1,
                                    total:this.state.totalCount1,
                                    onChange:this.changePage,
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
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName2')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName2')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.userName} columns={columns1} dataSource={dataCont2} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber2,
                                    total:this.state.totalCount2,
                                    onChange:this.changePage,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="审核员" key="3">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName3')}/>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName3')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName3')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.userName} columns={columns2} dataSource={dataCont3} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber3,
                                    total:this.state.totalCount4,
                                    onChange:this.changePage,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="复评师" key="4">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName4')}/>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName4')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName4')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.userName} columns={columns2} dataSource={dataCont4} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber4,
                                    total:this.state.totalCount4,
                                    onChange:this.changePage,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="终审员" key="5">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName5')}/>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName5')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName5')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.userName} columns={columns2} dataSource={dataCont5} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber5,
                                    total:this.state.totalCount5,
                                    onChange:this.changePage,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="财务" key="6">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName6')}/>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName6')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName6')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.userName} columns={columns3} dataSource={dataCont6} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber6,
                                    total:this.state.totalCount6,
                                    onChange:this.changePage,
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
                                <FormItem label="职位：">
                                    <Select placeholder="请选择职位" defaultValue={'所有'} onChange={this.onChangeSelect.bind(this, 'roleId7')}>
                                        {roleOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName7')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName7')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.userName} columns={columns4} dataSource={dataCont7} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber7,
                                    total:this.state.totalCount7,
                                    onChange:this.changePage,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="GPS管理" key="8">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName8')}/>
                                </FormItem>
                                <FormItem label="职位：">
                                    <Select placeholder="请选择职位" defaultValue={'所有'} onChange={this.onChangeSelect.bind(this, 'roleId8')}>
                                        {roleOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName8') }>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName8')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.userName} columns={columns4} dataSource={dataCont8} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber8,
                                    total:this.state.totalCount8,
                                    onChange:this.changePage,
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
                                <FormItem label="职位：">
                                    <Select placeholder="请选择职位" defaultValue={'所有'} onChange={this.onChangeSelect.bind(this, 'roleId9')}>
                                        {roleOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName9')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName9')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.userName} columns={columns4} dataSource={dataCont9} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber9,
                                    total:this.state.totalCount9,
                                    onChange:this.changePage,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    {/* <TabPane tab="贷后管理" key="10">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="姓名：">
                                    <Input placeholder="请输入姓名"  onChange={this.onChange1.bind(this, 'realName10')}/>
                                </FormItem>
                                <FormItem label="职位：">
                                    <Select placeholder="请选择职位" defaultValue={'所有'} onChange={this.onChangeSelect.bind(this, 'roleId10')}>
                                        {roleOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店" defaultValue={'全部门店'} onChange={this.onChangeSelect.bind(this, 'storeName10')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="工号：">
                                    <Input placeholder="请输入工号"  onChange={this.onChange1.bind(this, 'userName10')}/>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns5} dataSource={dataCont10} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber10,
                                    total:this.state.totalCount10,
                                    onChange:this.changePage,
                                }} />
                            </div>
                        </div>
                    </TabPane> */}
                </Tabs>
            </div>
        )
    }
}
const application = Form.create()(staffListForm);
export default application;