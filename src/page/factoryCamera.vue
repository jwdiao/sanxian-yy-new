<template>
	<div class="" style="height: 100%">
		<head-top></head-top>
		<section class="data_section" style="height: 100%">
      <div class="index_main" style="height: 100%;">
        <div class="index_left" >
          <div class="index_left_bottom">
            <!--<p class="home_title">工厂摄像头信息列表</p>-->
            <div class="searchClass" style="padding-bottom: 20px; border-bottom: 2px dotted rgba(230,230,230,1)">   <!--style="padding-bottom: 20px; border-bottom: 2px dotted rgba(230,230,230,1)"-->
              <span class="factory-title-name" style="width: 160px;margin-left: 10px;">请选择需要上传的文件</span>
              <!--上传element-ui  start-->
              <el-upload id="formBiao" style="display:inline-block;background: none" class="upload-demo"
                         multiple ref="upload" accept=".xls,.xlsx"
                         action="/userPushRecord/find/all"
                         :on-change="beforeUpload"
                         :on-remove="removeDoc"
                         :http-request="uploadSectionFile"
                         :auto-upload="false">
                <el-button id="upload-document" slot="trigger" icon="el-icon-upload2" size="small" type="success" plain style="background: rgba(0,200,0,0.8);color:#fff">上传文件</el-button>
                <el-button style="margin-left: 10px;width:120px;" size="small" type="primary" @click="submitUpload" v-show="isShow">确定</el-button>
              </el-upload>
              <!--上传原生-->
              <!--<form method="post" id="formBiao" enctype="multipart/form-data" style="display: inline;margin-left: 58px">
                <input type="file" name="file"  value="file" class="block">
                <input type="button" class="gosearch" value="上传文件" @click="submit" style="background: #13ce66">
              </form>-->
              <!--上传end-->
            </div>
            <div class="searchClass" style="margin-bottom: 15px;">
              <span class="factory-title-name">事业部名称</span>
              <el-select class="el-class" v-model="finOrgId" clearable @clear="clearAll3" placeholder="事业部名称" size="small" @change="findShiYebuName">
                <el-option v-for="item in findOrgNames" :key="item.finOrgId" :label="item.label" :value="item.finOrgId"></el-option>
              </el-select>
              <span class="factory-title-name">子公司名称</span>
              <el-select class="el-class" v-model="finComId" clearable @clear="clearAll4" placeholder="子公司名称" size="small" @change="findZiGongSiName">
                <el-option v-for="item in findCompanyNames" :key="item.finComId" :label="item.label" :value="item.finComId"></el-option>
              </el-select>
              <span class="factory-title-name">工厂名称</span>
              <el-select class="el-class" v-model="compId" clearable @clear="clearAll5" placeholder="工厂名称" size="small" @change="findFactoryName">
                <el-option v-for="item in findFactoryNames" :key="item.compId" :label="item.label" :value="item.compId"></el-option>
              </el-select>
              <span class="factory-title-name">摄像头名称</span>
              <el-input class="el-class"  placeholder="请输入摄像头名称"  v-model="input1" size="small" clearable ref="cameraName"></el-input>
              <span class="factory-title-name">IP</span>
              <el-input class="el-class"  placeholder="请输入IP"  v-model="input2" size="small" clearable ref="IPName"></el-input>
              <el-button type="primary" class="gosearch" @click="searchCameraList" size="small" style="width: 120px;margin-left: 60px;">查询</el-button>
            </div>
            <div class="el-main">
              <el-table :data="tableData" stripe  style="width: 100%;" height="580">
                <el-table-column prop="cameraName" label="摄像头名称" min-width="105" > </el-table-column>
                <el-table-column  prop="cameraIP" label="摄像头IP" width="125" > </el-table-column>
                <el-table-column  prop="cameraAngle" label="摄像头角度"></el-table-column>
                <el-table-column  prop="firstGroupCode" label="一级工艺编码" ></el-table-column>
                <el-table-column   prop="firstGroupName"  label="一级工艺名称" > </el-table-column>
                <el-table-column   prop="secondGroupCode"  label="二级工艺编码">  </el-table-column>
                <el-table-column   prop="secondGroupName"  label="二级工艺名称"  >  </el-table-column>
                <el-table-column   prop="factoryCode"  label="工厂编码" width="100">  </el-table-column>
                <el-table-column   prop="factoryName"  label="工厂名称"  >  </el-table-column>
                <el-table-column   prop="companyCode"  label="子公司编码" width="100">  </el-table-column>
                <el-table-column   prop="companyName"  label="子公司名称" >  </el-table-column>
                <el-table-column   prop="orgCode"  label="事业部编码" width="100" >  </el-table-column>
                <el-table-column   prop="orgName"  label="事业部名称"  >  </el-table-column>
              </el-table>
            </div>
            <el-pagination style="text-align: center" background :page-sizes="[20,30,50,100]"
              :page-size="pagination.pageSize" :pager-count="7" :total="pagination.dataCount" layout="total,sizes,prev, pager, next,jumper"
              @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick"  @size-change="handleSizeChange">
            </el-pagination>
          </div>
        </div>
      </div>
		</section>
  </div>
