<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body {
    height: 100%;
    max-height: 100%;
    overflow: auto;
    margin: 0;
  }
  /**透明输入框*/
  .trans-input > input{
    background-color: rgba(255, 255, 255, 0) !important;
    color: white !important;
  }
  /*1.去除谷歌屎黄色背景*/
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill{
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  .trans-dialog > .el-dialog{
    background-color: rgba(46, 64, 84, 0.3) !important;
  }
  .el-dialog__body{
    padding-top: 0;
  }
  .el-card__header {
    padding: 5px 5px 5px 15px !important;
  }
  .preview > p {
    margin-top: 0;
    margin-bottom: 0;
  }
  #app {
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  /*底端固定按钮*/
  .return-btn{
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 1000;
  }
  .containers{
    position: absolute;
    background-color: #ffffff;
    width: 90%;
    height: 100%;
  }
  .canvas{
    width: 100%;
    height: 100%;
  }
  .panel{
    position: absolute;
    right: 0;
    top: 0;
  }
  .highlight-overlay {
    background-color: green;
    pointer-events: none; /* no pointer events, allows clicking through onto the element */
    /*border-radius: 50px;*/
  }
</style>
