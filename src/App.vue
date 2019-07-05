<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  #app{
    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
  }

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
