import React from 'react';
import {Modal,Form,Button} from 'antd'

class SearchCost extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return(
            <div>
                {this.props.priceData.isFree?
                <div className="search_cost" style={{whiteSpace:"nowrap"}}>
                    <div className="search_cost_left"></div>
                    限时优惠<span> {this.props.priceData.discountsPrice} </span>元/次，今日免费查询剩余<span> {this.props.priceData.count} </span>次，账户余额<span> {this.props.total}</span>元
                </div>:
                <div className="search_cost">
                    <div className="search_cost_left"></div>
                    {this.props.word}<span> {this.props.priceData.originPrice} </span>元/次，账户余额<span> {this.props.total}</span>元
                </div>
                }
            </div>
        )
    }
}
export default SearchCost