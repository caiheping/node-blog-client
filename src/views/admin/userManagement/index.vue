<template>
  <div class="userManagement">
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeDialog" width="450px">
      <el-form :model="form" ref="form" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="top">
      <el-form :inline="true" :model="fromObj">
        <el-form-item label="用户名">
          <el-input v-model="fromObj.username" placeholder="请输入用户名"></el-input>
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
          prop="username"
          align="center"
          label="用户名">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120">
          <template slot-scope="scope">
<!--            <el-button @click="edit(scope.row)" type="text" class="edit">编辑</el-button>-->
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
import { findUser, addUser, deleteUser } from '../../../api/admin/user'
export default {
  data () {
    return {
      title: '新增',
      total: 0,
      currentPage: 1,
      pageSize: 10,
      fromObj: {
        username: ''
      },
      tableData: [{
        username: '啦啦啦'
      }],
      rules: {
        username: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入密码' }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: '70px',
      form: {
        id: null,
        username: '',
        password: ''
      },
      findQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    getDatas () {
      findUser(this.findQuery).then(res => {
        console.log(res)
        this.total = res.data.count
        this.tableData = res.data.rows
      })
    },
    closeDialog () {
      this.$refs.form.clearValidate()
      this.form = {
        id: null,
        username: '',
        password: ''
      }
    },
    add () {
      this.form.id = null
      this.title = '新增'
      this.dialogFormVisible = true
    },
    submit (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          addUser(_this.form).then(res => {
            console.log(res)
            if (res.code === 0) {
              _this.$message({
                type: 'success',
                message: res.data
              })
            }
            _this.getDatas()
          })
          _this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    del (row) {
      let _this = this
      this.$confirm('是否继续删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: row.id }).then(res => {
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
    this.getDatas()
  }
}
</script>

<style scoped lang="less">
  .userManagement{
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
