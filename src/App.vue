<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="/">学术会议管理平台</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-button v-bind:href="'/#/user/' + session('user_type') + '/' + username" v-if="is_login" class="mr-2"> {{username}} </b-button>
          <b-button v-else="is_login" v-b-modal.modal1 class="mr-2">登录</b-button>
          <b-button v-if="is_login" @click="logout">登出</b-button>
          <b-button v-else="is_login">注册</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal ref="login_modal" id="modal1" title="登录">
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="5">用户名:</b-col>
          <b-col sm="10">
            <b-form-input v-model="email" type="text" placeholder="Enter your name"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="5">密码:</b-col>
          <b-col sm="10">
            <b-form-input v-model="password" type="password" placeholder="Enter your password"></b-form-input>
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
      password: '',
      is_login: null,
      username: null,
      user_type: null 
    }
  },
  components: {},
  mounted: function() {
    this.reset_bind();
  },
  methods: {
    reset_bind: function() {
      this.$data.is_login = this.session('is_login');
      this.$data.username = this.session('username');
      this.$data.user_type = this.session('user_type');
    },
    session: function(key) {
      return window.sessionStorage.getItem(key);
    },
    setS: function(key, val) {
      window.sessionStorage.setItem(key, val);
    },
    remS: function(key) {
      window.sessionStorage.removeItem(key);
    },
    login: function() {
      var account = {
        email: this.$data.email,
        password: this.$data.password
      };
      var router = this.$router;
      var refs = this.$refs;
      var _setS = this.setS;
      var _session = this.session;
      let urls = [
        'http://193.112.111.199:9090/individual-login',
        'http://193.112.111.199:9090/group-user-login',
        'http://193.112.111.199:9090/group-internal-login'
      ];
      async.map(urls, function(url, callback) {
        $.post(url, account, function(data) {
          callback(null, data);
        });
      }, function(err, res) {
        console.log(res);
        for(var i = 0; i < res.length; i++) {
          var e = eval('(' + res[i] + ')');
          if(parseInt(e.statuscode) == 1) {
           _setS('username', e.username);
           _setS('user_type', e.type);
           _setS('is_login', true);
          }
        }
        if(!_session('is_login')) {
          alert('登录失败');
        }
        else {
          refs.login_modal.hide();
          window.location.reload();
        }
      });
      
    },
    logout: function() {
      this.remS('is_login');
      this.remS('username');
      this.remS('user_type');
      window.location.href = '/';
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
</style>
