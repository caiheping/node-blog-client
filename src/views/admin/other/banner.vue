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
            :on-change="handleChange"
            :show-file-list="false"
            list-type="picture"
            :auto-upload="false">
            <img v-if="uploadObj.url" :src="uploadObj.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input v-model="form.url" style="display: none;" disabled></el-input>
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
          <el-button type="primary" @click="find">查询</el-button>
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
          label="图片索引"
          width="100">
        </el-table-column>
        <el-table-column
          prop="url"
          align="center"
          label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="">
          </template>
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
      uploadObj: {
        file: null,
        url: null
      },
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
          { required: true, validator: rules.number, trigger: 'blur', message: '请输入索引' }
        ],
        url: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入url地址' }
        ]
      },
      form: {
        id: null,
        index: '',
        url: ''
      },
      findQuery: {
        u_id: JSON.parse(sessionStorage.getItem('userInfo')).id,
        index: null
      }
    }
  },
  methods: {
    handleChange (file, fileList) {
      console.log(file)
      this.uploadObj.url = file.url
      this.form.url = file.url
      this.uploadObj.file = file.raw
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
          let formData = new FormData()
          formData.append('file', _this.uploadObj.file)
          formData.append('index', _this.form.index)
          if (_this.form.id) {
            formData.append('id', _this.form.id)
            updateBanner(formData).then(res => {
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
            formData.append('u_id', JSON.parse(sessionStorage.getItem('userInfo')).id)
            addBanner(formData).then(res => {
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
    find () {
      this.findQuery.index = this.fromObj.index
      this.getDatas()
    },
    getDatas () {
      findBanner(this.findQuery).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    add () {
      this.form.id = null
      this.title = '新增'
      this.uploadObj.url = null
      this.dialogFormVisible = true
    },
    edit (row) {
      console.log(row)
      this.form.id = row.id
      this.title = '修改'
      this.form.index = row.index
      this.uploadObj.url = row.url
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

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 125px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100%;
      display: block;
    }
  }
</style>
