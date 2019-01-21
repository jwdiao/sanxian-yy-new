
<template>
    <div class="" style="height: 100%">
        <head-top></head-top>
        <el-row style="height: 100%;">
            <el-col :span="5" style="min-height:90%; border: 1px solid #d1dbe5;margin:0 20px">
                <!--background-color: #324057;-->
                <div
                    style="background-color: #EFF2F7;width: 100%;height: 50px;line-height:50px; border-bottom: 1px solid #D1DBE5;font-weight: bold"
                >当前所在位置:&nbsp;&nbsp;&nbsp;{{companyNames}}
                </div>
                <el-tree style="min-height: 90%;border: 0px solid #d1dbe5;"
                         :data="orgDataArr"
                         :props="defaultProps"
                         accordion

                         @node-click="handleNodeClick">
                </el-tree>
            </el-col>
            <el-col :span="18" style="height:90%; border: 1px solid #d1dbe5; overflow: auto;">
                <!--新增-->
                <el-button v-show="AddIsSow" style="background: #5a8cff;color: #fff;width: 100px;" @click="handleAdd()" icon="plus">新增</el-button><!--size="small"-->

                <div class="el-main">
                    <el-table :data="tableData" fit align="left" stripe style="width: 100%;" height="750"
                              ref="multipleTable" tooltip-effect="dark"
                              @selection-change="handleSelectionChange">
                        <el-table-column align="center" prop="userName" label="用户类型">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.userName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="accuntNum" label="管理账号">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.accuntNum }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="childCompany" label="归属子公司">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.childCompany }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="loginPwd" label="密码" v-if="false">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.loginPwd }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" width="200" fixed="right">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)" style="background: #5a8cff;color: #fff;">编辑</el-button>
                                <el-button size="small" style="background: #ff404a;color: #fff;" @click="handleDelete(scope.$index, scope.row)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-dialog title="编辑"
                               :visible.sync="editFormVisible"
                               :close-on-click-modal="false"
                               class="edit-form"
                               :before-close="handleClose">
                        <el-form :v-model="editForm" label-width="80px" ref="editForm"><!--:rules="editFormRules"-->
                            <el-form-item label="用户类型" prop="userName">
                                <!--<el-input v-model="editForm.userName" auto-complete="off"></el-input>-->
                                <el-select v-model="valueUserName" placeholder="请选择" @change="findUserName">
                                    <el-option v-for="item in optionUserNames"
                                               :key="item.valueUserName"
                                               :label="item.label"
                                               :value="item.valueUserName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="管理账号" prop="accuntNum">
                                <el-input v-model="editForm.accuntNum" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="归属子公司" prop="childCompany" v-show="false">
                                <el-input v-model="editForm.childCompany" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="loginPwd">     <!--修改密码-->
                                <el-input v-model="editForm.loginPwd" type="password" auto-complete="off"></el-input><!--editForm.loginPwd-->
                            </el-form-item>
                            <el-form-item label="id" prop="id" v-show="false">
                                <el-input v-model="editForm.id" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="companyCode" prop="companyCode" v-show="false">
                                <el-input v-model="editForm.companyCode" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="employerCode" prop="employerCode" v-show="false">
                                <el-input v-model="editForm.employerCode" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click.native="handleCancel('editForm')">取消</el-button>
                            <el-button type="primary" @click.native="handleUpdate('editForm')">提交</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="新增"
                               :visible.sync="addFormVisible"
                               :close-on-click-modal="false"
                               class="edit-form"
                               :before-close="handleClose">
                        <el-form  label-width="80px" ref="editForm"><!--:v-model="editForm"-->
                            <el-form-item label="用户类型" prop="userName">
                                <!--<el-input v-model="editForm.userName" auto-complete="off"></el-input>-->
                                <el-select v-model="valueUserName" placeholder="请选择" @change="addUserName">
                                    <el-option v-for="item in optionUserNames"
                                               :key="item.valueUserName"
                                               :label="item.label"
                                               :value="item.valueUserName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="管理账号" prop="accuntNum">
                                <el-input v-model="addAccuntNum" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="loginPwd">     <!--修改密码-->
                                <el-input type="password" v-model="addLoginPwd" auto-complete="off"></el-input><!--editForm.loginPwd-->
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click.native="handleCancel('editForm')">取消</el-button>
                            <el-button type="primary" @click.native="handleAddFn('editForm')">添加</el-button>
                        </div>
                    </el-dialog>
                </div>
                <el-pagination style="text-align: center" background :page-sizes="[20,30,50,100]"
                               :page-size="pagination.pageSize" :pager-count="7" :total="pagination.dataCount"
                               layout="total,sizes,prev, pager, next,jumper"
                               @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick"
                               @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import http from '../api/http'
    import headTop from '../components/headTop'
    import {reqOrgTree,reqSecondOrgTree,deleteItem,reqDetailInfo,reqEdite,reqAddDate} from "../api";

    export default {
        components: {
            headTop
        },
        data() {
            return {
                editFormVisible: false, //默认不显示编辑弹层
                addFormVisible:false,
                editForm: {
                    id: 0,
                    name: '',
                    price: 0,
                    desc: '',
                    reserve: '',
                },
                //orgDataObj : {}, //用来存放tree数组的对象
                // 分页
                pagination: {
                    dataCount: 0, // 初始化信息条数
                    pageSize: 20, // 每页显示条数
                    page: 1, // 当前页码
                },
                showEdit: [], //显示编辑框
                showBtn: [],
                showBtnOrdinary: true,
                tableData: [],
                multipleSelection: [],
                orgDataArr: [],
                value:'',
                AddIsSow:false, //添加按钮显示
                addAccuntNum:'',  // 添加管理账户
                addLoginPwd:'',   // 添加密码
                selOrgName:'', //事业部名称
                companyNames:'',  //添加时传入子公司名称
                employerCodes:'', //添加时传入用户类型代码
                AddValueNum:'',   // 添加时传入后台对应的用户类型编码
                EditValueNum:'',  // 编辑时传入后台对应的用户类型编码
                parentCode:'0',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                optionUserNames:[
                    {
                        valueUserName:'1',
                        label:'普通用户'
                    },
                    {
                        valueUserName:'2',
                        label:'管理用户'
                    }
                ],
                valueUserName:'',
            }
        },
        mounted() {
            const {parentCode} = this
            this.getBasiCorg(parentCode)
        },
        methods: {
            /*函数名：handleDelete
              参数：index：, row：
              描述：删除的逻辑
            * */
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteInfo(row.id)
                    this.tableData.splice(index, 1);
                    //console.log('row:',row.id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*getBasiCorg  ：请求tree;
            * getBasiuser  :请求对应的列表
            * */
            async getBasiCorg(parentCode) {
                // const res = await http.post("/sanyBasiCorg/getBasiCorg", {parentCode: parentCode})
                const res = await reqOrgTree(parentCode)
                if (res.status === 200) {
                    var orgArrs = []
                    orgArrs = res.data.list
                    for (let i = 0; i < orgArrs.length; i++) {
                        var orgDataObj = {}
                        var orgDataObjChildren = {}
                        orgDataObj.label = orgArrs[i].orgName
                        orgDataObj.value = orgArrs[i].orgCode
                        orgDataObj.children = []
                        orgDataObj.children.push(orgDataObjChildren)
                        orgDataObj.orgId = orgArrs[i].orgCode
                        this.orgDataArr.push(orgDataObj)
                    }
                }
            },
            async getBasiCorgChild(parentCode) {
                // const res = await http.post("/sanyBasiCorg/getBasiCorg", {parentCode: parentCode})
                const res = await reqSecondOrgTree(parentCode)
                if (res.status === 200) {
                    const {orgDataArr} = this
                    var orgDataChildrenArr
                    for (var i = 0; i < orgDataArr.length; i++) {
                        if (parentCode === orgDataArr[i].orgId) {
                            orgDataArr[i].children.shift(1, 1)
                            orgDataArr[i].children = res.data.list
                        }
                        for (var j = 0; j < orgDataArr[i].children.length; j++) {
                            orgDataArr[i].children[j].label = orgDataArr[i].children[j].orgName
                            orgDataArr[i].children[j].orgId = orgDataArr[i].children[j].orgCode
                        }
                    }
                }
            },
            /*函数名：findUserName
              参数：无
              描述：发送请求，删除后台的数据
            * */
            findUserName(val){
                let obj = {};
                obj = this.optionUserNames.find((item)=>{
                    return item.valueUserName === val;
                });
                this.valueUserName = obj.label
            },
            addUserName(val){
                let obj = {};
                obj = this.optionUserNames.find((item)=>{
                    return item.valueUserName === val;
                });
                this.valueUserName = obj.label

            },
            /*函数名：selectOrgName
              参数：无
              描述：发送请求，
            * */
            selectOrgName(val){
                let obj = {};
                obj = this.orgDataArr.find((item)=>{
                    return item.value === val;
                });
                console.log(val)
                this.selOrgName = obj.label
            },
            /*函数名：deleteInfo
               参数：无
               描述：发送请求，删除后台的数据
             * */
            async deleteInfo(id) {
                // const res = await http.post("/sanyBasiCorg/delBasiuser", {id:id})
                const res = await deleteItem(id)
                if (res.status === 200) {
                }
            },
            /*函数名：getCorgInfoList
               参数：无
               描述：点击对应项出列表
             * */
            async getCorgInfoList(parentCode,pageNum,pageSize) {
                // const res = await http.post("/sanyBasiCorg/getBasiuser", {orgCode: parentCode,pageNum:pageNum,pagesize:pageSize})
                const res = await reqDetailInfo(parentCode,pageNum,pageSize)
                if (res.status === 200) {
                    var dataArr = res.data.getBasiuser
                    this.pagination.dataCount = res.data.total
                    for (var i = 0; i < dataArr.length; i++) {
                        var tableDataObj = {}
                        tableDataObj.userName = dataArr[i].employerName
                        tableDataObj.accuntNum = dataArr[i].loginAccount
                        tableDataObj.childCompany = dataArr[i].companyName
                        tableDataObj.loginPwd = dataArr[i].loginPwd
                        tableDataObj.id = dataArr[i].id
                        tableDataObj.companyCode = dataArr[i].companyCode
                        /*
                        this.companyNames = dataArr[i].companyName*/
                        tableDataObj.employerCode = dataArr[i].employerCode
                        this.tableData.push(tableDataObj)
                    }
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            /*函数名：handleNodeClick
              参数：data：,node：,label：
              描述：选择tree状结构所对应的项目
            * */
            handleNodeClick(data, node, label) {
                this.companyNames = node.label
                this.parentCode = data.orgId
                var parentCodeArr =  this.parentCode.split('')
                if (parentCodeArr.length === 2) {
                    this.AddIsSow = false
                    this.getBasiCorgChild( this.parentCode)
                } else if (parentCodeArr.length === 4) {
                    this.tableData = []
                    this.AddIsSow = true
                    let {page,pageSize} = this.pagination
                    page = page.toString()
                    pageSize = pageSize.toString()
                    this.getCorgInfoList( this.parentCode,page,pageSize)
                }
            },
            /*函数名：handleEdit
             参数：index：, row
             描述：点击编辑，弹出对话框
           * */
            handleEdit(index, row) {
                this.editForm.loginPwd = ''
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            /*函数名：handleAdd
             参数：index：, row
             描述：点击新增，弹出对话框
           * */
            handleAdd(){
                this.addFormVisible = true;
            },
            /*函数名：handleClose
              参数：done
              描述：点击关闭dialog
           * */
            handleClose(done) {
                /*done();
                location.reload();*/
                this.editFormVisible = false;
                this.addFormVisible = false;
            },
            //点击取消
            handleCancel(formName) {
                this.editFormVisible = false;
                this.addFormVisible = false;
            },
            /*函数名：handleClose
             参数：done
             描述：点击提交，向后台发送数据进行修改
          * */
            handleUpdate(forName) {
                //提交的时候就把弹出来的表单中的数据写到要修改的表格中
                var postData = {
                    userName: this.valueUserName,
                    accuntNum: this.editForm.accuntNum,
                    childCompany: this.editForm.childCompany,
                    loginPwd: this.editForm.loginPwd,
                    id: this.editForm.id,
                    companyCode: this.editForm.companyCode,
                    employerCode: this.editForm.employerCode,
                }
                if(postData.userName === ''){
                    this.$message({
                        message:'请选择用户类型',
                        type:'error'
                    })
                    return
                }else if(postData.accuntNum === ''){
                    this.$message({
                        message:'请输入用户账户',
                        type:'error'
                    })
                    return
                }else if(postData.loginPwd === ''){
                    this.$message({
                        message:'请输入密码',
                        type:'error'
                    })
                    return
                }
                if(this.valueUserName === '普通用户'){
                    this.EditValueNum = '1'
                }else if(this.valueUserName === '管理用户'){
                    this.EditValueNum = '2'
                }
                this.updateBasiUser(postData.id, postData.companyCode,postData.employerCode,postData.userName, postData.accuntNum, postData.childCompany, postData.loginPwd,this.EditValueNum)
                // console.log('postData', postData)
                //这里再向后台发个post请求重新渲染表格数据
                this.editFormVisible = false;
                setTimeout(() =>{
                    this.tableData = []
                    let {page,pageSize} = this.pagination
                    page = page.toString()
                    pageSize = pageSize.toString()
                    this.getCorgInfoList(postData.companyCode,page,pageSize)
                },300)
                this.$message({
                    message:'修改成功',
                    type:'success'
                })
            },
            async updateBasiUser(id, companyCode, employerCode,employerName,loginAccount, companyName, loginPwd,remark) {
                /*const res = await http.post("/sanyBasiCorg/updateBasiuser", {
                    id: id,
                    companyCode:companyCode,  //0201
                    employerCode:employerCode,  //0201a
                    employerName: employerName,  //普通用户
                    loginAccount: loginAccount,  //sybs
                    companyName: companyName, //泵送
                    loginPwd: loginPwd,
                })*/
                const res = await reqEdite(id, companyCode, employerCode,employerName,loginAccount, companyName, loginPwd,remark)
                if (res.status === 200) {
                }
            },
            /*函数名：handleAddFn
             参数：done
             描述：点击添加，向后台发送数据进行添加数据
          * */
            handleAddFn(){
                if(this.valueUserName === ''){
                    this.$message({
                        message:'请输入用户类型',
                        type:'error'
                    })
                    return
                }else if(this.addAccuntNum === ''){
                    this.$message({
                        message:'请输入管理账号',
                        type:'error'
                    })
                    return
                }else if(this.addLoginPwd === ''){
                    this.$message({
                        message:'请输入密码',
                        type:'error'
                    })
                    return
                }
                this.addFormVisible = false;
                var postData = {
                    userName: this.valueUserName,
                }
                if(this.valueUserName === '普通用户'){
                    this.employerCodes = this.parentCode + 'a'    //添加对应的选中公司的信息中去
                    this.AddValueNum = '1'
                }else if(this.valueUserName === '管理用户'){
                    this.employerCodes = this.parentCode + 'b'
                    this.AddValueNum = '2'
                }
                var addUserinfoObj = {}
                addUserinfoObj.accuntNum = this.addAccuntNum
                addUserinfoObj.childCompany = this.companyNames
                addUserinfoObj.companyCode = this.parentCode
                addUserinfoObj.employerCode = this.employerCodes
                addUserinfoObj.loginPwd = this.addLoginPwd
                addUserinfoObj.userName = this.valueUserName
                // console.log('addUserinfoObj:',addUserinfoObj)
                this.addUserObjFn(this.parentCode,this.employerCodes,this.valueUserName,this.addAccuntNum,this.companyNames,this.addLoginPwd,this.AddValueNum)
                this.tableData.unshift(addUserinfoObj)
                this.addAccuntNum = ''
                this.addLoginPwd = ''
                setTimeout(() =>{
                    this.tableData = []
                    let {page,pageSize} = this.pagination
                    page = page.toString()
                    pageSize = pageSize.toString()
                    this.getCorgInfoList(this.parentCode,page,pageSize)
                },300)
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
            },
            /*函数名：addUserObjFn
             参数：done
             描述：点击添加，向后台发送数据进行添加数据
          * */
            async addUserObjFn(companyCode,employerCode,employerName,loginAccount,companyName,loginPwd,remark) {
                /*const res = await http.post("/sanyBasiCorg/addBasiuser", {
                    companyCode:companyCode,  //0201
                    employerCode:employerCode,  //0201a
                    employerName: employerName,  //普通用户
                    loginAccount: loginAccount,  //sybs
                    companyName: companyName, //泵送
                    loginPwd: loginPwd,
                })*/
                const res = await reqAddDate(companyCode,employerCode,employerName,loginAccount,companyName,loginPwd,remark)
                if (res.status === 200) {
                }
            },
            /*函数名：currentChange
              参数：index：当前项
              描述：点击当前项，显示对应列表
            * */
            currentChange(index) {  //当前页码
                this.tableData = []
                let {page,pageSize} = this.pagination
                page = index.toString()
                pageSize = pageSize.toString()
                this.getCorgInfoList( this.parentCode,page,pageSize)
            },
            /*函数名：prevClick，nextClick
            参数：index：当前项
            描述：点击上一项、下一项，显示对应列表
          * */
            prevClick(index) {   //上翻页
            },
            nextClick(index) {   //下翻页
            },
            /*函数名：handleSizeChange
           参数：val：每页显示条数
           描述：选择显示对应列表
         * */
            handleSizeChange(val) {
                this.tableData = []
                let{page} = this.pagination
                page = '1'
                this.pagination.pageSize = val
                this.getCorgInfoList( this.parentCode,page,this.pagination.pageSize.toString())
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/mixin.less";

</style>
<style lang="less">
    .el-form-item { //    /deep/
        margin-bottom: 10px;
        margin-left: 80px;
    }

    .el-dialog--small {
        width: 30%;
    }

    .el-form-item__label {
        width: 100px !important;
    }

    .el-form-item__content {
        width: 150px !important;
        margin-left: 120px !important;
    }

    .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {
        width: 138%;
    }

    .table-fixed {
        /deep/ .el-table__fixed-right {
            height: 100% !important; //设置高优先，以覆盖内联样式
        }
    }

</style>
