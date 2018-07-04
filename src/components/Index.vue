<template>
  <div class="ui vertical masthead center aligned segment" style="height: 100%; padding: 0;">
    <Navbar></Navbar>
    <div style="height: 90%; margin-top: -1rem;">
      <img src="../assets/index_background.jpg" style="position: absolute; left: 0; right: 0; z-index: -1; height: 90%; width: 100%; opacity: 0.4;" /> 
      <div class="ui text container" style="padding-top: 16rem;">
       <h1 class="ui header" style="font-size: 3rem;">
         AMMS会议管理系统
       </h1>
       <h2>All in here</h2>
       <div class="ui hidden divider"></div>
       <div class="ui huge primary button">
         最新会议
         <i class="right arrow icon"></i>
       </div> 
     </div>
    </div>
  </div>
</template>

<script>

  import Navbar from '@/components/Navbar'
  export default {
  	name: 'Index',
    data: function() {
      return {
      }
    },
  	components: {
      Navbar
  	}
  }

</script>

<style scoped>

</style>
