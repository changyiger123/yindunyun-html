import React from 'react';
import {Form,Input,Select,DatePicker,Breadcrumb,Button,Icon,Table,message,Pagination,Row,Col,Tabs,Modal} from 'antd';
import "./accountCenter.less";
import ajax from "../../utils/ajax";

class dayDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [ //每日明细数据;
                {title: '账单编号', dataIndex: 'id', key: 'id'},
                {title: '业务类型', dataIndex: 'type', key: 'type'},
                {title: '报告单号', dataIndex: 'rcNo', key: 'rcNo'},
                {title: '交易时间', dataIndex: 'addTime', key: 'addTime'},
                {title: '金额', dataIndex: 'money', key: 'money'}
            ],
            dayData: null,
            currentPage: 1, //当前页码;
            pageNumber: 1, //请求页;
            pageSize: 10, //每页请求记录数;

            dataDate: this.props.params.id, //账单日期;
            totalPage: '', //总页数;
        }
    }

    changPage = (pageNum)=>{
        console.log(pageNum);
        this.setState({
            pageNumber: pageNum
        }, ()=>{
            this._dayOrderDetail();
        });
    }

    _dayOrderDetail(){
        let dayOrderDetail = {
            dayOrderDetailUrl: '/admin/orderManagement/orderDetail',
            dayOrderDetailParams: {
                dataDate: this.state.dataDate,
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
        }
        ajax.post(dayOrderDetail.dayOrderDetailUrl, dayOrderDetail.dayOrderDetailParams).then((resp)=>{
            if(resp.code == 0){
                this.setState({
                    dayData:resp.data
                });
                if(resp.data.length > 0){
                    this.setState({
                        totalPage: resp.data[0].totalPage*(this.state.pageSize)
                    });
                }else{
                    this.setState({
                        totalPage: 0
                    });
                }
            }else{
                console.log("dayData: "+resp.msg);
            }
        });
    }

    componentWillMount(){
        this._dayOrderDetail();
    }

    render(){
        return (
            <div className="dayDetailBox">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>每日明细</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ margin: 24,padding:'0 20px', background: '#fff'}}>
                    <div className="ant-form-split">
                        <Table 
                            rowKey={(record)=>record.id}
                            columns={this.state.columns} 
                            dataSource={this.state.dayData} 
                            pagination={{simple:false, current:this.state.pageNumber, pageSize:this.state.pageSize, total:this.state.totalPage, onChange:this.changPage.bind(this)}} />
                    </div>
                </div>
            </div>
        );
    }
}

export default dayDetail;