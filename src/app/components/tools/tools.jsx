import React from 'react';
import {Modal,Form,Button} from 'antd'
import './tools.less'

class Tool extends React.Component {
    constructor(props) {
        super(props);
    };
    go_searchpage(){
        window.location.hash=this.props.url
    }
    render() {
        return(
            <div onClick={this.go_searchpage.bind(this)} className="tool">
                <img src={this.props.imgSrc} />
                <h3>{this.props.name}</h3>
                <div>{this.props.money}元/次</div>
            </div>
        )
    }
}
export default Tool