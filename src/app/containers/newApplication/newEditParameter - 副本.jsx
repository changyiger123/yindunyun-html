import React from 'react';
import { Link } from "react-router";
import {
    Form,
    Select,
    Upload,
    Icon,
    Button,
    Input,
    Breadcrumb,
    Checkbox,
    Radio,
    Row,
    Col,
    DatePicker,
    message,
    Modal
} from 'antd';
import Moment from 'moment';
import "./newApplication.less";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const confirm = Modal.confirm;

import $ from 'jquery';
import rollTo from '../../commonJS/rollTo1.js';
const dateFormat = 'YYYY-MM-DD';
import ajax from "../../utils/ajax";
import {upyun_action,upyun_domain} from "../../config/upyun-config";//upyun上传图片地址

class applicationEditForm extends React.Component {
    state = {
        //表单字段
        applyNo: this.props.params.id,
        render_count: 1,
        realName: "",
        sex: 1,
        birthday: undefined,
        mobilePhone: undefined,
        cardId: undefined,
        permanentAddress: undefined,
        address: undefined,
        provinceId: undefined,
        cityId: undefined,
        areaId: undefined,
        cardStartDate: undefined,
        cardEndDate: undefined,
        cardDate: undefined,//身份证有效期
        cardFrontPic: undefined,
        cardBackPic: undefined,
        authorizedPic: undefined,
        signAuthorizedPic: undefined,
        creditContent: undefined,
        creditUrl: undefined,
        aboutCourt: undefined,
        isMarried: 0,
        spouseRealName: undefined,
        spouseMobilePhone: undefined,
        spouseCardId: "",
        spousePic: "",
        spouseCompanyName: undefined,
        spouseCompanyPhone: undefined,
        spouseCompanyAddress: undefined,
        haveGuarantee: 1,
        haveSecondGuarantee: 0,
        guaranteeRealName: undefined,
        guaranteeMobilePhone: undefined,
        guaranteeCardId: undefined,
        guaranteePic: undefined,
        guaranteeCompanyName: undefined,
        guaranteeCompanyPhone: undefined,
        guaranteeCompanyAddress: undefined,
        guaranteeRealName2: undefined,
        guaranteeMobilePhone2: undefined,
        guaranteeCardId2: undefined,
        guaranteePic2: undefined,
        guaranteeCompanyName2: undefined,
        guaranteeCompanyPhone2: undefined,
        guaranteeCompanyAddress2: undefined,
        applyEmployeeCode: "请选择业务员",
        dealerCode: "请选择车行",
        remark: undefined,
        contractNo: undefined,
        autoType: 1,
        autoBrands: undefined,
        autoModel: undefined,
        autoVinCode: undefined,
        autoInsurance: 0,
        autoPrice: undefined,
        assessPrice: undefined,
        loadBankCode: undefined,
        signedLoadMoney: undefined,
        loadMoney: undefined,
        loadScale: undefined,
        firstMoney: undefined,
        firstScale: undefined,
        periodsId: undefined,
        moneyPerMonth: undefined,
        signedApr: undefined,
        bankApr: undefined,
        interest: undefined,
        repayMoney: undefined,
        repayFirstMonth: undefined,
        signedFirstScale: undefined,
        signedFirstMoney: undefined,
        applyLoadMoney: undefined,

        bankCardCode: undefined,
        companyAddress: undefined,
        telPhone: undefined,
        qqCode: undefined,
        email: undefined,
        incomeInMonth: undefined,
        workYear: undefined,
        diploma: undefined,
        profession: undefined,
        companyName: undefined,
        guaranteeSocialRelation: undefined,
        guaranteeTelPhone: undefined,
        guaranteeAddress: undefined,
        guaranteeSocialRelation2: undefined,
        guaranteeTelPhone2: undefined,
        guaranteeAddress2: undefined,
        haveCommonBorrower: 0,
        commmonBorrowerRealName: undefined,
        commmonBorrowerSocialRelation: undefined,
        commmonBorrowerMobilePhone: undefined,
        commmonBorrowerCardId: undefined,
        commmonBorrowerTelPhone: undefined,
        commmonBorrowerCompanyAddress: undefined,
        commmonBorrowerAddress: undefined,
        haveFirstContact: 0,
        contactRealName: undefined,
        contactSocialRelation: undefined,
        contactMobilePhone: undefined,
        contactCardId: undefined,
        haveSecondContact: 0,
        contactRealName2: undefined,
        contactSocialRelation2: undefined,
        contactMobilePhone2: undefined,
        contactCardId2: undefined,
        isNewEnergyCar: 0,


        employeeLists: [],
        dealerLists: [],
        loadBankCodeLists: [],
        isEditing: false,
        startValue: null,
        endValue: null,
        data: [],
        pagination: {},
        loading: false,
        selectedRowKeys: [],
        //upyun field
        upyunParam: {policy: '', authorization: ''},
        policy: '',
        authorization: '',
        upyunAction:upyun_action,
        upyunLinkDomain:upyun_domain,
        //upload field
        previewVisible: false,
        previewImage: '',
        cardFrontPicList: [],
        cardBackPicList: [],
        authorizedPicList: [],
        signAuthorizedPicList: [],
        creditUrlList: [],
        spousePicList: [],
        guaranteePicList: [],
        guaranteePic2List: [],
    };

    constructor(props) {
        super(props);
        this.rotateVal = 0;
        this.disabledStartDate = this.disabledStartDate.bind(this);
        this.disabledEndDate = this.disabledEndDate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    };

    disabledStartDate(startValue) {
        if (!startValue || !this.state.endValue) {
            return false;
        }
        return startValue.toDate().getTime() >= this.state.endValue.toDate().getTime();
    };

    disabledEndDate(endValue) {
        if (!endValue || !this.state.startValue) {
            return false;
        }
        return endValue.toDate().getTime() <= this.state.startValue.toDate().getTime();
    };

    //普通字段输入更改state
    onChange(field, e) {
        let valStr = e.target.value;
        if(field == 'autoType') {
            this.setState({
                autoPrice: undefined,
                assessPrice: undefined
            })
        };
        this.setState({
            [field]: valStr,
        }, () => {
            this.toCaculator([field]);
        });
    };

    //select选择option更改state
    onChangeSelect(field, value) {
        console.log(value);
        this.setState({
            [field]: value,
        }, () => {
            this.toCaculator([field]);
        });

        console.log(field, 'change', value);
    };

    //选择出生日期
    onChangeBirthday = (value, dateString) => {
        this.setState({
            birthday: dateString,
        }, () => {
            console.log(this.state.birthday)
        });
    };
    //选择身份证有效期
    onChangeCardDate = (value, dateString) => {
        this.setState({
            cardDate: dateString
        }, () => {
            console.log(this.state.cardDate)
        });
    };
    //选择身份证有效期开始时间
    onChangeCardStart = (value, dateString)=> {
        this.setState({
            cardStartDate: dateString,
            cardDate: [dateString, this.state.cardEndDate]
        }, ()=> {
            console.log(this.state.cardStartDate)
        });
    };
    //选择身份证有效期结束时间
    onChangeCardEnd = (value, dateString)=> {
        this.setState({
            cardEndDate: dateString,
            cardDate: [this.state.cardStartDate, dateString]
        }, ()=> {
            console.log(this.state.cardEndDate)
        });
    };

    //自动计算
    toCaculator = (obj) => {
        if (obj == "autoPrice" || obj == "assessPrice" || obj == "loadMoney" || obj == "signedApr" || obj == "bankApr" || obj == "periodsId" || obj == "loadBankCode") {
            let formData = this.state;
            let autoPrice = formData.autoType==0 ? formData.autoPrice : formData.assessPrice,
                loadMoney = formData.loadMoney,
                signedApr = formData.signedApr,
                bankApr = formData.bankApr,
                periodsId = formData.periodsId,
                loadBankCode = formData.loadBankCode;
            console.log(autoPrice, loadMoney, signedApr, bankApr, periodsId, loadBankCode);
            if (autoPrice != undefined && loadMoney != undefined && signedApr != undefined && bankApr != undefined && periodsId != undefined && loadBankCode != undefined) {
                ajax.post("/admin/loanInfo/caculator", {
                    autoPrice: autoPrice,
                    loadMoney: loadMoney,
                    signedApr: signedApr,
                    bankApr: bankApr,
                    periodsId: periodsId,
                    loadBankCode: loadBankCode
                })
                    .then(response => {
                        console.log(response);
                        if (response.code == "0") {
                            var data = response.data;


                            this.setState({
                                applyLoadMoney: data.applyLoadMoney,
                                interest: data.interest,
                                loadScale: data.loadScale,
                                signedFirstScale: data.signedFirstScale,
                                signedFirstMoney: data.signedFirstMoney,
                                signedLoadMoney: data.signedLoadMoney,
                                firstMoney: data.firstMoney,
                                firstScale: data.firstScale,
                                moneyPerMonth: data.moneyPerMonth,
                            }, () => {

                            })
                            this.props.form.setFieldsValue({
                                applyLoadMoney: data.applyLoadMoney,
                                interest: data.interest,
                                loadScale: data.loadScale,
                                signedFirstScale: data.signedFirstScale,
                                signedFirstMoney: data.signedFirstMoney,
                                signedLoadMoney: data.signedLoadMoney,
                                firstMoney: data.firstMoney,
                                firstScale: data.firstScale,
                                moneyPerMonth: data.moneyPerMonth,
                            })
                        }else{
                            if(response.code != '-1'){
                                message.error("caculator"+response.msg);
                            }
                        }
                    })

                console.log("caculator final" + this.state.loadMoney);
            }
        }
    }
    //获取又拍云签名
    setPolicy = (e) => {
        var date = new Date();
        var month = date.getMonth() + 1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        var day = date.getDate();
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        var dateformatter = date.getFullYear() + month + day;
        var uuid1 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        var uuid2 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        var uuid = uuid1 + uuid2;
        ajax.post("/admin/upyun/policy", {saveKey: '/guarantee/' + dateformatter + "/" + uuid})
            .then(response => {
                if (response.code == '0') {
                    console.log("policy", response.data.policy);
                }
                var policy = response.data.policy;
                var authorization = response.data.authorization;
                this.setState({
                    upyunParam: {policy: policy, authorization: authorization},
                });
            });
    }

