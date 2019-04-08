import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button,Upload,Modal,Icon ,Table, Pagination , Row, Col } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
const crypto=require('crypto');
import "./riskReport.less";
import ajax from "../../utils/ajax";
import {message} from "antd/lib/index";
import {upyun_action,upyun_domain} from "../../config/apiUrl";//upyun上传图片地址
class applicationForm extends React.Component {
    state = {
        applyNo:this.props.params.id,
        supplementShow:this.props.params.stat==0?'none':'',
        supplementTitle:this.props.params.stat==0?'上传照片':'补充资料',
        data:{},
        upyunParam:{policy:'',authorization:''},
        policy:'',
        authorization:'',
        previewVisible: false,
        previewImage: '',
        previewImageTit: '',
        fileList: [],
        otherTypeId:'',
        disabled:false,
        upyunAction:upyun_action,
        upyunLinkDomain:upyun_domain,
    };
    constructor(props) {
        super(props);
        this.rotateVal = 0;
    };

    componentWillMount= (e) =>{
        this._isMounted = true;
        ajax.post("/admin/autoloanApply/waitRemitApply/info",{applyNo:this.state.applyNo})
            .then(response =>{
                console.log("返回的数据：");
                console.log(response);
                if(response.code=="0") {
                    console.log(response.data);
                    let data = response.data;
                    this.setState({
                        data:data,
                    });
                    let fileList = this.state.data.applyResource;
                    for(let i=0; i<fileList.length; i++){
                        if(fileList[i].url.indexOf(".mp4") != -1){
                            // fileList[i].url = "http://yinmi-test.b0.upaiyun.com//guarantee/20180928/q80v6l6lu9c0";
                        }
                    }
                    this.setState({
                        fileList: fileList,
                        //fileList:this.state.data.applyResource,
                        otherTypeId:this.state.data.otherTypeId,
                    })
                    if(this.state.fileList.length<1){
                        this.setState({
                            disabled:true,
                        });
                    }
                    console.log(this.state.data);
                    console.log("fileList",this.state.fileList);
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
        this.setPolicy();
    };
    componentWillUnmount() {
        this._isMounted = false
    }

    handleCancel = () => {
        this.setState({ previewVisible: false })
        this.rotateVal = -90;
        this.rotateBigPic();
    }

    handlePreview = (file) => {
        console.log("查看文件数据：");
        console.log(file);
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewImageTit: file.name,
            previewVisible: true,
        });
    }

   handleChange = ({ fileList }) => {
        if(fileList.length<this.state.fileList.length) {
            this.setState({fileList})
        }
        console.log("list length:",this.state.fileList.length);
        if(this.state.fileList.length<1){
            this.setState({
               disabled:true,
            });
        }else{
            this.setState({
               disabled:false,
            });
        }
    }

    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "";
       
        var uuid = s.join("");
        return uuid;
    }

    setPolicy=(e)=>{
        var date=new Date();
        var month=date.getMonth()+1;
        if(month>=1&&month<=9){
            month="0"+month;
        }
        var day=date.getDate();
        if(day>=0&&day<=9){
            day="0"+day;
        }
        var dateformatter=date.getFullYear()+""+month+""+day;
        var uuid1=(((1+Math.random())*0x10000)|0).toString(16).substring(1)+(((1+Math.random())*0x10000)|0).toString(16).substring(1);
        var uuid2=(((1+Math.random())*0x10000)|0).toString(16).substring(1)+(((1+Math.random())*0x10000)|0).toString(16).substring(1)
        var uuid=uuid1+uuid2;
        ajax.post("/admin/upyun/policy",{saveKey:'/guarantee/'+dateformatter+"/"+this.uuid()})
        //ajax.post("/admin/upyun/policy",{saveKey:'/guarantee/'+dateformatter+"/"+uuid})
            .then(response =>{
                if(response.code=='0'){
                    console.log("policy",response.data.policy);
                }
                var policy=response.data.policy;
                var authorization=response.data.authorization;
                this.setState({
                    upyunParam:{policy:policy,authorization:authorization},
                });
            });
    }

    handleSucc=(e)=>{
        if(e){
            console.log("response result hahah",e);
            if(e.code=='200'){
                console.log("upyun上传成功",e);
                let names = null;
                let urls = this.state.upyunLinkDomain+e.url;
                let typeIds = null;
                if(e.mimetype == "video/mp4"){
                    names = "视频采集";
                    //urls = 'http://yinmi-test.b0.upaiyun.com//guarantee/20180928/q80v6l6lu9c0';
                    typeIds = 10;
                }else if(e.mimetype == "image/jpeg" || e.mimetype == "image/png"){
                    names = "其他";
                    typeIds = 9;
                }
                //let {uid,status,name,url,typeId}={uid:e.time,status:'done',name:'其他',url:this.state.upyunLinkDomain+e.url,typeId:this.state.otherTypeId};
                let {uid,status,name,url,typeId}={uid:e.time,status:'done',name:names,url:urls,typeId:typeIds};
                let fileList=this.state.fileList;
                fileList.push({uid,status,name,url,typeId});
                this.setState({
                   fileList:fileList,
                });
                if(this.state.fileList.length<1){
                    this.setState({
                        disabled:true,
                    });
                }else{
                    this.setState({
                        disabled:false,
                    });
                }
                this.setPolicy();
            }else{
                message.error(e.msg);
            }
        }
    }

