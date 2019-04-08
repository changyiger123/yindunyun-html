import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./dataStatistics.less";
import ajax from "../../utils/ajax";

class applicationForm extends React.Component {
    state = {
        isEditing: false,
        startValue1: null,
        endValue1: null,
        startValue2: null,
        endValue2: null,
        startValue3: null,
        endValue3: null,
        storeLists:[],
        key:"1",

        total1:undefined,
        total2:undefined,
        total3:undefined,

        orderCondition1:"apply",// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        orderBy1:"",//请求条件（desc：降序；asc：升序）
        startTime1:"", //查询起始时间
        endTime1:"", //查询结束时间
        pageNumber1:"1",//请求页
        pageSize1:"10",//每页请求记录数
        data1:[],

        orderCondition2:"passed",// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        orderBy2:"",//请求条件（desc：降序；asc：升序）
        startTime2:"", //查询起始时间
        endTime2:"", //查询结束时间
        pageNumber2:"1",//请求页
        pageSize2:"10",//每页请求记录数
        data2:[],

        orderCondition3:"mortgage",// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        orderBy3:"desc",//请求条件（desc：降序；asc：升序）
        startTime3:"", //查询起始时间
        endTime3:"", //查询结束时间
        pageNumber3:"",//请求页
        pageSize3:"10",//每页请求记录数
        data3:[],

    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
        this.disabledStartDate2 = this.disabledStartDate2.bind(this);
        this.disabledEndDate2 = this.disabledEndDate2.bind(this);

    };
    componentDidMount= (e) =>{
        this._isMounted = true;
        var key = this.state.key;
        this.getData(key);
        this.getStoreList(key);
    };
    componentWillUnMount() {
        this._isMounted = false
    }

