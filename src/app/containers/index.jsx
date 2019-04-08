/**
 * Created by zhang on 2018/06/13.
 */
import React from "react";
import {Link} from "react-router";
import {Layout, Menu, Dropdown, Breadcrumb, Icon,message} from "antd";
import Login from "./login/login";
import 'antd/dist/antd.css';
import "./index.less";
import ajax from "../utils/ajax";

import moment from 'moment';

import 'moment/locale/zh-cn';
moment.locale('zh-cn')

import logo from '../images/logo03.png'

const {Header, Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;

var allMenus=[],sortMenus=[];
var menus=[];


var select_menu = [];

class App extends React.Component {
    state = {
        realName: window.localStorage.getItem('realName'),
		menuData: [],
        openKeys: ['3'],
    };
	go_homepage () {
		window.location.hash="/"
	}
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    }

    componentWillMount() {
        if (!window.localStorage.getItem("access_token")) {
            window.location.hash = "login";
			allMenus=[];
			menus=[];
        } else {
           // window.location.hash = "#";
        }
	
		ajax.post("/admin/menu",null)
			.then(response =>{
				console.log(response);
				if(response.code=="0"){
				  	var vData=response.data.actionList;
				  	// if (response.data.auditStatus == 0) {
					// 	window.location.hash = "/enterpriseInfo";
					// } else if (response.data.auditStatus == 1) {
					// 	window.location.hash = "/registerAlready";
					// }else if (response.data.auditStatus == 3) {
					// 	window.location.hash = "/registerAlreadyFail";
					// }
				  	this.setState({
					  	data:vData
					});
					allMenus=vData;
					if (vData.length == 0) {
						window.location.hash = "/login"
					}
					const pathname1 = window.location.href.split('#')[1];
					console.log(pathname1)
					if (pathname1 == '/') {
						this.setState({
							openKeys: ['3']
						});
					} else {
						for (var i = 0;i < allMenus.length;i++) {
							if(pathname1 == allMenus[i].url) {
							this.setState({
								openKeys: [allMenus[i].pid+'']
							});
							}
						}
					}
				  
					//  console.table(allMenus);

				}else{
				  	console.log("error:"+response.msg);
				}
			});
    };

    //退出
    handleMenuClick = e => {
        if (e.key === "exit") {
            window.localStorage.removeItem("access_token");
			allMenus=[];
			menus=[];
			// this.props.router.push('/login/login');
			window.location.reload();
        }
    };

    recursionMenu(pMenuData){
		var tmp=[];
		sortMenus.push(pMenuData);
		for (let i = 0; i < allMenus.length; i++) {
			if(allMenus[i].pid==pMenuData.id) tmp.push(allMenus[i]);
		}
		tmp.sort(function(x, y){
			return (x.paixu-y.paixu);
		});
		for (let i = 0; i < tmp.length; i++) {
			this.recursionMenu(tmp[i]);
		}
    }

    isSubMenu(menuData){
       	var retResult=false;
		for (let i = 0; i < allMenus.length; i++) {
			if(allMenus[i].pid==menuData.id) {
				retResult = true;
				break;
			}
		}
		return retResult;
    }

    renderMainPage() {
        let selectMenu = window.location.hash.split("/")[1]
            ? window.location.hash.split("/")[1]
            : "staffManage";

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="pwd">
                    <Link to="/changePwd">修改密码</Link>
                </Menu.Item>
                <Menu.Item key="exit">退出</Menu.Item>
            </Menu>
        );

		sortMenus=[];

		for (let i = 0; i < allMenus.length; i++) {
			if(allMenus[i].id==1) {
				this.recursionMenu(allMenus[i]);
				break;
			}
		}

		var subMenuId=-1,subMenuName="",subMenu=[];

		var parentId=-1;

		if(allMenus.length<=0){
			ajax.post("/admin/menu",null)
				.then(response =>{
					console.log(response);
					if(response.code=="0"){
						var vData=response.data.actionList;
						this.setState({
							data:vData
						});
						allMenus=vData;
					}else{
						console.log("error:"+response.msg);
					}
				});
		}

		if(menus.length<=0){
			// for (let i = 0; i < sortMenus.length; i++) {
			// 	//console.log("id:"+sortMenus[i].id+",name:"+sortMenus[i].name+",pid:"+sortMenus[i].pid);
			// 	if(sortMenus[i].id>1){
			// 		if(this.isSubMenu(sortMenus[i])){
			// 			if(parentId>0){
			// 				menus.push(<SubMenu key={subMenuId} title={subMenuName}>
			// 				{subMenu}
			// 				</SubMenu>
			// 				);
			// 				//console.log("1menuName:"+sortMenus[i].name);
			// 			}
			// 			subMenu=[];
			// 			subMenuId=sortMenus[i].id;
			// 			subMenuName=sortMenus[i].name;
			// 			parentId=sortMenus[i].id;

			// 			//console.log("2menuName:"+sortMenus[i].name);
			// 		}else{
			// 			//console.log("yid:"+sortMenus[i].id+",yname:"+sortMenus[i].name+",ypid:"+sortMenus[i].pid+",yparentId:"+parentId);
			// 			if((parentId!=sortMenus[i].pid)&&(parentId!=-1)){
			// 				menus.push(<SubMenu key={subMenuId} title={subMenuName}>
			// 				{subMenu}
			// 				</SubMenu>
			// 				);
			// 				//console.log("3menuName:"+sortMenus[i].name);
			// 				menus.push(<Menu.Item key={sortMenus[i].id}><Link to={sortMenus[i].url} className="nav-text">{sortMenus[i].name}</Link></Menu.Item>);

			// 				subMenu=[];
			// 				subMenuId=-1;
			// 				subMenuName="";
			// 				parentId=-1;

			// 			 }else{
			// 				//console.log("menu:"+sortMenus[i].id+",parentId:"+parentId);
			// 				if(parentId==-1){
			// 					//console.log("4menuName:"+sortMenus[i].name);
			// 					menus.push(<Menu.Item key={sortMenus[i].id}><Link to={sortMenus[i].url} className="nav-text">{sortMenus[i].name}</Link></Menu.Item>);
			// 				}else{
			// 					//console.log("5menuName:"+sortMenus[i].name);
			// 					subMenu.push(<Menu.Item key={sortMenus[i].id}><Link to={sortMenus[i].url} className="nav-text">{sortMenus[i].name}</Link></Menu.Item>);
			// 				}
			// 			}

			// 		}

			// 	}

			// };

			// if(parentId!=-1){
			// 	menus.push(<SubMenu key={subMenuId} title={subMenuName}>
			// 					{subMenu}
			// 				</SubMenu>
			// 				);
			// }
			for( var i = 0;i<allMenus.length;i++) {
				if (allMenus[i].pid == 1 && allMenus[i].url) {
					menus.push(<Menu.Item key={allMenus[i].id}><Link to={allMenus[i].url} className="nav-text">{allMenus[i].name}</Link></Menu.Item>)
				} else if (allMenus[i].pid == 1 && !allMenus[i].url){
					var innerMenu = []
					for (var j = 0; j<allMenus.length; j++) {
						if (allMenus[j].pid == allMenus[i].id) {
							innerMenu.push(<Menu.Item key={allMenus[j].id}><Link to={allMenus[j].url} className="nav-text">{allMenus[j].name}</Link></Menu.Item>)
						}
					}
					menus.push(<SubMenu key={allMenus[i].id} title={<span>{allMenus[i].name}</span>}>
						{innerMenu}
					</SubMenu>)
				}
			}
			console.log(allMenus)
		};

		if(this.state.realName!=localStorage.getItem('realName')){
			this.setState({
				realName:window.localStorage.getItem('realName')
			});
		}
		const pathname = window.location.href.split('#')[1];
		if (pathname == '/') {
			select_menu = ['195'];
		} else {
			for (var i = 0;i < allMenus.length;i++) {
				if (allMenus[i].url == pathname) {
					select_menu = [allMenus[i].id+'']
					break
				}
			}
		}
		
        return (
            <Layout style={{height:"100%"}}>
                <Sider style={{overflow: "auto",height:"100%",position:"fixed"}}>
                    {/* <div onClick={this.go_homepage.bind(this)} className="logo"></div> */}
					<img src={logo} alt="logo" onClick={this.go_homepage.bind(this)} style={{width:"90px", margin:"17px 25px"}}/>
                    <Menu theme="dark"
                          mode="inline"
                          openKeys={this.state.openKeys}
						  onOpenChange={this.onOpenChange}
						  defaultSelectedKeys={['195']}
						  selectedKeys = {select_menu}
						  style={{paddingBottom: "50px"}}
					>
						{menus}
                    </Menu>
                </Sider>
                <Layout style={{height:"100%",paddingLeft:"200px"}}>
                    <Header>
                        <Dropdown overlay={menu} trigger={['click']} onClick={this.handleMenuClick}>
                            <a className="ant-dropdown-link"
                               style={{color: '#000', float: 'right', paddingRight: '1%'}}>
                                <i style={{
                                    fontStyle: "normal",
                                    margin: "0 10px 0 15px",
                                }}>{this.state.realName}</i>
                                <Icon type="down"/>
                            </a>
                        </Dropdown>
                        {/* <Link to="/myMessage"><i className="anticon anticonMyMsg"></i></Link> */}
                    </Header>
                    <Content style= {{height: 'calc( 100% - 64px)', overflow: 'auto'}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }

    render() {
        const isAuthenticated = window.localStorage.getItem("access_token");
        return <div>{isAuthenticated ? this.renderMainPage() : <Login/>}</div>;
    }
}

export default App;
