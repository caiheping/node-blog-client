<template>
  <div class="technique">
    <div class="left">
      <ul class="infinite-list article" infinite-scroll-disabled="disabled" v-infinite-scroll="load">
        <li v-for="item in $store.state.articleLists" :key="item.id">
          <div class="item" @click.prevent="toDetail(item.id)">
            <header>
              <h2>
                <span>{{item.type}}</span>
                {{item.title}}
              </h2>
            </header>
            <div class="focus">
              <a href="">
                <img :src="item.cover_photo" alt="">
              </a>
            </div>
            <span class="note" v-html="item.content"></span>
            <p class="auth-span">
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                {{$store.state.userInfo.nickname}}
              </span>
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                {{item.createdAt}}
              </span>
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                {{item.browse}}浏览
              </span>
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                {{item.love}}喜欢
              </span>
            </p>
          </div>
        </li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
    <div class="right">
      <div class="other">
        <img src="../../../static/img/360166.gif" alt="">
      </div>
      <div class="love">
        <h4>猜你喜欢</h4>
        <ul>
          <li v-for="item in $store.state.baseDatas.loves" :key="item.id" @click.prevent="toDetail">
            <a href="">
              <img :src="item.cover_photo" alt="">
            </a>
            <div class="content">
              <p>{{item.title}}</p>
              <div>
                <span>{{item.createdAt}}</span>
                <span>{{item.browse}}浏览</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="fav">
        <h4>友情链接</h4>
        <ul>
          <li v-for="item in $store.state.baseDatas.links" :key="item.id">
            <a :href="item.url">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { findArticle } from '../../../api/front/article'
import { home } from '../../../api/front/home'
import moment from 'moment'
export default {
  data () {
    return {
      page: 1,
      limit: 1,
      loading: false,
      noMore: false
    }
  },
  computed: {
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      console.log(99)
      this.init()
    },
    rightDatas () {
      home({ u_id: this.$route.params.u_id }).then(res => {
        if (res.code === 0) {
          let rightObj = {
            loves: res.data.loves,
            links: res.data.links
          }
          this.$store.state.baseDatas = rightObj
        }
      })
    },
    init () {
      this.loading = true
      findArticle({ u_id: this.$route.params.u_id, type: this.$route.params.type, page: this.page, limit: this.limit }).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => {
            item.createdAt = moment(item.createdAt).format('YYYY-MM-DD')
          })
          this.$store.state.articleLists = [...this.$store.state.articleLists, ...res.data]
          if (res.data.length < this.limit) {
            this.noMore = true
          }
          this.loading = false
          this.page++
        }
      })
    },
    toDetail (id) {
      console.log(this.$route.params.u_id)
      this.$router.push({
        path: `/layout/detail/${this.$route.params.u_id}`,
        query: {
          id
        }
      })
    }
  },
  mounted () {
    this.rightDatas()
  }
}
</script>

<style scoped lang="less">
  .technique{
    display: flex;
    .left{
      flex: 1;
      .article{
        li{
          overflow: hidden;
          border: 1px solid #EBEEF5;
          color: #303133;
          transition: .3s;
          margin-bottom: 20px;
          &:last-child{
            margin-bottom: 0;
          }
          &:hover{
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          }
          .item{
            cursor: pointer;
            overflow: hidden;
            background-color: #fff;
            padding: 20px 15px 40px 20px;
            position: relative;
            clear: both;
            header{
              margin-bottom: 10px;
              h2{
                position: relative;
                display: inline;
                font-size: 20px;
                font-weight: normal;
                top: 1px;
                line-height: 26px;
                color: #00a67c;
                span{
                  background: #d56464;
                  padding: 0 5px;
                  color: #fff;
                  position: relative;
                  margin-right: 15px;
                  line-height: 26px;
                  &:after{
                    content: '';
                    width: 0;
                    height: 0;
                    position: absolute;
                    right: -13px;
                    top: 0;
                    border-left: 13px solid #d56464;
                    border-bottom: 13px solid transparent;
                    border-top: 13px solid transparent;
                  }
                }
              }
            }
            .focus{
              float: left;
              margin: 0 20px 0 0;
              text-align: center;
              position: relative;
              overflow: hidden;
              display: table;
              a{
                display: table-cell;
                vertical-align: middle;
                width: 200px;
                img{
                  margin: 0 auto;
                  display: block;
                  transition: transform .3s linear;
                }
              }
            }
            .note{
              color: #777;
              line-height: 24px;
              margin-bottom: 0;
              font-style: normal;
            }
            .auth-span{
              position: absolute;
              bottom: 10px;
              right: 0;
              .muted{
                margin-right: 20px;
                color: #777;
              }
            }
          }
        }
      }
    }
    .right{
      width: 360px;
      margin-left: 20px;
      .other{
        margin-bottom: 10px;
      }
      .love{
        margin-bottom: 10px;
        background-color: #fff;
        h4{
          font-weight: normal;
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #90bba8;
          margin: 0 20px 20px;
        }
        ul{
          padding: 0 20px 20px;
          li{
            cursor: pointer;
            display: flex;
            margin-bottom: 20px;
            a{
              img{
                width: 100px;
                height: 60px;
                margin-right: 10px;
              }
            }
            .content{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              p{
                color: #00a67c;
              }
              div{
                color: #777;
                display: flex;
                justify-content: space-between;
              }
            }
          }
        }
      }
      .fav{
        margin-bottom: 10px;
        background-color: #fff;
        h4{
          font-weight: normal;
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #90bba8;
          margin: 0 20px 20px;
        }
        ul{
          padding: 0 20px 20px;
          display: flex;
          flex-wrap: wrap;
          li{
            width: 50%;
            margin-bottom: 10px;
            a{
              display: block;
              color: #00a67c;
              text-align: center;
              height: 40px;
              line-height: 40px;
              width: 75%;
              margin: 0 auto;
              border-bottom: 1px solid #f0f0f0;
            }
          }
        }
      }
    }
  }
</style>
