import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'


class VehicleReports extends React.Component {
    state= {
    }
    constructor(props) {
        super(props);
    };

    close_modal () {
        this.props.closeMoadl();
    }
    render() {
        const vehicleData = this.props.datalist;
        return (
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">车辆违章查询</div>
                        </div>
                        <div className="commonContent">
                            <div className="commonItem3">
                                {vehicleData.map((item, index)=>{
                                    return(
                                    <div key={index} className="commonTable8">
                                        <div className="commonTheader">违章信息{index+1}</div>
                                        <div className="commonTbody">
                                            <div className="commonTr">
                                                <div className="commonListName">违章时间</div>
                                                <div className="commonListMsg">{item.time}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName">违章地点</div>
                                                <div className="commonListMsg">{item.location}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName">违法条款</div>
                                                <div className="commonListMsg">{item.illegalEntry}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName">违章代码</div>
                                                <div className="commonListMsg">{item.code}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName">违章扣分</div>
                                                <div className="commonListMsg">{item.score}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName">违章罚款金额</div>
                                                <div className="commonListMsg">{item.count}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName">是否处理</div>
                                                <div className="commonListMsg">{item.handle}</div>
                                            </div>
                                            <div className="commonTr">
                                                <div className="commonListName">文书编号</div>
                                                <div className="commonListMsg">{item.documentNo}</div>
                                            </div>
                                        </div>
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

export default VehicleReports