<template>
  <div>
    <el-button type="success" class="return-btn" @click="returnUpOne">返回</el-button>
    <div id="contentDetail"></div>
  </div>
</template>

<script>
export default {
  name: 'EssayInfo',
  data () {
    return {
      essay: null
    }
  },
  methods: {
    returnUpOne () {
      this.$router.go(-1)
    }
  },
  mounted () {
    const vm = this
    vm.essay = JSON.parse(vm.$route.params.essay)
    const contentDetail = document.getElementById('contentDetail')
    contentDetail.innerHTML = vm.essay.blogContent
  }
}
</script>

<style scoped>

</style>
