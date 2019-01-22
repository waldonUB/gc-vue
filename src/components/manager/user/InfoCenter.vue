<template>
  <el-container class="essays">
    <el-popover placement="top-start" width="300" trigger="click">
      <el-input size="mini" v-model="titleKey"></el-input>
      <el-button slot="reference" type="success" class="return-btn">搜索攻略</el-button>
    </el-popover>
    <el-row v-if="essays.length > 0">
      <el-col v-for="(essay, index) in essays" :key="essay.pk_blog" :span="24">
        <el-card shadow="hover" :body-style="cardStyle">
          <div slot="header">
            <el-row>
              <el-col :span="1">
                <img style="width: 40px;height: 40px" :src="essay.headImg">
              </el-col>
              <el-col :span="2" style="margin-top: 11px;">
                <el-tag size="small" type="info">{{essay.userName}}</el-tag>
              </el-col>
              <el-col :span="12" style="margin-top: 9px;font-size: 20px;font-weight: bolder">
                <span @click="getDetail(essay)" style="cursor: pointer">{{essay.blogTitle}}</span>
              </el-col>
              <el-col class="pull-right" :span="1" style="margin-top: 11px;">
                <i @click="praise(essay.pk_blog, index)" v-if="essay.isPraised === 1" class="fa fa-fw fa-thumbs-up" style="color: darkred;cursor: pointer; font-size: 16px"></i>
                <i @click="praise(essay.pk_blog, index)" v-else class="fa fa-fw fa-thumbs-o-up" style="color: darkgray;cursor: pointer; font-size: 16px"></i>
                <i v-if="essay.praiseNum >= 3" class="fa fa-fw fa-free-code-camp" style="color: orangered;font-size: 20px"></i>
              </el-col>
              <el-col :span="2" class="pull-right" style="margin-top: 15px;color: #8590A6">
                {{essay.creationTime? new Date(essay.creationTime).toLocaleDateString() : ''}}
              </el-col>
              <el-col :span="3" class="pull-right" style="margin-top: 11px;color: #8590A6">
                <el-tag size="medium" type="info">分类:{{essay.blogClassify}}</el-tag>
              </el-col>
              <el-col :span="2" class="pull-right" style="margin-top: 11px;color: #8590A6">
                <el-button :disabled="essay.userName !== userInfo.userName" type="danger" size="mini" @click="deleteEssay(essay.pk_blog)">删除攻略</el-button>
              </el-col>
            </el-row>
          </div>
          <div :id="essay.pk_blog" class="essayContent"></div>
          <el-collapse v-model="activeNames" @change="getComments(essay.pk_blog)" style="margin-top: 20px;">
            <el-collapse-item :name="essay.pk_blog">
              <template slot="title">
                <el-tag size="small" type="warning">{{essay.praiseNum}} 人赞了该话题</el-tag>
                <el-tag size="small" type="success">{{essay.commentNum}} 条评论</el-tag>
              </template>
              <el-row v-for="item in commentInfo" :key="item.pk_comment" v-loading>
                <el-col :span="24">
                  <el-row>
                    <el-col :span="1">
                      <img style="width: 35px;height: 35px" :src="item.headImg">
                    </el-col>
                    <el-col :span="1" style="margin-top: 11px;">
                      <el-tag size="mini" type="info">{{item.userName}}</el-tag>
                    </el-col>
                    <el-col :span="2" class="pull-right">
                      <span style="color: #8590A6">{{item.cmTime === '刚刚' ? '刚刚' : item.cmTime.slice(0, 10)}}</span>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="24" style="font-size: 16px;margin-left: 10px">
                  {{item.cmContent}}
                </el-col>
              </el-row>
              <el-row>
                <el-input v-model="commentContent" maxlength="60">
                  <el-button slot="append" :disabled="!commentContent" @click="saveComment(essay.pk_blog, index)">发布评论</el-button>
                </el-input>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="text-align: center" v-else>
      <img src="@/assets/black_man.jpeg">
      <el-row style="font-size: xx-large">
        你要找啥???
      </el-row>
    </el-row>
  </el-container>
</template>

