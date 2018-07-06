<div class="ui container">
  <b-card no-body>
    <b-tabs pills card vertical>
      <b-tab title="个人信息" active>
          <UserInfo></UserInfo>
        </b-tab>
        <b-tab title="发布会议">
        </b-tab>
        <b-tab title="我的注册">
        </b-tab>
        <b-tab title="我的收藏">
        </b-tab>
        <b-tab title="内部用户">
        </b-tab>
    </b-tabs>
  </b-card>
</div>
<script>
  import UserInfo from '@/components/UserInfo'

  export default {
    name: "UserIndex",
    components: {
      UserInfo
    }
  }
</script>
