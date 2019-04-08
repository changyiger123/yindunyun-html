import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'
import address_suc from '../../images/address_suc.png'
import address_err from '../../images/address_err.png'


class AddressReports extends React.Component {
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
        return (
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">地址查验</div>
                        </div>
                        <div className="commonContent" style={{height:"219px"}}>
                            <div className="commonCard addressCard">
                                <div className="addressCardLeft">
                                    <h3>{data.addressCode==-1?'本次查询免费':'查询地址与实际地址'}</h3>
                                    <div className={data.addressCode==8?"err":''}>{data.addressInfo}</div>
                                </div>
                                <img className="addressCardRight" src={data.addressCode==8||data.addressCode==-1?address_err:address_suc} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddressReports