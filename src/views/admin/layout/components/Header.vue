<template>
  <div class="header">
    <div class="logo">
      <span>{{title}}</span>
    </div>
    <div class="user">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userInfo.username || '未登录'}}
          <img src="../../../../static/img/avater.jpg" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/login">退出登陆</el-dropdown-item>
          <el-dropdown-item command="setting">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--  修改密码弹窗  -->
    <el-dialog title="修改密码" width="450px" :center="true" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
        <el-form-item label="原始密码" prop="originPwd">
          <el-input type="password" v-model="form.originPwd" placeholder="请输入原始密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="form.newPwd" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="reNewPwd">
          <el-input type="password" v-model="form.reNewPwd" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!--  修改密码弹窗  -->
  </div>
</template>

<script>
import { rules } from '@/utils/validate'
import { updatePwd } from '../../../../api/admin/user'
export default {
  props: {
    title: {
      type: String,
      default: '后台管理系统'
    }
  },
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : '',
      dialogFormVisible: false,
      rules: {
        newPwd: [
          { required: true, validator: rules.string, trigger: 'blur' }
        ],
        reNewPwd: [
          { required: true, validator: rules.string, trigger: 'blur' }
        ],
        originPwd: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ]
      },
      form: {
        originPwd: '',
        newPwd: '',
        reNewPwd: ''
      },
      formLabelWidth: '85px'
    }
  },
  methods: {
    // 提交修改密码表单
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let query = {
            originPwd: _this.form.originPwd,
            newPwd: _this.form.newPwd,
            id: JSON.parse(sessionStorage.getItem('userInfo')).id
          }
          console.log(_this.form)
          updatePwd(query).then(res => {
            console.log(res)
          })
          this.dialogFormVisible = false
          // this.$refs[formName].resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消修改密码
    cancel (formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    handleCommand (command) {
      if (command === '/login') {
        this.$router.replace('/login')
        sessionStorage.clear()
      } else {
        this.dialogFormVisible = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .header{
    height: 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        display: block;
        color: #fff;
        margin: 0 10px;
        font-size: 24px;
      }
    }
    .user{
      cursor: pointer;
      span{
        color: #fff;
        margin: 0 10px;
        display: flex;
        align-items: center;
        img{
          margin: 0 10px;
          height: 36px;
          width: 36px;
          border-radius: 50%;
        }
      }
    }
  }
</style>
