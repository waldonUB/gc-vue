<template>
  <div>
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
