<template>
  <div id="app"> 
    <Navbar></Navbar>
    <Sidebar v-if="!inIndex()" 
         :services="getService()">
    </Sidebar>
    <div
      :style="inIndex() ? 'margin-top:5%;height:100%;width:100%;'
          : 'margin-left:15%;margin-top:8%;'">
      <router-view />
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import axios from 'axios'
import util from 'util'

export default {
	name: 'App',
  data: function() {
    return {
    }
  },
  components: {
    Navbar,
    Sidebar
  },
  /*watch: {
    '$route.path': function() {
      this.a = this.$route.path;
      this.getService();
    }
  },*/
  methods: {
    inIndex: function() {
      return this.$route.path == '/';
    },
    inConferenceIndex: function() {
      return /^\/conference\//.test(this.$route.path);
    },
    getService: function() {
      var ret = this.inConferenceIndex() ? this.Session.conference() : this.Session.personal();
      if(!this.inConferenceIndex() || !this.Session.login()) return ret;
      for(var i = 0; i < ret.length; i++) {
        ret[i].route = ret[i].route.replace(/_filler_/, this.$route.params.id);
      }
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
         if(res.data) {
           ret.push({
             service: '投稿列表',
             route: util.format('/conference/%s/all-paper', this.$route.params.id)
           })
           ret.push({
             service: '注册列表',
             route: util.format('/conference/%s/all-attend', this.$route.params.id)
           })
         }
      })
      .catch(err => {
        console.log(err);
      })
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
