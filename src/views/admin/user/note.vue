<template>
  <div class="note">
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="closeDialog">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <el-input v-model="form.content" type="textarea" :rows="3" autocomplete="off" placeholder="请输入内容"></el-input>
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
          prop="content"
          align="center"
          label="内容">
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
          width="120">
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
import { rules } from '@/utils/validate'
import { findNote, addNote, deleteNote, updateNote } from '../../../api/admin/user'
import moment from 'moment'
export default {
  data () {
    return {
      title: '新增',
      total: 0,
      currentPage: 1,
      pageSize: 10,
      fromObj: {
        title: ''
      },
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        title: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入标题' }
        ],
        content: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入内容' }
        ]
      },
      form: {
        id: null,
        title: '',
        content: ''
      },
      findQuery: {
        u_id: JSON.parse(sessionStorage.getItem('userInfo')).id,
        title: null,
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    closeDialog () {
      this.$refs.form.clearValidate()
      this.form = {
        id: null,
        title: '',
        content: ''
      }
    },
    find () {
      this.findQuery.title = this.fromObj.title
      this.getDatas()
    },
    getDatas () {
      findNote(this.findQuery).then(res => {
        res.data.forEach(item => {
          item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        })
        this.tableData = res.data
        this.total = res.count
      })
    },
    submit (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let query = {
            title: _this.form.title,
            content: _this.form.content
          }
          if (_this.form.id) {
            query.id = _this.form.id
            updateNote(query).then(res => {
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
            addNote(query).then(res => {
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
    add () {
      this.form.id = null
      this.title = '新增'
      this.dialogFormVisible = true
    },
    edit (row) {
      this.form.id = row.id
      this.title = '修改'
      this.form.title = row.title
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
        deleteNote({ id: row.id }).then(res => {
          if (res.code === 0) {
            _this.$message({
              type: 'success',
              message: res.data
            })
            if (this.findQuery.page > 1) {
              this.currentPage -= 1
              this.findQuery.page -= 1
            }
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
    this.getDatas()
  }
}
</script>

<style scoped lang="less">
  .note{
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
