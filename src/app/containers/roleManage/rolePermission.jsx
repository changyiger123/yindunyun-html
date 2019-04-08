import React from 'react'
import { Form, Select, Button, Input, Breadcrumb , message ,Row, Col,Checkbox,Table  } from 'antd';
import { Link } from "react-router";
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
import "./index.less";
import ajax from "../../utils/ajax";
import server_host from "../../config/apiUrl";



class RoleManageToEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roleId:this.props.params.id,
	    data:[],
	    dataLevelZero:[],
	    dataLevelOne:[],
	    dataLevelTwo:[],
	    dataLevelThree:[],
	    dataLevelFour:[],
	    pagination:false,

	    showLevelOne:[],
	    showLevelTwo:[],
	    showLevelThree:[],
	    showLevelFour:[],

	    levelOneSelect:-1,
	    levelTwoSelect:-1,
	    levelThreeSelect:-1,
	    levelFourSelect:-1

        };
	this.onChange1 = this.onChange1.bind(this);
	
    };
 
 onChange1(field, value){
    this.setState({
      [field]: value,
    });
  };

 componentWillMount() {	
	let redata = {
                    id:this.state.roleId
                };
	
	ajax.post("/admin/roles/add",redata)
          .then(response =>{    
              if(response.code=="0"){
		  var data=response.data;
                  var dataList = data.actions;
		  var data1=response.data;
                  var myDataList = data1.myActions;
                 
		for (let i = 0; i < dataList.length; i++) {
			dataList[i].icon="0";
			for (let j = 0; j < myDataList.length; j++) {
				if(dataList[i].id==myDataList[j].aid){
					dataList[i].icon="1";
					break;
				}
			}

			switch (dataList[i].level)
			{
			case 0:
				this.state.dataLevelZero.push(dataList[i]);
				break;
			case 1:
				this.state.dataLevelOne.push(dataList[i]);
				this.state.showLevelOne.push(dataList[i]);
				break;
			case 2:
				this.state.dataLevelTwo.push(dataList[i]);
				break;
			case 3:
				this.state.dataLevelThree.push(dataList[i]);
				break;
			case 4:
				this.state.dataLevelFour.push(dataList[i]);
				break;
			}
		}
		 this.setState({
                      data:dataList
                  });

              }else{ 
                  message.error(response.msg);
              }
          });
	
    };

componentDidMount() {
 this._isMounted = true;
};



 changeLevel(id,level){
	//console.log("if:"+id+",level:"+level);
 }

