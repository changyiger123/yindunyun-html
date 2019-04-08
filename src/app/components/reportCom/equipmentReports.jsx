import React from 'react';
import {Modal,Form,Icon,Tooltip} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'
import report_titleIcon from '../../images/report_titleIcon.png'
import 'ant-design-pro/dist/ant-design-pro.css'
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import noData from "../../images/noData.png"

class TongDReports extends React.Component {
    state= {
        coco: 6
    }
    constructor(props) {
        super(props);
    };

    close_modal () {
        this.props.closeModal();
    }


    render() {
        const riskData = this.props.datalist.result;
        const creditDecision = this.props.datalist.creditDecision
        const rankingData = this.props.datalist.result.ordered
        // var appArr = [];
        // if(riskData.status == 0) {
        //     appArr=[
        //         {
        //             name:'工具需求度',
        //             value1: riskData.tools_7d,
        //             value2: riskData.tools_90d,
        //             value3: riskData.tools_180d
        //         },{
        //             name:'设备总体活跃度',
        //             value1: riskData.app_stability_7d,
        //             value2: riskData.app_stability_90d,
        //             value3: riskData.app_stability_180d
        //         },{
        //             name:'大众App活跃度',
        //             value1: riskData.top_7d,
        //             value2: riskData.top_90d,
        //             value3: riskData.top_180d
        //         },{
        //             name:'小众App活跃度', 
        //             value1: riskData.tail_7d,
        //             value2: riskData.tail_90d,
        //             value3: riskData.tail_180d
        //         },{
        //             name:'汽车相关活跃度',
        //             value1: riskData.car_7d,
        //             value2: riskData.car_90d,
        //             value3: riskData.car_180d
        //         },{
        //             name:'信贷活跃度',
        //             value1: riskData.loan_7d,
        //             value2: riskData.loan_90d,
        //             value3: riskData.loan_180d
        //         },{
        //             name:'金融理财活跃度',
        //             value1: riskData.finance_7d,
        //             value2: riskData.finance_90d,
        //             value3: riskData.finance_180d
        //         },{
        //             name:'房产相关活跃度',
        //             value1: riskData.property_7d,
        //             value2: riskData.property_90d,
        //             value3: riskData.property_180d
        //         },{
        //             name:'网购活跃度',
        //             value1: riskData.shopping_7d,
        //             value2: riskData.shopping_90d,
        //             value3: riskData.shopping_180d
        //         },{
        //             name:'教育相关活跃度',
        //             value1: riskData.education_7d,
        //             value2: riskData.education_90d,
        //             value3: riskData.education_180d
        //         },{
        //             name:'旅游出行活跃度',
        //             value1: riskData.travel_7d,
        //             value2: riskData.travel_90d,
        //             value3: riskData.travel_180d
        //         },{
        //             name:'娱乐活跃度',
        //             value1: riskData.entertainment_7d,
        //             value2: riskData.entertainment_90d,
        //             value3: riskData.entertainment_180d
        //         },{
        //             name:'社交活跃度',
        //             value1: riskData.sns_7d,
        //             value2: riskData.sns_90d,
        //             value3: riskData.sns_180d
        //         },{
        //             name:'阅读活跃度',
        //             value1: riskData.reading_7d,
        //             value2: riskData.reading_90d,
        //             value3: riskData.reading_180d
        //         },{
        //             name:'游戏活跃度',
        //             value1: riskData.game_7d,
        //             value2: riskData.game_90d,
        //             value3: riskData.game_180d
        //         },{
        //             name:'女性相关活跃度',
        //             value1: riskData.woman_7d,
        //             value2: riskData.woman_90d,
        //             value3: riskData.woman_180d
        //         },{
        //             name:'生活服务活跃度',
        //             value1: riskData.service_7d,
        //             value2: riskData.service_90d,
        //             value3: riskData.service_180d
        //         },{
        //             name:'健康养生活跃度',
        //             value1: riskData.health_7d,
        //             value2: riskData.health_90d,
        //             value3: riskData.health_180d
        //         }
        //     ]
        // }
        return(
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">行为画像分析报告</div>
                        </div>
                        <div className="commonContent">
                            {riskData.status-0 == 0?
                            <div className="commonCard tdType1">
                                {creditDecision == 'REJECT'?
                                    <div className="card_left">
                                        <div className="card_title">您查询的用户违约风险较高</div>
                                        <div className="card_result_type3">建议拒绝</div>
                                    </div>
                                    :creditDecision == 'REVIEW'?
                                    <div className="card_left">
                                        <div className="card_title">您查询的用户存在一定违约风险</div>
                                        <div className="card_result_type2">建议进行人工审核</div>
                                    </div>
                                    :creditDecision == 'PASS'?
                                    <div className="card_left">
                                        <div className="card_title">您查询的用户违约风险较低</div>
                                        <div className="card_result_type1">建议通过</div>
                                    </div>
                                    :''
                                }
                                {creditDecision == 'REJECT'?
                                <div className="card_right">
                                    <div className="card_score_type3" style={{marginTop:"30px"}}></div>
                                </div>
                                :creditDecision == 'REVIEW'?
                                <div className="card_right">
                                    <div className="card_score_type2" style={{marginTop:"30px"}}></div>
                                </div>
                                :creditDecision == 'PASS'?
                                <div className="card_right">
                                    <div className="card_score_type1" style={{marginTop:"30px"}}></div>
                                </div>
                                :''
                                }
                            </div>
                            :riskData.status-0 == 108?
                            <div className="commonCard tdType1">
                                <div className="card_left">
                                    <div className="card_title">该手机号或设备号未能匹配到结果</div>
                                    <div className="card_result_type3">建议拒绝</div>
                                </div>
                                <div className="card_right">
                                    <div className="card_score_type3" style={{marginTop:"30px"}}></div>
                                </div>
                            </div>
                            :riskData.status-0 == 109?
                            <div className="commonCard tdType1">
                                <div className="card_left">
                                    <div className="card_title" style={{width:"350px"}}>该手机号或设备号能匹配，但近180天行为 不足以计算评分</div>
                                    <div className="card_result_type3">建议拒绝</div>
                                </div>
                                <div className="card_right">
                                    <div className="card_score_type3" style={{marginTop:"30px"}}></div>
                                </div>
                            </div>
                            :''
                            }
                            <div className="commonFiller"></div>
                            <div className="commonMainType1">
                                {riskData.status == 0?
                                <div>
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
                                                    <div className="commonListName">设备启用时间</div>
                                                    <div className="commonListMsg">{riskData.launch_day==1?'短，30天内':riskData.launch_day==2?'中，30-120天':riskData.launch_day==3?'长， 120天以上':'-'}</div>
                                                </div>
                                                <div className="commonLists">
                                                    <div className="commonListName">设备评级</div>
                                                    <div className="commonListMsg">{riskData.device_rank==0?'优质':riskData.device_rank==1?'良好':riskData.device_rank==2?'一般':riskData.device_rank==3?'低质量':'-'}</div>
                                                </div>
                                                <div className="commonLists">
                                                    <div className="commonListName">设备档次</div>
                                                    <div className="commonListMsg">{riskData.device_price==1?'0元-1000元':riskData.device_price==2?'1000元-2000元':riskData.device_price==3?'2000元-3000元':riskData.device_price==4?'3000元-4000元':riskData.device_price==5?'4000元以上':'-'}</div>
                                                </div>
                                                <div className="commonLists">
                                                    <div className="commonListName">设备品牌</div>
                                                    <div className="commonListMsg">{riskData.device_brand}</div>
                                                </div>
                                                <div className="commonLists">
                                                    <div className="commonListName">操作系统</div>
                                                    <div className="commonListMsg">{riskData.device_os}</div>
                                                </div>
                                                <div className="commonLists">
                                                    <div className="commonListName">常驻城市</div>
                                                    <div className="commonListMsg">{riskData.country_freq};{riskData.province_freq};{riskData.city_freq}</div>
                                                </div>
                                                <div className="commonLists">
                                                    <div className="commonListName">最近所在城市</div>
                                                    <div className="commonListMsg">{riskData.country_rec};{riskData.province_rec};{riskData.city_rec}</div>
                                                </div>
                                                <div className="commonLists">
                                                    <div className="commonListName" style={{paddingRight:"0px"}}>
                                                        近期地理位置变化频率
                                                        <Tooltip title="0:无行为，1-10:活跃度由低到高">
                                                            <Icon type="info-circle-o" />
                                                        </Tooltip>
                                                    </div>
                                                    <div className="commonListMsg">{riskData.ip_90d}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="commonItem">
                                        <h3><img src={report_titleIcon} alt="icon" />App活跃度排行榜</h3>
                                        <div className="commonTable10">
                                            <div className="commonTheader">
                                                <div>类别</div>
                                                <div>7天</div>
                                                <div>90天</div>
                                                <div>180天</div>
                                            </div>
                                            <div className="commonTbody">
                                                {appArr.map((item,index)=>{
                                                    return(
                                                        <div key={index} className="commonTr">
                                                            <div>{item.name}</div>
                                                            <div>{item.value1}</div>
                                                            <div>{item.value2}</div>
                                                            <div>{item.value3}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="commonItem">
                                        <h3><img src={report_titleIcon} alt="icon" />App活跃度排行榜</h3>
                                        <div className="commonChartsBox">
                                            <div className="commonChart">
                                                {/* <Pie percent={rankingData.d7AppStability*10} subTitle="7天 活跃度" height={140} /> */}
                                                <div className="ranking_title">7天APP活跃度</div>
                                                {rankingData.d7.length?
                                                <div className="ranking_list">
                                                    {rankingData.d7.map((item, index)=>{
                                                        return(
                                                            <div key={index} className="ranking_item">
                                                                <div className="ranking_item_name">{item.name}</div>
                                                                <div className="ranking_item_bar">
                                                                    <div style={{width:item.value+"0%"}}></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                :
                                                <div className="ranking_list" style={{height:"calc(100% - 50px)"}}>
                                                    <div className="no_ranking_data_warp">
                                                        <div className="no_ranking_data">
                                                            <img src={noData} />
                                                            <div>最近7天暂时没有数据</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                            <div className="commonChart">
                                                {/* <Pie percent={rankingData.m3AppStability*10} subTitle="90天 活跃度" height={140} /> */}
                                                <div className="ranking_title">90天APP活跃度</div>
                                                {rankingData.m3.length?
                                                <div className="ranking_list">
                                                    {rankingData.m3.map((item, index)=>{
                                                        return(
                                                            <div key={index} className="ranking_item">
                                                                <div className="ranking_item_name">{item.name}</div>
                                                                <div className="ranking_item_bar">
                                                                    <div style={{width:item.value+"0%"}}></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                :
                                                <div className="ranking_list" style={{height:"calc(100% - 50px)"}}>
                                                    <div className="no_ranking_data_warp">
                                                        <div className="no_ranking_data">
                                                            <img src={noData} />
                                                            <div>最近90天暂时没有数据</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                            <div className="commonChart">
                                                {/* <Pie percent={rankingData.m6AppStability*10} subTitle="180天 活跃度" height={140} /> */}
                                                <div className="ranking_title">180天APP活跃度</div>
                                                {rankingData.m6.length?
                                                <div className="ranking_list">
                                                    {rankingData.m6.map((item, index)=>{
                                                        return(
                                                            <div key={index} className="ranking_item">
                                                                <div className="ranking_item_name">{item.name}</div>
                                                                <div className="ranking_item_bar">
                                                                    <div style={{width:item.value+"0%"}}></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                :
                                                <div className="ranking_list" style={{height:"calc(100% - 50px)"}}>
                                                    <div className="no_ranking_data_warp">
                                                        <div className="no_ranking_data">
                                                            <img src={noData} />
                                                            <div>最近180天暂时没有数据</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>:''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TongDReports