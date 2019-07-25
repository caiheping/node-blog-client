<template>
  <div class="detail">
    <div class="top">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: `/layout/technique/${$route.params.u_id}/${$route.params.type}` }">技术杂谈</el-breadcrumb-item>
          <el-breadcrumb-item>干货！IT小伙伴们实用的网站及工具大集合！持续更新！</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header">
        <p>{{articleData.title}}</p>
        <ul>
          <li>
            <svg-icon icon-class="article" class-name="icon"/>
            <span>{{articleData.type}}</span>
          </li>
          <li>
            <svg-icon icon-class="user" class-name="icon"/>
            <span>{{$store.state.userInfo.nickname}}</span>
          </li>
          <li>
            <svg-icon icon-class="time" class-name="icon"/>
            <span>{{articleData.createdAt}}</span>
          </li>
          <li>
            <svg-icon icon-class="look" class-name="icon"/>
            <span>{{articleData.browse}}浏览</span>
          </li>
          <li>
            <svg-icon icon-class="love" class-name="icon"/>
            <span>{{articleData.love}}喜欢</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div>{{articleData.preface}}</div>
      <div v-html="articleData.content"></div>
      <p class="other">转载请注明：{{$store.state.userInfo.nickname}} » {{articleData.title}}</p>
      <div class="bottom">
        <el-button type="primary" @click="like">喜欢</el-button>
        <el-button>分享</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { findArticleById, setBrowse, articleLike } from '../../../api/front/article'
import moment from 'moment'
export default {
  data () {
    return {
      articleData: {}
    }
  },
  methods: {
    like () {
      articleLike({ a_id: this.$route.query.id }).then(res => {
        if (res.code === 0) {
          this.getDetail()
        }
      })
    },
    browse () {
      setBrowse({ a_id: this.$route.query.id })
    },
    getDetail () {
      findArticleById({ id: this.$route.query.id, u_id: this.$route.params.u_id }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.articleData = res.data
          this.articleData.createdAt = moment(res.data.createdAt).format('YYYY-MM-DD')
        }
      })
    }
  },
  mounted () {
    this.getDetail()
    this.browse()
  }
}
</script>

<style scoped lang="less">
  .detail{
    padding: 20px;
    background: #fff;
    .top{
      .breadcrumb{
        padding: 0 0 10px;
        border-bottom: 1px solid #bebebe;
      }
      .header{
        padding: 10px 0;
        border-bottom: 1px solid #bebebe;
        p{
          font-size: 20px;
          color: #666;
        }
        ul{
          display: flex;
          margin-top: 10px;
          li{
            margin-right: 30px;
            display: flex;
            align-items: center;
            span{
              color: #999;
              padding: 0 5px;
            }
          }
        }
      }
    }
    .content{
      .other{
        line-height: 24px;
        color: #999;
      }
      .bottom{
        margin: 20px 0;
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
