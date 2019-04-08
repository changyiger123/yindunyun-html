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

        pagination1: {},
        pagination2: {},
        pagination3: {},
        selectedRowKeys1: [],
        selectedRowKeys2: [],
        selectedRowKeys3: [],

        storeLists:[],

        roleId:'',//员工角色
        key:"1",
        title:"业务员排名",

        storeName1:"",//门店名
        storeCode1:"",
        orderCondition1:"apply",//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        startTime1:"",//起始时间
        endTime1:"",//结束时间
        pageNumber1:1,//请求页
        pageSize1:10,//每页请求记录数
        data1: [],

        storeName2:"",//门店名
        storeCode2:"",
        orderCondition2:"passed",//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        startTime2:"",//起始时间
        endTime2:"",//结束时间
        pageNumber2:1,//请求页
        pageSize2:10,//每页请求记录数
        data2: [],

        storeName3:"",//门店名
        storeCode3: "",
        orderCondition3:"mortgage",//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        startTime3:"",//起始时间
        endTime3:"",//结束时间
        pageNumber3:1,//请求页
        pageSize3:10,//每页请求记录数
        data3: [],

        total1:undefined,
        total2:undefined,
        total3:undefined

    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
        this.disabledStartDate2 = this.disabledStartDate2.bind(this);
        this.disabledEndDate2 = this.disabledEndDate2.bind(this);
        this.disabledEndDate3 = this.disabledEndDate3.bind(this);
    };
    componentWillMount = () => {
        var realId = ''
        if(this.props.params.id == '92') {
            realId = '2'
            this.setState({
                roleId:realId
            })
        }else if (this.props.params.id == '91') {
            realId = '1'
            this.setState({
                roleId:realId
            })
        } else {
            this.setState({
                roleId:this.props.params.id
            })
        }
    }
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
        // if()
        var roleId =this.state.roleId;
        if(roleId=="2"){
            this.setState({
                title:"业务员排名"
            },()=> {
            })
        }else if(roleId=="1"){
            this.setState({
                title:"门店内勤"
            },()=> {
            })
        }
        var data = "";
        if(key == "1"){
            data={
                roleId:this.state.roleId,
                storeCode:this.state.storeCode1,//门店编码
                orderCondition:this.state.orderCondition1,//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                startTime:this.state.startTime1up,//起始时间
                endTime:this.state.endTime1up,//结束时间
                pageNumber:this.state.pageNumber1,//请求页
                pageSize:this.state.pageSize1,//每页请求记录数
            };
        }else if(key=="2"){
            data={
                roleId:this.state.roleId,
                storeCode:this.state.storeCode2,//门店编码
                orderCondition:this.state.orderCondition2,//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                startTime:this.state.startTime2up,//起始时间
                endTime:this.state.endTime2up,//结束时间
                pageNumber:this.state.pageNumber2,//请求页
                pageSize:this.state.pageSize2,//每页请求记录数
            };
        }else if(key=="3"){
            data={
                roleId:this.state.roleId,
                storeCode:this.state.storeCode3,//门店编码
                orderCondition:this.state.orderCondition3,//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
                startTime:this.state.startTime3up,//起始时间
                endTime:this.state.endTime3up,//结束时间
                pageNumber:this.state.pageNumber3,//请求页
                pageSize:this.state.pageSize3,//每页请求记录数
            };
        }
        if(this.props.params.id == '92' || this.props.params.id == '91') {
            data.storeCode = localStorage.getItem('storeCode')
        }
        ajax.post("/admin/statistics/adminRank",data)
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
        console.log(this.state.startTime1.toDate().getTime())
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
            startTime1: value,
            startTime1up: dateString,
        }, ()=> {
            console.log(this.state.startTime1.toDate().getTime())
        });
    };
    onChangeEndDate1=(value, dateString) =>{
        this.setState({
            endTime1: value,
            endTime1up: dateString,
        }, ()=> {
            console.log(this.state.endTime1.toDate().getTime())
        });
    };
    onChangeStartDate2=(value, dateString) =>{
        this.setState({
            startTime2: value,
            startTime2up: dateString,
        }, ()=> {
            console.log(this.state.startTime2)
        });
    };
    onChangeEndDate2=(value, dateString) =>{
        this.setState({
            endTime2: value,
            endTime2up: dateString,
        }, ()=> {
            console.log(this.state.endTime2)
        });
    };
    onChangeStartDate3=(value, dateString) =>{
        this.setState({
            startTime3: value,
            startTime3up: dateString,
        }, ()=> {
            console.log(this.state.startTime3)
        });
    };
    onChangeEndDate3=(value, dateString) =>{
        this.setState({
            endTime3: value,
            endTime3up: dateString,
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
        const type=this.state.type;
        const flag=this.state.flag;

        const columns1 = [{
            title: '排名',
            dataIndex: 'index',
            key: 'index',
        },{
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
            title: "申请单数",
            dataIndex: 'applyCount',
            key: 'applyCount',
        }];
        const columns2 = [{
            title: '排名',
            dataIndex: 'index',
            key: 'index',
        },{
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
            title: "通过率",
            dataIndex: 'applyCount',
            key: 'applyCount',
        }];
        const columns3 = [{
            title: '排名',
            dataIndex: 'index',
            key: 'index',
        },{
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
            title: "抵押率",
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
            dataCont2[i].applyCount = (dataCont2[i].applyCount - 0) * 100 + '%'
        }
        for(let i = 0; i < dataCont3.length; i++){
            dataCont3[i].index=i+1
            dataCont3[i].applyCount = (dataCont3[i].applyCount - 0) * 100 + '%'
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
                    <Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="申请单数" key="1">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit1}>
                                <FormItem label="门店：">
                                    <Select placeholder="请选择门店"  onChange={this.onChangeSelect.bind(this, 'storeCode1')} disabled = {this.props.params.id == "92" || this.props.params.id == "91" }>
                                        {storeOption}
                                    </Select>
                                </FormItem>
                                <FormItem label="申请时间：" >
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
                                    <Button type="primary" htmlType="submit" style={{marginLeft: '32px' }}>查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.index} columns={columns1} dataSource={dataCont1} pagination={{
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
                                <Table rowKey={(record) => record.index} columns={columns2} dataSource={dataCont2} pagination={{
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
                                                    onChange={this.onChangeStartDate3}
                                        />
                                    </Col>
                                    <Col span="1" style={{display:'inline-block'}}>
                                        <p className="ant-form-split">-</p>
                                    </Col>
                                    <Col span="11" style={{display:'inline-block'}}>
                                        <DatePicker  disabledDate={this.disabledEndDate3}
                                                     placeholder="截止日期"
                                                     onChange={this.onChangeEndDate3}
                                        />
                                    </Col>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" style={{marginLeft: '32px' }}>查询</Button>
                                </FormItem>
                            </Form>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.index} columns={columns3} dataSource={dataCont3} pagination={{
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