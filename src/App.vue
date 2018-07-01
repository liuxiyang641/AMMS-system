<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="">学术会议管理平台</b-navbar-brand>

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
            <b-form-input id="input-default" type="text" placeholder="Enter your name"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="5">密码:</b-col>
          <b-col sm="10">
            <b-form-input id="input-default" type="text" placeholder="Enter your password"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <manege></manege>
  </div>
</template>

<script>
  import manege from '@/components/manege'
  export default {
    name: 'App',
    components:{manege}
  }
</script>

<style scoped>
#log {
  margin-right: 4px;

}
</style>
