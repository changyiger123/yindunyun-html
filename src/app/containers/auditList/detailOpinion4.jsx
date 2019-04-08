import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , Modal, Breadcrumb, Button, Icon ,message, Radio , Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
import "./auditList.less";
import ajax from "../../utils/ajax";
import SeePic from './seePic';

class applicationForm extends React.Component {
    state = {
        applyNo:this.props.params.id,
        tongDunLoading: false,
        tongDunLoading2: false,
        youfenLoading: false,
        youfenLoading2: false,
        data:{
            spouse:{
                realname: undefined,
                cardId: undefined,
                mobilePhone: undefined,
                companyName: undefined,
                companyTel: undefined,
                companyAddress: undefined,
                picture: undefined
            },
            firstGuarantee: {
                realname: undefined,
                cardId: undefined,
                mobilePhone: undefined,
                companyName: undefined,
                companyTel: undefined,
                companyAddress: undefined,
                borrowerRelation: undefined,
                telPhone: undefined,
                address: undefined

            },
            secondGuarantee: {
                realname: undefined,
                cardId: undefined,
                mobilePhone: undefined,
                companyName: undefined,
                companyTel: undefined,
                companyAddress: undefined,
                borrowerRelation: undefined,
                telPhone: undefined,
                address: undefined
            },
            commonBorrower: {
                realname: undefined,
                cardId: undefined,
                mobilePhone: undefined,
                companyName: undefined,
                companyTel: undefined,
                companyAddress: undefined,
                borrowerRelation: undefined,
                telPhone: undefined,
                address: undefined
            },
            firstContact: {
                realname: undefined,
                cardId: undefined,
                mobilePhone: undefined,
                companyName: undefined,
                companyTel: undefined,
                companyAddress: undefined,
                borrowerRelation: undefined,
                telPhone: undefined,
                address: undefined
            },
            secondContact: {
                realname: undefined,
                cardId: undefined,
                mobilePhone: undefined,
                companyName: undefined,
                companyTel: undefined,
                companyAddress: undefined,
                borrowerRelation: undefined,
                telPhone: undefined,
                address: undefined
            }
        },
        auditOption:1,
        verifyReport:undefined,
        visible:false,
        confirmLoading: false,
        supplement:"",
        info_count: 3
    };
    constructor(props) {
        super(props);
        this.state.openBoole = false;
        this.state.titIndex = -1;
        // this.handleTableChange = this.handleTableChange.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
    };

    openPop(e){
        let seePicWrapperDom = this.refs.seePicWrapperDom;
        let titIndex = e.target.getAttribute("data-titindex");
        seePicWrapperDom.classList.add("open");
        this.setState({
            openBoole: true,
            titIndex: titIndex
        });
    }

    setPopState(data){
        this.setState({
            openBoole: data
        }, ()=>{
            if(this.state.openBoole == false){
                let seePicWrapperDom = this.refs.seePicWrapperDom;
                seePicWrapperDom.classList.remove("open");
            }
        });
    }

    onChange(field, e){
        let valStr = e.target.value;
        this.setState({
            [field]: valStr,
        }, ()=> {

        });
    };

    //补充资料
    formSupplement = (e) =>{
        this.setState({
            visible: true,
        });
    };

