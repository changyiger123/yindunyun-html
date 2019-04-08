import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'
import report_titleIcon from '../../images/report_titleIcon.png'


class LicensReports extends React.Component {
    state= {
    }
    constructor(props) {
        super(props);
    };

    close_modal () {
        this.props.closeMoadl();
    }
    render() {
        const data = this.props.datalist
        
        return (
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">驾驶证查验</div>
                        </div>
                        <div className="commonContent">
                            <div className="commonCard tdType1">
                                <div className="card_left" style={{paddingTop:"65px"}}>
                                    <div className="card_title">您查询的驾驶证信息</div>
                                    <div className="card_result_type1">验证无误</div>
                                </div>
                                <div className="card_right">
                                    <div className="card_score_type4"></div>
                                </div>
                            </div>
                            <div className="commonFiller"></div>
                            <div className="commonMainType1">
                                <div className="commonTable3">
                                    <div className="bg">
                                        <div className="odd"></div>
                                        <div className="even"></div>
                                        <div className="odd"></div>
                                        <div className="even"></div>
                                    </div>
                                    <div className="commonTbody">
                                        <div className="commonLists">
                                            <div className="commonListName">档案编号</div>
                                            <div className="commonListMsg">{data.archiveno}</div>
                                        </div>
                                        <div className="commonLists">
                                            <div className="commonListName">驾驶证号</div>
                                            <div className="commonListMsg">{data.number}</div>
                                        </div>
                                        <div className="commonLists">
                                            <div className="commonListName">驾驶证分数</div>
                                            <div className="commonListMsg">{data.deductScore}</div>
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

export default LicensReports