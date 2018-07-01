<template>
  <div id="app">
	<ConferenceList></ConferenceList>
    <router-view/>
  </div>
</template>

<script>
import ConferenceList from '@/components/ConferenceList'

export default {
	name: 'App',
	components: { 
		ConferenceList
	}
}
</script>

<style scoped>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