onSelectAllPermission=(e)=> {
  //console.log(`checked = ${e.target.checked}`);
	      var isSelect=(e.target.checked)?"1":"0";

		

		for (let i = 0; i < this.state.dataLevelOne.length; i++) {
			this.state.dataLevelOne[i].icon=isSelect;
		}

		for (let i = 0; i < this.state.dataLevelTwo.length; i++) {
			this.state.dataLevelTwo[i].icon=isSelect;
		}
		for (let i = 0; i < this.state.dataLevelThree.length; i++) {
			this.state.dataLevelThree[i].icon=isSelect;
		}
		for (let i = 0; i < this.state.dataLevelFour.length; i++) {
			this.state.dataLevelFour[i].icon=isSelect;
		}
		for (let i = 0; i < this.state.dataLevelZero.length; i++) {
			this.state.dataLevelZero[i].icon=isSelect;
		}

		var vShowLevelTwo=this.state.showLevelTwo,vShowLevelThree=this.state.showLevelThree,vShowLevelOne=this.state.showLevelOne,vShowLevelFour=this.state.showLevelFour;

		for (let i = 0; i < vShowLevelTwo.length; i++) {
			vShowLevelTwo[i].icon=isSelect;
		}

		for (let i = 0; i < vShowLevelThree.length; i++) {
			vShowLevelThree[i].icon=isSelect;
		}
		for (let i = 0; i < vShowLevelOne.length; i++) {
			vShowLevelOne[i].icon=isSelect;
		}
		for (let i = 0; i < vShowLevelFour.length; i++) {
			vShowLevelFour[i].icon=isSelect;
		}

		let me = this;

		setTimeout(function(){
			console.log("hello world!");
			me.setState({
				showLevelOne:vShowLevelOne,
				showLevelTwo:vShowLevelTwo,
				showLevelThree:vShowLevelThree,
				showLevelFour:vShowLevelFour
			});
		},0);
		

}

 handleSubmit = (e) => {

    var concatData=this.state.dataLevelZero.concat(this.state.dataLevelOne).concat(this.state.dataLevelTwo).concat(this.state.dataLevelThree).concat(this.state.dataLevelFour);
    var permissionData=[];
    for (let i = 0; i < concatData.length; i++) {
	if(concatData[i].icon=="1"){
		permissionData.push(concatData[i].id);
	}
    }
    var redata = {
                    id: this.state.roleId,  actionsIds: permissionData
                };
    console.log(redata);
     

       //console.log("hello");
	ajax.post("/admin/roles/save",redata)
	  .then(response =>{
	      console.log(response);
	      if(response.code=="0"){
		this.props.router.push('/roleManage/role');
	      }else{
		 // console.log("storeEdit"+response.msg);
		  message.error(response.msg);
	      }
	  });

	
        
    };


    render() {
	const { getFieldDecorator } = this.props.form;
	const { dataLevelOne } = this.state;

	const columnsOne = [{
		title: '一级菜单',
		dataIndex: 'name',
		key: 'name',
		}];

	// 通过 rowSelection 对象表明需要行选择
	const rowSelectionOne = {
	  getCheckboxProps: function(record) {
	    return {
	      checked: record.icon == "1" // 配置默认勾选的列
	    
	    };
	  },
	  onChange(selectedRowKeys) {

	   // console.log('selectedRowKeys changed: ' + selectedRowKeys);
	  },
	  onSelect: (record, selected, selectedRows) =>{
		var isSelect=(selected)?"1":"0";
		//所有上级菜单状态设置为选中
		if(selected){
			for (let i = 0; i < this.state.dataLevelZero.length; i++) {
				if(this.state.dataLevelZero[i].id==record.pid){
					this.state.dataLevelZero[i].icon="1";
					break;
				}
			}
		}
		
		for (let i = 0; i < this.state.dataLevelOne.length; i++) {
			if(this.state.dataLevelOne[i].id==record.id){
			    this.state.dataLevelOne[i].icon=isSelect;
			    break;
			}
		}
		//所有下级菜单设置为选中
		for (let i1 = 0; i1 < this.state.dataLevelTwo.length; i1++) {
			if(this.state.dataLevelTwo[i1].pid==record.id){
			    this.state.dataLevelTwo[i1].icon=isSelect;
			   
			    for (let i2 = 0; i2 < this.state.dataLevelThree.length; i2++) {
				if(this.state.dataLevelThree[i2].pid==this.state.dataLevelTwo[i1].id){
					this.state.dataLevelThree[i2].icon=isSelect;
					for (let i3 = 0; i3 < this.state.dataLevelFour.length; i3++) {
						if(this.state.dataLevelFour[i3].pid==this.state.dataLevelThree[i2].id){
							this.state.dataLevelFour[i3].icon=isSelect;
						}
					}

				}
			    }
			    
			}
		}

		var concatData=this.state.dataLevelZero.concat(this.state.dataLevelOne).concat(this.state.dataLevelTwo).concat(this.state.dataLevelThree).concat(this.state.dataLevelFour);

		this.setState({
		    data:concatData
		});

		var vShowLevelTwo=[];

		for (let i = 0; i < this.state.dataLevelTwo.length; i++) {
			if(this.state.dataLevelTwo[i].pid==this.state.levelOneSelect){
				//console.log(record.id);
				
				vShowLevelTwo.push(this.state.dataLevelTwo[i]);
			}
		}

		var vShowLevelThree=[];
			
		for (let i = 0; i < this.state.dataLevelThree.length; i++) {
			if(this.state.dataLevelThree[i].pid==this.state.levelTwoSelect){
				vShowLevelThree.push(this.state.dataLevelThree[i]);
			}
		}

		var vShowLevelFour=[];

		for (let i = 0; i < this.state.dataLevelFour.length; i++) {
			if(this.state.dataLevelFour[i].pid==this.state.levelThreeSelect){
			  vShowLevelFour.push(this.state.dataLevelFour[i]);
			}
		}
		let me = this;
		setTimeout(function(){
			me.setState({
				showLevelTwo:vShowLevelTwo,
				showLevelThree:vShowLevelThree,
				showLevelFour:vShowLevelFour
			});
		},0);

	  },
	  onSelectAll: function(selected, selectedRows) {	    
	    console.log(selected, selectedRows);
	  }
	};

	const columnsTwo = [{
		title: '二级菜单',
		dataIndex: 'name',
		key: 'name',
		}];

	// 通过 rowSelection 对象表明需要行选择
	const rowSelectionTwo = {
	  getCheckboxProps: function(record) {
	    return {
	      checked: record.icon == "1" // 配置默认勾选的列
	    
	    };
	  },
	  onChange(selectedRowKeys) {
	   // console.log('selectedRowKeys changed: ' + selectedRowKeys);
	  },
	  onSelect: (record, selected, selectedRows)=> {
		var isSelect=(selected)?"1":"0";
		var vShowLevelOne=this.state.showLevelOne;
		if(selected){
			for (let i = 0; i < this.state.dataLevelOne.length; i++) {
				if(this.state.dataLevelOne[i].id==record.pid){
					this.state.dataLevelOne[i].icon="1";
					for (let i1 = 0; i1 < this.state.dataLevelZero.length; i1++) {
						if(this.state.dataLevelZero[i1].id==this.state.dataLevelOne[i].pid){
							this.state.dataLevelZero[i1].icon="1";
							break;
						}
					}
					break;
				}
			}

			for (let i = 0; i < vShowLevelOne.length; i++) {
				if(vShowLevelOne[i].id==record.pid){
					vShowLevelOne[i].icon="1";					
					break;
				}
			}


		}

		for (let i = 0; i < this.state.dataLevelTwo.length; i++) {
			if(this.state.dataLevelTwo[i].id==record.id){
			    this.state.dataLevelTwo[i].icon=isSelect;
			    break;
			}
		}

	
		for (let i2 = 0; i2 < this.state.dataLevelThree.length; i2++) {
			if(this.state.dataLevelThree[i2].pid==record.id){
				this.state.dataLevelThree[i2].icon=isSelect;
				for (let i3 = 0; i3 < this.state.dataLevelFour.length; i3++) {
					if(this.state.dataLevelFour[i3].pid==this.state.dataLevelThree[i2].id){
						this.state.dataLevelFour[i3].icon=isSelect;
					}
				}

			}
		}
			    
		

		var concatData=this.state.dataLevelZero.concat(this.state.dataLevelOne).concat(this.state.dataLevelTwo).concat(this.state.dataLevelThree).concat(this.state.dataLevelFour);

		this.setState({
		    data:concatData
		});


		var vShowLevelThree=[];
			
		for (let i = 0; i < this.state.dataLevelThree.length; i++) {
			if(this.state.dataLevelThree[i].pid==this.state.levelTwoSelect){
				vShowLevelThree.push(this.state.dataLevelThree[i]);
			}
		}

		var vShowLevelFour=[];

		for (let i = 0; i < this.state.dataLevelFour.length; i++) {
			if(this.state.dataLevelFour[i].pid==this.state.levelThreeSelect){
			  vShowLevelFour.push(this.state.dataLevelFour[i]);
			}
		}
		let me = this;
		setTimeout(function(){
			me.setState({
				showLevelOne:vShowLevelOne,
				showLevelThree:vShowLevelThree,
				showLevelFour:vShowLevelFour
			});
		},0);
	  },
	  onSelectAll: function(selected, selectedRows) {
	    
	    console.log(selected, selectedRows);
	  }
	};

	const columnsThree = [{
		title: '三级菜单',
		dataIndex: 'name',
		key: 'name',
		}];

	// 通过 rowSelection 对象表明需要行选择
	const rowSelectionThree = {
	  getCheckboxProps: function(record) {
	    return {
	      checked: record.icon == "1" // 配置默认勾选的列
	    
	    };
	  },
	  onChange(selectedRowKeys) {
	    //console.log('selectedRowKeys changed: ' + selectedRowKeys);
	  },
	  onSelect: (record, selected, selectedRows)=> {
		var isSelect=(selected)?"1":"0";
		var vShowLevelOne=this.state.showLevelOne;
		var vShowLevelTwo=this.state.showLevelTwo;
		if(selected){
			for (let i = 0; i < this.state.dataLevelTwo.length; i++) {
				if(this.state.dataLevelTwo[i].id==record.pid){
					this.state.dataLevelTwo[i].icon="1";
					for (let i1 = 0; i1 < this.state.dataLevelOne.length; i1++) {
						if(this.state.dataLevelOne[i1].id==this.state.dataLevelTwo[i].pid){
							this.state.dataLevelOne[i1].icon="1";
							for (let i2 = 0; i2 < this.state.dataLevelZero.length; i2++) {
								if(this.state.dataLevelZero[i2].id==this.state.dataLevelOne[i1].pid){
									this.state.dataLevelZero[i2].icon="1";
									break;
								}
							}
							break;
						}
					}
					break;
				}
			}

			for (let i = 0; i < vShowLevelTwo.length; i++) {
				if(vShowLevelTwo[i].id==record.pid){
					vShowLevelTwo[i].icon="1";
					for (let i1 = 0; i1 < vShowLevelOne.length; i1++) {
						if(vShowLevelOne[i1].id==vShowLevelTwo[i].pid){
							vShowLevelOne[i1].icon="1";
							break;
						}
					}
					break;
				}
			}


		}


		for (let i = 0; i < this.state.dataLevelThree.length; i++) {
			if(this.state.dataLevelThree[i].id==record.id){
			    this.state.dataLevelThree[i].icon=isSelect;
			    break;
			}
		}
	
		for (let i3 = 0; i3 < this.state.dataLevelFour.length; i3++) {
			if(this.state.dataLevelFour[i3].pid==record.id){
				this.state.dataLevelFour[i3].icon=isSelect;
			}
		}

				 	

		var concatData=this.state.dataLevelZero.concat(this.state.dataLevelOne).concat(this.state.dataLevelTwo).concat(this.state.dataLevelThree).concat(this.state.dataLevelFour);

		this.setState({
		    data:concatData
		});

		var vShowLevelFour=[];

		for (let i = 0; i < this.state.dataLevelFour.length; i++) {
			if(this.state.dataLevelFour[i].pid==this.state.levelThreeSelect){
			  vShowLevelFour.push(this.state.dataLevelFour[i]);
			}
		}
		let me = this;
		setTimeout(function(){
			me.setState({
				showLevelOne:vShowLevelOne,
				showLevelTwo:vShowLevelTwo,
				showLevelFour:vShowLevelFour
			});
		},0);

	  },
	  onSelectAll: function(selected, selectedRows) {
	    
	    console.log(selected, selectedRows);
	  }
	};

	const columnsFour = [{
		title: '四级菜单',
		dataIndex: 'name',
		key: 'name',
		}];

	// 通过 rowSelection 对象表明需要行选择
	const rowSelectionFour = {
	  getCheckboxProps: function(record) {
	    return {
	      defaultChecked: record.icon == "1" // 配置默认勾选的列
	    
	    };
	  },
	  onChange(selectedRowKeys) {
	   // console.log('selectedRowKeys changed: ' + selectedRowKeys);
	  },
	  onSelect: (record, selected, selectedRows)=> {
		var isSelect=(selected)?"1":"0";
		var vShowLevelOne=this.state.showLevelOne;
		var vShowLevelTwo=this.state.showLevelTwo;
		var vShowLevelThree=this.state.showLevelThree;
		if(selected){
			for (let i = 0; i < this.state.dataLevelThree.length; i++) {
				if(this.state.dataLevelThree[i].id==record.pid){
					this.state.dataLevelThree[i].icon="1";
					for (let i1 = 0; i1 < this.state.dataLevelTwo.length; i1++) {
						if(this.state.dataLevelTwo[i1].id==this.state.dataLevelThree[i].pid){
							this.state.dataLevelTwo[i1].icon="1";
							for (let i2 = 0; i2 < this.state.dataLevelOne.length; i2++) {
								if(this.state.dataLevelOne[i2].id==this.state.dataLevelTwo[i1].pid){
									this.state.dataLevelOne[i2].icon="1";
									for (let i3 = 0; i3 < this.state.dataLevelZero.length; i3++) {
										if(this.state.dataLevelZero[i3].id==this.state.dataLevelOne[i2].pid){
											this.state.dataLevelZero[i3].icon="1";
											break;
										}
									}
									break;
								}
							}
							break;
						}
					}
					break;
				}
			}

			for (let i = 0; i < vShowLevelThree.length; i++) {
				if(vShowLevelThree[i].id==record.pid){
					vShowLevelThree[i].icon="1";
					for (let i1 = 0; i1 < vShowLevelTwo.length; i1++) {
						if(vShowLevelTwo[i1].id==vShowLevelThree[i].pid){
							vShowLevelTwo[i1].icon="1";
							for (let i2 = 0; i2 < vShowLevelOne.length; i2++) {
								if(vShowLevelOne[i2].id==vShowLevelTwo[i1].pid){
									vShowLevelOne[i2].icon="1";

									break;
								}
							}
							break;
						}
					}
					break;
				}
			}


		}

		for (let i = 0; i < this.state.dataLevelFour.length; i++) {
			if(this.state.dataLevelFour[i].id==record.id){
			    this.state.dataLevelFour[i].icon=isSelect;
			    break;
			}
		}

		let me = this;
		setTimeout(function(){
			me.setState({
				showLevelOne:vShowLevelOne,
				showLevelTwo:vShowLevelTwo,
				showLevelThree:vShowLevelThree
			});
		},0);
	
	  },
	  onSelectAll: function(selected, selectedRows) {
	    
	    console.log(selected, selectedRows);
	  }
	};
	
    return (
        <div className="roleWarp">
            <div id="mainCont" style={{width:"90%",margin:"0 auto",background:"#fff"}}>
		    	<div style={{padding:"20px", height:"63px", borderBottom:"1px solid rgba(232,232,232,1)"}}>
					<Checkbox onChange={this.onSelectAllPermission}>选择所有权限</Checkbox>
		    	</div>
				<div style={{borderBottom:"1px solid #f1f1f1", height: "410px", background:"#FAFAFA"}}>
					<Table showHeader={false} onRow={(record) => { return {onClick: () => {	
			    		var vShowLevelTwo=[];
			    		for (let i = 0; i < this.state.dataLevelTwo.length; i++) {
							if(this.state.dataLevelTwo[i].pid==record.id){
								//console.log(record.id);
								vShowLevelTwo.push(this.state.dataLevelTwo[i]);
							}
			    		}
						this.setState({
							showLevelTwo:vShowLevelTwo,
							showLevelThree:[],
							showLevelFour:[],
							levelOneSelect:record.id,
							levelTwoSelect:-1,
							levelThreeSelect:-1,
							levelFourSelect:-1
						});
					}};}} rowKey={(record) => record.id} rowSelection={rowSelectionOne} columns={columnsOne} dataSource={this.state.showLevelOne} pagination={this.state.pagination} scroll ={{x:false,y:true,y:400}}
					style={{display:"inline-block",width:"24%",verticalAlign:"top",height:"400px",background:"#fff",marginRight:"1%",border:"1px solid #f1f1f1"}}
					/>
                      
					<Table showHeader={false} onRow={(record) => { return {onClick: () => {	
						var vShowLevelThree=[];
						for (let i = 0; i < this.state.dataLevelThree.length; i++) {
							if(this.state.dataLevelThree[i].pid==record.id){
								vShowLevelThree.push(this.state.dataLevelThree[i]);
							}
			    		}
						this.setState({
						showLevelThree:vShowLevelThree,
						showLevelFour:[],
						levelTwoSelect:record.id,
						levelThreeSelect:-1,
						levelFourSelect:-1
						});
			
					}};}} rowKey={(record) => record.id} rowSelection={rowSelectionTwo} columns={columnsTwo} dataSource={this.state.showLevelTwo} pagination={this.state.pagination} scroll ={{x:false,y:true,y:400}}
					style={{display:"inline-block",width:"24%",verticalAlign:"top",height:"400px",background:"#fff",marginRight:"1%",border:"1px solid #f1f1f1"}}
					/>
                      
		      		<Table showHeader={false} onRow={(record) => { return {onClick: () => {	
						 var vShowLevelFour=[];
						for (let i = 0; i < this.state.dataLevelFour.length; i++) {
							if(this.state.dataLevelFour[i].pid==record.id){
								vShowLevelFour.push(this.state.dataLevelFour[i]);
							}
			    		}
						this.setState({
						showLevelFour:vShowLevelFour,
						levelThreeSelect:record.id,
						levelFourSelect:-1
						});
					}};}} rowKey={(record) => record.id} rowSelection={rowSelectionThree} columns={columnsThree} dataSource={this.state.showLevelThree} pagination={this.state.pagination} scroll ={{x:false,y:true,y:400}}
					style={{display:"inline-block",width:"24%",verticalAlign:"top",height:"400px",background:"#fff",marginRight:"1%",border:"1px solid #f1f1f1"}}
					/>
					<Table showHeader={false} onRow={(record) => { return {onClick: () => {	
						// console.log("cccccc");
						}};}} rowKey={(record) => record.id} rowSelection={rowSelectionFour} columns={columnsFour} dataSource={this.state.showLevelFour} pagination={this.state.pagination} scroll ={{x:false,y:true,y:400}}
					style={{display:"inline-block",width:"25%",verticalAlign:"top", height:"400px", background:"#fff"}}
					/>
			
                </div>
				<div className="editformButton" style={{padding:"20px",textAlign:"right"}}>
			 		<Button type="primary" htmlType="submit" onClick={this.handleSubmit} style={{marginRight:"20px"}}>
                              提交
                    </Button>
                    <Button><Link to={'/roleManage/role'}>取消</Link></Button>
		      	</div>
            </div>
        </div>
    );
	}

}
const roleManageEdit = Form.create()(RoleManageToEdit);
export default roleManageEdit;