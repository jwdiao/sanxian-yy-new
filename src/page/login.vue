<template>
    <div class="login_page fillcontain bg">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="manage_tip">
                    <img src="../assets/images/logo.png" alt="">
                    <p style="text-shadow: 1px 1px 0px #39205f6b;">三现运营管理系统</p>
                </div>
                <el-form ref="loginForm" :model="loginData" :rules="rules" style="margin-top: 20px;">
                    <el-form-item prop="username">
                        <i></i>
                        <el-input placeholder="请输入登录账号" v-model="loginData.username"><span></span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <i></i>
                        <el-input type="password" v-model="loginData.password" placeholder="请输入登录密码" @keyup.enter.native="login()"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :plain="true" class="submit_btn" @click="login()">登 &nbsp; 录</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import $http from '../api/http'
    export default {
        data(){
            return{
                loginData: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            ...mapActions([
                'loginAction'
            ]),

            /*函数名：loginSytstem
             参数：无
             描述：登录请求
            */
            loginSytstem(){
                const {userName,pwd} = this
                if(!/^[1][0-9]{10}$/.test(userName) && !/^[a-zA-Z]{3,20}$/.test(userName)){
                    this.$message({
                        message: '请输入正确用户名/手机号',
                        type: 'warning',
                    })
                }else if(!/^[0-9a-zA-Z]{6,20}$/.test(pwd)){
                    this.$message({
                        message: '输入正确密码格式',
                        type: 'warning',
                    });
                }else{
                    this.$router.replace('/manage')
                }
            },
            async login () {
                this.$refs.loginForm.validate(async (valid) => {
                    if (!valid) return;
                    // debugger
                    const {username, password} = this.loginData
                    let loginStatus = false
                    if (username === 'syzj' && password === '123456') {
                        loginStatus = true
                    }
                    if (username === 'admin' && password === '123456') {
                        loginStatus = true
                    }
                    if (!loginStatus) {
                        this.$message({
                            type: 'error',
                            message: '用户名或密码错误！'
                        })
                        return false
                    }
                    /* const res = await this.$http.post('/login', this.formData);
            const data = res.data;
            if (data.meta.status === '200') {
              this.$message({
                type: 'success',
                message: '登陆成功!'
              }); */
                    let user = {
                        username: username,
                        // password: password,
                        token: '789789'
                    }
                    // 登陆成功，把token记录到session存储中
                    this.loginAction(user)
                    this.$router.push('/manage')
                    /* } else {
              this.$message({
                type: 'error',
                message: data.meta.msg
              })
            } */
                });
            },
            async loginMethods () {
                // const res = await http.post('/login', params)

                // const {username, pwd} =
                // sessionStorage.setItem('username',)
            }
        }
    }
</script>
<style scoped>
    /deep/ .el-input{
        text-align: right;
        border-radius: 5px;
        background-size: 20px;
        border: 1px solid #0e336a;
    }
    .el-form .el-form-item {
        background: rgba(3, 25, 58, 0.95);
    }
    .el-form .el-form-item i {
        width: calc(16% - 10px);
        background: #fff;
        position: absolute;
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
        height: calc(100% - 2px);
        left: 1px;
        top: 1px;
    }
    /deep/ .el-form .el-form-item:nth-child(1) i{
        background: #fff url("../assets/images/account.png") no-repeat 10px center;
    }
    /deep/ .el-form .el-form-item:nth-child(2) i{
        background: #fff url("../assets/images/password.png") no-repeat 10px center;
    }
    /deep/ .el-input__inner {
        background: none;
        width: 88%;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        color: #fff;
        border: 1px solid rgba(3, 25, 58, 0.1);
    }
    /deep/ .el-button--primary.is-plain {
        color: #fff;
        background: #0592e0;
        border-color: #058bd5;
    }
</style>
<style lang="less">
    @import "../assets/css/mixin.less";
    .login_page{
        background-color: #324057;
    }
    .manage_tip{
        text-align: center;
        img {
            width: 50px;
            height: auto;
            margin-bottom: 10px;
        }
        p{
            font-size: 23px;
            color: #fff;
            font-weight: 300;
        }
    }
    .bg {
        background: url("../assets/images/login_bg.jpg") no-repeat;
        background-position: center;
        background-size: cover;
    }
    .form_contianer{
        .wh(300px, 300px);
        .ctp(300px, 300px);
        padding: 25px;
        margin-top: -242px;
        margin-left: -188px;
        border-radius: 5px;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(77, 118, 194, 0.4);
        box-shadow: 17px 13px 40px rgba(3, 29, 68, 0.42);
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
        font-size: 14px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
    .el-message{  // 调整跳出框的显示位置
        top: 62%;
        left: 51.3%;
    }
</style>
