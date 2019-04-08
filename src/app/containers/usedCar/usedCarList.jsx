import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./usedCar";
import ajax from "../../utils/ajax";
import UsedCarReports from '../../components/reportCom/usedCarReports'
import noData from "../../images/noData.png"

class UsedCarList extends React.Component {
    state = {
        startValue1: null,
        endValue1: null,
        data1: [],
        pagination1: {},
        loading: false,
        loadingData: true,
        isEmpty: false,

        key:"1",
        page1:1,
        pageSize1: 10,
        total1:undefined,
        startApplyDate1: undefined,
        endApplyDate1:undefined,

        dataCont1: [],
        previewVisible: false,
        datalist: []
    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
    };

    componentWillMount= (e) =>{
        this.getList();
    };
    disabledStartDate1(startValue){
        if (!startValue || !this.state.endApplyDate1) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endApplyDate1.toDate().getTime();
    };
    disabledEndDate1(endValue){
        if (!endValue || !this.state.startApplyDate1) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startApplyDate1.toDate().getTime();
    };

    changePage = (page) => {
        const currentPage=page;
        this.setState({
            page1:currentPage,
        },()=>{
            this.getList();
        });
    }

    //普通字段输入更改state
    onChange(field, e){
        let valStr = e.target.value;
        console.log(field, 'change', valStr);
        this.setState({
            [field]: valStr,
        });
    };
    //select选择option更改state
    onChangeSelect(field, value) {
        this.setState({
            [field]: value,
        });
        console.log(field, 'change', value);
    };
    onChangeStartDate1=(value, dateString) =>{
        this.setState({
            startApplyDate1: value,
            startApplyDate1up: dateString,
        }, ()=> {
            console.log(this.state.startApplyDate1)
        });
    };
    onChangeEndDate1=(value, dateString) =>{
        this.setState({
            endApplyDate1: value,
            endApplyDate1up: dateString,
        }, ()=> {
            console.log(this.state.endApplyDate1)
        });
    };
    search_record () {
        var _this = this
        this.setState({
            page1: 1
        },() => {
            this.getList();
        })
    }
    closedata () {
        this.setState({ previewVisible: false })
    }

    myshowReport (i,e) {
        var _this = this
        ajax.post("/admin/secondHandCarLog/info/v2",{code: i})
        .then(response => {
            if(response.code == "0") {
                _this.setState({
                    previewVisible: true,
                    datalist: _this.getArr(response.data)
                })
            }else {
                message.error(response.msg);
            }
        });
    }
    getList () {
        this.setState({
            loadingData: true,
            isEmpty: false,
        })
        ajax.post("/admin/secondHandCarLog/list",{realName: this.state.realName, plateNumber: this.state.licensePlateNo ,plateType: this.state.licensePlateType, addTimeBegin: this.state.startApplyDate1up, addTimeEnd: this.state.endApplyDate1up, page: this.state.page1})
        .then(response => {
            if(response.code == "0") {
                if (response.data.list.length == 0) {
                    this.setState({
                        isEmpty: true,
                    })
                }else {
                    this.setState({
                        isEmpty: false,
                    })
                }
                this.setState({
                    dataCont1: response.data.list,
                    total1: response.data.totalCount
                })
            }else {
                message.error(response.msg);
            }
            this.setState({
                loadingData: false
            })
        });
    }
    getArr (data) {
        return [
            {name: '车辆品牌名称', value: data.brand},
            {name: '车身颜色', value: data.color},
            {name: '使用性质', value: data.properties},
            {name: '车牌型号', value: data.type},
            {name: '车辆类型', value: data.vehicleType},
            {name: '发动机号', value: data.engine},
            {name: '发动机型号', value: data.engineType},
            {name: '初次登记日期', value: data.record},
            {name: '机动车所有人', value: data.man},
            {name: '车辆状态', value: data.state},
            {name: '核定载客数', value: data.passengers},
            {name: '强制报废期止', value: data.retirement},
            {name: '燃料种类', value: data.fuel},
            {name: '排量', value: data.cc},
            {name: '出厂日期', value: data.pps},
            {name: '最大功率（KW）', value: data.MaxJourney},
            {name: '轴数', value: data.shaft},
            {name: '轴距', value: data.wheelBase},
            {name: '前轮距', value: data.frontTread},
            {name: '后轮距', value: data.rearTread},
            {name: '总质量', value: data.crossWeight},
            {name: '整备质量', value: data.curbWeight},
            {name: '核定载质量', value: data.loadWeight},
            {name: '车架号', value: data.vin},
            {name: '车牌号', value: data.plate},
            {name: '车辆类型', value: data.variety},
            {name: '年检日期', value: data.jianCheTime}
        ]
    }


