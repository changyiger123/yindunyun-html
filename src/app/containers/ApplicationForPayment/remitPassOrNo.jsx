import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button,Upload,Modal,Icon ,Table, Pagination , Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import "./riskReport.less";
import ajax from "../../utils/ajax";
import {message} from "antd/lib/index";
class applicationForm extends React.Component {
    state = {
        applyNo:this.props.params.id,
        mainColumn:this.props.params.column==0?'打款申请':'打款审核',
        noPassShow:this.props.params.stat!=1?'none':'',
        supplementShow:this.props.params.stat!=2?'none':'',
        previewVisible:false,
        previewImage:'',
        data:{},
        fileList:[],
        riskReport:[],
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
                        riskReport:data.auditList,
                    });
                }else{
                    message.error(response.msg);
                }
            });
    };
    componentWillUnmount() {
        this._isMounted = false
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

    handleCancel = () => {
        this.setState({ previewVisible: false })
        this.rotateVal = -90;
        this.rotateBigPic();
    }

    handleLook(e){
        this.setState({
            previewVisible:true,
            previewImage:e,
        });
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
        const riskReport=this.state.riskReport;


        if(!applyNo){
            window.location.hash = "login";
        }

        return(
            <div className="auditList">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>{this.state.mainColumn}</Breadcrumb.Item>
                    <Breadcrumb.Item>财务审核结果</Breadcrumb.Item>
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
                    <div style={{display:this.state.noPassShow}}>
                        <div style={{fontSize:'18px',marginLeft:'36px',marginTop:'20px',color:'black'}}>不通过理由
                            <span style={{fontSize:'15px',float:'right',marginRight:'228px',color:'rgba(0,0,0,0.65)'}}>
                            <span style={{marginRight:'20px'}}>财务：{data.financeVerifyName}</span>
                            <span>审核时间：{data.financialVerifyDate}</span>
                            </span>
                        </div>
                        <div style={{marginLeft:'36px',marginTop:'15px',marginRight:'215px'}}>{data.financeSupplementContent}</div>
                    </div>
                    <div style={{display:this.state.supplementShow}}>
                        <div style={{fontSize:'18px',marginLeft:'36px',marginTop:'20px',color:'black'}}>待补充内容
                        <span style={{fontSize:'15px',float:'right',marginRight:'228px',color:'rgba(0,0,0,0.65)'}}>
                            <span style={{marginRight:'20px'}}>财务：{data.financeVerifyName}</span>
                            <span>审核时间：{data.financialVerifyDate}</span>
                            </span>
                        </div>
                        <div style={{marginLeft:'36px',marginTop:'15px',marginRight:'215px'}}>{data.financeSupplementContent}</div>
                    </div>
                </div>
                {/*风控报告*/}
                {riskReport.map((report,i)=>
                <div key={i} id="mainCont" className="infoBox">
                    <h2 className="infoTitle">{report.title}
                        <span>审核员：{report.verifyName}</span>
                        <span>审核时间：{report.verifyTime}</span>
                    </h2>
                    <span className="riskInfo">{report.report}</span>
                    <br/>
                    {report.title == "风控报告" && data.hasTongDunReport == "1"?
                        <Button type="primary" style={{margin: "13px 8px 0 32px"}} onClick={this.searchRiskReport.bind(this,"1")}>查看多维度反欺诈报告</Button>
                        :
                        ''
                    }
                    {report.title == "风控报告" && data.hasYouFenReport == "1"?
                        <Button type="primary" style={{marginTop: "13px"}} onClick={this.searchRiskReport.bind(this,"2")}>查看银联信用报告</Button>
                        :
                        ''
                    }
                </div>)}
                {/*申请资料*/}
                <div id="mainCont" className="infoBox">
                    <h2 className="infoTitle">申请资料</h2>
                    <div style={{marginLeft:'20px', overflow: 'hidden'}}>
                    {
                        fileList.map((file,i)=>{
                            if(file.flag == 0){
                                return <div className="inforContItem"><img key={i} width='150px' height='150px' style={{marginLeft:'15px', marginBottom:'15px'}} 
                                            src={file.url}
                                            key={i} 
                                            onClick={this.handleLook.bind(this,file.url)} /><p className="typeMark">{file.name}</p></div>;
                            }else if(file.flag == 1){
                                return <div className="inforContItem"><a key={i} href={file.url} target='_blank' style={{display: 'inline-block', marginLeft:'15px', marginBottom:'15px', verticalAlign:'middle'}}>
                                           <img width='150px' height='150px' src="http://yinmi-test.b0.upaiyun.com//guarantee/20180928/q80v6l6lu9c0" />
                                       </a><p className="typeMark">{file.name}</p></div>;
                            }
                        })
                    }
                    </div>
                    <Modal className="modelPop" visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage}
                             ref="bigPicDom"
                             onMouseEnter={this.handleRotateIcon.bind(this, 'block')}
                             onMouseLeave={this.handleRotateIcon.bind(this, 'none')} />
                        <i className="rotateBtn" id="rotateBtnDom"
                                onClick={this.rotateBigPic.bind(this)}
                                onMouseEnter={this.handleRotateIcon.bind(this, 'block')}></i>
                    </Modal>
                </div>
            </div>
        );
    }
}
const application = Form.create()(applicationForm);
export default application;