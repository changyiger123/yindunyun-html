import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'
import report_titleIcon from '../../images/report_titleIcon.png'


class UsedCarReports extends React.Component {
    state= {
    }
    constructor(props) {
        super(props);
    };

    close_modal () {
        this.props.closeMoadl();
    }
    render() {
        const usedCarData = this.props.datalist;
        return (
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">二手车档案数据</div>
                        </div>
                        <div className="commonContent">
                            <div className="commonItem2">
                                <div className="commonTable3">
                                    <div className="bg">
                                        <div className="odd"></div>
                                        <div className="even"></div>
                                        <div className="odd"></div>
                                        <div className="even"></div>
                                    </div>
                                    <div className="commonTbody">
                                        {usedCarData.map((item, index)=>{
                                            return(
                                            <div key={index} className="commonLists">
                                                <div className="commonListName">{item.name}</div>
                                                <div className="commonListMsg">{item.value}</div>
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

export default UsedCarReports