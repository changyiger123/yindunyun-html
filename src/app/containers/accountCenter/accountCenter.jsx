import React from 'react';
import { Link } from "react-router";
import { Form, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col,Modal,Popconfirm,Tabs,Radio,Input } from 'antd';
import Result from 'ant-design-pro/lib/Result'
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
import "./accountCenter.less";
import $ from 'jquery'
import ajax from "../../utils/ajax";
import NoExamine from '../../components/noExamine/noExamine'

class RoleManageList extends React.Component {

    constructor(props) {
        super(props);
        this.columns2 = [ //每月明细数据;
            {title: '出账时间', dataIndex: 'dataDate', key: 'dataDate'},
            {title: '查询次数', dataIndex: 'orderCount', key: 'orderCount'},
            {title: '每日账单总额', dataIndex: 'money', key: 'money'},
            {title: '每日明细', dataIndex: 'dayDetail', key: 'dayDetail', render: (text, record)=> <Link to={'/accountCenter/dayDetail/'+ record.dataDate}>查看</Link>}
        ];
        this.columns22 = [ //每月明细数据;
            {title: '出账时间', dataIndex: 'dataDate', key: 'dataDate'},
            {title: '查询次数', dataIndex: 'orderCount', key: 'orderCount'},
            {title: '每日账单总额', dataIndex: 'money', key: 'money'},
            {title: '每月明细', dataIndex: 'dayDetail', key: 'dayDetail', render: (text, record)=> <Link to={'/accountCenter/monthDetail/'+ record.dataDate}>查看</Link>}
        ];
        this.state = {
            total: 0,
            accountStatus:window.localStorage.getItem("status"),
            noExamineShow:false,
            billType:'day',
            columns1: [ //充值记录数据;
                {title: '充值编号', dataIndex: 'tradeNo', key: 'tradeNo'},
                {title: '操作用户', dataIndex: 'userName', key: 'userName'},
                {title: '充值时间', dataIndex: 'addTime', key: 'addTime'},
                {title: '充值金额', dataIndex: 'money', key: 'money'},
                {title: '赠送金额', dataIndex: 'giftMoney', key: 'giftMoney'},
                {title: '订单状态', dataIndex: 'statusStr', key: 'statusStr'}
            ],
            currentPage: 1, //当前页码;
            pageSize: 10, //每页显示数据条数;
            columns2: this.columns2,
            billData: null,
            //billData: this.billData,
            currentPage2: 1, //当前页码;

            /*账单管理(日账单);*/
            dayOrMonthState: 'day', //日账单或月账单状态;
            billStartTime: '', //查询开始时间;
            billEndTime: '', //查询结束时间;
            billPageNumber: 1, //请求页;
            billPageSize: 10, //每页请求记录数;
            totalPage: '', //总页数;
            billData: this.billData,
            currentPage2: 1, //当前页码;

            billData: this.billData,
            currentPage2: 1, //当前页码;
            money: 0,
            checkedStyle: '1',

            startTimeVal1: '',
            endTimeVal1: '',
            
            startTimeVal2: '',
            endTimeVal2: '',
            rechargeRecordData: [],
            rechargeRecordTotalPage: '', //数据总量;
            rechargeRecordStartTime: '',
            rechargeRecordEndTime: '',
            rechargeRecordPageNumber: 1, //请求页;
            rechargeRecordPageSize: 10, //每页请求记录数;
            cash_mode: 1,
            cash_list: [],
            domain: ''
        };

    };

    callback (key) {
        this.setState({
            checkedStyle : key + ''
        })
    }

    changPage1 = (pageNum)=>{
        this.setState({
            rechargeRecordPageNumber: pageNum
        },()=>{
            this._rechargeRecord();
        });
    }

    onChangeMode(field,e) {
        switch(e.target.value){
            case 'day':
                this.setState({ 
                    dayOrMonthState: 'day',
                    columns2: this.columns2,
                    billPageNumber: 1
                }, ()=>{
                    this._dayOrder();
                });
                break;
            case 'month':
                this.setState({
                    dayOrMonthState: 'month',
                    columns2: this.columns22,
                    billPageNumber: 1
                }, ()=>{
                    this._monthOrder();
                });
                break;
        }
        this.setState({ 
            billType: e.target.value
        });
    }

