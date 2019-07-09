<template>
  <div class="articleManagement">
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="closeDialog" class="dialog">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" :label-width="formLabelWidth" prop="title">
          <el-upload
            :action="uploadUrl"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :show-file-list="false">
            <el-button type="primary">上传图片</el-button>
          </el-upload>
          <img :src="form.cover_photo" alt="">
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option :label="item.title" :value="item.title" v-for="item in typeArr" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <tinymce-editor ref="tinymce" :data="form.content"></tinymce-editor>
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
          <el-input v-model="fromObj.typeName" placeholder="请输入类型"></el-input>
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
          prop="title"
          align="center"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="内容">
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
import { findArticle, addArticle, deleteArticle, updateArticle } from '../../../api/admin/article'
import { findArticleAllType } from '../../../api/admin/article'
export default {
  components: { TinymceEditor },
  data () {
    return {
      uploadUrl: '/uploadImg',
      title: '新增',
      total: 0,
      currentPage: 1,
      pageSize: 10,
      fromObj: {
        title: '',
        typeName: ''
      },
      typeArr: [],
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        title: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入标题' }
        ],
        content: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入内容' }
        ],
        type: [
          { required: true, validator: rules.string, trigger: 'change', message: '请选择类型' }
        ]
      },
      form: {
        id: null,
        title: '',
        cover_photo: require('../../../static/img/avater.jpg'),
        content: '本地图片上传功能仅为演示，实际使用需要补全图片存储地址',
        type: ''
      },
      findQuery: {
        u_id: JSON.parse(sessionStorage.getItem('userInfo')).id,
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    // 上传成功
    uploadSuccess (response, file, fileList) {
      this.form.cover_photo = response.data.url
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
    submit (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(_this.$refs.tinymce.content)
          let query = {
            title: _this.form.title,
            content: _this.$refs.tinymce.content,
            type: _this.form.type,
            cover_photo: _this.form.cover_photo
          }
          if (_this.form.id) {
            query.id = _this.form.id
            updateArticle(query).then(res => {
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
            addArticle(query).then(res => {
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
      this.$refs.form.clearValidate()
      this.form = {
        id: null,
        title: '',
        cover_photo: require('../../../static/img/avater.jpg'),
        content: '本地图片上传功能仅为演示，实际使用需要补全图片存储地址',
        type: ''
      }
    },
    getTypes () {
      findArticleAllType().then(res => {
        console.log(res)
        if (res.code === 0) {
          this.typeArr = res.data
        }
      })
    },
    getDatas () {
      findArticle(this.findQuery).then(res => {
        res.data.forEach(item => {
          item.browse = item.Ips.length
          item.love = item.Ips.filter(list => list.is_love !== 0).length
        })
        this.tableData = res.data
        this.total = res.count
      })
    },
    add () {
      this.form.id = null
      this.title = '新增'
      this.dialogFormVisible = true
    },
    edit (row) {
      console.log(row)
      this.form.id = row.id
      this.title = '修改'
      this.form.type = row.type
      this.form.title = row.title
      this.form.cover_photo = row.cover_photo
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
        width: 200px;
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
  }
</style>
