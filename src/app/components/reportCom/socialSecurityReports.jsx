import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'


class SocialSecurityReports extends React.Component {
    state= {
    }
    constructor(props) {
        super(props);
    };

    close_modal () {
        this.props.closeModal();
    }
    render() {
        const data = this.props.datalist
        console.log(this.props.reportType)
        return (
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">{this.props.reportType == "1"?'社保查询':'公积金查询'}</div>
                        </div>
                        <div className="commonContent" style={{height:"219px"}}>
                            <div className="commonItem4">
                                <div>
                                    <h3>停缴月数（连续）</h3>
                                    <div>最近{this.props.reportType == "1"?data.warning_social_security:data.warning_public_reserve_fund}个月</div>
                                </div>
                                <div>
                                    <h3>个人月缴平均值</h3>
                                    <div>{this.props.reportType == "1"?(data.level_social_security-0)*50:(data.level_public_reserve_fund-0)*50}</div>
                                </div>
                                <div>
                                    <h3>缴纳月份</h3>
                                    <div>{this.props.reportType == "1"?data.status_social_security:data.status_public_reserve_fund}个月</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SocialSecurityReports