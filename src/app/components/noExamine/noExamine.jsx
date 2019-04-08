import React from 'react';
import {Modal,Form,Button} from 'antd'
import './examine.less'

class NoExamine extends React.Component {
    constructor(props) {
        super(props);
    };
    componentWillMount(){
        console.log(this.props.accountStatus)
    }
    go_enterpriseInfo(){
        window.location.hash="/enterpriseInfo"
    }
    render() {
        return(
            <div className="examine_warp">
                {this.props.accountStatus=="0"?
                <div className="noExamine">
                    <h3>请先完善企业资料</h3>
                    <p>完善企业资料即送100元体验金</p>
                    <Button onClick={this.go_enterpriseInfo.bind(this)} style={{margin:"0 auto",display:"block",width:"120px"}} type="primary">完善资料</Button>
                </div>:''}
                {this.props.accountStatus =="1"?
                <div className="inExamine">
                    <h3>资料审核中</h3>
                    <p>资料审核中，请您耐心等待</p>
                    <Button onClick={this.props.close_noExamine} style={{margin:"0 auto",display:"block",width:"120px"}} type="primary">确定</Button>
                </div>:''}
                {this.props.accountStatus=="3"?
                <div className="failExamine">
                    <h3>资料审核失败</h3>
                    <p>资料审核失败，请重新提交审核</p>
                    <Button onClick={this.go_enterpriseInfo.bind(this)} style={{margin:"0 auto",display:"block",width:"120px"}} type="primary">重新提交</Button>
                </div>:''}
            </div>
        )
    }
}
export default NoExamine