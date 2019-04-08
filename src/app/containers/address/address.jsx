import React from 'react';
import { Form,Input,Radio, Select , DatePicker, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs, Modal} from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
import ajax from "../../utils/ajax";
import {getPrice} from '../../utils/someJs'
import SearchCost from '../../components/searchCost/searchCost'
import AddressReport from '../../components/reportCom/addressReports'

class Address extends React.Component {
    state = {
        loading:false,
        addressType: 1
    };
    constructor(props) {
        super(props);
    };
    componentDidMount () {
        ajax.post("/admin/account/info").then(response => {
            if(response.code == "0") {
                this.setState({
                    total: response.data.total
                })
            }else {
                message.error(response.msg);
            }
        })
        getPrice('work_address_verify').then(res=>{
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

    go_search () {
        var _this = this
        if (!this.state.mobilePhone) {
            message.error("请输入手机号码！");
            return
        }else if (!this.state.address) {
            message.error("请输入地址！");
            return
        }
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
        var typeUrl = this.state.addressType==1?'/admin/riskControlPlatform/homeAddress/rc/query':'/admin/riskControlPlatform/workAddress/rc/query';
        var typeData = this.state.addressType==1?{mobilePhone:this.state.mobilePhone,homeAddress:this.state.address}:{mobilePhone:this.state.mobilePhone,companyAddress:this.state.address}
        confirm({
            title: '确定查验该用户的地址？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                _this.setState({
                    loading: true
                })
                ajax.post(typeUrl, typeData)
                .then(response => {
                    if(response.code == "0") {
                        _this.setState({
                            previewVisible: true,
                            datalist: response.data
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
        this.setState({ previewVisible: false })
    }

    go_record() {
        window.location.hash = "/address/addressList"
    }
    changType(e) {
        this.setState({
            addressType: e.target.value,
        });
    }

    render() {
        return(
            <div style={{height: '100%' }}>
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>
                        地址查验
                        <Button onClick={this.go_record.bind(this)} type="primary" ghost style={{float:"right"}}>查询记录</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{margin:'24px', minHeight: 'calc(100% - 111px)', background: '#fff'}} className="bankFlowItem">
                    <div id="info" style={{padding:"80px 0"}}>
                        <div className="common_search_top">
                            <div>地址查验</div>
                            <span>地址查验将比对手机所在位置和输入地址信息，分别可以查验家庭地址和工作地址。</span>
                        </div>
                        <FormItem
                            label="手机号"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="mobilePhone" name="mobilePhone" placeholder="请输入手机号"   onChange={this.onChange.bind(this, 'mobilePhone')}/>
                        </FormItem>
                        <FormItem
                            label="类型"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <RadioGroup onChange={this.changType.bind(this)} value={this.state.addressType}>
                                <Radio value={1}>家庭地址</Radio>
                                <Radio value={2}>工作地址</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            label="地址"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}>
                            <Input type="text" className="ant-form-text" id="address" name="address" placeholder="请输入地址"   onChange={this.onChange.bind(this, 'address')}/>
                        </FormItem>
                        <div className="submit_search">
                            <span className="submit_left"></span>
                            <Button type="primary" loading={this.state.loading} onClick={this.go_search.bind(this)} style={{width:"100px"}}>查询</Button>
                        </div>
                        {this.state.priceData?
                            <SearchCost priceData={this.state.priceData} total={this.state.total} word="查验"></SearchCost>:''
                        }
                        {this.state.previewVisible?<AddressReport
                            datalist = {this.state.datalist} 
                            closeModal = {this.closedata.bind(this)}
                        ></AddressReport>:''}
                    </div>
                </div>
            </div>
        )
    }
}
const address = Form.create()(Address);
export default address;