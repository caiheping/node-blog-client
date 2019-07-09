<template>
  <div class="friendshipLinks">
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeDialog" class="dialog">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="图片索引" :label-width="formLabelWidth" prop="index">
          <el-input v-model="form.index" autocomplete="off" placeholder="请输入图片索引，如：1"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth" prop="url">
          <el-upload
            :action="uploadUrl"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :show-file-list="false">
            <el-button type="primary">上传图片</el-button>
          </el-upload>
          <img :src="form.url" alt="">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <el-form :inline="true" :model="fromObj">
        <el-form-item label="图片索引">
          <el-input v-model="fromObj.index" placeholder="请输入图片索引"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="right">
        <el-button type="primary" @click="add">新增</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        :lazy="true"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          prop="index"
          align="center"
          label="图片索引">
        </el-table-column>
        <el-table-column
          prop="url"
          align="center"
          label="链接地址">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" class="edit">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" class="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { rules } from '@/utils/validate'
import { findBanner, addBanner, deleteBanner, updateBanner } from '../../../api/admin/other'
export default {
  data () {
    return {
      uploadUrl: '/uploadImg',
      title: '新增',
      fromObj: {
        index: ''
      },
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      rules: {
        index: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入索引' }
        ],
        url: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入url地址' }
        ]
      },
      form: {
        id: null,
        index: '',
        url: ''
      }
    }
  },
  methods: {
    // 上传成功
    uploadSuccess (response, file, fileList) {
      this.form.url = response.data.url
      console.log(response)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    // 上传失败
    uploadError (err, file, fileList) {
      this.$message({
        type: 'error',
        message: '上传失败'
      })
      console.log(err)
    },
    closeDialog () {
      this.$refs.form.clearValidate()
      this.form = {
        id: null,
        index: '',
        url: ''
      }
    },
    submit (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let query = {
            url: _this.form.url,
            index: _this.form.index
          }
          if (_this.form.id) {
            query.id = _this.form.id
            updateBanner(query).then(res => {
              console.log(res)
              if (res.code === 0) {
                _this.$message({
                  type: 'success',
                  message: res.data
                })
              }
              _this.getDatas()
            })
          } else {
            query.u_id = JSON.parse(sessionStorage.getItem('userInfo')).id
            addBanner(query).then(res => {
              console.log(res)
              if (res.code === 0) {
                _this.$message({
                  type: 'success',
                  message: res.data
                })
              }
              _this.getDatas()
            })
          }
          _this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    getDatas () {
      let query = {
        u_id: JSON.parse(sessionStorage.getItem('userInfo')).id
      }
      findBanner(query).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    add () {
      this.form.id = null
      this.title = '新增'
      this.dialogFormVisible = true
    },
    edit (row) {
      this.form.id = row.id
      this.title = '修改'
      this.form.index = row.index
      this.form.url = row.url
      this.dialogFormVisible = true
    },
    del (row) {
      let _this = this
      this.$confirm('是否继续删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBanner({ id: row.id }).then(res => {
          if (res.code === 0) {
            _this.$message({
              type: 'success',
              message: res.data
            })
            _this.getDatas()
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
    this.getDatas()
  }
}
</script>

<style scoped lang="less">
  .friendshipLinks{
    .dialog{
      img{
        width: 200px;
        margin-top: 20px;
      }
    }
    padding: 30px;
    box-sizing: border-box;
    .top{
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .content{
      overflow: auto;
      margin-bottom: 50px;
    }
    .page{
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      height: 50px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 999;
    }
  }
</style>
