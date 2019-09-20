<template>
    <div>
      <axios-test></axios-test>
    </div>
</template>

<script>
import AxiosTest from '../../../test/axios/AxiosTest'
export default {
  name: 'Header',
  components: {AxiosTest},
  methods: {},
  mounted () {
    console.log(`我是header，我初始化了`)
  }
}
</script>

<style scoped>

</style>
