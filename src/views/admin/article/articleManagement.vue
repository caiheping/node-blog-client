<template>
  <div class="articleManagement">
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="closeDialog" class="dialog">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" :label-width="formLabelWidth" prop="title">
          <el-upload
            action="http://www.baidu.com"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :show-file-list="false">
            <el-button type="primary">上传图片</el-button>
          </el-upload>
          <img :src="form.cover_photo" alt="">
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="python" value="1"></el-option>
            <el-option label="java" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <tinymce-editor ref="tinymce" :data="form.content"></tinymce-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
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
          prop="time"
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import TinymceEditor from '../../../components/tinymce-editor/index'
import { rules } from '@/utils/validate'
export default {
  components: { TinymceEditor },
  data () {
    return {
      currentPage: 5,
      fromObj: {
        title: '',
        typeName: ''
      },
      tableData: [{
        title: 'Python 深度学习脚手架 ModelZoo',
        content: '想必大家都或多或少听过 TensorFlow 的大名，这是 Google 开源的一个深度学习框架，里面的模型和 API 可以说基本是一应俱全，但 TensorFlow 其实有很多让人吐槽的地方，比如 TensorFlow 早期是只支持静态图的，你要调试和查看变量的值的话就得一个个',
        type: 'python',
        cover_photo: '',
        browse: 55,
        love: 45,
        time: '2013-10-14 18:21:23'
      }],
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
        title: '',
        cover_photo: require('../../../static/img/avater.jpg'),
        content: '本地图片上传功能仅为演示，实际使用需要补全图片存储地址',
        type: ''
      }
    }
  },
  methods: {
    // 上传成功
    uploadSuccess (response, file, fileList) {
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      // this.getDatas()
    },
    // 上传失败
    uploadError (err, file, fileList) {
      this.$message({
        type: 'error',
        message: '上传失败'
      })
      console.log(err)
    },
    submit () {
      console.log(this.$refs.tinymce.content)
      this.dialogFormVisible = false
    },
    closeDialog () {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
    },
    add () {
      this.dialogFormVisible = true
    },
    edit (row) {
      console.log(row)
    },
    del (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
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
