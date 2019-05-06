// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import apiConfig from '../config/api'
import Vuex from 'vuex'
import store from './store/store'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
import 'normalize.css'
import 'border.css'
import fastClick from 'fastclick'
fastClick.attach(document.body)
Vue.use(ElementUI)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = apiConfig.baseURI

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 相当于router: router
  router,
  store,
  components: { App },
  template: '<App/>'
})
