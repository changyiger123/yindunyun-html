import React from 'react';
import {Modal,Form} from 'antd'
import './reportCom.less'
import report_header from '../../images/report_header.png'
import report_closebtn from '../../images/report_closebtn.png'
import report_titleIcon from '../../images/report_titleIcon.png'

import { Radio } from 'antd';

const RadioGroup = Radio.Group;


class VinReports extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value:''
        }
    };
    close_modal () {
        this.props.closeModal();
    }
    onChange = (e) => {
        // this.setState({
        //     value: e.target.value,
        // });
        if(e.target.value==""){
            this.setState(()=>{
                return{
                    value: "blankValue",
                }
            })
        }else{
            this.setState(()=>{
                return{
                    value: e.target.value,
                }
            })
        }
        this.getRightCarInfo(this.props.datalist.list);
    }
    getRightCarInfo(arr){
        var rightArr=[];
        var _this=this;
        console.log(this.state.value);
        if(this.state.value){
            if(this.state.value=="blankValue"){
                arr.map((item,index)=>{
                    if(item.ansFlag===""){
                        console.log(index);
                        rightArr.push(arr[index]);
                    }
                }) 
            }else{
                arr.map((item,index)=>{
                    if(item.ansFlag===_this.state.value){
                        console.log(index);
                        rightArr.push(arr[index]);
                    }
                }) 
            }
        }else{
            rightArr=arr;
        }
        
        return rightArr;
    }
    componentDidMount() {
        if(this.props.datalist.choice){
            this.setState({
                value:this.props.datalist.choice[0].key
            })
        }
        
    }
    render() {
        if(this.props.datalist.choice){
            const carchoice = this.props.datalist.choice;
        }
        const carlist = this.props.datalist.list;
        const lastCarListArr=[];
        return (
            <div className="reportCommonWarp">
            {/* 111 */}
                <div className="bg_close" onClick={this.close_modal.bind(this)}></div>
                <img className="commonCloseBtn" src={report_closebtn} alt="close" onClick={this.close_modal.bind(this)} />
                <div className="commonInner">
                    <div className="commonBody">
                        <div className="commonHeader">
                            <img src={report_header} alt="header"/>
                            <div className="commonTitle">VIN码查询</div>
                            {this.props.datalist.choice?
                                <div className="carSelectTitle">
                                    <div className="carselectOptionTitle">请选择车型：</div>
                                    <div className="carselectOption">
                                    <RadioGroup onChange={this.onChange.bind(this)} name="radiogroup" value={this.state.value} defaultValue={this.props.datalist.choice[0].key}>
                                        {
                                            this.props.datalist.choice.map((item,index)=>
                                                
                                                    <Radio key={index} className="radioOption" value={item.key==""?"blankValue":item.key}>{item.value}</Radio>
                                                
                                            )
                                        }
                                    </RadioGroup>
                                        
                                    </div>
                                </div>:''
                            }
                            
                        </div>
                        <div className="commonContent">
                            <div className="commonItem2">
                                <div className="commonTable3">
                                    {/* <div className="bg">
                                        <div className="odd"></div>
                                        <div className="even"></div>
                                        <div className="odd"></div>
                                        <div className="even"></div>
                                    </div> */}
                                    <div className="commonTbody">
                                        
                                            {
                                                this.getRightCarInfo(carlist).map((item,index)=>{
                                                    return(
                                                        <div className="vinContent" key={index}>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">品牌名称</div>
                                                                <div className="vinItemVal">{item.brandName}</div>
                                                            </div> 
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">车组编码</div>
                                                                <div className="vinItemVal">{item.groupCode}</div>
                                                            </div> 
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">车组名称</div>
                                                                <div className="vinItemVal">{item.groupName}</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">车型代码，唯一标识</div>
                                                                <div className="vinItemVal">{item.vehicleId}</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">车型名称</div>
                                                                <div className="vinItemVal">{item.vehicleName }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">国产/进口</div>
                                                                <div className="vinItemVal">{item.importFlag }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">车型俗称</div>
                                                                <div className="vinItemVal">{item.standardName }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">排量</div>
                                                                <div className="vinItemVal">{item.displacement }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">年款</div>
                                                                <div className="vinItemVal">{item.yearPattern }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">出厂日期</div>
                                                                <div className="vinItemVal">{item.uploadDate }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">公告号</div>
                                                                <div className="vinItemVal">{item.standardname2}</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">新车购置价</div>
                                                                <div className="vinItemVal">{item.purchasePrice }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">变速箱类型</div>
                                                                <div className="vinItemVal">{item.gearboxType }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">供油方式</div>
                                                                <div className="vinItemVal">{item.supplyOil }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">燃油喷射形式</div>
                                                                <div className="vinItemVal">{item.fuelJetType }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">发动机型号</div>
                                                                <div className="vinItemVal">{item.engineModel }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">驱动形式</div>
                                                                <div className="vinItemVal">{item.drivenType }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">是否有更多配置</div>
                                                                <div className="vinItemVal">{item.hasConfig }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">厂商指导价</div>
                                                                <div className="vinItemVal">{item.listPrice }</div>
                                                            </div> 
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">车系名称</div>
                                                                <div className="vinItemVal">{item.familyName }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">座位数</div>
                                                                <div className="vinItemVal">{item.seat }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">配置等级</div>
                                                                <div className="vinItemVal">{item.cfgLevel }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">上市年份</div>
                                                                <div className="vinItemVal">{item.marketDate }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">外型尺寸</div>
                                                                <div className="vinItemVal">{item.vehicleSize }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">轴距</div>
                                                                <div className="vinItemVal">{item.wheelbase }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">变速器档数</div>
                                                                <div className="vinItemVal">{item.gearNum }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">整备质量(千克)</div>
                                                                <div className="vinItemVal">{item.fullWeight }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">功率</div>
                                                                <div className="vinItemVal">{item.power }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">车身结构</div>
                                                                <div className="vinItemVal">{item.bodyType }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">排放标准</div>
                                                                <div className="vinItemVal">{item.effluentStandard }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">车身颜色</div>
                                                                <div className="vinItemVal">{item.vehicleColor }</div>
                                                            </div>
                                                            <div className="vinItem">
                                                                <div className="vinItemKey">是否商用车(不一定有值)</div>
                                                                <div className="vinItemVal">{item.vehlsSeri }</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            
                                        
                                        {/* {usedCarData.map((item, index)=>{
                                            return(
                                            <div key={index} className="commonLists">
                                                <div className="commonListName">{item.name}</div>
                                                <div className="commonListMsg">{item.value}</div>
                                            </div>
                                            )
                                        })} */}
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

export default VinReports