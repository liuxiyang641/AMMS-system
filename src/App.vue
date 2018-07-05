<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'
export default {
	name: 'App',
  components: {
    Navbar
  }
}
</script>


<style scoped>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
</style>
