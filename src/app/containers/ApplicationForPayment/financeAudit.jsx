import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , Radio, Breadcrumb,Button,Upload,Modal,Icon ,Table, Pagination , Row, Col } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
import "./riskReport.less";
import ajax from "../../utils/ajax";
import {message} from "antd/lib/index";
class applicationForm extends React.Component {
    state = {
        applyNo:this.props.params.id,
        previewVisible:false,
        previewImage:'',
        data:{},
        fileList:[],
        auditOpinion:0,
        supplementShow:'none',
        financeSupplementContent:'',
    };
    constructor(props) {
        super(props);
        this.rotateVal = 0;
    };

    componentWillMount= (e) =>{
        this._isMounted = true;
        ajax.post("/admin/autoloanApply/waitRemitApply/info",{applyNo:this.state.applyNo})
            .then(response =>{
                if(response.code=="0") {
                    let data = response.data;
                    this.setState({
                        data:data,
                        fileList:data.applyResource,
                    });
                    if(data.status==59){
                        this.setState({
                            supplementShow:'',
                        });
                    }
                }else{
                    message.error(response.msg);
                }
            });
    };
    componentWillUnmount() {
        this._isMounted = false
    }

    handleCancel = () => {
        this.setState({ previewVisible: false });
        this.rotateVal = -90;
        this.rotateBigPic();
    }

    handleLook(e){
        this.setState({
            previewVisible:true,
            previewImage:e,
        });
    }

    handleOpinion=(e)=>{
        this.setState({
            auditOpinion:e.target.value,
        });
    }

    handleSupplement=(e)=>{
        this.setState({
            financeSupplementContent:e.target.value,
        })
    }

    handleSubmit=(e)=>{
        const {applyNo,auditOpinion,financeSupplementContent}=this.state;
        if(auditOpinion!=1 && financeSupplementContent==''){
            message.warn("请填写不通过理由或补充内容");
        }else{
            this._isMounted = true;
            ajax.post("/admin/autoloanApply/financial/save",{applyNo:applyNo,auditOpinion:auditOpinion,financeSupplementContent:financeSupplementContent})
                .then(response =>{
                    if(response.code=="0") {
                      window.location.hash="/ApplicationForPayment/remitAudit";
                    }else{
                        message.error(response.msg);
                    }
                });
        }
    }

    handleGoBack=(e)=>{
        window.location.hash="/ApplicationForPayment/remitAudit";
    }

    rotateBigPic=()=>{
        let bigPicDom = this.refs.bigPicDom;
        this.rotateVal = (this.rotateVal+90)%360;
        bigPicDom.style.transform = 'rotate('+this.rotateVal+'deg)';
    }

    handleRotateIcon=(displayState)=>{
        let rotateBtnDom = document.getElementById('rotateBtnDom');
        rotateBtnDom.style.display = displayState;
    }

    render() {
        let self = this;
        const { applyNo } = this.state;
        const  data  = this.state.data;
        const fileList=this.state.fileList;
        const RadioGroup=Radio.Group;

        return(
            <div className="auditList">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>打款审核</Breadcrumb.Item>
                    <Breadcrumb.Item>财务审核</Breadcrumb.Item>
                </Breadcrumb>
                <div className="mainInfo clearfix">
                    <h2 className="title">单号：{applyNo}</h2>
                    <Row>
                        <Col span={8}>
                            <label>门店：</label>
                            <span>{data.storeName}</span>
                        </Col>
                        <Col span={8}>
                            <label>申请时间：</label>
                            <span>{data.applyDate}</span>
                        </Col>
                        <Col span={8}>
                            <label>客户姓名：</label>
                            <span>{data.realName}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <label>手机号码：</label>
                            <span>{data.mobilePhone}</span>
                        </Col>
                        <Col span={8}>
                            <label>贷款银行：</label>
                            <span>{data.loadBank}</span>
                        </Col>
                        <Col span={8}>
                            <label>贷款金额：</label>
                            <span>{data.loadMoney}元</span>
                        </Col>
                    </Row>
                    <div style={{display:this.state.supplementShow}}>
                        <div style={{fontSize:'18px',marginLeft:'36px',marginTop:'20px',color:'black'}}>补充内容
                            <span style={{fontSize:'15px',float:'right',marginRight:'228px',color:'rgba(0,0,0,0.65)'}}>
                            <span style={{marginRight:'20px'}}>财务：{data.financeVerifyName}</span>
                            <span>审核时间：{data.financialVerifyDate}</span>
                            </span>
                        </div>
                        <div style={{marginLeft:'36px',marginTop:'15px',marginRight:'215px'}}>{data.financeSupplementContent}</div>
                    </div>
                </div>
                {/*申请资料*/}
                <div id="mainCont" className="infoBox">
                    <h2 className="infoTitle">申请资料</h2>
                    <div style={{marginLeft:'20px', overflow: 'hidden'}}>
                        {
                            fileList.map((file,i)=>{
                                if(file.flag == 0){
                                    return <div className="inforContItem">
                                            <img style={{marginLeft:'15px', marginBottom:'15px'}}
                                                 key={i} 
                                                 onClick={this.handleLook.bind(this,file.url)}  
                                                 src={file.url} width='133px' height='133px'/>
                                            <p className="typeMark">{file.name}</p>
                                        </div>;
                                }else{
                                    return <div className="inforContItem">
                                            <a key={i} href={file.url} target='_blank' style={{display: 'inline-block', marginLeft:'15px', verticalAlign:'middle'}}>
                                                <img style={{marginLeft:'15px', marginBottom:'15px'}}
                                                     src="http://yinmi-test.b0.upaiyun.com//guarantee/20180928/q80v6l6lu9c0" width='133px' height='133px'/>
                                            </a>
                                            <p className="typeMark">{file.name}</p>
                                        </div>;
                                }
                            })
                        }
                    </div>
                    <Modal className="finaceModal" visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage}
                             ref="bigPicDom"
                             onMouseEnter={this.handleRotateIcon.bind(this, 'block')}
                             onMouseLeave={this.handleRotateIcon.bind(this, 'none')} />
                        <i className="rotateBtn" id="rotateBtnDom"
                                onClick={this.rotateBigPic.bind(this)}
                                onMouseEnter={this.handleRotateIcon.bind(this, 'block')}></i>
                    </Modal>
                </div>
                {/*审核意见*/}
                <div style={{marginLeft:'25px'}}>审核意见：
                    <RadioGroup onChange={this.handleOpinion} value={this.state.auditOpinion}>
                        <Radio value={0}>不通过</Radio>
                        <Radio value={1}>通过</Radio>
                        <Radio value={2}>补充资料</Radio>
                    </RadioGroup>
                </div>
                <div style={{marginLeft:'25px',marginTop:'20px'}}>不通过理由/补充内容：
                    <textarea style={{height:"200px",width:"87%",marginLeft:'145px',marginTop:'-18px'}} onChange={this.handleSupplement} placeholder="请输入不通过理由/补充内容" className="ant-input" name="financeSupplementContent" rows="3"/>
                </div>
                <div className="mainInfo" style={{marginTop:'27px',height:'45px'}}>
                    <span style={{float:'right',marginTop:'8px'}}>
                        <Button type='primary' onClick={this.handleSubmit} style={{marginRight:'18px'}}>提交</Button>
                        <Button onClick={this.handleGoBack}>取消</Button>
                    </span>
                </div>
            </div>
        );
    }
}
const application = Form.create()(applicationForm);
export default application;