    componentDidMount = () => {
        this._isMounted = true;
        //如果有订单号 则获取订单信息 进行显示  并且编辑
        this.setPolicy();
        let applyNo = this.state.applyNo;
        if (applyNo) {
            ajax.post("/admin/autoloanApply/info", {applyNo: this.props.params.id})
                .then(response => {
                    if (response.code == "0") {
                        var data = response.data;
                        var loanInfo = data.loanInfo;
                        var spousedata = data.spouse;
                        var firstGuaranteedata = data.firstGuarantee;
                        var secondGuaranteedata = data.secondGuarantee;
                        var commonBorrowerdata = data.commonBorrower;
                        var firstContactdata = data.firstContact;
                        var secondContact = data.secondContact;
                        console.log("婚姻情况：", data.isMarried);
                        var cardFrontPic = data.cardFrontPic;
                        var resultCardFrontPic = [];
                        if (cardFrontPic) {
                            let {uid, status, name, url, typeId} = {
                                uid: 0,
                                status: 'done',
                                name: '其他',
                                url: cardFrontPic,
                                typeId: -1
                            };
                            resultCardFrontPic.push({uid, status, name, url, typeId});
                        }

                        var cardBackPic = data.cardBackPic;
                        var resultCardBackPic = [];
                        if (cardBackPic) {
                            let {uid, status, name, url, typeId} = {
                                uid: 0,
                                status: 'done',
                                name: '其他',
                                url: cardBackPic,
                                typeId: -1
                            };
                            resultCardBackPic.push({uid, status, name, url, typeId});
                        }

                        var authorizedPic = data.authorizedPic;
                        var resultAuthorizedPic = [];
                        if (authorizedPic) {
                            let {uid, status, name, url, typeId} = {
                                uid: 0,
                                status: 'done',
                                name: '其他',
                                url: authorizedPic,
                                typeId: -1
                            };
                            resultAuthorizedPic.push({uid, status, name, url, typeId});
                        }

                        var signAuthorizedPic = data.signAuthorizedPic;
                        var resultsignAuthorizedPic = [];
                        if (signAuthorizedPic) {
                            let {uid, status, name, url, typeId} = {
                                uid: 0,
                                status: 'done',
                                name: '其他',
                                url: signAuthorizedPic,
                                typeId: -1
                            };
                            resultsignAuthorizedPic.push({uid, status, name, url, typeId});
                        }

                        var creditUrl = data.creditUrl;
                        var resultCreditUrl = [];
                        if (creditUrl) {
                            for (var i = 0; i < creditUrl.length; i++) {
                                let {uid, status, name, url, typeId} = {
                                    uid: i,
                                    status: 'done',
                                    name: '其他',
                                    url: creditUrl[i],
                                    typeId: -1
                                };
                                resultCreditUrl.push({uid, status, name, url, typeId});
                            }
                        }


                        var spousePic ='';
                        if(spousedata.picture) {
                           spousePic= JSON.parse(spousedata.picture);
                        }
                        console.log(spousePic)
                        var resultspousePic = [];
                        if (spousePic) {
                            for (var i = 0; i < spousePic.length; i++) {
                                let {uid, status, name, url, typeId} = {
                                    uid: i,
                                    status: 'done',
                                    name: '其他',
                                    url: spousePic[i],
                                    typeId: -1
                                };
                                resultspousePic.push({uid, status, name, url, typeId});
                            }
                        }

                        var guaranteePic ='';
                        if(firstGuaranteedata.picture) {
                            guaranteePic=JSON.parse(firstGuaranteedata.picture);
                        }
                        var resultguaranteePic = [];
                        if (guaranteePic) {
                            for (var i = 0; i < guaranteePic.length; i++) {
                                let {uid, status, name, url, typeId} = {
                                    uid: i,
                                    status: 'done',
                                    name: '其他',
                                    url: guaranteePic[i],
                                    typeId: -1
                                };
                                resultguaranteePic.push({uid, status, name, url, typeId});
                            }
                        }
                        var guaranteePic2='';
                        if(secondGuaranteedata.picture) {
                            guaranteePic2 = JSON.parse(secondGuaranteedata.picture);
                        }
                        var resultguaranteePic2 = [];
                        if (guaranteePic2) {
                            for (var i = 0; i < guaranteePic2.length; i++) {
                                let {uid, status, name, url, typeId} = {
                                    uid: i,
                                    status: 'done',
                                    name: '其他',
                                    url: guaranteePic2[i],
                                    typeId: -1
                                };
                                resultguaranteePic2.push({uid, status, name, url, typeId});
                            }
                        }
                        var birthday = data.birthday;
                        console.log("birthday为：haha:", birthday);
                        if (!birthday) {
                            birthday = Moment("2018-08-08");
                            birthday=birthday.toDate().getTime();
                        }
                        if (loanInfo) {
                            this.setState({
                                contractNo: loanInfo.contractNo,
                                autoType: loanInfo.autoType,
                                autoBrands: loanInfo.autoBrands,
                                autoModel: loanInfo.autoModel,
                                autoVinCode: loanInfo.autoVinCode,
                                autoInsurance: loanInfo.autoInsurance == undefined ? '' : loanInfo.autoInsurance.toString(),
                                autoPrice: loanInfo.autoPrice,
                                assessPrice: loanInfo.assessPrice,
                                loadBankCode: loanInfo.loadBankCode,
                                signedLoadMoney: loanInfo.signedLoadMoney,
                                loadMoney: loanInfo.loadMoney,
                                loadScale: loanInfo.loadScale,
                                firstMoney: loanInfo.firstMoney,
                                firstScale: loanInfo.firstScale,
                                periodsId: loanInfo.periodsId,
                                moneyPerMonth: loanInfo.moneyPerMonth,
                                signedApr: loanInfo.signedApr,
                                bankApr: loanInfo.bankApr,
                                interest: loanInfo.interest,
                                repayMoney: loanInfo.repayMoney,
                                repayFirstMonth: loanInfo.repayFirstMonth,
                                signedFirstScale: loanInfo.signedFirstScale,
                                signedFirstMoney: loanInfo.signedFirstMoney,
                                applyLoadMoney: loanInfo.applyLoadMoney,
                                isNewEnergyCar: loanInfo.isNewEnergyCar
                            })
                        }
                        if (spousedata) {
                            this.setState({
                                spouseRealName: spousedata.realName,
                                spouseCardId: spousedata.cardId,
                                spouseMobilePhone: spousedata.mobilePhone,
                                spousePicList: resultspousePic,
                                spouseCompanyName: spousedata.companyName,
                                spouseCompanyPhone: spousedata.companyTel,
                                spouseCompanyAddress: spousedata.companyAddress
                            })
                        }
                        if (firstGuaranteedata) {
                            this.setState({
                                guaranteeRealName: firstGuaranteedata.realName,
                                guaranteeMobilePhone: firstGuaranteedata.mobilePhone,
                                guaranteeCardId: firstGuaranteedata.cardId,
                                guaranteePicList: resultguaranteePic,
                                guaranteeCompanyName: firstGuaranteedata.companyName,
                                guaranteeCompanyPhone: firstGuaranteedata.companyTel,
                                guaranteeCompanyAddress: firstGuaranteedata.companyAddress,
                                guaranteeSocialRelation: firstGuaranteedata.borrowerRelation,
                                guaranteeTelPhone: firstGuaranteedata.telPhone,
                                guaranteeAddress: firstGuaranteedata.address
                            })
                        }
                        if (secondGuaranteedata) {
                            this.setState({
                                guaranteeRealName2: secondGuaranteedata.realName,
                                guaranteeMobilePhone2: secondGuaranteedata.mobilePhone,
                                guaranteeCardId2: secondGuaranteedata.cardId,
                                guaranteePic2List: resultguaranteePic2,
                                guaranteeCompanyName2: secondGuaranteedata.companyName,
                                guaranteeCompanyPhone2: secondGuaranteedata.companyTel,
                                guaranteeCompanyAddress2: secondGuaranteedata.companyAddress,
                                guaranteeSocialRelation2: secondGuaranteedata.borrowerRelation,
                                guaranteeTelPhone2: secondGuaranteedata.telPhone,
                                guaranteeAddress2: secondGuaranteedata.address
                            })
                        }
                        if (commonBorrowerdata) {
                            this.setState({
                                commmonBorrowerRealName: commonBorrowerdata.realName,
                                commmonBorrowerSocialRelation: commonBorrowerdata.borrowerRelation,
                                commmonBorrowerMobilePhone: commonBorrowerdata.mobilePhone,
                                commmonBorrowerCardId: commonBorrowerdata.cardId,
                                commmonBorrowerTelPhone: commonBorrowerdata.telPhone,
                                commmonBorrowerCompanyAddress: commonBorrowerdata.companyAddress,
                                commmonBorrowerAddress: commonBorrowerdata.address
                            })
                        }
                        if (firstContactdata) {
                            this.setState({
                                contactRealName: firstContactdata.realName,
                                contactSocialRelation: firstContactdata.borrowerRelation,
                                contactMobilePhone: firstContactdata.mobilePhone,
                                contactCardId: firstContactdata.cardId
                            })
                        }
                        if (secondContact) {
                            this.setState({
                                contactRealName2: secondContact.realName,
                                contactSocialRelation2: secondContact.borrowerRelation,
                                contactMobilePhone2: secondContact.mobilePhone,
                                contactCardId2: secondContact.cardId
                            })
                        }
                        this.setState({
                            realName: data.realName,
                            sex: data.sex,
                            birthday: birthday,
                            mobilePhone: data.mobilePhone,
                            cardId: data.cardId,
                            permanentAddress: data.permanentAddress,
                            address: data.address,
                            provinceId: data.provinceId,
                            cityId: data.cityId,
                            areaId: data.areaId,
                            cardDate: data.cardDate,
                            cardStartDate: data.cardStartDate,
                            cardEndDate: data.cardEndDate,
                            cardFrontPicList: resultCardFrontPic,
                            cardBackPicList: resultCardBackPic,
                            authorizedPicList: resultAuthorizedPic,
                            signAuthorizedPicList: resultsignAuthorizedPic,
                            creditContent: data.creditContent,
                            creditUrlList: resultCreditUrl,
                            aboutCourt: data.aboutCourt,
                            isMarried: data.isMarried == undefined ? '' : data.isMarried.toString(),

                            // spouseRealName: data.spouseRealName,
                            // spouseCardId: data.spouseCardId,
                            // spouseMobilePhone: data.spouseMobilePhone,
                            // spousePicList: resultspousePic,
                            // spouseCompanyName: data.spouseCompanyName,
                            // spouseCompanyPhone: data.spouseCompanyPhone,
                            // spouseCompanyAddress: data.spouseCompanyAddress,

                            haveGuarantee: data.haveGuarantee,
                            haveSecondGuarantee: data.haveSecondGuarantee,
                            // guaranteeRealName: data.guaranteeRealName,
                            // guaranteeMobilePhone: data.guaranteeMobilePhone,
                            // guaranteeCardId: data.guaranteeCardId,
                            // guaranteePicList: resultguaranteePic,
                            // guaranteeCompanyName: data.guaranteeCompanyName,
                            // guaranteeCompanyPhone: data.guaranteeCompanyPhone,
                            // guaranteeCompanyAddress: data.guaranteeCompanyAddress,
                            // guaranteeRealName2: data.guaranteeRealName2,
                            // guaranteeMobilePhone2: data.guaranteeMobilePhone2,
                            // guaranteeCardId2: data.guaranteeCardId2,
                            // guaranteePic2List: resultguaranteePic2,
                            // guaranteeCompanyName2: data.guaranteeCompanyName2,
                            // guaranteeCompanyPhone2: data.guaranteeCompanyPhone2,
                            // guaranteeCompanyAddress2: data.guaranteeCompanyAddress2,

                            applyEmployeeCode: data.applyEmployeeCode,
                            dealerCode: data.dealerCode,
                            remark: data.remark,
                            haveCommonBorrower: data.haveCommonBorrower,//newadd
                            bankCardCode: data.bankCardCode,
                            companyAddress: data.companyAddress,
                            telPhone: data.telPhone,
                            qqCode: data.qqCode,
                            email: data.email,
                            incomeInMonth: data.incomeInMonth,
                            workYear: data.workYear,
                            diploma: data.diploma,
                            profession: data.profession,
                            companyName: data.companyName,
                            haveFirstContact: data.haveFirstContact,
                            haveSecondContact: data.haveSecondContact,
                        });
                        console.log("婚姻状况final", data.isMarried);
                    } else {
                        console.log("info" + response.msg);
                        message.error(response.msg);
                    }
                });
        }

        //贷款银行列表
        ajax.post("/admin/loanBank/list", null)
            .then(response => {
                // console.log(response);
                if (response.code == "0") {
                    var data = response.data;
                    if (this._isMounted) {
                        this.setState({
                            loadBankCodeLists: data
                        })
                    }
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });

        //员工列表
        ajax.post("/admin/admin/getEmployee", null)
            .then(response => {
                console.log("员工列表：");
                console.log(response);
                // console.log(response);
                if (response.code == "0") {
                    var data = response.data;
                    if (this._isMounted) {
                        this.setState({
                            employeeLists: data
                        })
                    }
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });
        //车行列表
        ajax.post("/admin/autoDealer/getDealers", null)
            .then(response => {
                console.log("车行列表数据：");
                console.log(response);
                // console.log(response);
                if (response.code == "0") {
                    var data = response.data;
                    if (this._isMounted) {
                        this.setState({
                            dealerLists: data
                        })
                    }
                } else {
                    console.log("list" + response.msg);
                    message.error(response.msg);
                }
            });
    };

    componentWillUnmount() {
        this._isMounted = false
    }

    handleCancel = () => {
        this.setState({previewVisible: false});
        this.rotateVal = -90;
        this.rotateBigPic();
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleSuccessCardFrontPic = (e) => {
        if (e) {
            console.log("test response:", e);
            if (e.code == "200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid, status, name, url, typeId} = {
                    uid: e.time,
                    status: 'done',
                    name: '其他',
                    url: this.state.upyunLinkDomain + e.url,
                    typeId: -1
                };
                let cardFrontPicList = this.state.cardFrontPicList;
                cardFrontPicList.push({uid, status, name, url, typeId});
                this.setState({
                    cardFrontPicList: cardFrontPicList,
                });
            }
            this.setPolicy();
        }
    }

    handleChangeCardFrontPic = ({fileList}) => {
        console.log("filelist pic dddddd:", fileList);
        if (fileList.length < this.state.cardFrontPicList.length) {
            this.setState({
                cardFrontPicList: fileList,
            })
        }
    }

    handleSuccessCardBackPic = (e) => {
        if (e) {
            if (e.code == "200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid, status, name, url, typeId} = {
                    uid: e.time,
                    status: 'done',
                    name: '其他',
                    url: this.state.upyunLinkDomain + e.url,
                    typeId: -1
                };
                let cardFrontBackList = this.state.cardBackPicList;
                cardFrontBackList.push({uid, status, name, url, typeId});
                this.setState({
                    cardFrontBackList: cardFrontBackList,
                });
            }
            this.setPolicy();
        }
    }

    handleChangeCardBackPic = ({fileList}) => {
        if (fileList.length < this.state.cardBackPicList.length) {
            this.setState({
                cardBackPicList: fileList,
            })
        }
    }

    handleChangeAuthorizedPic = ({fileList}) => {
        if (fileList.length < this.state.authorizedPicList.length) {
            this.setState({
                authorizedPicList: fileList,
            })
        }
    }

    handleSuccessAuthorizedPic = (e) => {
        if (e) {
            if (e.code == "200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid, status, name, url, typeId} = {
                    uid: e.time,
                    status: 'done',
                    name: '其他',
                    url: this.state.upyunLinkDomain + e.url,
                    typeId: -1
                };
                let authorizedPicList = this.state.authorizedPicList;
                authorizedPicList.push({uid, status, name, url, typeId});
                this.setState({
                    authorizedPicList: authorizedPicList,
                });
            }
            this.setPolicy();
        }
    }

