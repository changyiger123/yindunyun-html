import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Radio, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
import moment from 'moment';
import {G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util} from 'bizcharts';
import ajax from "../../utils/ajax";
// import BusinessBarComp from './businessBarComp';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

const RangePicker = DatePicker.RangePicker;
const { Html, Arc } = Guide;

Shape.registerShape('point', 'pointer', {
    drawShape(cfg, group) {
        let point = cfg.points[0]; // 获取第一个标记点
        point = this.parsePoint(point);
        const center = this.parsePoint({ // 获取极坐标系下画布中心点
            x: 0,
            y: 0
        });
        // 绘制指针
        group.addShape('line', {
            attrs:  {
                x1: center.x,
                y1: center.y,
                x2: point.x,
                y2: point.y - 10,
                stroke: cfg.color,
                lineWidth: 3,
                lineCap: 'round'
            }
        });
        return group.addShape('circle', {
            attrs: {
                x: center.x,
                y: center.y,
                r: 5,
                stroke: cfg.color,
                lineWidth: 2.5,
                fill: '#fff'
            }
        });
    }
});

class businessAnalysisForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {

            /*选显卡tab数据;*/
            tabArra: [
                {tabText: "一周", tabId: 0},
                {tabText: "一月", tabId: 1},
                {tabText: "一年", tabId: 2}
            ],
            tabIndex1: 0,
            tabIndex2: 0,
            tabIndex4: 0,

            /*申请单数;*/
            groupCondition1: '', //本周、本月、本年查询条件('day', 'week', 'year');
            startTime1: '', //申请单数起始时间;
            startTimeVal1: '', //申请单数起始时间回填数据对象;
            endTime1: '', //申请单数结束时间;
            endTimeVal1: '', //申请单数结束时间回填数据对象;
            applicationList: [], //申请单数列表数据;

            /*通过申请单数;*/
            groupCondition2: '', //本周、本月、本年查询条件('day', 'week', 'year');
            startTime2: '', //申请单数起始时间;
            startTimeVal1: '',
            endTime2: '', //申请单数结束时间;
            endTimeVal2: '',
            passApplicationList: [], //通过申请单数列表数据;

            /*打款单数;*/
            groupCondition3: '', //本周、本月、本年查询条件('day', 'week', 'year');
            startTime3: '', //打款单数起始时间;
            startTimeVal1: '',
            endTime3: '', //打款单数结束时间;
            endTimeVal3: '',
            makeMoneyList: [], //打款单数列表数据;

            /*打款金额;*/
            amountOfMoneyList: [], //打款金额列表数据;

            /*逾期单数;*/
            groupCondition4: '', //本周、本月、本年查询条件('day', 'week', 'year');
            startTime4: '', //申请单数起始时间;
            endTime4: '', //申请单数结束时间;
            overdueList: [], //逾期单数列表数据;

            /*累计统计;*/
            totalTransferMoney: '', //打款总额;
            totalOverdueCount: '', //逾期总数
            passedRate: [{value: null}], //申请单通过率
            overdueRate: [{value: null}], //申请单逾期率
            todayApplyCount: '', //今日申请单数
            totalTransferCount: '', //申请单打款总数
            totalPassedCount: '', //申请单通过数
            transferMoneyRate: [{value: null}], //申请单打款率
            totalApplyCount: '', //申请单总数
            totalTransferMoneyState: 1, //累计打款的状态;

