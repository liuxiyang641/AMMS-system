<template>
  <div class="ui container">
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="个人信息" active>
        </b-tab>
        <b-tab title="发布会议">
          <ReleaseConference></ReleaseConference>
        </b-tab>
        <b-tab title="我的投稿">
        </b-tab>
        <b-tab title="我的注册">
        </b-tab>
      </b-tabs>
    </b-card>
 </div>
</template>

<script>
  import ReleaseConference from '@/components/ReleaseConference'
  export default {
    name: "UserIndex",
    components: {
      ReleaseConference
    }
  }
</script>

<style scoped>

</style>
