<template>
  <div class="my" v-if="$store.state.userInfo">
    <div class="box">
      <h3>关于自己</h3>
      <div class="introduction">
        <h4>个人简介</h4>
        <div class="content">
          <img :src="$store.state.userInfo.avatar" alt="">
          <p>{{$store.state.userInfo.nickname}}</p>
          <p>{{$store.state.userInfo.motto}}</p>
          <p>{{$store.state.userInfo.hobby}}</p>
        </div>
      </div>
      <div class="skill">
        <h4>我的技能树</h4>
        <ul class="content">
          <li v-for="item in $store.state.userInfo.Skills" :key="item.id">
            <span>{{item.skill}}</span>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="item.proficiency"></el-progress>
          </li>
        </ul>
      </div>
      <div class="contact">
        <h4>与我联系</h4>
        <ul class="content">
          <li>
            <el-tooltip class="item" effect="dark" :content="`github地址：${$store.state.userInfo.github?$store.state.userInfo.github:'暂无'}`" placement="top-start">
              <svg-icon icon-class="github" class-name="icon"/>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item qq" effect="dark"  :content="`qq：${$store.state.userInfo.qq?$store.state.userInfo.qq:'暂无'}`" placement="top-start">
              <svg-icon icon-class="qq" class-name="icon"/>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark"  :content="`邮箱：${$store.state.userInfo.email?$store.state.userInfo.email:'暂无'}`" placement="top-start">
              <svg-icon icon-class="youxiang" class-name="icon"/>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark"  :content="`微信：${$store.state.userInfo.wechat?$store.state.userInfo.wechat:'暂无'}`" placement="top-start">
              <svg-icon icon-class="weixin" class-name="icon"/>
            </el-tooltip>
          </li>
          <li class="weibo">
            <el-tooltip class="item" effect="dark"  :content="`微博：${$store.state.userInfo.weibo?$store.state.userInfo.weibo:'暂无'}`" placement="top-start">
              <svg-icon icon-class="weibo" class-name="icon"/>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark"  :content="`RSS：${$store.state.userInfo.RSS?$store.state.userInfo.RSS:'暂无'}`" placement="top-start">
              <svg-icon icon-class="RSS" class-name="icon"/>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .my{
    color: #666;
    .box{
      margin: 20px 0;
      background: #fff;
      h3{
        font-weight: normal;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-size: 20px;
        color: #666;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        margin-bottom: 20px;
      }
      .introduction{
        display: block;
        h4{
          text-align: center;
          font-size: 18px;
          height: 50px;
          line-height: 50px;
          background: #fbfbfb;
          position: relative;
          &:before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 50px;
            background: #d56464;
          }
        }
        .content{
          padding: 30px;
          img{
            display: block;
            border-radius: 5px;
            width: 150px;
            margin: 10px auto;
          }
          p{
            text-align: center;
            line-height: 30px;
          }
        }
      }
      .skill{
        display: block;
        h4{
          text-align: center;
          font-size: 18px;
          height: 50px;
          line-height: 50px;
          background: #fbfbfb;
          position: relative;
          &:before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 50px;
            background: #d56464;
          }
        }
        .content{
          padding: 30px 15%;
          li{
            width: 100%;
            position: relative;
            display: flex;
            height: 30px;
            line-height: 30px;
            margin-bottom: 30px;
            span{
              display: block;
              width: 120px;
              margin-right: 20px;
            }
            .el-progress{
              flex: 1;
              margin-top: 2px;
            }
          }
        }
      }
      .contact{
        display: block;
        h4{
          text-align: center;
          font-size: 18px;
          height: 50px;
          line-height: 50px;
          background: #fbfbfb;
          position: relative;
          &:before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 50px;
            background: #d56464;
          }
        }
        .content{
          padding: 30px 15%;
          display: flex;
          justify-content: space-between;
          li{
            &.github{
              color: #7782D1;
            }
            &.qq{

            }
            &.youxiang{

            }
            &.wchart{

            }
            &.weibo{
              color: red;
            }
            &.rss{

            }
            svg{
              font-size: 75px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
