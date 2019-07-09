<template>
  <div class="introduction">
    <div class="avatar">
      <img :src="formObj.avatar" alt="">
      <el-upload
        :action="uploadUrl"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :show-file-list="false">
        <el-button type="primary">上传头像</el-button>
      </el-upload>
    </div>
    <el-form label-width="100px" :model="formObj">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formObj.nickname" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="座右铭" prop="motto">
        <el-input v-model="formObj.motto" placeholder="请输入座右铭"></el-input>
      </el-form-item>
      <el-form-item label="个人兴趣" prop="hobby">
        <el-input v-model="formObj.hobby" placeholder="请输入个人兴趣"></el-input>
      </el-form-item>
      <el-form-item label="github" prop="github">
        <el-input v-model="formObj.github" placeholder="请输入github地址"></el-input>
      </el-form-item>
      <el-form-item label="qq" prop="qq">
        <el-input v-model="formObj.qq" placeholder="请输入qq号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formObj.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="wechat">
        <el-input v-model="formObj.wechat" placeholder="请输入微信号码"></el-input>
      </el-form-item>
      <el-form-item label="微博" prop="weibo">
        <el-input v-model="formObj.weibo" placeholder="请输入微博"></el-input>
      </el-form-item>
      <el-form-item label="RSS" prop="RSS">
        <el-input v-model="formObj.RSS" placeholder="请输入RSS"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="updateUser">保存</el-button>
    <div class="skill">
      <h3>我的技能树</h3>
      <ul>
        <li v-for="(item, index) in skillArr" :key="index">
          <div class="item">
            <div>
              <span>技能名称:</span>
              <el-input v-model="item.skill" disabled></el-input>
            </div>
            <div>
              <span>技能熟练度:</span>
              <el-input v-model="item.proficiency" disabled></el-input>
            </div>
            <el-button @click="editSkill(item)">编辑技能</el-button>
            <el-button type="primary" @click="addSkill" v-if="index===0">新增技能</el-button>
            <el-button type="danger" @click="delSkill(item)" v-else>删除技能</el-button>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog title="新增技能" :visible.sync="dialogFormVisible" @close="closeDialog" width="500px">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入技能名称"></el-input>
        </el-form-item>
        <el-form-item label="熟练度" :label-width="formLabelWidth" prop="proficiency">
          <el-input v-model="form.proficiency" autocomplete="off" placeholder="请输入技能熟练度"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rules } from '@/utils/validate'
import { updateUserInfo, findSkill, addSkill, deleteSkill, updateSkill } from '../../../api/admin/user'
export default {
  data () {
    return {
      title: '新增',
      uploadUrl: '/uploadImg',
      skillArr: [
        {
          skill: '',
          proficiency: ''
        }
      ],
      formObj: {
        id: '',
        avatar: '',
        nickname: '',
        motto: '',
        hobby: '',
        github: '',
        qq: '',
        email: '',
        wechat: '',
        weibo: '',
        RSS: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '80px',
      rules: {
        title: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入技能' }
        ],
        proficiency: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入技能熟练度' }
        ]
      },
      form: {
        id: null,
        title: '',
        proficiency: ''
      }
    }
  },
  methods: {
    // 上传成功
    uploadSuccess (response, file, fileList) {
      this.formObj.avatar = response.data.url
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    // 上传失败
    uploadError (err, file, fileList) {
      this.$message({
        type: 'error',
        message: err.message
      })
    },
    submit (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let query = {
            skill: _this.form.title,
            proficiency: _this.form.proficiency
          }
          if (_this.form.id) {
            query.id = _this.form.id
            updateSkill(query).then(res => {
              console.log(res)
              if (res.code === 0) {
                _this.$message({
                  type: 'success',
                  message: res.data
                })
              }
              _this.getSkill()
            })
          } else {
            query.u_id = JSON.parse(sessionStorage.getItem('userInfo')).id
            addSkill(query).then(res => {
              console.log(res)
              if (res.code === 0) {
                _this.$message({
                  type: 'success',
                  message: res.data
                })
              }
              _this.getSkill()
            })
          }
          _this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    getSkill () {
      let query = {
        u_id: JSON.parse(sessionStorage.getItem('userInfo')).id
      }
      findSkill(query).then(res => {
        console.log(res)
        if (res.data.length) {
          let arr = []
          res.data.forEach(item => {
            arr.push({
              skill: item.skill,
              proficiency: item.proficiency
            })
          })
          this.skillArr = arr
        }
      })
    },
    updateUser () {
      updateUserInfo(this.formObj).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: res.data
          })
          let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
          for (let k in this.formObj) {
            userInfo[k] = this.formObj[k]
          }
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
      })
    },
    closeDialog () {
      this.$refs.form.clearValidate()
      this.form = {
        id: null,
        title: '',
        proficiency: ''
      }
    },
    addSkill () {
      this.form.id = null
      this.title = '新增'
      this.dialogFormVisible = true
    },
    editSkill (row) {
      console.log(row)
      this.form.id = row.id
      this.title = '修改'
      this.form.title = row.skill
      this.form.proficiency = row.proficiency
      this.dialogFormVisible = true
    },
    delSkill (row) {
      let _this = this
      this.$confirm('是否继续删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSkill({ id: row.id }).then(res => {
          if (res.code === 0) {
            _this.$message({
              type: 'success',
              message: res.data
            })
            _this.getSkill()
          }
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.uploadUrl = this.baseUrl + this.uploadUrl
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    for (let k in this.formObj) {
      this.formObj[k] = userInfo[k]
    }
    this.getSkill()
  }
}
</script>

<style scoped lang="less">
  .introduction{
    padding: 30px;
    box-sizing: border-box;
    .avatar{
      margin: 0 auto 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        display: block;
        width: 200px;
        margin-bottom: 20px;
        border-radius: 5px;
      }
    }
    .skill{
      position: relative;
      margin-top: 20px;
      h3{
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        margin-bottom: 20px;
      }
      ul{
        li{
          margin-bottom: 20px;
          .item{
            display: flex;
            div{
              display: flex;
              align-items: center;
              margin: 0 10px;
              span{
                padding: 0 5px;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
</style>
