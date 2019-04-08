import React from 'react'
import { Form,Input, Select ,message, DatePicker, Breadcrumb, Button, Icon ,Table, Radio , Row, Col ,Tabs, Tooltip} from 'antd'
import "./index.less"
import 'ant-design-pro/dist/ant-design-pro.css'
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import ajax from "../../utils/ajax";

export default class consumptionRank extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dayTime: '1',
            dayTimeCount: '1',
            moneyData: [],
            moneyTotal: 0,
            countData: [],
            countTotal: 0
        }
    }
    componentWillMount() {
        this.getList();
        this.getListCount();
    }
    onChangeDate = (e) => {
        this.setState({ dayTime: e.target.value },()=>{this.getList();});
    }
    onChangeDateCount = (e) => {
        this.setState({ dayTimeCount: e.target.value },()=>{this.getListCount();});
    }
    getList () {
        ajax.post("admin/accountLog/payInfo",{dayTime:this.state.dayTime})
        .then(response => {
            if(response.code === "0") {
                var moneyDate = response.data.listSortMoney;
                var moneyArr = []
                for (var i = 0; i < moneyDate.length;i++) {
                    var moneyItem = {}
                    if(moneyDate[i].payMoney) {
                        moneyItem.x = moneyDate[i].payName
                        moneyItem.y = moneyDate[i].payMoney
                        moneyArr.push(moneyItem)
                    }else {
                        moneyItem.x = moneyDate[i].payName
                        moneyItem.y = 0
                        moneyArr.push(moneyItem)
                    }
                }
                this.setState({
                    moneyData: moneyArr,
                    moneyTotal: response.data.totalMoney?response.data.totalMoney:0
                })
            } else {
                message.error(response.msg)
            }
        });
    }
    getListCount () {
        ajax.post("admin/accountLog/payInfo",{dayTime:this.state.dayTimeCount})
        .then(response => {
            if(response.code === "0") {
                var countyDate = response.data.listSortCount;
                var countArr = []
                for (var i = 0; i < countyDate.length;i++) {
                    var countItem = {}
                    if(countyDate[i].payCount) {
                        countItem.x = countyDate[i].payName
                        countItem.y = countyDate[i].payCount
                        countArr.push(countItem)
                    }else {
                        countItem.x = countyDate[i].payName
                        countItem.y = 0
                        countArr.push(countItem)
                    }
                }
                this.setState({
                    countData: countArr,
                    countTotal: response.data.totalCount?response.data.totalCount:0
                })
            } else {
                message.error(response.msg)
            }
        });
    }
    go_moreMsg (i, e) {
        window.location.hash = "consumptionRankDetails/"+i
    }
    render() {
        return (
            <div className="consumptionRank">
                <Breadcrumb style={{ padding: '16px 28px',fontSize:'20px',fontWeight:'bold',background:"#fff"}}>
                    <Breadcrumb.Item>消费统计</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{padding:'24px',display: 'flex',flexWrap: 'wrap', minHeight: 780 }}>
                    <div className="consumption_money">
                        <div className="consumption_header">
                            <div className="consumption_title">消费金额排行</div>
                            <div className="consumption_date">
                                <Radio.Group value={this.state.dayTime} onChange={this.onChangeDate.bind(this)} >
                                    <Radio.Button value="1">近7天</Radio.Button>
                                    <Radio.Button value="2">近30天</Radio.Button>
                                    <Radio.Button value="3">近1年</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="consumption_content">
                            <div>
                                <Pie
                                    data={this.state.moneyData}
                                    height={300}
                                    subTitle="付费查询总金额(元)"
                                    total={() => (
                                        <span
                                            dangerouslySetInnerHTML={{
                                            __html: this.state.moneyTotal
                                            }}
                                        />
                                    )}
                                    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val + "元" }} />}
                                    hasLegend
                                />
                            </div>
                        </div>
                        <div className="consumption_footer">
                            <div className="more_ranking" onClick={this.go_moreMsg.bind(this,'1')}>查看全部项目</div>
                        </div>
                    </div>
                    <div className="consumption_count">
                        <div className="consumption_header">
                            <div className="consumption_title">消费笔数排行</div>
                            <div className="consumption_date">
                                <Radio.Group value={this.state.dayTimeCount} onChange={this.onChangeDateCount.bind(this)} >
                                    <Radio.Button value="1">近7天</Radio.Button>
                                    <Radio.Button value="2">近30天</Radio.Button>
                                    <Radio.Button value="3">近1年</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="consumption_content">
                            <div>
                                <Pie
                                    data={this.state.countData}
                                    height={300}
                                    subTitle="付费查询总笔数"
                                    total={() => (
                                        <span
                                            dangerouslySetInnerHTML={{
                                            __html: this.state.countTotal
                                            }}
                                        />
                                    )}
                                    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
                                    hasLegend
                                />
                            </div>
                        </div>
                        <div className="consumption_footer">
                            <div className="more_ranking" onClick={this.go_moreMsg.bind(this,'2')}>查看全部项目</div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}