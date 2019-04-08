import React, { Component } from 'react';
import './enterpriseInfo.less'
import {Input, DatePicker, Button, Checkbox, Upload, Modal, Icon, message} from 'antd'
import ajax from '../../utils/ajax'
import {upyun_action,upyun_domain} from "../../config/apiUrl";//upyun上传图片地址
import Moment from 'moment';

import user from '../../images/user.png'
import logo from '../../images/logo.png'
import steps02 from '../../images/steps02.png'
import upload_bg from '../../images/upload_bg.png'

class EnterpriseInfo extends Component {
    state = {
        startValue1: null,
        endValue1: null,
        startApplyDate1: undefined,
        endApplyDate1:undefined,
        uploading: false,
        upyunParam: {},
        inspectionPicList: [],
        checked: false,
        upyunAction:upyun_action,
        upyunLinkDomain:upyun_domain,
        upyunParam:{policy:'',authorization:''},
        policy:'',
        authorization:'',
        license_error: false,
        license_error2: false,
        userNumber: '',
        error_msg: ''
    }
    constructor(props) {
        super(props);
        this.disabledStartDate1 = this.disabledStartDate1.bind(this);
        this.disabledEndDate1 = this.disabledEndDate1.bind(this);
    };
    componentWillMount () {
        if (!window.localStorage.getItem("access_token")) {
            window.location.hash = "login";
        } else {
            this.setState({
                userNumber: window.localStorage.getItem("mobilePhone")
            })
        }
    }
    componentDidMount () {
        this.setPolicy();
    }

    //普通字段输入更改state
    onChange(field, e){
        let valStr = e.target.value;
        console.log(field, 'change', valStr);
        this.setState({
            [field]: valStr,
        });
    };

    doCheck = (e) => {
        this.setState({
            checked: e.target.checked
        })
    }
    logout () {
        window.location.hash="/login"
    }

    go_homepage () {
        window.location.hash="/"
    }

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
    onChangeStartDate1=(value, dateString) =>{
        this.setState({
            startApplyDate1: value,
            createTime: dateString,
        }, ()=> {
            console.log(this.state.startApplyDate1)
        });
    };
    onChangeEndDate1=(value, dateString) =>{
        this.setState({
            endApplyDate1: value,
            timeLimit: dateString,
        }, ()=> {
            console.log(this.state.endApplyDate1)
        });
    };

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleSuccessInspectionPic=(e)=>{
        if(e){
            console.log("test response:",e);
            this.setState({
                uploading: false
            })
            if (e.code=="200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid,status,name,url,typeId}={uid:e.time,status:'done',name:'其他',url:this.state.upyunLinkDomain+e.url,typeId:-1};
                let inspectionPicList=this.state.inspectionPicList;
                inspectionPicList.push({uid,status,name,url,typeId});
                this.setState({
                    inspectionPicList:inspectionPicList
                });
                var _this=this
                ajax.post("/admin/register/ocr/businessLicense/info",{picUrl: inspectionPicList[0].url})
                .then(response => {
                    if (response.code == "0") {
                        _this.setState({
                            orgnizationCode: response.data.reg_num,
                            enterpriseName: response.data.name,
                            enterpriseType: response.data.type,
                            companyAddress: response.data.address,
                            legalPerson: response.data.person,
                            registerFund: response.data.capital,
                            createTime: response.data.establish_date,
                            startApplyDate1: response.data.establish_date?Moment(this.changeDate(response.data.establish_date)) : undefined,
                            timeLimit: response.data.valid_period,
                            endApplyDate1: response.data.valid_period?Moment(this.changeDate(response.data.valid_period)) : undefined,
                            picUrl: inspectionPicList[0].url
                        })
                    }else if(response.code == "707") {
                        _this.setState({
                            license_error2: true
                        })
                    } else {
                        _this.setState({
                            license_error: true
                        })
                    }
                });
            }
            this.setPolicy();
        }
    }
    handleBeforeInspectionPic = ( file, fileList) => {
        console.log(file.size)
        if (file.size && file.size>4194304) {
            this.setState({
                uploading: false
            })
            message.error('图片大于4M，请重新选择');
            return false
        }else {
            this.setState({
                uploading: true
            })
        }
    }

