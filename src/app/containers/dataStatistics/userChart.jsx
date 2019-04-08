import React from 'react'
import { Form,Input, Select , DatePicker, Breadcrumb, Button, Icon ,Table, Radio , Row, Col ,Tabs, Tooltip} from 'antd'
import "./dataStatistics.less"
import 'ant-design-pro/dist/ant-design-pro.css'
import { Pie, yuan } from 'ant-design-pro/lib/Charts';

import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import ajax from "../../utils/ajax";

export default class myTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sexData: [],
            man_count: 0,
            man_rate: 0,
            woman_count: 0,
            woman_rate: 0,
            ageData: [],
            ageTotal: 0,
            areaData: [],
        }
    }   

    componentDidMount() {
        //性别分布数据
        ajax.post("/admin/statistics/census/sex")
        .then(response =>{
            if(response.code == "0") {
                var sex = [];
                var man_count = '',
                man_rate ='',
                woman_count ='',
                woman_rate = ''
                for (let i = 0;i < response.data.length;i++) {
                    sex.push({x: response.data[i].division, y: response.data[i].userCount - 0, rate: response.data[i].rate})
                    if(response.data[i].division == '男') {
                        man_count = response.data[i].userCount - 0
                        man_rate = response.data[i].rate
                    }else if (response.data[i].division == '女') {
                        woman_count = response.data[i].userCount - 0,
                        woman_rate = response.data[i].rate
                    }
                }
                this.setState({
                    sexData: sex,
                    man_count: man_count,
                    man_rate: man_rate,
                    woman_count: woman_count,
                    woman_rate: woman_rate,
                })
            }
        }).then(() => {
            var myRanderChart = echarts.init(document.getElementById('randerChart'));
            myRanderChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c}人 ({d}%)"
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['0%', '67%'],
                    hoverAnimation: false,
                    data: [{
                        value: this.state.man_count,
                        name: '男',
                        itemStyle: {
                            color: "#E6F7FF"
                        }
                    },{
                        value: this.state.woman_count,
                        name: '女',
                        itemStyle: {
                            color: "#FFF1F0"
                        }
                    }],
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: '#ffffff',
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            show: false
                        }
                    }
                },
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['70%', '84%'],
                    hoverAnimation: false,
                    data: [{
                        value: this.state.man_count,
                        name: '男',
                        itemStyle: {
                            color: "#3AA0FF"
                        }
                    },{
                        value: this.state.woman_count,
                        name: '女',
                        itemStyle: {
                            color: "#F2637B"
                        }
                    }],
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: '#ffffff',
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            show: false
                        }
                    }
                }]
            })
        })

        //年龄分布数据
        ajax.post("/admin/statistics/census/age")
        .then(response =>{
            if(response.code == "0") {
                var age = [
                    {
                        x: "00后",
                        y: 0,
                    },{
                        x: "90后",
                        y: 0,
                    },{
                        x: "80后",
                        y: 0,
                    },{
                        x: "70后",
                        y: 0
                    },{
                        x: "60后",
                        y: 0,
                    },{
                        x: "其他",
                        y: 0
                    }
                ]
                var other = {}
                for (let i = 0;i < 6;i++) {
                    for (let j = 0;j<response.data.length;j++) {
                        if(response.data[j].division == age[i].x) {
                            age[i].y = response.data[j].userCount - 0
                        }
                    }
                    // if(response.data[i].division != "其他"){
                    //     age.push({x: response.data[i].division, y: response.data[i].userCount - 0})
                    // } else {
                    //     other.x = response.data[i].division;
                    //     other.y = response.data[i].userCount - 0
                    // }
                }
                // age.push(other)
                this.setState({
                    ageData: age,
                    ageTotal: response.data[0].totalUserCount
                })
            }
        })

        //地域分布数据
        ajax.post("/admin/statistics/census/area")
        .then(response =>{
            if(response.code == "0") {
                var myareadata = []
                var splitList = []
                var areaMsg = response.data
                this.setState({
                    areaData: areaMsg
                })
                for (let i = 0;i < areaMsg.length;i++) {
                    var diname = areaMsg[i].division
                    diname = diname.replace("省", "")
                    diname = diname.replace("市", "")
                    diname = diname.replace("维吾尔自治区", "")
                    diname = diname.replace("壮族自治区", "")
                    diname = diname.replace("回族自治区", "")
                    diname = diname.replace("自治区", "")
                    myareadata.push({ name: diname, value: areaMsg[i].userCount, count: areaMsg[i].userCount, rate: areaMsg[i].rate})
                    
                }
            }
            var myChart = echarts.init(document.getElementById('areacontent'));
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'item'
                },
                formatter: function(params){
                    if(params.value > 0) {
                        var relVal = "";
                        relVal = params.name + '<br/>'
                        for(let i = 0;i < myareadata.length;i++) {
                            if(myareadata[i].name == params.name) {
                                relVal += "用户比例：    " + myareadata[i].rate + "<br/>" + "用户人数：   " + myareadata[i].count + "人";
                            }
                        }
                        return relVal;
                    }
                },
                dataRange: {
                    orient: 'vertical',
                    x: '5%',
                    y: '70%',
                    itemGap: 30,
                    max: areaMsg[0].userCount,
                    min: 0,
                    text: ['高','低'],
                    color: ['#3BA0FF', '#E6F7FF'],
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: '90%',
                    y: 'center',
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        dataZoom: {
                            show: true
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                roamController: {
                    show: true,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series: [{
                    name: '地域分布',
                    type: 'map',
                    mapType: 'china',
                    zoom: 1,
                    roam: true,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }

                    },
                    data:myareadata,
                }, ]
            });
        })
        
    }

    render() {
        const sexPieData = this.state.sexData;
        const agePieData = this.state.ageData;
        const age_total =this.state.ageTotal;
        return (
            <div className="userChat">
                <Breadcrumb style={{ padding: '16px 28px',fontSize:'20px',fontWeight:'bold',background:"#fff"}}>
                    <Breadcrumb.Item>用户画像</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{paddingTop:'24px',display: 'flex',flexWrap: 'wrap', minHeight: 780 }}>
                    <div className="left-user">
                        <div className="rander">
                            <div className="chartTitle">性别比例</div>
                            <div className="randercontent">
                                <div className="randerChart" id="randerChart">
                                    {/* <Pie
                                        data={sexPieData}
                                        height={150}
                                    /> */}
                                </div>
                                <div className="randerLegend">
                                    <div className="legend_1">
                                        <div className="legend_left">
                                            <i className="man_color"></i>
                                        </div>
                                        <div className="legend_right">
                                            <div className="rander">男 <span>&nbsp;|&nbsp; {this.state.man_count}人</span></div>
                                            <div className="rander_percent">{this.state.man_rate}</div>
                                        </div>
                                    </div>
                                    <div className="legend_1">
                                        <div className="legend_left">
                                            <i className="woman_color"></i>
                                        </div>
                                        <div className="legend_right">
                                            <div className="rander">女 <span>&nbsp;|&nbsp; {this.state.woman_count}人</span></div>
                                            <div className="rander_percent">{this.state.woman_rate}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="age-range">
                            <div className="chartTitle">年龄分布</div>
                            <div className="agecontent" id="agecontent">
                                <Pie
                                    data={agePieData}
                                    height={300}
                                    subTitle="用户总数(人)"
                                    total={() => (
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: age_total
                                          }}
                                        />
                                    )}
                                    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val + "人" }} />}
                                    hasLegend
                                />
                            </div>
                        </div>
                    </div>
                    <div className="area-range">
                        <div className="chartTitle">地域划分</div>
                        <div className="areacontent" id="areacontent"></div>
                    </div>
                </div>
              
            </div>
            
        )
    }
}