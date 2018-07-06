<template>
  <div id="app"> 
    <Navbar></Navbar>
    <Sidebar v-if="!inIndex()" 
         :services="getService()">
    </Sidebar>
    <div class="ui fluid container fulled" 
      :style="'position:absolute;'+(inIndex()?'padding:0;top:6rem;left:0;':'top:8rem;left:14rem;')">
      <router-view />
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import axios from 'axios'

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
    },
    getService: function() {
      var ret = this.inConferenceIndex() ? this.Session.conference() : this.Session.personal();
      if(!this.inConferenceIndex() || !this.Session.login()) return ret;
      var typecode = this.Session.individualUser() ? 1 : (this.Session.groupUser() ? 2 : 3); 
      var url = 'http://192.144.153.164:9000/conference/permission';
      axios.get(url, {
        params: {
          conferenceid: parseInt(this.$route.params.id),
          userid: parseInt(this.Session.get('user_id')),
          type: typecode
        }
      })
      .then(res => {
        if(res) {
          ret.push('投稿列表');
          ret.push('注册列表');
        }
      })
      .catch(err => {
        console.log(err);
      });
      return ret;
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
