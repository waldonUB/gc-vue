import Vue from 'vue'
import Router from 'vue-router'
import BMap from '@/components/manager/user/BMap'
import InfoCenter from '@/components/manager/user/InfoCenter'
import Essay from '@/components/manager/user/Essay'
import EssayInfo from '@/components/manager/user/EssayInfo'
import UserManager from '@/components/manager/user/UserManager'
import FlowConfig from '@/components/activity/FlowConfig'

Vue.use(Router)

export default [
  {
    path: '',
    component: BMap
  },
  {
    path: 'user/BMap',
    component: BMap
  },
  {
    path: 'user/InfoCenter',
    component: InfoCenter
  },
  {
    path: 'user/Essay',
    component: Essay
  },
  {
    path: 'user/EssayInfo/:essay',
    name: 'EssayInfo',
    component: EssayInfo
  },
  {
    path: 'user/UserManager',
    name: 'UserManager',
    component: UserManager
  },
  {
    path: 'activity/FlowConfig',
    name: 'FlowConfig',
    component: FlowConfig
  }
]
