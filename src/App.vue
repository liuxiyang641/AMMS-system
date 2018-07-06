<template>
  <div>
    <user_list></user_list>
  </div>
</template>

<script>
import user_list from './components/users_list.vue'
export default {
  name: 'App',
  components:{
  user_list,
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
