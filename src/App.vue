<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="/">学术会议管理平台</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
            <b-button  v-b-modal.modal1 id="log">登录/ID</b-button>
            <b-button>注册/登出</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal id="modal1" title="登录">
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="5">用户名:</b-col>
          <b-col sm="10">
            <b-form-input v-model="email" id="input-default" type="text" placeholder="Enter your name"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="5">密码:</b-col>
          <b-col sm="10">
            <b-form-input v-model="passwd" id="input-default" type="text" placeholder="Enter your password"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
       <div slot="modal-footer" class="w-100">
        <b-btn class="float-right" variant="primary" @click="login">
           登录
        </b-btn>
       </div>
    </b-modal>
    <router-view />
  </div>
</template>

<script>
import async from 'async'
export default {
	name: 'App',
  data: function() {
    return {
      email: '',
      passwd: ''
    }
  },
  components: {},
  methods: {
    login: function() {
      var dat = {
        email: this.$data.email,
        passwd: this.$data.passwd
      };
      console.log(dat);
      let urls = [
        'http://193.112.111.199:9090/individual-login',
        'http://193.112.111.199:9090/group-user-login',
        'http://193.112.111.199:9090/group-internal-login'
      ];
      async.map(urls, function(url, callback) {
        $.post(url, dat, function(data) {
          callback(null, data);
        });
      }, function(err, res) {
        console.log(res);
      });
    }
  }
}
</script>


<style scoped>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
#log {
  margin-right: 4px;
}
</style>
