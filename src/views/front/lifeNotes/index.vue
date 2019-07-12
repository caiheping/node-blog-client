<template>
  <div class="lifeNotes" v-if="notes">
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="item.createdAt" placement="top" v-for="item in notes" :key="item.id">
          <el-card>
            <h4>{{item.title}}</h4>
            <p>{{item.content}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { findNote } from '../../../api/front/user'
import moment from 'moment'
export default {
  data () {
    return {
      notes: null
    }
  },
  methods: {
    getDatas () {
      findNote({ u_id: this.$route.params.u_id }).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => {
            item.createdAt = moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')
          })
          this.notes = res.data
        }
      })
    }
  },
  mounted () {
    this.getDatas()
  }
}
</script>

<style scoped lang="less">
  .lifeNotes{
    display: flex;
    background: #fff;
    padding: 30px;
    min-height: calc(100vh - 260px);
    box-sizing: border-box;
  }
</style>
