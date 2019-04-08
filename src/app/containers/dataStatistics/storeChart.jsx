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

class storeChartForm extends React.Component {
    state = {
        orderCondition1:"apply",// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        orderBy1:"desc",//请求条件（desc：降序；asc：升序）
        startTime1:"", //查询起始时间
        endTime1:"", //查询结束时间
        pageNumber1:"1",//请求页
        pageSize1:"10",//每页请求记录数
        baseNum1:"",
        dataList1:"",
        isToggleOn1: true,

        orderCondition2:"passed",// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        orderBy2:"desc",//请求条件（desc：降序；asc：升序）
        startTime2:"", //查询起始时间
        endTime2:"", //查询结束时间
        pageNumber2:"1",//请求页
        pageSize2:"10",//每页请求记录数
        baseNum2:"",
        dataList2:"",
        isToggleOn2: true,

        orderCondition3:"mortgage",// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        orderBy3:"desc",//请求条件（desc：降序；asc：升序）
        startTime3:"", //查询起始时间
        endTime3:"", //查询结束时间
        pageNumber3:"",//请求页
        pageSize3:"10",//每页请求记录数
        baseNum3:"",
        dataList3:"",
        isToggleOn3: true,

    };
    constructor(props) {
        super(props);

    };

    handleClick1= () => {
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
    };
    handleClick2= () => {
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
    };
    handleClick3= () => {
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
    }

    onChangeDate1 = (dates, dateStrings) => {
        this.setState({
            startTime1:dateStrings[0], //查询起始时间
            endTime1:dateStrings[1], //查询结束时间
        },()=>{
            this.getList(1);
        })
    };
    onChangeDate2 = (dates, dateStrings) => {
        this.setState({
            startTime2:dateStrings[0], //查询起始时间
            endTime2:dateStrings[1], //查询结束时间
        },()=>{
            this.getList(2);
        })
    };
    onChangeDate3 = (dates, dateStrings) => {
        this.setState({
            startTime3:dateStrings[0], //查询起始时间
            endTime3:dateStrings[1], //查询结束时间
        },()=>{
            this.getList(3);
        })
    };

    getList(i){
        //申请单数---门店排名
        let {orderCondition1,orderBy1,startTime1,endTime1,pageNumber1,pageSize1,orderCondition2,orderBy2,startTime2,endTime2,pageNumber2,pageSize2,orderCondition3,orderBy3,startTime3,endTime3,pageNumber3,pageSize3} = this.state;
        var data={};
        if(i== "1"){
            data ={
                "orderCondition":orderCondition1,// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                "orderBy":orderBy1,
                "startTime":startTime1, //查询起始时间
                "endTime":endTime1, //查询结束时间
                "pageNumber":pageNumber1,//请求页
                "pageSize":pageSize1,//每页请求记录数
            };
        }else if(i=="2"){
            data ={
                "orderCondition":orderCondition2,// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                "orderBy":orderBy2,
                "startTime":startTime2, //查询起始时间
                "endTime":endTime2, //查询结束时间
                "pageNumber":pageNumber2,//请求页
                "pageSize":pageSize2,//每页请求记录数
            };
        }else{
            data ={
                "orderCondition":orderCondition3,// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                "orderBy":orderBy3,
                "startTime":startTime3, //查询起始时间
                "endTime":endTime3, //查询结束时间
                "pageNumber":pageNumber3,//请求页
                "pageSize":pageSize3,//每页请求记录数
            };
        }
        ajax.post("/admin/statistics/storeRank",data)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data;
                    if(datalist.length > 0) {
                        if(i== "1"){
                            if (orderBy1 == "desc") {
                                this.setState({
                                    baseNum1: datalist[0].applyCount
                                }, () => {

                                });
                            }
                            this.setState({
                                dataList1: datalist
                            }, () => {
                            });
                        }else if(i=="2"){
                            if (orderBy2 == "desc") {
                                this.setState({
                                    baseNum2: datalist[0].applyCount
                                }, () => {
                                })
                            }
                            this.setState({
                                dataList2: datalist
                            }, () => {
                            });
                        }else{
                            if(orderBy3 == "desc"){
                                this.setState({
                                    baseNum3:datalist[0].applyCount
                                },()=> {
                                })
                            }
                            this.setState({
                                dataList3:datalist
                            },()=> {
                            });
                        }
                    }
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
    };

    componentWillMount = () =>{
        this._isMounted = true;
    };
    componentDidMount = () =>{
        if(this._isMounted){
            this.getList(1);
            this.getList(2);
            this.getList(3);
        }
    };
    componentWillUnMount(){
        this._isMounted = false
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const  dataList1  = this.state.dataList1 || {};
        const  dataList2  = this.state.dataList2 || {};
        const  dataList3  = this.state.dataList3 || {};

        let dataOpt1=[],dataOpt2=[],dataOpt3=[];
        if(dataList1.length > 0){
            for (let i = 0; i < dataList1.length; i++) {
                dataList1[i].apr = (dataList1[i].applyCount/this.state.baseNum1)*100;
                dataOpt1.push(<li key={i}><i>{i+1}</i><i>{dataList1[i].storeName}</i><i><em className="listWidth" style={{width:dataList1[i].apr+'%'}}></em></i><i>{dataList1[i].applyCount}单</i></li>);
            }
        }
        if(dataList2.length > 0) {
            for (let i = 0; i < dataList2.length; i++) {
                dataList2[i].apr = (parseInt(dataList2[i].applyCount) / parseInt(this.state.baseNum2))*100 ;
                dataOpt2.push(<li key={i}><i>{i + 1}</i><i>{dataList2[i].storeName}</i><i><em className="listWidth" style={{width: dataList2[i].apr + '%'}}></em></i><i>{dataList2[i].applyCount}</i>
                </li>);
            }
        }
        if(dataList3.length > 0) {
            for (let i = 0; i < dataList3.length; i++) {
                dataList3[i].apr = (parseInt(dataList3[i].applyCount) / parseInt(this.state.baseNum3))*100 ;
                dataOpt3.push(<li key={i}><i>{i + 1}</i><i>{dataList3[i].storeName}</i><i><em className="listWidth" style={{width: dataList3[i].apr + '%'}}></em></i><i>{dataList3[i].applyCount}</i>
                </li>);
            }
        }

        return(
            <div className="staffChart">
                <Breadcrumb style={{ padding: '16px 28px',fontSize:'20px',fontWeight:'bold',background:"#fff"}}>
                    <Breadcrumb.Item>门店排名</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div id="mainCont" style={{paddingTop:'24px',display: 'flex',flexWrap: 'wrap', minHeight: 780 }}>
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.handleClick1}>申请单数</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeDate1}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt1}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/storeChart/list"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title"onClick={this.handleClick2}>通过率</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeDate2}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt2}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/storeChart/list"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>
                    <div className="chartBox" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="title" onClick={this.handleClick3}>抵押率</h3>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeDate3}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <ul className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {dataOpt3}
                        </ul>
                        <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/storeChart/list"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const storeChart = Form.create()(storeChartForm);
export default storeChart;