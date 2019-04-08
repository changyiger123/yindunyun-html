import React from 'react';
import { Link } from "react-router";
import {Form,Input,Select,DatePicker,Breadcrumb,Button,Icon,Table,message,Pagination,Row,Col,Tabs,Modal} from 'antd';
import "./accountCenter.less";
import ajax from "../../utils/ajax";

class monthDetail extends React.Component{
    constructor(props){
        super(props);
        var rDate = this.props.params.id;
        if (rDate.split('-')[1] == "12") {
            rDate = rDate.split('-')[0] - 0 + 1 + '-' +'01'
        }else {
            if (rDate.split('-')[1] - 0 < 9) {
                rDate = rDate.split('-')[0] + '-' + '0'+ ((rDate.split('-')[1] - 0 + 1))
            }else {
                rDate = rDate.split('-')[0] + '-' + (rDate.split('-')[1] - 0 + 1)
            }
        }
        console.log(rDate)
        this.state = {
            columns: [ //每月明细数据;
                {title: '出账时间', dataIndex: 'dataDate', key: 'dataDate'},
                {title: '查询次数', dataIndex: 'orderCount', key: 'orderCount'},
                {title: '每日账单总额', dataIndex: 'money', key: 'money'},
                {title: '每日明细', dataIndex: 'dayDetail', key: 'dayDetail', render: (text, record)=> <Link to={'/accountCenter/dayDetail/'+ record.dataDate}>查看</Link>}
            ],
            currentPage: 1, //当前页码;
            pageSize: 10, //每页显示数据条数;
            totalPage: '', //总条数;
            monthDetailStartTime: this.props.params.id+"-01"+" 00:00:00", //起始时间;
            monthDetailEndTime: rDate+"-01"+" 00:00:00", //截止时间;
            monthData: null
        }
    }

    changPage = (pageNum)=>{
        console.log(pageNum);
        this.setState({
            currentPage: pageNum
        }, ()=>{
            this._monthOrderDetail();
        });
    }

    _monthOrderDetail(){
        let monthOrderDetail = {
            monthOrderDetailUrl: '/admin/orderManagement/dayOrder', //月账单;
            monthOrderDetailParams: {
                startTime: this.state.monthDetailStartTime,
                endTime: this.state.monthDetailEndTime,
                pageNumber: this.state.currentPage,
                pageSize: this.state.pageSize
            }
        }
        ajax.post(monthOrderDetail.monthOrderDetailUrl, monthOrderDetail.monthOrderDetailParams).then((resp)=>{
            if(resp.code == 0){
                this.setState({
                    monthData: resp.data
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
        this._monthOrderDetail();
    }

    render(){
        return (
            <div className="dayDetailBox">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>每月明细</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ margin: 24,padding:'0 20px', background: '#fff'}}>
                    <div className="ant-form-split">
                        <Table 
                            rowKey={(record)=>record.dataDate}
                            columns={this.state.columns} 
                            dataSource={this.state.monthData} 
                            pagination={{simple:false, current:this.state.currentPage, pageSize:this.state.pageSize, total:this.state.totalPage, onChange:this.changPage.bind(this)}} />
                    </div>
                </div>
            </div>
        );
    }
}

export default monthDetail;