    changPage2 = (pageNum)=>{
        this.setState({
            billPageNumber: pageNum
        },()=>{
            if(this.state.dayOrMonthState == 'day'){
                this._dayOrder();
            }else if(this.state.dayOrMonthState == 'month'){
                this._monthOrder();
            }
        });
    }


    disabledStartData1 = (dateVal)=>{
        if (!dateVal || !this.state.endTimeVal1) {
            return false;
        }
        return dateVal.valueOf() > this.state.endTimeVal1.valueOf();
    }

    disabledEndData1 = (dateVal)=>{
        if (!dateVal || !this.state.startTimeVal1) {
            return false;
        }
        return dateVal.valueOf() <= this.state.startTimeVal1.valueOf();
    }

    onStartChange1(value, dateString){
        console.log(dateString);
        this.setState({
            rechargeRecordStartTime: dateString,
            startTimeVal1: value
        });
    }

    onEndChange1(value, dateString){
        this.setState({
            rechargeRecordEndTime: dateString,
            endTimeVal1: value
        });
    }

    handleSubmit1(e){
        e.preventDefault();
        this.setState({
            rechargeRecordPageNumber:1
        },  ()=>{
            if(this.state.rechargeRecordStartTime == '' & this.state.rechargeRecordEndTime != ''){
                alert("请填写开始日期！");
            }else if(this.state.rechargeRecordEndTime == '' & this.state.rechargeRecordStartTime != ''){
                alert("请填写截止日期！");
            }else{
                this._rechargeRecord();
            }
        });
    }

    disabledStartData2 = (dateVal)=>{
        if (!dateVal || !this.state.endTimeVal2) {
            return false;
        }
        return dateVal.valueOf() > this.state.endTimeVal2.valueOf();
    }

    disabledEndData2 = (dateVal)=>{
        if (!dateVal || !this.state.startTimeVal2) {
            return false;
        }
        return dateVal.valueOf() <= this.state.startTimeVal2.valueOf();
    }

    onStartChange2(value, dateString){
        console.log(dateString);
        this.setState({
            billStartTime: dateString,
            startTimeVal2: value
        });
    }

    onEndChange2(value, dateString){
        this.setState({
            billEndTime: dateString,
            endTimeVal2: value
        });
    }

    chose_cash (i, e) {
        this.setState({cash_mode: i})
    }

    go_recharge () {
        if(this.state.accountStatus=="0"||this.state.accountStatus=="1"||this.state.accountStatus=="3") {
            this.setState({
                noExamineShow:true
            })
            return
        }
        if(!this.state.cash_mode) {
            message.error("请选择充值金额");
            return
        }
        ajax.post("/admin/api/V1.0/aliWapPay/preCreateOrder",{giftMoneyId:this.state.cash_mode,source: 'WEB',domain:this.state.domain}).then(response => {
            if(response.code) {
                message.error(response.msg);
                return
            }
            $('.recharge').append(response)
        })
    }

    _rechargeRecord(){
        let rechargeRecordData = {
            rechargeRecordUrl: '/admin/accountRecharge/list', //充值记录接口;
            rechargeRecordDataParams: {
                addTimeBegin: this.state.rechargeRecordStartTime,
                addTimeEnd: this.state.rechargeRecordEndTime,
                pageNumber: this.state.rechargeRecordPageNumber,
                pageSize: this.state.rechargeRecordPageSize
            }
        }
        ajax.post(rechargeRecordData.rechargeRecordUrl, rechargeRecordData.rechargeRecordDataParams).then((resp)=>{
            if(resp.code == 0){
                var rechargeRecordArr = resp.data.list; //充值编号、用户、充值时间、金额;
                this.setState({
                    rechargeRecordData: rechargeRecordArr
                });
                if(rechargeRecordArr.length > 0){
                    this.setState({
                        rechargeRecordTotalPage: resp.data.totalCount
                    });
                }else{
                    this.setState({
                        rechargeRecordTotalPage: 0
                    });
                }
            }
        });
    }

    handleSubmit2(e){
        e.preventDefault();
        this.setState({
            billPageNumber:1
        },  ()=>{
            if(this.state.billStartTime == '' & this.state.billEndTime != ''){
                alert("请填写开始日期！");
            }else if(this.state.billEndTime == '' & this.state.billStartTime != ''){
                alert("请填写截止日期！");
            }else{
                this._dayOrder();
            }
        });
    }