    render() {
        const licensePlateTypesJson = {
            "01": "大型汽车",
            "02": "小型汽车",
            "03": "使馆汽车",
            "04": "领馆汽车",
            "05": "境外汽车",
            "06": "外籍汽车",
            "07": "普通摩托车",
            "08": "轻便摩托车",
            "09": "使馆摩托车",
            "10": "领馆摩托车",
            "11": "境外摩托车",
            "12": "外籍摩托车",
            "13": "低速车",
            "14": "拖拉机",
            "15": "挂车",
            "16": "教练汽车",
            "17": "教练摩托车",
            "20": "临时入境汽车",
            "21": "临时入境摩托车",
            "22": "临时行驶车",
            "23": "警用汽车",
            "24": "警用摩托",
            "51": "大型新能源汽车",
            "52": "小型新能源汽车"
        }
        const columns1 = [{
            title: '编号',
            dataIndex: 'code',
            key: 'code',

        }, {
            title: '车辆所有人',
            dataIndex: 'realName',
            key: 'realName',
        }, {
            title: '车牌号',
            dataIndex: 'numberPlate',
            key: 'numberPlate',
        }, {
            title: '号牌类型',
            dataIndex: 'plateType',
            key: 'plateType',
            render: (text, record) =><span>{licensePlateTypesJson[record.plateType]}</span>
        },{
            title: '查询时间',
            dataIndex: 'addTime',
            key: 'addTime',
        },{
            title: '操作人',
            dataIndex: 'operatorName',
            key: 'operatorName',
            render: (text,record)=> <span>{record.operatorName?record.operatorName:'管理员'}</span>
        },{
            title: '查询结果',
            dataIndex: 'isValid',
            key: 'isValid',
            render: (text, record) =><span>{record.isValid? '查询失败' : '查询成功'}</span>
        },{
            title: '报告',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) =><a onClick={this.myshowReport.bind(this,record.code)}>{record.isValid? '' : '查看'}</a>
        }];
        const dataCont1 = this.state.dataCont1;
        const licensePlateTypes = [
            <Option key="01 " value="01 ">大型汽车</Option>,
            <Option key="02" value="02">小型汽车</Option>,
            <Option key="03" value="03">使馆汽车</Option>,
            <Option key="04" value="04">领馆汽车</Option>,
            <Option key="05" value="05">境外汽车</Option>,
            <Option key="06" value="06">外籍汽车</Option>,
            <Option key="07" value="07">普通摩托车</Option>,
            <Option key="08" value="08">轻便摩托车</Option>,
            <Option key="09" value="09">使馆摩托车</Option>,
            <Option key="10" value="10">领馆摩托车</Option>,
            <Option key="11" value="11">境外摩托车</Option>,
            <Option key="12" value="12">外籍摩托车</Option>,
            <Option key="13" value="13">低速车</Option>,
            <Option key="14" value="14">拖拉机</Option>,
            <Option key="15" value="15">挂车</Option>,
            <Option key="16" value="16">教练汽车</Option>,
            <Option key="17" value="17">教练摩托车</Option>,
            <Option key="20" value="20">临时入境汽车</Option>,
            <Option key="21" value="21">临时入境摩托车</Option>,
            <Option key="22" value="22">临时行驶车</Option>,
            <Option key="23" value="23">警用汽车</Option>,
            <Option key="24" value="24">警用摩托</Option>,
            <Option key="51" value="51">大型新能源汽车</Option>,
            <Option key="52" value="52">小型新能源汽车</Option>
        ]
        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>二手车档案核查记录</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    <Form>
                        <FormItem label="车辆所有人">
                            <Input placeholder="请输入车辆所有人"  onChange={this.onChange.bind(this, 'realName')}/>
                        </FormItem>
                        <FormItem label="车牌号">
                            <Input placeholder="请输入车牌号"  onChange={this.onChange.bind(this, 'licensePlateNo')}/>
                        </FormItem>
                        <FormItem label="号牌类型">
                            <Select placeholder="请选择号牌类型" onChange={this.onChangeSelect.bind(this, 'licensePlateType')}>
                                {licensePlateTypes}
                            </Select>
                        </FormItem>
                        <FormItem label="查询时间：" >
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
                            <Button type="primary" onClick={this.search_record.bind(this)}>查询</Button>
                        </FormItem>
                    </Form>
                    <div className="ant-form-split common_table">
                        <Table rowKey={(record) => record.code} loading={this.state.loadingData} columns={columns1} dataSource={dataCont1} pagination={{
                            simple:false,
                            current:this.state.page1,
                            total:this.state.total1,
                            onChange:this.changePage,
                        }} />
                        {this.state.isEmpty?
                        <div className="table_noData">
                            <img src={noData} alt='noData'/>
                            <div>暂时没有数据</div>
                        </div>
                        :''
                        }
                    </div>
                    {this.state.previewVisible?
                    <UsedCarReports
                        datalist = {this.state.datalist} 
                        closeMoadl = {this.closedata.bind(this)}
                    >
                    </UsedCarReports>:''}
                </div>
            </div>
        )
    }
}
const usedCarList = Form.create()(UsedCarList);
export default usedCarList;