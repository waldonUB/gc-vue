<template>
  <div>
    <H3>Axios测试</H3>
    <el-button type="success" @click="axiosTest">连接</el-button>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'AxiosTest',
  methods: {
    axiosTest () {
      const vm = this
      vm.$http.post('/redisSession').then(res => {
        debugger
      }).catch(res => {
        debugger
      })
    }
  }
}
</script>

<style scoped>

</style>
