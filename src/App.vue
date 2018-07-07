<template>
  <div id="app"> 
    <Navbar></Navbar>
    <Sidebar v-if="!inIndex()" 
         :services="services">
    </Sidebar>
    <div
      :style="inIndex() ? 'margin-top:5%;height:100%;width:100%;'
          : 'margin-left:15%;margin-top:8%;margin-bottom: 3%;'">
      <router-view v-if="isRouterAlive" />
    </div>
    <div class="ui success icon message reminder">
      <i class="big checkmark icon"></i>
      <div class="content">
        <div class="header">Default</div>
        <p>default</p>
      </div>
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
      services: [],
      isRouterAlive: true
    }
  },
  components: {
    Navbar,
    Sidebar
  },
  created: function() {
    this.getService();
  },
  mounted: function() {
    this.unremind();
  },
  watch: {
    '$route.path': function() {
      this.getService();
      this.reload();
    }
  },
  methods: {
    reload: function() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    inIndex: function() {
      return this.$route.path == '/';
    },
    inConferenceIndex: function() {
      return /^\/conference\//.test(this.$route.path);
    },
    getService: function() {
      this.services = [];
      let ret = this.inConferenceIndex() ? this.Session.conference() : this.Session.personal();
      for(var i = 0; i < ret.length; i++) {
        this.services.push({
            service: ret[i].service,
            route: ret[i].route.replace(/_filler_/, this.$route.params.id)
        });
      }
      if(!this.inConferenceIndex() || !this.Session.login()) {
         return;
      }
      var _this = this;
      if(this.Session.instituteUser()) {
         var typecode = this.Session.individualUser() ? 1 : (this.Session.groupUser() ? 2 : 3); 
         axios.get('http://192.144.153.164:9000/conference/permission', {
           params: {
             conferenceid: parseInt(this.$route.params.id),
             userid: parseInt(this.Session.get('user_id')),
             type: typecode
           }
         })
         .then(res => {
            if(Boolean(res.data)) {
              _this.services.push({
                service: '审核稿件',
                route: util.format('/conference/%s/review', this.$route.params.id)
              })
              _this.services.push({
                service: '注册列表',
                route: util.format('/conference/%s/registration', this.$route.params.id)
              })
            }
         })
         .catch(err => {
           console.log(err);
         })
       }
       else {
         var _this = this;
         axios.get('http://192.144.153.164:9000/register/conference', {
           params: {
             conferenceid: parseInt(this.$route.params.id)
           }
         })
         .then(res => {
           var arr = res.data;
           var registered = false;
           for(var i = 0; i < arr.length; i++) {
             registered |= (parseInt(arr[i].individualUser.individualUserId) 
                              == parseInt(_this.Session.get('user_id')));
           }
           if(!registered) {
             _this.services.push({
               service: '注册会议',
               route: '/conference/' + _this.$route.params.id + '/register'
             })
           }
         })
         .catch(err => {
           console.log(err);
         })
       }
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
