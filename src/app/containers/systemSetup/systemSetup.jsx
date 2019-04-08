import React from 'react';
import { Link } from "react-router";
import {Form, Alert, Radio, Button, Input, validator, Breadcrumb, Pagination, Row, Col, message} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import "./systemSetup.less";
import reqwest from 'reqwest';
import ajax from "../../utils/ajax";

const Review = [
    { label: '始终开启', value: '0' },
    { label: '关闭', value: '-1' },
    { label: '金额', value: '2' },
];
const finalJudgment = [
    { label: '始终开启', value: '0' },
    { label: '关闭', value: '-1' },
    { label: '金额', value: '2'},
];
const sendMoney = [
    { label: '先登记GPS再打款', value: '0' },
    { label: '直接打款', value: '1' }
];

class systemSetupForm extends React.Component {
    state = {
        disabled:true,
        disabled2:true,
        disabled3:true,
        money1:'',
        money2:'',
        show: false,
        show1:false,
        show2:false,
        show3:false,
        value2: '',
        value3: '',
        value4: ''
    };

    onChange2 = (e) => {
        this.setState({
            value2: e.target.value,
        });
        if(e.target.value !="2"){
            this.setState({
                disabled: true,
                show:false,
                show2:false,
                show3:false,
                show1:false,
                money1:'',
            });
        }
        else{
            this.setState({
                disabled: false,
            });
        }
        if(e.target.value=='-1'){
            this.setState({
                value3:'-1',
                money1:'',
                money2:'',
                disabled3:true,
                disabled2:true,
            });
        }else {
            this.setState({
               disabled3:false,
               value3:'',
            });
        }
    };

    onChange3 = (e) => {
        this.setState({
            value3: e.target.value,
        });
        if(e.target.value !="2"){
            this.setState({
                disabled2:true,
                show:false,
                show2:false,
                show3:false,
                show1:false,
                money2:'',
            });
        }else{
            this.setState({
                disabled2:false,
            });
        }
    };
    onChange4  = (e) => {
        this.setState({
            value4: e.target.value,
        });
    };

    checkMoney=(e)=>{
        const formData = this.props.form.getFieldsValue();
        let money1=parseInt(formData["money1"]);
        let money2=parseInt(formData["money2"]);
        if(money1>0){
            this.setState({
               show2:false,
            });
        }
        if(money2>0){
            this.setState({
               show3:false,
            });
        }
        if(money2 < money1){
            this.setState({
                show: true,
                show1:true,
            });
        }else
        {
            this.setState({
               show:false,
                show1:false,
            });
        }
    };
    checkFor1=(e)=>{
        const formData = this.props.form.getFieldsValue();
        if(formData["money1"]==undefined || formData["money1"]==''){
            this.setState({
               show2:true,
                show1:true
            });
        }
    }
    checkFor2=(e)=>{
        const formData = this.props.form.getFieldsValue();
        if(formData["money2"]==undefined || formData["money2"]==''){
            this.setState({
                show3:true,
                show1:true
            });
        }
    }

