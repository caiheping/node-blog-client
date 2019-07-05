<template>
  <div class="introduction">
    <div class="avatar">
      <img src="../../../static/img/avater.jpg" alt="">
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
        <el-input v-model="formObj.name" placeholder="请输入名称"></el-input>
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
        <el-input v-model="formObj.rss" placeholder="请输入RSS"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary">保存</el-button>
    <div class="skill">
      <h3>我的技能树</h3>
      <ul>
        <li v-for="(item, index) in skillArr" :key="index">
          <div class="item">
            <div>
              <span>技能名称:</span>
              <el-input v-model="item.skillName" disabled></el-input>
            </div>
            <div>
              <span>技能熟练度:</span>
              <el-input v-model="item.proficiency" disabled></el-input>
            </div>
            <el-button @click="addSkill">编辑技能</el-button>
            <el-button type="primary" @click="addSkill" v-if="index===0">新增技能</el-button>
            <el-button type="danger" @click="addSkill" v-else>删除技能</el-button>
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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rules } from '@/utils/validate'
export default {
  data () {
    return {
      uploadUrl: '/exam/student/download',
      skillArr: [
        {
          skillName: '',
          proficiency: ''
        },
        {
          skillName: '',
          proficiency: ''
        }
      ],
      formObj: {
        url: '../../../static/img/avater.jpg',
        name: '',
        motto: '',
        hobby: '',
        github: '',
        qq: '',
        email: '',
        wechat: '',
        weibo: '',
        rss: ''
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
        title: '',
        proficiency: ''
      }
    }
  },
  methods: {
    // 上传成功
    uploadSuccess (response, file, fileList) {
      this.$message({
        type: 'success',
        message: response.message
      })
      this.getDatas()
    },
    // 上传失败
    uploadError (err, file, fileList) {
      this.$message({
        type: 'error',
        message: err.message
      })
    },
    closeDialog () {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
    },
    addSkill () {
      this.dialogFormVisible = true
    }
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
