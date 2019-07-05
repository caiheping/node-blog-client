<template>
  <div class="lifeNotes">
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>尝试了大佬的gerapy神器，发现一个问题暂时解决不了，就是会报类似这样的错误:File "/tmp/content_spider-1561715038-7AAhwY.egg/content_spider/pipelines.py", line 38, in __init__ IOError: [Errno 2] No such file or directory 但是有的机器上又是可以的(环境是一样的) 这是什么原因呢 望大佬指点6</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<style scoped lang="less">
  .lifeNotes{
    display: flex;
    background: #fff;
    padding: 30px;
    min-height: calc(100vh - 260px);
    box-sizing: border-box;
  }
</style>
