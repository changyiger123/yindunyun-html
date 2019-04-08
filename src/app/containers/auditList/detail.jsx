import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table, Pagination , Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import "./auditList.less";
import ajax from "../../utils/ajax";
import {message} from "antd/lib/index";
import SeePic from './seePic';
class detailForm extends React.Component {
    state = {
        applyNo:this.props.params.id,
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
        auditOption:0,
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
                    var data = response.data;
                    this.setState({
                        data
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

    searchRiskReport = (i,e) => {
        var _this = this
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
            });
    }

    render() {
        let self = this;
        const { getFieldDecorator } = this.props.form;
        const { applyNo } = this.state;
        const  data  = this.state.data;
        const  loanInfo  = this.state.data.loanInfo || {};
        const  auditInfo  = this.state.data.auditInfo || {};
        console.log(this.state.data)
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
                    {auditInfo[i].title == '风控报告' && data.hasTongDunReport == "1"?
                        <Button type="primary" onClick={this.searchRiskReport.bind(this,"1")}>查看多维度反欺诈报告</Button>
                        :
                        ''
                    }
                    {auditInfo[i].title == "风控报告" && data.hasYouFenReport == "1"?
                        <Button type="primary" onClick={this.searchRiskReport.bind(this,"2")}>查看银联信用报告</Button>
                        :
                        ''
                    }
                    <i className="open" style={{display:"none"}}>展开</i>
                </div>
            );
        }
        const info1=(
            <p className="salesMan">
                <span><i>业务员：</i>{data.applyEmployeeName}</span>
                <span><i>申请时间：</i>{data.applyDate}</span>
            </p>
        );
        const info2=(
            <div>
                <p className="salesMan" style={{marginBottom:"5px"}}>
                    <span><i>业务员：</i>{data.applyEmployeeName}</span>
                </p>
                <p className="salesMan">
                    <span><i>申请时间：</i>{data.applyDate}</span>
                </p>
            </div>
        );
        console.log(auditInfoList.length <= 0);
        return(
            <div className="auditList">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
                </Breadcrumb>
                <div className="mainInfo clearfix">
                    <h2 className="title">单号：{applyNo}</h2>
                    <div id="audit" className="contLeft">
                        {auditInfoList.length <= 0 ? info2 : info1}
                        {auditInfoList}
                    </div>
                    <div className="contRight clearfix">
                        <i>状态</i>
                        <h2>{data.statusStr}</h2>
                    </div>
                    {auditInfo.length > 3?
                        <div className="moremsg" onClick={this.moreMsg.bind(this)} style={{color: "#1890ff",textAlign: "right", cursor: "pointer",float: "left", width:"100%"}}>显示全部</div>
                        :
                        null
                    }
                </div>

                {/*征信情况*/}
                {/* <div className="infoBox">
                    <h2 className="infoTitle">征信情况<span className="seeBtn" data-titindex="征信情况" onClick={this.openPop.bind(this)}></span></h2>
                    <Row>
                        <Col span={24}>
                            <span>{data.creditContent}</span>
                        </Col>
                    </Row>
                </div> */}

                {/*法院情况*/}
                {/* <div className="infoBox">
                    <h2 className="infoTitle">法院情况</h2>
                    <Row>
                        <Col span={24}>
                            <span>{data.aboutCourt}</span>
                        </Col>
                    </Row>
                </div> */}

                {/*购车人信息*/}
                <div className="infoBox">
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
                    <Row>
                        <Col span={8}>
                            <label>征信情况：</label>
                            <span>{data.creditContent}</span>
                        </Col>
                        <Col span={8}>
                            <label>法院情况：</label>
                            <span>{data.aboutCourt}</span>
                        </Col>
                    </Row>
                </div>
                {/*配偶信息*/}
                <div className="infoBox" style={{display: data.isMarried == 1 ? 'block' : 'none'}}>
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
                <div className="infoBox"  style={{display: data.haveGuarantee == 1 ? 'block' : 'none'}}>
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
                <div className="infoBox"  style={{display: data.haveSecondGuarantee == 1 ? 'block' : 'none'}}>
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
                <div className="infoBox"  style={{display: loanInfo == null ? 'none':'block' }}>
                    <h2 className="infoTitle">借款信息</h2>
                    <Row>
                        <Col span={8}>
                            <label>合同编号：</label>
                            <span>{loanInfo.contractNo}</span>
                        </Col>
                        <Col span={8}>
                            <label>车辆类型：</label>
                            <span>{loanInfo.autoType =="0"? "新车":"二手车"}</span>
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
                <div className="infoBox">
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
                <div className="infoBox">
                    <h2 className="infoTitle">其他信息</h2>
                    <Row>
                        <Col span={24}>
                            <label>备注：</label>
                            <span>{data.remark}</span>
                        </Col>
                    </Row>
                </div>

                {/* 查看图片 */}
                <div className="seePicWrapper" ref="seePicWrapperDom">
                    <SeePic openBoole={this.state.openBoole} applyNoAttr={applyNo} titIndexAttr={this.state.titIndex} setPopStateAttr={this.setPopState.bind(this)}></SeePic>
                </div>
            </div>
        );
        // for (let i = 0; i < auditInfo.length; i++) {
        //     //展开全文
        //     var str =auditInfo[i].content;
        //     console.log(str);
        //     var t = 248,
        //         _lenght = str.length;
        //     var cont = document.getElementById("#cont"+i);
        //     console.log(cont);
        //     if( _lenght > t ){
        //         var str2 = str;
        //         str2= str.substring(0,t);
        //         str2= str2+"...";
        //         $(cont>".textCont").html(str2);
        //         $(cont>".open").show();
        //     }else{
        //         $(cont>".open").hide();
        //         $(cont>".textCont").html(str);
        //     }
        //     $(cont>".open").unbind('click').on("click",function(){
        //         if($(cont>".open").html()=="展开"){      //如果a中含有"展开"则显示"收起"
        //             $(cont>".open").html("<<&nbsp;收起");
        //             cont.css("padding-bottom","18px");
        //             $(cont>".textCont").html(str);
        //         }else{
        //             $(cont>".open").html("展开");
        //             cont.css("padding-bottom","0");
        //             $(cont>".textCont").html(str2);
        //         }
        //     });
        // }

    }
}
const detail = Form.create()(detailForm);
export default detail;