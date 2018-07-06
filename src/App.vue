<template>
  <div>
    <register_meeting_user_list></register_meeting_user_list>
  </div>
</template>

<script>
import register_meeting_user_list from './components/register_meeting_user_list.vue'
export default {
  name: 'App',
  components:{
  register_meeting_user_list,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
