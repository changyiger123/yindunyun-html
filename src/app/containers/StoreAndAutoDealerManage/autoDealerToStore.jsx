import React from 'react';
import { Link } from "react-router";
import { Form, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col,Modal,Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
import "./index.less";
import ajax from "../../utils/ajax";



class AutoDealerToStoreManageList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        startValue: null,
        endValue: null,
        data: [],
        page:1,
        pageSize:10,
        total:null,
        pagination: {},
        loading: false,
        selectedRowKeys: [],
        page:this.props.params.page,
	    selectDefault:null
    };
    this.disabledStartDate = this.disabledStartDate.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
    this.onChange1 = this.onChange1.bind(this);

  };

  componentWillMount() {
        this._isMounted = true;
        var redata = {page:this.state.page,pageSize:this.state.pageSize};
        //获取车行列表
        ajax.post("/admin/autoDealer/list",redata)
              .then(response =>{
                  console.log(response);
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
                      console.log("list"+response.msg);
                      message.error(response.msg);
                  }
              });
        };
  componentWillUnmount() {
      this._isMounted = false
  }

  disabledStartDate(startValue){
      if (!startValue || !this.state.endValue) {
        return false;
      }
      return startValue.toDate().getTime() >= this.state.endValue.toDate().getTime();
  };
  disabledEndDate(endValue){
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.toDate().getTime() <= this.state.startValue.toDate().getTime();
  };
  onChange1(field, value){
    console.log(field, 'change', value);
    this.setState({
      [field]: value,
    });
  };

   handleDelete = (id) => {
		let data = {id:id};
		const dataSource = this.state.data;
		ajax.post("/admin/autoDealer/del",data)
		.then(response =>{
            if(response.code=="0"){
                this.setState({ data: dataSource.filter(item => item.id !== id) });
                //window.location.reload();
            }else{
                message.error("删除失败!");
            }
	    });
  }
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
            if (!err) {
	    
                let data = {
                    page:1,
		    pageSize:this.state.pageSize,
                    addTimeBegin:this.state.startValue,
                    addTimeEnd:this.state.endValue
                };
                ajax.post("/admin/autoDealer/list",data)
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
                            console.log("list"+response.msg);
                            message.error(response.msg);
                        }
                    })
            } else {
                message.error("输入信息有误！");
            }
      });
  };

  render() {
    let self = this;
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '门店',
      dataIndex: 'storeName',
      key: 'storeName',

    }, {
      title: '车行',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '车行地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '车行电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '添加时间',
      dataIndex: 'addTime',
      key: 'addTime',
    }, {
      title: '操作',
      key: 'id',
      dataIndex: 'id',													
        render: (text, record) => <div><Link to={'/StoreAndAutoDealerManage/autodealeredittostore/p' +record.id + '/p'+ record.name + '/p'+ record.address + '/p' +record.storeCode + '/p' +record.phone + '/p' +record.provinceId + '/p' + record.cityId +'/p'+ record.areaId +'/p'+ this.state.page  } name="operate">编辑</Link>&nbsp; &nbsp; <Popconfirm okText="确认" cancelText="取消" title="您是否确认删除该车行操作??" onConfirm={() => this.handleDelete(record.id)}>
                <a href="#">删除</a></Popconfirm></div>
	            //render: (text, record) => <a  name="delete" onClick={() => self.operateRow(record)}>删除</a>
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
        let data = {
            page:currentPage,
            pageSize:this.state.pageSize,
            addTimeBegin:this.state.startValue,
            addTimeEnd:this.state.endValue
        };
        ajax.post("/admin/autoDealer/list",data)
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
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });
          }
    }
    return (
      <div className="staffManage">
        <Breadcrumb style={{ padding: '16px 28px',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
          <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
          <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
        </Breadcrumb>
        <div id="mainCont" style={{ margin: 24,padding:'0 32px', background: '#fff', minHeight: 780 }}>
          {/*查询选项*/}
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="添加时间："
            >
              <Col span="11" style={{display:'inline-block'}}>
                <DatePicker disabledDate={this.disabledStartDate}
                            placeholder="开始日期"
                            value={this.state.startValue}
                            onChange={this.onChange1.bind(this, 'startValue')}
                />
              </Col>
              <Col span="1" style={{display:'inline-block'}}>
                <p className="ant-form-split">-</p>
              </Col>
              <Col span="11" style={{display:'inline-block'}}>
                <DatePicker  disabledDate={this.disabledEndDate}
                             placeholder="截止日期"
                             value={this.state.endValue}
                             onChange={this.onChange1.bind(this, 'endValue')}
                />
              </Col>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
            </FormItem>
          </Form>
          <Button type="primary"><Icon type="plus" /><Link to="/StoreAndAutoDealerManage/autodealeredittostore/pnull/pnull/pnull/pnull/pnull/pnull/pnull/pnull/p1">新建</Link></Button>

          <div className="ant-form-split">
            <Table rowKey={(record) => record.id} columns={columns} dataSource={dataCont} pagination={vpagination} />
          </div>
        </div>
      </div>
    )
  }
}
const autoDealerToStoreManageList = Form.create()(AutoDealerToStoreManageList);
export default autoDealerToStoreManageList;