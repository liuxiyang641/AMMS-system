<template>
    <div v-if="window.sessionStorage.getItem('user_type') == 'individual_user'">
		<h3>{{userInfo.name}}</h3>
		<p>邮箱：{{userInfo.email}}</p>
    </div>
	<div v-else-if="window.sessionStorage.getItem('user_type') == 'group_user'">
		<h3>{{userInfo.companyName}}</h3>
		<!--corporationPhotoUrl-->
		<p>邮箱：{{userInfo.email}}</p>
		<p>联系人姓名：{{userInfo.contacterName}}</p>
		<p>联系人电话：{{userInfo.contacterPhone}}</p>
		<p>通信地址：{{userInfo.communicationAddress}}</p>
	</div>
	<div v-else-if="window.sessionStorage.getItem('user_type') == 'group_internal_user'">
		<h3>{{userInfo.name}}</h3>
		<p>电子邮箱：{{userInfo.email}}</p>
		<p>所属单位：{{userInfo.group.companyName}}</p>
	</div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ConferenceInfo",
        data () {
            return {
                userInfo: {}
            }
        },
        methods: {
            async groupInternalUsers() {
				const res = await axios.post('http://193.112.111.199:9090/graphql', {
					query: `
						query groupInternalUsers($id: Int) {
							groupInternalUsers(id: $id) {
								group {
									companyName
								}
								email
								name
							}
						}`,
						variables: {
							id:this.$route.params.id
						}
					}
				);
				this.userInfo = res;
			},
			async groupUsers() {
				const res = await axios.post('http://193.112.111.199:9090/graphql', {
					query: `
						query groupUsers($id: Int) {
							groupUsers(id: $id) {
								email
								contacterName
								contacterPhone
								companyName
								communicationAddress
								corporationPhotoUrl
								groupinternaluserSet
							}
						}`,
						variables: {
							id:this.$route.params.id
						}
					}
				);
				this.userInfo = res;
			},
			async individualUsers() {
				const res = await axios.post('http://193.112.111.199:9090/graphql', {
					query: `
						query individualUsers($id: Int) {
							individualUsers(id: $id) {
								email
								name
							}
						}`,
						variables: {
							id:this.$route.params.id
						}
					}
				);
				this.userInfo = res;
			}
        },
        created: function () {
            this.GetConferenceInfo();
        },
        watch: {
			'$route.params': function() {
				this.GetUserInfo();
			}
        }
    }
</script>

<style scoped>
</style>