</template>
<script>
import headTop from '../components/headTop'
import http from '../api/http'
import $ from 'jquery'
export default {
	components: {
		headTop
	},
  data() {
    return {
      tableData:[],
      findOrgNames:[],finOrgId:'',
      findCompanyNames:[],finComId:'',
      findFactoryNames:[],compId:'',

      input1:'',input2:'',
      isShow:false,
      isShowDelete:false,
      E:'',
      code:'0',
      // historyData:[],  //页面显示列表数组
      //下拉
      dropDowns:{
        FShiYebuName:'',  //查询事业部名称
        FZiGongSiName:'',  //查询子公司名称
        FFactoryName:'',  //查询工厂名称
      },
      // 分页
      pagination: {
        dataCount: 0, // 初始化信息条数
        pageSize: 20, // 每页显示条数
        page: 1, // 当前页码
      },
    }
  },
  created() {
    const {code} = this
    this.getCompanyList (code)
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    /*初始化显示发请求
    * */
    const cameraNames = this.$refs.cameraName.value
    const ipNames = this.$refs.IPName.value
    let {FShiYebuName,FZiGongSiName,FFactoryName} = this.dropDowns
    let {page, pageSize} = this.pagination
    page = page.toString()
    pageSize = pageSize.toString()
    this.getFactoryCameraInfoList (cameraNames,ipNames,FShiYebuName,FZiGongSiName,FFactoryName,page,pageSize)
    const {code} = this
    //this.getOrgCompanyData()
  },
  methods: {
    /*函数名：resize
      参数：无
      描述：根据浏览器大小内容自适应
    * */
    handleResize() {
      var screenHeight = $(window).height()
      // console.log(screenHeight)
      if (screenHeight > 1000) {
        $('.el-table').css('height', '650px')
      } else {
        $('.el-table').css('height', '580px')
      }
    },
    /*函数名：beforeUpload，removeDoc
      参数：file，fileList未用到
      描述：隐藏显示按钮
    */
    beforeUpload(file, fileList){
     this.isShow = true
    },
    removeDoc(file, fileList){
      let list = document.getElementsByClassName('el-upload-list__item is-ready')
      list.length === 1 ? this.isShow = false : this.isShow = true  //当删除最后一个时隐藏按钮
    },
    /*函数名：getFactoryCameraInfoList
     参数：cameraName,cameraIp,orgName,companyName,factoryName,page,pageSize:
     描述：异步ajax请求与后台通信，成功时，查询与初始化显示数据
   */
    async getFactoryCameraInfoList (cameraName,cameraIp,orgName,companyName,factoryName,page,pageSize) {
      if(orgName === '请选择') orgName = ""
      if(companyName === '请选择') companyName = ""
      if(factoryName === '请选择') factoryName = ""
      const res = await http.post("/camera/searchCameraListNew",{'searchNme':cameraName,'cameraIP':cameraIp,'orgName':orgName,'companyName':companyName,'factoryName':factoryName,'startIndex':(page-1)*pageSize,'pageSize':pageSize})
      if (res.data.ret === "200") {
        // console.log('res:',res)
        this.tableData = res.data.cameralist
        this.pagination.dataCount = res.data.total
        // console.log(this.tableData)
      }
    },
    /*函数名：uploadFileInfo
     参数：form
     描述：异步ajax请求与后台通信，成功时，导入数据
   */
    async uploadFileInfo (form) {
      const res = await http.post("/camera/cameraExcelUpload",form)
      if (res.data.ret === "200") {
        var messagesInfo = res.data.warning
        console.log('res:',res)
        this.$message({
          type:'warning',
          message:messagesInfo
        })
        this.$refs.upload.clearFiles() // 上传成功后清空列表
        let list = document.getElementsByClassName('el-upload-list__item is-ready')
        list.length >= 1 ? this.isShow = false : this.isShow = true  //当删除最后一个时隐藏按钮
      }
    },

    async getCompanyList (parentCode) {
      const res = await http.get("/sanybasicorg/getOrg/"+parentCode)

      if (res.data.ret === "200") {
        // console.log('res:',res)
        this.findOrgNames = res.data.data
        // console.log( this.findOrgNames)
        var initObj = {orgName:'请选择',orgCode:'00'}
        this.findOrgNames.unshift(initObj)
        // console.log( this.findOrgNames)
        this.deleteOrgNames = res.data.data
        this.findOrgNames.forEach((item,index) =>{
          item.finOrgId = item.orgCode
          item.label = item.orgName
          item.children = []
          // console.log(item)
        })
        this.deleteOrgNames.forEach((item,index) =>{
          item.deOrgId = item.orgCode
          item.label = item.orgName
          item.children = []
          // console.log(item)
        })
      }
    },

    /*函数名：submitUpload
      参数：
      描述：文件上传
    * */
    submitUpload() {
      let list = document.getElementsByClassName('el-upload-list__item is-ready')
      if(list.length == 0){
        this.$message({
          type:'warning',
          message:"请选择需要导入的模板！"
        })
        return;
      }
      this.$refs.upload.submit();
    },
    uploadSectionFile(param){
      var fileObj = param.file;
      var form = new FormData($('#formBiao')[0]);
      form.append("file", fileObj);
      console.log('form:',form)
      this.uploadFileInfo(form)
      //  this.$refs.upload.clearFiles()  上传成功后清空

    },
    /*三级联动start----------------------------------------------*/

    // 选查询事业部
    async findShiYebuName(val){
      let obj = {};
      obj = this.findOrgNames.find((item)=>{
        return item.finOrgId === val;
      });
      if(val === '00'){
        this. clearAll3()
      }
      this.dropDowns.FShiYebuName = obj.label
      //this.clearAll3()
      this.findCompanyNames = []
      this.finComId = ''
      this.findFactoryNames = []
      this.compId = ''
      this.dropDowns.FZiGongSiName = ''
      this.dropDowns.FFactoryName = ''
      const res = await http.get("/sanybasicorg/getOrg/"+val)
      if (res.data.ret === "200") {
       this.findCompanyNames = res.data.data
        var initObj = {orgName:'请选择',orgCode:'0000'}
        this.findCompanyNames.unshift(initObj)
        this.findCompanyNames.forEach((item,index) =>{
          item.finComId = item.orgCode
          item.label = item.orgName
          item.children = []
          // console.log(item)
        })
      }
    },
    // 选查询公司
    async findZiGongSiName(val){
      let obj = {};
      obj = this.findCompanyNames.find((item)=>{
        return item.finComId === val;
      });

      if(val === '0000'){
        this. clearAll4()
      }
      this.dropDowns.FZiGongSiName = obj.label
      //this.clearAll4()
      this.findFactoryNames = []
      this.compId = ''
      this.dropDowns.FFactoryName = ''
      const res = await http.get("/sanybasicorg/getOrg/"+val)
      if (res.data.ret === "200") {
        this.findFactoryNames = res.data.data
        var initObj = {orgName:'请选择',orgCode:'0000'}
        this.findFactoryNames.unshift(initObj)
        this.findFactoryNames.forEach((item,index) =>{
          item.compId = item.orgCode
          item.label = item.orgName
          item.children = []
          // console.log(item)
        })
      }

    },
    // 选查询工厂
    findFactoryName(val){
      let obj = {};
      obj = this.findFactoryNames.find((item)=>{
        return item.compId === val;
      });
      this.dropDowns.FFactoryName = obj.label
      this.E=val;
      console.log(val)
      if(val === '0000'){
        this. clearAll5()
      }
    },
    //点击清空按钮
    clearAll1(){
      this.isShowDelete = false
      this.findCompanyNames = []
      this.finComId = ''
      this.findFactoryNames = []
      this.compId = ''
    },
    clearAll2(){
      this.isShowDelete = false
      this.findFactoryNames = []
      this.compId = ''
    },
    //清空查询
    clearAll3(){
      this.findCompanyNames = []
      this.finComId = ''
      this.findFactoryNames = []
      this.compId = ''
      this.dropDowns.FShiYebuName = ''
      this.dropDowns.FFactoryName = ''
      this.dropDowns.FZiGongSiName = ''
      this.searchCameraList()
    },
    clearAll4(){
      this.findFactoryNames = []
      this.compId = ''
      this.dropDowns.FFactoryName = ''
      this.dropDowns.FZiGongSiName = ''
      this.searchCameraList()
    },
    clearAll5(){
      this.dropDowns.FFactoryName = ""
      this.searchCameraList()
    },
    /*三级联动end------------------------------------------------*/


    /*函数名：selectZiGongSiName
      参数：val：选择的当前options的value值（选项）
      描述：选择对应选项显示options的label值----->删除子公司名称
    * */
    selectZiGongSiName(val){
      this.isShowDelete = true
      let obj = {};
      obj = this.deleteCompanyNames.find((item)=>{
        return item.deCompId === val;
      });
      this.dropDowns.DeZiGongSiName = obj.label
    },

    /*函数名：searchCameraList
     参数：无
     描述：点击按钮查询
   * */
    searchCameraList() {
      const cameraNames = this.$refs.cameraName.value
      const ipNames = this.$refs.IPName.value
      let {FShiYebuName,FZiGongSiName,FFactoryName} = this.dropDowns
      let {page, pageSize} = this.pagination
      page = page.toString()
      pageSize = pageSize.toString()
      this.getFactoryCameraInfoList (cameraNames,ipNames,FShiYebuName,FZiGongSiName,FFactoryName,page,pageSize)
    },

    /*函数名：currentChange
     参数：index：当前项
     描述：点击当前项，显示对应列表
   * */
    currentChange(index) {  //当前页码
      this.tableData = []
      const cameraNames = this.$refs.cameraName.value
      const ipNames = this.$refs.IPName.value
      let {FShiYebuName,FZiGongSiName,FFactoryName} = this.dropDowns
      this.pagination.page = index.toString()
      let {pageSize} =this.pagination
      this.getFactoryCameraInfoList (cameraNames,ipNames,FShiYebuName,FZiGongSiName,FFactoryName,this.pagination.page,pageSize.toString())
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
      const cameraNames = this.$refs.cameraName.value
      const ipNames = this.$refs.IPName.value
      let {FShiYebuName,FZiGongSiName,FFactoryName} = this.dropDowns
      this.pagination.pageSize = val
      let{page} = this.pagination
      page = '1'
      this.getFactoryCameraInfoList (cameraNames,ipNames,FShiYebuName,FZiGongSiName,FFactoryName,page,this.pagination.pageSize.toString())
    },
  }
}
</script>

