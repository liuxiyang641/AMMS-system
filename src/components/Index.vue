<template>
  <div class="ui vertical masthead center aligned segment fulled v-centered">
      <img src="../assets/index_background.jpg" 
        style="position: absolute; left: 0; right: 0; z-index: -1; height: 100%; width: 100%; opacity: 0.4;" /> 
      <div class="ui text container">
       <h1 class="ui header" style="font-size: 3rem;">
          ACMS会议管理系统
        </h1>
        <h2>All in here</h2>
        <div class="ui hidden divider"></div>
        <div @click="search" class="ui huge primary button">
          最新会议
          <i class="right arrow icon"></i>
        </div>
        <div class="ui huge primary button" v-if="Session.individualUser()">
          在线投稿
          <i class="right arrow icon"></i>
        </div>
        <div class="ui huge primary button" v-if="Session.instituteUser()" @click="toRelease">
          发布会议
          <i class="right arrow icon"></i>
        </div>
      </div>
  </div>
</template>

<script>

  export default {
  	name: 'Index',
    methods: {
      toRelease: function() {
        this.$router.push({
          'path': '/user/' + this.Session.get('type') + '/' + this.Session.get('user_id') + '/release' 
        })
      },
      search: function() {
        this.$router.push({
          path: '/search',
          query: {
            keyword: ''
          }
        })
      }
    } 
  }
</script>

<style scoped>

</style>
