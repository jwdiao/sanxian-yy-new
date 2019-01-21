<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;" >
	  		<el-col :span="3"  style="min-height: 100%; background-color: #324157"><!--background-color: #324057;-->
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage" style="background-color:#192433;" class="manage_title"> <img src="../assets/images/logo.png" />
                        <i>三现运营管理系统</i></el-menu-item>
                    <el-menu-item index="manage">
                        <i class="el-icon-menu" style="margin-right: -4px; text-align: left;font-size: 16px"></i>
                        <span slot="title" style="font-size: 16px">三现运营后台</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>用户管理</template>
                        <el-menu-item index="allList">组织架构</el-menu-item>
                        <el-menu-item v-show="username === 'admin'" index="nodatapage">空白1</el-menu-item>
                        <!--<el-menu-item index="deletefactorycamera">删除工厂摄像头</el-menu-item>-->
                        <el-menu-item index="deletepaigong">删除派工</el-menu-item>
                        <el-menu-item index="factorycamera">工厂摄像头列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-message"></i>组织说明</template>
                        <el-menu-item index="nodatapage">设置</el-menu-item>
                        <el-menu-item index="nodatapage">说明</el-menu-item>
                    </el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="21" style="height: 100%;overflow: auto;">
                <div style="width: 100%;height: 60px;background-color: #324057;">
                    <div class="manage_nameAndLayout">
                        <span class="manage_name">欢迎您，{{username}}！</span> <!--{{username}}-->
                        <span class="manage_layout" @click="handleLayout">
                            <img class="manage-menu_icon" src="../assets/images/manage_layout.png" />
                             <em>退出</em>
                        </span>
                    </div>
                </div>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>

    export default {
        data() {
            return {
                username: this.$store.state.adminObj.username
            };
        },
        mounted(){
            this.username = window.sessionStorage.user
        },
        methods: {
            handleLayout () {
                this.$confirm('是否要退出系统?', '退出提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 1. 删除token
                    this.logoutMuta();
                    // 2. 跳转到登陆
                    this.$router.push('login')
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                }).catch(() => {

                });
            },

        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},

    }
</script>

<style lang="less" scoped>
    @import "../assets/css/mixin.less";
    .manage_title {
      color: #409EFF;  font-size: 20px;  line-height: 60px;width: 100%;
      background-color: #192433;padding-left: 25px;box-sizing: border-box;
        text-align: center;
      img {
        width: 26px;
        vertical-align: middle;
        margin-right: 0px;
        font-size: 24px;
        }
      i {
        vertical-align: middle;
        color: #5b9fff;
        font-size: 19px;
        }
    }
    .manage_nameAndLayout{position:absolute;right:30px;top:20px;color:#fff;}
    .manage&_name{margin-right:30px;}
    .manage&_layout{
      cursor:pointer;color:#fff;
      em{font-style: normal;}
      img{vertical-align: -5px;
          width: 20px;height:20px;}
    }
    /deep/ .el-menu{width:100%;height:100%;}
    /deep/ .el-menu li{border-bottom: 1px solid #3c4d67;font-size:16px;}
    /deep/ .el-submenu__title{font-size:16px;padding-left:35px;color:#fff;}
    /deep/ li>.el-menu li{
        border:0;font-size:14px;border-left:3px solid transparent;
        padding-left: 45px !important;background-color:rgba(255,255,255,.1) !important
    }
    /deep/ li>.el-menu li:hover{background-color:rgba(255,255,255, .2) !important}
    /deep/ .el-menu-item{border-left:3px solid transparent;}
    /deep/ .el-submenu [class^=el-icon-] {
        vertical-align: -1px;
    }
    .manage-menu_icon{width:16px;}
    /deep/ .el-menu-item i{color:#fff;}
    /deep/ .el-menu-item.is-active{border-left:3px solid #409EFF;}
    /deep/ .el-menu-item.is-active i{color:#409EFF;}
    /deep/ .el-submenu__title i{color:#fff;}
</style>
