import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./app/containers/index";
import staffManageStaff from "./app/containers/staffManage/staff";//总部员工管理
import staffManageStaffEdit from "./app/containers/staffManage/staffEdit";//编辑总部员工表单
import staffManageStaffNew from "./app/containers/staffManage/staffNew";//新建总部员工表单
import staffManageStore from "./app/containers/staffManage/store";//门店管理
import staffManageStoreNew from "./app/containers/staffManage/storeNew";//门店新建员工表单
import staffManageStoreEdit from "./app/containers/staffManage/storeEdit";//门店编辑员工表单

import systemSetup from "./app/containers/systemSetup/systemSetup";//系统设置

import applyForAll from "./app/containers/applyForAll/listAll";//总部管理员查看所有申请单

import newApplicationList from "./app/containers/newApplication/list";//申请单列表
import newApplicationNewEdit from "./app/containers/newApplication/newEdit";//新建申请单
import newApplicationNewEditParameter from "./app/containers/newApplication/newEditParameter";//新建申请单

import auditList1 from "./app/containers/auditList/list1";//审核列表
import auditList2 from "./app/containers/auditList/list2";//初审列表
import auditList3 from "./app/containers/auditList/list3";//复审列表
import auditList4 from "./app/containers/auditList/list4";//终审列表

import auditListDetailOpinion2 from "./app/containers/auditList/detailOpinion2";//初审操作
import auditListDetailOpinion3 from "./app/containers/auditList/detailOpinion3";//复审操作
import auditListDetailOpinion4 from "./app/containers/auditList/detailOpinion4";//终审操作
import auditListDetail from "./app/containers/auditList/detail";//审核列表
import auditListSupplemen from "./app/containers/auditList/supplemen";//审核列表

import distributionList from "./app/containers/distributionList/distributionList";//分单列表
import distributionDetail from "./app/containers/distributionList/distributionDetail";//分单列表


import AplicationForPaymentRemitApply from "./app/containers/ApplicationForPayment/remitApply";//打款申请列表
import remitApplyRiskReport from "./app/containers/ApplicationForPayment/riskReport";//打款申请查看风控报告
import remitEdit from "./app/containers/ApplicationForPayment/remitEdit";//打款申请编辑
import remitPassOrNo from "./app/containers/ApplicationForPayment/remitPassOrNo";//打款申请结果查看
import AplicationForPaymentRemitAudit from "./app/containers/ApplicationForPayment/remitAudit";//打款审核列表
import financeAudit from "./app/containers/ApplicationForPayment/financeAudit";//财务审核

import sendObjectRegister from "./app/containers/sendObjectRegister/list1";//寄件登记
import receiveObjectRegister from "./app/containers/sendObjectRegister/list2";//收件登记

import mailRegistration from "./app/containers/mailRegistration/index";//寄件登记
import registerRegistration from "./app/containers/registerRegistration/index";//收件登记
//import vehicleGpsRegistration from "./app/containers/vehicleGpsRegistration/index";//车辆GPS登记
import vehicleGpsRegistration from "./app/containers/vehicleGpsRegistration/gpsRegiste";//车辆GPS登记
import mortgageRegistration from "./app/containers/mortgageRegistration/mortgageRegistration";//总部抵押登记
import department from "./app/containers/mortgageRegistration/department";//门店抵押登记

import staffList from "./app/containers/dataStatistics/staffList";//数据统计-->员工统计-总部
import staffList2 from "./app/containers/dataStatistics/staffList2";//数据统计-->员工统计-门店
import staffChart from "./app/containers/dataStatistics/staffChart";//数据统计-->员工排名
import officeStaffChart from "./app/containers/dataStatistics/officeStaffChart";//数据统计-->员工排名(门店内勤)
import storeChart from "./app/containers/dataStatistics/storeChart";//数据统计-->门店排名
import staffChartList1 from "./app/containers/dataStatistics/staffChartList1";//数据统计-->员工排名-->详细
import staffChartList2 from "./app/containers/dataStatistics/staffChartList2";//数据统计-->员工排名-->详细
import storeChartList from "./app/containers/dataStatistics/storeChartList";//数据统计-->门店排名-->详细
import businessChart from "./app/containers/dataStatistics/businessChart";//数据统计-->业务分析
// import businessAnalysis from "./app/containers/dataStatistics/businessAnalysis"; //数据统计-->业务分析
import userChart from "./app/containers/dataStatistics/userChart";//数据统计-->用户画像