<script>
import axois from 'axios'
export default {
  name: 'InfoCenter',
  data () {
    return {
      essays: [],
      cardStyle: {
        padding: '20px'
      },
      commentInfo: [],
      userInfo: [],
      currentBlog: null,
      activeNames: [],
      commentContent: null,
      titleKey: '' // 标题关键字搜索
    }
  },
  watch: {
    titleKey () {
      this.getEssays()
    }
  },
  methods: {
    /**
     * 获取评论
     * */
    getComments (pkBlog) {
      const vm = this
      vm.$set(vm, 'commentContent', null)
      vm.$set(vm, 'commentInfo', []) // 预先清空
      axois.post('/essay/getComments', {pk_blog: pkBlog}).then((response) => {
        if (vm.currentBlog && vm.currentBlog === pkBlog) { // 再次点击关闭
          vm.activeNames = []
          vm.currentBlog = null
        } else {
          vm.$set(vm, 'commentInfo', response.data.data)
          vm.activeNames = [pkBlog]
          vm.currentBlog = pkBlog
        }
      })
    },
    /**
     * 获取话题
     * */
    getEssays () {
      const vm = this
      const loading = this.$loading({
        lock: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 1)',
        target: document.querySelector('.essays')
      })
      const promise = new Promise((resolve, reject) => {
        axois.post('/essay/getEssays', {userName: vm.userInfo.userName, blogTitle: vm.titleKey}).then((response) => {
          vm.essays = response.data.data
          resolve(vm.essays)
        })
      })
      promise.then((essays) => {
        essays.map((item) => {
          const pkBlog = document.getElementById(item.pk_blog)
          pkBlog.innerHTML = item.blogContent
        })
        loading.close()
      })
    },
    /**
     * 点赞
     * */
    praise (pkBlog, index) {
      const vm = this
      if (vm.essays[index].isPraised === 0) {
        axois.post('/essay/savePraise', {userName: vm.userInfo.userName, pk_blog: pkBlog}).then((response) => {
          if (response.data.success) {
            vm.$set(vm.essays[index], 'isPraised', 1)
            vm.$set(vm.essays[index], 'praiseNum', vm.essays[index].praiseNum + 1)
            vm.$notify({
              type: 'success',
              title: '点赞成功',
              message: '此攻略当前点赞数为' + vm.essays[index].praiseNum
            })
          }
        })
      } else {
        axois.post('/essay/deletePraise', {userName: vm.userInfo.userName, pk_blog: pkBlog}).then((response) => {
          if (response.data.success) {
            vm.$set(vm.essays[index], 'isPraised', 0)
            vm.$set(vm.essays[index], 'praiseNum', vm.essays[index].praiseNum - 1)
            vm.$notify({
              type: 'info',
              title: '取消点赞',
              message: '此攻略当前点赞数为' + vm.essays[index].praiseNum
            })
          }
        })
      }
    },
    saveComment (pkBlog, index) {
      const vm = this
      const commentInfo = {
        pk_blog: pkBlog,
        cmContent: vm.commentContent,
        headImg: vm.userInfo.headImg,
        userName: vm.userInfo.userName,
        cmTime: null
      }
      axois.post('/essay/saveComment', commentInfo).then(() => {
        vm.$set(vm, 'commentContent', null)
        commentInfo.cmTime = '刚刚'
        vm.commentInfo.push(commentInfo)
        vm.$set(vm.essays[index], 'commentNum', vm.essays[index].commentNum + 1)
      })
    },
    /**
     * 查看文章详情
     * */
    getDetail (essay) {
      this.$router.push({name: 'EssayInfo', params: { essay: JSON.stringify(essay) }})
    },
    /**
     * 删除文章
     * */
    deleteEssay (pkBlog) {
      this.$confirm(`是否删除该攻略？`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axois.post('/essay/deleteEssay?pkBlog=' + pkBlog).then(response => {
          if (response.data.success) {
            this.$notify({
              type: 'success',
              title: '删除攻略成功'
            })
            this.getEssays()
          } else {
            this.$notify({
              type: 'danger',
              title: '删除失败'
            })
            console.log(response)
          }
        })
      }).catch(() => {})
    }
  },
  mounted () {
    const vm = this
    vm.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    vm.getEssays()
  }
}
</script>

<style scoped>
.el-row {
  width: 100%;
}
.essayContent {
  max-height: 400px;
  overflow: hidden;
}

</style>
