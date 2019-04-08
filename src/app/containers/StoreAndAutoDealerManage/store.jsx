import React from 'react';
import { Link } from "react-router";
import { Form, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import "./index.less";
import ajax from "../../utils/ajax";

class StoreManageList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      startValue: null,
      endValue: null,
      data: [],
      storeNameList:[],
      storeCode:undefined,
      storeStatus:undefined,
      pageSize:10,
      total:null,
      pagination: {},

      loading: false,
      selectedRowKeys: [],
      page:parseInt(this.props.params.page),
      selectDefault:null
    };
    this.disabledStartDate = this.disabledStartDate.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.operateRow = this.operateRow.bind(this);
    // this.handleTableChange = this.handleTableChange.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
  };

  //展示当前行信息
  operateRow(record){
    console.log("key:"+record.id + " name:"+record.name);
  }

  componentWillMount() {
      this._isMounted = true;
       var redata = {page:this.state.page,pageSize:this.state.pageSize};
	//获取门店列表
	ajax.post("/admin/store/list",redata)
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
		  this.setState({
                      storeNameList:datalist
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
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
            if (!err) {
	    
                let data = {
                    page:1,
		    pageSize:this.state.pageSize,
                    code:this.state.storeCode,
                    status:this.state.storeStatus,
                    addTimeBegin:this.state.startValue,
                    addTimeEnd:this.state.endValue
                };
                ajax.post("/admin/store/list",data)
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

  //请求数据
  // handleTableChange(pagination, filters, sorter) {
  //   const pager = this.state.pagination;
  //   pager.current = pagination.current;
  //   this.setState({
  //     pagination: pager
  //   });
  //   const params = {
  //     pageSize: pagination.pageSize,
  //     currentPage: pagination.current,
  //     sortField: sorter.field,
  //     sortOrder: sorter.order
  //   };
  //   for (let key in filters) {
  //     params[key] = filters[key];
  //   }
  //   this.fetch(params);
  // };
  // fetch(params = {}) {
  //   console.log('请求参数：', params);
  //   this.setState({ loading: true });
  //   reqwest({
  //     url: 'demo/data.json',
  //     method: 'get',
  //     data: params,
  //     type: 'json',
  //     success: (result) => {
  //       const pagination = this.state.pagination;
  //       // pagination.total = result.totalCount;
  //       pagination.total = result.length;
  //       this.setState({
  //         loading: false,
  //         data: result.data,
  //         pagination,
  //       });
  //     }
  //   });
  // };
  // componentDidMount() {
  //   this.fetch();
  // };

  render() {
    let self = this;
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '门店',
      dataIndex: 'name',
      key: 'name',

    }, {
      title: '省',
      dataIndex: 'province',
      key: 'province',
    }, {
      title: '市',
      dataIndex: 'city',
      key: 'city',
    }, {
      title: '区',
      dataIndex: 'area',
      key: 'area',
    }, {
      title: '状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
    }, {
      title: '添加时间',
      dataIndex: 'addTime',
      key: 'addTime',
    }, {
      title: '操作',
      key: 'id',
      dataIndex: 'id',
      // render: (text, record) => <a href="#" name="delete" onClick={() => self.operateRow(record)}>编辑</a>
        render: (text, record) => <Link to={'/StoreAndAutoDealerManage/storeedit/p' +record.id + '/p'+ record.name + '/p' +record.provinceId + '/p' + record.cityId +'/p'+ record.areaId + '/p' +record.status + '/p' +this.state.page } name="operate">编辑</Link>
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
                    code:this.state.storeCode,
                    status:this.state.storeStatus,
                    addTimeBegin:this.state.startValue,
                    addTimeEnd:this.state.endValue
                };
	ajax.post("/admin/store/list",data)
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

     let lstoreNameLists = this.state.storeNameList,
            nameOption = [];    
	nameOption.push(<Option key={this.state.selectDefault} value={this.state.selectDefault}>全部</Option>);
        for (let i = 0; i < lstoreNameLists.length; i++) {
            nameOption.push(<Option key={lstoreNameLists[i].code} value={lstoreNameLists[i].code} >{lstoreNameLists[i].name}</Option>);
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
              label="门店："
            >
              <Select placeholder="请选择门店" onChange={this.onChange1.bind(this, 'storeCode')}>
                {nameOption}
              </Select>
              {/* {getFieldDecorator('store', {
                rules: [{ required: false, message: '请选择门店!' }]
              })(
              <Select placeholder="请选择门店" value={this.state.selectDefault} onChange={this.onChange1.bind(this, 'storeCode')}>
                {nameOption}
              </Select>
              )} */}
            </FormItem>
            <FormItem
              label="状态："
            >
              <Select placeholder="请选择状态" onChange={this.onChange1.bind(this, 'storeStatus')}>
                <Option  value={this.state.selectDefault}>全部</Option>
                <Option  value="0">正常</Option>
                <Option  value="1">停止运营</Option>
              </Select>
              {/* {getFieldDecorator('status', {
                rules: [{ required: false, message: '请选择状态!' }]
              })(
                <Select placeholder="请选择状态" value={this.state.selectDefault} onChange={this.onChange1.bind(this, 'storeStatus')}>
		              <Option  value={this.state.selectDefault}>全部</Option>
                  <Option  value="0">正常</Option>
                  <Option  value="1">停止运营</Option>
                </Select>
              )} */}
            </FormItem>
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
          <Button type="primary"><Icon type="plus" /><Link to="/StoreAndAutoDealerManage/storeedit/pnull/pnull/pnull/pnull/pnull/p0/p1">新建</Link></Button>

          <div className="ant-form-split">
            <Table rowKey={(record) => record.id} columns={columns} dataSource={dataCont} pagination={vpagination} />
          </div>
        </div>
      </div>
    )
  }
}
const storeManageList = Form.create()(StoreManageList);
export default storeManageList;