    handleChangeInspectionPic = ({ fileList }) => {
        console.log("filelist pic dddddd:",fileList);
        if (fileList.length < this.state.inspectionPicList.length) {
            this.setState({
                inspectionPicList:fileList,
                uploading: false,
            })
        }
    }
    handleCancel = () => this.setState({ previewVisible: false })
    //获取又拍云签名
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
        var dateformatter=date.getFullYear()+month+day;
        var uuid1=(((1+Math.random())*0x10000)|0).toString(16).substring(1)+(((1+Math.random())*0x10000)|0).toString(16).substring(1);
        var uuid2=(((1+Math.random())*0x10000)|0).toString(16).substring(1)+(((1+Math.random())*0x10000)|0).toString(16).substring(1)
        var uuid=uuid1+uuid2;
        ajax.post("/admin/upyun/policy",{saveKey:'/guarantee/'+dateformatter+"/"+Number((Math.random()*10000000).toString().substr(0,6) + Date.now()).toString(36)})
        //ajax.post("/admin/upyun/policy",{saveKey:'/guarantee/'+dateformatter+"/"+uuid})
            .then(response =>{
                if(response.code=='0'){
                    console.log("policy的值：");
                    console.log("policy",response.data.policy);
                }
                var policy=response.data.policy;
                var authorization=response.data.authorization;
                this.setState({
                    upyunParam:{policy:policy,authorization:authorization},
                });
            });
    }
    changeDate(time) {
        console.log(time.slice(0,4)+"-"+time.slice(4,6)+"-"+time.slice(6,8))
        return time.slice(0,4)+"-"+time.slice(4,6)+"-"+time.slice(6,8)
    }
    close_infoError (i ,e) {
        if (i == 1) {
            this.setState({
                license_error: false,
                inspectionPicList: []
            })
        }else if (i == 2) {
            this.setState({
                license_error2: false
            })
        }
    }
    submit_msg () {
        if (this.state.inspectionPicList.length == 0) {
            this.setState({
                error_msg:'请上传营业执照'
            })
            return
        } else if (!this.state.orgnizationCode) {
            this.setState({
                error_msg:'请输入统一社会信用代码/注册号/组织机构代码'
            })
            return
        } else if (!this.state.enterpriseName) {
            this.setState({
                error_msg:'请输入企业名称'
            })
            return
        } else if (!this.state.enterpriseType) {
            this.setState({
                error_msg:'请输入企业类型'
            })
            return
        } else if (!this.state.companyAddress) {
            this.setState({
                error_msg:'请输入营业地址'
            })
            return
        } else if (!this.state.legalPerson) {
            this.setState({
                error_msg:'请输入法人代表'
            })
            return
        } else if (!this.state.registerFund) {
            this.setState({
                error_msg:'请输入注册资本'
            })
            return
        } else if (!this.state.createTime) {
            this.setState({
                error_msg:'请输入成立日期'
            })
            return
        } else if (!this.state.timeLimit) {
            this.setState({
                error_msg:'请输入终止日期'
            })
            return
        } else if (!this.state.contactPerson) {
            this.setState({
                error_msg:'请输入联系人'
            })
            return
        } else if (!this.state.contactMobile) {
            this.setState({
                error_msg:'请输入联系方式'
            })
            return
        } else if (!this.state.email) {
            this.setState({
                error_msg:'请输入邮箱'
            })
            return
        }
        ajax.post("/admin/register/enterprise/verify",{
            certificatePicUrl: this.state.inspectionPicList[0].url,
            orgnizationCode: this.state.orgnizationCode,
            enterpriseName: this.state.enterpriseName,
            enterpriseType: this.state.enterpriseType,
            companyAddress: this.state.companyAddress,
            legalPerson: this.state.legalPerson,
            registerFund: this.state.registerFund,
            createTime: this.state.createTime,
            timeLimit: this.state.timeLimit,
            contactPerson: this.state.contactPerson,
            contactMobile: this.state.contactMobile,
            email: this.state.email
        })
        .then(response => {
            if (response.code == "0") {
                window.location.hash = "/registerAlready"
            }else {
                // message.error(response.msg)
                this.setState({
                    error_msg: response.msg
                })
            }
        });
    }
    go_index(){
        window.location.hash="/riskQuery"
    }

    render() {
    // if (!window.localStorage.getItem("access_token")) {
    //     window.location.hash = "/";
    // }
        const headers={"X-Requested-With": null};
        const upyunParam=this.state.upyunParam;
        const inspectionPicButton = (
            <div className="upload_license">
                <img src={upload_bg} alt="upload"/>
            </div>
        )
        return (
            <div className="EnterpriseInfo">
                <header className="common-header">
                    <img onClick={this.go_homepage.bind(this)} className="logo1" src={logo} alt=""/>
                    <div className="go-login"><img src={user} alt="user" style={{marginRight:"10px"}}/>{this.state.userNumber}, <span onClick={this.logout.bind(this)}>退出</span></div>
                </header>
                <div className="enterprise-info-content">
                    <h2>完善企业资料<span onClick={this.go_index.bind(this)}>跳过此步-></span></h2>
                    <img src={steps02} alt="steps" />
                    <div className="steps02-details">
                        <span className="step1">注册银盾云</span>
                        <span className="step2">完善企业资料</span>
                        <span className="step3">资料审核</span>
                    </div>
                    <div className="free_money">完善资料并审核通过，送100元体验金</div>
                    <ul className="enterprise-msg">
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i>营业执照：</span>
                            </div>
                            <div className="info-item-right">
                                <div className="upload-license">
                                    <Upload
                                        action={this.state.upyunAction}
                                        name="file"
                                        listType="picture-card"
                                        fileList={this.state.inspectionPicList}
                                        onPreview={this.handlePreview}
                                        beforeUpload= {this.handleBeforeInspectionPic}
                                        onSuccess={this.handleSuccessInspectionPic}
                                        onChange={this.handleChangeInspectionPic}
                                        data={upyunParam}
                                        headers={headers}
                                        accept={"image/png, image/jpeg"}
                                        disabled = {this.state.uploading}
                                    >
                                        {this.state.inspectionPicList.length >= 1 ? null : inspectionPicButton}
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                    </Modal>
                                </div>
                                <p>上传营业执照图片，自动识别信息； <br/>请确保营业执照图片所有信息清晰可见，内容真实有效，无任何修改； <br/>文件大小不超过3M，格式支持.jpg.jpeg.png.pdf </p>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 统一社会信用代码/注 册号/组织机构代码：</span>
                            </div>
                            <div className="info-item-right">
                                <Input value={this.state.orgnizationCode} onChange={this.onChange.bind(this, 'orgnizationCode')} placeholder="上传营业执照照片，自动填写" size="large"/>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 企业名称：</span>
                            </div>
                            <div className="info-item-right">
                                <Input value={this.state.enterpriseName} onChange={this.onChange.bind(this, 'enterpriseName')} placeholder="上传营业执照照片，自动填写" size="large"/>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 企业类型：</span>
                            </div>
                            <div className="info-item-right">
                                <Input value={this.state.enterpriseType} onChange={this.onChange.bind(this, 'enterpriseType')} placeholder="上传营业执照照片，自动填写" size="large"/>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 营业地址：</span>
                            </div>
                            <div className="info-item-right">
                                <Input value={this.state.companyAddress} onChange={this.onChange.bind(this, 'companyAddress')} placeholder="上传营业执照照片，自动填写" size="large"/>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 法人代表：</span>
                            </div>
                            <div className="info-item-right">
                                <Input value={this.state.legalPerson} onChange={this.onChange.bind(this, 'legalPerson')} placeholder="上传营业执照照片，自动填写" size="large"/>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 注册资本：</span>
                            </div>
                            <div className="info-item-right">
                                <Input value={this.state.registerFund} onChange={this.onChange.bind(this, 'registerFund')} placeholder="上传营业执照照片，自动填写" size="large" style={{width:"260px"}}/>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 成立日期：</span>
                            </div>
                            <div className="info-item-right">
                                <DatePicker 
                                    disabledDate={this.disabledStartDate1}
                                    placeholder="上传营业执照照片，自动填写"
                                    onChange={this.onChangeStartDate1}
                                    value={this.state.startApplyDate1}
                                    size="large"
                                    style={{width:"260px"}}
                                />
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 终止日期：</span>
                            </div>
                            <div className="info-item-right">
                                <DatePicker 
                                    disabledDate={this.disabledEndDate1}
                                    placeholder="上传营业执照照片，自动填写"
                                    onChange={this.onChangeEndDate1}
                                    value={this.state.endApplyDate1}
                                    size="large"
                                    style={{width:"260px"}}
                                />
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 联系人：</span>
                            </div>
                            <div className="info-item-right">
                                <Input value={this.state.contactPerson} onChange={this.onChange.bind(this, 'contactPerson')} placeholder="请输入联系人姓名" size="large" style={{width:"260px"}}/>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 联系方式：</span>
                            </div>
                            <div className="info-item-right">
                                <Input value={this.state.contactMobile} onChange={this.onChange.bind(this, 'contactMobile')} placeholder="请输入电话号或手机号码" size="large" style={{width:"260px"}}/>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left">
                                <span><i>*</i> 邮箱：</span>
                            </div>
                            <div className="info-item-right">
                                <Input value={this.state.email} onChange={this.onChange.bind(this, 'email')} placeholder="请输入邮箱地址" size="large" style={{width:"260px"}}/>
                            </div>
                        </li>
                        <li>
                            <div className="info-item-left"></div>
                            <div className="info-item-right" style={{color: '#e53939'}}>{this.state.error_msg}</div>
                        </li>
                        <li>
                            <div className="info-item-left"></div>
                            <div className="info-item-right">
                                <Button type="primary" style={{width:"320px"}} onClick={this.submit_msg.bind(this)}>确定提交资料</Button>
                            </div>
                        </li>
                        {/* <li>
                            <div className="info-item-left"></div>
                            <div className="info-item-right">
                                <Checkbox onChange={this.doCheck.bind(this)} checked={this.state.checked}>我已同意并阅读<span style={{color:"#1890ff"}}>《银盾云网站服务条款》</span></Checkbox>
                            </div>
                        </li> */}
                    </ul>
                </div>
                {this.state.license_error?
                    <div className="info-error-warp">
                        <div className="info-error-content">
                            <div onClick={this.close_infoError.bind(this, 1)} className="info-error-close">x</div>
                            <div className="info-error-title">营业执照识别有误</div>
                            <div className="info-error-msg">请确保图片清晰有效，并从新上传。</div>
                            <Button onClick={this.close_infoError.bind(this, 1)} type="primary" style={{width:"180px", marginLeft:"135px"}}>确定</Button>
                        </div>
                    </div>
                    :
                    ''
                }
                {this.state.license_error2?
                    <div className="info-error-warp">
                        <div className="info-error-content">
                            <div onClick={this.close_infoError.bind(this, 2)} className="info-error-close">x</div>
                            <div className="info-error-title">营业执照ocr识别次数过多</div>
                            <div className="info-error-msg">请手动填写营业执照信息，或等待30分钟后重新上传</div>
                            <Button onClick={this.close_infoError.bind(this, 2)} type="primary" style={{width:"180px", marginLeft:"135px"}}>确定</Button>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        );
    }
}

export default EnterpriseInfo;
