import React from 'react';
import { Link } from "react-router";
import { Form, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col,Modal,Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
import "./index.less";
import ajax from "../../utils/ajax";

class RoleManageList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: [],
        page:1,
        pageSize:10,
        total:null,
        pagination: {},
        loading: false,
        selectedRowKeys: []
    };

    this.onChange1 = this.onChange1.bind(this);
  //  this.operateRow = this.operateRow.bind(this);

  };

   //删除当前行角色
   handleSubmit = (e) =>
 // operateRow(record){
 operateRow = (e,record)=>{
     confirm({
            title: '您是否确认删除该角色操作?',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                let data = {
                    id:record.id
                };
		ajax.post("/admin/roles/del",data)
		.then(response =>{
		if(response.code=="0"){	
		   // window.location.reload();
		   this.props.router.push('/roleManage/role');
		}else{
		    message.error("删除失败!");
		}
	    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });

  }

   handleDelete = (id) => {
	let data = {
		id:id
	};
	const dataSource = this.state.data;
	ajax.post("/admin/roles/del",data)
	.then(response =>{
		if(response.code=="0"){	

			this.setState({ data: dataSource.filter(item => item.id !== id) });
		}else{
			message.error("删除失败!");
		}
	});
   
  }

  componentWillMount() {
      this._isMounted = true;
      var redata = {page:this.state.page,pageSize:this.state.pageSize};
	//获取角色列表
	//var config={headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest','token':sessionStorage.getItem("access_token") }}
	ajax.post("/admin/roles/list",redata)
          .then(response =>{
              //console.log(response);
	     //  console.log("token:"+sessionStorage.getItem("access_token"));
              if(response.code=="0"){
                  var vData=response.data;
		  var totalCount=vData.totalRow;
		  var datalist=vData.result;
                                 
                  this.setState({
                      data:datalist,
		      total:totalCount
                  });
		
                  console.log(this.state.data);
              }else{
                 
                  message.error(response.msg);
              }
          });
	
  };
  componentWillUnmount() {
      this._isMounted = false
  }



 
  onChange1(field, value){
    console.log(field, 'change', value);
    this.setState({
      [field]: value,
    });
  };
 
  render() {
    let self = this;
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',

    }, {
      title: '说明',
      dataIndex: 'profile',
      key: 'profile',
    }, {
      title: '操作',
      key: 'id',
      dataIndex: 'id',
    
       // render: (text, record) => <div><Link to={'/roleManage/roleedit/' +record.id + '/'+ record.name + '/' +record.profile} name="edit">编辑</Link>&nbsp; &nbsp; <Link to={'/roleManage/rolepermission/' +record.id} name="permission">权限配置</Link> &nbsp; &nbsp; <a  name="delete" onClick={this.operateRow(record)}>删除</a></div>
	render: (text, record) => <div><Link to={'/roleManage/roleedit/' +record.id + '/'+ record.name + '/' +record.profile} name="edit">编辑</Link>&nbsp; &nbsp; <Link to={'/roleManage/rolepermission/' +record.id} name="permission">权限配置</Link> &nbsp; &nbsp; <Popconfirm okText="确认" cancelText="取消" title="您是否确认删除该角色操作??" onConfirm={() => this.handleDelete(record.id)}>
                <a href="#">删除</a>
              </Popconfirm></div>
    }];
    const dataCont =this.state.data;
    var vpagination = {
        simple:false,
        total: this.state.total,
        current: this.state.page,
        onChange: (current) =>{
            const currentPage=current;
            this.setState({
                page:currentPage,
            });
            var redata = {page:currentPage,pageSize:this.state.pageSize};
            ajax.post("/admin/roles/list",redata)
                  .then(response =>{
                      if(response.code=="0"){
                          var vData=response.data;
                  var totalCount=vData.totalRow;
                  var datalist=vData.result;

                          this.setState({
                              data:datalist,
                      total:totalCount
                          });

                      }else{

                          message.error(response.msg);
                      }
                  });
          }
    }



    return (
      <div className="staffManage">
        <Breadcrumb style={{ padding: '16px 28px',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
          <Breadcrumb.Item>角色管理</Breadcrumb.Item>
        </Breadcrumb>
        <div id="mainCont" style={{ margin: 24,padding:'0 32px', background: '#fff', minHeight: 780 }}>
          {/*查询选项*/}
          <Button type="primary" style={{marginTop:"32px"}}><Icon type="plus" /><Link to="/roleManage/roleedit/null/null/null">新建</Link></Button>
          <div className="ant-form-split">
            <Table rowKey={(record) => record.id} columns={columns} dataSource={dataCont} pagination={vpagination} />
          </div>
        </div>
      </div>
    )
  }
}
const roleManageList = Form.create()(RoleManageList);
export default roleManageList;