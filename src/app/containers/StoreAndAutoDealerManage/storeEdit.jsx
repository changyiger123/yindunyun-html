import React from 'react'
import { Form, Select, Button, Input, Breadcrumb , message , Col } from 'antd';
import { Link } from "react-router";
const FormItem = Form.Item;
const Option = Select.Option;
import "./index.less";
import ajax from "../../utils/ajax";
import server_host from "../../config/apiUrl";



class StoreManageToEdit extends React.Component {
    constructor(props) {
        super(props);
	var vStoreName=(this.props.params.storeName=="null")?"":this.props.params.storeName;
	var vProvinceId=(this.props.params.provinceId=="null")?null:this.props.params.provinceId;
	var vCityId=(this.props.params.cityId=="null")?null:this.props.params.cityId;
	var vAreaId=(this.props.params.areaId=="null")?null:this.props.params.areaId;

        this.state = {
            storeId:this.props.params.id,
	    storeName:vStoreName,

	    provinceId:vProvinceId,
	    cityId:vCityId,
	    areaId:vAreaId,

	    status:this.props.params.status,
            provinceData:[],
            cityData:[],
            areaData:[],

            data: [],
            myProvince:vProvinceId,
            myCity:vCityId,
            myArea:vAreaId,
	    parentpage:this.props.params.page,

	    selectDefault:null
        };


    };

    componentDidMount() {
         this._isMounted = true;
         ajax.post("/admin/dictArea/province/list",null)
             .then(response =>{
                 if(response.code == "0"){
                     var list =response.list;
                     this.setState({
			provinceData:list
		    });
		    
                 }else{
                     console.log("storeEdit"+response.msg);
                     message.error(response.msg);
                 }
             });


	if(this.state.provinceId) {
         ajax.post("/admin/dictArea/city/list",{"provinceId":this.state.provinceId})
             .then(response =>{
                 if(response.code == "0"){
                    var list =response.list;
		    this.setState({
			cityData:list
		    });
                 }else{
                     
                     message.error(response.msg);
                 }
             });
         ajax.post("/admin/dictArea/area/list",{"provinceId":this.state.provinceId,"cityId":this.state.cityId})
             .then(response =>{
                 if(response.code == "0"){
                     var list =response.list;
                     this.setState({
			areaData:list
		    });
                 }else{
                     console.log("storeEdit"+response.msg);
                     message.error(response.msg);
                 }
             });
	 }
     };
    // componentWillUnmount() {
    //     this._isMounted = false
     //}


    handleChangeProvince(field,value) {
        this.setState({
            myCity:null,
	        myArea:null,
	        [field]: value
        }, () => {
            this.props.form.setFieldsValue({
                city: null,
                area: null
            })
	        ajax.post("/admin/dictArea/city/list",{"provinceId":value})
             .then(response =>{
                 if(response.code == "0"){
                    var list =response.list;
                    this.setState({
                        cityData:list
                    });
                }else{
                    message.error(response.msg);
                }
            });
            ajax.post("/admin/dictArea/area/list",{"provinceId":value,"cityId":this.state.myCity})
            .then(response =>{
                if(response.code == "0"){
                    var list =response.list;
                    this.setState({
			            areaData:list
		            });
                }else{
                    console.log("storeEdit"+response.msg);
                    message.error(response.msg);
                }
            }); 
	    });
    }

    handleChangeCity(field,value) {
        this.setState({            
	    myArea:null,
	    [field]: value
        }, () => {
            this.props.form.setFieldsValue({
                area: null
            })
            ajax.post("/admin/dictArea/area/list",{"provinceId":this.state.myProvince,"cityId":value})
            .then(response =>{
                if(response.code == "0"){
                    var list =response.list;
                    this.setState({
                        areaData:list
                    });
                }else{
                    console.log("storeEdit"+response.msg);
                    message.error(response.msg);
                }
            }); 
        
        });
    }