import afterLoanManagement from "./app/containers/afterLoanManagement/index";//贷后管理
import vehicleManagement from "./app/containers/vehicleManagement/index";//车行管理

import changePwd from "./app/containers/changePwd/changePwd";
import myMessage from "./app/containers/myMessage/myMessage";
import Login from "./app/containers/login/login";
import ForgotPwd from "./app/containers/forgotPwd/index";
import NotFoundPage from "./app/components/NotFoundPage/index";

import storeManageList from "./app/containers/StoreAndAutoDealerManage/store";
import storeManageEdit from "./app/containers/StoreAndAutoDealerManage/storeEdit";

import autoDealerManageList from "./app/containers/StoreAndAutoDealerManage/autoDealer";
import autoDealerManageEdit from "./app/containers/StoreAndAutoDealerManage/autoDealerEdit";

import autoDealerManageToStoreList from "./app/containers/StoreAndAutoDealerManage/autoDealerToStore";
import autoDealerManageToStoreEdit from "./app/containers/StoreAndAutoDealerManage/autoDealerToStoreEdit";

import roleManageList from "./app/containers/roleManage/role";
import roleManageEdit from "./app/containers/roleManage/roleEdit";
import roleManagePermission from "./app/containers/roleManage/rolePermission";
import accountCenter from "./app/containers/accountCenter/accountCenter";
import riskQuery from "./app/containers/riskQuery/riskQuery"
// import riskQueryEdit from "./app/containers/riskQuery/riskQueryEdit"
import riskQueryTd from "./app/containers/riskQuery/riskQueryTd"
import riskQueryTdSimple from "./app/containers/riskQuery/riskQueryTdSimple"
import riskQueryMg from "./app/containers/riskQuery/riskQueryMg"
import riskQueryRecord from "./app/containers/riskQueryRecord/riskQueryRecord"

import bankFlow from "./app/containers/bankFlow/bankFlow"
import bankFlowList from "./app/containers/bankFlow/bankFlowList"
import usedCar from "./app/containers/usedCar/usedCar"
import usedCarList from "./app/containers/usedCar/usedCarList"
import vehicleViolation from "./app/containers/usedCar/vehicleViolation"
import vehicleViolationList from "./app/containers/usedCar/vehicleViolationList"
import invoiceInspection from "./app/containers/invoiceInspection/invoiceInspection"
import invoiceInspectionList from "./app/containers/invoiceInspection/invoiceInspectionList"
import licensInspection from "./app/containers/usedCar/licensInspection"
import licensInspectionList from "./app/containers/usedCar/licensInspectionList"
import equipment from "./app/containers/equipment/equipment"
import equipmentList from "./app/containers/equipment/equipmentList"
import socialSecurity from "./app/containers/socialSecurity/socialSecurity"
import socialSecurityList from "./app/containers/socialSecurity/socialSecurityList"
import accumulationFund from "./app/containers/accumulationFund/accumulationFund"
import accumulationFundList from "./app/containers/accumulationFund/accumulationFundList"
import address from "./app/containers/address/address"
import addressList from "./app/containers/address/addressList"
import houseProperty from "./app/containers/houseProperty/houseProperty"

import vincode from "./app/containers/vinCode/vincode"
import vincodeList from "./app/containers/vinCode/vincodeList"
import housePropertyList from "./app/containers/houseProperty/housePropertyList"


import dayDetail from "./app/containers/accountCenter/dayDetail"; //账户中心-->账单管理-->每日明细;
import monthDetail from "./app/containers/accountCenter/monthDetail"; //账户中心-->账单管理-->每月明细;a


import homePage from "./app/containers/newIndex/newIndex"//新首页
import servicePage from "./app/containers/newIndex/servicePage"//新首页
import aboutPage from "./app/containers/newIndex/aboutPage"//新首页
import register from "./app/containers/register/register"
import registerAgreement from "./app/containers/register/registerAgreement"
import legalDeclaration from "./app/containers/register/legalDeclaration"
import enterpriseInfo from "./app/containers/enterpriseInfo/enterpriseInfo"
import registerAlready from "./app/containers/register/registerAlready"
import registerAlreadyFail from "./app/containers/register/registerAlreadyFail"


