import React from 'react';
import {Modal,Form} from 'antd'
import './v3Search.less'
import $ from 'jquery';
import rollTo from '../../commonJS/rollTo1.js';

class v3Search extends React.Component {
    constructor(props) {
        super(props);
    };
    state = {
        render_count: 1
    }

    close_modal () {
        this.props.closeMoadl();
    }

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

    render() {
        var sj = this.formatDateTime('2018-11-21 09:11:18');
        console.log("格式化时间：");
        console.log(sj);
        const queryResult = this.props.data;

        /*手机存疑;*/
        let phoneQuestion = null;
        let phoneQuestion2 = null;
        let phoneQuestion3 = null;
        if(queryResult.user_phone_suspicion.phone_with_other_names.length == 0){
            phoneQuestion = <li className="noData">暂无相关数据！</li>;
        }else{
            queryResult.user_phone_suspicion.phone_with_other_names.map((item,index)=>{
                phoneQuestion = <li className="listTip">
                                    <span className="listTipItem">{item.susp_name}</span>
                                    <span className="listTipItem">{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</span>
                                </li>;
            })
        }

        if(queryResult.user_phone_suspicion.phone_with_other_idcards.length == 0){
            phoneQuestion2 = <li className="noData">暂无相关数据！</li>;
        }else{
            queryResult.user_phone_suspicion.phone_with_other_idcards.map((item,index)=>{
                phoneQuestion2 = <li className="listTip">
                                    <span className="listTipItem">{item.susp_idcard}</span>
                                    <span className="listTipItem">{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</span>
                                </li>;
            })
        }

        if(queryResult.user_phone_suspicion.phone_applied_in_orgs.length == 0){
            phoneQuestion3 = <li className="noData">暂无相关数据！</li>;
        }else{
            queryResult.user_phone_suspicion.phone_applied_in_orgs.map((item,index)=>{
                phoneQuestion3 = <li className="listTip">
                                    <span className="listTipItem">{item.susp_org_type}</span>
                                    <span className="listTipItem">{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</span>
                                </li>;
            })
        }

        /*身份证存疑;*/
        let idQuestion = null;
        let idQuestion2 = null;
        let idQuestion3 = null;
        if(queryResult.user_idcard_suspicion.idcard_with_other_names.length == 0){
            idQuestion = <li className="noData">暂无相关数据！</li>;
        }else{
            queryResult.user_idcard_suspicion.idcard_with_other_names.map((item,index)=>{
                idQuestion = <li className="listTip">
                                    <span className="listTipItem">{item.susp_name}</span>
                                    <span className="listTipItem">{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</span>
                                </li>;
            })
        }

        if(queryResult.user_idcard_suspicion.idcard_with_other_phones.length == 0){
            idQuestion2 = <li className="noData">暂无相关数据！</li>;
        }else{
            queryResult.user_idcard_suspicion.idcard_with_other_phones.map((item,index)=>{
                idQuestion2 = <li className="listTip">
                                <span className="listTipItem col5">{item.susp_phone}</span>
                                <span className="listTipItem col5">{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</span>
                                <span className="listTipItem col5">{item.susp_phone_operator}</span>
                                <span className="listTipItem col5">{item.susp_phone_province+item.susp_phone_city}</span>
                                <span className="listTipItem col5">{item.times}</span>
                            </li>;
            })
        }

        if(queryResult.user_idcard_suspicion.idcard_applied_in_orgs.length == 0){
            idQuestion3 = <li className="noData">暂无相关数据！</li>;
        }else{
            queryResult.user_idcard_suspicion.idcard_applied_in_orgs.map((item,index)=>{
                idQuestion3 = <li className="listTip">
                            <span className="listTipItem">{item.susp_org_type}</span>
                            <span className="listTipItem">{!item.susp_updt?'':this.formatDateTime(item.susp_updt)}</span>
                        </li>;
            })
        }

        /*机构历史查询;*/
        let institutionHist = null;
        if(queryResult.user_searched_history_by_orgs.length == 0){
            institutionHist = <li className="noData">暂无相关数据！</li>;
        }else{
            queryResult.user_searched_history_by_orgs.map((item,index)=>{
                institutionHist = <li className="listTip">
                                <span className="listTipItem col3">{item.searched_date}</span>
                                <span className="listTipItem col3">{item.searched_org}</span>
                                <span className="listTipItem col3">{item.org_self}</span>
                            </li>;
            })
        }

        /*机构批量查询历史;*/
        let batchQueryHist = null;
        if(queryResult.user_batch_searched_history_by_orgs.length == 0){
            batchQueryHist = <li className="noData">暂无相关数据！</li>;
        }else{
            queryResult.user_batch_searched_history_by_orgs.map((item,index)=>{
                batchQueryHist = <li className="listTip">
                                    <span className="listTipItem col3">{item.searched_date}</span>
                                    <span className="listTipItem col3">{item.searched_org}</span>
                                    <span className="listTipItem col3">{item.org_self}</span>
                                </li>;
            })
        }

        /*历史查询记录;*/
        const histQueryRecord7 = queryResult.user_searched_history_by_day.d_7;
        const histQueryRecord15 = queryResult.user_searched_history_by_day.d_15;
        const histQueryRecord30 = queryResult.user_searched_history_by_day.d_30;
        const histQueryRecord60 = queryResult.user_searched_history_by_day.d_60;
        const histQueryRecord90 = queryResult.user_searched_history_by_day.d_90;
        const histQueryRecord120 = queryResult.user_searched_history_by_day.m_4;
        const histQueryRecord150 = queryResult.user_searched_history_by_day.m_5;
        const histQueryRecord180 = queryResult.user_searched_history_by_day.m_6;
        const histQueryRecord270 = queryResult.user_searched_history_by_day.m_9;
        const histQueryRecord360 = queryResult.user_searched_history_by_day.m_12;
        const histQueryRecord540 = queryResult.user_searched_history_by_day.m_18;
        const histQueryRecord720 = queryResult.user_searched_history_by_day.m_24;

        /*注册信息;*/
        const registerInfor = queryResult.user_register_orgs;

        /*消费标签信息;*/
        const consumeLabelInfor = queryResult.consumer_label;
        
        // const data = this.props.datalist
        const data = this.props.data
        var _this =this
        $(function () {
            //侧导航滚动点亮
            if (_this.state.render_count == 1) {
                _this.setState({
                    render_count: 2
                })
                $("#base_info").addClass("active");//默认第一个浮动侧导航点亮
                $("#base_info").rollTo({
                    warpBody: '.data_list_body_v3',
                    oFinish: "#base_info_e", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: 0,
                    fnAdditional: "" //追加方法
                });
                // $("#debit_info").rollTo({
                //     warpBody: '.data_list_body_v3',
                //     oFinish: "#debit_info_e", //要滚动到的元素
                //     sSpeed: "300",  //滚动速度
                //     bMonitor: true, //是否楼层监听
                //     sClass: "active", //楼层监听时需要添加的样式
                //     iBias: 0,
                //     fnAdditional: "" //追加方法
                // });
                $("#social_feature_module").rollTo({
                    warpBody: '.data_list_body_v3',
                    oFinish: "#social_feature_module_e", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: 0,
                    fnAdditional: "" //追加方法
                });
                $("#mobile_question").rollTo({
                    warpBody: '.data_list_body_v3',
                    oFinish: "#mobile_question_e", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: 0,
                    fnAdditional: "" //追加方法
                });
                $("#idCard_question").rollTo({
                    warpBody: '.data_list_body_v3',
                    oFinish: "#idCard_question_e", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: 0,
                    fnAdditional: "" //追加方法
                });
                $("#institutional_history").rollTo({
                    warpBody: '.data_list_body_v3',
                    oFinish: "#institutional_history_e", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: 0,
                    fnAdditional: "" //追加方法
                });
                $("#organization_batch_history").rollTo({
                    warpBody: '.data_list_body_v3',
                    oFinish: "#organization_batch_history_e", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: 0,
                    fnAdditional: "" //追加方法
                });
                $("#historical_record").rollTo({
                    warpBody: '.data_list_body_v3',
                    oFinish: "#historical_record_e", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: 0,
                    fnAdditional: "" //追加方法
                });
                $("#registration_info").rollTo({
                    warpBody: '.data_list_body_v3',
                    oFinish: "#registration_info_e", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: 0,
                    fnAdditional: "" //追加方法
                });
                $("#consumer_label_info").rollTo({
                    warpBody: '.data_list_body_v3',
                    oFinish: "#consumer_label_info_e", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: 0,
                    fnAdditional: "" //追加方法
                });
            }
            
        });

        return(
            <div>
                <div className="data_list_wrap_v3">
                    <div className="data_list_body_v3">
                        <div className="data_list_body_v3_left">
                            <ul className="data_nav">
                                <li id="base_info" className="active">基本信息</li>
                                <li id="social_feature_module">社交特征模块</li>
                                <li id="mobile_question">手机存疑</li>
                                <li id="idCard_question">身份证存疑</li>
                                <li id="institutional_history">机构历史查询</li>
                                <li id="organization_batch_history">机构批量查询历史</li>
                                <li id="historical_record">历史查询记录</li>
                                <li id="registration_info">注册信息</li>
                                <li id="consumer_label_info">消费标签信息</li>
                                {/* <li id="debit_info">借条信息</li> */}
                            </ul>
                        </div>
                        <div className="data_list_body_v3_right">
                            <div className="msg_item" id="base_info_e">
                                <div className="item_title">基本信息</div>
                                <div className="item_body">
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left">姓名</div>
                                            <div className="msgT1Right">{data.user_basic.user_name}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">身份证号码</div>
                                            <div className="msgT1Right">{data.user_basic.user_idcard}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left">年龄</div>
                                            <div className="msgT1Right">{data.user_basic.user_age}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">身份证所在地</div>
                                            <div className="msgT1Right">{data.user_basic.user_province} {data.user_basic.user_city} {data.user_basic.user_region}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left">性别</div>
                                            <div className="msgT1Right">{data.user_basic.user_gender}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">手机所属运营商</div>
                                            <div className="msgT1Right">{data.user_basic.user_phone_operator}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left">手机号码</div>
                                            <div className="msgT1Right">{data.user_basic.user_phone}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">符合身份证号码编码规范</div>
                                            <div className="msgT1Right">{data.user_basic.user_idcard_valid? '是':'否'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="msg_item" id="social_feature_module_e">
                                <div className="item_title">社交特征</div>
                                <div className="item_body">
                                    <div className="list_sig">
                                        <div className="msgTitleT1">基本社交</div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT2">
                                            <div className="msgT2Left">社交质量分</div>
                                            <div className="msgT2Right">{data.user_gray.phone_gray_score}（分数区间为0—100，10分以下为高危人群）</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT2">
                                            <div className="msgT2Left">社交活跃度</div>
                                            <div className="msgT2Right">{data.user_gray.social_liveness}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT2">
                                            <div className="msgT2Left">社交影响力</div>
                                            <div className="msgT2Right">{data.user_gray.social_influence}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT2">
                                            <div className="msgT2Left">是否曾被授权查询</div>
                                            <div className="msgT2Right">{data.user_gray.has_report? '是': '否'}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT2">
                                            <div className="msgT2Left">最近活跃时间</div>
                                            <div className="msgT2Right">{!data.user_gray.recent_active_time?'':this.formatDateTime(data.user_gray.recent_active_time)}（以下联系人信息的统计窗口在最近活跃时间的前半年内）</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT2">
                                            <div className="msgT2Left">被标记的黑名单分类</div>
                                            <div className="msgT2Right">{data.user_blacklist.blacklist_category.map((list, index) => {
                                                return (<span key={index}>{list}</span>)
                                            })}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT2">
                                            <div className="msgT2Left">姓名和手机是否在黑名单</div>
                                            <div className="msgT2Right">{data.user_blacklist.blacklist_name_with_phone}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT2">
                                            <div className="msgT2Left">姓名和手机黑名单信息更新时间</div>
                                            <div className="msgT2Right">{!data.user_blacklist.blacklist_update_time_name_phone?'':this.formatDateTime(data.user_blacklist.blacklist_update_time_name_phone)}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT2">
                                            <div className="msgT2Left">身份证和姓名是否在黑名单</div>
                                            <div className="msgT2Right">{data.user_blacklist.blacklist_name_with_idcard}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT2">
                                            <div className="msgT2Left">身份证和姓名黑名单信息更新时间</div>
                                            <div className="msgT2Right">{!data.user_blacklist.blacklist_update_time_name_idcard?'':this.formatDateTime(data.user_blacklist.blacklist_update_time_name_idcard)}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou" style={{height: 'auto'}}>
                                        <div className="msgT2" style={{overflow: 'hidden',height: 'auto'}}>
                                            <div className="msgT2Left">黑名单详细信息</div>
                                            <div className="msgT2Right2">
                                                <div className="blacklist">
                                                    <div className="blacklistLeft">名称</div>
                                                    <div className="blacklistRight">内容</div>
                                                </div>
                                                {data.user_blacklist.blacklist_details.map((list, index) => {
                                                    <div className="blacklist" key={index}>
                                                        <div className="blacklistLeft">{list.details_key}</div>
                                                        <div className="blacklistRight">{list.details_value}</div>
                                                    </div>
                                                })}
                                                {data.user_blacklist.blacklist_details.length == 0?
                                                    <div className="blacklist" style={{textIndent: 0, textAlign: 'center'}}>暂无数据</div>
                                                    :
                                                    ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_body">
                                    <div className="list_sig">
                                        <div className="msgTitleT1">联系人数相关字段</div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">主动联系人数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_to_all}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">主动联系人数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_to_all?'':(data.user_gray.contacts_number_statistic.pct_cnt_to_all*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">主动联系的黑号数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_to_black}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">主动联系的黑号数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_to_black?'':(data.user_gray.contacts_number_statistic.pct_cnt_to_black*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">主动联系人中曾为申请人的人数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_to_applied}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">主动联系人曾为申请人的人数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_to_applied?'':(data.user_gray.contacts_number_statistic.pct_cnt_to_applied*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">被动联系人数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_be_all}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">被动联系人数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_be_all?'':(data.user_gray.contacts_number_statistic.pct_cnt_be_all*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">被动联系的黑号数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_be_black}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">被动联系的黑号数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_be_black?'':(data.user_gray.contacts_number_statistic.pct_cnt_be_black*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">被动联系人中曾为申请人的人数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_be_applied}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">被动联系人中曾为申请人的人数在群体中百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_be_applied?'':(data.user_gray.contacts_number_statistic.pct_cnt_be_applied*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">一阶联系人总数(主动、被动联系人数合并去重)</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_all}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">一阶联系人数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_all?'':(data.user_gray.contacts_number_statistic.pct_cnt_all*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">一阶联系(直接联系)黑号总数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_black}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">一阶联系黑号数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_black?'':(data.user_gray.contacts_number_statistic.pct_cnt_black*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">二阶联系(间接联系)黑号总数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_black2}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">二阶联系黑号总数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_black2?'':(data.user_gray.contacts_number_statistic.pct_cnt_black2*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">联系人曾为申请人的人数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_applied}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">联系人曾为申请人的人数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_applied?'':(data.user_gray.contacts_number_statistic.pct_cnt_applied*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">一阶联系人黑号数占比</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.black_ratio?'':(data.user_gray.contacts_number_statistic.black_ratio*100).toFixed(2)+'%'}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">一阶联系人黑号数占比在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_black_ratio?'':(data.user_gray.contacts_number_statistic.pct_black_ratio*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">引起黑名单的一阶联系人数</div>
                                            <div className="msgT1Right2">{data.user_gray.contacts_number_statistic.cnt_router}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">引起黑名单的一阶联系人数在群体中的百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_cnt_router?'':(data.user_gray.contacts_number_statistic.pct_cnt_router*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left2">引起黑名单的一阶联系人数占比</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.router_ratio?'':(data.user_gray.contacts_number_statistic.router_ratio*100).toFixed(2)+'%'}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left2">引起黑名单的一阶联系人数占比在群体中百分位</div>
                                            <div className="msgT1Right2">{!data.user_gray.contacts_number_statistic.pct_router_ratio?'':(data.user_gray.contacts_number_statistic.pct_router_ratio*100).toFixed(2)+'%'}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_body">
                                    <div className="list_sig">
                                        <div className="msgTitleT1">联系权重R、F、M相关字段</div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与所有联系人的最近主动通话时间</div>
                                            <div className="msgT1Right">{!data.user_gray.contacts_rfm.recent_time_to_all?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_to_all)}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与所有联系人的最近被动通话时间</div>
                                            <div className="msgT1Right">{!data.user_gray.contacts_rfm.recent_time_be_all?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_be_all)}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与黑号的最近主动通话时间</div>
                                            <div className="msgT1Right">{!data.user_gray.contacts_rfm.recent_time_to_black?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_to_black)}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与黑号的最近被动通话时间</div>
                                            <div className="msgT1Right">{!data.user_gray.contacts_rfm.recent_time_be_black?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_be_black)}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与申请人的最近主动通话时间</div>
                                            <div className="msgT1Right">{!data.user_gray.contacts_rfm.recent_time_to_applied?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_to_applied)}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与申请人的最近被动通话时间</div>
                                            <div className="msgT1Right">{!data.user_gray.contacts_rfm.recent_time_be_applied?'':this.formatDateTime(data.user_gray.contacts_rfm.recent_time_be_applied)}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与所有联系人的主动总通话次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.call_cnt_to_all}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与所有联系人的被动总通话次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.call_cnt_be_all}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与黑号的主动总通话次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.call_cnt_to_black}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与黑号的被动总通话次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.call_cnt_be_black}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与申请人的主动通话次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.call_cnt_to_applied}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与申请人的被动通话次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.call_cnt_be_applied}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与所有联系人的主动总通话时长(秒)</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.time_spent_to_all}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3"> 与所有联系人的被动总通话时长(秒)</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.time_spent_be_all}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与黑号的主动通话时长(秒)</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.time_spent_to_black}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与黑号的被动通话时长(秒)</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.time_spent_be_black}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与申请人的主动通话时长(秒)</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.time_spent_to_applied}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3"> 与申请人的被动通话时长(秒)</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_rfm.time_spent_be_applied}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_body">
                                    <div className="list_sig">
                                        <div className="msgTitleT1">与联系人的最大亲密度</div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与所有联系人的最大主动联系亲密度</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_closest.weight_to_all}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与所有联系人的最大被动联系亲密度</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_closest.weight_be_all}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与所有联系人的最大互动联系亲密度</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_closest.weight_all}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与黑号的最大主动联系亲密度</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_closest.weight_to_black}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与黑号的最大被动联系亲密度</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_closest.weight_be_black}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与黑号的最大互动联系亲密度</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_closest.weight_black}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与申请人的最大主动联系亲密度</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_closest.weight_to_applied}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与申请人的最大被动联系亲密度</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_closest.weight_be_applied}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">与申请人的最大互动联系亲密度</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_closest.weight_applied}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_body">
                                    <div className="list_sig">
                                        <div className="msgTitleT1">联系人灰度分信息</div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">主动联系最亲密联系人的灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.most_familiar_to_all}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">被动联系最亲密联系人的灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.most_familiar_be_all}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">互动联系最亲密联系人的灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.most_familiar_all}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">主动联系最亲密申请人的灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.most_familiar_to_applied}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">被动联系最亲密申请人的灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.most_familiar_be_applied}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">互动联系最亲密申请人的灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.most_familiar_applied}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">主动联系的联系人的最高灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.to_max}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">主动联系的联系人的平均灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.to_mean}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">主动联系的联系人的最低灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.to_min}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">被动联系的联系人的最高灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.be_max}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">被动联系的联系人的平均灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.be_mean}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">被动联系的联系人的最低灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.be_min}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">联系人的最高灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.max}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">联系人的平均灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.mean}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">联系人的最低灰度分</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_gray_score.min}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_body">
                                    <div className="list_sig">
                                        <div className="msgTitleT1">联系人的分布</div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">主动联系的亲密联系人数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_relation_distribution.to_is_familiar}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">主动联系的中等亲密联系人数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_relation_distribution.to_median_familiar}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">主动联系的非亲密联系人数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_relation_distribution.to_not_familiar}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">被动联系的亲密联系人数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_relation_distribution.be_is_familiar}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">被动联系的中等亲密联系人数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_relation_distribution.be_median_familiar}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">被动联系的非亲密联系人数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_relation_distribution.be_not_familiar}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">互动联系的亲密联系人数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_relation_distribution.is_familiar}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">互动联系的中等亲密联系人数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_relation_distribution.median_familiar}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">互动联系的非亲密联系人数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_relation_distribution.not_familiar}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_body">
                                    <div className="list_sig">
                                        <div className="msgTitleT1">联系人的查询历史</div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">主动联系的人的最近一次查询时间</div>
                                            <div className="msgT1Right">{!data.user_gray.contacts_query.to_recent_query_time?'':this.formatDateTime(data.user_gray.contacts_query.to_recent_query_time)}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">被动联系的人的最近一次查询时间</div>
                                            <div className="msgT1Right">{!data.user_gray.contacts_query.be_recent_query_time?'':this.formatDateTime(data.user_gray.contacts_query.be_recent_query_time)}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前半月内主动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_query_cnt_05}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前半月内主动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_org_cnt_05}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前半月内被动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_query_cnt_05}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前半月内被动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_org_cnt_05}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前半月内联系人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.query_cnt_05}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前半月内联系人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.org_cnt_05}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前1月内主动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_query_cnt_1}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前1月内主动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_org_cnt_1}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前1月内被动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_query_cnt_1}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前1月内被动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_org_cnt_1}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前1月内联系人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.query_cnt_1}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前1月内联系人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.org_cnt_1}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前2月内主动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_query_cnt_2}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前2月内主动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_query_cnt_2}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前2月内被动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_org_cnt_2}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前2月内被动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_org_cnt_2}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前2月内联系人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.query_cnt_2}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前2月内联系人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.org_cnt_2}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前3月内主动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_query_cnt_3}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前3月内主动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_org_cnt_3}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前3月内被动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_query_cnt_3}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前3月内被动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_org_cnt_3}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前3月内联系人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.query_cnt_3}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前3月内联系人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.org_cnt_3}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前6月内主动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_query_cnt_6}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前6月内主动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_org_cnt_6}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前6月内被动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_query_cnt_6}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前6月内被动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_org_cnt_6}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前6月内联系人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.query_cnt_6}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前6月内联系人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.org_cnt_6}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前9月内主动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_query_cnt_9}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前9月内主动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_org_cnt_9}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前9月内被动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_query_cnt_9}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前9月内被动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_org_cnt_9}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前9月内联系人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.query_cnt_9}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前9月内联系人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.org_cnt_9}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前12月内主动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_query_cnt_12}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前12月内主动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.to_org_cnt_12}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前12月内被动联系的人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_query_cnt_12}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前12月内被动联系的人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.be_org_cnt_12}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前12月内联系人的查询次数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.query_cnt_12}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left3">前12月内联系人的查询机构数</div>
                                            <div className="msgT1Right">{data.user_gray.contacts_query.org_cnt_12}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            {/* 手机存疑开始的部分 */}
                            <div className="listItem" id="mobile_question_e">
                                <h3 className="listItemTit">手机风险</h3>
                                <div className="listTipsBox">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem">使用过此手机的其他姓名</span>
                                        <span className="listTipsTitItem">最后使用时间</span>
                                    </h4>
                                    <ul className="listTips">
                                        {phoneQuestion}
                                    </ul>
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem">使用过此手机的其他身份证</span>
                                        <span className="listTipsTitItem">最后使用时间</span>
                                    </h4>
                                    <ul className="listTips">
                                        {phoneQuestion2}
                                    </ul>
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem">提供数据的机构类型</span>
                                        <span className="listTipsTitItem">最后使用时间</span>
                                    </h4>
                                    <ul className="listTips">
                                        {phoneQuestion3}
                                    </ul>
                                </div>
                            </div>
                            {/* 身份证存疑 */}
                            <div className="listItem" id="idCard_question_e">
                                <h3 className="listItemTit">身份风险</h3>
                                <div className="listTipsBox">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem">使用过此身份证的其他姓名</span>
                                        <span className="listTipsTitItem">最后使用时间</span>
                                    </h4>
                                    <ul className="listTips">
                                        {idQuestion}
                                    </ul>
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem col5">使用过此身份证的其他手机</span>
                                        <span className="listTipsTitItem col5">最后使用时间</span>
                                        <span className="listTipsTitItem col5">运营商名称</span>
                                        <span className="listTipsTitItem col5">归属地</span>
                                        <span className="listTipsTitItem col5">出现次数</span>
                                    </h4>
                                    <ul className="listTips">
                                        {idQuestion2}
                                    </ul>
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem">提供数据的机构类型</span>
                                        <span className="listTipsTitItem">最后使用时间</span>
                                    </h4>
                                    <ul className="listTips">
                                        {idQuestion3}
                                    </ul>
                                </div>
                            </div>

                            {/* 机构历史查询 */}
                            <div className="listItem" id="institutional_history_e">
                                <h3 className="listItemTit">机构历史查询</h3>
                                <div className="listTipsBox">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem histQueryMark">查询机构数</span>
                                        <span className="listTipsTitItem histQuery">{queryResult.user_batch_searched_history_by_orgs.length}（历史查询机构统计-已去重）</span>
                                    </h4>
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem col3">查询日期</span>
                                        <span className="listTipsTitItem col3">机构类型</span>
                                        <span className="listTipsTitItem col3">是否是本机构查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        {institutionHist}
                                    </ul>
                                </div>
                            </div>

                            {/* 机构批量查询历史 */}
                            <div className="listItem" id="organization_batch_history_e">
                                <h3 className="listItemTit">机构批量查询历史</h3>
                                <div className="listTipsBox">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem col3">查询日期</span>
                                        <span className="listTipsTitItem col3">机构类型</span>
                                        <span className="listTipsTitItem col3">是否是本机构查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        {batchQueryHist}
                                    </ul>
                                </div>
                            </div>

                            {/* 历史查询记录 */}
                            <div className="listItem histQueryItem" id="historical_record_e">
                                <h3 className="listItemTit">历史查询记录</h3>
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>7天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord7.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord7.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord7.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord7.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord7.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord7.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord7.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord7.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord7.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord7.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord7.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord7.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord7.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord7.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord7.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord7.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 15天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>15天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord15.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord15.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord15.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord15.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord15.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord15.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord15.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord15.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord15.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord15.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord15.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord15.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord15.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord15.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord15.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord15.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 30天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>30天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord30.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord30.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord30.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord30.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord30.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord30.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord30.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord30.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord30.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord30.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord30.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord30.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord30.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord30.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord30.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord30.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 60天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>60天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord60.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord60.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord60.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord60.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord60.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord60.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord60.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord60.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord60.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord60.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord60.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord60.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord60.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord60.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord60.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord60.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 90天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>90天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord90.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord90.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord90.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord90.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord90.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord90.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord90.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord90.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord90.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord90.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord90.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord90.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord90.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord90.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord90.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord90.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 120天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>120天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord120.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord120.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord120.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord120.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord120.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord120.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord120.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord120.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord120.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord120.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord120.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord120.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord120.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord120.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord120.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord120.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 150天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>150天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord150.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord150.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord150.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord150.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord150.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord150.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord150.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord150.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord150.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord150.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord150.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord150.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord150.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord150.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord150.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord150.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 180天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>180天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord180.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord180.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord180.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord180.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord180.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord180.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord180.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord180.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord180.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord180.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord180.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord180.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord180.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord180.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord180.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord180.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 270天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>270天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord270.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord270.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord270.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord270.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord270.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord270.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord270.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord270.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord270.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord270.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord270.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord270.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord270.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord270.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord270.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord270.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 360天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>360天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord360.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord360.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord360.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord360.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord360.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord360.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord360.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord360.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord360.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord360.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord360.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord360.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord360.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord360.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord360.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord360.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 540天内历史查询 */}
                                <div className="listTipsBox daysHist">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>540天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord540.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord540.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord540.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord540.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord540.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord540.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord540.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord540.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord540.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord540.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord540.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord540.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord540.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord540.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord540.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord540.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* 720天内历史查询 */}
                                <div className="listTipsBox">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem"><i className="bd"></i>720天内历史查询</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord720.cnt}</span>
                                            <span className="listTipItem col4">查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord720.cnt_org}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">现金贷查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord720.cnt_cash}</span>
                                            <span className="listTipItem col4">现金贷查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord720.cnt_org_cash}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">消费分期查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord720.cnt_cf}</span>
                                            <span className="listTipItem col4">消费分期查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord720.cnt_org_cf}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">信用卡代还查询次数</span>
                                            <span className="listTipItem col4">{histQueryRecord720.cnt_cc}</span>
                                            <span className="listTipItem col4">信用卡代还查询机构数</span>
                                            <span className="listTipItem col4">{histQueryRecord720.cnt_org_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord720.pct_cnt_all*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在总体查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord720.pct_cnt_org_all*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord720.pct_cnt_cash*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在现金贷查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord720.pct_cnt_org_cash*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord720.pct_cnt_cf*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在消费分期查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord720.pct_cnt_org_cf*100).toFixed(2)}%</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">查询次数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord720.pct_cnt_cc*100).toFixed(2)}%</span>
                                            <span className="listTipItem col4">查询机构数在信用卡代还查询分布中的百分位</span>
                                            <span className="listTipItem col4">{(histQueryRecord720.pct_cnt_org_cc*100).toFixed(2)}%</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* 注册信息 */}
                            <div className="listItem registerInfor" id="registration_info_e">
                                <h3 className="listItemTit">注册信息</h3>
                                <div className="listTipsBox">
                                    <h4 className="listTipsTit">
                                        <span className="listTipsTitItem histQueryMark">注册APP数量</span>
                                        <span className="listTipsTitItem histQuery">{!registerInfor.register_cnt?"无相关数据":registerInfor.register_cnt}</span>
                                    </h4>
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <div className="listTipItemLeft">注册APP统计</div>
                                            <div className="listTipItemRight">
                                                <div className="listTipItemBox">
                                                    <span className="listTipItem col2">APP类型</span>
                                                    <span className="listTipItem col2">{!registerInfor.register_orgs_statistics.label?"无相关数据":registerInfor.register_orgs_statistics.label}</span>
                                                </div>
                                                <div className="listTipItemBox">
                                                    <span className="listTipItem col2">注册数量</span>
                                                    <span className="listTipItem col2">{!registerInfor.register_orgs_statistics.count?"无相关数据":registerInfor.register_orgs_statistics.count}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* 消费标签信息 */}
                            <div className="listItem consumeLabelInforItem" id="consumer_label_info_e">
                                <h3 className="listItemTit">消费标签信息</h3>
                                <div className="listTipsBox">
                                    <ul className="listTips">
                                        <li className="listTip">
                                            <span className="listTipItem col4">是否有信用卡</span>
                                            <span className="listTipItem col4">{!consumeLabelInfor.if_own_cc?"无相关数据":consumeLabelInfor.if_own_cc}</span>
                                            <span className="listTipItem col4">是否有白金卡</span>
                                            <span className="listTipItem col4">{!consumeLabelInfor.if_own_wg_cc?"无相关数据":consumeLabelInfor.if_own_wg_cc}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">是否有车</span>
                                            <span className="listTipItem col4">{!consumeLabelInfor.if_own_car?"无相关数据":consumeLabelInfor.if_own_car}</span>
                                            <span className="listTipItem col4">是否购买保险产品</span>
                                            <span className="listTipItem col4">{!consumeLabelInfor.if_pay_ins?"无相关数据":consumeLabelInfor.if_pay_ins}</span>
                                        </li>
                                        <li className="listTip">
                                            <span className="listTipItem col4">是否购买理财产品</span>
                                            <span className="listTipItem col4">{!consumeLabelInfor.if_fin_buy_pre6?"无相关数据":consumeLabelInfor.if_fin_buy_pre6}</span>
                                            <span className="listTipItem col4">消费能力</span>
                                            <span className="listTipItem col4">{!consumeLabelInfor.cst_score_finally?"无相关数据":consumeLabelInfor.cst_score_finally}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* 借条信息 */}
                            {/* <div className="msg_item" id="debit_info_e">
                                <div className="item_title">借条信息</div>
                                <div className="item_body">
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left">借条借贷总次数</div>
                                            <div className="msgT1Right">{data.iou_statistic.total_loan_times}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">借条借贷总金额</div>
                                            <div className="msgT1Right">{data.iou_statistic.total_loan_amount}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left">借条最近状态</div>
                                            <div className="msgT1Right">{data.iou_statistic.recent_iou_status}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">最近一次借入日期</div>
                                            <div className="msgT1Right">{!data.iou_statistic.recent_loan_time?'':this.formatDateTime(data.iou_statistic.recent_loan_time)}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left">最近一次应还款日期</div>
                                            <div className="msgT1Right">{!data.iou_statistic.recent_pay_back_time?'':this.formatDateTime(data.iou_statistic.recent_pay_back_time)}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">还款中借款笔数</div>
                                            <div className="msgT1Right">{data.iou_statistic.in_repayment_times}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left">还款中本金总额</div>
                                            <div className="msgT1Right">{data.iou_statistic.in_repayment_amount}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">还款中利息总额</div>
                                            <div className="msgT1Right">{data.iou_statistic.in_repayment_interest}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left">逾期已还借款笔数</div>
                                            <div className="msgT1Right">{data.iou_statistic.overdue_payment_times}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">逾期已还本金总额</div>
                                            <div className="msgT1Right">{data.iou_statistic.overdue_payment_amount}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left">逾期已还利息总额</div>
                                            <div className="msgT1Right">{data.iou_statistic.overdue_payment_interest}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">逾期借款笔数</div>
                                            <div className="msgT1Right">{data.iou_statistic.overdue_times}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left">逾期本金总额</div>
                                            <div className="msgT1Right">{data.iou_statistic.overdue_amount}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">逾期利息总额</div>
                                            <div className="msgT1Right">{data.iou_statistic.overdue_interest}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left">借条平台数_360天</div>
                                            <div className="msgT1Right">{data.iou_statistic.d360_iou_platform_cnt}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">借条平台数_90天</div>
                                            <div className="msgT1Right">{data.iou_statistic.d90_iou_platform_cnt}</div>
                                        </div>
                                    </div>
                                    <div className="list_sig">
                                        <div className="msgT1">
                                            <div className="msgT1Left">借条平台数_30天</div>
                                            <div className="msgT1Right">{data.iou_statistic.d30_iou_platform_cnt}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">借条查询次数_360天</div>
                                            <div className="msgT1Right">{data.iou_statistic.d360_iou_query_times}</div>
                                        </div>
                                    </div>
                                    <div className="list_dou">
                                        <div className="msgT1">
                                            <div className="msgT1Left">借条查询次数_90天</div>
                                            <div className="msgT1Right">{data.iou_statistic.d90_iou_query_times}</div>
                                        </div>
                                        <div className="msgT1">
                                            <div className="msgT1Left">借条查询次数_30天</div>
                                            <div className="msgT1Right">{data.iou_statistic.d30_iou_query_times}</div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="closeModal_v3" onClick={this.close_modal.bind(this)}>X</div>
                </div>
            </div>
        )
    }
}
const V3Search = Form.create()(v3Search);
export default V3Search