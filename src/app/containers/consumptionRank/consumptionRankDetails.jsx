import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , Radio, Breadcrumb, Button, Icon ,Table,message, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./index.less";
import ajax from "../../utils/ajax";
import noData from "../../images/noData.png"

class ConsumptionRankDetails extends React.Component {
    state = {
        dayTime: '1',
        page: 1,
        isEmpty: true
    };
    constructor(props) {
        super(props);
    };

    componentWillMount= (e) =>{
        this.getList();
    };

    //普通字段输入更改state
    onChange(field, e){
        let valStr = e.target.value;
        console.log(field, 'change', valStr);
        this.setState({
            [field]: valStr,
        });
    };

    getList () {
        ajax.post("/admin/accountLog/payInfo",{dayTime:this.state.dayTime})
        .then(response => {
            if(response.code == "0") {
                if(this.props.params.type == "1") {
                    var moneyDate = response.data.listSortMoney;
                    // var moneyArr = []
                    // for (var i = 0; i < moneyDate.length;i++) {
                    //     if(moneyDate[i].payMoney) {
                    //         moneyArr.push(moneyDate[i])
                    //     }
                    // }
                    this.setState({
                        dataCont: moneyDate,
                        isEmpty: moneyDate.length == 0?true:false
                    })
                }else if (this.props.params.type == "2") {
                    var countDate = response.data.listSortCount;
                    // var countArr = []
                    // for (var i = 0; i < countDate.length;i++) {
                    //     if(countDate[i].payCount) {
                    //         countArr.push(countDate[i])
                    //     }
                    // }
                    this.setState({
                        dataCont: countDate,
                        isEmpty: countDate.length == 0?true:false
                    })
                }
            }else {
                message.error(response.msg);
            }
        });
    }
    onChangeDate = (e) => {
        this.setState({ dayTime: e.target.value },()=>{this.getList();});
    }


    render() {
        var columns = [];
        if (this.props.params.type == '1') {
            columns = [
                {
                    title: '排名',
                    render:(text,record,index)=>`${index+1+(10 * (this.state.page - 1))}`
                },{
                    title: '查询项目',
                    dataIndex: 'payName',
                    key: 'payName',
                },{
                    title: '消费金额',
                    dataIndex: 'payMoney',
                    key: 'payMoney',
                    render:(text, record)=><span>{record.payMoney?record.payMoney:0}</span>
                },{
                    title: '消费金额占比',
                    dataIndex: 'payRate',
                    key: 'payRate',
                    render:(text, record)=><span>{((record.payRate - 0)*100).toFixed(2) + '%'}</span>
                }
            ]
        }else if (this.props.params.type == '2') {
            columns = [
                {
                    title: '排名',
                    render:(text,record,index)=>`${index+1+(10 * (this.state.page - 1))}`
                },{
                    title: '查询项目',
                    dataIndex: 'payName',
                    key: 'payName',
                },{
                    title: '查询次数',
                    dataIndex: 'payCount',
                    key: 'payCount',
                    render:(text, record)=><span>{record.payCount?record.payCount:0}</span>
                },{
                    title: '查询次数占比',
                    dataIndex: 'payCountRate',
                    key: 'payCountRate',
                    render:(text, record)=><span>{((record.payCountRate - 0)*100).toFixed(2) + '%'}</span>
                }
            ]
        }
        const dataCont = this.state.dataCont;
        
        return(
            <div>
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>{this.props.params.type =="1"?'消费金额排行':'消费笔数排行'}</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    <div style={{height:"72px",padding:"20px 0"}}>
                        <Radio.Group style={{float:"right"}} value={this.state.dayTime} onChange={this.onChangeDate.bind(this)} >
                            <Radio.Button value="1">近7天</Radio.Button>
                            <Radio.Button value="2">近30天</Radio.Button>
                            <Radio.Button value="3">近1年</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="ant-form-split common_table">
                        <Table rowKey={(record) => record.code} columns={columns} dataSource={dataCont} pagination={false} />
                        {this.state.isEmpty?
                        <div className="table_noData">
                            <img src={noData} alt='noData'/>
                            <div>暂时没有数据</div>
                        </div>
                        :''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const consumptionRankDetails = Form.create()(ConsumptionRankDetails);
export default consumptionRankDetails;