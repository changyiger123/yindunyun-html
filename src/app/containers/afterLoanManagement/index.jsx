import React from 'react'
import {Table, Icon} from 'antd'

export default class myTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tDate: [],
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        const data = []

        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                name: `Mr�Ͳ�${i}`,
                age: 18,
                address: `���������׹�԰${i}��`,
                remark: 'http://www.cnblogs.com/luozhihao/',
                operate: '����'
            })
        }

        this.setState({
            tDate: data
        })
    }

    // checkbox״̬
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    render() {
        const columns = [{
            title: '����',
            width: '20%',
            dataIndex: 'name'
        }, {
            title: '����',
            width: '20%',
            dataIndex: 'age',
        }, {
            title: 'סַ',
            width: '20%',
            dataIndex: 'address'
        }, {
            title: '��ע',
            width: '20%',
            dataIndex: 'remark',
            render(text) {
                return <a href={text} target="_blank">����԰</a>
            }
        }, {
            title: '����',
            width: '20%',
            dataIndex: 'operate'
        }]

        const { selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        const pagination = {
            total: this.state.tDate.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        return (
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tDate} bordered pagination={pagination} />
        )
    }
}