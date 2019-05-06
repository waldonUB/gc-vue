import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    userInfo: {}
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    /**
     * @param state vuex中的状态
     * @param item 传进来的参数
     * 其他组件可以通过$store.commit来直接操作mutations（同步的方法），
     * 也可以通过$store.dispatch操作action（异步的方法），action再操作mutations
     * */
    getUserInfo (state, item) {
      state.userInfo = item
    }
  }
})