    handleCancel=(e)=>{
       /* this.setState({
            money1:'',
            money2:'',
            value2: '',
            value3: '',
            value4: '',
            disabled:true,
            disabled2:true,
            disabled3:true,
            show: false,
            show1:false,
            show2:false,
            show3:false,
        });
        this.props.form.resetFields();*/
       this.initial();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const formData = this.props.form.getFieldsValue();
        let {value2, value3, value4} = this.state;
        if (value2 == '') {
            message.warn("请选择复审");
        } else if (value3 == '') {
            message.warn("请选择终审");
        } else if (value4 == '') {
            message.warn("请选择二手车打款");
        } else {

            if (value2 == '2') {
                value2 = formData["money1"];
            }
            if (value3 == '2') {
                value3 = formData["money2"];
            }
            if (this.state.value2 == '2' && this.state.value3 == '2' && formData["money1"] == undefined && formData["money2"] == undefined) {
                this.setState({
                    show1: true,
                    show2: true,
                    show3: true,
                });
            } else if (this.state.value2 == '2' && formData["money1"] == undefined) {
                this.setState({
                    show1: true,
                    show2: true,
                });
            } else if (this.state.value3 == '2' && formData["money2"] == undefined) {
                this.setState({
                    show1: true,
                    show3: true,
                });
            } else {
                ajax.post("/admin/sConfig/sysConfig/save", {
                    secondVerify: value2,
                    lastVerify: value3,
                    secondCarTransfer: value4
                })
                    .then(response => {
                        console.log(response);
                        if (response.code == "0") {
                            window.location.reload();
                        } else {
                            console.log("list" + response.msg);
                            message.error(response.msg);
                        }
                    });
            }

        }
        ;
    }
    initial=()=>{
        ajax.post("/admin/sConfig/saved/data").then(response=>{
            console.log("system initial:",response);
            if(response.code=="0"){
                if(response.data){
                    var secondAudit=response.data.secondAudit;
                    var lastAudit=response.data.lastAudit;
                    var secondCarTransfer=response.data.secondCarTransfer;
                    if(secondAudit){
                        if(parseInt(secondAudit)<1){
                            this.setState({
                                value2:secondAudit,
                            })
                        }else {
                            this.setState({
                                value2:'2',
                                money1:secondAudit,
                                disabled:false,
                            })
                        }
                    }
                    if(lastAudit){
                        if(parseInt(lastAudit)<1){
                            this.setState({
                                value3:lastAudit,
                            })
                        }else{
                            this.setState({
                                value3:'2',
                                money2:lastAudit,
                                disabled2:false,
                            })
                        }
                        if(parseInt(lastAudit)>=0){
                            this.setState({
                                disabled3:false,
                            })
                        }
                    }
                    if(secondCarTransfer){
                        this.setState({
                            value4:secondCarTransfer,
                        })
                    }
                }
            }
        });
    }
   componentDidMount=()=>{
      this.initial();
   }
    render() {
        let self = this;
        const { getFieldDecorator } = this.props.form;
        const { show } = this.state.show ;
        const money1=this.state.money1;
        console.log("ttttt:",money1);

        return (
            <div className="systemSetup">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
                    <Breadcrumb.Item>系统设置</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{ margin: 24,padding:'15% 20px', background: '#fff', minHeight: 780 }}>
                    {/*查询选项*/}
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem label="复审：" >
                            <RadioGroup options={Review} onChange={this.onChange2} value={this.state.value2} />
                            {getFieldDecorator('money1', {
                                initialValue:this.state.money1,
                                rules:[{ validator: this.checkMoney}]
                            })(
                                <Input  name="money1"  onBlur={this.checkFor1} type="text" className="moneyInput" placeholder="请输入金额" disabled={this.state.disabled}/>
                            )}
                            元及以上开启
                            <div style={{ display: this.state.show2  ? 'block' : 'none' }}>
                                <Alert style={{width:'85%'}} message="复审开启金额不能为空，请填写金额" type="info" showIcon />
                            </div>
                        </FormItem>
                        <FormItem label="终审：">
                            <RadioGroup disabled={this.state.disabled3} options={finalJudgment} onChange={this.onChange3} value={this.state.value3}  style={{marginBottom:"10px"}}/>
                            {getFieldDecorator('money2', {
                                initialValue:this.state.money2,
                                rules:[{ validator: this.checkMoney}]
                            })(
                            <Input name="money2"  onBlur={this.checkFor2} type="text" className="moneyInput"  placeholder="请输入金额" disabled={this.state.disabled2}/>
                            )}
                           元及以上开启
                            <div style={{ display: this.state.show3  ? 'block' : 'none' }}>
                                <Alert style={{width:'85%'}} message="终审开启金额不能为空，请填写金额" type="info" showIcon />
                            </div>
                            <div style={{ display: this.state.show  ? 'block' : 'none' }}>
                                <Alert style={{width:'85%'}} message="终审开启金额不能小于复审开启金额，请重新填写" type="info" showIcon />
                            </div>
                        </FormItem>
                        <FormItem label="二手车打款：" >
                            <RadioGroup options={sendMoney} onChange={this.onChange4} value={this.state.value4} />
                        </FormItem>
                        <FormItem style={{ textAlign: "center" }}>
                            <Button type="primary" disabled={this.state.show1} htmlType="submit" className="editform-button" onClick={this.handleSubmit.bind(this)}>提交</Button>
                            <Button type="primary" onClick={this.handleCancel.bind(this)} className="editform-button">取消</Button>

                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
const systemSetup = Form.create()(systemSetupForm);
export default systemSetup;