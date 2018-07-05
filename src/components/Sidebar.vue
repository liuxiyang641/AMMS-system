<template>
  <div class="ui vertical fluid inverted menu" style="border-radius: 0; padding-top: 2rem; position: absolute; top: 0; bottom: 0">
    <img class="ui centered small circular image" src="../assets/square.jpg" />
    <div class="ui hidden divider"></div>
    <div class="item" style="text-align: center;">
      <div class="header" style="font-size: 1.3rem;"> {{ Session.get('username') }} </div>
      <div class="mt-4">
        <i class="small green circle icon"></i>
        个人用户
      </div>
    </div>
    <div class="ui hidden divider"></div>
    <div v-for="a in times" class="ui dropdown item" style="text-align: center; font-size: 1.2rem;">
      <i class="angle right icon"></i>
      个人信息
    </div>
    
  </div> 
</template>

<script>
  export default {
    name: 'Sidebar',
    data: function() {
      return {
        times: [1,2,3,4]
      }
    }
  }
</script>
