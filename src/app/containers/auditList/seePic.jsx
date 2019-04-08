import React from 'react';
import {Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table, Pagination , Row, Col } from 'antd';
import ajax from "../../utils/ajax";

class seePicForm extends React.Component{
    constructor(props){
        super(props);
        this.rotateVal = 0;
        this.state = {
            totalData: [],
            buyCarPicListData: '', //买车人图片列表;
            creditPicListData: '', //征信图片列表;
            spousePicListData: '', //配偶图片列表;
            firstGuarantorPicListData: '', //第一担保人图片列表; 
            secondGuarantorPicListData: '', //第二担保人图片列表;
            currentPicList: [], //当前图片列表;
            menuIndex: 0, //左边菜单项选中项的索引;
            picIndex: 0 //左边图片列表选中的图片索引;
        }
    }

    chooseMenuTip(index){
        let currentPicList = this.state.totalData[index].picture;
        if(currentPicList == null){
            currentPicList = [];
        }else{
            this.rotateVal = -90;
            this.rotateBigPic();
        }
        this.setState({
            currentPicList: currentPicList,
            menuIndex: index,
            picIndex: 0
        });
    }

    choosePicTip(index){
        this.setState({
            picIndex: index
        });
        if(this.state.currentPicList.length != 0){
            this.rotateVal = -90;
            this.rotateBigPic();
        }
    }

    closePop(){
        this.props.setPopStateAttr(false);
    }

    applicationPicsData(){
        let applyNo = this.props.applyNoAttr;
        let applicationPicsData = {
            applicationPicsUrl: '/admin/autoloanApply/getPic', //申请单查看申请人图片信息接口;
            applicationPicsParams: {
                applyNo: applyNo
            }
        }
        ajax.post(applicationPicsData.applicationPicsUrl, applicationPicsData.applicationPicsParams).then((resp)=>{
            if(resp.code == 0){
                this.setState({
                    totalData: resp.data,
                    buyCarPicListData: resp.data[0],
                    creditPicListData: resp.data[1],
                    spousePicListData: resp.data[2],
                    firstGuarantorPicListData: resp.data[3],
                    secondGuarantorPicListData: resp.data[4],
                    currentPicList: resp.data[this.state.menuIndex].picture
                    //menuIndex: 0
                });
            }else{
                console.log(resp.msg);
            }
        });
    }

    rotateBigPic=()=>{
        let bigPicDom = this.refs.bigPicDom;
        this.rotateVal = (this.rotateVal+90)%360;
        bigPicDom.style.transform = 'rotate('+this.rotateVal+'deg)';
    }

    handleRotateIcon=(displayState)=>{
        let rotateBtnDom = document.getElementById('rotateBtnDom');
        rotateBtnDom.style.display = displayState;
    }

    componentWillMount(){
        this.applicationPicsData();
    }

    componentDidMount(){
        
    }

    componentWillReceiveProps(nextProps){
        let titIndexAttr = nextProps.titIndexAttr;
        console.log("查看titIndexAttr:");
        console.log(titIndexAttr);
        this.state.totalData.map((item,index)=>{
            if(titIndexAttr != -1){
                if(titIndexAttr.indexOf(item.name) != -1){
                    this.setState({
                        menuIndex: index
                    },()=>{
                        this.applicationPicsData();
                    });
                }
            }
        });
    }

    render(){
        let picTip = [];
        let bigPic = null;
        if(this.state.currentPicList != null){
            this.state.currentPicList.map((item,index)=>{
                picTip.push(<li key={index} className={this.state.picIndex == index?"picTip active":"picTip"} onClick={this.choosePicTip.bind(this, index)}><img src={item} /></li>); 
            })
            bigPic = <img src={this.state.currentPicList[this.state.picIndex]}
                            ref="bigPicDom"
                            onMouseEnter={this.handleRotateIcon.bind(this, 'block')}
                            onMouseLeave={this.handleRotateIcon.bind(this, 'none')} />
        }
        return (
            <div className="seePicBox" ref="seePicBoxDom">
                <div className="seePicCont">
                    <div className="leftArea">
                        <div className="markTipsBox">
                            <ul className="markTips">
                                {
                                    this.state.totalData.map((item,index)=>{
                                        return <li key={index} className={this.state.menuIndex == index?"markTip active":"markTip"} onClick={this.chooseMenuTip.bind(this,index)}>{item.name+"("+item.count+"张)"}</li>
                                    })                                
                                }    
                            </ul>
                        </div>
                        <div className="picTipsBox">
                            <ul className="picTips">
                                {picTip}
                            </ul>
                        </div>
                    </div>
                    <div className="rightArea">
                        <div className="bigPicBox">
                            {bigPic}
                            <i className="rotateBtn" id="rotateBtnDom"
                                onClick={this.rotateBigPic.bind(this)}
                                onMouseEnter={this.handleRotateIcon.bind(this, 'block')}></i>
                            {/* <Icon className="rotateBtn" id="rotateBtnDom" type="redo" theme="outlined" 
                                  onClick={this.rotateBigPic.bind(this)}
                                  onMouseEnter={this.handleRotateIcon.bind(this, 'block')} /> */}
                        </div>
                        <i className="closeBtn" onClick={this.closePop.bind(this)}>×</i>
                    </div>
                </div>
            </div>
        );
    }
}

const SeePic = Form.create()(seePicForm);
export default SeePic;
