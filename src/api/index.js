
import http from './http'

//初始化接口
export const reqOrgTree = (parentCode) => http.post("/sanyBasiCorg/getBasiCorg", {parentCode: parentCode})
//二级子菜单接口
export const reqSecondOrgTree = (parentCode) => http.post("/sanyBasiCorg/getBasiCorg", {parentCode: parentCode})
//删除逻辑
export const deleteItem = (id) => http.post("/sanyBasiCorg/delBasiuser", {id:id})
//详细列表页面
export const reqDetailInfo = (parentCode,pageNum,pageSize) => http.post("/sanyBasiCorg/getBasiuser", {orgCode: parentCode,pageNum:pageNum,pagesize:pageSize})
//编辑（修改）调用接口
export const reqEdite = (id, companyCode, employerCode,employerName,loginAccount, companyName, loginPwd,remark) => http.post("/sanyBasiCorg/updateBasiuser", {id: id,companyCode:companyCode,employerCode:employerCode,employerName: employerName,loginAccount: loginAccount,companyName: companyName,loginPwd: loginPwd,remark:remark})
//添加数据调用接口
export const reqAddDate = (companyCode,employerCode,employerName,loginAccount,companyName,loginPwd,remark) => http.post("/sanyBasiCorg/addBasiuser", {companyCode:companyCode,employerCode:employerCode,employerName: employerName,loginAccount: loginAccount,companyName: companyName,loginPwd: loginPwd,remark:remark})
