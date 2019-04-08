import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'
import report_titleIcon from '../../images/report_titleIcon.png'


class BankReports extends React.Component {
    state= {
    }
    constructor(props) {
        super(props);
    };

    close_modal () {
        this.props.closeModal();
    }
    render() {
        const bankData = this.props.datalist;
        return (
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">银行流水数据核验</div>
                        </div>
                        <div className="commonContent">
                            <div className="commonItem2">
                                <div className="commonTable7">
                                    <div className="commonTheader">
                                        <div className="commonTh">交易时间</div>
                                        <div className="commonTh">交易金额</div>
                                        <div className="commonTh">币种</div>
                                    </div>
                                    <div className="commonTbody">
                                        {bankData.map((item, index)=>{
                                            return (
                                                <div key={index} className="commonTr">
                                                    <div className="commonTd">{item.transTime}</div>
                                                    <div className="commonTd">{item.transAmount}</div>
                                                    <div className="commonTd">{item.currency}</div>
                                                </div>
                                            )
                                        })}
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

export default BankReports