import React from 'react';
import {Modal,Form} from 'antd'
import './dataListCom.less'

class dataListCom extends React.Component {
    constructor(props) {
        super(props);
    };

    close_modal () {
        this.props.closeMoadl();
    }

    render() {
        const data = this.props.datalist
        return(
            // <Modal 
            //     visible={this.props.smth}
            //     onCancel = {this.props.closeMoadl}
            //     footer={null}
            //     width={'800px'}>
            //     <div className="ModalTitle">银行流水数据</div>
            // </Modal>
            <div>
                {this.props.smth?
                    <div className="data_list_wrap">
                    {this.props.dataType==1?
                        <div className="data_list_body">
                            <div className="ModalTitle">银行流水数据核验</div>
                            <div className="listTable" style={{height:'calc(100% - 53px)'}}>
                                <div className="theader">
                                    <div className="th1">交易时间</div>
                                    <div className="th2">交易金额</div>
                                    <div className="th3">币种</div>
                                </div>
                                <div className="tbody">
                                    {data.map((oMsg,index) => {
                                        return (
                                            <div className="oList" key={index}>
                                                <div className="tb1">{oMsg.transTime}</div>
                                                <div className="tb2">{oMsg.transAmount}</div>
                                                <div className="tb3">{oMsg.currency}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="data_list_body">
                            <div className="ModalTitle">二手车档案数据</div>
                            <div className="listTable" style={{height:'calc(100% - 53px)'}}>
                                <div className="theader">
                                    <div className="th4">数据名称</div>
                                    <div className="th5">数据详情</div>
                                </div>
                                <div className="tbody">
                                    {data.map((oMsg,index) => {
                                        return (
                                            <div className="oList" key={index}>
                                                <div className="tb4">{oMsg.name}</div>
                                                <div className="tb5">{oMsg.value}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        }
                        <div className="closeModal" onClick={this.close_modal.bind(this)}>X</div>
                    </div>
                    :
                    ''
                }
            </div>
            
            
        )
    }
}
const DataListCom = Form.create()(dataListCom);
export default DataListCom