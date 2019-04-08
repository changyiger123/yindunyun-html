import React from 'react'
import { Form, Select, Button, Input, Breadcrumb , message , Col } from 'antd';
import { Link } from "react-router";
const FormItem = Form.Item;
const Option = Select.Option;
import "./index.less";
import ajax from "../../utils/ajax";
import server_host from "../../config/apiUrl";



class RoleManageToEdit extends React.Component {
    constructor(props) {
        super(props);
	var vRoleName=(this.props.params.roleName=="null")?"":this.props.params.roleName;
	var vProfile=(this.props.params.profile=="null")?"":this.props.params.profile;

        this.state = {
            roleId:this.props.params.id,
	    roleName:vRoleName,
	    profile:vProfile
       
        };
	this.onChange1 = this.onChange1.bind(this);


    };

   onChange1(field, value){
    console.log(field, 'change', value);
    this.setState({
      [field]: value,
    });
  };

    componentDidMount() {
         this._isMounted = true;
     };

 handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
	  console.log(values);
              ajax.post("/admin/roles/modifyName",values)
                  .then(response =>{
                      console.log(response);
                      if(response.code=="0"){
			this.props.router.push('/roleManage/role');
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
     

      return (

          <div className="staffManageEdit">
              <Breadcrumb style={{ padding: '16px 28px',fontSize:'20px',fontWeight:'bold',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
                  <Breadcrumb.Item>{this.props.params.roleName == 'null' ? '新建' : '编辑'}角色</Breadcrumb.Item>
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
			      initialValue:this.state.roleId,
                              
                          })(
                              <Input hidden/>
                          )}
                      </FormItem>

                      <FormItem label="角色名称" hasFeedback>
                          {getFieldDecorator("name", {
			                    initialValue:this.state.roleName,
                              rules: [
                                  { required: true, message: "请输入角色名称！" }
                              ]
                          })(
                              <Input 
                                  className="login-input"
                                  placeholder="请输入角色名称"
				
                              />
                          )}
                      </FormItem>
                     

                      <FormItem label="角色说明" hasFeedback>
                          {getFieldDecorator("profile", {
			      initialValue:this.state.profile,
                              rules: [
                                  { required: true, message: "请输入角色说明！" }
                              ]
                          })(
                              <Input 
                                  className="login-input"
                                  placeholder="请输入角色说明"
				
                              />
                          )}
                      </FormItem>

		    

                      <FormItem  style={{ textAlign: "center" }}>
                          <Button type="primary" htmlType="submit" className="editform-button">
                              提交
                          </Button>
                          <Button><Link to={'/roleManage/role'}>取消</Link></Button>

                      </FormItem>

                  </Form>
              </div>
          </div>
      );
  }


    componentWillMount() {

    }


}
const roleManageEdit = Form.create()(RoleManageToEdit);
export default roleManageEdit;