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
        roleIds:"2_1_7",//员工角色 统一接口数据

        storeCode1:localStorage.getItem('storeCode'),//门店名
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

        storeCode2:localStorage.getItem('storeCode'),//门店名
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

        storeCode3:localStorage.getItem('storeCode'),//门店名
        roleId7:"7",//员工角色
        orderBy7:"desc",//请求条件（desc：降序；asc：升序）
        startTime7:"",//起始时间
        endTime7:"",//结束时间
        pageNumber7:1,//请求页
        pageSize7:"10",//每页请求记录数
        baseNum7:"",
        dataList7:"",
        isToggleOn7: true,

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
        }
    };
    onChangeData = (i, dateStrings) => {
        console.log(i);
        console.log(dateStrings);
        debugger;
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
        }else if(i=="7"){
            this.setState({
                startTime7:dateStrings[0], //查询起始时间
                endTime7:dateStrings[1], //查询结束时间
            },()=>{
                this.getList(7);
            })
        }
    };


    //日期
    onChangeData1 = (date, dateStrings) => {
        this.setState({
            startTime1:dateStrings[0], //查询起始时间
            endTime1:dateStrings[1], //查询结束时间
        },()=>{
            this.getList(1);
        })
    };
    //日期
    onChangeData2 = (date, dateStrings) => {
        console.log(date);
        console.log(dateStrings)
        this.setState({
            startTime2: dateStrings[0], //查询起始时间
            endTime2: dateStrings[1], //查询结束时间
        }, () => {
            this.getList(2);
        })
    };
    //日期
    onChangeData7 = (date, dateStrings) => {
        this.setState({
            startTime7:dateStrings[0], //查询起始时间
            endTime7:dateStrings[1], //查询结束时间
        },()=>{
            this.getList(7);
        })
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
                storeCode:this.state.storeCode1,//门店名
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
                storeCode:this.state.storeCode2,//门店名
                roleId:this.state.roleId2,//员工角色
                orderCondition:this.state.orderCondition2,//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                orderBy:this.state.orderBy2,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime2,//起始时间
                endTime:this.state.endTime2,//结束时间
                pageNumber:this.state.pageNumber2,//请求页
                pageSize:this.state.pageSize2,//每页请求记录数
            };
        }else if(i=="7"){
            data={
                storeCode3:this.state.storeCode3,//门店名
                roleId:this.state.roleId7,//员工角色
                orderBy:this.state.orderBy7,//请求条件（desc：降序；asc：升序）
                startTime:this.state.startTime7,//起始时间
                endTime:this.state.endTime7,//结束时间
                pageNumber:this.state.pageNumber7,//请求页
                pageSize:this.state.pageSize7,//每页请求记录数
            };
        }
        ajax.post("/admin/statistics/adminRank",data)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data;
                    console.log(datalist);
                    if(i == "1" && datalist.length >0 && this.state.orderBy1 == "desc"){
                        this.setState({
                            dataList1:datalist
                        },()=>{
                            if(datalist.length > 0){
                                this.setState({
                                    baseNum1: datalist[0].applyCount,
                                })
                            }
                        });
                    }else if(i == "1" && datalist.length >0 && this.state.orderBy1 == "asc"){
                        this.setState({
                            dataList1:datalist
                        },()=>{
                            if(datalist.length > 0){
                                this.setState({
                                    baseNum1: datalist[datalist.length-1].applyCount,
                                })
                            }
                        });
                    }else if(i=="2" && datalist.length >0 && this.state.orderBy2 == "desc"){
                        this.setState({
                            dataList2:datalist
                        },()=>{
                            if(datalist.length > 0){
                                this.setState({
                                    baseNum2: datalist[0].applyCount,
                                })
                            }
                        });
                    }else if(i=="2" && datalist.length >0 && this.state.orderBy2 == "asc"){
                        this.setState({
                            dataList2:datalist
                        },()=>{
                            if(datalist.length > 0){
                                this.setState({
                                    baseNum2: datalist[datalist.length-1].applyCount,
                                })
                            }
                        });
                    }else if(i=="7" && datalist.length >0 && this.state.orderBy7 == "desc"){
                        this.setState({
                            dataList7:datalist
                        },()=>{
                            if(datalist.length > 0){
                                this.setState({
                                    baseNum7: datalist[0].applyCount,
                                })
                            }
                        });
                    }else if(i=="7" && datalist.length >0 && this.state.orderBy7 == "asc"){
                        this.setState({
                            dataList7:datalist
                        },()=>{
                            if(datalist.length > 0){
                                this.setState({
                                    baseNum7: datalist[datalist.length-1].applyCount,
                                })
                            }
                        });
                    }
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })
    };

    //roleIds统一请求
    getAllList(){
        let data ={roleIds:this.state.roleIds};
        ajax.post("/admin/statistics/storeAdminRank",data)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data;
                    this.setState({
                        dataList1:datalist["2"],
                        dataList2:datalist["1"],
                        dataList7:datalist["7"]
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
                        if(datalist["7"].length >0){
                            this.setState({
                                baseNum7: datalist["7"][0].applyCount,
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
        }
    };
    componentWillUnMount(){
        this._isMounted = false
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const  {storeList,dataList1 ,dataList2 ,dataList7}  = this.state;
        let storeOption = [];
        for (let i = 0; i < storeList.length; i++) {
            storeOption.push(<Option key={storeList[i].code} value={storeList[i].code} >{storeList[i].name}</Option>);
        }

        let dataOpt1=[],dataOpt2=[],dataOpt7=[];
        if(dataList1.length > 0){
            for (let i = 0; i < dataList1.length; i++) {
                dataList1[i].apr = (dataList1[i].applyCount/this.state.baseNum1)*100;
                var apr=[];
                if(this.state.orderCondition1 == "apply"){
                    apr[i] = Math.round(dataList1[i].applyCount*100)/100;
                }else{
                    var str= (dataList1[i].applyCount - 0) * 100;
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
        if(dataList7.length > 0){
            for (let i = 0; i < dataList7.length; i++) {
                dataList7[i].apr = (parseInt(dataList7[i].applyCount) / parseInt(this.state.baseNum7))*100 ;
                dataOpt7.push(<li key={i}><i>{i + 1}</i><i>{dataList7[i].realName}</i><i><em className="listWidth" style={{width: dataList7[i].apr + '%'}}></em></i><i>{dataList7[i].applyCount}单</i>
                </li>);
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
                                <Select name="store" placeholder="选择门店" defaultValue="所有门店" disabled>
                                    {storeOption}
                                </Select>
                            </FormItem>
                            <FormItem label="时间：">
                                <RangePicker
                                    ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                    onChange={this.onChangeData1}
                                    placeholder={['所有时间', '所有时间']}
                                />
                            </FormItem>
                        </Form>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt1}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list1/92"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
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
                                <Select name="store" placeholder="选择门店" defaultValue="所有门店" disabled>
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
                            <Link to={"/dataStatistics/staffChart/list1/91"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>


                    {/*7*/}
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.onChangeClick.bind(this,"7")} className={this.state.orderBy7}>寄件单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData7}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt7}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/97"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const staffChart = Form.create()(staffChartForm);
export default staffChart;