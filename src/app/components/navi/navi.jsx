import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './navi.less'
const { Header, Content, Footer, Sider } = Layout;

class Navi extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo"></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <span className="nav-text">员工管理</span>
            </Menu.Item>
            <Menu.Item key="2">
              <span className="nav-text">系统设置</span>
            </Menu.Item>
            <Menu.Item key="3">
              <span className="nav-text">新建申请单</span>
            </Menu.Item>
            <Menu.Item key="4">
              <span className="nav-text">审核列表</span>
            </Menu.Item>
            <Menu.Item key="5">
              <span className="nav-text">分单列表</span>
            </Menu.Item>
            <Menu.Item key="6">
              <span className="nav-text">打款申请</span>
            </Menu.Item>
            <Menu.Item key="7">
              <span className="nav-text">寄件登记</span>
            </Menu.Item>
            <Menu.Item key="8">
              <span className="nav-text">收件登记</span>
            </Menu.Item>
            <Menu.Item key="9">
              <span className="nav-text">车辆GPS登记</span>
            </Menu.Item>
            <Menu.Item key="10">
              <span className="nav-text">抵押登记</span>
            </Menu.Item>
            <Menu.Item key="11">
              <span className="nav-text">数据统计</span>
            </Menu.Item>
            <Menu.Item key="12">
              <span className="nav-text">车行管理</span>
            </Menu.Item>
            <Menu.Item key="13">
              <span className="nav-text">贷后管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <span style={{color:'#000', float:'right', paddingRight:'1%'}}>
              <Icon type="message" /> <i style={{fontStyle: "normal",margin:"0 10px 0 15px"}}>管理员</i><Icon type="down" />
            </span>
          </Header>
          <Content>
            <Breadcrumb style={{ padding: '16px 28px',background:"#fff",borderBottom:"1px solid #E8E8E8"}}>
              <Breadcrumb.Item>上级菜单</Breadcrumb.Item>
              <Breadcrumb.Item>当前菜单</Breadcrumb.Item>
            </Breadcrumb>
            <div id="mainCont" style={{ margin: 24, background: '#fff', minHeight: 780 }}>
              各个页面的不同内容

            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Navi;