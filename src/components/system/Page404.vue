<template>
  <div>
    <el-row style="margin-top: 10%">
      <el-col :span="24" style="text-align: center">
        <i class="fa fa-fw fa-wheelchair" style="font-size: 100px;color: darkgreen"></i>
        <i class="fa fa-fw fa-wheelchair-alt" style="font-size: 100px;color: darkgreen"></i>
      </el-col>
      <el-col :span="24" style="text-align: center;margin-top: 30px">
        <i style="font-size: 80px">404NotFound</i>
      </el-col>
      <el-col :gutter="36" :span="24" style="text-align: center;margin-top: 30px">
        <el-row>
          <el-col :span="12">
            <!--这里方法体内的this默认是vue的作用域内的元素-->
            <el-button class="pull-right" type="success" style="margin-right: 20px" @click="()=> {$router.go(-1)}">返回</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="pull-left" type="primary" style="margin-left: 20px" @click="refresh">刷新</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  methods: {
    refresh () {
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>