    _dayOrder(){
        let dayOrder = {
            dayOrderUrl: '/admin/orderManagement/dayOrder', //账单管理-日账单;
            dayOrderParams: {
                startTime: this.state.billStartTime,
                endTime: this.state.billEndTime,
                pageNumber: this.state.billPageNumber,
                pageSize: this.state.billPageSize
            }
        }
        ajax.post(dayOrder.dayOrderUrl, dayOrder.dayOrderParams).then((resp)=>{
            if(resp.code == 0){
                this.setState({
                    billData: resp.data
                },()=>{
                    console.log(this.state.billData);
                });
                if(resp.data.length > 0){
                    this.setState({
                        totalPage: resp.data[0].totalPage*(this.state.billPageSize)
                    });
                }else{
                    this.setState({
                        totalPage: 0
                    });
                }
            }else{
                console.log("dayOrder"+resp.msg);
            }
        });
    }

    _monthOrder(){
        let dayOrder = {
            dayOrderUrl: '/admin/orderManagement/monthOrder', //账单管理-月账单;
            dayOrderParams: {
                // startTime: this.state.billStartTime,
                // endTime: this.state.billEndTime,
                pageNumber: this.state.billPageNumber,
                pageSize: this.state.billPageSize
            }
        }
        ajax.post(dayOrder.dayOrderUrl, dayOrder.dayOrderParams).then((resp)=>{
            if(resp.code == 0){
                this.setState({
                    billData: resp.data
                },()=>{
                    console.log(this.state.billData);
                });
                if(resp.data.length > 0){
                    this.setState({
                        totalPage: resp.data[0].totalPage*(this.state.billPageSize)
                    });
                }else{
                    this.setState({
                        totalPage: 0
                    });
                }
            }else{
                console.log("monthOrder"+resp.msg);
            }
        });
    }


    setMoney (e) {
        var fValue = e.target.value;
        var str = /[^\d.]/;
        if(fValue.match(str)) {
            message.error("请输入数字")
        }
        fValue = fValue.replace(/[^\d.]/g,"");
        fValue = fValue.replace(/\.{2,}/g,".");
        fValue = fValue.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
        fValue = fValue.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        // if(fValue.indexOf(".")< 0 && fValue !=""){
        //     fValue= parseFloat(fValue);
        // }
        this.setState({
            money: fValue
        })
    }
    goCheckRecord () {
        // $(".responseBox").hide();
        // history.replaceState(null,null,'#/accountCenter')
        // this.setState({
        //     checkedStyle: '2'
        // })
        window.location.hash="/accountCenter"
    }
    componentWillMount() {
        this._dayOrder();
        this._rechargeRecord();
        ajax.post("/admin/account/info").then(response => {
            if(response.code == "0") {
                this.setState({
                    total: (response.data.total - 0).toFixed(2)+'元',
                    number: response.data.number
                })
            }else {
                message.error(response.msg);
            }
        })
        ajax.post("/admin/rechargeGiftMoney/list").then(response => {
            if(response.code == "0") {
                this.setState({
                    cash_list: response.data.list
                })
            }else {
                message.error(response.msg);
            }
        })
        var domain = window.location.href
        domain = domain.split('/#')[0]+'/#/accountCenter'
        this.setState({
            domain:domain
        })
    };

