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

    <status></status>
  </div>
</template>

<script>
  //import manege from '@/components/manege'
  import status from '@/components/status'
  export default {
    name: 'App',
    //components:{manege},
    components:{status}
  }
</script>

<style scoped>
#log {
  margin-right: 4px;

}
</style>