import subAccount from "./app/containers/subAccount/subAccount"
import addSubAccount from "./app/containers/subAccount/addSubAccount"
import editSubAccount from "./app/containers/subAccount/editSubAccount"
import editSubAccountMobile from "./app/containers/subAccount/editSubAccountMobile"
import subAccountRecord from "./app/containers/subAccountRecord/subAccountRecord"

import consumptionRank from "./app/containers/consumptionRank/consumptionRank"
import consumptionRankDetails from "./app/containers/consumptionRank/consumptionRankDetails"

export default (
    <Route>
        <Route path="/" component={homePage}/>{/**/}
        <Route path="/servicePage" component={servicePage}/>{/**/}
        <Route path="/aboutPage" component={aboutPage}/>{/**/}
        <Route path="/register" component={register}/>{/**/}
        <Route path="/registerAgreement" component={registerAgreement}/>{/**/}
        <Route path="/legalDeclaration" component={legalDeclaration}/>{/**/}
        <Route path="/enterpriseInfo" component={enterpriseInfo}/>{/**/}
        <Route path="/registerAlready" component={registerAlready} />
        <Route path="/registerAlreadyFail" component={registerAlreadyFail} />
        <Route path="/riskQuery" component={App}>
            <IndexRoute component={riskQuery} />

            <Route path="/StoreAndAutoDealerManage/store/:page" component={storeManageList} />{/*门店管理*/}
            <Route path="/StoreAndAutoDealerManage/storeedit/p:id/p:storeName/p:provinceId/p:cityId/p:areaId/p:status/p:page" component={storeManageEdit} />{/*门店管理->新建/编辑门店*/}

            <Route path="/StoreAndAutoDealerManage/autodealer/:page" component={autoDealerManageList} />{/*车行管理*/}
            <Route path="/StoreAndAutoDealerManage/autodealeredit/p:id/p:name/p:address/p:storeCode/p:phone/p:provinceId/p:cityId/p:areaId/p:page" component={autoDealerManageEdit} />{/*车行管理->新建/编辑车行*/}

            <Route path="/StoreAndAutoDealerManage/autodealertostore/:page" component={autoDealerManageToStoreList} />{/*门店车行管理*/}
            <Route path="/StoreAndAutoDealerManage/autodealeredittostore/p:id/p:name/p:address/p:storeCode/p:phone/p:provinceId/p:cityId/p:areaId/p:page" component={autoDealerManageToStoreEdit} />{/*门店车行管理->新建/编辑车行*/}

            
            <Route path="/roleManage/role" component={roleManageList} />{/*角色管理*/}
            <Route path="/roleManage/roleedit/:id/:roleName/:profile" component={roleManageEdit} />{/*角色管理->新建/编辑角色*/}
            <Route path="/roleManage/rolepermission/:id" component={roleManagePermission} />{/*角色管理->新建/编辑角色*/}

            
            <Route path="/staffManage/store" component={staffManageStore} />{/*门店管理*/}
            <Route path="/staffManage/store/new" component={staffManageStoreNew} />{/*门店管理->新建门店员工*/}
            <Route path="/staffManage/store/:id" component={staffManageStoreEdit} />{/*门店管理->编辑门店员工*/}
            <Route path="/staffManage/staff" component={staffManageStaff} />{/*总部员工管理*/}
            <Route path="/staffManage/staff/new" component={staffManageStaffNew} />{/*总部员工管理新建*/}
            <Route path="/staffManage/staff/:id" component={staffManageStaffEdit} />{/*总部员工管理->编辑员工*/}

            <Route path="/systemSetup" component={systemSetup} />{/*系统设置*/}

            <Route path="/applyForAll/listAll" component={applyForAll}/> {/*总部管理员查看所有申请单*/}

            <Route path="/newApplication/list" component={newApplicationList} />{/*新建申请单->列表*/}
            <Route path="/newApplication/newEditParameter/:id" component={newApplicationNewEditParameter} />{/*编辑申请单*/}
            <Route path="/newApplication/newEdit" component={newApplicationNewEdit} />{/*新建申请单*/}


            <Route path="/auditList/list1" component={auditList1} />{/*审核列表*/}
            <Route path="/auditList/list2" component={auditList2} />{/*初审列表*/}
            <Route path="/auditList/list3" component={auditList3} />{/*复审列表*/}
            <Route path="/auditList/list4" component={auditList4} />{/*终审列表*/}

            <Route path="/auditList/detail/:id" component={auditListDetail} />{/*审核列表-->详情*/}
            <Route path="/auditList/detailOpinion2/:id" component={auditListDetailOpinion2} />{/*初审-->详情*/}
            <Route path="/auditList/detailOpinion3/:id" component={auditListDetailOpinion3} />{/*初审-->详情*/}
            <Route path="/auditList/detailOpinion4/:id" component={auditListDetailOpinion4} />{/*初审-->详情*/}
            <Route path="/auditList/supplemen/:id" component={auditListSupplemen} />{/*审核列表-->补充*/}

            <Route path="/distributionList" component={distributionList} />{/*分单列表*/}
            <Route path="/distributionDetail" component={distributionDetail} />{/*分单列表*/}

            <Route path="/ApplicationForPayment/remitApply" component={AplicationForPaymentRemitApply} />{/*打款申请列表*/}
            <Route path="/ApplicationForPayment/riskReport/:id/:column" component={remitApplyRiskReport}/> {/*打款申请查看风控报告*/}
            <Route path="/ApplicationForPayment/remitEdit/:id/:stat" component={remitEdit}/> {/*打款申请编辑提交*/}
            <Route path="/ApplicationForPayment/remitPassOrNo/:id/:stat/:column" component={remitPassOrNo}/>  {/*打款申请结果查看*/}
            <Route path="/ApplicationForPayment/remitAudit" component={AplicationForPaymentRemitAudit}/> {/*打款审核列表*/}
            <Route path="/ApplicationForPayment/financeAudit/:id" component={financeAudit}/> {/*财务审核*/}

            <Route path="/sendObjectRegister/list1" component={sendObjectRegister} />{/*寄件登记*/}
            <Route path="/sendObjectRegister/list2" component={receiveObjectRegister} />{/*收件登记*/}

            <Route path="/vehicleGpsRegistration" component={vehicleGpsRegistration} />{/*车辆GPS登记*/}
            <Route path="/mortgageRegistration/hqMortgageRegistration" component={mortgageRegistration} />{/*总比抵押登记*/}
            <Route path="/mortgageRegistration/department" component={department} />{/*门店抵押登记*/}

            <Route path="/dataStatistics/staffList" component={staffList} />{/*数据统计-->员工统计-总部*/}
            <Route path="/dataStatistics/staffList2" component={staffList2} />{/*数据统计-->员工统计-门店*/}

            <Route path="/dataStatistics/staffChart" component={staffChart} />{/*数据统计-->员工排名*/}
            <Route path="/dataStatistics/officeStaffChart" component={officeStaffChart} />{/*数据统计-->员工排名*/}
            <Route path="/dataStatistics/storeChart" component={storeChart} />{/*数据统计-->门店排名*/}
            <Route path="/dataStatistics/staffChart/list1/:id" component={staffChartList1} />{/*数据统计-->员工排名-->详细*/}
            <Route path="/dataStatistics/staffChart/list2/:id" component={staffChartList2} />{/*数据统计-->员工排名-->详细*/}
            <Route path="/dataStatistics/storeChart/list" component={storeChartList} />{/*数据统计-->门店排名-->详细*/}

            <Route path="/dataStatistics/businessChart" component={businessChart} />{/*数据统计-->业务分析*/}
            
            <Route path="/dataStatistics/userChart" component={userChart} />{/*数据统计-->用户画像*/}

            <Route path="/vehicleManagement" component={vehicleManagement} />{/*车行管理*/}
            <Route path="/afterLoanManagement" component={afterLoanManagement} />{/*贷后管理*/}
            <Route path="/accountCenter" component={accountCenter} />{/*账户中心*/}
            <Route path="/riskQuery" component = {riskQuery} />{/*风控查询*/}
            {/* <Route path='/riskQueryEdit/:id' component = {riskQueryEdit} /> */}
            <Route path='/riskQueryEdit/1' component = {riskQueryTd} />{/*风控数据查询td*/}
            <Route path='/riskQueryEdit/2' component = {riskQueryTdSimple} />{/*风控数据查询td简*/}
            <Route path='/riskQueryEdit/3' component = {riskQueryMg} />{/*风控数据查询mg*/}
            <Route path='/riskQueryRecord' component = {riskQueryRecord} />{/*风控数据列表*/}
            <Route path='/riskQueryRecord/:id' component = {riskQueryRecord} />{/*td风控数据列表*/}

            <Route path='/bankFlow/bankFlow' component = {bankFlow} />{/*银行流水查询*/}
            <Route path='/bankFlow/bankFlowList' component = {bankFlowList} />{/*银行流水列表查询*/}
            <Route path='/usedCar/usedCar' component = {usedCar} />{/*二手车档案查询*/}
            <Route path='/usedCar/usedCarList' component = {usedCarList} />{/*二手车档案列表查询*/}
            <Route path='/vehicleViolation/vehicleViolation' component = {vehicleViolation} />{/*车辆违章查询*/}
            <Route path='/vehicleViolation/vehicleViolationList' component = {vehicleViolationList} />{/*车辆违章列表查询*/}
            <Route path='/invoiceInspection/invoiceInspection' component = {invoiceInspection} />{/*发票查验 */}
            <Route path='/invoiceInspection/invoiceInspectionList' component = {invoiceInspectionList} />{/*发票查验记录 */}
            <Route path='/usedCar/licensInspection' component= {licensInspection}/>{/*驾驶证查验 */}
            <Route path='/usedCar/licensInspectionList' component={licensInspectionList}/> {/*驾驶证查验记录 */}
            <Route path='/equipment/equipment' component={equipment}/> {/*设备查验 */}
            <Route path='/equipment/equipmentList' component={equipmentList}/> {/*设备查验记录 */}
            <Route path='/socialSecurity/socialSecurity' component={socialSecurity}/> {/*社保查询 */}
            <Route path='/socialSecurity/socialSecurityList' component={socialSecurityList}/> {/*社保查询记录 */}
            <Route path='/accumulationFund/accumulationFund' component={accumulationFund}/> {/*公积金查询 */}
            <Route path='/accumulationFund/accumulationFundList' component={accumulationFundList}/> {/*公积金查询记录 */}
            <Route path='/address/address' component={address}/> {/*地址查询 */}
            <Route path='/address/addressList' component={addressList}/> {/*地址查询记录 */}
            <Route path='/houseProperty/houseProperty' component={houseProperty}/> {/*房产评估 */}

            <Route path='/vinCode/vincode' component={vincode}/> {/*vin码查验 */}
            <Route path='/vinCode/vincodeList' component={vincodeList}/> {/*vin码查验记录 */}

            <Route path='/houseProperty/housePropertyList' component={housePropertyList}/> {/*房产评估记录 */}

            <Route path="/accountCenter/dayDetail/:id" component={dayDetail} />{/*账户中心-->账单管理-->每日明细*/}
            <Route path="/accountCenter/monthDetail/:id" component={monthDetail} />{/*账户中心-->账单管理-->每月明细*/}
            <Route path="/subAccount" component={subAccount} />{/*子账户管理*/}
            <Route path="/addSubAccount" component={addSubAccount} />{/*子账户管理*/}
            <Route path="/editSubAccount/:mobile/:type/:name" component={editSubAccount} />{/*子账户管理*/}
            <Route path="/editSubAccountMobile/:mobile" component={editSubAccountMobile} />{/*子账户管理*/}
            <Route path="/subAccountRecord" component={subAccountRecord} />{/*子账户查询记录*/}

            <Route path="/consumptionRank" component={consumptionRank} />{/*消费排行*/}
            <Route path="/consumptionRankDetails/:type" component={consumptionRankDetails} />{/*消费排行*/}



            <Route path="/myMessage" component={myMessage}/>
            <Route path="/changePwd" component={changePwd}/>
            <Route path="/login" component={Login} />
            <Route path="/forgotPwd" component={ForgotPwd}/>
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Route>
    
);
