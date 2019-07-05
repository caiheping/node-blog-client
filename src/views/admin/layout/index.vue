<template>
  <div class="layout">
    <el-container>
      <el-header :style="`background:${$store.state.theme}`">
        <v-header :title="title"></v-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar style="height: 100%;border-right: solid 1px #e6e6e6;">
            <el-menu :default-active="$store.state.activeMenu" :router=true class="el-menu">
              <el-menu-item index="adminHome">
                <svg-icon icon-class="home" class-name="icon"/>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="userManagement">
                <svg-icon icon-class="userManagement" class-name="icon"/>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-submenu index="article">
                <template slot="title">
                  <svg-icon icon-class="article" class-name="icon"/>
                  <span slot="title">文章模块</span>
                </template>
                <el-menu-item index="typeManagement">
                  <span slot="title">类型管理</span>
                </el-menu-item>
                <el-menu-item index="articleManagement">
                  <span slot="title">技术杂谈</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="user">
                <template slot="title">
                  <svg-icon icon-class="user" class-name="icon"/>
                  <span slot="title">个人中心</span>
                </template>
                <el-menu-item index="introduction">
                  <span slot="title">个人简介</span>
                </el-menu-item>
                <el-menu-item index="note">
                  <span slot="title">个人笔记</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="other">
                <template slot="title">
                  <svg-icon icon-class="other" class-name="icon"/>
                  <span slot="title">其他</span>
                </template>
                <el-menu-item index="friendshipLinks">
                  <span slot="title">友情链接</span>
                </el-menu-item>
                <el-menu-item index="banner">
                  <span slot="title">轮播管理</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <div class="contentBox">
            <div class="top">
              <div class="breadcrumb">
                <el-breadcrumb separator="/">
                  <transition name="el-fade-in-linear" mode="out-in">
                    <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
                  </transition>
                </el-breadcrumb>
              </div>
              <div class="right-menu">
                <el-tooltip content="全屏" effect="dark" placement="bottom">
                  <screenfull class="screenfull right-menu-item"/>
                </el-tooltip>
                <el-tooltip content="主题" effect="dark" placement="bottom">
                  <theme-picker class="theme-switch right-menu-item"/>
                </el-tooltip>
              </div>
            </div>
            <tags-view></tags-view>
            <div class="content">
              <el-scrollbar style="height: 100%;">
                <transition name="el-fade-in-linear" mode="out-in">
                  <keep-alive v-if="$route.meta.keepAlive">
                    <router-view></router-view>
                  </keep-alive>
                  <router-view v-if="!$route.meta.keepAlive"></router-view>
                </transition>
              </el-scrollbar>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header'
import Screenfull from './components/Screenfull'
import ThemePicker from './components/ThemePicker'
import TagsView from './components/TagsView'

export default {
  data () {
    return {
      title: '小菜管理系统'
    }
  },
  components: {
    'v-header': Header,
    Screenfull,
    TagsView,
    ThemePicker
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style lang="less" scoped>
  .layout {
    height: calc(100vh);

    .el-header, .el-footer {
      color: #333;
      text-align: center;
      height: 60px;
      box-sizing: border-box;
    }

    .el-aside {
      background-color: rgba(0, 0, 0, 0);
      color: #333;
      text-align: left;
      height: calc(100vh - 60px);
      box-sizing: border-box;
      i{
        margin: 0 5px;
      }
    }

    .el-menu{
      svg{
        margin-right: 5px;
      }
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
      height: calc(100vh - 60px);
      text-align: center;
      box-sizing: border-box;
      padding: 0;
      .contentBox{
        box-sizing: border-box;
        .top{
          padding: 5px 15px;
          height: 50px;
          box-sizing: border-box;
          border-bottom: 1px solid rgb(230, 230, 230);
          background: #fff;
          display: flex;
          justify-content: space-between;
          .breadcrumb {
            display: flex;
            font-size: 16px;
            align-items: center;
            .fa-bars {
              margin-right: 15px;
              font-size: 24px;
              cursor: pointer;
              transition: all .5s;

              &.active {
                transform: rotate(90deg);
              }
            }
          }
          .right-menu{
            display: flex;
            align-items: center;
            .right-menu-item{
              display: inline-block;
              margin: 0 10px;
            }
          }
        }
        .content{
          height: calc(100vh - 140px);
          box-sizing: border-box;
        }
      }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      box-sizing: border-box;
    }
    .el-menu{
      border: none;
    }
  }
</style>
