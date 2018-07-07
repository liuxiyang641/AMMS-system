<template>
  <div>
    <users_list></users_list>
  </div>
</template>

<script>
import users_list from './components/users_list'
export default {
  name: 'App',
  components:{
  users_list,
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
