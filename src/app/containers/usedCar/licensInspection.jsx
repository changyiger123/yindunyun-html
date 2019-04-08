import React from 'react';
import { Link } from "react-router";
import { Form,Input,Upload, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
import "./usedCar.less";
import ajax from "../../utils/ajax";
import {upyun_action,upyun_domain} from "../../config/apiUrl";//upyun上传图片地址
import LicensReports from '../../components/reportCom/licensReports'
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'

class LicensInspection extends React.Component {
    state = {
        loading: false,
        previewVisible: false,
        previewVisibleDetails: false,
        total: 0,
        inspectionPicList: [],
        upyunAction:upyun_action,
        upyunLinkDomain:upyun_domain,
        upyunParam:{policy:'',authorization:''},
        policy:'',
        authorization:'',
        no_distinguish: false,
        wrong_pic: false,
        licensData: {},
        archiveno: '',
        number: '',
        errorMsg: '',
        uploading: false

    };
    constructor(props) {
        super(props);
    };
    componentDidMount () {
        this.setPolicy();
        ajax.post("/admin/account/info").then(response => {
            if(response.code == "0") {
                this.setState({
                    total: response.data.total
                })
            }else {
                message.error(response.msg);
            }
        })
        getPrice('driving_license_score').then(res=>{
            if(res.code == "0") {
                this.setState({
                    priceData: res.data
                })
            }else {
                message.error(res.msg)
            }
        })
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

    go_search () {
        var _this = this
        if (this.state.total-0 < this.state.priceData.discountsPrice-0) {
            confirm({
                title: '您的账户余额已不足，请先去账户中心充值',
                okText: "去充值",
                cancelText: "取消",
                onOk() {
                    window.location.hash="/accountCenter"
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
            return
        }
        if (!this.state.number) {
            message.error('请输入驾驶证号');
            return
        }else if (!this.state.archiveno) {
            message.error('请输入档案编号');
            return
        }
        confirm({
            title: '确定查询该驾驶证？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                _this.setState({
                    loading: true
                })
                ajax.post("/admin/riskControlPlatform/drivingLicense/handing/score",{number: _this.state.number, archiveno: _this.state.archiveno})
                .then(response => {
                    if(response.code == "0") {
                        _this.setState({
                            previewVisibleDetails: true,
                            licensData: response.data
                        },() => {
                            console.log(_this.state.licensData)
                        })
                    }else {
                        message.error(response.msg);
                    }
                    _this.setState({
                        loading: false
                    })
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
        
    }
    closedata () {
        this.setState({ previewVisibleDetails: false })
        window.location.reload();
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleSuccessInspectionPic=(e)=>{
        var _this = this
        if(e){
            console.log("test response:",e);
            if (e.code=="200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid,status,name,url,typeId}={uid:e.time,status:'done',name:'其他',url:this.state.upyunLinkDomain+e.url,typeId:-1};
                let inspectionPicList=this.state.inspectionPicList;
                inspectionPicList.push({uid,status,name,url,typeId});
                this.setState({
                    inspectionPicList:inspectionPicList,
                });
                ajax.post("/admin/riskControlPlatform/drivingLicense/ocr/score",{url: inspectionPicList[0].url})
                .then(response => {
                    if (response.code == "0") {
                        _this.setState({
                            licensData: response.data,
                            previewVisibleDetails: true
                        })
                    }else {
                        _this.setState({
                            no_distinguish: true,
                            errorMsg: response.msg
                        })
                    }
                });
            }
            this.setPolicy();
        }
    }
    handleBeforeInspectionPic = ( file, fileList) => {
        console.log(file.size)
        if (file.size && file.size>2097152) {
            this.setState({
                uploading: false
            })
            message.error('图片大于2M，请重新选择');
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
    closeError (i,e) {
        this.setState({
            no_distinguish: false
        })
    }

    go_record() {
        window.location.hash = "/usedCar/licensInspectionList"
    }

    render() {
        const inspectionPicButton = (
            <div className="upload_licensPic">
                <div>请上传驾驶证副页</div>
                <p>大小不超过2M</p>
                <Button type="primary" style={{width:"170px"}}>上传照片并查验</Button>
            </div>
        )
        const headers={"X-Requested-With": null};
        const upyunParam=this.state.upyunParam;
        return(
            <div style={{height: '100%' }}>
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>
                        驾驶证查验
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}} className="usedCarItem">
                    <div id="info" style={{padding:"80px 0"}} className="license_item">
                        <div style={{width: "767px"}} className="common_search_top">
                            <div>驾驶证查验</div>
                            <span>驾驶证查验会自动识别驾驶证信息并核验其真实性。</span>
                        </div>
                        <div className="inspection_box">
                            <div className="upload_Inspection">
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
                            <div className="msg_Inspection">
                                <div><span>驾驶证号：</span><Input onChange={this.onChange.bind(this, 'number')}/></div>
                                <div><span>档案编号：</span><Input onChange={this.onChange.bind(this, 'archiveno')}/></div>
                                <Button loading={this.state.loading} type="primary" onClick={this.go_search.bind(this)} disabled={!this.state.number||!this.state.archiveno} style={{width:"170px", marginLeft:"83px",marginTop:"50px"}}>手动查验</Button>
                            </div>
                        </div>
                        {this.state.priceData?
                            <SearchCost priceData={this.state.priceData} total={this.state.total} word="查验"></SearchCost>:''
                        }
                    </div>
                </div>
                {this.state.no_distinguish?
                <div className="error_msg_warp">
                    <div className="no_distinguish">
                        <Icon type="close-circle" style={{color: "#f5222d", fontSize: "46px",marginTop: "50px", marginLeft: "152px",marginBottom: "16px"}}/>
                        <div>驾驶证信息有误</div>
                        <p style={{paddingLeft:"20px",paddingRight:"20px",margin:"0"}}>{this.state.errorMsg}</p>
                        <Button type="primary" onClick={this.closeError.bind(this)} style={{width:"100px"}}>确定</Button>
                    </div>
                </div>
                :
                ''
                }
                {this.state.previewVisibleDetails?
                <LicensReports
                    datalist = {this.state.licensData} 
                    closeMoadl = {this.closedata.bind(this)}
                ></LicensReports>
                :
                ''
                }
                
            </div>
        )
    }
}
const licensInspection = Form.create()(LicensInspection);
export default licensInspection;