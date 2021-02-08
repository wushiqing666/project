<template>
  <div class="login-wrapper" :style="'background-image:url('+ Background3 +')'">
    <div>
      <img class="logo" src="../assets/img/logo3.png" alt="icon">
    </div>
    <div class="form-box">
      <div class="form-title">
        <p>智慧资助管理服务平台</p>
      </div>
      <el-form ref="loginForm" :rules="loginRules" :model="loginForm" label-width="50px" class="login-form">
        <el-form-item class="formitem" label="学段" prop="xd">
          <el-select v-model="loginForm.xd" auto-complete="off" placeholder="请选择">
            <el-option  label="大学"  value="大学"></el-option>
            <el-option  label="高中"  value="高中"></el-option>
            <el-option  label="初中"  value="初中"></el-option>
            <el-option  label="小学"  value="小学"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="formitem" label="账户" prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="请输入学号或身份证号码"/>
        </el-form-item>
        <el-form-item class="formitem" label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <el-form-item>
          <span style="float:right;color:#999999;font-size:14px;cursor:pointer">忘记密码？</span>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            <span v-if="!loading" style="font-size:18px">登 录</span>
            <span v-else style="font-size:18px">登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../api/login'
import { setToken } from '../utils/cookie'
import Background from '../assets/img/login-background.jpg'
import Background3 from '../assets/img/login-background3.png'
export default {
  name: 'Login',
  data() {
    return {
      Background,
      Background3,
      loginForm: {
        xd:'',
        username: '',
        password: '',
        rememberMe: true
      },
      loginRules: {
        xd: [{ required: true, trigger: 'change', message: '学段不能为空' }],
        username: [{ required: true, trigger: 'change', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'change', message: '密码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const data = {
          username: this.loginForm.username,
          password: this.loginForm.password
        }
        if (valid) {
          this.loading = true
          this.loading = false
          setToken('123')
          this.$router.push({ path: this.redirect || '/' })
          // login(data).then(res => {
          //   this.loading = false
          //   setToken(res.token)
          //   this.$router.push({ path: this.redirect || '/' })
          // }).catch(() => {
          //   this.loading = false
          // })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  background-size: cover;
  .logo{
    position: absolute;
    width: 372px;
    height: 68px;
    top:41px;
    left: 68px;
    img{
      width: 372px;
      height: 68px;
    }

  }
  .form-box {
    position: absolute;
    top: 219px;
    right: 246px;
    width: 420px;
    height: 430px;
    box-sizing: border-box;
    padding: 35px 58px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 1, .1);
    .formitem{
      border-bottom: 1px solid #EAEAEF;
    }
    .el-input__inner{
      border: none;
    }
    .form-title {
      margin: 0 auto 35px;
      text-align: center;
      color: #707070;
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #222222;
    }
  }
}
</style>
