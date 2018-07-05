<template>
    <div>
        <Navbar></Navbar>
        <div class="ui container">
            <b-card no-body>
                <b-tabs pills card vertical>
                    <b-tab title="个人信息">
                        <UserInfo></UserInfo>
                    </b-tab>
                    <b-tab title="发布会议">
                        <ReleaseConference></ReleaseConference>
                    </b-tab>
                    <b-tab title="我的投稿">
                    </b-tab>
                    <b-tab title="我的注册">
                    </b-tab>
                    <b-tab title="我的收藏">
                    </b-tab>
                    <b-tab title="内部用户">
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
    import Navbar from '@/components/Navbar'

	export default {
		name: "UserIndex",
		components: {
			ReleaseConference, UserInfo, InternalUsers,Navbar
		}
	}
</script>

<style scoped>
</style>