    handleChangeCounty(field,value) {
        this.setState({
            [field]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
	 // console.table(values);
              ajax.post("/admin/store/save",values)
                  .then(response =>{
                      console.log(response);
                      if(response.code=="0"){
			this.props.router.push('/StoreAndAutoDealerManage/store/'+this.state.parentpage);
                      }else{
                         // console.log("storeEdit"+response.msg);
                          message.error(response.msg);
                      }
                  })
          }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const provinceData =this.state.provinceData;
        const cityData =this.state.cityData;
        const areaData =this.state.areaData;


        const provinceOptions = [];  
        var tmpVar;
        // console.log("city:"+this.state.myCity);

        provinceOptions.push(<Option key={this.state.selectDefault} value={this.state.selectDefault}>请选择</Option>);

        for (let i = 0; i < provinceData.length; i++) {  
            tmpVar=""+provinceData[i].provinceId;
            provinceOptions.push(<Option value={tmpVar}>{provinceData[i].province}</Option>);  
        }


        const cityOptions = [];
        cityOptions.push(<Option key={this.state.selectDefault} value={this.state.selectDefault}>请选择</Option>);
        for (let i = 0; i < cityData.length; i++) {
	        tmpVar=""+cityData[i].cityId;
            cityOptions.push(<Option value={tmpVar}>{cityData[i].city}</Option>);
        }


        const areaOptions = [];
        areaOptions.push(<Option key={this.state.selectDefault} value={this.state.selectDefault}>请选择</Option>);
        for (let i = 0; i < areaData.length; i++) {
	        tmpVar=""+areaData[i].areaId;
            areaOptions.push(<Option value={tmpVar}>{areaData[i].area}</Option>);
        }


        return (

            <div className="staffManageEdit">

                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
                </Breadcrumb>
                <Breadcrumb style={{ padding: '16px 28px',fontSize:'20px',fontWeight:'bold',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
                    <Breadcrumb.Item>{this.state.storeName ? "编辑门店" : "新建门店"}</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    <Form
                        className="edig-content"
                        layout="horizontal"
                        onSubmit={this.handleSubmit}
                        style={{ paddingTop: '15%'}}
                    >

		                <FormItem >
                            {getFieldDecorator("id", {
			                    initialValue:this.state.storeId,
                              
                            })(
                                <Input hidden/>
                            )}
                        </FormItem>

                        <FormItem label="门店" hasFeedback>
                            {getFieldDecorator("name", {
			                    initialValue:this.state.storeName,
                                rules: [
                                    { required: true, message: "请输入门店！" }
                                ]
                            })(
                                <Input 
                                    className="login-input"
                                    placeholder="请输入门店"
				                />
                            )}
                        </FormItem>
                        <FormItem label="所在地" hasFeedback className="storeLocation">    
                            <div>
			                    {getFieldDecorator("province", {
					                initialValue:this.state.myProvince,
					                rules: [{ required: true, message: '请选择省份!' }]
				                })(
                                    <Select   style={{width: 172}} onChange={this.handleChangeProvince.bind(this,'myProvince')}>
                                        {provinceOptions}
                                    </Select>
				                )}

				                {getFieldDecorator("city", {
					                initialValue:this.state.myCity,
					
				                })(
                                    <Select   style={{width: 172}} onChange={this.handleChangeCity.bind(this,'myCity')}>
                                        {cityOptions}
                                    </Select>
				                )}
				                {getFieldDecorator("area", {
					                initialValue:this.state.myArea,
					                rules: [{ required: true, message: '请选择区县!' }]
				                })(
                                    <Select   style={{width: 172}} onChange={this.handleChangeCounty.bind(this,'myArea')}>
                                        {areaOptions}
                                    </Select>
				                )}
				            </div>         
                        </FormItem>


                        <FormItem label="状态：">
                            {getFieldDecorator('status', {
				                initialValue:this.state.status,
                                rules: [{ required: true, message: '请选择状态!' }]
                            })(
                                <Select>
                                    <Option value="0">正常</Option>
                                    <Option value="1">停止运营</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem  style={{ textAlign: "center" }}>
                            <Button type="primary" htmlType="submit" className="editform-button">
                                提交
                            </Button>
                            <Button><Link to={'/StoreAndAutoDealerManage/store/'+this.state.parentpage}>取消</Link></Button>
                        </FormItem>

                    </Form>
                </div>
            </div>
        );
    }


    componentWillMount() {

    }


}
const storeManageEdit = Form.create()(StoreManageToEdit);
export default storeManageEdit;