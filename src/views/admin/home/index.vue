<template>
  <div class="home" v-if="homeData">
    <p v-if="isAdmin !== 'true'" class="link">
      <router-link :to="`/layout/home/${this.$store.state.userInfo.id}`">点击去我的博客</router-link>
    </p>
    <div class="top">
      <div class="item" v-if="isAdmin === 'true'">
        <div class="content">
          <div class="itemLogo">
            用户量
          </div>
          <div class="right">
            <countTo class="num" :startVal='0' :endVal='homeData.allUser' :duration='2000'></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            文章
          </div>
          <div class="right">
            <countTo class="num" :startVal='0' :endVal='homeData.allArticle' :duration='2000'></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            个人日志
          </div>
          <div class="right">
            <countTo class="num" :startVal='0' :endVal='homeData.allNote' :duration='2000'></countTo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import { home } from '../../../api/admin/home'
export default {
  data () {
    return {
      host: window.location.host,
      isAdmin: JSON.parse(sessionStorage.getItem('userInfo')).level === 0 ? 'true' : 'false',
      homeData: null
    }
  },
  components: {
    countTo
  },
  methods: {
    getDatas () {
      home({ id: this.$store.state.userInfo.id }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.homeData = res.data
        }
      })
    }
  },
  mounted () {
    this.getDatas()
  }
}
</script>

<style lang="less">
  .home{
    padding: 30px;
    .link{
      text-align: left;
    }
    .top{
      display: flex;
      flex-wrap: wrap;
      margin-left: -15px;
      margin-right: -15px;
      .item{
        width: 25%;
        padding: 15px;
        box-sizing: border-box;
        .content{
          cursor: pointer;
          background: #fff;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          padding: 20px;
          transition: all 0.5s;
          &:hover{
            box-shadow: 4px 4px 40px rgba(0,0,0,.1);
          }
          .itemLogo{
            border-radius: 4px;
            font-size: 30px;
            padding: 10px;
            color: #333;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .right{
            color: #999;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .num{
              font-size: 24px;
              font-weight: bold;
              color: #666
            }
          }
        }
      }
    }
  }
</style>
