import React from 'react';
import { Link } from "react-router";
import { Form,Input,Upload, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
import "./invoiceInspection.less";
import ajax from "../../utils/ajax";
import {upyun_action,upyun_domain} from "../../config/apiUrl";//upyun上传图片地址
import InvoiceReports from '../../components/reportCom/invoiceReports'
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'

class InvoiceInspections extends React.Component {
    state = {
        loading: false,
        uploading: false,
        previewVisible: false,
        previewVisibleDetails: false,
        datalist: [],
        total: 0,
        inspectionPicList: [],
        upyunAction:upyun_action,
        upyunLinkDomain:upyun_domain,
        upyunParam:{policy:'',authorization:''},
        policy:'',
        authorization:'',
        no_distinguish: false,
        wrong_pic: false,
        error_data: undefined,
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
        getPrice('ocr_invoice').then(res=>{
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
        if (!this.state.inspectionPicList.length) {
            message.error('请上传发票');
            return
        }
        confirm({
            title: '确定查询该发票？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                _this.setState({
                    loading: true
                })
                ajax.post("/admin/ocrInvoice/checkInvoice",{url: _this.state.inspectionPicList[0].url})
                .then(response => {
                    if(response.code == "0") {
                        _this.setState({
                            previewVisibleDetails: true,
                            datalist: response.data
                        },() => {
                            console.log(_this.state.datalist)
                        })
                    }else if (response.code == "4003") {
                        _this.setState({
                            no_distinguish: true,
                            error_data: response.data.msg
                        })
                    }else {
                        message.error(response.msg);
                        _this.setState({
                            wrong_pic: true
                        })
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
    closeError (i,e) {
        if( i == '1') {
            this.setState({
                no_distinguish: false
            })
        }else if ( i == '2') {
            this.setState({
                wrong_pic: false
            })
        }
    }

    go_record() {
        window.location.hash = "/invoiceInspection/invoiceInspectionList"
    }

    render() {
        const inspectionPicButton = (
            <div className="upload_pic">
                <Icon type="plus-circle" theme="outlined" style={{fontSize: "60px",marginTop: "60px",marginBottom: "20px"}}/>
                <div>请上传发票照片</div>
                <p>只可查验一年以内的发票，图片大小不超过4M</p>
            </div>
        )
        const headers={"X-Requested-With": null};
        const upyunParam=this.state.upyunParam;
        return(
            <div style={{height: '100%' }}>
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>
                        发票查验
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}} className="usedCarItem">
                    <div id="info" style={{padding:"80px 0"}} className="invoice_item">
                        <div style={{width:'466px'}} className="common_search_top">
                            <div>发票查验</div>
                            <span>发票查验将自动识别发票信息，并通过税务局查询验证发票的真实性。</span>
                        </div>
                        <div className="uoload_Inspection">
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
                        <div className="inspection_btn">
                            <Button type="primary" loading={this.state.loading} onClick={this.go_search.bind(this)} style={{width:"100px"}}>查验</Button>
                        </div>
                        {this.state.priceData?
                            <SearchCost priceData={this.state.priceData} total={this.state.total} word="查验"></SearchCost>:''
                        }
                    </div>
                    {this.state.previewVisibleDetails?
                        <InvoiceReports
                            closeMoadl = {this.closedata.bind(this)}
                            datalist = {this.state.datalist}
                        ></InvoiceReports>
                        :
                        ''
                    }
                </div>
                {this.state.no_distinguish || this.state.wrong_pic?
                <div className="error_msg_warp">
                    {this.state.no_distinguish?
                    <div className="no_distinguish">
                        <Icon type="close-circle" style={{color: "#f5222d", fontSize: "46px",marginTop: "50px", marginLeft: "152px",marginBottom: "16px"}}/>
                        <div>发票信息有误</div>
                        <p>{this.state.error_data}</p>
                        <Button type="primary" onClick={this.closeError.bind(this,"1")} style={{width:"100px"}}>确定</Button>
                    </div>
                    :
                    ''
                    }
                    {this.state.wrong_pic?
                    <div className="wrong_pic">
                        <div>图片无法识别，请重新上传</div>
                        <Button type="primary" onClick={this.closeError.bind(this,"2")} style={{width:"100px"}}>确定</Button>
                    </div>
                    :
                    ''
                    }
                </div>
                :
                ''
                }
            </div>
        )
    }
}
const invoiceInspections = Form.create()(InvoiceInspections);
export default invoiceInspections;