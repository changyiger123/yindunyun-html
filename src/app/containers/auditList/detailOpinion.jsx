import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , Modal, Breadcrumb, Button, Icon ,message, Radio , Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
import "./auditList.less";
import ajax from "../../utils/ajax";
class applicationForm extends React.Component {
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
    };
    constructor(props) {
        super(props);
        // this.handleTableChange = this.handleTableChange.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
    };
    onChange(field, e){
        let valStr = e.target.value;
        this.setState({
            [field]: valStr,
        }, ()=> {

        });
    };

    //补充资料
    formSupplement = (e) =>{

    }

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
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
    };
    componentWillUnmount() {
        this._isMounted = false
    }

    //初审操作
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            //    /admin/autoloanApply/verify/passOrNo/update
                let data = {
                    applyNo:this.state.applyNo,
                    auditOption:this.state.auditOption,
                    verifyReport:this.state.verifyReport
                };
                ajax.post("/admin/autoloanApply/verify/passOrNo/update",data)
                    .then(response =>{
                        console.log(response);
                        if(response.code=="0"){
                            // var data=response.data;
                            message.success("提交成功！");
                            this.props.router.push("/newApplication/list");
                        }else{
                            console.log("list"+response.msg);
                            message.error(response.msg);
                        }
                    })
            }
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render(){
        let self = this;
        const { getFieldDecorator } = this.props.form;
        const {data, applyNo ,visible, confirmLoading } = this.state;
        const  loanInfo  = this.state.data.loanInfo || {};
        if(!applyNo){
            window.location.hash = "login";
        }

        return(
            <div className="auditList auditList1">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
                </Breadcrumb>
                <div className="mainInfo clearfix">
                    <h2 className="title" style={{marginBottom:"15px"}}>单号：{applyNo}</h2>
                    {/*<div id="firstTrial" className="contLeft">*/}
                        {/*<p className="salesMan">*/}
                            {/*<span ><i>门店：</i>{data.storeName}</span>*/}
                            {/*<span ><i>申请时间：</i>2017-10-31 23:12:00</span>*/}
                        {/*</p>*/}
                    {/*</div>*/}
                    {/*style={{display:"none"}}*/}
                    <div id="audit" className="contLeft" >
                        <p className="salesMan">
                            <span><i>门店</i>{data.storeName}</span>
                            <span><i>申请时间：</i>{data.storeApplyDate}</span>
                        </p>
                        <div className="cont" style={{display:"none"}}>
                            <h3 style={{width:'49%',display:'inline-block'}}>风控报告/初审补充内容</h3>
                            <p className="salesMan" style={{width:'49%',display:'inline-block',textAlign:'right'}}>
                                <span><i>业务员：</i>曲丽丽</span>
                                <span style={{marginRight:'0'}}><i>申请时间：</i>2017-10-31 23:12:00</span>
                            </p>
                            <span id="textCont" className="packup" style={{display:"block",wordWrap:'break-word',lineHeight:'22px'}}>
                            </span>
                            <i id="open"  style={{display:"none"}}>展开</i>
                        </div>
                    </div>
                    {/*<div className="contRight clearfix">*/}
                        {/*/!*<i>状态</i>*!/*/}
                        {/*/!*<h2>初审重审/复审中 </h2>*!/*/}
                    {/*</div>*/}
                </div>
                {/*购房人信息*/}
                <div id="mainCont" className="infoBox">
                    <h2 className="infoTitles">购车人信息</h2>
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
                            <span>{data.birthday}</span>
                        </Col>
                        <Col span={8}>
                            <label>身份证日期：</label>
                            <span>{data.mobilePhone}</span>
                        </Col>
                        <Col span={8}>
                            <label>居住地址：</label>
                            <span>{data.permanentAddress}</span>
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
                            <label>征信信息：</label>
                            <span>{data.creditContent}</span>
                        </Col>
                    </Row>
                </div>
                {/*配偶信息*/}
                <div className="infoBox" style={{display: data.isMarried == 1 ? 'block' : 'none'}}>
                    <h2 className="infoTitles">配偶信息</h2>
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
                        {data.spouse.companyPhone?
                            <Col span={8}>
                                <label>单位电话：</label>
                                <span>{data.spouse.companyPhone}</span>
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
                    <h2 className="infoTitles">担保人信息</h2>
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
                    <h2 className="infoTitles">第二担保人信息</h2>
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
                    <h2 className="infoTitles">共同借款人信息</h2>
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
                    <h2 className="infoTitles">其他联系人一信息</h2>
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
                    <h2 className="infoTitles">其他联系人一信息</h2>
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

            </div>
        );

        //展开全文
        var str ="当处于初审重审状态，此处填写审核员反馈的需要补充修改的资料，当处于复审状态，此处填写审核员填写的信息。信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息"
        var t = 248,
            _lenght = str.length;
        if( _lenght > t ){
            var str2 = str;
            str2= str.substring(0,t);
            str2= str2+"...";
            $("#textCont").html(str2);

            $("#open").show();

        }else{
            $("#open").hide();
            $("#textCont").html(str);
        }
        $("#open").unbind('click').on("click",function(){
            console.log($("#open").html()=="展开");
            if($("#open").html()=="展开"){      //如果a中含有"展开"则显示"收起"
                $("#open").html("<<&nbsp;收起");
                $(".cont").css("padding-bottom","18px");
                $("#textCont").html(str);
            }else{
                $("#open").html("展开");
                $(".cont").css("padding-bottom","0");
                $("#textCont").html(str2);
                $("#textCont").html(str2);
            }

        });

    }
}
const application = Form.create()(applicationForm);
export default application;