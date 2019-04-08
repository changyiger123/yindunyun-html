import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'
import report_titleIcon from '../../images/report_titleIcon.png'

class TongDReports extends React.Component {
    state= {
        moreInfo: -1
    }
    constructor(props) {
        super(props);
    };

    showMoreMsg (i, e) {
        this.setState({
            moreInfo: i
        })
    }

    close_modal () {
        this.props.closeMoadl();
    }


    render() {
        const riskData = this.props.data.result_desc;
        return(
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">反欺诈报告简版</div>
                        </div>
                        <div className="commonContent">
                            <div className="commonCard tdType1">
                                {riskData.ANTIFRAUD.final_decision == "REJECT"?
                                    <div className="card_left">
                                        <div className="card_title">申请用户检测出高危风险</div>
                                        <div className="card_result_type3">建议拒绝</div>
                                    </div>
                                    :riskData.ANTIFRAUD.final_decision == "REVIEW"?
                                    <div className="card_left">
                                        <div className="card_title">申请用户存在较大风险</div>
                                        <div className="card_result_type2">建议进行人工审核</div>
                                    </div>
                                    :
                                    <div className="card_left">
                                        <div className="card_title">申请用户未检出高危风险</div>
                                        <div className="card_result_type1">建议通过</div>
                                    </div>
                                }
                                {riskData.ANTIFRAUD.final_decision == "REJECT"?
                                    <div className="card_right">
                                        <div className="card_score_type3"></div>
                                        <p>共发现 <span className="card_error_type3">{riskData.ANTIFRAUD.risk_items?riskData.ANTIFRAUD.risk_items.length: 0}</span> 项异常信息</p>
                                    </div>
                                    :riskData.ANTIFRAUD.final_decision == "REVIEW"?
                                    <div className="card_right">
                                        <div className="card_score_type2"></div>
                                        <p>共发现 <span className="card_error_type2">{riskData.ANTIFRAUD.risk_items?riskData.ANTIFRAUD.risk_items.length: 0}</span> 项异常信息</p>
                                    </div>
                                    :
                                    <div className="card_right">
                                        <div className="card_score_type1"></div>
                                        <p>共发现 <span className="card_error_type1">{riskData.ANTIFRAUD.risk_items?riskData.ANTIFRAUD.risk_items.length: 0}</span> 项异常信息</p>
                                    </div>
                                }
                            </div>
                            <div className="commonFiller"></div>
                            <div className="commonMainType1">
                                {riskData.ANTIFRAUD.risk_items.map((oMsg,index) => {
                                    return(
                                        <div key={index}>
                                            {oMsg.risk_detail && oMsg.risk_detail[0].type=="platform_detail"?
                                            <div className="commonItem">
                                                <h3><img src={report_titleIcon} alt="icon" />{oMsg.risk_name}</h3>
                                                <div className="commonTable2">
                                                    <div className="commonTheader">
                                                        <div className="commonTh1">总个数</div>
                                                        <div className="commonTh2">平台类型</div>
                                                        <div className="commonTh2">个数</div>
                                                    </div>
                                                    <div className="commonTbody">
                                                        <div className="tbodyLeft">{oMsg.risk_detail[0].platform_count}</div>
                                                        <div className="tbodyRight">
                                                            {oMsg.risk_detail[0].platform_detail.map( (details, d_index)=> {
                                                                return(
                                                                    <div className="commonTr" key={d_index}>
                                                                        <div className="commonTd">{details.industry_display_name}</div>
                                                                        <div className="commonTd">{details.count}</div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                {oMsg.risk_detail[0].platform_detail_dimension?
                                                    <div className={this.state.moreInfo != index ? 'more_msg show':'more_msg hide'} onClick={this.showMoreMsg.bind(this,index)}>查看手机和身份证申请详情</div>
                                                    :
                                                    ''
                                                }
                                                {oMsg.risk_detail[0].platform_detail_dimension.map((dimension, di_index)=>{
                                                    return (
                                                        <div key={di_index} className={this.state.moreInfo == index ? 'commonTable2 show':'commonTable2 hide'}>
                                                            <div className="commonTheader">
                                                                <div className="commonTh1">{dimension.dimension}个数</div>
                                                                <div className="commonTh2">平台类型</div>
                                                                <div className="commonTh2">个数</div>
                                                            </div>
                                                            <div className="commonTbody">
                                                                <div className="tbodyLeft">{dimension.count}</div>
                                                                <div className="tbodyRight">
                                                                    {dimension.detail.map((details, d_index)=>{
                                                                        return(
                                                                            <div key={d_index} className="commonTr">
                                                                                <div className="commonTd">{details.industry_display_name}</div>
                                                                                <div className="commonTd">{details.count}</div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            :oMsg.risk_detail && oMsg.risk_detail[0].type=="black_list"?
                                            <div className="commonItem">
                                                <h3><img src={report_titleIcon} alt="icon" />{oMsg.risk_name}</h3>
                                                {oMsg.risk_detail[0].court_details?oMsg.risk_detail[0].court_details.map((details, d_index)=>{
                                                    return(<div key={d_index} className="commonTable3">
                                                        <div className="bg">
                                                            <div className="odd"></div>
                                                            <div className="even"></div>
                                                            <div className="odd"></div>
                                                            <div className="even"></div>
                                                        </div>
                                                        <div className="commonTbody">
                                                            {details.value?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">{oMsg.risk_detail[0].hit_type_display_name}</div>
                                                                    <div className="commonListMsg">{details.value}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.fraud_type_display_name?
                                                            <div className="commonLists">
                                                                <div className="commonListName">风险类型</div>
                                                                <div className="commonListMsg">{details.fraud_type_display_name}</div>
                                                            </div>
                                                            :''
                                                            }
                                                            {details.executed_name?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">被执行人姓名</div>
                                                                    <div className="commonListMsg">{details.executed_name}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.age?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">年龄</div>
                                                                    <div className="commonListMsg">{details.age}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.gender?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">性别</div>
                                                                    <div className="commonListMsg">{details.gender}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.province?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">省份</div>
                                                                    <div className="commonListMsg">{details.province}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.case_date?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">立案时间</div>
                                                                    <div className="commonListMsg">{details.case_date}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.execute_court?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">执行法院</div>
                                                                    <div className="commonListMsg">{details.execute_court}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.execute_subject?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">执行标的</div>
                                                                    <div className="commonListMsg">{details.execute_subject}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.execute_status?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">执行状态</div>
                                                                    <div className="commonListMsg">{details.execute_status}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.evidence_court?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">做出依据执行法院</div>
                                                                    <div className="commonListMsg">{details.evidence_court}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.execute_code?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">执行依据文号</div>
                                                                    <div className="commonListMsg">{details.execute_code}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.case_code?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">案号</div>
                                                                    <div className="commonListMsg">{details.case_code}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.evidence_time?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">证据时间戳形式</div>
                                                                    <div className="commonListMsg">{details.evidence_time}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.term_duty?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">生效法律文书确定的义务</div>
                                                                    <div className="commonListMsg">{details.term_duty}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.carry_out?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">被执行人履行情况</div>
                                                                    <div className="commonListMsg">{details.carry_out}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.specific_circumstances?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">被执行人行为具体情形</div>
                                                                    <div className="commonListMsg">{details.specific_circumstances}</div>
                                                                </div>
                                                                :''
                                                            }
                                                        </div>
                                                    </div>)
                                                }):''}
                                                
                                            </div>
                                            :oMsg.risk_detail && oMsg.risk_detail[0].type=="grey_list"?
                                            <div className="commonItem">
                                                <h3><img src={report_titleIcon} alt="icon" />{oMsg.risk_name}</h3>
                                                {oMsg.risk_detail[0].grey_list_details.map((details, d_index)=>{
                                                    return(<div key={d_index} className="commonTable3">
                                                        <div className="bg">
                                                            <div className="odd"></div>
                                                            <div className="even"></div>
                                                            <div className="odd"></div>
                                                            <div className="even"></div>
                                                        </div>
                                                        <div className="commonTbody">
                                                            {details.value?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">{oMsg.risk_detail[0].hit_type_display_name}</div>
                                                                    <div className="commonListMsg">{details.value}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.fraud_type_display_name?
                                                            <div className="commonLists">
                                                                <div className="commonListName">风险类型</div>
                                                                <div className="commonListMsg">{details.fraud_type_display_name}</div>
                                                            </div>
                                                            :''
                                                            }
                                                            {details.risk_level?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">风险等级</div>
                                                                    <div className="commonListMsg">{details.risk_level}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.fraud_type?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">风险类型</div>
                                                                    <div className="commonListMsg">{details.fraud_type}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.evidence_time?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">证据时间戳形式</div>
                                                                    <div className="commonListMsg">{details.evidence_time}</div>
                                                                </div>
                                                                :''
                                                            }
                                                        </div>
                                                    </div>)
                                                })}
                                            </div>
                                            :oMsg.risk_detail && oMsg.risk_detail[0].type=="fuzzy_black_list"?
                                            <div className="commonItem">
                                                <h3><img src={report_titleIcon} alt="icon" />{oMsg.risk_name}</h3>
                                                {oMsg.risk_detail[0].fuzzy_list_details.map((details, d_index)=>{
                                                    return (<div key={d_index} className="commonTable3">
                                                        <div className="bg">
                                                            <div className="odd"></div>
                                                            <div className="even"></div>
                                                            <div className="odd"></div>
                                                            <div className="even"></div>
                                                        </div>
                                                        <div className="commonTbody">
                                                            {details.fuzzy_id_number?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">模糊身份证</div>
                                                                    <div className="commonListMsg">{details.fuzzy_id_number}</div>
                                                                </div>
                                                                :''
                                                            }
                                                            {details.fuzzy_name?
                                                            <div className="commonLists">
                                                                <div className="commonListName">模糊姓名</div>
                                                                <div className="commonListMsg">{details.fuzzy_name}</div>
                                                            </div>
                                                            :''
                                                            }
                                                            {details.fraud_type?
                                                                <div className="commonLists">
                                                                    <div className="commonListName">风险类型</div>
                                                                    <div className="commonListMsg">{details.fraud_type_display_name}</div>
                                                                </div>
                                                                :''
                                                            }
                                                        </div>
                                                    </div>)
                                                })}
                                            </div>
                                            :oMsg.risk_detail && oMsg.risk_detail[0].type=="discredit_count"?
                                            <div className="commonItem">
                                                <h3><img src={report_titleIcon} alt="icon" />{oMsg.risk_name}</h3>
                                                <div className="commonTable4">
                                                    <div className="commonTheader">
                                                        <div className="commonTh1">信贷逾期次数</div>
                                                        <div className="commonTh2">逾期入库时间</div>
                                                        <div className="commonTh3">逾期金额区间</div>
                                                        <div className="commonTh4">逾期时间区间</div>
                                                        <div className="commonTh5">逾期笔数</div>
                                                    </div>
                                                    <div className="commonTbody">
                                                        <div className="tbodyLeft">{oMsg.risk_detail[0].discredit_times}</div>
                                                        <div className="tbodyRight">
                                                            {oMsg.risk_detail[0].overdue_details.map((details, d_index)=>{
                                                                return (
                                                                    <div className="commonTr" key={d_index}>
                                                                        <div className="commonTd1">{details.overdue_time?details.overdue_time: '-'}</div>
                                                                        <div className="commonTd2">{details.overdue_amount_range?details.overdue_amount_range:'-'}</div>
                                                                        <div className="commonTd3">{details.overdue_day_range?details.overdue_day_range:'-'}</div>
                                                                        <div className="commonTd4">{details.overdue_count?details.overdue_count:'-'}</div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :oMsg.risk_detail && oMsg.risk_detail[0].type=="custom_list"?
                                            <div className="commonItem">
                                                <h3><img src={report_titleIcon} alt="icon" />{oMsg.risk_name}</h3>
                                                <div className="commonTable5">
                                                    {oMsg.risk_detail[0].high_risk_areas.map((details, d_index)=>{
                                                        return (
                                                            <div className="commonTbody" key={d_index}>
                                                                <div className="commonListName">高风险区域</div>
                                                                <div className="commonListMsg">{details.high_risk_areas}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            :oMsg.risk_detail && oMsg.risk_detail[0].type=="frequency_detail"?
                                            <div className="commonItem">
                                                <h3><img src={report_titleIcon} alt="icon" />{oMsg.risk_name}</h3>
                                                <div className="commonTable5">
                                                    {oMsg.risk_detail[0].frequency_detail_list.map((details, d_index)=>{
                                                        return (
                                                            <div>
                                                                <div className="commonTbody" key={d_index}>
                                                                    <div className="commonListName">{details.detail.split('：')[0]}</div>
                                                                    <div className="commonListMsg">{details.detail.split('：')[1]}</div>
                                                                </div>
                                                                {details.data&&details.data.length!=0?
                                                                    <div className="commonTbody2">
                                                                        <div className="commonListName">详细信息</div>
                                                                        <div className="commonListMsg">
                                                                            {details.data.map((acc,a_index)=>{
                                                                                return (
                                                                                    <div key={a_index}>{acc}</div>
                                                                                )
                                                                            })
                                                                            }
                                                                        </div>
                                                                    </div>:''}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            :oMsg.risk_detail && oMsg.risk_detail[0].type=="cross_frequency_detail"?
                                            <div className="commonItem">
                                                <h3><img src={report_titleIcon} alt="icon" />{oMsg.risk_name}</h3>
                                                <div className="commonTable5">
                                                    {oMsg.risk_detail[0].cross_frequency_detail_list.map((details, d_index)=>{
                                                        return (
                                                            <div className="commonTbody" key={d_index}>
                                                                <div className="commonListName">{details.detail.split('：')[0]}</div>
                                                                <div className="commonListMsg">{details.detail.split('：')[1]}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            :oMsg.risk_detail && oMsg.risk_detail[0].type=="suspected_team"?
                                            <div className="commonItem">
                                                <h3><img src={report_titleIcon} alt="icon" />{oMsg.risk_name}</h3>
                                                <div className="commonTable6">
                                                    <div className="commonTheader">
                                                        <div className="commonTh1">疑似风险群体成员数</div>
                                                        <div className="commonTh2">成员分布</div>
                                                        <div className="commonTh3">数量</div>
                                                        <div className="commonTh4">占比</div>
                                                    </div>
                                                    <div className="commonTbody">
                                                        <div className="tbodyLeft">{oMsg.risk_detail[0].suspect_team_detail_list[0].total_cnt}</div>
                                                        <div className="tbodyRight">
                                                            {oMsg.risk_detail[0].suspect_team_detail_list[0].node_dist||oMsg.risk_detail[0].suspect_team_detail_list[0].node_dist!=""?oMsg.risk_detail[0].suspect_team_detail_list[0].node_dist.split(';').map((item, i_index)=>{
                                                                return(<div className="commonTr">
                                                                    <div className="commonTd1">{item.split(':')[0]}</div>
                                                                    <div className="commonTd2">{item.split(':')[1].split('(')[0]}</div>
                                                                    <div className="commonTd3">{item.split(':')[1].split('(')[1].split(')')[0]}</div>
                                                                </div>)
                                                            }):<div className="commonTr">暂无数据</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="commonTable6">
                                                    <div className="commonTheader">
                                                        <div className="commonTh1">风险名单成员数</div>
                                                        <div className="commonTh2">风险名单分布</div>
                                                        <div className="commonTh3">数量</div>
                                                        <div className="commonTh4">占比</div>
                                                    </div>
                                                    <div className="commonTbody">
                                                        <div className="tbodyLeft">{oMsg.risk_detail[0].suspect_team_detail_list[0].black_cnt}{oMsg.risk_detail[0].suspect_team_detail_list.black_rat}</div>
                                                        <div className="tbodyRight">
                                                            {oMsg.risk_detail[0].suspect_team_detail_list[0].fraud_dist||oMsg.risk_detail[0].suspect_team_detail_list[0].fraud_dist!=""?oMsg.risk_detail[0].suspect_team_detail_list[0].fraud_dist.split(';').map((item, i_index)=>{
                                                                return(<div className="commonTr">
                                                                    <div className="commonTd1">{item.split(':')[0]}</div>
                                                                    <div className="commonTd2">{item.split(':')[1].split('(')[0]}</div>
                                                                    <div className="commonTd3">{item.split(':')[1].split('(')[1].split(')')[0]}</div>
                                                                </div>)
                                                            }):<div className="commonTr">暂无数据</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="commonTable1">
                                                    <div className="commonTheader">
                                                        <div className="commonTh">关注名单成员数</div>
                                                        <div className="commonTh">关注名单分布</div>
                                                    </div>
                                                    <div className="commonTbody">
                                                        <div className="commonTr">
                                                            <div className="commonTd">{oMsg.risk_detail[0].suspect_team_detail_list[0].grey_cnt}</div>
                                                            <div className="commonTd">{oMsg.risk_detail[0].suspect_team_detail_list[0].grey_rat}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :''}
                                        </div>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TongDReports