            applicationNumData: [ //申请单数数据;
                {year: '1951年', sales: 38},
                {year: '1952年', sales: 52},
                {year: '1953年', sales: 61},
                {year: '1954年', sales: 145},
                {year: '1955年', sales: 50}
            ],
            coles: {
                // applyCount: {
                //     tickInterval: 200000
                // }
            },
            coles1: {
                sold: {alias: '(笔)'},
                genre: {alias: '(月)'}
                // applyCount: {
                //     tickInterval: 20
                // }
            },
            accumulatedThroughData: [ //累计通过数据;
                {value: 6.0}
            ],
            accumulatedThroughCols: {
                value: {
                    min: 0,
                    max: 9,
                    tickInterval: 1,
                    nice: false,
                }
            },
            cols: {
                'value': {
                  min: 0,
                  max: 19,
                  tickInterval: 1,
                  nice: false
                }
            }
        }
    }

    disabledStartData1 = (dateVal)=>{
        if (!dateVal || !this.state.endTimeVal1) {
            return false;
        }
        return dateVal.valueOf() >= this.state.endTimeVal1.valueOf() || dateVal.valueOf()+30*24*60*60*1000 < this.state.endTimeVal1.valueOf();
    }

    disabledEndData1 = (dateVal)=>{
        if (!dateVal || !this.state.startTimeVal1) {
            return false;
        }
        return dateVal.valueOf() > this.state.startTimeVal1.valueOf()+ 30*24*60*60*1000 || dateVal.valueOf() <= this.state.startTimeVal1.valueOf();
    }

    onStartChange1 = (value, dateString) => {
        this.setState({
            startTime1: dateString,
            startTimeVal1: value
        }, ()=>{
            if(this.state.endTimeVal1){
                this.getChartData();
            }
        });
    }
    
    onEndChange1 = (value, dateString) => {
        this.setState({
            endTime1: dateString,
            endTimeVal1: value
        }, ()=>{
            if(this.state.startTimeVal1){
                this.getChartData();
            }
        });
    }

    disabledStartData2 = (dateVal)=>{
        if (!dateVal || !this.state.endTimeVal2) {
            return false;
        }
        return dateVal.valueOf() >= this.state.endTimeVal2.valueOf() || dateVal.valueOf()+30*24*60*60*1000 < this.state.endTimeVal2.valueOf();
    }

    disabledEndData2 = (dateVal)=>{
        if (!dateVal || !this.state.startTimeVal2) {
            return false;
        }
        return dateVal.valueOf() > this.state.startTimeVal2.valueOf()+ 30*24*60*60*1000 || dateVal.valueOf() <= this.state.startTimeVal2.valueOf();
    }

    onStartChange2 = (value, dateString) => {
        this.setState({
            startTime2: dateString,
            startTimeVal2: value
        }, ()=>{
            if(this.state.endTimeVal2){
                this.passApplicationData();
            }
        });
    };

    onEndChange2 = (value, dateString) => {
        this.setState({
            endTime2: dateString,
            endTimeVal2: value
        }, ()=>{
            if(this.state.startTimeVal2){
                this.passApplicationData();
            }
        });
    }

    disabledStartData3 = (dateVal)=>{
        if (!dateVal || !this.state.endTimeVal3) {
            return false;
        }
        return dateVal.valueOf() >= this.state.endTimeVal3.valueOf() || dateVal.valueOf()+30*24*60*60*1000 < this.state.endTimeVal3.valueOf();
    }

    disabledEndData3 = (dateVal)=>{
        if (!dateVal || !this.state.startTimeVal3) {
            return false;
        }
        return dateVal.valueOf() > this.state.startTimeVal3.valueOf()+ 30*24*60*60*1000 || dateVal.valueOf() <= this.state.startTimeVal3.valueOf();
    }

    onStartChange3 = (value, dateString) => {
        this.setState({
            startTime3: dateString,
            startTimeVal3: value
        }, ()=>{
            if(this.state.endTimeVal3){
                this.makeMoneyData();
                this.amountOfMoneyData();
            }
        });
    };

    onEndChange3 = (value, dateString) => {
        this.setState({
            endTime3: dateString,
            endTimeVal3: value
        }, ()=>{
            if(this.state.startTimeVal3){
                this.makeMoneyData();
                this.amountOfMoneyData();
            }
        });
    }

    // onChangeData3 = (value, dateStrings) => {
    //     this.setState({
    //         startTime3:dateStrings,
    //         endTime3:value,
    //     },()=>{
    //         console.log("起始时间：");
    //         console.log(this.state.startTime1);
    //         this.makeMoneyData();
    //         this.amountOfMoneyData();
    //     })
    // };

    onChangeData4 = (date, dateStrings) => {
        this.setState({
            startTime4:dateStrings[0], //查询起始时间
            endTime4:dateStrings[1], //查询结束时间
        },()=>{
            console.log("起始时间：");
            this.overdueData();
        })
    };

    changeTab(key){
        this.setState({
            totalTransferMoneyState: key
        });
        console.log(key);
    };

    dateForm(num){
        let currentdate = new Date(),
            currentTime = currentdate.getFullYear()+"-"+currentdate.getMonth()+"-"+currentdate.getDate(),
            date2 = new Date(currentdate);
        date2.setDate(currentdate.getDate()+num);
        let timeForm = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
        return timeForm;
    }

    changeTimeStage(index, e){
        let weekTimeForm = this.dateForm(-7);
        let timeMark = e.target.innerHTML;
        console.log("index的值：");
        console.log(index);
        let currentDate = new Date(),
            year = currentDate.getFullYear(),
            month = currentDate.getMonth()+1,
            day = currentDate.getDate();
        console.log("年月日：");
        console.log(year+":"+month+":"+day);
        if(index == 1){
            if(timeMark == "一周"){
                this.setState({
                    startTime1: weekTimeForm,
                    groupCondition1: 'day',
                    endTime1: year+'-'+month+'-'+day,
                    tabIndex1: 0
                }, ()=>{
                    this.getChartData();
                });
            }else if(timeMark == "一月"){
                this.setState({
                    startTime1: year+'-'+(month-1)+'-'+day,
                    groupCondition1: 'week',
                    endTime1: year+'-'+month+'-'+day,
                    tabIndex1: 1
                }, ()=>{
                    this.getChartData();
                });
            }else if(timeMark == "一年"){
                this.setState({
                    startTime1: (year-1)+'-'+month+'-'+day,
                    groupCondition1: 'year',
                    endTime1: year+'-'+month+'-'+day,
                    tabIndex1: 2
                }, ()=>{
                    this.getChartData();
                });
            }
        }else if(index == 2){
            if(timeMark == "一周"){
                this.setState({
                    startTime2: weekTimeForm,
                    groupCondition2: 'day',
                    endTime2: year+'-'+month+'-'+day,
                    tabIndex2: 0
                }, ()=>{
                    this.passApplicationData();
                });
            }else if(timeMark == "一月"){
                this.setState({
                    startTime2: year+'-'+(month-1)+'-'+day,
                    groupCondition2: 'week',
                    endTime2: year+'-'+month+'-'+day,
                    tabIndex2: 1
                }, ()=>{
                    this.passApplicationData();
                });
            }else if(timeMark == "一年"){
                this.setState({
                    startTime2: (year-1)+'-'+month+'-'+day,
                    groupCondition2: 'year',
                    endTime2: year+'-'+month+'-'+day,
                    tabIndex2: 2
                }, ()=>{
                    this.passApplicationData();
                });
            }
        }else if(index == 3){
            console.log("数据：");
            console.log(index);
            if(timeMark == "一周"){
                this.setState({
                    startTime3: weekTimeForm,
                    groupCondition3: 'day',
                    endTime3: year+'-'+month+'-'+day,
                    tabIndex3: 0
                }, ()=>{
                    this.makeMoneyData();
                    this.amountOfMoneyData();
                });
            }else if(timeMark == "一月"){
                this.setState({
                    startTime3: year+'-'+(month-1)+'-'+day,
                    groupCondition3: 'week',
                    endTime3: year+'-'+month+'-'+day,
                    tabIndex3: 1
                }, ()=>{
                    this.makeMoneyData();
                    this.amountOfMoneyData();
                });
            }else if(timeMark == "一年"){
                this.setState({
                    startTime3: (year-1)+'-'+month+'-'+day,
                    groupCondition3: 'year',
                    endTime3: year+'-'+month+'-'+day,
                    tabIndex3: 2
                }, ()=>{
                    this.makeMoneyData();
                    this.amountOfMoneyData();
                });
            }
        }else if(index == 4){
            if(timeMark == "一周"){
                this.setState({
                    startTime4: weekTimeForm,
                    groupCondition4: 'day',
                    endTime4: year+'-'+month+'-'+day,
                    tabIndex4: 0
                }, ()=>{
                    this.overdueData();
                });
            }else if(timeMark == "一月"){
                this.setState({
                    startTime4: year+'-'+(month-1)+'-'+day,
                    groupCondition4: 'week',
                    endTime4: year+'-'+month+'-'+day,
                    tabIndex4: 1
                }, ()=>{
                    this.overdueData();
                });
            }else if(timeMark == "一年"){
                this.setState({
                    startTime4: (year-1)+'-'+month+'-'+day,
                    groupCondition4: 'year',
                    endTime4: year+'-'+month+'-'+day,
                    tabIndex4: 2
                }, ()=>{
                    this.overdueData();
                });
            }
        }
        // if(timeMark == "本周"){
        //     this.setState({
        //         groupCondition1: 'day'
        //     }, ()=>{
        //         this.getChartData();
        //     })
        // }else if(timeMark == "本月"){
        //     this.setState({
        //         groupCondition1: 'week'
        //     }, ()=>{
        //         this.getChartData();
        //     });
        // }else if(timeMark == "全年"){
        //     this.setState({
        //         groupCondition1: 'year'
        //     }, ()=>{
        //         this.getChartData();
        //     });
        // }
    }

    getChartData(){
        let applyNumData = {
            applyNumUrl: '/admin/statistics/analysis/apply', //业务分析-申请单数接口;
            applyNumParams: {
                groupCondition: this.state.groupCondition1,
                startTime: this.state.startTime1+" 00:00:00",
                endTime: this.state.endTime1+" 23:59:59"
            }
        };
        if(this.state.startTime1 == ''){
            applyNumData.applyNumParams.startTime = this.dateForm(-7)+" 00:00:00";
            applyNumData.applyNumParams.endTime = this.dateForm(0)+" 23:59:59";
        }
        ajax.post(applyNumData.applyNumUrl, applyNumData.applyNumParams).then((resp)=>{
            console.log("申请单数返回的数据：");
            console.log(resp);
            if(resp.code == 0){
                let applicationListFormat = [];
                for(var i=0; i<resp.data.length; i++){
                    applicationListFormat.push({applyCount: parseInt(resp.data[i].applyCount), applyDate: resp.data[i].applyDate+" "});
                }
                this.setState({
                    applicationList: applicationListFormat.reverse()
                });
            }else{
                console.log("list"+resp.msg);
                // message.error(resp.msg);
            }
        });
    }

    passApplicationData(){
        let passApplicationData = {
            passApplicationUrl: '/admin/statistics/analysis/passed', //业务分析-通过申请单数接口;
            passApplicationParams: {
                groupCondition: this.state.groupCondition2,
                startTime: this.state.startTime2+" 00:00:00",
                endTime: this.state.endTime2+" 23:59:59"
            }
        }
        if(this.state.startTime2 == ''){
            passApplicationData.passApplicationParams.startTime = this.dateForm(-7)+" 00:00:00";
            passApplicationData.passApplicationParams.endTime = this.dateForm(0)+" 23:59:59";
        }
        ajax.post(passApplicationData.passApplicationUrl, passApplicationData.passApplicationParams).then((resp)=>{
            console.log("通过申请单数：");
            console.log(resp);
            if(resp.code == 0){
                let passApplicationListFormat = [];
                for(var i=0; i<resp.data.length; i++){
                    passApplicationListFormat.push({applyCount: parseInt(resp.data[i].applyCount), applyDate: resp.data[i].applyDate+" "});
                }
                this.setState({
                    passApplicationList: passApplicationListFormat.reverse()
                });
            }else{
                console.log("list"+resp.msg);
            }
        });
    }

    makeMoneyData(){
        let makeMoneyData = {
            makeMoneyUrl: '/admin/statistics/analysis/transfer', //业务分析-打款单数接口;
            makeMoneyParams: {
                //groupCondition: this.state.groupCondition4,
                groupCondition: this.state.groupCondition3,
                startTime: this.state.startTime3+" 00:00:00",
                endTime: this.state.endTime3+" 23:59:59"
            }
        }
        if(this.state.startTime3 == ''){
            makeMoneyData.makeMoneyParams.startTime = this.dateForm(-7)+" 00:00:00";
            makeMoneyData.makeMoneyParams.endTime = this.dateForm(0)+" 23:59:59";
        }
        ajax.post(makeMoneyData.makeMoneyUrl, makeMoneyData.makeMoneyParams).then((resp)=>{
            console.log("打款单数返回数据:");
            console.log(resp);
            if(resp.code == 0){
                let makeMoneyListFormat = [];
                for(var i=0; i<resp.data.length; i++){
                    makeMoneyListFormat.push({applyCount: parseInt(resp.data[i].applyCount), applyDate: resp.data[i].applyDate+" "});
                }
                this.setState({
                    makeMoneyList: makeMoneyListFormat.reverse()
                });
            }else{
                console.log("list"+resp.msg);
            }
        });
    }

    amountOfMoneyData(){
        let amountOfMoneyData = {
            amountOfMoneyUrl: '/admin/statistics/analysis/money', //业务分析-打款金额接口;
            amountOfMoneyParams: {
                //groupCondition: this.state.groupCondition4,
                groupCondition: this.state.groupCondition3,
                startTime: this.state.startTime3+" 00:00:00",
                endTime: this.state.endTime3+" 23:59:59"
            }
        }
        if(this.state.startTime3 == ''){
            amountOfMoneyData.amountOfMoneyParams.startTime = this.dateForm(-7)+" 00:00:00";
            amountOfMoneyData.amountOfMoneyParams.endTime = this.dateForm(0)+" 23:59:59";
        }
        ajax.post(amountOfMoneyData.amountOfMoneyUrl, amountOfMoneyData.amountOfMoneyParams).then((resp)=>{
            console.log("打款金额：");
            console.log(resp);
            if(resp.code == 0){
                let amountOfMoneyListFormat = [];
                for(var i=0; i<resp.data.length; i++){
                    amountOfMoneyListFormat.push({applyCount: parseInt(resp.data[i].applyCount), applyDate: resp.data[i].applyDate+" "});
                }
                this.setState({
                    amountOfMoneyList: amountOfMoneyListFormat.reverse()
                });
            }else{
                console.log("list"+resp.msg);
            }
        });
    }

    overdueData(){
        let overdueData = {
            overdueUrl: '/admin/statistics/analysis/overdue', //业务分析-逾期单数接口;
            overdueParams: {
                //groupCondition: this.state.groupCondition4,
                groupCondition: this.state.groupCondition4,
                startTime: this.state.startTime4+" 00:00:00",
                endTime: this.state.endTime4+" 23:59:59"
            }
        }
        if(this.state.startTime1 == ''){
            overdueData.overdueParams.startTime = this.dateForm(-7)+" 00:00:00";
            overdueData.overdueParams.endTime = this.dateForm(0)+" 23:59:59";
        }
        ajax.post(overdueData.overdueUrl, overdueData.overdueParams).then((resp)=>{
            console.log("逾期单数返回数据：");
            console.log(resp);
            if(resp.code == 0){
                let overdueListFormat = [];
                for(var i=0; i<resp.data.length; i++){
                    overdueListFormat.push({applyCount: parseInt(resp.data[i].applyCount), applyDate: resp.data[i].applyDate+" "});
                }
                this.setState({
                    overdueList: overdueListFormat.reverse()
                });
            }else{
                console.log("list"+resp.msg);
            }
        });
    }
    
    totalNumData(){
        let totalNumUrl = '/admin/statistics/analysis/total'; //业务分析-累计统计接口;
        ajax.post(totalNumUrl).then((resp)=>{
            console.log("返回的统计数据为：");
            console.log(resp);
            if(resp.code == 0){
                let passedRate = resp.data.passedRate*10,
                    transferMoneyRate = resp.data.transferMoneyRate*10;
                this.setState({
                    totalTransferMoney: resp.data.totalTransferMoney,
                    totalOverdueCount: resp.data.totalOverdueCount,
                    passedRate: [
                        {value: Math.round(passedRate*100)/100}
                    ],
                    overdueRate: [
                        {value: resp.data.overdueRate}
                    ],
                    todayApplyCount: resp.data.todayApplyCount,
                    totalTransferCount: resp.data.totalTransferCount,
                    totalPassedCount: resp.data.totalPassedCount,
                    transferMoneyRate: [
                        {value: Math.round(transferMoneyRate*100)/100}
                    ],
                    totalApplyCount: resp.data.totalApplyCount
                });
            }else{
                console.log("list"+resp.msg);
            }
        });
    }

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){
            this.getChartData();
            this.passApplicationData();
            this.makeMoneyData();
            this.amountOfMoneyData();
            this.overdueData();
            this.totalNumData();
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        const operations = <div className="timeContBox">
            <Row className="chartArea">
                {/* <Col span="4" style={{textAlign:'left'}}>
                    <h3 className="titleText">通过申请单数</h3>
                </Col> */}
                <Col span="8">
                    <p className="timeBox timeBox3">
                        {
                            this.state.tabArra.map((item,i)=>{
                                return <span className={item.tabId == this.state.tabIndex3? 'month active':'month'} key={i} ref="monthDom" onClick={this.changeTimeStage.bind(this, 3)}>{item.tabText}</span>
                            })
                        }
                    </p>
                </Col>
                <Col span="7">
                    <DatePicker 
                        disabledDate={this.disabledStartData3}
                        placeholder="开始日期"
                        onChange={this.onStartChange3}
                    />
                </Col>
                <Col span="2" style={{textAlign:'center'}}>
                    <span>~</span>
                </Col>
                <Col span="7">
                    <DatePicker
                        disabledDate={this.disabledEndData3} 
                        placeholder={'截止日期'}
                        onChange={this.onEndChange3}
                    />
                    {/* <RangePicker
                        ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                        onChange={this.onChangeData1}
                        placeholder={['所有时间', '所有时间']}
                    /> */}
                </Col>
            </Row>
        </div>;

        let totalTransferMoneyComp = null;
        if(this.state.totalTransferMoneyState == 1){
            totalTransferMoneyComp = <div className="applicationNUmTop throughNumBox">
                                        <p className="applicationMark">累计打款单数</p>
                                        <p className="applicationNumVal">{this.state.totalTransferCount}</p>
                                    </div>;
        }else if(this.state.totalTransferMoneyState == 2){
            totalTransferMoneyComp = <div className="applicationNUmTop throughNumBox">
                                        <p className="applicationMark">累计打款金额</p>
                                        <p className="applicationNumVal">{this.state.totalTransferMoney}</p>
                                    </div>;
        }
        
        return(
            <div className="staffChart distributionList staffManage businessChart">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>业务分析</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{paddingTop:'24px',display: 'flex',flexWrap: 'wrap', minHeight: 780 }}>

                    {/* 申请单数; */}
                    {/* <BusinessBarComp /> */}
                    <div className="chartBox businessChart" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <Row className="chartArea">
                                <Col span="4" style={{textAlign:'left'}}>
                                    <h3 className="titleText">申请单数</h3>
                                </Col>
                                <Col span="13">
                                    <p className="timeBox">
                                        {
                                            this.state.tabArra.map((item,i)=>{
                                                return <span className={item.tabId == this.state.tabIndex1? 'month active':'month'} key={i} ref="monthDom" onClick={this.changeTimeStage.bind(this, 1)}>{item.tabText}</span>
                                            })
                                        }
                                        {/* <span className="week active" ref="weekDom" onClick={this.changeTimeStage.bind(this, 1)}>本周</span>
                                        <span className="month" ref="monthDom" onClick={this.changeTimeStage.bind(this, 1)}>本月</span>
                                        <span className="year" ref="yearDom" onClick={this.changeTimeStage.bind(this, 1)}>全年</span> */}
                                    </p>
                                </Col>
                                <Col span="3">
                                    <DatePicker 
                                        disabledDate={this.disabledStartData1}
                                        placeholder="开始日期"
                                        onChange={this.onStartChange1}
                                    />
                                </Col>
                                <Col span="1" style={{textAlign:'center'}}>
                                    <span>~</span>
                                </Col>
                                <Col span="3">
                                    <DatePicker
                                        disabledDate={this.disabledEndData1} 
                                        placeholder={'截止日期'}
                                        onChange={this.onEndChange1}
                                    />
                                    {/* <RangePicker
                                        ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                        onChange={this.onChangeData1}
                                        placeholder={['所有时间', '所有时间']}
                                    /> */}
                                </Col>
                            </Row>
                        </div>
                        <div className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {/* {dataOpt7} */}
                            <Chart height={400} padding={[50,50,50,50]} data={this.state.applicationList} scale={this.state.coles1} forceFit>
                                <Axis name="applyDate" line={{lineWidth:0.4}} />
                                <Axis name="applyCount" line={{lineWidth:0.4}} />
                                    <Tooltip
                                        containerTpl= '<div class="g2-tooltip" style="color: #fff; background: rgba(0, 0, 0, 0.75)!important;"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div><ul class="g2-tooltip-list"></ul></div>'
                                        itemTpl= '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>申请单数: {value}笔</li>'
                                        crosshairs={{type: "y"}}/>
                                <Geom type="interval" size={10} position="applyDate*applyCount" color="#1890FF" />
                            </Chart>
                        </div>
                        {/* <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/7"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div> */}
                    </div>

                    {/* 累计申请; */}
                    <div className="chartBox businessChart" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="titleText">累计申请</h3>
                        </div>
                        <div className="totalApplicationCont">
                            <div className="applicationNUmTop">
                                <p className="applicationMark">今日新增申请单数</p>
                                <p className="applicationNumVal">{this.state.todayApplyCount}</p>
                            </div>
                            <div className="applicationNUmBottom">
                                <p className="applicationMark">累计申请单数</p>
                                <p className="applicationNumVal">{this.state.totalApplyCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* 通过申请单数; */}
                    <div className="chartBox businessChart" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <Row className="chartArea">
                                <Col span="4" style={{textAlign:'left'}}>
                                    <h3 className="titleText">通过申请单数</h3>
                                </Col>
                                <Col span="13">
                                <p className="timeBox">
                                    {
                                        this.state.tabArra.map((item,i)=>{
                                            return <span className={item.tabId == this.state.tabIndex2? 'month active':'month'} key={i} ref="monthDom" onClick={this.changeTimeStage.bind(this, 2)}>{item.tabText}</span>
                                        })
                                    }
                                    {/* <span className="week active" onClick={this.changeTimeStage.bind(this, 2)}>本周</span>
                                    <span className="month" onClick={this.changeTimeStage.bind(this, 2)}>本月</span>
                                    <span className="year" onClick={this.changeTimeStage.bind(this, 2)}>全年</span> */}
                                </p>
                                </Col>
                                <Col span="3">
                                    <DatePicker 
                                        disabledDate={this.disabledStartData2}
                                        placeholder="开始日期"
                                        onChange={this.onStartChange2}
                                    />
                                </Col>
                                <Col span="1" style={{textAlign:'center'}}>
                                    <span>~</span>
                                </Col>
                                <Col span="3">
                                    <DatePicker
                                        disabledDate={this.disabledEndData2} 
                                        placeholder={'截止日期'}
                                        onChange={this.onEndChange2}
                                    />
                                    {/* <RangePicker
                                        ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                        onChange={this.onChangeData1}
                                        placeholder={['所有时间', '所有时间']}
                                    /> */}
                                </Col>
                            </Row>
                            {/* <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData2}
                                placeholder={['所有时间', '所有时间']}
                            /> */}
                        </div>
                        <div className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {/* {dataOpt7} */}
                            <Chart height={400} padding={[50,50,50,50]} data={this.state.passApplicationList} scale={this.state.coles1} forceFit>
                                <Axis name="applyDate" line={{lineWidth:0.4}} visible={true} />
                                <Axis name="applyCount" line={{lineWidth:0.4}} visible={true} />
                                {/* <Axis name="applyDate" title={true} />
                                <Axis name="applyCount" title={true} /> */}
                                    <Tooltip
                                        containerTpl= '<div class="g2-tooltip" style="color: #fff; background: rgba(0, 0, 0, 0.75)!important;"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div><ul class="g2-tooltip-list"></ul></div>'
                                        itemTpl= '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>通过申请单数: {value}笔</li>'
                                        crosshairs={{type: "y"}}/>
                                <Geom type="interval" size={10} position="applyDate*applyCount" color="#4ECB74">
                                    {/* <Label content="count"></Label> */}
                                </Geom>
                            </Chart>
                        </div>
                        {/* <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/7"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div> */}
                    </div>

                    {/* 累计通过; */}
                    <div className="chartBox businessChart" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="titleText">累计通过</h3>
                        </div>
                        <div className="totalApplicationCont">
                            <div className="applicationNUmTop throughNumBox">
                                <p className="applicationMark">累计通过申请单数</p>
                                <p className="applicationNumVal">{this.state.totalPassedCount}</p>
                            </div>
                            {/* <div className="applicationNUmBottom">
                                <p className="applicationMark">累计申请单数</p>
                                <p className="applicationNumVal">126,560</p>
                            </div> */}
                            <div className="dashboardBox">
                                <Chart height={200} data={this.state.passedRate} scale={this.state.accumulatedThroughCols} padding={[0, 0, 0, 0]} forceFit>
                                    <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
                                    <Axis
                                        name="value"
                                        zIndex={2}
                                        line={null}
                                        label={{
                                            offset: -16,
                                            textStyle: {
                                            fontSize: 18,
                                            textAlign: 'center',
                                            textBaseline: 'middle',
                                            },
                                        }}
                                        subTickCount={4}
                                        subTickLine={{
                                            length: -8,
                                            stroke: '#fff',
                                            strokeOpacity: 1,
                                        }}
                                        tickLine={{
                                            length: -18,
                                            stroke: '#fff',
                                            strokeOpacity: 1,
                                        }}/>
                                    <Axis name="1" visible={false} />
                                    <Guide>
                                        <Arc
                                            zIndex={0}
                                            start={[0, 0.965]}
                                            end={[9, 0.965]}
                                            style={{ // 底灰色
                                            stroke: '#F0F2F5',
                                            lineWidth: 13,
                                            }}/>
                                        <Arc
                                            zIndex={1}
                                            start={[0, 0.965]}
                                            end={[this.state.passedRate[0].value, 0.965]}
                                            style={{
                                            stroke: '#4ECB74',
                                            lineWidth: 13,
                                            }}/>
                                        <Html
                                            position={['50%', '95%']}
                                            html={() => (`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 14px; color: rgba(0,0,0,0.43);margin: 0;">通过率</p><p style="font-size: 26px;color: rgba(0,0,0,0.85);margin: 0;">${this.state.passedRate[0].value*10}%</p></div>`)}/>
                                    </Guide>
                                    <Geom
                                        type="point"
                                        position="value*1"
                                        shape="pointer"
                                        color="#4ECB74"
                                        active={false}
                                        style={{ stroke: '#fff', lineWidth: 1 }}/>
                                </Chart>
                            </div>
                        </div>
                    </div>

                    {/* 打款单数、打款金额 */}
                    <div className="chartBox businessChart" style={{height:'536px',padding:'16px 0 0'}}>
                        <Tabs defaultActiveKey="1" tabBarExtraContent={operations} onChange={this.changeTab.bind(this)}>
                            <TabPane tab="打款单数" key="1">
                                <div className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                                    <Chart height={400} padding={[50,50,50,50]} data={this.state.makeMoneyList} scale={this.state.coles1} forceFit>
                                        <Axis name="applyDate" line={{lineWidth:0.4}} />
                                        <Axis name="applyCount" line={{lineWidth:0.4}} />
                                            <Tooltip
                                                containerTpl= '<div class="g2-tooltip" style="color: #fff; background: rgba(0, 0, 0, 0.75)!important;"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div><ul class="g2-tooltip-list"></ul></div>'
                                                itemTpl= '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>打款单数: {value}笔</li>'
                                                crosshairs={{type: "y"}}/>
                                        <Geom type="interval" size={10} position="applyDate*applyCount" color="#975FE4" />
                                    </Chart>
                                </div>
                            </TabPane>
                            <TabPane tab="打款金额" key="2">
                                <div className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                                    <Chart height={400} padding={[50,50,50,80]} data={this.state.amountOfMoneyList} scale={this.state.coles} forceFit>
                                        <Axis name="applyDate" line={{lineWidth:0.4}} />
                                        <Axis name="applyCount" line={{lineWidth:0.4}} />
                                            <Tooltip
                                                containerTpl= '<div class="g2-tooltip" style="color: #fff; background: rgba(0, 0, 0, 0.75)!important;"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div><ul class="g2-tooltip-list"></ul></div>'
                                                itemTpl= '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>打款金额: {value}元</li>'
                                                crosshairs={{type: "y"}}/>
                                        <Geom type="interval" size={10} position="applyDate*applyCount" color="#975FE4" />
                                    </Chart>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>

                    {/* 累计打款; */}
                    <div className="chartBox businessChart" style={{height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="titleText">累计打款</h3>
                        </div>
                        <div className="totalApplicationCont">
                            {totalTransferMoneyComp}
                            <div className="dashboardBox">
                                <Chart height={200} data={this.state.transferMoneyRate} scale={this.state.accumulatedThroughCols} padding={[0, 0, 0, 0]} forceFit>
                                    <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
                                    <Axis
                                        name="value"
                                        zIndex={2}
                                        line={null}
                                        label={{
                                            offset: -16,
                                            textStyle: {
                                            fontSize: 18,
                                            textAlign: 'center',
                                            textBaseline: 'middle',
                                            },
                                        }}
                                        subTickCount={4}
                                        subTickLine={{
                                            length: -8,
                                            stroke: '#fff',
                                            strokeOpacity: 1,
                                        }}
                                        tickLine={{
                                            length: -18,
                                            stroke: '#fff',
                                            strokeOpacity: 1,
                                        }}/>
                                    <Axis name="1" visible={false} />
                                    <Guide>
                                        <Arc
                                            zIndex={0}
                                            start={[0, 0.965]}
                                            end={[9, 0.965]}
                                            style={{ // 底灰色
                                            stroke: '#F0F2F5',
                                            lineWidth: 13,
                                            }}/>
                                        <Arc
                                            zIndex={1}
                                            start={[0, 0.965]}
                                            end={[this.state.transferMoneyRate[0].value, 0.965]}
                                            style={{
                                            stroke: '#A677E8',
                                            lineWidth: 13,
                                            }}/>
                                        <Html
                                            position={['50%', '95%']}
                                            html={() => (`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 14px; color: rgba(0,0,0,0.43);margin: 0;">打款率</p><p style="font-size: 26px;color: rgba(0,0,0,0.85);margin: 0;">${this.state.transferMoneyRate[0].value*10}%</p></div>`)}/>
                                    </Guide>
                                    <Geom
                                        type="point"
                                        position="value*1"
                                        shape="pointer"
                                        color="#A677E8"
                                        active={false}
                                        style={{ stroke: '#fff', lineWidth: 1 }}/>
                                </Chart>
                            </div>
                        </div>
                    </div>
                
                    {/* 逾期单数; */}
                    <div className="chartBox businessChart" style={{display:'none', height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="titleText">逾期单数</h3>
                            <p className="timeBox">
                                {
                                    this.state.tabArra.map((item,i)=>{
                                        return <span className={item.tabId == this.state.tabIndex4? 'month active':'month'} key={i} ref="monthDom" onClick={this.changeTimeStage.bind(this, 4)}>{item.tabText}</span>
                                    })
                                }
                                {/* <span className="week active" onClick={this.changeTimeStage.bind(this, 4)}>本周</span>
                                <span className="month" onClick={this.changeTimeStage.bind(this, 4)}>本月</span>
                                <span className="year" onClick={this.changeTimeStage.bind(this, 4)}>全年</span> */}
                            </p>
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.onChangeData4}
                                placeholder={['所有时间', '所有时间']}
                            />
                        </div>
                        <div className="listCont" style={{width:'100%',position:"flex",justifyContent:"space-around"}}>
                            {/* {dataOpt7} */}
                            <Chart height={400} padding={[50,50,50,50]} data={this.state.overdueList} scale={this.state.coles1} forceFit>
                                <Axis name="applyDate" line={{lineWidth:0.4}} />
                                <Axis name="applyCount" line={{lineWidth:0.4}} />
                                    <Tooltip
                                        containerTpl= '<div class="g2-tooltip" style="color: #fff; background: rgba(0, 0, 0, 0.75)!important;"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div><ul class="g2-tooltip-list"></ul></div>'
                                        itemTpl= '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>逾期单数: {value}笔</li>'
                                        crosshairs={{type: "y"}}/>
                                <Geom type="interval" size={10} position="applyDate*applyCount" color="#F2637B" />
                            </Chart>
                        </div>
                        {/* <div style={{height:'46px',lineHeight:'46px',paddingLeft:'24px'}}>
                            <Link to={"/dataStatistics/staffChart/list2/7"} style={{color:'rgba(0,0,0,0.65)'}}>查看全部</Link>
                        </div> */}
                    </div>
                
                    {/* 累计逾期; */}
                    <div className="chartBox businessChart" style={{display: 'none', height:'536px',padding:'16px 0 0'}}>
                        <div className="chartTitle">
                            <h3 className="titleText">累计逾期</h3>
                        </div>
                        <div className="totalApplicationCont">
                            <div className="applicationNUmTop throughNumBox">
                                <p className="applicationMark">累计逾期单数</p>
                                <p className="applicationNumVal">{this.state.totalOverdueCount}</p>
                            </div>
                            {/* <div className="applicationNUmBottom">
                                <p className="applicationMark">累计申请单数</p>
                                <p className="applicationNumVal">126,560</p>
                            </div> */}
                            <div className="dashboardBox">
                                <Chart height={200} data={this.state.overdueRate} scale={this.state.accumulatedThroughCols} padding={[0, 0, 0, 0]} forceFit>
                                    <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
                                    <Axis
                                        name="value"
                                        zIndex={2}
                                        line={null}
                                        label={{
                                            offset: -16,
                                            textStyle: {
                                            fontSize: 18,
                                            textAlign: 'center',
                                            textBaseline: 'middle',
                                            },
                                        }}
                                        subTickCount={4}
                                        subTickLine={{
                                            length: -8,
                                            stroke: '#fff',
                                            strokeOpacity: 1,
                                        }}
                                        tickLine={{
                                            length: -18,
                                            stroke: '#fff',
                                            strokeOpacity: 1,
                                        }}/>
                                    <Axis name="1" visible={false} />
                                    <Guide>
                                        <Arc
                                            zIndex={0}
                                            start={[0, 0.965]}
                                            end={[9, 0.965]}
                                            style={{ // 底灰色
                                            stroke: '#F0F2F5',
                                            lineWidth: 13,
                                            }}/>
                                        <Arc
                                            zIndex={1}
                                            start={[0, 0.965]}
                                            end={[this.state.overdueRate[0].value*10, 0.965]}
                                            style={{
                                            stroke: '#F3798E',
                                            lineWidth: 13,
                                            }}/>
                                        <Html
                                            position={['50%', '95%']}
                                            html={() => (`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 14px; color: rgba(0,0,0,0.43);margin: 0;">逾期率</p><p style="font-size: 26px;color: rgba(0,0,0,0.85);margin: 0;">${this.state.overdueRate[0].value*100}%</p></div>`)}/>
                                    </Guide>
                                    <Geom
                                        type="point"
                                        position="value*1"
                                        shape="pointer"
                                        color="#F3798E"
                                        active={false}
                                        style={{ stroke: '#fff', lineWidth: 1 }}/>
                                </Chart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const businessAnalysis = Form.create()(businessAnalysisForm);
export default businessAnalysis;