    //门店列表
    getStoreList(){
        ajax.post("/admin/store/getList","")
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data;
                    this.setState({
                        storeLists:datalist
                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })

    };
    //Tab切换key
    callback(key) {
        this.setState({
            key:key
        },()=>{
            this.getData(key);
        });

    }
    //请求数据
    getData(key){
        let {orderCondition1,orderBy1,startTime1,endTime1,pageNumber1,pageSize1,storeCode1,orderCondition2,orderBy2,startTime2,endTime2,pageNumber2,pageSize2,storeCode2,orderCondition3,orderBy3,startTime3,endTime3,pageNumber3,pageSize3,storeCode3} = this.state;
        var data={};
        if(key== "1"){
            data ={
                "orderCondition":orderCondition1,// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                "orderBy":orderBy1,
                "startTime":startTime1, //查询起始时间
                "storeCode":storeCode1,
                "endTime":endTime1, //查询结束时间
                "pageNumber":pageNumber1,//请求页
                "pageSize":pageSize1,//每页请求记录数
            };
        }else if(key=="2"){
            data ={
                "orderCondition":orderCondition2,// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                "orderBy":orderBy2,
                "startTime":startTime2, //查询起始时间
                "storeCode": storeCode2,
                "endTime":endTime2, //查询结束时间
                "pageNumber":pageNumber2,//请求页
                "pageSize":pageSize2,//每页请求记录数
            };
        }else{
            data ={
                "orderCondition":orderCondition3,// 排行条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                "orderBy":orderBy3,
                "startTime":startTime3, //查询起始时间
                "storeCode": storeCode3,
                "endTime":endTime3, //查询结束时间
                "pageNumber":pageNumber3,//请求页
                "pageSize":pageSize3,//每页请求记录数
            };
        }
        ajax.post("/admin/statistics/storeRank",data)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data,
                        total=response.totalCount;
                    if(key == "1"){
                        this.setState({
                            data1:datalist,
                            total1:total
                        });
                    }else if(key=="2"){
                        this.setState({
                            data2:datalist,
                            total2:total
                        });
                    }else if(key=="3"){
                        this.setState({
                            data3:datalist,
                            total3:total
                        });
                    }
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })
    }

    disabledStartDate1(startValue){
        if (!startValue || !this.state.endTime1) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endTime1.toDate().getTime();
    };
    disabledStartDate2(startValue){
        if (!startValue || !this.state.endTime2) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endTime2.toDate().getTime();
    };
    disabledStartDate3(startValue){
        if (!startValue || !this.state.endTime3) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endTime3.toDate().getTime();
    };
    disabledEndDate1(endValue){
        if (!endValue || !this.state.startTime1) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startTime1.toDate().getTime();
    };
    disabledEndDate2(endValue){
        if (!endValue || !this.state.startTime2) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startTime2.toDate().getTime();
    };
    disabledEndDate3(endValue){
        if (!endValue || !this.state.startTime3) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startTime3.toDate().getTime();
    };

    //select选择option更改state
    onChangeSelect(field, value) {
        var str = field;
        var i = str.charAt(str.length-1);
        this.setState({
            [field]: value,
        }, ()=> {
            this.getData(i);
        });
    };

    onChangeStartDate1=(value, dateString) =>{
        this.setState({
            startTime1: dateString,
        }, ()=> {
            console.log(this.state.startTime1)
        });
    };
    onChangeEndDate1=(value, dateString) =>{
        this.setState({
            endTime1: dateString,
        }, ()=> {
            console.log(this.state.endTime1)
        });
    };
    onChangeStartDate2=(value, dateString) =>{
        this.setState({
            startTime2: dateString,
        }, ()=> {
            console.log(this.state.startTime2)
        });
    };
    onChangeEndDate2=(value, dateString) =>{
        this.setState({
            endTime2: dateString,
        }, ()=> {
            console.log(this.state.endTime2)
        });
    };
    onChangeStartDate3=(value, dateString) =>{
        this.setState({
            startTime3: dateString,
        }, ()=> {
            console.log(this.state.startTime3)
        });
    };
    onChangeEndDate3=(value, dateString) =>{
        this.setState({
            endTime3: dateString,
        }, ()=> {
            console.log(this.state.endTime3)
        });
    };

    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var key=this.state.key;
                this.setState({
                    pageNumber1:1
                }, ()=> {
                    this.getData(key);
                });
            } else {
                message.error("输入信息有误！");
            }
        });
    };
    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var key=this.state.key;
                this.setState({
                    pageNumber2:1
                }, ()=> {
                    this.getData(key);
                });
            } else {
                message.error("输入信息有误！");
            }
        });
    };
    handleSubmit3 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var key=this.state.key;
                this.setState({
                    pageNumber3:1
                }, ()=> {
                    this.getData(key);
                });
            } else {
                message.error("输入信息有误！");
            }
        });
    };

    changePage1=(page)=>{
        const currentPage=page;
        this.setState({
            pageNumber1:currentPage,
        },()=>{
            this.getData(1);
        });
    };
    changePage2=(page)=>{
        const currentPage=page;
        this.setState({
            pageNumber2:currentPage,
        },()=>{
            this.getData(2);
        });
    };
    changePage3=(page)=>{
        const currentPage=page;
        this.setState({
            pageNumber3:currentPage,
        },()=>{
            this.getData(3);
        });
    };

    render() {
        let self = this;
        const { getFieldDecorator } = this.props.form;
        const flag=this.state.flag;

        const columns = [{
            title: '排名',
            dataIndex: 'index',
            key: 'index',
        }, {
            title: '门店',
            dataIndex: 'storeName',
            key: 'storeName',
        }, {
            title: '员工数量',
            dataIndex: 'adminCount',
            key: 'adminCount',
        }, {
            title: '申请单数',
            dataIndex: 'applyCount',
            key: 'applyCount',
        }];
        const dataCont1 =this.state.data1,
            dataCont2 =this.state.data2,
            dataCont3 =this.state.data3;
        for(let i = 0; i < dataCont1.length; i++){
            dataCont1[i].index=i+1
        }
        for(let i = 0; i < dataCont2.length; i++){
            dataCont2[i].index=i+1
        }
        for(let i = 0; i < dataCont3.length; i++){
            dataCont3[i].index=i+1
        }

        //门店选项
        let storeLists = this.state.storeLists,
            storeOption = [<Option key={''} value={''} >所有门店</Option>];
        for (let i = 0; i < storeLists.length; i++) {
            storeOption.push(<Option key={storeLists[i].code} value={storeLists[i].code} >{storeLists[i].name}</Option>);
        }

        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>门店排名</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="申请单数" key="1">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit1}>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店"  onChange={this.onChangeSelect.bind(this, 'storeCode1')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="申请时间：" >
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker disabledDate={this.disabledStartDate1}
                                                    placeholder="开始日期"
                                                    onChange={this.onChangeStartDate1.bind(this,"1")}
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
                                    <Button type="primary" htmlType="submit" style={{marginLeft: '32px' }}>查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.index} columns={columns} dataSource={dataCont1} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber1,
                                    total:this.state.total1,
                                    onChange:this.changePage1,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="通过率" key="2">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit2}>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店"  onChange={this.onChangeSelect.bind(this, 'storeCode2')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="申请时间：" >
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker disabledDate={this.disabledStartDate2}
                                                    placeholder="开始日期"
                                                    onChange={this.onChangeStartDate2}
                                        />
                                    </Col>
                                    <Col span="1" style={{display:'inline-block'}}>
                                        <p className="ant-form-split">-</p>
                                    </Col>
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker  disabledDate={this.disabledEndDate2}
                                                     placeholder="截止日期"
                                                     onChange={this.onChangeEndDate2}
                                        />
                                    </Col>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" style={{marginLeft: '32px' }}>查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.index} columns={columns} dataSource={dataCont2} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber2,
                                    total:this.state.total2,
                                    onChange:this.changePage2,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="抵押率" key="3">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit2}>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店"  onChange={this.onChangeSelect.bind(this, 'storeCode3')}>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="申请时间：" >
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker disabledDate={this.disabledStartDate2}
                                                    placeholder="开始日期"
                                                    onChange={this.onChangeStartDate2}
                                        />
                                    </Col>
                                    <Col span="1" style={{display:'inline-block'}}>
                                        <p className="ant-form-split">-</p>
                                    </Col>
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker  disabledDate={this.disabledEndDate3}
                                                     placeholder="截止日期"
                                                     onChange={this.onChangeEndDate2}
                                        />
                                    </Col>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" style={{marginLeft: '32px' }}>查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.index} columns={columns} dataSource={dataCont3} pagination={{
                                    simple:false,
                                    current:this.state.pageNumber3,
                                    total:this.state.total3,
                                    onChange:this.changePage3,
                                }} />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
const application = Form.create()(applicationForm);
export default application;