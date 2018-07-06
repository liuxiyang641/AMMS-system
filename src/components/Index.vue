<template>
  <div class="ui vertical masthead center aligned segment fulled v-centered">
      <img src="../assets/index_background.jpg" 
        style="position: absolute; left: 0; right: 0; z-index: -1; height: 100%; width: 100%; opacity: 0.4;" /> 
      <div class="ui text container">
       <h1 class="ui header" style="font-size: 3rem;">
          AMMS会议管理系统
        </h1>
        <h2>All in here</h2>
        <div class="ui hidden divider"></div>
        <div class="ui huge primary button">
          最新会议
          <i class="right arrow icon"></i>
        </div>
        <div class="ui huge primary button" v-if="Session.individualUser()">
          在线投稿
          <i class="right arrow icon"></i>
        </div>
        <div class="ui huge primary button" v-if="Session.instituteUser()">
          发布会议
          <i class="right arrow icon"></i>
        </div>
      </div>
  </div>
</template>

<script>

  export default {
  	name: 'Index',
    data: function() {
      return {
      }
    },
  	components: {
  	}
  }
</script>

<style scoped>

</style>
