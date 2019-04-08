import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table, Radio , Row, Col ,Tabs} from 'antd';
import moment from 'moment';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
import "./dataStatistics.less";
import {message} from "antd/lib/index";
import ajax from "../../utils/ajax";

class staffChartForm extends React.Component {
    state = {
        storeList:[],//门店列表
        roleIds:"2_1_3_4_5_6_7_8_9_10",//员工角色 统一接口数据

        storeName1:"",//门店名
        storeCode1: "",
        roleId1:"2",//员工角色
        orderCondition1:"apply",//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        orderBy1:"desc",//请求条件（desc：降序；asc：升序）
        startTime1:"",//起始时间
        endTime1:"",//结束时间
        pageNumber1:"1",//请求页
        pageSize1:"10",//每页请求记录数
        baseNum1:"",
        dataList1:"",
        isToggleOn1: true,
        type1:"单",

        storeName2:"",//门店名
        storeCode2:"",
        roleId2:"1",//员工角色
        orderCondition2:"apply",//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        orderBy2:"desc",//请求条件（desc：降序；asc：升序）
        startTime2:"",//起始时间
        endTime2:"",//结束时间
        pageNumber2:"1",//请求页
        pageSize2:"10",//每页请求记录数
        baseNum2:"",
        dataList2:"",
        isToggleOn2: true,
        type2:"单",

        roleId3:"3",//员工角色
        orderBy3:"desc",//请求条件（desc：降序；asc：升序）
        orderCondition: 'apply',
        startTime3:"",//起始时间
        endTime3:"",//结束时间
        pageNumber3:"1",//请求页
        pageSize3:"10",//每页请求记录数
        baseNum3:"",
        dataList3:"",
        isToggleOn3: true,

        roleId4:"4",//员工角色
        orderBy4:"desc",//请求条件（desc：降序；asc：升序）
        startTime4:"",//起始时间
        endTime4:"",//结束时间
        pageNumber4:"1",//请求页
        pageSize4:"10",//每页请求记录数
        baseNum4:"",
        dataList4:"",
        isToggleOn4: true,

        roleId5:"5",//员工角色
        orderBy5:"desc",//请求条件（desc：降序；asc：升序）
        startTime5:"",//起始时间
        endTime5:"",//结束时间
        pageNumber5:"1",//请求页
        pageSize5:"10",//每页请求记录数
        baseNum5:"",
        dataList5:"",
        isToggleOn5: true,

        roleId6:"6",//员工角色
        orderBy6:"desc",//请求条件（desc：降序；asc：升序）
        startTime6:"",//起始时间
        endTime6:"",//结束时间
        pageNumber6:"1",//请求页
        pageSize6:"10",//每页请求记录数
        baseNum6:"",
        dataList6:"",
        isToggleOn6: true,

        roleId7:"7",//员工角色
        orderBy7:"desc",//请求条件（desc：降序；asc：升序）
        startTime7:"",//起始时间
        endTime7:"",//结束时间
        pageNumber7:"1",//请求页
        pageSize7:"10",//每页请求记录数
        baseNum7:"",
        dataList7:"",
        isToggleOn7: true,

        roleId8:"8",//员工角色
        orderBy8:"desc",//请求条件（desc：降序；asc：升序）
        startTime8:"",//起始时间
        endTime8:"",//结束时间
        pageNumber8:"1",//请求页
        pageSize8:"10",//每页请求记录数
        baseNum8:"",
        dataList8:"",
        isToggleOn8: true,

        roleId9:"9",//员工角色
        orderBy9:"desc",//请求条件（desc：降序；asc：升序）
        startTime9:"",//起始时间
        endTime9:"",//结束时间
        pageNumber9:"1",//请求页
        pageSize9:"10",//每页请求记录数
        baseNum9:"",
        dataList9:"",
        isToggleOn9: true,

        roleId10:"10",//员工角色
        orderBy10:"desc",//请求条件（desc：降序；asc：升序）
        startTime10:"",//起始时间
        endTime10:"",//结束时间
        pageNumber10:"1",//请求页
        pageSize10:"10",//每页请求记录数
        baseNum10:"",
        dataList10:"",
        isToggleOn10: true,

    };
    constructor(props) {
        super(props);
    };

