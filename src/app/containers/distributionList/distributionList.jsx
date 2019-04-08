import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table, Pagination , Row, Col ,Tabs} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./distributionList.less";
import reqwest from 'reqwest';
import {message} from "antd/lib/index";
import ajax from "../../utils/ajax";

class distributionListForm extends React.Component {
    state = {
        startValue: null,
        endValue: null,
        data: [],
    };
    constructor(props) {
        super(props);
        this.disabledStartDate = this.disabledStartDate.bind(this);
        this.disabledEndDate = this.disabledEndDate.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.showCurRowMessage = this.showCurRowMessage.bind(this);
        this.callback = this.callback.bind(this);
    };
    //展示当前行信息
    showCurRowMessage(record){
        console.log("key:"+record.key + " userId:"+record.userId);
    }

    componentWillMount= (e) =>{
        this._isMounted = true;
        let {page, applyNo, applyEmployeeCode, realName,autoType,status,startApplyDate,endApplyDate} =this.state;
        var redata = {page:page,applyNo:applyNo,applyEmployeeCode:applyEmployeeCode,realName:realName,autoType:autoType,status:status,startApplyDate:startApplyDate,endApplyDate:endApplyDate};
        ajax.post("/admin/autoloanApply/all/list",redata)
            .then(response =>{
                if(response.code=="0"){
                    var datalist=response.result;
                    this.setState({
                        data:datalist
                    });
                    console.log(this.state.data);
                }else{
                    console.log("list"+response.msg);
                    message.error(response.msg);
                }
            });

        ajax.post("/admin/admin/getEmployee", null)
            .then(response => {
                // console.log(response);
                if (response.code == "0") {
                    var data = response.data;
                    this.setState({
                        employeeLists: data
                    })
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });
    };
    componentWillUnmount() {
        this._isMounted = false
    }




    callback(key) {
        console.log(key);
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
                console.log('Received values of form: ', values);
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
            title: '申请单号',
            dataIndex: 'applyNum',
            key: 'applyNum',

        }, {
            title: '业务员',
            dataIndex: 'Salesman',
            key: 'Salesman',
        }, {
            title: '客户姓名',
            dataIndex: 'customerName',
            key: 'customerName',
        }, {
            title: '手机号码',
            dataIndex: 'phoneNum',
            key: 'phoneNum',
        }, {
            title: '身份证号',
            dataIndex: 'cardId',
            key: 'cardId',
        }, {
            title: '申请时间',
            dataIndex: 'applyTime',
            key: 'applyTime',
        },{
            title: '操作',
            key: 'operation',
            render: (text, record, index) => <a href="#" name="delete" onClick={() => self.showCurRowMessage(record)}>编辑</a>
        }];

        const data = [];
        for (let i = 0; i < 55; i++) {
            data.push({
                key: i,
                applyNum: i,
                Salesman:"张三" + i,
                customerName:'李四'+(i+i),
                phoneNum:"13222345678",
                cardId:"130123198009092345",
                applyTime: '2018-06-'+ i +' 09:10:'+i,
            })
        }
        const pagination = {
            total: data.length,
            current: 1,
            showSizeChanger: true,
            onShowSizeChange: function(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: function(current) {
                console.log('Current: ', current);
            }
        }

        //复选框
        // const rowSelection = {
        //   onChange(selectedRowKeys, selectedRows) {
        //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //   },
        //   // onSelect(record, selected, selectedRows) {
        //   //   console.log(record, selected, selectedRows);
        //   // },
        //   // onSelectAll(selected, selectedRows, changeRows) {
        //   //   console.log(selected, selectedRows, changeRows);
        //   // },
        // };


        return(
            <div className="distributionList staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff"}}>
                    <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
                </Breadcrumb>
                {/*查询选项*/}
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="等待分单" key="1">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="申请单号：">
                                    <Input placeholder="请输入申请单号" />
                                </FormItem>
                                <FormItem label="业务员：">
                                    <Select placeholder="请选择业务员">
                                        <Option value="张三">张三</Option>
                                        <Option value="李四">李四</Option>
                                        <Option value="王五">王五</Option>
                                        <Option value="赵四">赵四</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="客户姓名：">
                                    <Input placeholder="请输入客户姓名" />
                                </FormItem>
                                <FormItem label="手机号码：">
                                    <Input placeholder="请输入手机号码" />
                                </FormItem>
                                <FormItem label="申请时间：" >
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
                                    <Button type="primary" htmlType="submit" style={{marginLeft: '32px' }}>查询</Button>
                                </FormItem>
                            </Form>
                            <Button type="primary"  style={{marginLeft: '32px'}}><Icon type="plus" /><Link to="/staffManage/staffEdit">新建</Link></Button>
                            <div className="ant-form-split">
                                <Table rowKey={(record) => record.id} columns={columns} dataSource={data} pagination={this.state.pagination} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="当前分单" key="2">
                        <div style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    id="userId"
                                    label="申请单号：">
                                    <Input id="userId" placeholder="请输入申请单号" />
                                </FormItem>
                                <FormItem
                                    label="业务员："
                                >
                                    <Select placeholder="请选择业务员">
                                        <Option value="张三">张三</Option>
                                        <Option value="李四">李四</Option>
                                        <Option value="王五">王五</Option>
                                        <Option value="赵四">赵四</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    id="userName"
                                    label="客户姓名：">
                                    <Input id="userName" placeholder="请输入客户姓名" />
                                </FormItem>
                                <FormItem
                                    label="手机号码："
                                >
                                    <Input id="userName" placeholder="请输入手机号码" />
                                </FormItem>
                                <FormItem
                                    label="申请时间："
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
                                    <Button type="primary" htmlType="submit" style={{marginLeft: '32px' }}>查询</Button>
                                </FormItem>
                            </Form>
                            <Button type="primary"  style={{marginLeft: '32px'}}><Icon type="plus" /><Link to="/staffManage/staffEdit">新建</Link></Button>
                            <div className="ant-form-split">
                                <Table columns={columns} dataSource={data} pagination={this.state.pagination} />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>

            </div>
        )
    }
}
const distributionList = Form.create()(distributionListForm);
export default distributionList;