    submitPicture=(e)=>{
        let {applyNo,fileList}=this.state;
        console.log("urlList",{applyNo,fileList});
        if(applyNo){
            ajax.post("/admin/autoloanApply/waitRemitApply/save",{applyNo:applyNo,applyResource:fileList})
                .then(response =>{
                    console.log(response);
                    if(response.code==0) {
                        window.location.hash = "/ApplicationForPayment/remitApply";
                    }else{
                        console.log("list"+response.msg);
                        message.error(response.msg);
                    }
                });
        }else{
            message.error("无申请单号！")
        }
    }

    cancelEdit=(e)=>{
        window.location.hash="/ApplicationForPayment/remitApply";
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
        const { getFieldDecorator } = this.props.form;
        const { applyNo } = this.state;
        const  data  = this.state.data;
        const  loanInfo  = this.state.data.loanInfo || {};
        const { previewVisible, previewImage, fileList } = this.state;
        const upyunParam=this.state.upyunParam;
        const headers={"X-Requested-With": null};
        let previewImageComp = null;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text"></div>
            </div>
        );

        if(!applyNo){
            window.location.hash = "login";
        }

        if(this.state.previewImageTit.replace(/(^\s*)|(\s*$)/g, "") == "视频采集"){
            previewImageComp = <a href={previewImage} target="_blank">
                                    <img alt="example" style={{ width: '100%' }} src="http://yinmi-test.b0.upaiyun.com//guarantee/20181016/07381213b3ea48f2b4f5984bed885dc8" title={this.state.previewImageTit}
                                                        ref="bigPicDom"
                                                        onMouseEnter={this.handleRotateIcon.bind(this, 'block')}
                                                        onMouseLeave={this.handleRotateIcon.bind(this, 'none')} />
                                </a>;
        }else{
            previewImageComp = <img alt="example" style={{ width: '100%' }} src={previewImage} title={this.state.previewImageTit}
                                    ref="bigPicDom"
                                    onMouseEnter={this.handleRotateIcon.bind(this, 'block')}
                                    onMouseLeave={this.handleRotateIcon.bind(this, 'none')} />;
        }

        return(
            <div className="auditList">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>打款申请</Breadcrumb.Item>
                    <Breadcrumb.Item>打款申请编辑</Breadcrumb.Item>
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
                        <div style={{fontSize:'18px',marginLeft:'36px',marginTop:'20px',color:'black'}}>待补充内容
                            <span style={{fontSize:'15px',float:'right',marginRight:'228px',color:'rgba(0,0,0,0.65)'}}>
                            <span style={{marginRight:'20px'}}>财务：{data.financeVerifyName}</span>
                            <span>审核时间：{data.financialVerifyDate}</span>
                            </span>
                        </div>
                        <div style={{marginLeft:'36px',marginTop:'15px',marginRight:'215px'}}>{data.financeSupplementContent}</div>
                    </div>
                </div>
                {/*上传照片*/}
                <div id="mainCont" className="infoBox">
                    <div className='uploadTitle'>{this.state.supplementTitle}</div>
                    <div className='showPic clearfix'>
                        <Upload
                            action={this.state.upyunAction}
                            name="file"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange.bind(this)}
                            onSuccess={this.handleSucc}
                            data={upyunParam}
                            headers={headers}
                        >
                            {fileList.length >= 30 ? null : uploadButton}
                        </Upload>
                        {/* <Modal className="remiEditModal" visible={previewImage.indexOf(".mp4")!=-1?false:previewVisible} footer={null} onCancel={this.handleCancel}> */}
                        {/* <Modal className="remiEditModal" visible={previewImage.indexOf(".jpg")!=-1|previewImage.indexOf(".png")!=-1?previewVisible:false} footer={null} onCancel={this.handleCancel}> */}
                        <Modal className="remiEditModal" visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            {previewImageComp}
                            <i className="rotateBtn" id="rotateBtnDom"
                                onClick={this.rotateBigPic.bind(this)}
                                onMouseEnter={this.handleRotateIcon.bind(this, 'block')}></i>
                        </Modal>
                        {/* <Modal visible={previewImage} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal> */}
                    </div>
                    <div className="submitPic">
                        <Button disabled={this.state.disabled} type="primary" style={{marginRight:'20px'}} onClick={this.submitPicture.bind(this)}>提交</Button>
                        <Button onClick={this.cancelEdit.bind(this)}>取消</Button>
                    </div>
                </div>
            </div>
        );
    }
}
const application = Form.create()(applicationForm);
export default application;