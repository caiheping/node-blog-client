<template>
  <div class="home">
    <div class="left">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div class="hot">
        <h4>热门排行</h4>
        <ul>
          <li v-for="item in 5" :key="item">
            <p>{{item}}、Python2爬虫学习系列教程</p>
            <span class="love">5646喜欢</span>
          </li>
        </ul>
      </div>
      <ul class="article">
        <li v-for="item in 9" :key="item" @click.prevent="toDetail">
          <div class="item">
            <header>
              <h2>sdfdssd</h2>
            </header>
            <div class="focus">
              <a href="">
                <img src="../../../static/img/avater.jpg" alt="">
              </a>
            </div>
            <span class="note">问题来 问题来源 在写代码的时候遇到了如下问题： 使用了bootstrap框架来编写了一个页面，其中input元素两侧留有空白。然而用JS动态添加的同样的元素却不会出现这种情况。具体截图表现如下： 我们可以发现，第一行和而三行的代码是完全一样的，可是呈现的结果是截然不同的。 在线测试样... 问题来源 在写代码的时候遇到了如下问题： 使用了bootstrap框架来编写了一个页面，其中input元素两侧留有空白。然而用JS动态添加的同样的元素却不会出现这种情况。具体截图表现如下： 我们可以发现，第一行和而三行的代码是完全一样的，可是呈现的结果是截然不同的。 在线测试样...源 在写代码的时候遇到了如下问题： 使用了bootstrap框架来编写了一个页面，其中input元素两侧留有空白。然而用JS动态添加的同样的元素却不会出现这种情况。具体截图表现如下： 我们可以发现，第一行和而三行的代码是完全一样的，可是呈现的结果是截然不同的。 在线测试样</span>
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .home{
    margin: 20px 0;
    display: flex;
    .left{
      flex: 1;
      .hot{
        background: #fff;
        padding: 0 20px;
        margin-top: 20px;
        h4{
          height: 45px;
          line-height: 45px;
          border-bottom: 1px solid #90bba8;
          font-size: 20px;
          font-weight: 400;
          top: 1px;
          color: #00a67c;
        }
        ul{
          padding: 10px 0;
          li{
            display: flex;
            justify-content: space-between;
            line-height: 30px;
            p{
              color: #90bba8;
              cursor: pointer;
            }
            .love{
              color: #f78585;
            }
          }
        }
      }
      .article{
        padding: 20px 0 0;
        li{
          cursor: pointer;
          margin-bottom: 20px;
          overflow: hidden;
          border: 1px solid #EBEEF5;
          color: #303133;
          transition: .3s;
          &:last-child{
            margin-bottom: 0;
          }
          &:hover{
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          }
          .item{
            overflow: hidden;
            background-color: #fff;
            padding: 20px 15px 40px 20px;
            position: relative;
            clear: both;
            header{
              margin-bottom: 10px;
              h2{
                display: inline;
                font-size: 20px;
                font-weight: normal;
                position: relative;
                top: 1px;
                line-height: 26px;
                color: #00a67c;
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
          margin: 0 20px 10px;
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
