<template>
  <div class="detail">
    <div class="top">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/technique/1' }">技术杂谈</el-breadcrumb-item>
          <el-breadcrumb-item>干货！IT小伙伴们实用的网站及工具大集合！持续更新！</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header">
        <p>干货！IT小伙伴们实用的网站及工具大集合！持续更新！</p>
        <ul>
          <li>
            <svg-icon icon-class="article" class-name="icon"/>
            <span>python</span>
          </li>
          <li>
            <svg-icon icon-class="user" class-name="icon"/>
            <span>小菜</span>
          </li>
          <li>
            <svg-icon icon-class="time" class-name="icon"/>
            <span>2015-10-11 16:00:00</span>
          </li>
          <li>
            <svg-icon icon-class="look" class-name="icon"/>
            <span>545浏览</span>
          </li>
          <li>
            <svg-icon icon-class="love" class-name="icon"/>
            <span>123喜欢</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div v-html="content"></div>
      <p class="other">转载请注明：小菜 » 滑动验证码的原理并利用 Vue 实现滑动验证码</p>
      <div class="bottom">
        <el-button type="primary">喜欢</el-button>
        <el-button type="primary">分享</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '<h2>hahah</h2>'
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        console.log(val)
      },
      // 深度观察监听
      deep: true
    }
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
