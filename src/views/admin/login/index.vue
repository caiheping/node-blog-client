<template>
  <div class="login">
    <div class="bg">
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
    <div class="main">
      <h3>Login</h3>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input v-model.number="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="80px">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="bottom">
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { loginApi } from '../../api/login'

export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      loginForm: {
        password: '',
        username: ''
      },
      rules: {
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        username: [{ required: true, validator: checkName, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      let _this = this
      this.$router.push('/adminLayout/adminHome')
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     loginApi(this.loginForm).then(res => {
      //       if (res.code === 0) {
      //         let userInfo = {
      //           username: res.data.username,
      //           userId: res.data.id,
      //           avator: res.data.avator
      //         }
      //         sessionStorage.setItem('token', res.token)
      //         sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      //         _this.$router.push('/adminLayout/adminHome')
      //       }
      //     })
      //   } else {
      //     return false
      //   }
      // })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100vw);
    height: calc(100vh);
    background: url("../../../static/img/login-bg.jpg") no-repeat;
    background-size: 100%;
    .bg{
      position: fixed;
      height: calc(100vh);
      width: calc(100vw);
      div{
        width: 100%;
        height: 100%;
      }
    }
    .main{
      width: 450px;
      overflow: hidden;
      box-shadow: 0px 0 10px #bebebe;
      box-sizing: border-box;
      padding: 10px 25px 10px 10px;
      border-radius: 4px;
      background: rgba(0,0,0,.6);
      z-index: 999;
      h3{
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: center;
        color: #ccc;
      }
      .bottom{
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }
    }
  }
</style>