<style lang="less" scoped >
	@import '../assets/css/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
  .home_title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 22px; text-align: center;
    /*color: #fff;*/
    background-color: #EFF2F7;
  }
  .index_left{
    width: 99%;float: left;height:100%;padding-right: 15px;
    display: flex;flex-direction: column;
    &_bottom{
      flex: 1;width:100%;overflow:hidden;
      border: 2px solid #EFF2F7;
      margin-top: 15px;
      padding-top: 0px;
      padding-left: 0px;
      padding-bottom: 15px;
      .searchClass{
        padding-left: 30px;
        width: 100%;
        height: 30px;
        margin-top: 15px;
        &>.selectDate{
          width: 17%;
          height: 33px;
          padding-left: 0px;
          color: #000;
          background: transparent;
          margin-right:100px;margin-left:40px;font-size:14px;
        }
        &>input{
          width: 16%;
          height: 30px;
          outline: none;
          padding-left: 10px;
          background: rgba(56,142,237,0.2);
          background: transparent;
          border: 1px solid #ccc;
          border-radius:5px ;
          margin-right: 10px;font-size:14px;float:left;
        }
        &>input::-webkit-input-placeholder{
          color: #ccc;
        }
        & .gosearch,& .el-class{
          display: inline-block;
          width: 10%;
        }
      }
      .camera-information-list{
        width: 150%;
        overflow-x: scroll;
      }
      .titleCamera{
        /*color:white;*/
        background-color: #EFF2F7;
        font-weight: bold;
        height:40px;
        line-height: 40px;
        margin-top: 15px;
        width: 100%;
        span{
          display:inline-block;
          text-align: center;
          width:7.6%;
          height:32px;
          padding-left:0px;
          box-sizing:border-box;
          line-height:30px;
          font-size: 14px;
        }
      }
      &_main{
        height: 620px;
        /*overflow: scroll;*/
        .message{
          height: 100%;
          overflow: scroll;
          float:left;
          width:100%;
          .title_message_factory{
            height:32px;
            border-top: 1px solid #EFF2F7;
            box-sizing: border-box;
            &:last-child{
              border-bottom: 1px solid #EFF2F7;
            }
            &:hover{
              cursor: pointer;
              background: #EFF2F7;
            }
            &>span{
              float: left;
              display:inline-block;
              text-align: center;
              width:7.6%;
              height:32px;
              /*padding-left: 30px;*/
              font-size: 14px;
              box-sizing:border-box;
              line-height:35px;
              /*background-color: #ccc;*/
            }
          }
        }
      }
    }
  }
  /deep/ #formBiao{position: relative;margin-left: 50px;}
  /deep/ .el-upload-list{
    position: absolute;
    top:-5px;
    left: 250px;
    background-color: rgba(238,238,238,0.6);
    z-index: 100000;
  }
  /deep/ #upload-document:hover{
    background: rgba(0,200,0,0.5)!important;
  }
  /deep/ .factory-title-name{
    display: inline-block;
    width: 90px;
    text-align: right;
  }
  /deep/ .el-pagination{
    margin-top: 0;
  }
</style>
<style lang="less">
    /*为什么加上/deep/不起作用了呢？？？？*/
     #formBiao{position: relative;margin-left: 50px;}
     .el-upload-list{
        position: absolute;
        top:-5px;
        left: 250px;
        background-color: rgba(238,238,238,0.6);
        z-index: 100000;
    }
</style>
