<template>
  <div class="ui top fixed large inverted menu" style="border-radius: 0; margin: 0;">
    <div class="item">
      <div class="ui logo shape">
        <img src="../assets/logo.png" />
      </div>
    </div>
    <div class="item" @click="toIndex()">
      <strong>ACMS会议管理系统</strong>
    </div>
    <div class="item">
       <div class="ui fluid search">
         <div class="ui icon input">
           <input v-model="keyword" @keydown.enter="navSearch" class="prompt" type="text" placeholder="搜索会议" />
           <i class="search icon"></i>
         </div>
       </div>
    </div>
    <div class="right item">
      <a class="ui inverted button mr-3" @click="toUser" v-if="Session.login()"> {{ Session.get('username') }} </a>
      <a class="ui inverted button mr-3" v-else v-b-modal.login_modal>登录</a>
      <a class="ui inverted button" v-if="Session.login()" @click="logout">登出</a>
      <a class="ui inverted button" v-else href="/register">注册</a>
    </div>
    <b-modal ref="login_modal" id="login_modal" centered title="登录">
      <div class="ui form">
        <div id="login-email" class="inline required field">
          <label>邮箱</label>
          <input type="email" v-model="email" placeholder="Email Address"/>
          <div class="ui left pointing red basic label" ref="paper_abstract" style="display: none;">
              请填写邮箱
          </div>
        </div>

        <div id="login-password" class="inline required field">
          <label>密码</label>
          <input type="password" v-model="password" placeholder="Password"/>
           <div class="ui left pointing red basic label" ref="paper_abstract" style="display: none;">
              请填写密码
          </div>
        </div>
      </div>
      <div slot="modal-footer">
          <div @click="hideLoginModal" class="ui black right labeled icon button">
            取消
            <i style="background:transparent;" class="times icon"></i>
          </div>
          <div id="login-footer" @click="login" class="ui positive right labeled icon button">
            登录
            <i style="background:transparent;" class="checkmark icon"></i>
          </div>
      </div>
    </b-modal>
  </div>
</template>

<script>

import async from 'async'

export default {
	name: 'Navbar',
  data: function() {
    return {
      email: null,
      password: null,
      keyword: ''
    }
  },
  created: function() {
    this.ajaxPromise({
      url: 'http://193.112.111.199:9090/get-session',
      type: "GET",
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
    .then(res => {
      var e = eval('(' + res + ')');
      for(var key in e) this.Session.set(key, e[key]);
    })
    .catch(err => {
      console.log(err);
    })
  },
  updated: function() {
    $('#login_modal .ui.left.pointing.label').hide();
  },
  methods: {
    toIndex: function() {
      this.$router.push({
        path: '/'
      })
    },
    hideLoginModal: function() {
      this.$refs.login_modal.hide();
    },
    toUser: function() {
      this.$router.push({
        path: '/user/' + this.Session.get('type') + '/' + this.Session.get('user_id') + '/info'
      })
    },
    navSearch: function() {
      var _this = this;
      this.$router.push({
        path: '/search',
        query: {
          keyword: _this.keyword
        } 
      })
    },
    login: function() {
      var account = {
        email: this.$data.email,
        password: this.$data.password
      };
      var valid = (account.email && account.password);
      if(!account.email) {
        $('#login-email .ui.left.pointing.label').text('请填写用户邮箱');
        $('#login-email .ui.left.pointing.label').show();
      }
      if(!account.password) {
        $('#login-password .ui.left.pointing.label').text('请填写用户密码');
        $('#login-password .ui.left.pointing.label').show();
      }
      if(!valid) return;
      var _this = this;
      var urls = [
        'http://193.112.111.199:9090/individual-login',
        'http://193.112.111.199:9090/group-user-login',
        'http://193.112.111.199:9090/group-internal-login'
      ];
      $('#login-footer i').addClass('spinner loading');
      $('#login-footer i').removeClass('checkmark');
      async.map(urls, function(_url, callback) {
        _this.ajaxPromise({
          url: _url,
          type: "POST",
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: account
        })
        .then(res => {
            var e = eval('(' + res + ')');
            callback(null, parseInt(e.statuscode) == 1 ? true: false);
        })
        .catch(err => {
          callback(err, null);
        })
      }, function(err, res) {
        $('#login-footer i').removeClass('spinner loading');
        $('#login-footer i').addClass('checkmark');
        if(err) {
          console.log(err);
          return;
        }
        var e = false;
        for(var i = 0; i < res.length; i++) e |= res[i];
        if(!e) {
          $('.ui.left.pointing.label').text('邮箱或密码错误');
          $('.ui.left.pointing.label').show();
          return;
        }
        console.log(res);
        _this.ajaxPromise({
          url: 'http://193.112.111.199:9090/get-session',
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        })
        .then(usr => {
          var e = eval('(' + usr + ')');
          for(var key in e) _this.Session.set(key, e[key]);
          _this.$refs.login_modal.hide();
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        })
      });
    },
    logout: function() {
      this.ajaxPromise({
        url: 'http://193.112.111.199:9090/logout',
        type: "GET",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      })
      .then(() => {
        this.Session.clear();
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>


<style scoped>

</style>
