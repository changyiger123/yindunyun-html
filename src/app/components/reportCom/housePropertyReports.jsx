import React from 'react';
import {Modal,Form,Slider} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'


class HousePropertyReports extends React.Component {
    state= {
        loanPercent: 0.7
    }
    constructor(props) {
        super(props);
    };

    close_modal () {
        this.props.closeModal();
    }
    changeLoan(e){
        this.setState({
            loanPercent:e/100
        })
    }
    render() {
        const data = this.props.datalist
        console.log(data)
        const otherData = this.props.otherData
        return (
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">房产评估报告</div>
                        </div>
                        <div className="commonContent" style={{height:"339px"}}>
                            <div className="commonItem5">
                                <div className="houseMsgLeft">
                                    <h3>{otherData.communityName}-{otherData.roomCount}室{otherData.hallCount}厅{otherData.toiletCount}卫 {otherData.area}㎡ {otherData.floor}/{otherData.totalFloor}层</h3>
                                    <div>
                                        <div>
                                            <div>房产总价</div>
                                            <span>{data.price}万</span>
                                        </div>
                                        <div>
                                            <div>贷款金额</div>
                                            <span>{(data.price*this.state.loanPercent).toFixed(2)}万</span>
                                        </div>
                                    </div>
                                    <p>误差范围：(总价){data.price-20}-{data.price-0+20}万，(均价){data.unitPrice-2000}-{data.unitPrice-0+2000}元/平</p>
                                </div>
                                <div className="houseMsgRight">
                                    <div className="toolsContent">
                                        <div className="loanMin">50%</div>
                                        <div className="loanRange">
                                            <Slider onChange={this.changeLoan.bind(this)} defaultValue={70} max={90} min={50} step={10} tooltipVisible />
                                        </div>
                                        <div className="loanMax">90%</div>
                                    </div>
                                    <div className="toolsName">贷款额度</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HousePropertyReports