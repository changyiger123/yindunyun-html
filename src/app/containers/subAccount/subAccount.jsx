import React from 'react';
import { Link } from "react-router";
import { Form, Input, Select, DatePicker, Button, Icon ,Table, Breadcrumb, Pagination ,message, Row, Col,Modal,Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
import "./index.less";
import ajax from "../../utils/ajax";
import noData from "../../images/noData.png"

class SubAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page:1,
            pageSize:10,
            total:null,
            pagination: {},
            loading: false,
            selectedRowKeys: [],
            isEmpty: true,
            not_restart: false
        };
    };

    componentWillMount() {
        this.getList()
    };
    //普通字段输入更改state
    onChange(field, e){
        let valStr = e.target.value;
        this.setState({
            [field]: valStr,
        });
    };
    //select选择option更改state
    onChangeSelect(field, value) {
        console.log(value);
        this.setState({
            [field]: value,
        }, ()=> {
            // console.log([field]);
        });
    };
    getList () {
        ajax.post("/admin/admin/subAccount/list",{mobilePhone:this.state.mobilePhone,actionType:this.state.actionType})
        .then(response => {
            if(response.code === "0") {
                this.setState({
                    data: response.data.list,
                    total: response.data.totalCount,
                    isEmpty: response.data.totalCount == 0?true:false
                })
            } else {
                message.error(response.msg)
            }
        });
    }
    go_search () {
        this.getList()
    }
    do_sth (i, x, y, z, e) {
        if(i == "0") {
            console.log(x,y,z)
            window.location.hash="editSubAccount/"+x+"/"+y+"/"+z
        }else {
            ajax.post("/admin/admin/subAccount/open",{mobile:x})
            .then(response => {
                if(response.code === "0") {
                    message.success('启用成功')
                    setTimeout(function(){
                        window.location.reload();
                    },1000)
                }else if(response.code === "867"){
                    this.setState({
                        not_restart: true
                    })
                } else {
                    message.error(response.msg)
                }
            });
        }
    }
    go_addSubAccount () {
        window.location.hash="addSubAccount"
    }
    close_alert () {
        this.setState({
            not_restart: false
        })
    }
    render() {
        const columns = [{
            title: '编号',
            render:(text,record,index)=>`${index+1+(10 * (this.state.page - 1))}`

        }, {
            title: '手机号码',
            dataIndex: 'mobilePhone',
            key: 'mobilePhone',
        }, {
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
        }, {
            title: '权限',
            key: 'actionsType',
            dataIndex: 'actionsType',
            render: (text, record) =><span>{record.actionsType == "0"?'可查询':'可查看'}</span>
        },{
            title: '创建时间',
            dataIndex: 'registerTime',
            key: 'registerTime',
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) =><span>{record.status == "0"?'正常':'停用'}</span>
        },{
            title: '操作',
            render: (text, record) =><a onClick={this.do_sth.bind(this,record.status,record.mobilePhone,record.actionsType,record.realName)} href="javascript:;">{record.status == "0"?'编辑':'重新启用'}</a>
        }];
        const dataCont = this.state.data
        const statusOption = [
            <Option key='' value=''>全部</Option>,
            <Option key='0' value='0'>可查询</Option>,
            <Option key='1' value='1'>可查看</Option>
        ]
        return (
        <div className="staffManage">
            <Breadcrumb style={{ padding: '16px 28px',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
            <Breadcrumb.Item>子账户管理</Breadcrumb.Item>
            </Breadcrumb>
            <div id="mainCont" style={{ margin: 24,padding:'0 32px', background: '#fff', minHeight: 780 }}>
                {/*查询选项*/}
                <Form>
                    <FormItem label="手机号码">
                        <Input placeholder="请输入手机号码"  onChange={this.onChange.bind(this, 'mobilePhone')}/>
                    </FormItem>
                    <FormItem label="权限">
                        <Select placeholder="全部"  onChange={this.onChangeSelect.bind(this, 'actionType')}>
                            {statusOption}
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.go_search.bind(this)}>查询</Button>
                    </FormItem>
                </Form>
                <Button onClick={this.go_addSubAccount.bind(this)} type="primary" style={{marginTop:"32px"}}><Icon type="plus" />新建</Button>
                <div className="ant-form-split common_table">
                    <Table rowKey={(record) => record.id} columns={columns} dataSource={dataCont} />
                    {this.state.isEmpty?
                    <div className="table_noData">
                        <img src={noData} alt='noData'/>
                        <div>暂时没有数据</div>
                    </div>
                    :''
                    }
                </div>
                {this.state.not_restart?
                <div className="checkChoose">
                    <div className="stopUse">
                        <h3>该手机号已在其他团队激活</h3>
                        <Button onClick={this.close_alert.bind(this)} type="primary" style={{width:"100px"}}>知道了</Button>
                    </div>
                </div>:''}
            </div>
        </div>
        )
    }
}
const subAccount = Form.create()(SubAccount);
export default subAccount;