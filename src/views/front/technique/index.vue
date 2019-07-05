<template>
  <div class="technique">
    <div class="left">
      <ul class="article">
        <li v-for="item in 4" :key="item">
          <div class="item" @click.prevent="toDetail">
            <header>
              <h2>
                <span>python</span>
                Python 深度学习脚手架 ModelZoo
              </h2>
            </header>
            <div class="focus">
              <a href="">
                <img src="../../../static/img/avater.jpg" alt="">
              </a>
            </div>
            <span class="note">想必大家都或多或少听过 TensorFlow 的大名，这是 Google 开源的一个深度学习框架，里面的模型和 API 可以说基本是一应俱全，但 TensorFlow 其实有很多让人吐槽的地方，比如 TensorFlow 早期是只支持静态图的，你要调试和查看变量的值的话就得一个个...</span>
            <p class="auth-span">
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                小菜
              </span>
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                2016-10-29
              </span>
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                7213浏览
              </span>
              <span class="muted">
                <i class="el-icon-s-custom"></i>
                23喜欢
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="other">
        <img src="../../../static/img/360166.gif" alt="">
      </div>
      <div class="love">
        <h4>猜你喜欢</h4>
        <ul>
          <li v-for="item in 5" :key="item" @click.prevent="toDetail">
            <a href="">
              <img src="../../../static/img/avater.jpg" alt="">
            </a>
            <div class="content">
              <p>[Python3网络爬虫开发实战] 1.8.4-Scrapy-Redis的安装</p>
              <div>
                <span>2018-01-11</span>
                <span>54浏览</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="fav">
        <h4>友情链接</h4>
        <ul>
          <li v-for="item in 9" :key="item">
            <a>ddfd</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    toDetail () {
      this.$router.push({
        path: '/layout/detail',
        query: {
          id: 1
        }
      })
    }
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
