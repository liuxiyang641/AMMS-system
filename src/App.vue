<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#">学术会议管理平台</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
            <b-button style="margin-right: 4px;">登陆/ID</b-button>
            <b-button>注册/登出</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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

<style>
#app {

}
</style>
