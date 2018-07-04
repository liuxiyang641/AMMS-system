<template>
  <div class="ui fluid large inverted menu" style="height: 10%; margin: 0;">
    <div class="item">
      <div class="ui logo shape">
        <img src="../assets/logo.png" />
      </div>
    </div>
    <a class="item"><strong>AMMS会议管理系统</strong></a>
    <div class="item">
       <div class="ui fluid search">
         <div class="ui icon input">
           <input class="prompt" type="text" placeholder="搜索会议" />
           <i class="search icon"></i>
         </div>
       </div>
    </div>
    <div class="right item">
      <a class="ui inverted button mr-3" v-b-modal.login_modal>登录</a>
      <a class="ui inverted button">注册</a>
    </div>
    <b-modal ref="login_modal" id="login_modal" centered title="登录">
      <div class="ui form">
        <div class="inline required field">
          <label>邮箱</label>
          <input type="email" v-model="email" placeholder="Email Address"/>
        </div>
        
        <div class="inline required field">
          <label>密码</label>
          <input type="password" v-model="password" placeholder="Password"/>
        </div>
      </div>
      <div slot="modal-footer">
          <div v-on:click="hideLoginModal" class="ui black button">取消</div>
          <div v-on:click="login" class="ui positive right labeled icon button">
            登录
            <i class="checkmark icon"></i>
          </div>
      </div>
    </b-modal>
  </div>
</template>

<script>

import async from 'async'
export default {
	name: 'Navbar',
  components: {
  },
  data: function() {
    return {
      email: '',
      password: '',
      is_login: null,
      username: null,
      user_type: null 
    }
  },
  mounted: function() {
    //this.reset_bind();
  },
  methods: {
    hideLoginModal: function() {
      this.$refs.login_modal.hide();
    },
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
     /* var router = this.$router;
      var refs = this.$refs;
      var _setS = this.setS;
      var _session = this.session;*/
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
           /*_setS('username', e.username);
           _setS('user_type', e.type);
           _setS('is_login', true);*/
          $.ajax({
            url: 'http://193.112.111.199:9090/get-session', 
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: function(data) {
              console.log(data);
            }
          });
        }
        /*if(!_session('is_login')) {
          $('#login_modal .field').addClass('error');
        }
        else {
          //refs.login_modal.hide();
          //window.location.reload();

        }*/
      };
     }); 
    },
    logout: function() {
      /*this.remS('is_login');
      this.remS('username');
      this.remS('user_type');
      window.location.href = '/';*/
    }
  }
}
</script>


<style scoped>

</style>
