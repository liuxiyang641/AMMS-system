<<<<<<< HEAD
<template>
    <div>
        <div class="ui container">
            <b-card no-body>
                <b-tabs pills card vertical>
                    <b-tab title="用户信息">
                        <UserInfo></UserInfo>
                    </b-tab>
                    <b-tab v-if="Session.instituteUser()" title="发布会议">
                        <ReleaseConference></ReleaseConference>
                    </b-tab>
                    <b-tab v-if="Session.instituteUser()" title="会议列表">
                        <ReleasedConferenceList></ReleasedConferenceList>
                    </b-tab>
                    <b-tab v-if="Session.individualUser()" title="我的投稿">
                    </b-tab>
                    <b-tab v-if="Session.individualUser()" title="我的注册">
                    </b-tab>
                    <b-tab v-if="Session.individualUser()" title="我的收藏">
                    </b-tab>
                    <b-tab  v-if="Session.groupUser()" title="内部用户">
                        <InternalUsers></InternalUsers>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>

</template>

<script>
	import ReleaseConference from '@/components/ReleaseConference'
	import UserInfo from '@/components/UserInfo'
	import InternalUsers from '@/components/InternalUsers'
    import ReleasedConferenceList from '@/components/ReleasedConferenceList'

	export default {
		name: "UserIndex",
		components: {
			ReleaseConference, UserInfo, InternalUsers,ReleasedConferenceList
		}
	}
</script>

<style scoped>
</style>
=======
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
>>>>>>> f263a775a76134a1f97f9f21fcc8c07d84313650