    componentWillUnmount() {

    }
    close_noExamine(){
        this.setState({noExamineShow:false})
    }
    render() {
        let datePicker = null;
        if(this.state.billType == "day"){
            datePicker = <Form style={{float: 'left'}}
                               onSubmit={this.handleSubmit2.bind(this)}>
                            <FormItem label="出账时间：">
                                <Col span="8" style={{display:'inline-block'}}>
                                    <DatePicker
                                        disabledDate={this.disabledStartData2}
                                        placeholder="开始日期"
                                        onChange={this.onStartChange2.bind(this)}
                                    />
                                </Col>
                                <Col span="1" style={{display:'inline-block'}}>
                                    <p className="ant-form-split">-</p>
                                </Col>
                                <Col span="8" style={{display:'inline-block'}}>
                                    <DatePicker 
                                        disabledDate={this.disabledEndData2}
                                        placeholder="截止日期"
                                        onChange={this.onEndChange2.bind(this)}
                                    />
                                </Col>
                                <Col span="4" style={{display:'inline-block', float:'right'}}>
                                    <Button type="primary" htmlType="submit" >查询</Button>
                                </Col>
                            </FormItem>
                        </Form>;
        }else if(this.state.billType == "month"){
            datePicker = <Form></Form>;
        }
        const actions = (
            <div>
                <Button type="primary" onClick={this.goCheckRecord.bind(this)}>确定</Button>
            </div>
        )
        const actions2 = (
            <div>
                <Button type="primary">重新充值</Button>
                <Button>取消</Button>
            </div>
        )
        const returnBody = window.location.href.split('?')[1]
        const returnArr = returnBody ? returnBody.split("&") : ''
        var params = {}
        if (returnArr) {
            for (var i = 0;i < returnArr.length;i++) {
                params[returnArr[i].split("=")[0]] = returnArr[i].split("=")[1]
            }
        }
        return (
            <div>
                <Breadcrumb style={{ padding: '16px 28px',fontSize:'20px',fontWeight:'bold',background:"#fff"}}>
                    <Breadcrumb.Item>账户中心</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainContAccount" style={{paddingTop:'24px', minHeight: 780 }}>
                    <div className="account_cash">
                        <div className="account_option_title">账户余额</div>
                        <div className="cash_content">
                            <p>您的账户余额为</p>
                            <div>{this.state.total}</div>
                            {/* <span>剩余 <span>{this.state.number}</span> 次查询次数</span> */}
                        </div>
                        <div className="cash_bg"></div>
                    </div>
                    <div className="user_question" style={{width:'calc(37% - 72px)'}}>
                        <div className="account_option_title">常见问题</div>
                        <div className="user_question_content">
                            <div className="oQuestion">
                                <div>账户如何充值？</div>
                                <p>充值金额100元起，冲得多送得多</p>
                            </div>
                            <div className="oQuestion">
                                <div>账户余额如何消费？</div>
                                <p>可用于平台所有查询项目，按项目查询价格单次计费</p>
                            </div>
                            <div className="oQuestion">
                                <div>如何开具发票？</div>
                                <p>欢迎联系在线客服或拨打0571-87328260</p>
                            </div>
                        </div>
                    </div>
                    <div className="account_content" style={{width:'calc(100% - 48px)'}}>
                        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} activeKey = {this.state.checkedStyle}>
                            <TabPane tab="账户充值" key="1">
                                <div className="recharge">
                                    <div className="recharge_option">
                                        <span>充值金额:</span>
                                        {/* <div className="_input">
                                            <input placeholder="请输入充值金额" value={this.state.money ? this.state.money : ''} onChange={this.setMoney.bind(this)} type="text"/>
                                            <span>元</span>
                                        </div> */}
                                        <div className="bill_box">
                                            {/* <div onClick={this.chose_cash.bind(this, 1)} className={this.state.cash_mode == 1? 'active': ''}>
                                                <span className="real_cash">100<label>元</label></span>
                                            </div>
                                            <div onClick={this.chose_cash.bind(this, 2)} className={this.state.cash_mode == 2? 'active': ''}>
                                                <span className="real_cash">2000<label>元</label></span>
                                                <span className="free_cash"><label>送</label>200<label>元</label></span>
                                            </div>
                                            <div onClick={this.chose_cash.bind(this, 3)} className={this.state.cash_mode == 3? 'active': ''}>
                                                <span className="real_cash">5000<label>元</label></span>
                                                <span className="free_cash"><label>送</label>1000<label>元</label></span>
                                            </div>
                                            <div onClick={this.chose_cash.bind(this, 4)} className={this.state.cash_mode == 4? 'active': ''}>
                                                <span className="real_cash">10000<label>元</label></span>
                                                <span className="free_cash"><label>送</label>2500<label>元</label></span>
                                            </div>
                                            <div onClick={this.chose_cash.bind(this, 5)} className={this.state.cash_mode == 5? 'active': ''}>
                                                <span className="real_cash">30000<label>元</label></span>
                                                <span className="free_cash"><label>送</label>10000<label>元</label></span>
                                            </div>
                                            <div onClick={this.chose_cash.bind(this, 6)} className={this.state.cash_mode == 6? 'active': ''}>
                                                <span className="real_cash">50000<label>元</label></span>
                                                <span className="free_cash"><label>送</label>20000<label>元</label></span>
                                            </div> */}
                                            {this.state.cash_list.map((item,index) => {
                                                return(
                                                <div key={index} onClick={this.chose_cash.bind(this, item.id)} className={this.state.cash_mode == item.id? 'active': ''}>
                                                    <span className="real_cash">{item.rechargeMoney}<label>元</label></span>
                                                    {item.giftMoney?
                                                        <span className="free_cash"><label>送</label>{item.giftMoney}<label>元</label></span>
                                                        :
                                                        ''
                                                    }
                                                </div>)
                                            })}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="recharge_option">
                                        <span>充值方式:</span>
                                        <div className="img_box"></div>
                                    </div>
                                    <br/>
                                    <div className="recharge_option">
                                        <span> </span>
                                        <div className="btn_box">
                                            <Button style={{width:"90px",height:"32px"}} type="primary" onClick={this.go_recharge.bind(this)} >立即充值</Button>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="充值记录" key="2">
                                <div className="rechargeRecord">
                                    {/*查询选项*/}
                                    <Form onSubmit={this.handleSubmit1.bind(this)}>
                                        <FormItem label="充值时间：">
                                            <Col span="8" style={{display:'inline-block'}}>
                                                <DatePicker disabledDate={this.disabledStartData1}
                                                            placeholder="开始日期"
                                                            onChange={this.onStartChange1.bind(this)}
                                                />
                                            </Col>
                                            <Col span="1" style={{display:'inline-block'}}>
                                                <p className="ant-form-split">-</p>
                                            </Col>
                                            <Col span="8" style={{display:'inline-block'}}>
                                                <DatePicker disabledDate={this.disabledEndData1}
                                                            placeholder="截止日期"
                                                            onChange={this.onEndChange1.bind(this)}
                                                />
                                            </Col>
                                            <Col span="4" style={{display:'inline-block', float:'right'}}>
                                                <Button type="primary" htmlType="submit" >查询</Button>
                                            </Col>
                                        </FormItem>
                                    </Form>
                                    <div style={{padding:'0 20px', background: '#fff'}}>
                                        <div className="ant-form-split">
                                            <Table 
                                                rowKey={(record) => record.id}
                                                columns={this.state.columns1} 
                                                dataSource={this.state.rechargeRecordData} 
                                                pagination={{simple:false, current:this.state.rechargeRecordPageNumber, pageSize:this.state.rechargeRecordPageSize, total:this.state.rechargeRecordTotalPage, onChange:this.changPage1}} />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="账单管理" key="3">
                                <div className="billManage">
                                    {/*查询选项*/}
                                    {datePicker}
                                    <Radio.Group value={this.state.dayOrMonthState} onChange={this.onChangeMode.bind(this, 'bill')} style={{ marginBottom: 16, marginRight: 16, float: 'right'}}>
                                        <Radio.Button value="day">日账单</Radio.Button>
                                        <Radio.Button value="month">月账单</Radio.Button>
                                    </Radio.Group>
                                    <div style={{ margin: 24,padding:'0 20px', background: '#fff', clear: 'both'}}>
                                        <div className="ant-form-split">
                                            <Table 
                                                rowKey={(record)=>record.dataDate}
                                                columns={this.state.columns2} 
                                                dataSource={this.state.billData}
                                                pagination={{simple:false, current:this.state.billPageNumber, pageSize:this.state.billPageSize, total:this.state.totalPage, onChange:this.changPage2}} />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    {params.total_amount?
                        <div className="responseBox" style={{height:'calc(100% - 50px)',width: 'calc(100% - 48px)'}}>
                            <Result
                                type="success"
                                title="充值成功"
                                description={<div>充值金额 <span style={{color:'#1890ff'}}>{params.total_amount}</span> 元</div>}
                                actions = {actions}
                                style={{marginTop:"20%"}}
                            ></Result>
                        </div>
                        :
                        ''
                    }
                    
                    {/* <div className="responseBox" style={{height:'calc(100% - 94px)',width: 'calc(100% - 48px)'}}>
                        <Result
                            type="error"
                            title="充值失败"
                            actions = {actions2}
                            style={{marginTop:"20%"}}
                        ></Result>
                    </div> */}
                </div>
                {this.state.noExamineShow?<NoExamine close_noExamine={this.close_noExamine.bind(this)} accountStatus={this.state.accountStatus}></NoExamine>:''}
            </div>
        )
    }
}
const roleManageList = Form.create()(RoleManageList);
export default roleManageList;