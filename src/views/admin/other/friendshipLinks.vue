<template>
  <div class="friendshipLinks">
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeDialog">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth" prop="url">
          <el-input v-model="form.url" autocomplete="off" placeholder="请输入链接地址"></el-input>
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
import { findFriendshipLink, addFriendshipLink, deleteFriendshipLink, updateFriendshipLink } from '../../../api/admin/other'
export default {
  data () {
    return {
      title: '新增',
      fromObj: {
        title: ''
      },
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      rules: {
        title: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入标题' }
        ],
        url: [
          { required: true, validator: rules.string, trigger: 'blur', message: '请输入url地址' }
        ]
      },
      form: {
        id: null,
        title: '',
        url: ''
      },
      findQuery: {
        u_id: JSON.parse(sessionStorage.getItem('userInfo')).id,
        title: null
      }
    }
  },
  methods: {
    closeDialog () {
      this.$refs.form.clearValidate()
      this.form = {
        id: null,
        title: '',
        url: ''
      }
    },
    submit (formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let query = {
            url: _this.form.url,
            title: _this.form.title
          }
          if (_this.form.id) {
            query.id = _this.form.id
            updateFriendshipLink(query).then(res => {
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
            addFriendshipLink(query).then(res => {
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
      this.findQuery.title = this.fromObj.title
      this.getDatas()
    },
    getDatas () {
      findFriendshipLink(this.findQuery).then(res => {
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
      this.form.title = row.title
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
        deleteFriendshipLink({ id: row.id }).then(res => {
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
    this.getDatas()
  }
}
</script>

<style scoped lang="less">
  .friendshipLinks{
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
  }
</style>
