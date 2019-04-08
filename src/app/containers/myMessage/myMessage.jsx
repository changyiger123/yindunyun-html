import React from 'react';
import {Link} from "react-router";
import {Form, Alert, Radio, Button, Input, validator, Breadcrumb,Table, Pagination, Row, Col,message} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import "./myMessage.less";

import reqwest from 'reqwest';
import ajax from "../../utils/ajax";

class myMessageForm extends React.Component {
    state = {
        message: [],
        realName: '',// 客户姓名
        statusStr: '',// 申请单状态描述
        mobilePhone: '',// 客户电话号码
        applyNo: '',// 申请单号
        cardId: '',// 身份证号
        auditor: '',// 审核员
        time: '',// 申请时间
        title: '',// 消息标题
        applyStatus: '',// 申请状态值
        introduction: '',// 消息描述
        skipUrl: '',// 跳转标志
        page: '1',
        id: '',
        totalCount:''
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDataListPage = this.getDataListPage.bind(this);
    };
    componentWillMount = (e) => {
        this.getDataListPage();
    };

    getDataListPage = (page) => {
        this._isMounted = true;
        const currentPage = page;
        this.setState({
            page: currentPage,
        });
        var redata = {
            page: currentPage
        };
        ajax.post("/admin/message/query", redata)
            .then(response => {
                if (response.code == "0") {
                    var message = response.result;
                    var totalCount = response.totalCount;
                    this.setState({
                        message: message,
                        totalCount :totalCount
                    })
                } else {
                    message.error(response.msg);
                }
            });
    };


    handleSubmit = (e, record) => {
        let self = this;
        ajax.post("/admin/message/read/mark", {id: e.id})
            .then(response => {
                if (response.code == "0") {
                    this.props.router.push(e.message.skipUrl);
                } else {
                    message.error(response.msg);
                }
            });
    };


    render() {
        let self = this;
        const messageList = this.state.message;

        const {getFieldDecorator} = this.props.form;
        return (
            <div className="myMessage">
                <Breadcrumb style={{
                    padding: '16px 28px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: "#fff",
                    borderBottom: "1px solid #E8E8E8"
                }}>
                    <Breadcrumb.Item>消息通知</Breadcrumb.Item>
                </Breadcrumb>

                <table id="mainCont" style={{
                    margin: 24,
                    padding: '0 28px 10px',
                    background: '#fff',
                    boxSizing: "border-content",
                    minHeight: 650
                }}>
                    {messageList.map((
                        mess, i) =>
                            <div key={i} className="msgBox">
                                <h4>审核消息—{mess.message.statusStr}</h4>
                                <span className="text" onClick={this.handleSubmit.bind(this, mess)}>
                                {mess.message.status == 1 ?
                                    <span style={{color:'#000000' ,cursor:'pointer'}}>
                                        {mess.message.introduction}
                                    </span>
                                    :
                                    <span style={{color:'#000000' ,cursor:'pointer'}}>
                                        {mess.message.introduction}
                                    </span>
                                }

                        </span>
                                <p className="auditor">
                                    <span>审核员&nbsp;&nbsp;<i style={{color: "#1890FF"}}>  {mess.message.auditor}</i></span>
                                    <span>{mess.message.time}</span>
                                </p>
                            </div>
                    )}
                </table>
                <div className="ant-form-split">
                    <Table rowKey={(record) => record.id}  dataSource={messageList}
                           pagination={{
                               simple: false,
                               current: this.state.page,
                               total: this.state.totalCount,
                               onChange: this.getDataListPage,
                           }}/>
                </div>
            </div>
        )
    }
}

const myMessage = Form.create()(myMessageForm);
export default myMessage;