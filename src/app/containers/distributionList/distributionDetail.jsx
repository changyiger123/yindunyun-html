import React from 'react';
import { Link } from "react-router";
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Modal, Icon ,Table, Pagination , Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import "./distributionList.less";
import reqwest from 'reqwest';

class distributionListForm extends React.Component {
    state = {
        isEditing: false,
        startValue: null,
        endValue: null,
        data: [],
        pagination: {},
        selectedRowKeys: [],
        loading: false,
        visible: false
    };
    constructor(props) {
        super(props);
        this.disabledStartDate = this.disabledStartDate.bind(this);
        this.disabledEndDate = this.disabledEndDate.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.showCurRowMessage = this.showCurRowMessage.bind(this);
        // this.handleTableChange = this.handleTableChange.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
    };

    //展示当前行信息
    showCurRowMessage(record){
        console.log("key:"+record.key + " userId:"+record.userId);
    }

    //弹出对话框
    showModal= (e) =>  {
        this.setState({
            visible: true
        });
    };
    handleOk= (e) =>  {
        console.log("key:"+e.key + " userId:"+e.userId);
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };
    handleCancel= (e) =>  {
        this.setState({ visible: false });
    };

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
            title: '工号',
            dataIndex: 'userId',
            key: 'userId',

        }, {
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '手机号码',
            dataIndex: 'phoneNum',
            key: 'phoneNum',
        }, {
            title: '身份证号',
            dataIndex: 'cardId',
            key: 'cardId',
        }, {
            title: '门店',
            dataIndex: 'store',
            key: 'store',
        }, {
            title: '添加时间',
            dataIndex: 'addTime',
            key: 'addTime',
        },{
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record, index) => <a name="delete" onClick={() => self.showModal(record)}>编辑</a>}];

        const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                userId:"00000"+ i,
                userName:"张三" + i,
                phoneNum:"13222345678",
                cardId:"130123198009092345",
                store: '杭州' + i,
                addTime: '2018-06-'+ i +' 09:10:'+i,
                state: '在职',
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
            <div className="staffManage">
                <Breadcrumb style={{ padding: '16px 28px',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
                    <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
                    <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{ margin: 24,padding:'0 20px', background: '#fff', minHeight: 780 }}>
                    {/*查询选项*/}
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            id="userId"
                            label="工号：">
                            <Input id="userId" placeholder="请输入工号" />
                        </FormItem>
                        <FormItem
                            id="userName"
                            label="姓名：">
                            <Input id="userName" placeholder="请输入姓名" />
                        </FormItem>
                        <FormItem
                            label="门店："
                        >
                            <Select placeholder="请选择门店">
                                <Option value="杭州">杭州</Option>
                                <Option value="舟山">舟山</Option>
                                <Option value="苏州">苏州</Option>
                                <Option value="宁波">宁波</Option>
                                <Option value="绍兴">绍兴</Option>
                            </Select>
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
                        <FormItem
                            label="状态："
                        >
                            <Select placeholder="请选择状态">
                                <Option value="正常">正常</Option>
                                <Option value="停止运营">停止运营</Option>
                            </Select>
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

                <Modal ref="modal"
                       visible={this.state.visible}
                       title="改派初审员/复评师" onOk={this.handleOk} onCancel={this.handleCancel}
                       footer={[
                           <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
                           <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                               提 交
                           </Button>
                       ]}>
                    <p>当前初审员/复评师：张三</p>
                    <p>改派初审员/复评师：
                        <Select placeholder="请选择初审员/复评师">
                            <Option value="张三">张三</Option>
                            <Option value="李四">李四</Option>
                        </Select>
                    </p>

                </Modal>
            </div>
        )
    }
}
const distributionList = Form.create()(distributionListForm);
export default distributionList;