<template>
  <div class="friendshipLinks">
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="closeDialog" class="dialog">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="图片索引" :label-width="formLabelWidth" prop="index">
          <el-input v-model="form.index" autocomplete="off" placeholder="请输入图片索引，如：1"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth" prop="url">
          <el-upload
            action="http://www.baidu.com"
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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
export default {
  data () {
    return {
      fromObj: {
        index: ''
      },
      tableData: [{
        index: '2',
        url: 'http://www.baidu.com'
      }],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      rules: {
        index: [
          { required: true, validator: rules.validPwd, trigger: 'blur', message: '请输入索引' }
        ],
        url: [
          { required: true, validator: rules.validPwd, trigger: 'blur', message: '请输入url地址' }
        ]
      },
      form: {
        index: '',
        url: require('../../../static/img/avater.jpg')
      }
    }
  },
  methods: {
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
    }
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
