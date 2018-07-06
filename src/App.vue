<template>
  <div id="app"> 
    <Navbar></Navbar>
    <Sidebar v-if="!inIndex()" 
         :services="inConferenceIndex() ? Session.conference() : Session.personal()">
    </Sidebar>
    <div class="ui fluid container fulled" 
      :style="'position:absolute;'+(inIndex()?'padding:0;top:6rem;left:0;':'top:8rem;left:8rem;')">
      <router-view />
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default {
	name: 'App',
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    inIndex: function() {
      return this.$route.path == '/';
    },
    inConferenceIndex: function() {
      return /^\/conference\/\d+$/.test(this.$route.path);
    }
  }
}
</script>


<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
</style>