    //排序
    onChangeClick= (i) => {
        if(i == "1"){
            this.setState(prevState => ({
                isToggleOn1: !prevState.isToggleOn1
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn1){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy1:orderBy
                },()=>{
                    this.getList(1);
                })
            })
        }else if(i=="2"){
            this.setState(prevState => ({
                isToggleOn2: !prevState.isToggleOn2
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn2){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy2:orderBy
                },()=>{
                    this.getList(2);
                })
            })
        }else if(i=="3"){
            this.setState(prevState => ({
                isToggleOn3: !prevState.isToggleOn3
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn3){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy3:orderBy
                },()=>{
                    this.getList(3);
                })
            })
        }else if(i=="4"){
            this.setState(prevState => ({
                isToggleOn4: !prevState.isToggleOn4
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn4){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy4:orderBy
                },()=>{
                    this.getList(4);
                })
            })
        }else if(i=="5"){
            this.setState(prevState => ({
                isToggleOn5: !prevState.isToggleOn5
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn5){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy5:orderBy
                },()=>{
                    this.getList(5);
                })
            })
        }else if(i=="6"){
            this.setState(prevState => ({
                isToggleOn6: !prevState.isToggleOn6
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn6){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy6:orderBy
                },()=>{
                    this.getList(6);
                })
            })
        }else if(i=="7"){
            this.setState(prevState => ({
                isToggleOn7: !prevState.isToggleOn7
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn7){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy7:orderBy
                },()=>{
                    this.getList(7);
                })
            })
        }else if(i=="8"){
            this.setState(prevState => ({
                isToggleOn8: !prevState.isToggleOn8
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn8){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy8:orderBy
                },()=>{
                    this.getList(8);
                })
            })
        }else if(i=="9"){
            this.setState(prevState => ({
                isToggleOn9: !prevState.isToggleOn9
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn9){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy9:orderBy
                },()=>{
                    this.getList(9);
                })
            })
        }else if(i=="10"){
            this.setState(prevState => ({
                isToggleOn10: !prevState.isToggleOn10
            }),()=>{
                var orderBy;
                if(this.state.isToggleOn10){
                    orderBy= "desc";//降序
                }else{
                    orderBy="asc";//升序
                }
                this.setState({
                    orderBy10:orderBy
                },()=>{
                    this.getList(10);
                })
            })
        }
    };
    //日期
    onChangeData = (i, dateStrings) => {
        console.log(i);
        if(i == "1"){
            this.setState({
                startTime1:dateStrings[0], //查询起始时间
                endTime1:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(1);
            })
        }else if(i=="2"){
            this.setState({
                startTime2:dateStrings[0], //查询起始时间
                endTime2:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(2);
            })
        }else if(i=="3"){
            this.setState({
                startTime3:dateStrings[0], //查询起始时间
                endTime3:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(3);
            })
        }else if(i=="4"){
            this.setState({
                startTime4:dateStrings[0], //查询起始时间
                endTime4:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(4);
            })
        }else if(i=="5"){
            this.setState({
                startTime5:dateStrings[0], //查询起始时间
                endTime5:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(5);
            })
        }else if(i=="6"){
            this.setState({
                startTime6:dateStrings[0], //查询起始时间
                endTime6:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(6);
            })
        }else if(i=="7"){
            this.setState({
                startTime7:dateStrings[0], //查询起始时间
                endTime7:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(7);
            })
        }else if(i=="8"){
            this.setState({
                startTime8:dateStrings[0], //查询起始时间
                endTime8:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(8);
            })
        }else if(i=="9"){
            this.setState({
                startTime9:dateStrings[0], //查询起始时间
                endTime9:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(9);
            })
        }else if(i=="10"){
            this.setState({
                startTime10:dateStrings[0], //查询起始时间
                endTime10:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(10);
            })
        }
    };
    //筛选类型 单数/通过率/抵押率
    onChangeType = (field,e) => {
        var str = field;
        var i = str.charAt(str.length-1);
        if(e.target.value =="passed" || e.target.value =="mortgage"){
            if(i =="1"){
                this.setState({
                    type1: "%"
                });
            }else{
                this.setState({
                    type2: "%"
                });
            }
        }else{
            if(i =="1"){
                this.setState({
                    type1: "单"
                });
            }else{
                this.setState({
                    type2: "单"
                });
            }
        }
        this.setState({
            [field]: e.target.value
        }, ()=> {
            this.getList(i);
        });
    };
    //门店选择
    onChangeSelect=(field, value)=> {
        var str = field;
        var i = str.charAt(str.length-1);
        this.setState({
            [field]: value,
        }, ()=> {
            this.getList(i);
        });
    };

    //roleId 单独请求
    getList(i){
        var data = "";
        if(i == "1"){
            data={
                storeCode:this.state.storeCode1,//门店编码
                roleId:this.state.roleId1,//员工角色
                orderCondition:this.state.orderCondition1,//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                orderBy:this.state.orderBy1,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime1,//起始时间
                endTime:this.state.endTime1,//结束时间
                pageNumber:this.state.pageNumber1,//请求页
                pageSize:this.state.pageSize1,//每页请求记录数
            };
        }else if(i=="2"){
            data={
                storeCode:this.state.storeCode2,//门店编码
                roleId:this.state.roleId2,//员工角色
                orderCondition:this.state.orderCondition2,//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                orderBy:this.state.orderBy2,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime2,//起始时间
                endTime:this.state.endTime2,//结束时间
                pageNumber:this.state.pageNumber2,//请求页
                pageSize:this.state.pageSize2,//每页请求记录数
            };
        }else if(i=="3"){
            data={
                roleId:this.state.roleId3,//员工角色,
                orderCondition:this.state.orderCondition,
                orderBy:this.state.orderBy3,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime3,//起始时间
                endTime:this.state.endTime3,//结束时间
                pageNumber:this.state.pageNumber3,//请求页
                pageSize:this.state.pageSize3,//每页请求记录数
            };
        }else if(i=="4"){
            data={
                roleId:this.state.roleId4,//员工角色
                orderCondition:this.state.orderCondition,
                orderBy:this.state.orderBy4,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime4,//起始时间
                endTime:this.state.endTime4,//结束时间
                pageNumber:this.state.pageNumber4,//请求页
                pageSize:this.state.pageSize4,//每页请求记录数
            };
        }else if(i=="5"){
            data={
                roleId:this.state.roleId5,//员工角色
                orderCondition:this.state.orderCondition,
                orderBy:this.state.orderBy5,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime5,//起始时间
                endTime:this.state.endTime5,//结束时间
                pageNumber:this.state.pageNumber5,//请求页
                pageSize:this.state.pageSize5,//每页请求记录数
            };
        }else if(i=="6"){
            data={
                roleId:this.state.roleId6,//员工角色
                orderCondition:this.state.orderCondition,
                orderBy:this.state.orderBy6,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime6,//起始时间
                endTime:this.state.endTime6,//结束时间
                pageNumber:this.state.pageNumber6,//请求页
                pageSize:this.state.pageSize6,//每页请求记录数
            };
        }else if(i=="7"){
            data={
                roleId:this.state.roleId7,//员工角色
                orderCondition:this.state.orderCondition,
                orderBy:this.state.orderBy7,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime7,//起始时间
                endTime:this.state.endTime7,//结束时间
                pageNumber:this.state.pageNumber7,//请求页
                pageSize:this.state.pageSize7,//每页请求记录数
            };
        }else if(i=="8"){
            data={
                roleId:this.state.roleId8,//员工角色
                orderCondition:this.state.orderCondition,
                orderBy:this.state.orderBy8,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime8,//起始时间
                endTime:this.state.endTime8,//结束时间
                pageNumber:this.state.pageNumber8,//请求页
                pageSize:this.state.pageSize8,//每页请求记录数
            };
        }else if(i=="9"){
            data={
                roleId:this.state.roleId9,//员工角色
                orderCondition:this.state.orderCondition,
                orderBy:this.state.orderBy9,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime9,//起始时间
                endTime:this.state.endTime9,//结束时间
                pageNumber:this.state.pageNumber9,//请求页
                pageSize:this.state.pageSize9,//每页请求记录数
            };
        }else if(i=="10"){
            data={
                roleId:this.state.roleId10,//员工角色
                orderCondition:this.state.orderCondition,
                orderBy:this.state.orderBy10,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime10,//起始时间
                endTime:this.state.endTime10,//结束时间
                pageNumber:this.state.pageNumber10,//请求页
                pageSize:this.state.pageSize10,//每页请求记录数
            };
        }
        ajax.post("/admin/statistics/adminRank",data)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data;
                    console.log(datalist);
                    if(i == "1"){
                        this.setState({
                            dataList1:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if( this.state.orderBy1 == "desc") {
                                    this.setState({
                                        baseNum1: datalist[0].applyCount,
                                    })
                                } else if ( this.state.orderBy1 == "asc" ) {
                                    this.setState({
                                        baseNum1: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }else if(i=="2"){
                        this.setState({
                            dataList2:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if ( this.state.orderBy2 == "desc" ) {
                                    this.setState({
                                        baseNum2: datalist[0].applyCount,
                                    })
                                }else if ( this.state.orderBy2 == "asc" ) {
                                    this.setState({
                                        baseNum2: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }else if(i=="3"){
                        this.setState({
                            dataList3:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if ( this.state.orderBy3 == "desc" ) {
                                    this.setState({
                                        baseNum3: datalist[0].applyCount,
                                    })
                                }else if ( this.state.orderBy3 == "asc" ) {
                                    this.setState({
                                        baseNum3: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }else if(i=="4"){
                        this.setState({
                            dataList4:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if ( this.state.orderBy4 == "desc" ) {
                                    this.setState({
                                        baseNum4: datalist[0].applyCount,
                                    })
                                }else if ( this.state.orderBy4 == "asc" ) {
                                    this.setState({
                                        baseNum4: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }else if(i=="5"){
                        this.setState({
                            dataList5:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if ( this.state.orderBy5 == "desc" ) {
                                    this.setState({
                                        baseNum5: datalist[0].applyCount,
                                    })
                                }else if ( this.state.orderBy5 == "asc" ) {
                                    this.setState({
                                        baseNum5: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }else if(i=="6"){
                        this.setState({
                            dataList6:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if ( this.state.orderBy6 == "desc" ) {
                                    this.setState({
                                        baseNum6: datalist[0].applyCount,
                                    })
                                }else if ( this.state.orderBy6 == "asc" ) {
                                    this.setState({
                                        baseNum6: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }else if(i=="7"){
                        this.setState({
                            dataList7:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if ( this.state.orderBy7 == "desc" ) {
                                    this.setState({
                                        baseNum7: datalist[0].applyCount,
                                    })
                                }else if ( this.state.orderBy7 == "asc" ) {
                                    this.setState({
                                        baseNum7: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }else if(i=="8"){
                        this.setState({
                            dataList8:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if ( this.state.orderBy8 == "desc" ) {
                                    this.setState({
                                        baseNum8: datalist[0].applyCount,
                                    })
                                }else if ( this.state.orderBy8 == "asc" ) {
                                    this.setState({
                                        baseNum8: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }else if(i=="9"){
                        this.setState({
                            dataList9:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if ( this.state.orderBy9 == "desc" ) {
                                    this.setState({
                                        baseNum9: datalist[0].applyCount,
                                    })
                                }else if ( this.state.orderBy9 == "asc" ) {
                                    this.setState({
                                        baseNum9: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }else if(i=="10"){
                        this.setState({
                            dataList10:datalist,
                        },()=>{
                            if(datalist.length > 0){
                                if ( this.state.orderBy10 == "desc" ) {
                                    this.setState({
                                        baseNum10: datalist[0].applyCount,
                                    })
                                }else if ( this.state.orderBy10 == "asc" ) {
                                    this.setState({
                                        baseNum10: datalist[datalist.length - 1].applyCount,
                                    })
                                }
                            }
                        });
                    }
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })
    };
    //门店列表
    getStoreList(){
        ajax.post("/admin/store/getList","")
            .then(response =>{
                if(response.code=="0"){
                    var datalist= [{code:"",name:"所有门店"}]
                    for (var i = 0; i < response.data.length; i++) {
                        datalist.push(response.data[i])
                    }
                    console.log(datalist);
                    this.setState({
                        storeList:datalist
                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })

    };
    //roleIds统一请求
    getAllList(){
        let data ={roleIds:this.state.roleIds};
        ajax.post("/admin/statistics/adminRankTotal",data)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data;
                    this.setState({
                        dataList1:datalist["2"],
                        dataList2:datalist["1"],
                        dataList3:datalist["3"],
                        dataList4:datalist["4"],
                        dataList5:datalist["5"],
                        dataList6:datalist["6"],
                        dataList7:datalist["7"],
                        dataList8:datalist["8"],
                        dataList9:datalist["9"],
                        dataList10:datalist["10"],
                    }, () => {

                        if(datalist["2"] .length >0){
                            this.setState({
                                baseNum1: datalist["2"][0].applyCount,
                            })
                        }
                        if(datalist["1"].length >0){
                            this.setState({
                                baseNum2: datalist["1"][0].applyCount,
                            })
                        }
                        if(datalist["3"].length >0){
                            this.setState({
                                baseNum3: datalist["3"][0].applyCount,
                            })
                        }
                        if(datalist["4"].length >0){
                            this.setState({
                                baseNum4: datalist["4"][0].applyCount,
                            })
                        }
                        if(datalist["5"].length >0){
                            this.setState({
                                baseNum5: datalist["5"][0].applyCount,
                            })
                        }
                        if(datalist["6"].length >0){
                            this.setState({
                                baseNum6: datalist["6"][0].applyCount,
                            })
                        }
                        if(datalist["7"].length >0){
                            this.setState({
                                baseNum7: datalist["7"][0].applyCount,
                            })
                        }
                        if(datalist["8"].length >0){
                            this.setState({
                                baseNum8: datalist["8"][0].applyCount,
                            })
                        }
                        if(datalist["9"].length >0){
                            this.setState({
                                baseNum9: datalist["9"][0].applyCount,
                            })
                        }
                        if(datalist["10"].length >0){
                            this.setState({
                                baseNum10: datalist["10"][0].applyCount,
                            })
                        }
                    })
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })
    };
    componentDidMount = () =>{
        this._isMounted = true;
        if(this._isMounted) {
            this.getAllList();
            this.getStoreList();
        }
    };
    componentWillUnMount(){
        this._isMounted = false
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const  {storeList,dataList1 ,dataList2 ,dataList3,dataList4,dataList5,dataList6,dataList7,dataList8,dataList9,dataList10}  = this.state;
        let storeOption = [];
        for (let i = 0; i < storeList.length; i++) {
            storeOption.push(<Option key={storeList[i].code} value={storeList[i].code} >{storeList[i].name}</Option>);
        }

        let dataOpt1=[],dataOpt2=[],dataOpt3=[],dataOpt4=[],dataOpt5=[],dataOpt6=[],dataOpt7=[],dataOpt8=[],dataOpt9=[],dataOpt10=[];
        if(dataList1.length > 0){
            for (let i = 0; i < dataList1.length; i++) {
                dataList1[i].apr = (dataList1[i].applyCount/this.state.baseNum1)*100;
                var apr=[];
                if(this.state.orderCondition1 == "apply"){
                    apr[i] = Math.round(dataList1[i].applyCount*100)/100;
                }else{
                    var str= (dataList1[i].applyCount - 0 ) * 100;
                    apr[i] = Math.round(str*100)/100;
                }
                dataOpt1.push(<li key={i}><i>{i+1}</i><i>{dataList1[i].realName}</i><i><em className="listWidth" style={{width:dataList1[i].apr+'%'}}></em></i><i>{apr[i]}{this.state.type1}</i></li>);
            }
        }
        if(dataList2.length > 0){
            for (let i = 0; i < dataList2.length; i++) {
                dataList2[i].apr = ((dataList2[i].applyCount - 0) / (this.state.baseNum2 - 0))*100 ;
                var apr=[];
                if(this.state.orderCondition2 == "apply"){
                    apr[i] = Math.round(dataList2[i].applyCount*100)/100;
                }else{
                    var str= (dataList2[i].applyCount - 0) * 100;
                    apr[i] = Math.round(str*100)/100;
                }
                dataOpt2.push(<li key={i}><i>{i + 1}</i><i>{dataList2[i].realName}</i><i><em className="listWidth" style={{width: dataList2[i].apr + '%'}}></em></i><i>{apr[i]}{this.state.type2}</i>
                </li>);
            }
        }
        if(dataList3.length > 0){
            for (let i = 0; i < dataList3.length; i++) {
                dataList3[i].apr = (parseInt(dataList3[i].applyCount) / parseInt(this.state.baseNum3))*100 ;
                dataOpt3.push(<li key={i}><i>{i + 1}</i><i>{dataList3[i].realName}</i><i><em className="listWidth" style={{width: dataList3[i].apr + '%'}}></em></i><i>{dataList3[i].applyCount}单</i>
                </li>);
            }
        }
        if(dataList4.length > 0){
            for (let i = 0; i < dataList4.length; i++) {
                dataList4[i].apr = (dataList4[i].applyCount/this.state.baseNum4)*100;
                dataOpt4.push(<li key={i}><i>{i+1}</i><i>{dataList4[i].realName}</i><i><em className="listWidth" style={{width:dataList4[i].apr+'%'}}></em></i><i>{dataList4[i].applyCount}单</i></li>);
            }
        }
        if(dataList5.length > 0){
            for (let i = 0; i < dataList5.length; i++) {
                dataList5[i].apr = (parseInt(dataList5[i].applyCount) / parseInt(this.state.baseNum5))*100 ;
                dataOpt5.push(<li key={i}><i>{i + 1}</i><i>{dataList5[i].realName}</i><i><em className="listWidth" style={{width: dataList5[i].apr + '%'}}></em></i><i>{dataList5[i].applyCount}单</i>
                </li>);
            }
        }
        if(dataList6.length > 0){
            for (let i = 0; i < dataList6.length; i++) {
                dataList6[i].apr = (parseInt(dataList6[i].applyCount) / parseInt(this.state.baseNum6))*100 ;
                dataOpt6.push(<li key={i}><i>{i + 1}</i><i>{dataList6[i].realName}</i><i><em className="listWidth" style={{width: dataList6[i].apr + '%'}}></em></i><i>{dataList6[i].applyCount}单</i>
                </li>);
            }
        }
        if(dataList7.length > 0){
            for (let i = 0; i < dataList7.length; i++) {
                dataList7[i].apr = (parseInt(dataList7[i].applyCount) / parseInt(this.state.baseNum7))*100 ;
                dataOpt7.push(<li key={i}><i>{i + 1}</i><i>{dataList7[i].realName}</i><i><em className="listWidth" style={{width: dataList7[i].apr + '%'}}></em></i><i>{dataList7[i].applyCount}单</i>
                </li>);
            }
        }
        if(dataList8.length > 0){
            for (let i = 0; i < dataList8.length; i++) {
                dataList8[i].apr = (dataList8[i].applyCount/this.state.baseNum8)*100;
                dataOpt8.push(<li key={i}><i>{i+1}</i><i>{dataList8[i].realName}</i><i><em className="listWidth" style={{width:dataList8[i].apr+'%'}}></em></i><i>{dataList8[i].applyCount}单</i></li>);
            }
        }
        if(dataList9.length > 0){
            for (let i = 0; i < dataList9.length; i++) {
                dataList9[i].apr = (parseInt(dataList9[i].applyCount) / parseInt(this.state.baseNum9))*100 ;
                dataOpt9.push(<li key={i}><i>{i + 1}</i><i>{dataList9[i].realName}</i><i><em className="listWidth" style={{width: dataList9[i].apr + '%'}}></em></i><i>{dataList9[i].applyCount}单</i></li>);
            }
        }
        if(dataList10.length > 0){
            for (let i = 0; i < dataList10.length; i++) {
                dataList10[i].apr = (parseInt(dataList10[i].applyCount) / parseInt(this.state.baseNum10))*100;
                dataOpt10.push(<li key={i}><i>{i + 1}</i><i>{dataList10[i].realName}</i><i><em className="listWidth" style={{width: dataList10[i].apr + '%'}}></em></i><i>{dataList10[i].applyCount}单</i></li>);
            }
        }

        return(
            <div className="staffChart">
                <Breadcrumb style={{ padding: '16px 28px',fontSize:'20px',fontWeight:'bold',background:"#fff"}}>
                    <Breadcrumb.Item>员工排名</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div id="mainCont" style={{paddingTop:'24px',display: 'flex',flexWrap: 'wrap', minHeight: 780 }}>
                    {/*1*/}
                    <div className="chartBox">
                        <div className="chartTitle">
                            <h3 onClick={this.onChangeClick.bind(this,"1")} className={this.state.orderBy1}>业务员</h3>
                            <RadioGroup onChange={this.onChangeType.bind(this, 'orderCondition1')} defaultValue="apply">
                                <RadioButton value="apply">申请单数</RadioButton>
                                <RadioButton value="passed">通过单率</RadioButton>
                                <RadioButton value="mortgage">抵押率</RadioButton>
                            </RadioGroup>
                        </div>
                        <Form className="searchForm">
                            <FormItem label="门店：">
                                <Select name="store" placeholder="选择门店" defaultValue="所有门店" onChange={this.onChangeSelect.bind(this, 'storeCode1')}>
                                    {storeOption}
                                </Select>
                            </FormItem>
                            <FormItem label="时间：">
                                <RangePicker
                                    ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                    onChange={this.onChangeData.bind(this,"1")}
                                    placeholder={['所有时间', '所有时间']}
                                />
                            </FormItem>
                        </Form>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt1}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list1/2"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>

                    {/*2*/}
                    <div className="chartBox">
                        <div className="chartTitle">
                            <h3 onClick={this.onChangeClick.bind(this,"2")} className={this.state.orderBy2}>门店内勤</h3>
                            <RadioGroup onChange={this.onChangeType.bind(this, 'orderCondition2')} defaultValue="apply">
                                <RadioButton value="apply">申请单数</RadioButton>
                                <RadioButton value="passed">通过单率</RadioButton>
                                <RadioButton value="mortgage">抵押率</RadioButton>
                            </RadioGroup>
                        </div>
                        <Form className="searchForm">
                            <FormItem label="门店：">
                                <Select name="store" placeholder="选择门店" defaultValue="所有门店" onChange={this.onChangeSelect.bind(this, 'storeCode2')}>
                                    {storeOption}
                                </Select>
                            </FormItem>
                            <FormItem label="时间：">
                                <RangePicker
                                    ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                    onChange={this.onChangeData.bind(this,"2")}
                                    placeholder={['所有时间', '所有时间']}
                                />
                            </FormItem>
                        </Form>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt2}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list1/1"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>

                    {/*3*/}
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.onChangeClick.bind(this,"3")} className={this.state.orderBy3}>审核员审核单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData.bind(this,"3")}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt3}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/3"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>

                    {/*4*/}
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.onChangeClick.bind(this,"4")} className={this.state.orderBy4}>复评师审核单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData.bind(this,"4")}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt4}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/4"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>

                    {/*5*/}
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.onChangeClick.bind(this,"5")} className={this.state.orderBy5}>终审员审核单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData.bind(this,"5")}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt5}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/5"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>

                    {/*6*/}
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.onChangeClick.bind(this,"6")} className={this.state.orderBy6}>财务审批单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData.bind(this,"6")}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt6}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/6"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>

                    {/*7*/}
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.onChangeClick.bind(this,"7")} className={this.state.orderBy7}>寄件单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData.bind(this,"7")}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt7}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/7"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>

                    {/*8*/}
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.onChangeClick.bind(this,"8")} className={this.state.orderBy8}>GPS登记单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData.bind(this,"8")}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt8}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/8"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>

                    {/*9*/}
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.onChangeClick.bind(this,"9")} className={this.state.orderBy9}>抵押登记单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData.bind(this,"9")}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt9}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/9"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>

                    {/*10*/}
                    {/* <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.onChangeClick.bind(this,"10")} class={this.state.orderBy10}>逾期登记单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData.bind(this,"10")}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt10}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/10"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div> */}

                </div>

            </div>
        )
    }
}
const staffChart = Form.create()(staffChartForm);
export default staffChart;