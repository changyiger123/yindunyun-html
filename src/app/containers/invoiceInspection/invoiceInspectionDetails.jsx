import React from 'react';
import {Modal,Form} from 'antd'
import './invoiceInspection.less'

class invoiceInspectionDetails extends React.Component {
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
        
        return(
            <div>
                <div className="data_list_wrap_invoice">
                    <div className="data_list_body">
                        <div className="ModalTitle">{invoicTypeList[data.fplx]}</div>
                        <div className="listTable" style={{height:'calc(100% - 53px)'}}>
                            <div className="theader2">
                                <div className="th4">数据名称</div>
                                <div className="th5">数据详情</div>
                            </div>
                            <div className="tbody2">
                                <div className="oList2">
                                    <div className="tb4">发票代码</div>
                                    <div className="tb5">{data.fpdm}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">发票类型</div>
                                    <div className="tb5">{invoicTypeList[data.fplx]}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">发票号码</div>
                                    <div className="tb5">{data.fphm}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">开票日期</div>
                                    <div className="tb5">{data.kprq}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">销售方名称</div>
                                    <div className="tb5">{data.xfMc}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">销售方纳税人识别号</div>
                                    <div className="tb5">{data.xfNsrsbh}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">销售方联系方式</div>
                                    <div className="tb5">{data.xfContact}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">销售方地址</div>
                                    <div className="tb5">{data['销售方地址、电话']}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">销售方开户行</div>
                                    <div className="tb5">{data.xfBank}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">销售方账号</div>
                                    <div className="tb5">{data['销售方开户行、账号']}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">购方名称</div>
                                    <div className="tb5">{data.gfMc}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">购方纳税人识别号</div>
                                    <div className="tb5">{data.gfNsrsbh}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">购方联系方式</div>
                                    <div className="tb5">{data.gfContact}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">购方地址</div>
                                    <div className="tb5">{data['受票方地址、电话']}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">购方开户行</div>
                                    <div className="tb5">{data.gfBank}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">购方账号</div>
                                    <div className="tb5">{data['受票方开户行、账号']}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">发票校验码</div>
                                    <div className="tb5">{data.code}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">发票机器码</div>
                                    <div className="tb5">{data.num}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">是否作废</div>
                                    <div className="tb5">{data.del}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">税额合计</div>
                                    <div className="tb5">{data.taxamount}&nbsp;元</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">价格合计</div>
                                    <div className="tb5">{data.goodsamount}&nbsp;元</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">价税合计</div>
                                    <div className="tb5">{data.sumamount}&nbsp;元</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">数量合计</div>
                                    <div className="tb5">{data.quantityAmount}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">更新时间</div>
                                    <div className="tb5">{data.updateTime}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="tb4">备注</div>
                                    <div className="tb5">{data.remark}&nbsp;</div>
                                </div>
                                <div className="oList2">
                                    <div className="lastLeft">商品信息</div>
                                    <div className="lastRight">
                                        {goodsData.map((oMsg,index) => {
                                            return (
                                            <div className="lastRightMsg" key={index}>
                                                <div className="lastTb1">{oMsg.name}</div>
                                                <div className="lastTb2">{oMsg.value}</div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="closeModal" onClick={this.close_modal.bind(this)}>X</div>
                </div>
            </div>
            
            
        )
    }
}
const InvoiceInspectionDetails = Form.create()(invoiceInspectionDetails);
export default InvoiceInspectionDetails