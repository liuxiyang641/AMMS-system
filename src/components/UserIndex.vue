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
