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
        pagination1: {},
        selectedRowKeys1: [],
        storeLists:[],
        title:"审核员审核单数",
        roleId:this.props.params.id,//员工角色
        storeName1:"",//门店名
        storeCode1: "",
        orderCondition1:"apply",//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
        startTime1:"",//起始时间
        endTime1:"",//结束时间
        pageNumber1:1,//请求页
        pageSize1:10,//每页请求记录数
        data1: [],
        total1:undefined,
    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
    };

    componentWillMount = () => {
        var realId = ''
        if(this.props.params.id == '97') {
            realId = '7'
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
                    var datalist=response.data
                    this.setState({
                        storeLists:datalist
                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            })
    };

    //请求数据
    getData(){
        //标题显示
        var roleId =this.state.roleId;
        if(roleId=="3"){
            this.setState({
                title:"审核员审核单数"
            },()=> {
            })
        }else if(roleId=="4"){
            this.setState({
                title:"复评师审核单数"
            },()=> {
            })
        }else if(roleId=="5"){
            this.setState({
                title:"终审员审核单数"
            },()=> {
            })
        }else if(roleId=="6"){
            this.setState({
                title:"财务审批单数"
            },()=> {
            })
        }else if(roleId=="7"){
            this.setState({
                title:"寄件单数"
            },()=> {
            })
        }else if(roleId=="8"){
            this.setState({
                title:"GPS登记单数"
            },()=> {
            })
        }else if(roleId=="9"){
            this.setState({
                title:"抵押登记单数"
            },()=> {
            })
        }else if(roleId=="10"){
            this.setState({
                title:"逾期登记单数"
            },()=> {
            })
        }

        var data={
            roleId:this.state.roleId,
            storeCode:this.state.storeCode1,//门店编码
            orderCondition:this.state.orderCondition1,//请求条件（apply：申请单；passed：通过率；mortgage：抵押率；）
            startTime:this.state.startTime1up,//起始时间
            endTime:this.state.endTime1up,//结束时间
            pageNumber:this.state.pageNumber1,//请求页
            pageSize:this.state.pageSize1,//每页请求记录数
        };
        if (this.props.params.id == '97') {
            data.storeCode = localStorage.getItem('storeCode')
        }
        ajax.post("/admin/statistics/adminRank",data)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.data,
                        total1=response.totalCount;
                    console.log(datalist);
                    this.setState({
                        data1:datalist,
                        total1:total1
                    });
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
    
    disabledEndDate1(endValue){
        if (!endValue || !this.state.startTime1) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startTime1.toDate().getTime();
    };

    //select选择option更改state
    onChangeSelect(field, value) {
        this.setState({
            [field]: value,
        }, ()=> {
            this.getData();
        });
    };

    onChangeStartDate1=(value, dateString) =>{
        console.log(value);
        this.setState({
            startTime1: value,
            startTime1up: dateString,
        }, ()=> {
            console.log(this.state.startTime1)
        });
    };
    onChangeEndDate1=(value, dateString) =>{
        this.setState({
            endTime1: value,
            endTime1up: dateString,
        }, ()=> {
            console.log(this.state.endTime1)
        });
    };
    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    pageNumber1:1
                }, ()=> {
                    this.getData();
                });
            } else {
                message.error("输入信息有误！");
            }
        });
    };

    changePage1=(page)=>{
        const currentPage=page;
        this.setState({
            page1:currentPage,
        },()=>{
            this.getData();
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
        },{
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
        }, {
            title: '门店',
            dataIndex: 'storeName',
            key: 'storeName',
        },{
            title: '工号',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '单数',
            dataIndex: 'applyCount',
            key: 'applyCount',
        }];


        const dataCont1 =this.state.data1;
        for(let i = 0; i < dataCont1.length; i++){
            dataCont1[i].index=i+1
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
                <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    <Form onSubmit={this.handleSubmit1}>
                        <FormItem label="门店：">
                            <Select placeholder="请选择门店"  onChange={this.onChangeSelect.bind(this, 'storeCode1')} disabled = {this.props.params.id == "97"}>
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
                        <Table rowKey={(record) => record.index} columns={columns} dataSource={dataCont1} pagination={{
                            simple:false,
                            current:this.state.pageNumber1,
                            total:this.state.total1,
                            onChange:this.changePage1,
                        }}/>
                    </div>
                </div>
            </div>
        )
    }
}
const application = Form.create()(applicationForm);
export default application;