    handleChangeSignAuthorizedPic = ({fileList}) => {
        if (fileList.length < this.state.signAuthorizedPicList.length) {
            this.setState({
                signAuthorizedPicList: fileList,
            })
        }
    }

    handleSuccessSignAuthorizedPic = (e) => {
        if (e) {
            if (e.code == "200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid, status, name, url, typeId} = {
                    uid: e.time,
                    status: 'done',
                    name: '其他',
                    url: this.state.upyunLinkDomain + e.url,
                    typeId: -1
                };
                let signAuthorizedPicList = this.state.signAuthorizedPicList;
                signAuthorizedPicList.push({uid, status, name, url, typeId});
                this.setState({
                    signAuthorizedPicList: signAuthorizedPicList,
                });
            }
            this.setPolicy();
        }
    }

    handleChangeCreditUrl = ({fileList}) => {
        if (fileList.length < this.state.creditUrlList.length) {
            this.setState({
                creditUrlList: fileList,
            })
        }
    }

    handleSuccessCreditUrl = (e) => {
        if (e) {
            if (e.code == "200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid, status, name, url, typeId} = {
                    uid: e.time,
                    status: 'done',
                    name: '其他',
                    url: this.state.upyunLinkDomain + e.url,
                    typeId: -1
                };
                let creditUrlList = this.state.creditUrlList;
                creditUrlList.push({uid, status, name, url, typeId});
                this.setState({
                    creditUrlList: creditUrlList,
                });
            }
            this.setPolicy();
        }
    }

    handleChangeSpousePic = ({fileList}) => {
        if (fileList.length < this.state.spousePicList.length) {
            this.setState({
                spousePicList: fileList,
            })
        }
    }

    handleSuccessSpousePic = (e) => {
        if (e) {
            if (e.code == "200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid, status, name, url, typeId} = {
                    uid: e.time,
                    status: 'done',
                    name: '其他',
                    url: this.state.upyunLinkDomain + e.url,
                    typeId: -1
                };
                let spousePicList = this.state.spousePicList;
                spousePicList.push({uid, status, name, url, typeId});
                this.setState({
                    spousePicList: spousePicList,
                });
            }
            this.setPolicy();
        }
    }

    handleChangeGuaranteePic = ({fileList}) => {
        if (fileList.length < this.state.guaranteePicList.length) {
            this.setState({
                guaranteePicList: fileList,
            })
        }
    }

    handleSuccessGuaranteePic = (e) => {
        if (e) {
            if (e.code == "200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid, status, name, url, typeId} = {
                    uid: e.time,
                    status: 'done',
                    name: '其他',
                    url: this.state.upyunLinkDomain + e.url,
                    typeId: -1
                };
                let guaranteePicList = this.state.guaranteePicList;
                guaranteePicList.push({uid, status, name, url, typeId});
                this.setState({
                    guaranteePicList: guaranteePicList,
                });
            }
            this.setPolicy();
        }
    }

    handleChangeGuaranteePic2 = ({fileList}) => {
        if (fileList.length < this.state.guaranteePic2List.length) {
            this.setState({
                guaranteePic2List: fileList,
            })
        }
    }

    handleSuccessGuaranteePic2 = (e) => {
        if (e) {
            if (e.code == "200") {//这个地方是上传结束之后会调用的方法
                console.log("成功le：：：：");
                let {uid, status, name, url, typeId} = {
                    uid: e.time,
                    status: 'done',
                    name: '其他',
                    url: this.state.upyunLinkDomain + e.url,
                    typeId: -1
                };
                let guaranteePic2List = this.state.guaranteePic2List;
                guaranteePic2List.push({uid, status, name, url, typeId});
                this.setState({
                    guaranteePic2List: guaranteePic2List,
                });
            }
            this.setPolicy();
        }
    }

    //提交申请单
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.creditContent == undefined && this.state.creditUrlList.length == 0) {
                    message.error("请输入征信报告或上传征信照片！");
                }else if (this.state.loadMoney && this.state.autoType == "0" && ((this.state.autoPrice - 0) < (this.state.loadMoney - 0))) {
                    message.error("贷款金额必须小于车辆价格！");
                }else if (this.state.loadMoney && this.state.autoType == "0" && !this.state.autoPrice) {
                    message.error("贷款金额必须小于车辆价格！");
                }else if (this.state.loadMoney && this.state.autoType == "1" && (this.state.assessPrice - 0) < (this.state.loadMoney - 0)) {
                    message.error("贷款金额必须小于二手车评估价！");
                }else if (this.state.loadMoney && this.state.autoType == "1" && !this.state.assessPrice) {
                    message.error("贷款金额必须小于二手车评估价！");
                } else {
                    var creditUrl = [];
                    if (this.state.creditUrlList.length > 0) {
                        for (var i = 0; i < this.state.creditUrlList.length; i++) {
                            creditUrl.push(this.state.creditUrlList[i].url);
                        }
                    } else {
                        creditUrl = undefined;
                    }
                    var spousePicUrl = [];
                    if (this.state.spousePicList.length > 0) {
                        for (var i = 0; i < this.state.spousePicList.length; i++) {
                            spousePicUrl.push(this.state.spousePicList[i].url);
                        }
                    } else {
                        spousePicUrl = undefined;
                    }
                    var guaranteePicUrl = [];
                    if (this.state.guaranteePicList.length > 0) {
                        for (var i = 0; i < this.state.guaranteePicList.length; i++) {
                            guaranteePicUrl.push(this.state.guaranteePicList[i].url);
                        }
                    } else {
                        guaranteePicUrl = undefined;
                    }
                    var guaranteePic2Url = [];
                    if (this.state.guaranteePic2List.length > 0) {
                        for (var i = 0; i < this.state.guaranteePic2List.length; i++) {
                            guaranteePic2Url.push(this.state.guaranteePic2List[i].url);
                        }
                    } else {
                        guaranteePic2Url = undefined;
                    }
                    let data = {
                        applyNo: this.state.applyNo,
                        realName: this.state.realName,
                        sex: this.state.sex,
                        birthday: this.state.birthday,
                        mobilePhone: this.state.mobilePhone,
                        cardId: this.state.cardId,
                        address: this.state.address,
                        permanentAddress: this.state.permanentAddress,
                        provinceId: this.state.provinceId,
                        cityId: this.state.cityId,
                        areaId: this.state.areaId,
                        cardDate: this.state.cardDate,
                        cardStartDate: this.state.cardStartDate,
                        cardEndDate: this.state.cardEndDate,
                        cardFrontPic: this.state.cardFrontPicList.length > 0 ? this.state.cardFrontPicList[0].url : '',
                        cardBackPic: this.state.cardBackPicList.length > 0 ? this.state.cardBackPicList[0].url : '',
                        authorizedPic: this.state.authorizedPicList.length > 0 ? this.state.authorizedPicList[0].url : '',
                        signAuthorizedPic: this.state.signAuthorizedPicList.length > 0 ? this.state.signAuthorizedPicList[0].url : '',
                        creditContent: this.state.creditContent,
                        creditUrl: creditUrl,
                        aboutCourt: this.state.aboutCourt,
                        isMarried: this.state.isMarried,
                        spouseRealName: this.state.spouseRealName,
                        spouseCardId: this.state.spouseCardId,
                        spouseMobilePhone: this.state.spouseMobilePhone,
                        spousePic: spousePicUrl,
                        spouseCompanyName: this.state.spouseCompanyName,
                        spouseCompanyPhone: this.state.spouseCompanyPhone,
                        spouseCompanyAddress: this.state.spouseCompanyAddress,
                        haveGuarantee: this.state.haveGuarantee,
                        haveSecondGuarantee: this.state.haveSecondGuarantee,
                        guaranteeRealName: this.state.guaranteeRealName,
                        guaranteeMobilePhone: this.state.guaranteeMobilePhone,
                        guaranteeCardId: this.state.guaranteeCardId,
                        guaranteePic: guaranteePicUrl,
                        guaranteeCompanyName: this.state.guaranteeCompanyName,
                        guaranteeCompanyPhone: this.state.guaranteeCompanyPhone,
                        guaranteeCompanyAddress: this.state.guaranteeCompanyAddress,
                        guaranteeRealName2: this.state.guaranteeRealName2,
                        guaranteeMobilePhone2: this.state.guaranteeMobilePhone2,
                        guaranteeCardId2: this.state.guaranteeCardId2,
                        guaranteePic2: guaranteePic2Url,
                        guaranteeCompanyName2: this.state.guaranteeCompanyName2,
                        guaranteeCompanyPhone2: this.state.guaranteeCompanyPhone2,
                        guaranteeCompanyAddress2: this.state.guaranteeCompanyAddress2,
                        applyEmployeeCode: this.state.applyEmployeeCode,
                        dealerCode: this.state.dealerCode,
                        remark: this.state.remark,
                        contractNo: this.state.contractNo,
                        autoType: this.state.autoType,
                        autoBrands: this.state.autoBrands,
                        autoModel: this.state.autoModel,
                        autoVinCode: this.state.autoVinCode,
                        autoInsurance: this.state.autoInsurance,
                        autoPrice: this.state.autoPrice,
                        assessPrice: this.state.assessPrice,
                        loadBankCode: this.state.loadBankCode,
                        signedLoadMoney: this.state.signedLoadMoney,
                        loadMoney: this.state.loadMoney,
                        loadScale: this.state.loadScale,
                        firstMoney: this.state.firstMoney,
                        firstScale: this.state.firstScale,
                        periodsId: this.state.periodsId,
                        moneyPerMonth: this.state.moneyPerMonth,
                        signedApr: this.state.signedApr,
                        bankApr: this.state.bankApr,
                        interest: this.state.interest,
                        repayMoney: this.state.repayMoney,
                        repayFirstMonth: this.state.repayFirstMonth,
                        signedFirstScale: this.state.signedFirstScale,
                        signedFirstMoney: this.state.signedFirstMoney,
                        applyLoadMoney: this.state.applyLoadMoney,
                        bankCardCode: this.state.bankCardCode,//new_add
                        companyAddress: this.state.companyAddress,
                        telPhone: this.state.telPhone,
                        qqCode: this.state.qqCode,
                        email: this.state.email,
                        incomeInMonth: this.state.incomeInMonth,
                        workYear: this.state.workYear,
                        diploma: this.state.diploma,
                        profession: this.state.profession,
                        companyName: this.state.companyName,
                        guaranteeSocialRelation: this.state.guaranteeSocialRelation,
                        guaranteeTelPhone: this.state.guaranteeTelPhone,
                        guaranteeAddress: this.state.guaranteeAddress,
                        guaranteeSocialRelation2: this.state.guaranteeSocialRelation2,
                        guaranteeTelPhone2: this.state.guaranteeTelPhone2,
                        guaranteeAddress2: this.state.guaranteeAddress2,
                        haveCommonBorrower: this.state.haveCommonBorrower,
                        commmonBorrowerRealName: this.state.commmonBorrowerRealName,
                        commmonBorrowerSocialRelation: this.state.commmonBorrowerSocialRelation,
                        commmonBorrowerMobilePhone: this.state.commmonBorrowerMobilePhone,
                        commmonBorrowerCardId: this.state.commmonBorrowerCardId,
                        commmonBorrowerTelPhone: this.state.commmonBorrowerTelPhone,
                        commmonBorrowerCompanyAddress: this.state.commmonBorrowerCompanyAddress,
                        commmonBorrowerAddress: this.state.commmonBorrowerAddress,
                        haveFirstContact: this.state.haveFirstContact,
                        contactRealName: this.state.contactRealName,
                        contactSocialRelation: this.state.contactSocialRelation,
                        contactMobilePhone: this.state.contactMobilePhone,
                        contactCardId: this.state.contactCardId,
                        haveSecondContact: this.state.haveSecondContact,
                        contactRealName2: this.state.contactRealName2,
                        contactSocialRelation2: this.state.contactSocialRelation2,
                        contactMobilePhone2: this.state.contactMobilePhone2,
                        contactCardId2: this.state.contactCardId2,
                        isNewEnergyCar: this.state.isNewEnergyCar
                    };

                    let self  = this;
                    confirm({
                        title: '申请提交后不可修改，确定提交并进入审核?',
                        okText: "确认",
                        cancelText: "取消",
                        onOk() {
                            ajax.post("/admin/autoloanApply/createOrUpdate", data)
                            .then(response => {
                                console.log(response);
                                if (response.code == "0") {
                                    message.success("提交成功！");
                                    self.props.router.push('/newApplication/list');
                                } else {
                                    console.log("list" + response.msg);
                                    message.error(response.msg);
                                }
                            })
                        },
                        onCancel() {
                            console.log('Cancel');
                        },
                    });
                    // ajax.post("/admin/autoloanApply/createOrUpdate", data)
                    //     .then(response => {
                    //         console.log(response);
                    //         if (response.code == "0") {
                    //             message.success("提交成功！");
                    //             this.props.router.push('/newApplication/list');
                    //         } else {
                    //             console.log("list" + response.msg);
                    //             message.error(response.msg);
                    //         }
                    //     })
                }
            } else {
                message.error("输入信息有误！");
            }
        });
    };

    //保存申请单
    formSave = (e) => {
        e.preventDefault();
        if (this.state.realName =="") {
            message.error("请输入姓名！");
        } else if(this.state.cardId==undefined) {
            message.error("请输入身份证号码！")
        } else if(this.state.applyEmployeeCode=="请选择业务员") {
            message.error("请选择业务员！")
        }else if (this.state.loadMoney && this.state.autoType == "0" && ((this.state.autoPrice - 0) < (this.state.loadMoney - 0))) {
            message.error("贷款金额必须小于车辆价格！");
        }else if (this.state.loadMoney && this.state.autoType == "0" && !this.state.autoPrice) {
            message.error("贷款金额必须小于车辆价格！");
        }else if (this.state.loadMoney && this.state.autoType == "1" && (this.state.assessPrice - 0) < (this.state.loadMoney - 0)) {
            message.error("贷款金额必须小于二手车评估价！");
        }else if (this.state.loadMoney && this.state.autoType == "1" && !this.state.assessPrice) {
            message.error("贷款金额必须小于二手车评估价！");
        } else {
            var creditUrl = [];
            if (this.state.creditUrlList.length > 0) {
                for (var i = 0; i < this.state.creditUrlList.length; i++) {
                    creditUrl.push(this.state.creditUrlList[i].url);
                }
            } else {
                creditUrl = undefined;
            }
            var spousePicUrl = [];
            if (this.state.spousePicList.length > 0) {
                for (var i = 0; i < this.state.spousePicList.length; i++) {
                    spousePicUrl.push(this.state.spousePicList[i].url);
                }
            } else {
                spousePicUrl = undefined;
            }
            var guaranteePicUrl = [];
            if (this.state.guaranteePicList.length > 0) {
                for (var i = 0; i < this.state.guaranteePicList.length; i++) {
                    guaranteePicUrl.push(this.state.guaranteePicList[i].url);
                }
            } else {
                guaranteePicUrl = undefined;
            }
            var guaranteePic2Url = [];
            if (this.state.guaranteePic2List.length > 0) {
                for (var i = 0; i < this.state.guaranteePic2List.length; i++) {
                    guaranteePic2Url.push(this.state.guaranteePic2List[i].url);
                }
            } else {
                guaranteePic2Url = undefined;
            }
            let data = {
                applyNo: this.state.applyNo,
                realName: this.state.realName,
                sex: this.state.sex,
                birthday: this.state.birthday.toString(),
                mobilePhone: this.state.mobilePhone,
                cardId: this.state.cardId,
                address: this.state.address,
                permanentAddress: this.state.permanentAddress,
                provinceId: this.state.provinceId,
                cityId: this.state.cityId,
                areaId: this.state.areaId,
                cardDate: this.state.cardDate,
                cardStartDate: this.state.cardStartDate,
                cardEndDate: this.state.cardEndDate,
                cardFrontPic: this.state.cardFrontPicList.length > 0 ? this.state.cardFrontPicList[0].url : '',
                cardBackPic: this.state.cardBackPicList.length > 0 ? this.state.cardBackPicList[0].url : '',
                authorizedPic: this.state.authorizedPicList.length > 0 ? this.state.authorizedPicList[0].url : '',
                signAuthorizedPic: this.state.signAuthorizedPicList.length > 0 ? this.state.signAuthorizedPicList[0].url : '',
                creditContent: this.state.creditContent,
                creditUrl: creditUrl,
                aboutCourt: this.state.aboutCourt,
                isMarried: this.state.isMarried,
                spouseRealName: this.state.spouseRealName,
                spouseCardId: this.state.spouseCardId,
                spouseMobilePhone: this.state.spouseMobilePhone,
                spousePic: spousePicUrl,
                spouseCompanyName: this.state.spouseCompanyName,
                spouseCompanyPhone: this.state.spouseCompanyPhone,
                spouseCompanyAddress: this.state.spouseCompanyAddress,
                haveGuarantee: this.state.haveGuarantee,
                haveSecondGuarantee: this.state.haveSecondGuarantee,
                guaranteeRealName: this.state.guaranteeRealName,
                guaranteeMobilePhone: this.state.guaranteeMobilePhone,
                guaranteeCardId: this.state.guaranteeCardId,
                guaranteePic: guaranteePicUrl,
                guaranteeCompanyName: this.state.guaranteeCompanyName,
                guaranteeCompanyPhone: this.state.guaranteeCompanyPhone,
                guaranteeCompanyAddress: this.state.guaranteeCompanyAddress,
                guaranteeRealName2: this.state.guaranteeRealName2,
                guaranteeMobilePhone2: this.state.guaranteeMobilePhone2,
                guaranteeCardId2: this.state.guaranteeCardId2,
                guaranteePic2: guaranteePic2Url,
                guaranteeCompanyName2: this.state.guaranteeCompanyName2,
                guaranteeCompanyPhone2: this.state.guaranteeCompanyPhone2,
                guaranteeCompanyAddress2: this.state.guaranteeCompanyAddress2,
                applyEmployeeCode: this.state.applyEmployeeCode,
                dealerCode: this.state.dealerCode,
                remark: this.state.remark,
                contractNo: this.state.contractNo,
                autoType: this.state.autoType,
                autoBrands: this.state.autoBrands,
                autoModel: this.state.autoModel,
                autoVinCode: this.state.autoVinCode,
                autoInsurance: this.state.autoInsurance,
                autoPrice: this.state.autoPrice,
                assessPrice: this.state.assessPrice,
                loadBankCode: this.state.loadBankCode,
                signedLoadMoney: this.state.signedLoadMoney,
                loadMoney: this.state.loadMoney,
                loadScale: this.state.loadScale,
                firstMoney: this.state.firstMoney,
                firstScale: this.state.firstScale,
                periodsId: this.state.periodsId,
                moneyPerMonth: this.state.moneyPerMonth,
                signedApr: this.state.signedApr,
                bankApr: this.state.bankApr,
                interest: this.state.interest,
                repayMoney: this.state.repayMoney,
                repayFirstMonth: this.state.repayFirstMonth,
                signedFirstScale: this.state.signedFirstScale,
                signedFirstMoney: this.state.signedFirstMoney,
                applyLoadMoney: this.state.applyLoadMoney,
                bankCardCode: this.state.bankCardCode,//new_add
                companyAddress: this.state.companyAddress,
                telPhone: this.state.telPhone,
                qqCode: this.state.qqCode,
                email: this.state.email,
                incomeInMonth: this.state.incomeInMonth,
                workYear: this.state.workYear,
                diploma: this.state.diploma,
                profession: this.state.profession,
                companyName: this.state.companyName,
                guaranteeSocialRelation: this.state.guaranteeSocialRelation,
                guaranteeTelPhone: this.state.guaranteeTelPhone,
                guaranteeAddress: this.state.guaranteeAddress,
                guaranteeSocialRelation2: this.state.guaranteeSocialRelation2,
                guaranteeTelPhone2: this.state.guaranteeTelPhone2,
                guaranteeAddress2: this.state.guaranteeAddress2,
                haveCommonBorrower: this.state.haveCommonBorrower,
                commmonBorrowerRealName: this.state.commmonBorrowerRealName,
                commmonBorrowerSocialRelation: this.state.commmonBorrowerSocialRelation,
                commmonBorrowerMobilePhone: this.state.commmonBorrowerMobilePhone,
                commmonBorrowerCardId: this.state.commmonBorrowerCardId,
                commmonBorrowerTelPhone: this.state.commmonBorrowerTelPhone,
                commmonBorrowerCompanyAddress: this.state.commmonBorrowerCompanyAddress,
                commmonBorrowerAddress: this.state.commmonBorrowerAddress,
                haveFirstContact: this.state.haveFirstContact,
                contactRealName: this.state.contactRealName,
                contactSocialRelation: this.state.contactSocialRelation,
                contactMobilePhone: this.state.contactMobilePhone,
                contactCardId: this.state.contactCardId,
                haveSecondContact: this.state.haveSecondContact,
                contactRealName2: this.state.contactRealName2,
                contactSocialRelation2: this.state.contactSocialRelation2,
                contactMobilePhone2: this.state.contactMobilePhone2,
                contactCardId2: this.state.contactCardId2,
                isNewEnergyCar: this.state.isNewEnergyCar
            };
            ajax.post("/admin/autoloanApply/saveOrUpdate", data)
                .then(response => {
                    console.log(response);
                    if (response.code == "0") {
                        // var data=response.data;
                        message.success("保存成功！");
                        this.props.router.push('/newApplication/list');

                    } else {
                        console.log("list" + response.msg);
                        message.error(response.msg);
                    }
                })
            }
        };

    //取消
    cancel_form = () => {
        let self  = this;
        confirm({
            title: '本页面还没有保存，确定取消？',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                self.props.router.push('/newApplication/list')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    //撤销申请单
    formRevoke = (e) => {
        console.log(this.state.cardDate);
        e.preventDefault();
        let applyNo=this.state.applyNo;
        if(applyNo){
            let data = {applyNo: applyNo,};
            let self  = this;
            confirm({
                title: '确定撤销申请?',
                okText: "确认",
                cancelText: "取消",
                onOk() {
                    ajax.post("/admin/autoloanApply/del", data)
                    .then(response => {
                        console.log(response);
                        if (response.code == "0") {
                            // var data=response.data;
                            self.props.router.push("/newApplication/list");
                        } else {
                            console.log("list" + response.msg);
                            message.error(response.msg);
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
            // ajax.post("/admin/autoloanApply/del", data)
            //     .then(response => {
            //         console.log(response);
            //         if (response.code == "0") {
            //             // var data=response.data;
            //             this.props.router.push("/newApplication/list");
            //         } else {
            //             console.log("list" + response.msg);
            //             message.error(response.msg);
            //         }
            //     })
        }else{
            message.error("该订单不能进行撤销操作！");
        }
    };

    rotateBigPic=()=>{
        let bigPicDom = this.refs.bigPicDom;
        this.rotateVal = (this.rotateVal+90)%360;
        bigPicDom.style.transform = 'rotate('+this.rotateVal+'deg)';
    }

    handleRotateIcon=(displayState)=>{
        let rotateBtnDom = document.getElementById('rotateBtnDom');
        rotateBtnDom.style.display = displayState;
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formData = this.state;
        const cardDate  = this.state.cardDate || {};
        const { previewVisible, previewImage} = this.state;
        const upyunParam=this.state.upyunParam;
        const headers={"X-Requested-With": null};
        const cardFrontPicButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">身份证正面</div>
            </div>
        );
        const cardBackPicButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">身份证国徽面</div>
            </div>
        );
        const authorizedPicButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">授权书照片</div>
            </div>
        );
        const signAuthorizedPicButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">手持或签署授权书照片</div>
            </div>
        );

        const spousePicButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">配偶照片</div>
            </div>
        );

        const creditUrlButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">征信照片</div>
            </div>
        );

        const guaranteePicButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">担保人1照片</div>
            </div>
        );

        const guaranteePic2Button = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">担保人2照片</div>
            </div>
        );

        let employeeLists = this.state.employeeLists,
            dealerLists = this.state.dealerLists,
            loadBankCodeLists = this.state.loadBankCodeLists,
            workingLife = [],
            education = [],
            socialRelations = [],
            employeeOption = [],
            dealerOption = [],
            loadBankCodeOption = [];
        for (let i = 0; i < loadBankCodeLists.length; i++) {
            loadBankCodeOption.push(<Option key={loadBankCodeLists[i].code} value={loadBankCodeLists[i].code} >{loadBankCodeLists[i].name}</Option>);
        }
        for (let i = 0; i < employeeLists.length; i++) {
            employeeOption.push(<Option key={employeeLists[i].userCode} value={employeeLists[i].userCode} >{employeeLists[i].realName}</Option>);
        }
        for (let i = 0; i < dealerLists.length; i++) {
            dealerOption.push(<Option key={dealerLists[i].code} value={dealerLists[i].code} >{dealerLists[i].name}</Option>);
        }
        socialRelations = [
            <Option key="coworker" value="coworker">同事</Option>,
            <Option key="mother" value="mother">母亲</Option>,
            <Option key="father" value="father">父亲</Option>,
            <Option key="other_relative" value="other_relative">其他亲属</Option>,
            <Option key="friend" value="friend">朋友</Option>,
            <Option key="spouse" value="spouse">配偶</Option>,
            <Option key="child" value="child">子女</Option>,
            <Option key="others" value="others">其他</Option>
        ]
        education = [
            <Option key="PRE_HIGH_SCHOOL" value="PRE_HIGH_SCHOOL">高中以下</Option>,
            <Option key="HIGH_SCHOOL" value="HIGH_SCHOOL">高中/中专</Option>,
            <Option key="JUNIOR_COLLEGE" value="JUNIOR_COLLEGE">大专</Option>,
            <Option key="UNDER_GRADUATE" value="UNDER_GRADUATE">本科</Option>,
            <Option key="POST_GRADUATE" value="POST_GRADUATE">研究生</Option>
        ]
        workingLife = [
            <Option key="1年以下 " value="1年以下 ">1年以下</Option>,
            <Option key="1年" value="1年">1年</Option>,
            <Option key="2年" value="2年">2年</Option>,
            <Option key="3-4年" value="3-4年">3-4年</Option>,
            <Option key="5-7年" value="5-7年">5-7年</Option>,
            <Option key="8-9年" value="8-9年">8-9年</Option>,
            <Option key="10年以上" value="10年以上">10年以上</Option>
        ]
        var _this = this
        $(function () {
            //侧导航滚动点亮
            if(_this.state.render_count == 1){
                _this.setState({
                    render_count: 2
                })
                $("#infoBtn").addClass("active");//默认第一个浮动侧导航点亮
                $("#infoBtn").rollTo({
                    warpBody: '.ant-layout-content',
                    oFinish: "#info", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: -120,
                    fnAdditional: "" //追加方法
                });
                $("#borrowInfoBtn").rollTo({
                    warpBody: '.ant-layout-content',
                    oFinish: "#borrowInfo", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: -200,
                    fnAdditional: "" //追加方法
                });
                $("#orderInfoBtn").rollTo({
                    warpBody: '.ant-layout-content',
                    oFinish: "#orderInfo", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: -700,
                    fnAdditional: "" //追加方法
                });
                $("#otherInfoBtn").rollTo({
                    warpBody: '.ant-layout-content',
                    oFinish: "#otherInfo", //要滚动到的元素
                    sSpeed: "300",  //滚动速度
                    bMonitor: true, //是否楼层监听
                    sClass: "active", //楼层监听时需要添加的样式
                    iBias: -680,
                    fnAdditional: "" //追加方法
                });
            }
            
        });

        return (
            <div className="newApplication" style={{position: "relative"}}>
                <Breadcrumb style={{padding: '16px 28px', background: "#fff", borderBottom: "1px solid #E8E8E8"}}>
                    <Breadcrumb.Item>编辑申请单</Breadcrumb.Item>
                </Breadcrumb>
                <div id="mainCont" style={{margin: '24px', padding: '0 20px 20px', background: '#fff', minHeight: 780}}>
                    {/*查询选项*/}
                    <Form className="editForm" horizontal="true" onSubmit={this.handleSubmit}>
                        {/*基本信息*/}
                        <div id="info">
                            <h2 style={{marginTop: 0}}>基本信息</h2>
                            <FormItem
                                label="姓名："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("realName", {
                                    initialValue: formData.realName,
                                    rules: [
                                        {required: true, message: "请输入用户名/手机号！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="realName" name="realName"
                                           onChange={this.onChange.bind(this, 'realName')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="性别："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("sex", {
                                    initialValue: formData.sex + "" || undefined,
                                    rules: [
                                        {required: true, message: "请选择性别！"}
                                    ]
                                })(
                                    <RadioGroup name="sex" onChange={this.onChange.bind(this, 'sex')}>
                                        <Radio value="1">男</Radio>
                                        <Radio value="0">女</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem
                                id="birthday"
                                label="出生年月："
                                className="dataInput"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("birthday", {
                                    initialValue:Moment(formData.birthday),
                                    rules: [
                                        {required: true, message: "请选择出生年月！"}
                                    ]
                                })(
                                    <DatePicker placeholder="请选择出生年月" onChange={this.onChangeBirthday} />
                                )}
                            </FormItem>
                            <FormItem
                                label="手机号："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("mobilePhone", {
                                    initialValue: formData.mobilePhone,
                                    rules: [
                                        {required: true, pattern:"^1[3|4|5|7|8|9]\\d{9}$", message: "请输入正确的手机号！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="mobilePhone"
                                           placeholder="请输入手机号码" onChange={this.onChange.bind(this, 'mobilePhone')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="银行卡号："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("bankCardCode", {
                                    initialValue: formData.bankCardCode,
                                    rules: [
                                        {required: true, message: "请输入银行卡号！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="bankCardCode"
                                           placeholder="请输入银行卡号" onChange={this.onChange.bind(this, 'bankCardCode')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="身份证号码："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("cardId", {
                                    initialValue:formData.cardId,
                                    rules: [
                                        {required: true,
                                            pattern:"(^\\d{6}(18|19|20)\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|[xX])$|^\\d{6}\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}$)",
                                            message: "请输入正确的身份证号码！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="cardId" name="cardId"
                                           placeholder="请输入身份证号码" onChange={this.onChange.bind(this, 'cardId')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="身份证日期："
                                className="dateInput"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("cardStartDate", {
                                    initialValue:formData.cardStartDate?Moment(formData.cardStartDate) : '',
                                    // initialValue: cardDate.length>0 ?[Moment(cardDate[0], dateFormat),Moment(cardDate[1], dateFormat)] : "",
                                    rules: [
                                        {required: true, message: '请选择身份证开始日期'}
                                    ]
                                })(
                                    <DatePicker onChange={this.onChangeCardStart} placeholder={['请选择身份证开始日期']} style={{textAlign: 'left'}} />
                                )}
                                {getFieldDecorator("cardEndDate", {
                                    initialValue:formData.cardEndDate ? Moment(formData.cardEndDate) : ''
                                })(
                                    <DatePicker onChange={this.onChangeCardEnd} placeholder={['请选择身份证结束日期(未选择表示长期)']} style={{textAlign: 'left'}} />
                                )}
                                
                            </FormItem>
                            <FormItem
                                label="户籍地址："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("permanentAddress", {
                                    initialValue: formData.permanentAddress,
                                    rules: [
                                        {required: true, message: "请输入户籍地址！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="permanentAddress" name="permanentAddress"
                                           placeholder="请输入户籍地址" onChange={this.onChange.bind(this, 'permanentAddress')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="居住地址："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("address", {
                                    initialValue: formData.address,
                                    rules: [
                                        {required: true, message: "请输入居住地址！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="address" name="address"
                                           placeholder="请输入居住地址" onChange={this.onChange.bind(this, 'address')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="工作单位地址"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("companyAddress", {
                                    initialValue: formData.companyAddress,
                                    rules: [
                                        {required: true, message: "请输入工作单位地址！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="companyAddress" name="companyAddress"
                                           placeholder="请输入工作单位地址" onChange={this.onChange.bind(this, 'companyAddress')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="座机"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("telPhone", {
                                    initialValue: formData.telPhone
                                })(
                                    <Input type="text" className="ant-form-text" id="telPhone" name="telPhone"
                                           placeholder="请输入座机(选填)" onChange={this.onChange.bind(this, 'telPhone')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="QQ"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("qqCode", {
                                    initialValue: formData.qqCode
                                })(
                                    <Input type="text" className="ant-form-text" id="qqCode" name="qqCode"
                                           placeholder="请输入QQ(选填)" onChange={this.onChange.bind(this, 'qqCode')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="邮箱"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("email", {
                                    initialValue: formData.email
                                })(
                                    <Input type="text" className="ant-form-text" id="email" name="email"
                                           placeholder="请输入邮箱(选填)" onChange={this.onChange.bind(this, 'email')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="月均收入"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("incomeInMonth", {
                                    initialValue: formData.incomeInMonth
                                })(
                                    <Input type="text" className="ant-form-text" id="incomeInMonth" name="incomeInMonth"
                                           placeholder="请输入月均收入(选填)" onChange={this.onChange.bind(this, 'incomeInMonth')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="工作时间"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("workYear", {
                                    initialValue: formData.workYear
                                })(
                                    <Select placeholder="请选择工作时间(选填)" name="workYear" onChange={this.onChangeSelect.bind(this, 'workYear')}>
                                        {workingLife}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="学历"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("diploma", {
                                    initialValue: formData.diploma
                                })(
                                    <Select placeholder="请选择学历(选填)" name="diploma" onChange={this.onChangeSelect.bind(this, 'diploma')}>
                                        {education}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="职业"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("profession", {
                                    initialValue: formData.profession
                                })(
                                    <Input type="text" className="ant-form-text" id="profession" name="profession"
                                           placeholder="请输入职业(选填)" onChange={this.onChange.bind(this, 'profession')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="工作单位"
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("companyName", {
                                    initialValue: formData.companyName
                                })(
                                    <Input type="text" className="ant-form-text" id="companyName" name="companyName"
                                           placeholder="请输入工作单位(选填)" onChange={this.onChange.bind(this, 'companyName')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="照片："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                required>
                                <div className="picContent clearfix">
                                    <Upload
                                        action={this.state.upyunAction}
                                        name="file"
                                        listType="picture-card"
                                        fileList={this.state.cardFrontPicList}
                                        onPreview={this.handlePreview}
                                        onSuccess={this.handleSuccessCardFrontPic}
                                        onChange={this.handleChangeCardFrontPic}
                                        data={upyunParam}
                                        headers={headers}
                                    >
                                        {this.state.cardFrontPicList.length >= 1 ? null : cardFrontPicButton}
                                    </Upload>
                                    <Upload
                                        action={this.state.upyunAction}
                                        name="file"
                                        listType="picture-card"
                                        fileList={this.state.cardBackPicList}
                                        onPreview={this.handlePreview}
                                        onSuccess={this.handleSuccessCardBackPic}
                                        onChange={this.handleChangeCardBackPic}
                                        data={upyunParam}
                                        headers={headers}
                                    >
                                        {this.state.cardBackPicList.length >= 1 ? null : cardBackPicButton}
                                    </Upload>
                                    <Upload
                                        action={this.state.upyunAction}
                                        name="file"
                                        listType="picture-card"
                                        fileList={this.state.authorizedPicList}
                                        onPreview={this.handlePreview}
                                        onSuccess={this.handleSuccessAuthorizedPic}
                                        onChange={this.handleChangeAuthorizedPic}
                                        data={upyunParam}
                                        headers={headers}
                                    >
                                        {this.state.authorizedPicList.length >= 1 ? null : authorizedPicButton}
                                    </Upload>
                                    <Upload
                                        action={this.state.upyunAction}
                                        name="file"
                                        listType="picture-card"
                                        fileList={this.state.signAuthorizedPicList}
                                        onPreview={this.handlePreview}
                                        onSuccess={this.handleSuccessSignAuthorizedPic}
                                        onChange={this.handleChangeSignAuthorizedPic}
                                        data={upyunParam}
                                        headers={headers}
                                    >
                                        {this.state.signAuthorizedPicList.length >= 1 ? null : signAuthorizedPicButton}
                                    </Upload>

                                    <Modal className="newEditModal" visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage}
                                             ref="bigPicDom"
                                             onMouseEnter={this.handleRotateIcon.bind(this, 'block')}
                                             onMouseLeave={this.handleRotateIcon.bind(this, 'none')} />
                                        <i className="rotateBtn" id="rotateBtnDom"
                                            onClick={this.rotateBigPic.bind(this)}
                                            onMouseEnter={this.handleRotateIcon.bind(this, 'block')}></i>
                                    </Modal>
                                </div>
                            </FormItem>
                            <FormItem
                                label="征信情况："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                            >
                                {getFieldDecorator("creditContent", {
                                    initialValue: formData.creditContent,
                                    rules: [
                                        {required: true, message: "请输入征信情况！"}
                                    ]
                                })(
                                    <textarea placeholder="请输入征信情况" className="ant-input" name="creditContent"
                                              id="creditContent" rows="3"
                                              onChange={this.onChange.bind(this, 'creditContent')}></textarea>
                                )}
                            </FormItem>
                            <FormItem
                                label="征信照片："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                            >
                                <div className="picContent clearfix cridtof">
                                    <Upload
                                        action={this.state.upyunAction}
                                        name="file"
                                        listType="picture-card"
                                        fileList={this.state.creditUrlList}
                                        onPreview={this.handlePreview}
                                        onSuccess={this.handleSuccessCreditUrl}
                                        onChange={this.handleChangeCreditUrl}
                                        data={upyunParam}
                                        headers={headers}
                                    >
                                        {this.state.creditUrlList.length >= 20 ? null :creditUrlButton }
                                    </Upload>
                                </div>
                            </FormItem>
                            <FormItem
                                label="法院情况："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("aboutCourt", {
                                    initialValue: formData.aboutCourt,
                                    rules: [
                                        {required: true, message: "请输入法院情况！"}
                                    ]
                                })(
                                    <textarea placeholder="请输入法院情况" className="ant-input" name="aboutCourt"
                                              id="aboutCourt" rows="3"
                                              onChange={this.onChange.bind(this, 'aboutCourt')}></textarea>
                                )}
                            </FormItem>
                            <FormItem
                                label="婚姻状况："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("isMarried", {
                                    initialValue: formData.isMarried + "" || undefined,
                                    rules: [
                                        {required: true, message: "请输入婚姻状况！"}
                                    ]
                                })(
                                    <RadioGroup name="isMarried" onChange={this.onChange.bind(this, 'isMarried')}>
                                        <Radio value="0" checked>未婚</Radio>
                                        <Radio value="1">已婚</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            {/*配偶信息*/}
                            <div style={{display: formData.isMarried == 1 ? 'block' : 'none'}}>
                            <FormItem
                                label="配偶姓名："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("spouseRealName", {
                                    initialValue: formData.spouseRealName,
                                    rules: [
                                        {required: this.state.isMarried == "1" ? true : false, message: "请输入配偶姓名！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="spouseRealName"
                                           name="spouseRealName" placeholder="请输入配偶姓名"
                                           onChange={this.onChange.bind(this, 'spouseRealName')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="配偶手机号："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("spouseMobilePhone", {
                                    initialValue: formData.spouseMobilePhone,
                                    rules: [
                                        {required: this.state.isMarried == "1" ? true : false,pattern:"^1[3|4|5|7|8|9]\\d{9}$", message: "请输入正确的配偶手机号！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text"
                                           name="spouseMobilePhone" placeholder="请输入配偶手机号"
                                           onChange={this.onChange.bind(this, 'spouseMobilePhone')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="配偶身份证号码："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("spouseCardId", {
                                    initialValue: formData.spouseCardId,
                                    rules: [
                                        {required: this.state.isMarried == "1" ? true : false,
                                            pattern:"(^\\d{6}(18|19|20)\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|[xX])$|^\\d{6}\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}$)",
                                            message: "请输入正确的配偶身份证号码！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="spouseCardId" name="spouseCardId"
                                           placeholder="请输入配偶身份证号码"
                                           onChange={this.onChange.bind(this, 'spouseCardId')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="配偶照片："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("spousePicList", {
                                    initialValue: formData.spousePicList,
                                    rules: [
                                        {required: this.state.isMarried == "1" ? true : false, message: "请上传配偶照片！"}
                                    ]
                                })(
                                    <div className="picContent clearfix cridtof">
                                        <Upload
                                            action={this.state.upyunAction}
                                            name="file"
                                            listType="picture-card"
                                            fileList={this.state.spousePicList}
                                            onPreview={this.handlePreview}
                                            onSuccess={this.handleSuccessSpousePic}
                                            onChange={this.handleChangeSpousePic}
                                            data={upyunParam}
                                            headers={headers}
                                        >
                                            {this.state.spousePicList.length >= 10 ? null :spousePicButton }
                                        </Upload>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem
                                label="配偶工作单位："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("spouseCompanyName", {
                                    initialValue: formData.spouseCompanyName,
                                })(
                                    <Input type="text" className="ant-form-text" id="spouseCompanyName"
                                           name="spouseCompanyName" placeholder="请输入配偶工作单位（选填）"
                                           onChange={this.onChange.bind(this, 'spouseCompanyName')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="配偶单位电话："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("spouseCompanyPhone", {
                                    initialValue: formData.spouseCompanyPhone,
                                })(
                                    <Input type="text" className="ant-form-text" id="spouseCompanyPhone"
                                           name="spouseCompanyPhone" placeholder="请输入配偶单位电话（选填）"
                                           onChange={this.onChange.bind(this, 'spouseCompanyPhone')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="配偶单位地址："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("spouseCompanyAddress", {
                                    initialValue: formData.spouseCompanyAddress,
                                })(
                                <Input type="text" className="ant-form-text" id="spouseCompanyAddress"
                                       name="spouseCompanyAddress" placeholder="请输入配偶单位地址（选填）"
                                       onChange={this.onChange.bind(this, 'spouseCompanyAddress')}/>)}
                            </FormItem>
                            </div>
                            <FormItem
                                label="担保人："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("haveGuarantee", {
                                    initialValue: formData.haveGuarantee + "" || undefined,
                                    rules: [
                                        {required: true, message: "请选择是否有担保人！"}
                                    ]
                                })(
                                    <RadioGroup name="haveGuarantee"
                                                onChange={this.onChange.bind(this, 'haveGuarantee')}>
                                        <Radio value="1">有</Radio>
                                        <Radio value="0">无</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            {/*担保人信息*/}
                            <div style={{display: formData.haveGuarantee == 1 ? 'block' : 'none'}}>
                            <FormItem
                                label="担保人姓名："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("guaranteeRealName", {
                                    initialValue: formData.guaranteeRealName,
                                    rules: [
                                        {required: this.state.haveGuarantee == "1" ? true : false, message: "请输入担保人姓名！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="guaranteeRealName"
                                           name="guaranteeRealName" placeholder="请输入担保人姓名"
                                           onChange={this.onChange.bind(this, 'guaranteeRealName')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="担保人社会关系："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("guaranteeSocialRelation", {
                                    initialValue: formData.guaranteeSocialRelation
                                })(
                                    <Select placeholder="请选择担保人社会关系(选填)" name="guaranteeSocialRelation" onChange={this.onChangeSelect.bind(this, 'guaranteeSocialRelation')}>
                                           {socialRelations}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="担保人手机号："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("guaranteeMobilePhone", {
                                    initialValue: formData.guaranteeMobilePhone,
                                    rules: [
                                        {
                                            required: this.state.haveGuarantee == "1" ? true : false,
                                            pattern:"^1[3|4|5|7|8|9]\\d{9}$",
                                            message: "请输入正确的担保人手机号！"
                                        }
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="guarantorPhone"
                                           name="guaranteeMobilePhone" placeholder="请输入担保人手机号"
                                           onChange={this.onChange.bind(this, 'guaranteeMobilePhone')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="担保人身份证号码："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                required>
                                {getFieldDecorator("guaranteeCardId", {
                                    initialValue: formData.guaranteeCardId,
                                    rules: [
                                        {
                                            required: this.state.haveGuarantee == "1" ? true : false,
                                            pattern:"(^\\d{6}(18|19|20)\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|[xX])$|^\\d{6}\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}$)",
                                            message: "请输入正确的担保人身份证号码！"
                                        }
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" id="guaranteeCardId"
                                           name="guaranteeCardId" placeholder="请输入担保人身份证号码"
                                           onChange={this.onChange.bind(this, 'guaranteeCardId')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="担保人座机："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                required>
                                {getFieldDecorator("guaranteeTelPhone", {
                                    initialValue: formData.guaranteeTelPhone
                                })(
                                    <Input type="text" className="ant-form-text" id="guaranteeTelPhone"
                                           name="guaranteeTelPhone" placeholder="请输入担保人座机(选填)"
                                           onChange={this.onChange.bind(this, 'guaranteeTelPhone')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="担保人地址："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                required>
                                {getFieldDecorator("guaranteeAddress", {
                                    initialValue: formData.guaranteeAddress
                                })(
                                    <Input type="text" className="ant-form-text" id="guaranteeAddress"
                                           name="guaranteeAddress" placeholder="请输入担保人地址(选填)"
                                           onChange={this.onChange.bind(this, 'guaranteeAddress')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="担保人照片："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("guaranteePicList", {
                                    initialValue: formData.guaranteePicList,
                                    rules: [
                                        {
                                            required: this.state.haveGuarantee == "1" ? true : false,
                                            message: "请上传担保人照片！"
                                        }
                                    ]
                                })(
                                    <div className="picContent clearfix cridtof">
                                        <Upload
                                            action={this.state.upyunAction}
                                            name="file"
                                            listType="picture-card"
                                            fileList={this.state.guaranteePicList}
                                            onPreview={this.handlePreview}
                                            onSuccess={this.handleSuccessGuaranteePic}
                                            onChange={this.handleChangeGuaranteePic}
                                            data={upyunParam}
                                            headers={headers}
                                        >
                                            {this.state.guaranteePicList.length >= 10 ? null :guaranteePicButton }
                                        </Upload>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem
                                label="担保人工作单位："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("guaranteeCompanyName", {
                                    initialValue: formData.guaranteeCompanyName
                                })(
                                    <Input type="text" className="ant-form-text" id="guaranteeCompanyName"
                                           name="guaranteeCompanyName" placeholder="请输入担保人工作单位（选填）"
                                           onChange={this.onChange.bind(this, 'guaranteeCompanyName')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="担保人单位电话："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("guaranteeCompanyPhone", {
                                    initialValue: formData.guaranteeCompanyPhone
                                })(
                                    <Input type="text" className="ant-form-text" id="guaranteeCompanyPhone"
                                           name="guaranteeCompanyPhone" placeholder="请输入担保人单位电话（选填）"
                                           onChange={this.onChange.bind(this, 'guaranteeCompanyPhone')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="担保人单位地址："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("guaranteeCompanyAddress", {
                                    initialValue: formData.guaranteeCompanyAddress
                                })(
                                    <Input type="text" className="ant-form-text" id="guaranteeCompanyAddress"
                                           name="guaranteeCompanyAddress" placeholder="请输入担保人单位地址（选填）"
                                           onChange={this.onChange.bind(this, 'guaranteeCompanyAddress')}/>
                                )}
                            </FormItem>
                            </div>
                            <FormItem
                                label="第二担保人："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("haveSecondGuarantee", {
                                    initialValue: formData.haveSecondGuarantee + "" || undefined
                                })(
                                    <RadioGroup name="haveSecondGuarantee" onChange={this.onChange.bind(this, 'haveSecondGuarantee')}>
                                        <Radio value="1">有</Radio>
                                        <Radio value="0">无</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            {/*第二担保人信息*/}
                            <div style={{display: formData.haveSecondGuarantee == 1 ? 'block' : 'none'}}>
                                <FormItem
                                    label="第二担保人姓名："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("guaranteeRealName2", {
                                        initialValue: formData.guaranteeRealName2,
                                        rules: [
                                            {
                                                required: this.state.haveSecondGuarantee == "1" ? true : false,
                                                message: "请输入第二担保人姓名！"
                                            }
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="guaranteeRealName2"
                                               name="guaranteeRealName2" placeholder="请输入第二担保人姓名"
                                               onChange={this.onChange.bind(this, 'guaranteeRealName2')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="第二担保人社会关系："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("guaranteeSocialRelation2", {
                                        initialValue: formData.guaranteeSocialRelation2
                                    })(
                                        <Select placeholder="请选择担保人社会关系(选填)" name="guaranteeSocialRelation2" onChange={this.onChangeSelect.bind(this, 'guaranteeSocialRelation2')}>
                                           {socialRelations}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="第二担保人手机号："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("guaranteeMobilePhone2", {
                                        initialValue: formData.guaranteeMobilePhone2,
                                        rules: [
                                            {
                                                required: this.state.haveSecondGuarantee == "1" ? true : false,
                                                pattern:"^1[3|4|5|7|8|9]\\d{9}$",
                                                message: "请输入正确的第二担保人手机号！"
                                            }
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="guaranteeMobilePhone2"
                                               name="guaranteeMobilePhone2" placeholder="请输入第二担保人手机号"
                                               onChange={this.onChange.bind(this, 'guaranteeMobilePhone2')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="第二担保人身份证号码："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}
                                    required>
                                    {getFieldDecorator("guaranteeCardId2", {
                                        initialValue: formData.guaranteeCardId2,
                                        rules: [
                                            {
                                                required: this.state.haveSecondGuarantee == "1" ? true : false,
                                                pattern:"(^\\d{6}(18|19|20)\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|[xX])$|^\\d{6}\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}$)",
                                                message: "请输入正确的第二担保人身份证号码！"
                                            }
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="guaranteeCardId2"
                                               name="guaranteeCardId2" placeholder="请输入第二担保人身份证号码"
                                               onChange={this.onChange.bind(this, 'guaranteeCardId2')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="第二担保人座机："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("guaranteeTelPhone2", {
                                        initialValue: formData.guaranteeTelPhone2
                                    })(
                                        <Input type="text" className="ant-form-text" id="guaranteeTelPhone2"
                                            name="guaranteeTelPhone2" placeholder="请输入担保人座机(选填)"
                                            onChange={this.onChange.bind(this, 'guaranteeTelPhone2')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="第二担保人地址："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("guaranteeAddress2", {
                                        initialValue: formData.guaranteeAddress2
                                    })(
                                        <Input type="text" className="ant-form-text" id="guaranteeAddress2"
                                            name="guaranteeAddress2" placeholder="请输入担保人地址(选填)"
                                            onChange={this.onChange.bind(this, 'guaranteeAddress2')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="第二担保人照片："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("guaranteePic2List", {
                                        initialValue: formData.guaranteePic2List,
                                        rules: [
                                            {
                                                required: this.state.haveSecondGuarantee == "1" ? true : false,
                                                message: "请上传第二担保人照片！"
                                            }
                                        ]
                                    })(
                                        <div className="picContent clearfix cridtof">
                                            <Upload
                                                action={this.state.upyunAction}
                                                name="file"
                                                listType="picture-card"
                                                fileList={this.state.guaranteePic2List}
                                                onPreview={this.handlePreview}
                                                onSuccess={this.handleSuccessGuaranteePic2}
                                                onChange={this.handleChangeGuaranteePic2}
                                                data={upyunParam}
                                                headers={headers}
                                            >
                                                {this.state.guaranteePic2List.length >= 10 ? null :guaranteePic2Button }
                                            </Upload>
                                        </div>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="第二担保人工作单位："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("guaranteeCompanyName2", {
                                        initialValue: formData.guaranteeCompanyName2,
                                    })(
                                        <Input type="text" className="ant-form-text" id="guaranteeCompanyName2"
                                               name="guaranteeCompanyName2" placeholder="请输入第二担保人工作单位（选填）"
                                               onChange={this.onChange.bind(this, 'guaranteeCompanyName2')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="第二担保人单位电话："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("guaranteeCompanyPhone2", {
                                        initialValue: formData.guaranteeCompanyPhone2,
                                    })(
                                        <Input type="text" className="ant-form-text" id="guaranteeCompanyPhone2"
                                               name="guaranteeCompanyPhone2" placeholder="请输入第二担保人单位电话（选填）"
                                               onChange={this.onChange.bind(this, 'guaranteeCompanyPhone2')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="第二担保人单位地址："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("guaranteeCompanyAddress2", {
                                        initialValue: formData.guaranteeCompanyAddress2,
                                    })(
                                        <Input type="text" className="ant-form-text" id="guaranteeCompanyAddress2"
                                               name="guaranteeCompanyAddress2" placeholder="请输入第二担保人单位地址（选填）"
                                               onChange={this.onChange.bind(this, 'guaranteeCompanyAddress2')}/>
                                    )}
                                </FormItem>
                            </div>
                            {/*共同借款人*/}
                            <FormItem
                                label="共同借款人："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("haveCommonBorrower", {
                                    initialValue: formData.haveCommonBorrower + "" || undefined,
                                    rules: [
                                        {required: true, message: "请选择是否有共同借款人！"}
                                    ]
                                })(
                                    <RadioGroup name="haveCommonBorrower"
                                                onChange={this.onChange.bind(this, 'haveCommonBorrower')}>
                                        <Radio value="1">有</Radio>
                                        <Radio value="0">无</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <div style={{display: formData.haveCommonBorrower == 1 ? 'block' : 'none'}}>
                                <FormItem
                                    label="共同借款人姓名："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("commmonBorrowerRealName", {
                                        initialValue: formData.commmonBorrowerRealName,
                                        rules: [
                                            {
                                                required: this.state.haveCommonBorrower == "1" ? true : false,
                                                message: "请输入共同借款人姓名：！"
                                            }
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="commmonBorrowerRealName"
                                               name="commmonBorrowerRealName" placeholder="请输入共同借款人姓名"
                                               onChange={this.onChange.bind(this, 'commmonBorrowerRealName')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="共同借款人社会关系："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("commmonBorrowerSocialRelation", {
                                        initialValue: formData.commmonBorrowerSocialRelation
                                    })(
                                        <Select placeholder="请选择共同借款人社会关系(选填)" name="commmonBorrowerSocialRelation" onChange={this.onChangeSelect.bind(this, 'commmonBorrowerSocialRelation')}>
                                            {socialRelations}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="共同借款人手机号码："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("commmonBorrowerMobilePhone", {
                                        initialValue: formData.commmonBorrowerMobilePhone,
                                        rules: [
                                            {
                                                required: this.state.haveCommonBorrower == "1" ? true : false,
                                                pattern:"^1[3|4|5|7|8|9]\\d{9}$", message: "请输入正确的共同借款人手机号码！"
                                            }
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="commmonBorrowerMobilePhone"
                                               name="commmonBorrowerMobilePhone" placeholder="请输入共同借款人手机号码"
                                               onChange={this.onChange.bind(this, 'commmonBorrowerMobilePhone')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="共同借款人身份证号码："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("commmonBorrowerCardId", {
                                        initialValue: formData.commmonBorrowerCardId,
                                        rules: [
                                            {required: this.state.haveCommonBorrower == "1" ? true : false,
                                                pattern:"(^\\d{6}(18|19|20)\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|[xX])$|^\\d{6}\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}$)", message: "请输入正确的共同借款人身份证号码！"}
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="commmonBorrowerCardId" name="commmonBorrowerCardId"
                                            placeholder="请输入共同借款人身份证号码"
                                            onChange={this.onChange.bind(this, 'commmonBorrowerCardId')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="共同借款人座机："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("commmonBorrowerTelPhone", {
                                        initialValue: formData.commmonBorrowerTelPhone
                                    })(
                                        <Input type="text" className="ant-form-text" id="commmonBorrowerTelPhone"
                                               name="commmonBorrowerTelPhone" placeholder="请输入共同借款人座机（选填）"
                                               onChange={this.onChange.bind(this, 'commmonBorrowerTelPhone')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="共同借款人公司地址："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("commmonBorrowerCompanyAddress", {
                                        initialValue: formData.commmonBorrowerCompanyAddress
                                    })(
                                        <Input type="text" className="ant-form-text" id="commmonBorrowerCompanyAddress"
                                               name="commmonBorrowerCompanyAddress" placeholder="请输入共同借款人公司地址（选填）"
                                               onChange={this.onChange.bind(this, 'commmonBorrowerCompanyAddress')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="共同借款人住址："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("commmonBorrowerAddress", {
                                        initialValue: formData.commmonBorrowerAddress
                                    })(
                                        <Input type="text" className="ant-form-text" id="commmonBorrowerAddress"
                                               name="commmonBorrowerAddress" placeholder="请输入共同借款人住址（选填）"
                                               onChange={this.onChange.bind(this, 'commmonBorrowerAddress')}/>
                                    )}
                                </FormItem>
                            </div>
                            {/*其他联系人*/}
                            <FormItem
                                label="其他联系人一："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("haveFirstContact", {
                                    initialValue: formData.haveFirstContact + "" || undefined,
                                    rules: [
                                        {required: true, message: "请选择是否有其他联系人一！"}
                                    ]
                                })(
                                    <RadioGroup name="haveFirstContact"
                                                onChange={this.onChange.bind(this, 'haveFirstContact')}>
                                        <Radio value="1">有</Radio>
                                        <Radio value="0">无</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <div style={{display: formData.haveFirstContact == 1 ? 'block' : 'none'}}>
                                <FormItem
                                    label="其他联系人一姓名"
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("contactRealName", {
                                        initialValue: formData.contactRealName,
                                        rules: [
                                            {
                                                required: this.state.haveFirstContact == "1" ? true : false,
                                                message: "请输入其他联系人一姓名！"
                                            }
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="contactRealName"
                                               name="contactRealName" placeholder="请输入其他联系人一姓名"
                                               onChange={this.onChange.bind(this, 'contactRealName')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="其他联系人一社会关系"
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("contactSocialRelation", {
                                        initialValue: formData.contactSocialRelation
                                    })(
                                        <Select placeholder="请选择其他联系人一社会关系(选填)" name="contactSocialRelation" onChange={this.onChangeSelect.bind(this, 'contactSocialRelation')}>
                                            {socialRelations}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="其他联系人一手机号码："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("contactMobilePhone", {
                                        initialValue: formData.contactMobilePhone,
                                        rules: [
                                            {
                                                required: this.state.haveFirstContact == "1" ? true : false,
                                                pattern:"^1[3|4|5|7|8|9]\\d{9}$", message: "请输入正确的其他联系人一手机号！"
                                            }
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="contactMobilePhone"
                                               name="contactMobilePhone" placeholder="请输入其他联系人一手机号码"
                                               onChange={this.onChange.bind(this, 'contactMobilePhone')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="其他联系人一身份证号码："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("contactCardId", {
                                        initialValue: formData.contactCardId,
                                        rules: [
                                            {required: this.state.haveFirstContact == "1" ? true : false,
                                                pattern:"(^\\d{6}(18|19|20)\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|[xX])$|^\\d{6}\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}$)", message: "请输入正确的其他联系人一身份证号码！"}
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="contactCardId" name="contactCardId"
                                            placeholder="请输入其他联系人一身份证号码"
                                            onChange={this.onChange.bind(this, 'contactCardId')}/>
                                    )}
                                </FormItem>
                            </div>
                            {/*其他联系人二*/}
                            <FormItem
                                label="其他联系人二："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("haveSecondContact", {
                                    initialValue: formData.haveSecondContact + "" || undefined,
                                    rules: [
                                        {required: true, message: "请选择是否有其他联系人二！"}
                                    ]
                                })(
                                    <RadioGroup name="haveSecondContact"
                                                onChange={this.onChange.bind(this, 'haveSecondContact')}>
                                        <Radio value="1">有</Radio>
                                        <Radio value="0">无</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <div style={{display: formData.haveSecondContact == 1 ? 'block' : 'none'}}>
                                <FormItem
                                    label="其他联系人二姓名"
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("contactRealName2", {
                                        initialValue: formData.contactRealName2,
                                        rules: [
                                            {
                                                required: this.state.haveSecondContact == "1" ? true : false,
                                                message: "请输入其他联系人二姓名！"
                                            }
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="contactRealName2"
                                               name="contactRealName2" placeholder="请输入其他联系人二姓名"
                                               onChange={this.onChange.bind(this, 'contactRealName2')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="其他联系人二社会关系"
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("contactSocialRelation2", {
                                        initialValue: formData.contactSocialRelation2
                                    })(
                                        <Select placeholder="请选择其他联系人二社会关系(选填)" name="contactSocialRelation2" onChange={this.onChangeSelect.bind(this, 'contactSocialRelation2')}>
                                            {socialRelations}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="其他联系人二手机号码："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("contactMobilePhone2", {
                                        initialValue: formData.contactMobilePhone2,
                                        rules: [
                                            {
                                                required: this.state.haveSecondContact == "1" ? true : false,
                                                pattern:"^1[3|4|5|7|8|9]\\d{9}$", message: "请输入正确的其他联系人二手机号！"
                                            }
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="contactMobilePhone2"
                                               name="contactMobilePhone2" placeholder="请输入其他联系人二手机号码"
                                               onChange={this.onChange.bind(this, 'contactMobilePhone2')}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="其他联系人二身份证号码："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("contactCardId2", {
                                        initialValue: formData.contactCardId2,
                                        rules: [
                                            {required: this.state.haveSecondContact == "1" ? true : false,
                                                pattern:"(^\\d{6}(18|19|20)\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}(\\d|[xX])$|^\\d{6}\\d{2}(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])\\d{3}$)", message: "请输入正确的其他联系人二身份证号码！"}
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" id="contactCardId2" name="contactCardId2"
                                            placeholder="请输入其他联系人二身份证号码"
                                            onChange={this.onChange.bind(this, 'contactCardId2')}/>
                                    )}
                                </FormItem>
                            </div>
                        </div>

                        {/*借款信息*/}
                        <div id="borrowInfo">
                            <h2>借款信息</h2>
                            <FormItem
                                label="合同编号："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("contractNo", {
                                    initialValue: formData.contractNo,
                                    rules: [
                                        {required: true, message: "请输入合同编号！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="contractNo" placeholder="请输入合同编号"
                                           onChange={this.onChange.bind(this, 'contractNo')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="车辆类型："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("autoType", {
                                    initialValue: formData.autoType + "" || undefined,
                                    rules: [
                                        {required: true, message: "请选择车辆类型！"}
                                    ]
                                })(
                                    <RadioGroup name="autoType" onChange={this.onChange.bind(this, 'autoType')}>
                                        <Radio value="0">新车</Radio>
                                        <Radio value="1">二手车</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem
                                label="是否为能源车："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("isNewEnergyCar", {
                                    initialValue: formData.isNewEnergyCar + "" || undefined,
                                    rules: [
                                        {required: true, message: "请选择车辆类型！"}
                                    ]
                                })(
                                    <RadioGroup name="isNewEnergyCar" onChange={this.onChange.bind(this, 'isNewEnergyCar')}>
                                        <Radio value="1">是</Radio>
                                        <Radio value="0">否</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem
                                label="车辆品牌："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("autoBrands", {
                                    initialValue: formData.autoBrands,
                                    rules: [
                                        {required: true, message: "请输入车辆品牌！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="autoBrands" placeholder="请输入车辆品牌"
                                           onChange={this.onChange.bind(this, 'autoBrands')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="车辆型号："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("autoModel", {
                                    initialValue: formData.autoModel,
                                })(
                                    <Input type="text" className="ant-form-text" name="autoModel"
                                           placeholder="请输入车辆型号（选填）" onChange={this.onChange.bind(this, 'autoModel')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="车架号："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("autoVinCode", {
                                    initialValue: formData.autoVinCode,
                                })(
                                    <Input type="text" className="ant-form-text" name="autoVinCode"
                                           placeholder="请输入车架号（选填）" onChange={this.onChange.bind(this, 'autoVinCode')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="保险："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("autoInsurance", {
                                    initialValue: formData.autoInsurance + "" || undefined,
                                    rules: [
                                        {required: true, message: "请选择车辆保险！"}
                                    ]
                                })(
                                    <RadioGroup name="autoInsurance"
                                                onChange={this.onChange.bind(this, 'autoInsurance')}>
                                        <Radio value="1">有</Radio>
                                        <Radio value="0">无</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            {this.state.autoType == '1' ? 
                                <FormItem
                                    label="二手车评估价："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("assessPrice", {
                                        initialValue: formData.assessPrice,
                                        rules: [
                                            {required: true, message: "请输入二手车评估价"}
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" name="assessPrice" addonAfter="元"
                                            placeholder="请输入二手车评估价" onChange={this.onChange.bind(this, 'assessPrice')}/>
                                    )}
                                </FormItem>
                                :
                                <FormItem
                                    label="车辆价格："
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 18}}>
                                    {getFieldDecorator("autoPrice", {
                                        initialValue: formData.autoPrice,
                                        rules: [
                                            {required: true, message: "请输入车辆价格！"}
                                        ]
                                    })(
                                        <Input type="text" className="ant-form-text" name="autoPrice" addonAfter="元"
                                            placeholder="请输入车辆价格" onChange={this.onChange.bind(this, 'autoPrice')}/>
                                    )}
                                </FormItem>
                        
                            }
                            <FormItem
                                label="贷款金额："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("loadMoney", {
                                    initialValue: formData.loadMoney,
                                    rules: [
                                        {required: true, message: "请输入贷款金额！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="loadMoney" addonAfter="元"
                                           placeholder="请输入贷款金额" onChange={this.onChange.bind(this, 'loadMoney')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="首付金额："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("firstMoney", {
                                    initialValue:this.state.firstMoney,
                                    rules: [
                                        {required: true, message: "请输入首付款金额！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="firstMoney" addonAfter="元" disabled
                                           placeholder="首付款金额自动生成"
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="首付比例："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("firstScale", {
                                    initialValue: this.state.firstScale,
                                    rules: [
                                        {required: true, message: "请输入首付比例！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="firstScale" addonAfter="%" disabled
                                           placeholder="首付比例自动生成"
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="签约利率："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("signedApr", {
                                    initialValue: formData.signedApr,
                                    rules: [
                                        {required: true, message: "请输入贷款金额！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="signedApr" addonAfter="%"
                                           placeholder="请输入签约利率" onChange={this.onChange.bind(this, 'signedApr')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="贷款期数："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("periodsId", {
                                    initialValue: formData.periodsId,
                                    rules: [
                                        {required: true, message: "请输入贷款期数！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="periodsId" addonAfter="期"
                                           placeholder="请输入贷款期数" onChange={this.onChange.bind(this, 'periodsId')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="贷款银行："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("loadBankCode", {
                                    initialValue: formData.loadBankCode,
                                    rules: [
                                        {required: true, message: "请输入贷款银行！"}
                                    ]
                                })(
                                    <Select placeholder="请输入贷款银行" name="loadBankCode" onChange={this.onChangeSelect.bind(this, 'loadBankCode')}>
                                        {loadBankCodeOption}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="银行利率："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("bankApr", {
                                    initialValue: formData.bankApr,
                                    rules: [
                                        {required: true, message: "请输入银行利率！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="bankApr" addonAfter="%"
                                           placeholder="请输入银行利率" onChange={this.onChange.bind(this, 'bankApr')}/>
                                )}
                            </FormItem>
                            <FormItem
                                label="签约贷款额："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("signedLoadMoney", {
                                    initialValue: formData.signedLoadMoney,
                                    rules: [
                                        {required: true, message: "请输入签约贷款额！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="signedLoadMoney" addonAfter="元" disabled
                                           placeholder="签约贷款额自动生成"
                                           />
                                )}
                            </FormItem>
                            <FormItem
                                label="利息："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("interest", {
                                    initialValue:formData.interest,
                                    rules: [
                                        {required: true, message: "请输入利息！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="interest" addonAfter="元" disabled
                                           placeholder="利息自动生成"
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="签约首付："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("signedFirstMoney", {
                                    initialValue: formData.signedFirstMoney,
                                    rules: [
                                        {required: true, message: "请输入签约首付！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="signedFirstMoney" addonAfter="元" disabled
                                           placeholder="签约首付自动生成"
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="签约首付比例："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("signedFirstScale", {
                                    initialValue: formData.signedFirstScale,
                                    rules: [
                                        {required: true, message: "请输入签约首付比例！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="signedFirstScale" addonAfter="%" disabled
                                           placeholder="签约首付比例自动生成"
                                           // onChange={this.onChange.bind(this, 'signedFirstScale')}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="月还款金额："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("moneyPerMonth", {
                                    initialValue: formData.moneyPerMonth,
                                    rules: [
                                        {required: true, message: "请输入月还款金额！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="moneyPerMonth" addonAfter="元" disabled
                                           placeholder="月还款金额自动生成"
                                           // onChange={this.onChange.bind(this, 'moneyPerMonth')}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="贷款比例："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("loadScale", {
                                    initialValue: formData.loadScale,
                                    rules: [
                                        {required: true, message: "请输入贷款比例！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="loadScale" addonAfter="%" disabled
                                           placeholder="贷款比例自动生成"
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="申请调整账户额度："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("applyLoadMoney", {
                                    initialValue: formData.applyLoadMoney,
                                    rules: [
                                        {required: true, message: "请输入申请调整账户额度！"}
                                    ]
                                })(
                                    <Input type="text" className="ant-form-text" name="applyLoadMoney" addonAfter="元" disabled
                                           placeholder="申请调整账户额度自动生成" />
                                )}
                            </FormItem>
                        </div>

                        {/*订单信息*/}
                        <div id="orderInfo">
                            <h2>订单信息</h2>
                            <FormItem
                                label="业务员："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("applyEmployeeCode", {
                                    initialValue: formData.applyEmployeeCode == '0' ? undefined : formData.applyEmployeeCode,
                                    rules: [
                                        {required: true, message: "请选择业务员"}
                                    ]
                                })(
                                    <Select name="applyEmployeeCode" placeholder="请选择业务员" onChange={this.onChangeSelect.bind(this, 'applyEmployeeCode')}>
                                        {employeeOption}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="车行名称："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("dealerCode", {
                                    initialValue: formData.dealerCode ? formData.dealerCode : undefined
                                })(
                                    <Select name="dealerCode" placeholder="请选择车行（选填）" onChange={this.onChangeSelect.bind(this, 'dealerCode')}>
                                        {dealerOption}
                                    </Select>
                                )}
                                    {/* <Select placeholder="请选择车行（选填）" value={ formData.dealerCode + ""} name="dealerCode" onChange={this.onChangeSelect.bind(this, 'dealerCode')}>
                                        {dealerOption}
                                    </Select> */}
                            </FormItem>
                        </div>

                        {/*其他备注*/}
                        <div id="otherInfo">
                            <h2>其他备注</h2>
                            <FormItem
                                label="备注："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}>
                                {getFieldDecorator("remark", {
                                    initialValue: formData.remark
                                })(
                                    <textarea placeholder="请输入备注（选填）" className="ant-input" name="remark" rows="3"  onChange={this.onChange.bind(this, 'remark')}></textarea>
                                )}
                            </FormItem>
                        </div>
                        {/*按钮 撤销 提交 保存 取消*/}
                        <Row className="bottom_btn" style={{width: 'calc(100% - 200px)',position:"fixed",bottom:"0"}}>
                            <Col style={{float: "left"}}>
                                <Button type="ghost" onClick={this.formRevoke} >撤销</Button>
                            </Col>
                            <Col className="rightBtn" style={{float: "right"}}>
                                <Button onClick={this.cancel_form}>取消</Button>
                                <Button type="primary" htmlType="submit" onClick={this.formSave} >保存</Button>
                                <Button type="ghost" htmlType="submit" style={{background: "#f4f4f4"}}>提交</Button>
                            </Col>
                        </Row>

                    </Form>
                </div>

                <div id="floatBox">
                    <input type="button" id="infoBtn" value="基本信息"/>
                    <input type="button" id="borrowInfoBtn" value="借款信息"/>
                    <input type="button" id="orderInfoBtn" value="车行信息"/>
                    <input type="button" id="otherInfoBtn" value="其他备注"/>
                </div>

            </div>
        );

    }

}
const applicationEdit = Form.create()(applicationEditForm);
export default applicationEdit;