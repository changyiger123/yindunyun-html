import React from 'react';
import {Modal,Form,Button} from 'antd'
import './freeTools.less'

class FreeTool extends React.Component {
    constructor(props) {
        super(props);
    };
    go_searchpage(){
        window.location.hash=this.props.url
    }
    render() {
        return(
            <div onClick={this.go_searchpage.bind(this)} className="freeTool">
                <img src={this.props.imgSrc} />
                <div className="freeToolLeft">
                    <h3>{this.props.name}</h3>
                    <div>今日剩余{this.props.times}次</div>
                </div>
            </div>
        )
    }
}
export default FreeTool