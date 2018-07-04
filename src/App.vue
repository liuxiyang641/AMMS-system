<template>
  <div>
    <personal_meeting_registration></personal_meeting_registration>
  </div>
</template>

<script>
import personal_meeting_registration from './components/personal_meeting_registration.vue'
export default {
  name: 'App',
  components:{
  personal_meeting_registration,
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
