import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./usedCar";
import ajax from "../../utils/ajax";
import VehicleReports from '../../components/reportCom/vehicleReports'
import noData from "../../images/noData.png"

class VehicleViolationList extends React.Component {
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
        datalist: [],

        provinceData: [],
        cityData: [],
        selectDefault: null,
        myProvince: null,
        myCity: null,
    };
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
    };

    componentWillMount= (e) =>{
        this.getList();
        ajax.post("/admin/youfenCityCode/listProvince",null)
            .then(response =>{
                if(response.code == "0"){
                    var list =response.data;
                    this.setState({
                        provinceData:list
                    });
                }else{
                    message.error(response.msg);
                }
            });
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
        var _this = this;
        ajax.post("/admin/vehicleViolationLog/info",{"code": i})
            .then(response =>{
            if(response.code == "0"){
                _this.setState({
                    data: response.data.record,
                    previewVisible: true
                });
            }else{
                message.error(response.msg);
            }
        });
    }
    getList () {
        this.setState({
            loadingData: true,
            isEmpty: false,
        })
        ajax.post("/admin/vehicleViolationLog/list",{vin: this.state.vin, engineNo: this.state.engineNo ,cityCode: this.state.myCity, licensePlateNo: this.state.licensePlateNo, licensePlateType: this.state.licensePlateType, addTimeBegin: this.state.startApplyDate1up, addTimeEnd: this.state.endApplyDate1up, page: this.state.page1})
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
            {name: '车辆品牌名称', value: data.vehicleBrand},
            {name: '车辆型号', value: data.vehicleModel},
            {name: '车架号', value: data.vin},
            {name: '发动机号', value: data.engineNo},
            {name: '车辆类型', value: data.vehicleType},
            {name: '车身颜色', value: data.vehicleColor},
            {name: '车辆使用性质', value: data.useCharacter},
            {name: '车辆所有者', value: data.owner},
            {name: '初次登记日期', value: data.initialRegDate},
            {name: '检验有效期', value: data.inspectionValidityDate},
            {name: '强制报废期', value: data.compulsoryRetirementDate},
            {name: '机动车状态', value: data.vehicleState},
            {name: '发动机型号', value: data.engineType},
            {name: '燃料种类', value: data.fuelType},
            {name: '排量（ 按照 ml 为单位的）', value: data.emissions},
            {name: '核定载客人数', value: data.approveCarryPersonNo},
            {name: '出厂日期', value: data.productionDate},
        ]
    }
    handleChangeProvince(field,value) {
        this.setState({
            myCity:null,
	        [field]: value
        }, () => {
            if(this.state.myProvince == null) {
                this.setState({
                    cityData:[],
                });
                return
            }
            ajax.post("/admin/youfenCityCode/listCity",{"provinceName":value})
                .then(response =>{
                    if(response.code == "0"){
                    var list =response.data;
                    this.setState({
                        cityData:list,
                        myCity:null
                    });
                }else{
                    message.error(response.msg);
                }
            });
        })
    }

    handleChangeCity(field,value) {
        this.setState({ 
	    [field]: value
        });
    }


    render() {
        const data = this.state.data
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
            title: '车架号',
            dataIndex: 'vin',
            key: 'vin',
        }, {
            title: '发动机号',
            dataIndex: 'engineNo',
            key: 'engineNo',
        }, {
            title: '城市编码',
            dataIndex: 'cityCode',
            key: 'cityCode',
        },{
            title: '车牌号',
            dataIndex: 'licensePlateNo',
            key: 'licensePlateNo',
        },{
            title: '号牌类型',
            dataIndex: 'licensePlateType',
            key: 'licensePlateType',
            render: (text, record) =><span>{licensePlateTypesJson[record.licensePlateType]}</span>
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
            render: (text, record) =><a onClick={this.myshowReport.bind(this,record.code)} disabled={record.isValid}>{record.isValid? '-' : '查看'}</a>
        }];
        const dataCont1 = this.state.dataCont1;
        const licensePlateTypes = [
            <Option key="00 " value="">所有类型</Option>,
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
        const provinceData =this.state.provinceData;
        const cityData =this.state.cityData;
        const provinceOptions = [];
        var tmpVar;

        provinceOptions.push(<Option key={this.state.selectDefault} value={this.state.selectDefault}>请选择</Option>);

        for (let i = 0; i < provinceData.length; i++) {  
            tmpVar=""+provinceData[i];
            provinceOptions.push(<Option key={tmpVar} value={tmpVar}>{provinceData[i]}</Option>);  
        }


        const cityOptions = [];
        cityOptions.push(<Option key={this.state.selectDefault} value={this.state.selectDefault}>请选择</Option>);
        for (let i = 0; i < cityData.length; i++) {
	        tmpVar=""+cityData[i].cityCode;
            cityOptions.push(<Option key={tmpVar} value={tmpVar}>{cityData[i].cityName}</Option>);
        }
        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>车辆违章查询记录</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    <Form>
                        <FormItem label="车架号">
                            <Input placeholder="请输入车架号"  onChange={this.onChange.bind(this, 'vin')}/>
                        </FormItem>
                        <FormItem label="发动机号">
                            <Input placeholder="请输入发动机号"  onChange={this.onChange.bind(this, 'engineNo')}/>
                        </FormItem>
                        <FormItem label="城市编码" >
                            <Col span="11" style={{display:'inline-block'}}>
                                <Select value={this.state.myProvince} onChange={this.handleChangeProvince.bind(this,'myProvince')}>
                                    {provinceOptions}
                                </Select>
                            </Col>
                            <Col span="1" style={{display:'inline-block'}}>
                                <p className="ant-form-split">-</p>
                            </Col>
                            <Col span="11" style={{display:'inline-block'}}>
                                <Select value={this.state.myCity} onChange={this.handleChangeCity.bind(this,'myCity')}>
                                    {cityOptions}
                                </Select>
                            </Col>
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
                </div>
                {this.state.previewVisible? 
                <VehicleReports
                    datalist = {this.state.data} 
                    closeMoadl = {this.closedata.bind(this)}
                >
                </VehicleReports>:''}
            </div>
        )
    }
}
const vehicleViolationList = Form.create()(VehicleViolationList);
export default vehicleViolationList;