    componentWillMount= (e) =>{
        this._isMounted = true;
        ajax.post("/admin/autoloanApply/info",{applyNo:this.state.applyNo})
            .then(response =>{
                if(response.code=="0") {
                    console.log(response.data);
                    var data = response.data;
                    this.setState({
                        data
                    });
                    console.log(this.state.data);
                    //展开全文

                    var str1 =data.riskControlReport,str2= data.secondVerifyReport;
                    console.log(str1,str2,11111111111)
                    var t = 248,
                        _lenght1 = str1 ? str1.length : 0,
                        _lenght2 = str2 ? str2.length : 0;
                    if( _lenght1 > t ){
                        var str11 = str1;
                        str11= str1.substring(0,t);
                        str11= str11+"...";
                        $("#textCont").html(str11);
                        $("#open").show();
                    }else{
                        $("#open").hide();
                        $("#textCont").html(str1);
                    }

                    if( _lenght2 > t ){
                        var str22 = str2;
                        str22= str2.substring(0,t);
                        str22= str22+"...";
                        $("#textCont2").html(str22);
                        $("#open2").show();
                    }else{
                        $("#open2").hide();
                        $("#textCont2").html(str2);
                    }

                    $("#open").unbind('click').on("click",function(){
                        console.log($("#open").html()=="展开");
                        if($("#open").html()=="展开"){      //如果a中含有"展开"则显示"收起"
                            $("#open").html("<<&nbsp;收起");
                            // $(".cont").css("padding-bottom","18px");
                            $("#textCont").html(str1);
                        }else{
                            $("#open").html("展开");
                            $(".cont").css("padding-bottom","0");
                            $("#textCont").html(str11);
                        }
                    });

                    $("#open2").unbind('click').on("click",function(){
                        console.log($("#open2").html()=="展开");
                        if($("#open2").html()=="展开"){      //如果a中含有"展开"则显示"收起"
                            $("#open2").html("<<&nbsp;收起");
                            $(".cont").css("padding-bottom","18px");
                            $("#textCont2").html(str2);
                        }else{
                            $("#open2").html("展开");
                            $(".cont").css("padding-bottom","0");
                            $("#textCont2").html(str22);
                        }

                    });
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
    };
    componentWillUnmount() {
        this._isMounted = false
    }


    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //             //    /admin/autoloanApply/verify/passOrNo/update
    //             let data = {
    //                 applyNo:this.state.applyNo,
    //                 auditOption:this.state.auditOption,
    //                 verifyReport:this.state.verifyReport
    //             };
    //             ajax.post("/admin/autoloanApply/last/verify/passOrNo/update",data)
    //                 .then(response =>{
    //                     console.log(response);
    //                     if(response.code=="0"){
    //                         message.success("提交成功！");
    //                         this.props.router.push('/auditList/list4');
    //                     }else{
    //                         console.log("list"+response.msg);
    //                         message.error(response.msg);
    //                     }
    //                 })
    //         }
    //     });
    // };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    searchRiskReport = (i,e) => {
        let _this = this;
        if (this.state.data.number == 0) {
            Modal.info({
                title: '余额不足',
                content: '您的账户余额已不足，请先去账户中心充值',
                okText: "知道了"
            })
            return
        }
        confirm({
            title: '确定查询该用户的风控数据？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                if (i == "1") {
                    _this.setState({
                        tongDunLoading: true
                    })
                    ajax.post("/admin/bodyGuard/report/query", {applyNo: _this.props.params.id})
                    .then(response => {
                        if(response.code == "0") {
                            _this.setState({
                                riskData: response.data,
                                hasTongDunReport: "1"
                            })
                            var json = $.parseJSON(response.data)
                            console.log([json])
                            $.showReport([json],_this.state.data.realName)
                        }else {
                            message.error(response.msg);
                        }
                        _this.setState({
                            tongDunLoading: false
                        })
                    });
                }else if (i == "2") {
                    _this.setState({
                        youfenLoading: true
                    })
                    ajax.post("/admin/bodyGuard/youfen/query", {applyNo: _this.props.params.id})
                    .then(response => {
                        if(response.code == "0") {
                            _this.setState({
                                riskData: response.data,
                                hasYouFenReport: "1"
                            })
                            var json = response.data
                            console.log([json])
                            $.showReport1([json],_this.state.data.realName)
                        }else {
                            message.error(response.msg);
                        }
                        _this.setState({
                            youfenLoading: false
                        })
                    });
                }
                
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    searchRiskReportB = (i,e) => {
        let _this = this;
        if (this.state.data.number == 0) {
            Modal.info({
                title: '余额不足',
                content: '您的账户余额已不足，请先去账户中心充值',
                okText: "知道了"
            })
            return
        }
        confirm({
            title: '您已查询过该报告，查询10元/次，确定要重新查询吗？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                if (i == "1") {
                    _this.setState({
                        tongDunLoading2: true
                    })
                    ajax.post("/admin/bodyGuard/report/query", {applyNo: _this.props.params.id})
                    .then(response => {
                        if(response.code == "0") {
                            _this.setState({
                                riskData: response.data
                            })
                            var json = $.parseJSON(response.data)
                            console.log([json])
                            $.showReport([json],_this.state.data.realName)
                        }else {
                            message.error(response.msg);
                        }
                        _this.setState({
                            tongDunLoading2: false
                        })
                    });
                }else if (i == "2") {
                    _this.setState({
                        youfenLoading2: true
                    })
                    ajax.post("/admin/bodyGuard/youfen/query", {applyNo: _this.props.params.id})
                    .then(response => {
                        if(response.code == "0") {
                            _this.setState({
                                riskData: response.data
                            })
                            var json = response.data
                            console.log([json])
                            $.showReport1([json],_this.state.data.realName)
                        }else {
                            message.error(response.msg);
                        }
                        _this.setState({
                            youfenLoading2: false
                        })
                    });
                }
                
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    searchRiskReportA = (i,e) => {
        var _this = this
        if (i == "1") {
            this.setState({
                tongDunLoading: true
            })
        }else if (i == "2") {
            this.setState({
                youfenLoading: true
            })
        }
        ajax.post("/admin/bodyGuard/report/existing", {applyNo: _this.props.params.id,type: i - 0})
            .then(response => {
                if(response.code == "0") {
                    _this.setState({
                        riskData: response.data
                    })
                    var json = $.parseJSON(response.data)
                    console.log([json])
                    if ( i == "1") {
                        $.showReport([json],_this.state.data.realName)
                    }else if ( i == "2") {
                        $.showReport1([json],_this.state.data.realName)
                    }
                    
                }else {
                    message.error(response.msg);
                }
                this.setState({
                    tongDunLoading: false,
                    youfenLoading: false
                })
            });
    }

    handleOk = () => {
        let {supplement, applyNo} = this.state;
        if(supplement){
            ajax.post("/admin/autoloanApply/last/verify/suplement/update",{verifySupplementContent:supplement,applyNo:applyNo})
                .then(response =>{
                    if(response.code=="0") {
                        this.props.router.push('/auditList/list4');
                    }else{
                        console.log("list"+response.msg);
                        message.error(response.msg);
                    }
                });
            this.setState({
                confirmLoading: true,
            });
            setTimeout(() => {
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
            }, 1000);
        }else{
            message.error("请输入待补充信息！")
        }


    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    //终审操作
    handleSubmit = (e) => {
        console.log(this.state.cardDate);
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.verifyReport == undefined ){
                    if(values.auditOption == 0 ){
                        message.error("请输入审核不通过原因！");
                    }else{
                        message.error("请输入风控报告！");
                    }
                }else{
                    let data={auditOption:this.state.auditOption,verifyReport:this.state.verifyReport,applyNo:this.state.applyNo};
                    ajax.post("/admin/autoloanApply/last/verify/passOrNo/update",data)
                        .then(response =>{
                            console.log(response);
                            if(response.code=="0"){
                                message.success("提交成功！");
                                this.props.router.push('/auditList/list4');
                            }else{
                                console.log("list"+response.msg);
                                message.error(response.msg);
                            }
                        })
                }
            } else {
                message.error("输入信息有误！");
            }
        })
    }

    moreMsg = () => {
        if($('.moremsg').text() == '显示全部') {
            this.setState({
                info_count: this.state.data.auditInfo.length
            })
            $('.moremsg').text('收起');
        } else {
            this.setState({
                info_count: 3
            })
            $('.moremsg').text('显示全部');
        }
    }

    render(){
        let self = this;
        const { getFieldDecorator } = this.props.form;
        const {data, applyNo ,visible, confirmLoading } = this.state;
        const  loanInfo  = this.state.data.loanInfo || {};
        const auditOption =this.state.auditOption;
        const  auditInfo  = this.state.data.auditInfo || {};
        if(!applyNo){
            window.location.hash = "login";
        }
        let auditInfoList = [];
        let auditInfo_length = auditInfo.length > this.state.info_count ? this.state.info_count : auditInfo.length;
        for (let i = 0; i < auditInfo_length; i++) {
            auditInfoList.push(
                <div className="cont" id={"cont"+i} style={{marginTop:"10px"}} key={i}>
                    <h3 style={{width:'49%',display:'inline-block', fontSize:"18px", color:"rgba(0,0,0,0.85)", fontWeight:"bolder"}}>{auditInfo[i].title}</h3>
                    <p className="salesMan" style={{width:'49%',display:'inline-block',textAlign:'right'}}>
                        <span><i>{auditInfo[i].roleName}:</i>{auditInfo[i].auditor}</span>
                        <span style={{marginRight:'0'}}><i>审核时间：</i>{auditInfo[i].auditTime}</span>
                    </p>
                    <span className="textCont packup" style={{display:"block",wordWrap:'break-word',lineHeight:'22px'}}>
                        {auditInfo[i].content}
                    </span>
                    <i className="open" style={{display:"none"}}>展开</i>
                </div>
            );
        }

        return(
            <div className="auditList">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
                </Breadcrumb>
                <div className="mainInfo clearfix">
                    <h2 className="title" style={{marginBottom:"15px"}}>单号：{applyNo}</h2>
                    <div id="audit" className="contLeft">
                        <p className="salesMan">
                            <span><i>门店：</i>{data.storeName}</span>
                            <span><i>申请时间：</i>{data.storeApplyDate}</span>
                        </p>
                        {auditInfoList}
                        {/*<div className="cont">*/}
                            {/*<h3 style={{width:'49%',display:'inline-block'}}>风控报告</h3>*/}
                            {/*<p className="salesMan" style={{width:'49%',display:'inline-block',textAlign:'right'}}>*/}
                                {/*<span><i>初审员：</i>{data.firstVerifyName}</span><span style={{marginRight:'0'}}><i>初审时间：</i>{data.firstVerifyDate}</span>*/}
                            {/*</p>*/}
                            {/*<span id="textCont" className="packup" style={{display:"block",wordWrap:'break-word',lineHeight:'22px'}}>*/}
                            {/*</span>*/}
                            {/*<i id="open"  style={{display:"none"}}>展开</i>*/}
                        {/*</div>*/}
                        {/*<div className="cont" style={{marginTop:'24px'}}>*/}
                            {/*<h3 style={{width:'49%',display:'inline-block'}}>复审信息</h3>*/}
                            {/*<p className="salesMan" style={{width:'49%',display:'inline-block',textAlign:'right'}}>*/}
                                {/*<span><i>复审员：</i>{data.secondVerifyName}</span><span style={{marginRight:'0'}}><i>复审时间：</i>{data.secondVerifyDate}</span>*/}
                            {/*</p>*/}
                            {/*<span id="textCont2" className="packup" style={{display:"block",wordWrap:'break-word',lineHeight:'22px'}}>*/}
                            {/*</span>*/}
                            {/*<i id="open2"  style={{display:"none"}}>展开</i>*/}
                        {/*</div>*/}
                    </div>
                    <div className="contRight clearfix">
                        <i>状态</i>
                        <h2>{data.statusStr}</h2>
                    </div>
                    {auditInfo.length > 3?
                        <div class="moremsg" onClick={this.moreMsg.bind(this)} style={{color: "#1890ff",textAlign: "right", cursor: "pointer",float: "left", width:"100%"}}>显示全部</div>
                        :
                        null
                    }
                </div>

                <div id="mainCont" style={{marginTop:"24px"}}>
                    <h2 className="infoTitles" style={{fontSize:"16px",height:"55px",lineHeight:"55px",background:"#FAFAFA",margin:"24px 24px 0",borderBottom:"1px solid #E9E9E9",padding:"0 32px", fontWeight:"bolder"}}>申请单详情</h2>
                    {/*征信情况*/}
                    <div className="infoBox" style={{margin:"0 24px"}}>
                        <h2 className="infoTitle">征信情况<span className="seeBtn" data-titindex="征信情况" onClick={this.openPop.bind(this)}></span></h2>
                        <Row>
                            <Col span={24}>
                                <span>{data.creditContent}</span>
                            </Col>
                        </Row>
                    </div>
                    {/*法院情况*/}
                    <div className="infoBox" style={{margin:"0 24px"}}>
                        <h2 className="infoTitle">法院情况</h2>
                        <Row>
                            <Col span={24}>
                                <span>{data.aboutCourt}</span>
                            </Col>
                        </Row>
                    </div>
                    {/*购车人信息*/}
                    <div className="infoBox" style={{margin:"0 24px"}}>
                        <h2 className="infoTitle">购车人信息<span className="seeBtn" data-titindex="购车人信息" onClick={this.openPop.bind(this)}></span></h2>
                        <Row>
                            <Col span={8}>
                                <label>姓名：</label>
                                <span>{data.realName}</span>
                            </Col>
                            <Col span={8}>
                                <label>性别：</label>
                                <span>{data.sex=="1"? "男":"女"}</span>
                            </Col>
                            <Col span={8}>
                                <label>客户编号：</label>
                                <span>{data.id}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <label>出生年月：</label>
                                <span>{data.birthday}</span>
                            </Col>
                            <Col span={8}>
                                <label>手机号：</label>
                                <span>{data.mobilePhone}</span>
                            </Col>
                            <Col span={8}>
                                <label>户籍地址：</label>
                                <span>{data.permanentAddress}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <label>身份证号码：</label>
                                <span>{data.cardId}</span>
                            </Col>
                            <Col span={8}>
                                <label>身份证日期：</label>
                                <span>{data.cardStartDate}-{data.cardEndDate ? data.cardEndDate : '长期'}</span>
                            </Col>
                            <Col span={8}>
                                <label>居住地址：</label>
                                <span>{data.address}</span>
                            </Col>
                        </Row>
                        {/*<Row>*/}
                        {/*<Col span={8}>*/}
                        {/*<label>征信信息：</label>*/}
                        {/*<span>{data.creditContent}</span>*/}
                        {/*</Col>*/}
                        {/*</Row>*/}
                        <Row>
                            <Col span={8}>
                                <label>银行卡号:</label>
                                <span>{data.bankCardCode}</span>
                            </Col>
                            <Col span={8}>
                                <label>工作单位地址：</label>
                                <span>{data.companyAddress}</span>
                            </Col>
                            {data.telPhone ? 
                                <Col span={8}>
                                    <label>座机：</label>
                                    <span>{data.telPhone}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.qqCode ? 
                                <Col span={8}>
                                    <label>QQ：</label>
                                    <span>{data.qqCode}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.email ? 
                                <Col span={8}>
                                    <label>邮箱：</label>
                                    <span>{data.email}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.incomeInMonth ? 
                                <Col span={8}>
                                    <label>月均收入：</label>
                                    <span>{data.incomeInMonth}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.workYear ? 
                                <Col span={8}>
                                    <label>工作时间：</label>
                                    <span>{data.workYear}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.diplomaStr ?
                                <Col span={8}>
                                    <label>学历：</label>
                                    <span>{data.diplomaStr}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.profession ? 
                                <Col span={8}>
                                    <label>职业：</label>
                                    <span>{data.profession}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.companyName ? 
                                <Col span={8}>
                                    <label>工作单位：</label>
                                    <span>{data.companyName}</span>
                                </Col>
                                :
                                ''
                            }
                        </Row>
                    </div>
                    {/*配偶信息*/}
                    <div className="infoBox" style={{margin:"0 24px",display: data.isMarried == 1 ? 'block' : 'none'}}>
                        <h2 className="infoTitle">配偶信息<span className="seeBtn" data-titindex="配偶信息" onClick={this.openPop.bind(this)}></span></h2>
                        <Row>
                            <Col span={8}>
                                <label>姓名：</label>
                                <span>{data.spouse.realName}</span>
                            </Col>
                            <Col span={8}>
                                <label>手机号码：</label>
                                <span>{data.spouse.mobilePhone}</span>
                            </Col>
                            <Col span={8}>
                                <label>身份证号码：</label>
                                <span>{data.spouse.cardId}</span>
                            </Col>
                            {data.spouse.companyName ? 
                                <Col span={8}>
                                    <label>工作单位：</label>
                                    <span>{data.spouse.companyName}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.spouse.companyTel?
                                <Col span={8}>
                                    <label>单位电话：</label>
                                    <span>{data.spouse.companyTel}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.spouse.companyAddress?
                                <Col span={8}>
                                    <label>单位地址：</label>
                                    <span>{data.spouse.companyAddress}</span>
                                </Col>
                                :
                                ''
                            }
                        </Row>
                    </div>
                    {/*担保人信息*/}
                    <div className="infoBox"  style={{margin:"0 24px",display: data.haveGuarantee == 1 ? 'block' : 'none'}}>
                        <h2 className="infoTitle">担保人信息<span className="seeBtn" data-titindex="担保人信息" onClick={this.openPop.bind(this)}></span></h2>
                        <Row>
                            <Col span={8}>
                                <label>姓名：</label>
                                <span>{data.firstGuarantee.realName}</span>
                            </Col>
                            <Col span={8}>
                                <label>手机号码：</label>
                                <span>{data.firstGuarantee.mobilePhone}</span>
                            </Col>
                            <Col span={8}>
                                <label>身份证号码：</label>
                                <span>{data.firstGuarantee.cardId}</span>
                            </Col>
                            {data.firstGuarantee.companyName?
                                <Col span={8}>
                                    <label>工作单位：</label>
                                    <span>{data.firstGuarantee.companyName}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.firstGuarantee.companyTel?
                                <Col span={8}>
                                    <label>单位电话：</label>
                                    <span>{data.firstGuarantee.companyTel}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.firstGuarantee.companyAddress?
                                <Col span={8}>
                                    <label>单位地址：</label>
                                    <span>{data.firstGuarantee.companyAddress}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.firstGuarantee.borrowerRelationStr?
                                <Col span={8}>
                                    <label>担保人社会关系：</label>
                                    <span>{data.firstGuarantee.borrowerRelationStr}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.firstGuarantee.telPhone?
                                <Col span={8}>
                                    <label>担保人座机：</label>
                                    <span>{data.firstGuarantee.telPhone}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.firstGuarantee.address?
                                <Col span={8}>
                                    <label>担保人住址：</label>
                                    <span>{data.firstGuarantee.address}</span>
                                </Col>
                                :
                                ''
                            }
                        </Row>
                    </div>
                    {/*第二担保人信息*/}
                    <div className="infoBox"  style={{margin:"0 24px",display: data.haveSecondGuarantee == 1 ? 'block' : 'none'}}>
                        <h2 className="infoTitle">第二担保人信息<span className="seeBtn" data-titindex="第二担保人信息" onClick={this.openPop.bind(this)}></span></h2>
                        <Row>
                            <Col span={8}>
                                <label>姓名：</label>
                                <span>{data.secondGuarantee.realName}</span>
                            </Col>
                            <Col span={8}>
                                <label>手机号码：</label>
                                <span>{data.secondGuarantee.mobilePhone}</span>
                            </Col>
                            <Col span={8}>
                                <label>身份证号码：</label>
                                <span>{data.secondGuarantee.cardId}</span>
                            </Col>
                            {data.secondGuarantee.companyName?
                                <Col span={8}>
                                    <label>工作单位：</label>
                                    <span>{data.secondGuarantee.companyName}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.secondGuarantee.companyTel?
                                <Col span={8}>
                                    <label>单位电话：</label>
                                    <span>{data.secondGuarantee.companyTel}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.secondGuarantee.companyAddress?
                                <Col span={8}>
                                    <label>单位地址：</label>
                                    <span>{data.secondGuarantee.companyAddress}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.secondGuarantee.borrowerRelationStr?
                                <Col span={8}>
                                    <label>担保人社会关系：</label>
                                    <span>{data.secondGuarantee.borrowerRelationStr}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.secondGuarantee.telPhone?
                                <Col span={8}>
                                    <label>担保人座机：</label>
                                    <span>{data.secondGuarantee.telPhone}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.secondGuarantee.address?
                                <Col span={8}>
                                    <label>担保人住址：</label>
                                    <span>{data.secondGuarantee.address}</span>
                                </Col>
                                :
                                ''
                            }
                        </Row>
                    </div>
                    {/*共同借款人信息*/}
                    <div className="infoBox"  style={{margin:"0 24px",display: data.haveCommonBorrower == 1 ? 'block' : 'none'}}>
                        <h2 className="infoTitle">共同借款人信息</h2>
                        <Row>
                            <Col span={8}>
                                <label>姓名：</label>
                                <span>{data.commonBorrower.realName}</span>
                            </Col>
                            <Col span={8}>
                                <label>手机号码：</label>
                                <span>{data.commonBorrower.mobilePhone}</span>
                            </Col>
                            <Col span={8}>
                                <label>身份证号码：</label>
                                <span>{data.commonBorrower.cardId}</span>
                            </Col>
                            {data.commonBorrower.borrowerRelationStr?
                                <Col span={8}>
                                    <label>社会关系：</label>
                                    <span>{data.commonBorrower.borrowerRelationStr}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.commonBorrower.telPhone?
                                <Col span={8}>
                                    <label>座机：</label>
                                    <span>{data.commonBorrower.telPhone}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.commonBorrower.companyAddress?
                                <Col span={8}>
                                    <label>单位地址：</label>
                                    <span>{data.commonBorrower.companyAddress}</span>
                                </Col>
                                :
                                ''
                            }
                            {data.commonBorrower.address?
                                <Col span={8}>
                                    <label>地址：</label>
                                    <span>{data.commonBorrower.address}</span>
                                </Col>
                                :
                                ''
                            }
                        </Row>
                    </div>
                    {/*其他联系人一信息*/}
                    <div className="infoBox"  style={{margin:"0 24px",display: data.haveFirstContact == 1 ? 'block' : 'none'}}>
                        <h2 className="infoTitle">其他联系人一信息</h2>
                        <Row>
                            <Col span={8}>
                                <label>姓名：</label>
                                <span>{data.firstContact.realName}</span>
                            </Col>
                            <Col span={8}>
                                <label>手机号码：</label>
                                <span>{data.firstContact.mobilePhone}</span>
                            </Col>
                            <Col span={8}>
                                <label>身份证号码：</label>
                                <span>{data.firstContact.cardId}</span>
                            </Col>
                            {data.firstContact.borrowerRelationStr?
                                <Col span={8}>
                                    <label>社会关系：</label>
                                    <span>{data.firstContact.borrowerRelationStr}</span>
                                </Col>
                                :
                                ''
                            }
                        </Row>
                    </div>
                    {/*其他联系人二信息*/}
                    <div className="infoBox"  style={{margin:"0 24px",display: data.haveSecondContact == 1 ? 'block' : 'none'}}>
                        <h2 className="infoTitle">其他联系人一信息</h2>
                        <Row>
                            <Col span={8}>
                                <label>姓名：</label>
                                <span>{data.secondContact.realName}</span>
                            </Col>
                            <Col span={8}>
                                <label>手机号码：</label>
                                <span>{data.secondContact.mobilePhone}</span>
                            </Col>
                            <Col span={8}>
                                <label>身份证号码：</label>
                                <span>{data.secondContact.cardId}</span>
                            </Col>
                            {data.secondContact.borrowerRelationStr?
                                <Col span={8}>
                                    <label>社会关系：</label>
                                    <span>{data.secondContact.borrowerRelationStr}</span>
                                </Col>
                                :
                                ''
                            }
                        </Row>
                    </div>
                    {/*借款信息*/}
                    <div className="infoBox"  style={{margin:"0 24px",display: loanInfo == null ? 'none':'block' }}>
                        <h2 className="infoTitle">借款信息</h2>
                        <Row>
                            <Col span={8}>
                                <label>合同编号：</label>
                                <span>{loanInfo.contractNo}</span>
                            </Col>
                            <Col span={8}>
                                <label>车辆类型：</label>
                                <span>{loanInfo.autoType =="0"? "新":"二手车"}</span>
                            </Col>
                            <Col span={8}>
                                <label>车辆品牌：</label>
                                <span>{loanInfo.autoBrands}</span>
                            </Col>
                            <Col span={8}>
                                <label>是否为能源车：</label>
                                <span>{loanInfo.isNewEnergyCar == "1"? '是' : '否'}</span>
                            </Col>
                            {loanInfo.autoModel?
                                <Col span={8}>
                                    <label>车辆型号：</label>
                                    <span>{loanInfo.autoModel}</span>
                                </Col>
                                :
                                ''
                            }
                            {loanInfo.autoVinCode?
                                <Col span={8}>
                                    <label>车架号：</label>
                                    <span>{loanInfo.autoVinCode}</span>
                                </Col>
                                :
                                ''
                            }
                            <Col span={8}>
                                <label>保险：</label>
                                <span>{loanInfo.autoInsurance =="1"? "有":"无"}</span>
                            </Col>
                            <Col span={8}>
                                <label>{loanInfo.autoType =="0" ? '车辆价格：' : '二手车评估价：'}</label>
                                <span>{loanInfo.autoType =="0" ? loanInfo.autoPrice : loanInfo.assessPrice}元</span>
                            </Col>
                            <Col span={8}>
                                <label>贷款金额：</label>
                                <span>{loanInfo.loadMoney}元</span>
                            </Col>
                            <Col span={8}>
                                <label>首付金额：</label>
                                <span>{loanInfo.firstMoney}元</span>
                            </Col>
                            <Col span={8}>
                                <label>首付比例：</label>
                                <span>{loanInfo.firstScale}%</span>
                            </Col>
                            <Col span={8}>
                                <label>签约利率：</label>
                                <span>{loanInfo.signedApr}%</span>
                            </Col>
                            <Col span={8}>
                                <label>贷款期数：</label>
                                <span>{loanInfo.periodsId}月</span>
                            </Col>
                            <Col span={8}>
                                <label>贷款银行：</label>
                                <span>{data.loadBankName}</span>
                            </Col>
                            <Col span={8}>
                                <label>银行利率：</label>
                                <span>{loanInfo.bankApr}%</span>
                            </Col>
                            <Col span={8}>
                                <label>签约贷款额：</label>
                                <span>{loanInfo.signedLoadMoney}元</span>
                            </Col>
                            <Col span={8}>
                                <label>利息：</label>
                                <span>{loanInfo.interest}元</span>
                            </Col>
                            <Col span={8}>
                                <label>签约首付：</label>
                                <span>{loanInfo.signedFirstMoney}元</span>
                            </Col>
                            <Col span={8}>
                                <label>签约首付比例：</label>
                                <span>{loanInfo.signedFirstScale}%</span>
                            </Col>
                            <Col span={8}>
                                <label>月还款金额：</label>
                                <span>{loanInfo.moneyPerMonth}元</span>
                            </Col>
                            <Col span={8}>
                                <label>贷款比例：</label>
                                <span>{loanInfo.loadScale}%</span>
                            </Col>
                            <Col span={8}>
                                <label>申请调整账户额度：</label>
                                <span>{loanInfo.applyLoadMoney}元</span>
                            </Col>
                        </Row>
                    </div>
                    {/*订单信息*/}
                    <div className="infoBox" style={{margin:"0 24px"}}>
                        <h2 className="infoTitle">订单信息</h2>
                        <Row>
                            <Col span={8}>
                                <label>业务员：</label>
                                <span>{data.applyEmployeeName}</span>
                            </Col>
                            <Col span={8}>
                                <label>车行：</label>
                                <span>{data.autoDealerName}</span>
                            </Col>
                            <Col span={8}>
                                <label>车行地址：</label>
                                <span>{data.autoDealerAddress}</span>
                            </Col>
                        </Row>
                    </div>
                    {/*其他信息*/}
                    <div className="infoBox" style={{margin:"0 24px"}}>
                        <h2 className="infoTitle">其他信息</h2>
                        <Row>
                            <Col span={24}>
                                <label>备注：</label>
                                <span>{data.remark}</span>
                            </Col>
                        </Row>
                    </div>
                    {/*防欺诈报告查询*/}
                    <div className="infoBox_risk" style={{margin:"24px 24px",height: "216px",textAlign:"center"}}>
                        <div className="tongdun_risk" style={{marginRight:"24px",height: "216px",textAlign:"center",width:"calc(50% - 12px)",background:"#fff",float:"left"}}>
                            <div className="riskBox">
                                <div className="riskBg_tongdun"></div>
                                {data.hasTongDunReport == "1" || this.state.hasTongDunReport == "1"?
                                    <div className="riskBtnBox2">
                                        <div className="riskTitle2">多维度反欺诈报告</div>
                                        <Button style={{width:"120px"}} type="primary" loading={this.state.tongDunLoading} onClick={this.searchRiskReportA.bind(this,"1")}>查看</Button>
                                        <br/>
                                        {data.status == 24 || data.status == 33 || data.status == 43 ?
                                            <Button style={{width:"120px",marginTop:"8px",color:"#1890FF",borderColor:"#1890FF"}} loading={this.state.tongDunLoading2} onClick={this.searchRiskReportB.bind(this,"1")}>重新查询报告</Button>
                                            :
                                            ''
                                        }
                                    </div>
                                    :
                                    <div className="riskBtnBox">
                                        <div className="riskTitle">多维度反欺诈报告</div>
                                        <p>查询 <span>8</span> 元/次</p>
                                        <Button style={{width:"120px"}} loading={this.state.tongDunLoading} type="primary" onClick={this.searchRiskReport.bind(this,"1")}>立即查询</Button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="youfen_risk" style={{height: "216px",textAlign:"center",width:"calc(50% - 12px)",background:"#fff",float:"left"}}>
                            <div className="riskBox">
                                <div className="riskBg_youfen"></div>
                                {data.hasYouFenReport == "1" || this.state.hasYouFenReport == "1"?
                                    <div className="riskBtnBox2">
                                        <div className="riskTitle2">银联信用报告</div>
                                        <Button style={{width:"120px"}} type="primary" loading={this.state.youfenLoading} onClick={this.searchRiskReportA.bind(this,"2")}>查看</Button><br/>
                                        {data.status == 24 || data.status == 33 || data.status == 43 ?
                                            <Button style={{width:"120px",marginTop:"8px",color:"#1890FF",borderColor:"#1890FF"}} loading={this.state.youfenLoading2} onClick={this.searchRiskReportB.bind(this,"2")}>重新查询报告</Button>
                                            :
                                            ''
                                        }
                                    </div>
                                    :
                                    <div className="riskBtnBox">
                                        <div className="riskTitle">银联信用报告</div>
                                        <p>查询 <span>20</span> 元/次</p>
                                        <Button style={{width:"120px"}} loading={this.state.youfenLoading} type="primary" onClick={this.searchRiskReport.bind(this,"2")}>立即查询</Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {/*复审意见*/}
                    <div className="infoBox opration" style={{margin: "0px 24px 80px"}}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="审核意见：">
                                {getFieldDecorator("auditOption", {
                                    initialValue: this.state.auditOption + "" || undefined,
                                    rules: [
                                        {required: true, message: "请选择审核意见！"}
                                    ]
                                })(
                                    <RadioGroup name="auditOption" onChange={this.onChange.bind(this, 'auditOption')}>
                                        <Radio value="0">不通过</Radio>
                                        <Radio value="1">通过</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem label="备注/不通过理由：">
                                {getFieldDecorator("verifyReport", {
                                    initialValue: this.state.data.verifyReport,
                                    rules: [
                                        {required:false, message: "请输入备注/不通过理由！"}
                                    ]
                                })(
                                    <textarea style={{height:"200px",width:"100%"}} placeholder="请输入备注/不通过理由" className="ant-input" name="verifyReport" rows="3"  onChange={this.onChange.bind(this, 'verifyReport')}></textarea>
                                )}
                            </FormItem>
                            <Row style={{backgroundColor: '#fff',width:"calc(100% - 200px)",padding:"13px 32px",position:"fixed",bottom:"0",left:"200px",borderTop:"1px solid rgb(232, 232, 232)"}}>
                                <Col style={{float: "left"}}>
                                    <Button type="ghost" className="supplementBtn" onClick={this.formSupplement} >补充资料</Button>
                                </Col>
                                <Col className="rightBtn" style={{float: "right"}}>
                                    <Button><Link to={'/auditList/list4'}>取消</Link></Button>
                                    <Button className="okBtn" type="primary" htmlType="submit">提交</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>

                    {/* 查看图片 */}
                    <div className="seePicWrapper" ref="seePicWrapperDom">
                        <SeePic openBoole={this.state.openBoole} applyNoAttr={applyNo} titIndexAttr={this.state.titIndex} setPopStateAttr={this.setPopState.bind(this)}></SeePic>
                    </div>
                </div>

                <Modal title="待补充内容"
                       okText="确认"
                       cancelText="取消"
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}>
                    <textarea style={{width:"100%"}} placeholder="请输入需要门店内勤补充的内容" className="ant-input" name="supplement" rows="3"  onChange={this.onChange.bind(this, 'supplement')}></textarea>
                </Modal>
            </div>
        );

    }
}
const application = Form.create()(applicationForm);
export default application;