<template>
  <div class="home">
    <div class="top" v-if="isAdmin">
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            用户量
          </div>
          <div class="right">
            <countTo class="num" :startVal='0' :endVal='353' :duration='2000'></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            文章数量
          </div>
          <div class="right">
            <countTo class="num" :startVal='0' :endVal='353' :duration='2000'></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            文章类型
          </div>
          <div class="right">
            <countTo class="num" :startVal='0' :endVal='3333' :duration='2000'></countTo>
          </div>
        </div>
      </div>
    </div>
    <div class="top" v-if="!isAdmin">
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            html/css/js
          </div>
          <div class="right">
            <span>浏览量</span>
            <countTo class="num" :startVal='0' :endVal='3333' :duration='2000'></countTo>
            <span>喜欢数</span>
            <countTo class="num" :startVal='0' :endVal='353' :duration='2000'></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            python
          </div>
          <div class="right">
            <span>浏览量</span>
            <countTo class="num" :startVal='0' :endVal='3333' :duration='2000'></countTo>
            <span>喜欢数</span>
            <countTo class="num" :startVal='0' :endVal='353' :duration='2000'></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            java
          </div>
          <div class="right">
            <span>浏览量</span>
            <countTo class="num" :startVal='0' :endVal='3333' :duration='2000'></countTo>
            <span>喜欢数</span>
            <countTo class="num" :startVal='0' :endVal='353' :duration='2000'></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            c++
          </div>
          <div class="right">
            <span>浏览量</span>
            <countTo class="num" :startVal='0' :endVal='3333' :duration='2000'></countTo>
            <span>喜欢数</span>
            <countTo class="num" :startVal='0' :endVal='353' :duration='2000'></countTo>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <div class="itemLogo">
            other
          </div>
          <div class="right">
            <span>浏览量</span>
            <countTo class="num" :startVal='0' :endVal='3333' :duration='2000'></countTo>
            <span>喜欢数</span>
            <countTo class="num" :startVal='0' :endVal='353' :duration='2000'></countTo>
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
      startVal: 0,
      endVal: 2017,
      isAdmin: false
    }
  },
  components: {
    countTo
  },
  methods: {
    getDatas () {
      console.log(JSON.parse(sessionStorage.getItem('userInfo')).id)
      home({ id: JSON.parse(sessionStorage.getItem('userInfo')).id }).then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    if (JSON.parse(sessionStorage.getItem('userInfo')).level === 0) {
      this.isAdmin = true
    } else {
      this.isAdmin = false
    }
    this.getDatas()
  }
}
</script>

<style lang="less">
  .home{
    padding: 30px;
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
