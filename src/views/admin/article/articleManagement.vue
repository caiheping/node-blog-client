<template>
  <div class="articleManagement">
    <el-dialog title="新增" v-if="dialogFormVisible" :visible.sync="dialogFormVisible" @close="closeDialog" class="dialog">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="前言" :label-width="formLabelWidth" prop="preface">
          <el-input v-model="form.preface" type="textarea" autocomplete="off" placeholder="请输入前言"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" :label-width="formLabelWidth" prop="cover_photo">
          <el-upload
            :action="uploadUrl"
            :on-change="handleChange"
            :show-file-list="false"
            list-type="picture"
            :auto-upload="false">
            <img v-if="uploadObj.cover_photo" :src="uploadObj.cover_photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input v-model="form.cover_photo" style="display: none;" disabled></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option :label="item.title" :value="item.title" v-for="item in typeArr" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <el-input v-model="form.content" style="display: none;" disabled></el-input>
          <tinymce-editor ref="tinymce" :data="form.content" @textChange="contentChange"></tinymce-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <el-form :inline="true" :model="fromObj">
        <el-form-item label="标题">
          <el-input v-model="fromObj.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="fromObj.type" placeholder="请选择类型">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.title" :value="item.title" v-for="item in typeArr" :key="item.id"></el-option>
          </el-select>
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
          prop="title"
          align="center"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="preface"
          align="center"
          label="前言">
        </el-table-column>
        <el-table-column
          prop="cover_photo"
          align="center"
          label="封面图片">
          <template slot-scope="scope">
            <img :src="scope.row.cover_photo" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="类型"
          width="150">
        </el-table-column>
          <el-table-column
          prop="browse"
          align="center"
          label="浏览量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="love"
          align="center"
          label="喜欢人数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          align="center"
          label="时间"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" class="edit">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" class="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import TinymceEditor from '../../../components/tinymce-editor/index'
import { rules } from '@/utils/validate'
import { findArticle, addArticle, deleteArticle, updateArticle, findArticleType } from '../../../api/admin/article'
import moment from 'moment'
export default {
  components: { TinymceEditor },
  data () {
    return {
      uploadObj: {
        file: null,
        cover_photo: null
      },
      uploadUrl: '/uploadImg',
      title: '新增',
      total: 0,
      currentPage: 1,
      pageSize: 10,
      fromObj: {
        title: '',
        type: ''
      },
      typeArr: [],
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        title: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入标题' }
        ],
        preface: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入前言' }
        ],
        cover_photo: [
          { required: true, validator: rules.string, trigger: 'change', message: '请上传封面图' }
        ],
        content: [
          { required: true, validator: rules.string, trigger: 'change', message: '请输入内容' }
        ],
        type: [
          { required: true, validator: rules.string, trigger: 'change', message: '请选择类型' }
        ]
      },
      form: {
        id: null,
        title: '',
        preface: '',
        cover_photo: '',
        content: '',
        type: ''
      },
      findQuery: {
        u_id: JSON.parse(sessionStorage.getItem('userInfo')).id,
        type: null,
        title: null,
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    contentChange (val) {
      this.form.content = val
    },
    handleChange (file, fileList) {
      console.log(file)
      this.uploadObj.cover_photo = file.url
      this.form.cover_photo = file.url
      this.uploadObj.file = file.raw
    },
    // 上传成功
    uploadSuccess (response, file, fileList) {
      this.cover_photo = response.data.url
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
    find () {
      this.findQuery.type = this.fromObj.type
      this.findQuery.title = this.fromObj.title
      this.getDatas()
    },
    submit (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = new FormData()
          formData.append('file', _this.uploadObj.file)
          formData.append('title', _this.form.title)
          formData.append('preface', _this.form.preface)
          formData.append('content', _this.$refs.tinymce.content)
          formData.append('type', _this.form.type)
          if (_this.form.id) {
            formData.append('id', _this.form.id)
            updateArticle(formData).then(res => {
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
            addArticle(formData).then(res => {
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
    closeDialog () {
      this.$refs.form.resetFields()
    },
    getTypes () {
      findArticleType({ u_id: JSON.parse(sessionStorage.getItem('userInfo')).id }).then(res => {
        if (res.code === 0) {
          this.typeArr = res.data
        }
        this.form.type = this.typeArr[0].title
        console.log(this.form)
      })
    },
    getDatas () {
      findArticle(this.findQuery).then(res => {
        res.data.forEach(item => {
          item.createdAt = moment(item.createdAt).format('YYYY-MM-DD')
        })
        this.tableData = res.data
        this.total = res.count
      })
    },
    add () {
      this.form.id = null
      this.title = '新增'
      this.uploadObj.cover_photo = null
      this.dialogFormVisible = true
    },
    edit (row) {
      console.log(row)
      this.form.id = row.id
      this.title = '修改'
      this.form.type = row.type
      this.form.title = row.title
      this.form.preface = row.preface
      this.uploadObj.cover_photo = row.cover_photo
      this.form.content = row.content
      this.dialogFormVisible = true
    },
    del (row) {
      let _this = this
      this.$confirm('是否继续删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle({ id: row.id }).then(res => {
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
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.findQuery.limit = val
      this.getDatas()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.findQuery.page = val
      this.getDatas()
    }
  },
  mounted () {
    this.uploadUrl = this.baseUrl + this.uploadUrl
    this.getDatas()
    this.getTypes()
  }
}
</script>

<style scoped lang="less">
  .articleManagement{
    padding: 30px;
    box-sizing: border-box;
    .dialog{
      img{
        width: 200px;
        margin: 20px 0 0;
      }
    }
    .top{
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .content{
      overflow: auto;
      margin-bottom: 50px;
      img{
        width: 100%;
      }
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
