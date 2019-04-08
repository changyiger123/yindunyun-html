import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table, Pagination , Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import "./riskReport.less";
import ajax from "../../utils/ajax";
import {message} from "antd/lib/index";
class applicationForm extends React.Component {
    state = {
        applyNo:this.props.params.id,
        mainColumn:this.props.params.column==0?'打款申请':'打款审核',
        data:{},
        riskReport:[],
    };
    constructor(props) {
        super(props);
    };

    componentWillMount= (e) =>{
        this._isMounted = true;
        ajax.post("/admin/autoloanApply/waitRemitApply/info",{applyNo:this.state.applyNo})
            .then(response =>{
                if(response.code=="0") {
                    var data = response.data;
                    this.setState({
                        data:data,
                        riskReport:data.auditList,
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
        const riskReport=this.state.riskReport;
        const  loanInfo  = this.state.data.loanInfo || {};

        if(!applyNo){
            window.location.hash = "login";
        }

        return(
            <div className="auditList">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>{this.state.mainColumn}</Breadcrumb.Item>
                    <Breadcrumb.Item>风控报告</Breadcrumb.Item>
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
                </div>
                {/*风控报告*/}
                {riskReport.map((report,i)=>
                <div id="mainCont" className="infoBox">
                    <h2 className="infoTitle" style={{fontWeight:"bolder"}}>{report.title}
                        <span>审核员：{report.verifyName}</span>
                        <span>审核时间：{report.verifyTime}</span>
                    </h2>
                   <span className="riskInfo">{report.report}</span>
                   <br/>
                    {report.title == "风控报告" && data.hasTongDunReport == "1"?
                        <Button type="primary" style={{margin: "13px 8px 0 32px"}} onClick={this.searchRiskReport.bind(this, "1")}>查看多维度反欺诈报告</Button>
                        :
                        ''
                    }
                    {report.title == "风控报告" && data.hasYouFenReport == "1"?
                        <Button type="primary" style={{marginTop: "13px"}} onClick={this.searchRiskReport.bind(this, "2")}>查看银联信用报告</Button>
                        :
                        ''
                    }
                </div>)}

            </div>
        );
    }
}
const application = Form.create()(applicationForm);
export default application;