import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'
import report_titleIcon from '../../images/report_titleIcon.png'


class InvoiceReports extends React.Component {
    state= {
    }
    constructor(props) {
        super(props);
    };

    close_modal () {
        this.props.closeMoadl();
    }
    render() {
        const data = this.props.datalist
        const goodsDatas = this.props.datalist.goodsData[0]
        var goodsData = []
        if(goodsDatas.name) {
            goodsData.push({name: '名称', value: goodsDatas.name})
        }
        if(goodsDatas.spec) {
            goodsData.push({name: '规格', value: goodsDatas.spec})
        }
        if(goodsDatas.unit) {
            goodsData.push({name: '单位', value: goodsDatas.unit})
        }
        if(goodsDatas.amount) {
            goodsData.push({name: '数量', value: goodsDatas.amount})
        }
        if(goodsDatas.priceUnit) {
            goodsData.push({name: '单价', value: goodsDatas.priceUnit + ' 元'})
        }
        if(goodsDatas.priceSum) {
            goodsData.push({name: '金额', value: goodsDatas.priceSum + ' 元'})
        }
        if(goodsDatas.taxRate) {
            goodsData.push({name: '税率', value: goodsDatas.taxRate})
        }
        if(goodsDatas.taxSum) {
            goodsData.push({name: '税额', value: goodsDatas.taxSum + ' 元'})
        }
        if(goodsDatas.plateCode) {
            goodsData.push({name: '牌照', value: goodsDatas.plateCode})
        }
        if(goodsDatas.registerCode) {
            goodsData.push({name: '登记证号', value: goodsDatas.registerCode})
        }
        if(goodsDatas.buyerId) {
            goodsData.push({name: '身份证或组织机构代码', value: goodsDatas.buyerId})
        }
        if(goodsDatas.origin) {
            goodsData.push({name: '产地', value: goodsDatas.origin})
        }
        if(goodsDatas.ccCode) {
            goodsData.push({name: '合格证', value: goodsDatas.ccCode})
        }
        if(goodsDatas.importCode) {
            goodsData.push({name: '进口证明书号', value: goodsDatas.importCode})
        }
        if(goodsDatas.inspectionCode) {
            goodsData.push({name: '商检单号', value: goodsDatas.inspectionCode})
        }
        if(goodsDatas.engineCode) {
            goodsData.push({name: '发动机号', value: goodsDatas.engineCode})
        }
        if(goodsDatas.vinCode) {
            goodsData.push({name: '车架号', value: goodsDatas.vinCode})
        }
        if(goodsDatas.vehicleOrg) {
            goodsData.push({name: '转入地车管所', value: goodsDatas.vehicleOrg})
        }
        if(goodsDatas.auctionName) {
            goodsData.push({name: '经营、拍卖单位', value: goodsDatas.auctionName})
        }
        if(goodsDatas.auctionAdd) {
            goodsData.push({name: '经营、拍卖单位地址', value: goodsDatas.auctionAdd})
        }
        if(goodsDatas.auctionCode) {
            goodsData.push({name: '经营、拍卖单位纳税人识别号', value: goodsDatas.auctionCode})
        }
        if(goodsDatas.auctionBank) {
            goodsData.push({name: '经营、拍卖单位开户银行账号', value: goodsDatas.auctionBank})
        }
        if(goodsDatas.auctionTel) {
            goodsData.push({name: '经营、拍卖单位电话', value: goodsDatas.auctionTel})
        }
        if(goodsDatas.marketName) {
            goodsData.push({name: '二手车市场', value: goodsDatas.marketName})
        }
        if(goodsDatas.marketCode) {
            goodsData.push({name: '二手车市场纳税人识别号', value: goodsDatas.marketCode})
        }
        if(goodsDatas.marketAdd) {
            goodsData.push({name: '二手车市场地址', value: goodsDatas.marketAdd})
        }
        if(goodsDatas.marketBank) {
            goodsData.push({name: '二手车行开户银行账号', value: goodsDatas.marketBank})
        }
        if(goodsDatas.marketTel) {
            goodsData.push({name: '二手车行电话', value: goodsDatas.marketTel})
        }
        if(goodsDatas.taxesCode) {
            goodsData.push({name: '完税凭证', value: goodsDatas.taxesCode})
        }
        if(goodsDatas.tonnage) {
            goodsData.push({name: '吨位', value: goodsDatas.tonnage})
        }
        if(goodsDatas.limitNum) {
            goodsData.push({name: '限乘人数', value: goodsDatas.limitNum})
        }
        if(goodsDatas.taxOrg) {
            goodsData.push({name: '税务机关', value: goodsDatas.taxOrg})
        }
        if(goodsDatas.taxOrgCode) {
            goodsData.push({name: '税务机关代码', value: goodsDatas.taxOrgCode})
        }
        if(goodsDatas.auctionTel) {
            goodsData.push({name: '销货方电话', value: goodsDatas.auctionTel})
        }
        if(goodsDatas.dateBegin) {
            goodsData.push({name: '开始日期', value: goodsDatas.dateBegin})
        }
        if(goodsDatas.dateEnd) {
            goodsData.push({name: '结束日期', value: goodsDatas.dateEnd})
        }
        const invoicTypeList = {
            "01": "增值税专票",
            "02": "货物运输业增值税专用发票",
            "03": "机动车（统一）发票",
            "04": "增值税普通发票",
            "10": "电子增值税普通发票",
            "11": "卷式普通发票",
            "14": "电子普通[通行费]发票",
            "15": "二手车销售统一发票"

        }
        return (
            <div className="reportCommonWarp">
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">发票查验</div>
                        </div>
                        <div className="commonContent">
                            <div className="commonCard tdType1">
                                <div className="card_left">
                                    <div className="card_title">您查询的发票信息</div>
                                    <div className="card_result_type1">验证无误</div>
                                    <div className="card_msg">发票类型<span>{invoicTypeList[data.fplx]}</span></div>
                                </div>
                                <div className="card_right">
                                    <div className="card_score_type4"></div>
                                </div>
                            </div>
                            <div className="commonFiller"></div>
                            <div className="commonMainType1">
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />发票信息</h3>
                                    <div className="commonTable3">
                                        <div className="bg">
                                            <div className="odd"></div>
                                            <div className="even"></div>
                                            <div className="odd"></div>
                                            <div className="even"></div>
                                        </div>
                                        <div className="commonTbody">
                                            <div className="commonLists">
                                                <div className="commonListName">发票代码</div>
                                                <div className="commonListMsg">{data.fpdm}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">发票类型</div>
                                                <div className="commonListMsg">{invoicTypeList[data.fplx]}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">发票号码</div>
                                                <div className="commonListMsg">{data.fphm}</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">开票日期</div>
                                                <div className="commonListMsg">{data.kprq}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">销售方名称</div>
                                                <div className="commonListMsg">{data.xfMc}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">销售方纳税人识别号</div>
                                                <div className="commonListMsg">{data.xfNsrsbh}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">销售方联系方式</div>
                                                <div className="commonListMsg">{data.xfContact}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">销售方地址</div>
                                                <div className="commonListMsg">{data['销售方地址、电话']}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">销售方开户行</div>
                                                <div className="commonListMsg">{data.xfBank}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">销售方账号</div>
                                                <div className="commonListMsg">{data['销售方开户行、账号']}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">购方名称</div>
                                                <div className="commonListMsg">{data.gfMc}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">购方纳税人识别号</div>
                                                <div className="commonListMsg">{data.gfNsrsbh}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">购方联系方式</div>
                                                <div className="commonListMsg">{data.gfContact}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">购方地址</div>
                                                <div className="commonListMsg">{data['受票方地址、电话']}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">购方开户行</div>
                                                <div className="commonListMsg">{data.gfBank}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">购方账号</div>
                                                <div className="commonListMsg">{data['受票方开户行、账号']}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">发票校验码</div>
                                                <div className="commonListMsg">{data.code}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">发票机器码</div>
                                                <div className="commonListMsg">{data.num}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">是否作废</div>
                                                <div className="commonListMsg">{data.del}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">税额合计</div>
                                                <div className="commonListMsg">{data.taxamount}&nbsp;元</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">价格合计</div>
                                                <div className="commonListMsg">{data.goodsamount}&nbsp;元</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">价税合计</div>
                                                <div className="commonListMsg">{data.sumamount}&nbsp;元</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">数量合计</div>
                                                <div className="commonListMsg">{data.quantityAmount}&nbsp;</div>
                                            </div>
                                            <div className="commonLists">
                                                <div className="commonListName">更新时间</div>
                                                <div className="commonListMsg">{data.updateTime}&nbsp;</div>
                                            </div>
                                            <div className="commonLists" style={{width:"100%"}}>
                                                <div className="commonListName">备注</div>
                                                <div className="commonListMsg" style={{width:"calc(100% - 200px)",background:"#fff"}}>{data.remark}&nbsp;</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="commonItem">
                                    <h3><img src={report_titleIcon} alt="icon" />商品信息</h3>
                                    <div className="commonTable3">
                                        <div className="bg">
                                            <div className="odd"></div>
                                            <div className="even"></div>
                                            <div className="odd"></div>
                                            <div className="even"></div>
                                        </div>
                                        <div className="commonTbody">
                                            {goodsData.map((item, index)=>{
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
            </div>
        )
    }
}

export default InvoiceReports