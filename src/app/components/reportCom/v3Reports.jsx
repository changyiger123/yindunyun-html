import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'
import report_titleIcon from '../../images/report_titleIcon.png'


class V3Reports extends React.Component {
    state= {
    }
    constructor(props) {
        super(props);
    };

    /*将毫秒转化为年月日时分秒;*/
    formatDateTime(inputTime){
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y+'-'+m+'-'+d+' '+' '+h+':'+minute+':'+second;
    }

    close_modal () {
        this.props.closeMoadl();
    }
    render() {
        const data = this.props.datalist;
        /*历史查询记录;*/
        const histQueryRecord7 = data.user_searched_history_by_day.d_7;
        histQueryRecord7.title = '7天内历史查询'
        const histQueryRecord15 = data.user_searched_history_by_day.d_15;
        histQueryRecord15.title = '15天内历史查询'
        const histQueryRecord30 = data.user_searched_history_by_day.d_30;
        histQueryRecord30.title = '30天内历史查询'
        const histQueryRecord60 = data.user_searched_history_by_day.d_60;
        histQueryRecord60.title = '60天内历史查询'
        const histQueryRecord90 = data.user_searched_history_by_day.d_90;
        histQueryRecord90.title = '90天内历史查询'
        const histQueryRecord120 = data.user_searched_history_by_day.m_4;
        histQueryRecord120.title = '120天内历史查询'
        const histQueryRecord150 = data.user_searched_history_by_day.m_5;
        histQueryRecord150.title = '150天内历史查询'
        const histQueryRecord180 = data.user_searched_history_by_day.m_6;
        histQueryRecord180.title = '180天内历史查询'
        const histQueryRecord270 = data.user_searched_history_by_day.m_9;
        histQueryRecord270.title = '270天内历史查询'
        const histQueryRecord360 = data.user_searched_history_by_day.m_12;
        histQueryRecord360.title = '360天内历史查询'
        const histQueryRecord540 = data.user_searched_history_by_day.m_18;
        histQueryRecord540.title = '540天内历史查询'
        const histQueryRecord720 = data.user_searched_history_by_day.m_24;
        histQueryRecord720.title = '720天内历史查询'
        const histArr=[histQueryRecord7, histQueryRecord15, histQueryRecord30, histQueryRecord60, histQueryRecord90, histQueryRecord120, histQueryRecord150, histQueryRecord180, histQueryRecord270, histQueryRecord360, histQueryRecord540, histQueryRecord720]
        return (
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">大数据防控报告</div>
                        </div>
                        <div className="commonContent">
                            <div className="commonCard tdType1">
                                <div className="card_left">
                                    <div style={{marginTop:"20px",marginBottom:"15px"}} className="card_title">申请用户检测出高危风险</div>
                                    <div className="card_result_type3">建议拒绝</div>
                                </div>
                                <div className="card_right">
                                    <div style={{marginTop:"30px"}} className="card_score_type3"></div>
                                </div>
                            </div>
                            {!data.user_gray.phone_gray_score||data.user_gray.phone_gray_score - 0 < 25?
                                <div className="commonCard tdType1">
                                    <div className="card_left">
                                        <div style={{marginTop:"20px",marginBottom:"15px"}} className="card_title">申请用户社交质量偏低</div>
                                        <div className="card_result_type3">建议拒绝</div>
                                    </div>
                                    <div className="card_right">
                                        <div style={{marginTop:"30px"}} className="card_score_type3"></div>
                                    </div>
                                </div>
                                :data.user_gray.phone_gray_score - 0 >= 25&&data.user_gray.phone_gray_score - 0 < 40?
                                <div className="commonCard tdType1">
                                    <div className="card_left">
                                        <div style={{marginTop:"20px",marginBottom:"15px"}} className="card_title">申请用户社交质量存疑</div>
                                        <div className="card_result_type2">建议进行人工审核</div>
                                    </div>
                                    <div className="card_right">
                                        <div style={{marginTop:"30px"}} className="card_score_type2"></div>
                                    </div>
                                </div>
                                :
                                <div className="commonCard tdType1">
                                    <div className="card_left">
                                        <div style={{marginTop:"20px",marginBottom:"15px"}} className="card_title">申请用户未检出高危风险</div>
                                        <div className="card_result_type1">建议通过</div>
                                    </div>
                                    <div className="card_right">
                                        <div style={{marginTop:"30px"}} className="card_score_type1"></div>
                                    </div>
                                </div>
                            }
                            <div className="commonFiller"></div>
                            <div className="commonMainType1">
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />基本信息</h3>
                                    <div className="commonTable3">
                                        <div className="bg">
                                            <div className="odd"></div>
                                            <div className="even"></div>
                                            <div className="odd"></div>
                                            <div className="even"></div>
                                        </div>
                                        <div className="commonTbody">
                                            <div className="commonLists">
                                                <div className="commonListName">姓名</div>
                                                <div className="commonListMsg">{data.user_basic.user_name}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">身份证号码</div>
                                                <div className="commonListMsg">{data.user_basic.user_idcard}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">年龄</div>
                                                <div className="commonListMsg">{data.user_basic.user_age}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">身份证所在地</div>
                                                <div className="commonListMsg">{data.user_basic.user_province} {data.user_basic.user_city} {data.user_basic.user_region}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">性别</div>
                                                <div className="commonListMsg">{data.user_basic.user_gender}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">手机所属运营商</div>
                                                <div className="commonListMsg">{data.user_basic.user_phone_operator}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">手机号码</div>
                                                <div className="commonListMsg">{data.user_basic.user_phone}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">符合身份证号码编码规范</div>
                                                <div className="commonListMsg">{data.user_basic.user_idcard_valid? '是':'否'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />借条信息</h3>
                                    <div className="commonTable3">
                                        <div className="bg">
                                            <div className="odd"></div>
                                            <div className="even"></div>
                                            <div className="odd"></div>
                                            <div className="even"></div>
                                        </div>
                                        <div className="commonTbody">
                                            <div className="commonLists">
                                                <div className="commonListName">借条借贷总次数</div>
                                                <div className="commonListMsg">{data.iou_statistic.total_loan_times}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">借条借贷总金额</div>
                                                <div className="commonListMsg">{data.iou_statistic.total_loan_amount}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">借条最近状态</div>
                                                <div className="commonListMsg">{data.iou_statistic.recent_iou_status}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">最近一次借入日期</div>
                                                <div className="commonListMsg">{!data.iou_statistic.recent_loan_time?'-':this.formatDateTime(data.iou_statistic.recent_loan_time)}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">最近一次应还款日期</div>
                                                <div className="commonListMsg">{!data.iou_statistic.recent_pay_back_time?'-':this.formatDateTime(data.iou_statistic.recent_pay_back_time)}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">还款中借款笔数</div>
                                                <div className="commonListMsg">{data.iou_statistic.in_repayment_times}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">还款中本金总额</div>
                                                <div className="commonListMsg">{data.iou_statistic.in_repayment_amount}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">还款中利息总额</div>
                                                <div className="commonListMsg">{data.iou_statistic.in_repayment_interest}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">逾期已还借款笔数</div>
                                                <div className="commonListMsg">{data.iou_statistic.overdue_payment_times}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">逾期已还本金总额</div>
                                                <div className="commonListMsg">{data.iou_statistic.overdue_payment_amount}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">逾期已还利息总额</div>
                                                <div className="commonListMsg">{data.iou_statistic.overdue_payment_interest}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">逾期借款笔数</div>
                                                <div className="commonListMsg">{data.iou_statistic.overdue_times}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">逾期本金总额</div>
                                                <div className="commonListMsg">{data.iou_statistic.overdue_amount}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">逾期利息总额</div>
                                                <div className="commonListMsg">{data.iou_statistic.overdue_interest}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">借条平台数_360天</div>
                                                <div className="commonListMsg">{data.iou_statistic.d360_iou_platform_cnt}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">借条平台数_90天</div>
                                                <div className="commonListMsg">{data.iou_statistic.d90_iou_platform_cnt}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">借条平台数_30天</div>
                                                <div className="commonListMsg">{data.iou_statistic.d30_iou_platform_cnt}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">借条查询次数_360天</div>
                                                <div className="commonListMsg">{data.iou_statistic.d360_iou_query_times}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">借条查询次数_90天</div>
                                                <div className="commonListMsg">{data.iou_statistic.d90_iou_query_times}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">借条查询次数_30天</div>
                                                <div className="commonListMsg">{data.iou_statistic.d30_iou_query_times}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="commonTable9">
                                        
                                    </div>
                                </div> */}
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />社交特征</h3>
                                    <div className="commonTable8">
                                        <div className="commonTheader">社交特征</div>
                                        <div className="commonTbody" style={{marginBottom:"5px"}}>
                                            {/* <div className="commonTr">
                                                <div className="commonListName1">社交质量分</div>
                                                <div className="commonListMsg1">{data.user_gray.phone_gray_score}（分数区间为0—100，10分以下为高危人群）</div>
                                            </div> */}
                                            <div className="commonTr">
                                                <div className="commonListName1">社交活跃度</div>
                                                <div className="commonListMsg1">{data.user_gray.social_liveness}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName1">社交影响力</div>
                                                <div className="commonListMsg1">{data.user_gray.social_influence}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName1">是否曾被授权查询</div>
                                                <div className="commonListMsg1">{data.user_gray.has_report? '是': '否'}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName1">最近活跃时间</div>
                                                <div className="commonListMsg1">{!data.user_gray.recent_active_time?'':this.formatDateTime(data.user_gray.recent_active_time)}（以下联系人信息的统计窗口在最近活跃时间的前半年内）</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName1">被标记的黑名单分类</div>
                                                <div className="commonListMsg1">{data.user_blacklist.blacklist_category.length?data.user_blacklist.blacklist_category.map((list, index) => {
                                                    return (<span key={index}>{list}</span>)
                                                }):'-'}
                                                </div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName1">姓名和手机是否在黑名单</div>
                                                <div className="commonListMsg1">{data.user_blacklist.blacklist_name_with_phone?'是':'否'}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName1">姓名和手机黑名单信息更新时间</div>
                                                <div className="commonListMsg1">{!data.user_blacklist.blacklist_update_time_name_phone?'-':this.formatDateTime(data.user_blacklist.blacklist_update_time_name_phone)}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName1">身份证和姓名是否在黑名单</div>
                                                <div className="commonListMsg1">{data.user_blacklist.blacklist_name_with_idcard?'是':'否'}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName1">身份证和姓名黑名单信息更新时间</div>
                                                <div className="commonListMsg1">{!data.user_blacklist.blacklist_update_time_name_idcard?'-':this.formatDateTime(data.user_blacklist.blacklist_update_time_name_idcard)}</div>
                                            </div>
                                        </div>
                                        <div className="commonTbody">
                                            <div className="commonTr">
                                                <div className="commonListName2">黑名单详细信息</div>
                                                <div className="commonListMsg2">
                                                    <div className="commonListMsg2_header">
                                                        <div className="left">名称</div>
                                                        <div className="right">内容</div>
                                                    </div>
                                                    {data.user_blacklist.blacklist_details.length?data.user_blacklist.blacklist_details.map((list, index)=>{
                                                        <div key={index} className="commonListMsg2_list">
                                                            <div className="left">{list.details_key}</div>
                                                            <div className="right">{list.details_value}</div>
                                                        </div>
                                                    })
                                                    :
                                                    <div className="commonListMsg2_list">
                                                        暂无数据
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="commonTable8">
                                        <div className="commonTheader">联系人数相关字段</div>
                                        <div className="commonTbody">
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_to_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系人数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_to_all?'':(data.user_gray.contacts_number_statistic.pct_cnt_to_all*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系的黑号数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_to_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系的黑号数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_to_black?'':(data.user_gray.contacts_number_statistic.pct_cnt_to_black*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系人中曾为申请人的人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_to_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系人曾为申请人的人数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_to_applied?'':(data.user_gray.contacts_number_statistic.pct_cnt_to_applied*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_be_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系人数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_be_all?'':(data.user_gray.contacts_number_statistic.pct_cnt_be_all*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系的黑号数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_be_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系的黑号数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_be_black?'':(data.user_gray.contacts_number_statistic.pct_cnt_be_black*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系人中曾为申请人的人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_be_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系人中曾为申请人的人数在群体中百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_be_applied?'':(data.user_gray.contacts_number_statistic.pct_cnt_be_applied*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">一阶联系人总数(主动、被动联系人数合并去重)</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">一阶联系人数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_all?'':(data.user_gray.contacts_number_statistic.pct_cnt_all*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">一阶联系(直接联系)黑号总数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">一阶联系黑号数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_black?'':(data.user_gray.contacts_number_statistic.pct_cnt_black*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">二阶联系(间接联系)黑号总数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_black2}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">二阶联系黑号总数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_black2?'':(data.user_gray.contacts_number_statistic.pct_cnt_black2*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">联系人曾为申请人的人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">联系人曾为申请人的人数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_applied?'':(data.user_gray.contacts_number_statistic.pct_cnt_applied*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">一阶联系人黑号数占比</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.black_ratio?'':(data.user_gray.contacts_number_statistic.black_ratio*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">一阶联系人黑号数占比在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_black_ratio?'':(data.user_gray.contacts_number_statistic.pct_black_ratio*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">引起黑名单的一阶联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_number_statistic.cnt_router}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">引起黑名单的一阶联系人数在群体中的百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_cnt_router?'':(data.user_gray.contacts_number_statistic.pct_cnt_router*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">引起黑名单的一阶联系人数占比</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.router_ratio?'':(data.user_gray.contacts_number_statistic.router_ratio*100).toFixed(2)+'%'}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">引起黑名单的一阶联系人数占比在群体中百分位</div>
                                                <div className="commonListMsg">{!data.user_gray.contacts_number_statistic.pct_router_ratio?'':(data.user_gray.contacts_number_statistic.pct_router_ratio*100).toFixed(2)+'%'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="commonTable8">
                                        <div className="commonTheader">联系权重R、F、M相关字段</div>
                                        <div className="commonTbody">
                                            <div className="commonTr2">
                                                <div className="commonListName1">与所有联系人的最近主动通话时间</div>
                                                <div className="commonListMsg1">{!data.user_gray.contacts_rfm.recent_time_to_all?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_to_all)}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与所有联系人的最近被动通话时间</div>
                                                <div className="commonListMsg1">{!data.user_gray.contacts_rfm.recent_time_be_all?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_be_all)}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与黑号的最近主动通话时间</div>
                                                <div className="commonListMsg1">{!data.user_gray.contacts_rfm.recent_time_to_black?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_to_black)}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与黑号的最近被动通话时间</div>
                                                <div className="commonListMsg1">{!data.user_gray.contacts_rfm.recent_time_be_black?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_be_black)}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与申请人的最近主动通话时间</div>
                                                <div className="commonListMsg1">{!data.user_gray.contacts_rfm.recent_time_to_applied?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_to_applied)}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与申请人的最近被动通话时间</div>
                                                <div className="commonListMsg1">{!data.user_gray.contacts_rfm.recent_time_be_applied?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_be_applied)}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与所有联系人的主动总通话次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.call_cnt_to_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与所有联系人的被动总通话次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.call_cnt_be_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与黑号的主动总通话次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.call_cnt_to_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与黑号的被动总通话次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.call_cnt_be_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与申请人的主动通话次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.call_cnt_to_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与申请人的被动通话次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.call_cnt_be_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与所有联系人的主动总通话时长(秒)</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.time_spent_to_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与所有联系人的被动总通话时长(秒)</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.time_spent_be_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与黑号的主动通话时长(秒)</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.time_spent_to_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与黑号的被动通话时长(秒)</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.time_spent_be_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与申请人的主动通话时长(秒)</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.time_spent_to_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">与申请人的被动通话时长(秒)</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_rfm.time_spent_be_applied}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="commonTable8">
                                        <div className="commonTheader">与联系人的最大亲密度</div>
                                        <div className="commonTbody">
                                            <div className="commonTr2">
                                                <div className="commonListName">与所有联系人的最大主动联系亲密度</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_closest.weight_to_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">与所有联系人的最大被动联系亲密度</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_closest.weight_be_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">与所有联系人的最大互动联系亲密度</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_closest.weight_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">与黑号的最大主动联系亲密度</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_closest.weight_to_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">与黑号的最大被动联系亲密度</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_closest.weight_be_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">与黑号的最大互动联系亲密度</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_closest.weight_black}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">与申请人的最大主动联系亲密度</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_closest.weight_to_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">与申请人的最大被动联系亲密度</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_closest.weight_be_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">与申请人的最大互动联系亲密度</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_closest.weight_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">&nbsp;</div>
                                                <div className="commonListMsg">&nbsp;</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="commonTable8">
                                        <div className="commonTheader">联系人社交分信息</div>
                                        <div className="commonTbody">
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系最亲密联系人的社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.most_familiar_to_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系最亲密联系人的社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.most_familiar_be_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">互动联系最亲密联系人的社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.most_familiar_all}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系最亲密申请人的社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.most_familiar_to_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系最亲密申请人的社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.most_familiar_be_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">互动联系最亲密申请人的社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.most_familiar_applied}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系的联系人的最高社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.to_max}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系的联系人的平均社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.to_mean}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系的联系人的最低社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.to_min}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系的联系人的最高社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.be_max}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系的联系人的平均社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.be_mean}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系的联系人的最低社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.be_min}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">联系人的最高社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.max}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">联系人的平均社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.mean}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">联系人的最低社交分</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_gray_score.min}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">&nbsp;</div>
                                                <div className="commonListMsg">&nbsp;</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="commonTable8">
                                        <div className="commonTheader">联系人的分布</div>
                                        <div className="commonTbody">
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系的亲密联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_relation_distribution.to_is_familiar}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系的中等亲密联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_relation_distribution.to_median_familiar}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">主动联系的非亲密联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_relation_distribution.to_not_familiar}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系的亲密联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_relation_distribution.be_is_familiar}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系的中等亲密联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_relation_distribution.be_median_familiar}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">被动联系的非亲密联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_relation_distribution.be_not_familiar}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">互动联系的亲密联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_relation_distribution.is_familiar}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">互动联系的中等亲密联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_relation_distribution.median_familiar}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">互动联系的非亲密联系人数</div>
                                                <div className="commonListMsg">{data.user_gray.contacts_relation_distribution.not_familiar}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName">&nbsp;</div>
                                                <div className="commonListMsg">&nbsp;</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="commonTable8">
                                        <div className="commonTheader">联系人的查询历史</div>
                                        <div className="commonTbody">
                                            <div className="commonTr2">
                                                <div className="commonListName1">主动联系的人的最近一次查询时间</div>
                                                <div className="commonListMsg1">{!data.user_gray.contacts_query.to_recent_query_time?'':this.formatDateTime(data.user_gray.contacts_query.to_recent_query_time)}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">被动联系的人的最近一次查询时间</div>
                                                <div className="commonListMsg1">{!data.user_gray.contacts_query.be_recent_query_time?'':this.formatDateTime(data.user_gray.contacts_query.be_recent_query_time)}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前半月内主动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_query_cnt_05}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前半月内主动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_org_cnt_05}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前半月内被动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_query_cnt_05}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前半月内被动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_org_cnt_05}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前半月内联系人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.query_cnt_05}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前半月内联系人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.org_cnt_05}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前1月内主动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_query_cnt_1}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前1月内主动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_org_cnt_1}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前1月内被动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_query_cnt_1}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前1月内被动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_org_cnt_1}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前1月内联系人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.query_cnt_1}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前1月内联系人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.org_cnt_1}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前2月内主动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_query_cnt_2}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前2月内主动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_query_cnt_2}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前2月内被动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_org_cnt_2}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前2月内被动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_org_cnt_2}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前2月内联系人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.query_cnt_2}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前2月内联系人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.org_cnt_2}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前3月内主动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_query_cnt_3}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前3月内主动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_org_cnt_3}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前3月内被动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_query_cnt_3}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前3月内被动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_org_cnt_3}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前3月内联系人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.query_cnt_3}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前3月内联系人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.org_cnt_3}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前6月内主动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_query_cnt_6}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前6月内主动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_org_cnt_6}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前6月内被动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_query_cnt_6}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前6月内被动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_org_cnt_6}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前6月内联系人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.query_cnt_6}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前6月内联系人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.org_cnt_6}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前9月内主动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_query_cnt_9}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前9月内主动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_org_cnt_9}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前9月内被动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_query_cnt_9}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前9月内被动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_org_cnt_9}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前9月内联系人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.query_cnt_9}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前9月内联系人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.org_cnt_9}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前12月内主动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_query_cnt_12}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前12月内主动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.to_org_cnt_12}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前12月内被动联系的人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_query_cnt_12}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前12月内被动联系的人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.be_org_cnt_12}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前12月内联系人的查询次数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.query_cnt_12}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">前12月内联系人的查询机构数</div>
                                                <div className="commonListMsg1">{data.user_gray.contacts_query.org_cnt_12}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />手机风险</h3>
                                    <div className="commonTable9">
                                        <div className="commonTheader">
                                            <div>使用过此手机的其他姓名</div>
                                            <div>最后使用时间</div>
                                        </div>
                                        <div className="commonTbody">
                                            {data.user_phone_suspicion.phone_with_other_names.length?data.user_phone_suspicion.phone_with_other_names.map((item, index)=>{
                                                return (
                                                <div className="commonTr">
                                                    <div>{item.susp_name}</div>
                                                    <div>{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</div>
                                                </div>
                                                )
                                            })
                                            :
                                            <div className="commonTr">
                                                <div className="noDate">暂无数据</div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="commonTable9">
                                        <div className="commonTheader">
                                            <div>使用过此手机的其他身份证</div>
                                            <div>最后使用时间</div>
                                        </div>
                                        <div className="commonTbody">
                                            {data.user_phone_suspicion.phone_with_other_idcards.length?data.user_phone_suspicion.phone_with_other_idcards.map((item, index)=>{
                                                return (
                                                <div className="commonTr">
                                                    <div>{item.susp_idcard}</div>
                                                    <div>{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</div>
                                                </div>
                                                )
                                            })
                                            :
                                            <div className="commonTr">
                                                <div className="noDate">暂无数据</div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="commonTable9">
                                        <div className="commonTheader">
                                            <div>提供数据的机构类型</div>
                                            <div>最后使用时间</div>
                                        </div>
                                        <div className="commonTbody">
                                            {data.user_phone_suspicion.phone_applied_in_orgs.length?data.user_phone_suspicion.phone_applied_in_orgs.map((item, index)=>{
                                                return (
                                                <div className="commonTr">
                                                    <div>{item.susp_org_type}</div>
                                                    <div>{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</div>
                                                </div>
                                                )
                                            })
                                            :
                                            <div className="commonTr">
                                                <div className="noDate">暂无数据</div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />身份风险</h3>
                                    <div className="commonTable9">
                                        <div className="commonTheader">
                                            <div>使用过此身份证的其他姓名</div>
                                            <div>最后使用时间</div>
                                        </div>
                                        <div className="commonTbody">
                                            {data.user_idcard_suspicion.idcard_with_other_names.length?data.user_idcard_suspicion.idcard_with_other_names.map((item, index)=>{
                                                return (
                                                <div className="commonTr">
                                                    <div>{item.susp_name}</div>
                                                    <div>{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</div>
                                                </div>
                                                )
                                            })
                                            :
                                            <div className="commonTr">
                                                <div className="noDate">暂无数据</div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="commonTable9">
                                        <div className="commonTheader2">
                                            <div>使用过此手机的其他身份证</div>
                                            <div>最后使用时间</div>
                                            <div>运营商名称</div>
                                            <div>归属地</div>
                                            <div>出现次数</div>
                                        </div>
                                        <div className="commonTbody">
                                            {data.user_idcard_suspicion.idcard_with_other_phones.length?data.user_idcard_suspicion.idcard_with_other_phones.map((item, index)=>{
                                                return (
                                                <div className="commonTr2">
                                                    <div>{item.susp_phone}</div>
                                                    <div>{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</div>
                                                    <div>{item.susp_phone_operator}</div>
                                                    <div>{item.susp_phone_province+item.susp_phone_city}</div>
                                                    <div>{item.times}</div>
                                                </div>
                                                )
                                            })
                                            :
                                            <div className="commonTr">
                                                <div className="noDate">暂无数据</div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="commonTable9">
                                        <div className="commonTheader">
                                            <div>提供数据的机构类型</div>
                                            <div>最后使用时间</div>
                                        </div>
                                        <div className="commonTbody">
                                            {data.user_idcard_suspicion.idcard_applied_in_orgs.length?data.user_idcard_suspicion.idcard_applied_in_orgs.map((item, index)=>{
                                                return (
                                                <div className="commonTr">
                                                    <div>{item.susp_org_type}</div>
                                                    <div>{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</div>
                                                </div>
                                                )
                                            })
                                            :
                                            <div className="commonTr">
                                                <div className="noDate">暂无数据</div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />机构历史查询</h3>
                                    <div className="commonTable9">
                                        <div className="commonTheader4">
                                            <div>查询机构数</div>
                                            <div>{data.user_searched_history_by_orgs.length}(历史查询机构统计-已去重)</div>
                                        </div>
                                        <div className="commonTheader3">
                                            <div>查询日期</div>
                                            <div>机构类型</div>
                                            <div>是否是本机构查询</div>
                                        </div>
                                        <div className="commonTbody">
                                            {data.user_searched_history_by_orgs.length?data.user_searched_history_by_orgs.map((item, index)=>{
                                                return (
                                                <div className="commonTr3">
                                                    <div>{item.searched_date}</div>
                                                    <div>{item.searched_org}</div>
                                                    <div>{item.org_self?"是":"否"}</div>
                                                </div>
                                                )
                                            })
                                            :
                                            <div className="commonTr">
                                                <div className="noDate">暂无数据</div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />机构批量查询历史</h3>
                                    <div className="commonTable9">
                                        <div className="commonTheader3">
                                            <div>查询日期</div>
                                            <div>机构类型</div>
                                            <div>是否是本机构查询</div>
                                        </div>
                                        <div className="commonTbody">
                                            {data.user_batch_searched_history_by_orgs.length?data.user_batch_searched_history_by_orgs.map((item, index)=>{
                                                return (
                                                <div className="commonTr3">
                                                    <div>{item.searched_date}</div>
                                                    <div>{item.searched_org}</div>
                                                    <div>{item.org_self?"是":"否"}</div>
                                                </div>
                                                )
                                            })
                                            :
                                            <div className="commonTr">
                                                <div className="noDate">暂无数据</div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />历史查询记录</h3>
                                    {histArr.map((item, index)=>{
                                        return (
                                            <div key={index} className="commonTable8">
                                                <div className="commonTheader">{item.title}</div>
                                                <div className="commonTbody">
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询次数</div>
                                                        <div className="commonListMsg">{item.cnt}</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询机构数</div>
                                                        <div className="commonListMsg">{item.cnt_org}</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">现金贷查询次数</div>
                                                        <div className="commonListMsg">{item.cnt_cash}</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">现金贷查询机构数</div>
                                                        <div className="commonListMsg">{item.cnt_org_cash}</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">消费分期查询次数</div>
                                                        <div className="commonListMsg">{item.cnt_cf}</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">消费分期查询机构数</div>
                                                        <div className="commonListMsg">{item.cnt_org_cf}</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">信用卡代还查询次数</div>
                                                        <div className="commonListMsg">{item.cnt_cc}</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">信用卡代还查询机构数</div>
                                                        <div className="commonListMsg">{item.cnt_org_cc}</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询次数在总体查询分布中的百分位</div>
                                                        <div className="commonListMsg">{(item.pct_cnt_all*100).toFixed(2)}%</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询机构数在总体查询分布中的百分位</div>
                                                        <div className="commonListMsg">{(item.pct_cnt_org_all*100).toFixed(2)}%</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询次数在现金贷查询分布中的百分位</div>
                                                        <div className="commonListMsg">{(item.pct_cnt_cash*100).toFixed(2)}%</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询机构数在现金贷查询分布中的百分位</div>
                                                        <div className="commonListMsg">{(item.pct_cnt_org_cash*100).toFixed(2)}%</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询次数在消费分期查询分布中的百分位</div>
                                                        <div className="commonListMsg">{(item.pct_cnt_cf*100).toFixed(2)}%</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询机构数在消费分期查询分布中的百分位</div>
                                                        <div className="commonListMsg">{(item.pct_cnt_org_cf*100).toFixed(2)}%</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询次数在信用卡代还查询分布中的百分位</div>
                                                        <div className="commonListMsg">{(item.pct_cnt_cc*100).toFixed(2)}%</div>
                                                    </div>
                                                    <div className="commonTr2">
                                                        <div className="commonListName">查询机构数在信用卡代还查询分布中的百分位</div>
                                                        <div className="commonListMsg">{(item.pct_cnt_org_cc*100).toFixed(2)}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />注册信息</h3>
                                    <div className="commonTable8">
                                        <div className="commonTheader">
                                            <div>注册APP数量</div>
                                            <div>{!data.user_register_orgs.register_cnt?"0":data.user_register_orgs.register_cnt}</div>
                                        </div>
                                        <div className="commonTbody">
                                            <div className="commonTr">
                                                <div className="commonListName2">注册APP统计</div>
                                                <div className="commonListMsg2">
                                                    <div className="commonListMsg2_header">
                                                        <div className="left">APP类型</div>
                                                        <div className="right">注册数量</div>
                                                    </div>
                                                    <div className="commonListMsg2_list">
                                                        <div className="left">{!data.user_register_orgs.register_orgs_statistics.label?"无相关数据":data.user_register_orgs.register_orgs_statistics.label}</div>
                                                        <div className="right">{!data.user_register_orgs.register_orgs_statistics.count?"无相关数据":data.user_register_orgs.register_orgs_statistics.count}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />消费标签信息</h3>
                                    <div className="commonTable8">
                                        <div className="commonTbody">
                                            <div className="commonTr2">
                                                <div className="commonListName1">是否有信用卡</div>
                                                <div className="commonListMsg1">{!data.consumer_label.if_own_cc?"否":"是"}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">是否有白金卡</div>
                                                <div className="commonListMsg1">{!data.consumer_label.if_own_wg_cc?"否":"是"}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">是否有车</div>
                                                <div className="commonListMsg1">{!data.consumer_label.if_own_car?"否":"是"}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">是否购买保险产品</div>
                                                <div className="commonListMsg1">{!data.consumer_label.if_pay_ins?"否":"是"}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">是否购买理财产品</div>
                                                <div className="commonListMsg1">{!data.consumer_label.if_fin_buy_pre6?"否":"是"}</div>
                                            </div>
                                            <div className="commonTr2">
                                                <div className="commonListName1">消费能力</div>
                                                <div className="commonListMsg1">{!data.consumer_label.cst_score_finally?"无相关数据":data.consumer_label.cst_score_finally}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default V3Reports