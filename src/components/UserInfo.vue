<template>
    <div v-if="$route.params.type == 'individual_user'">
		<h3>{{userInfo.name}}</h3>
		<p>邮箱：{{userInfo.email}}</p>
    </div>
	<div v-else-if="$route.params.type == 'group_user'">
		<h3>{{userInfo.companyName}}</h3>
		<!--corporationPhotoUrl-->
		<p>邮箱：{{userInfo.email}}</p>
		<p>联系人姓名：{{userInfo.contacterName}}</p>
		<p>联系人电话：{{userInfo.contacterPhone}}</p>
		<p>通信地址：{{userInfo.communicationAddress}}</p>
	</div>
	<div v-else-if="$route.params.type == 'group_internal_user'">
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
					query: `query groupInternalUsers($name: String) {
						groupInternalUsers(name: $name) {
							group {
								companyName
							}
							email
							name
						}
					}`,
					variables: {
						name:this.$route.params.id
					}
				});
				this.userInfo = res.data.data.groupInternalUsers[0];
			},
			async groupUsers() {
				const res = await axios.post('http://193.112.111.199:9090/graphql', {
					query: `query groupUsers($companyName: String) {
						groupUsers(companyName: $companyName) {
							email
							contacterName
							contacterPhone
							companyName
							communicationAddress
							corporationPhotoUrl
							groupinternaluserSet {
								id
							}
						}
					}`,
					variables: {
						companyName:this.$route.params.id
					}
				});
				this.userInfo = res.data.data.groupUsers[0];
			},
			async individualUsers() {
				const res = await axios.post('http://193.112.111.199:9090/graphql', {
					query: `query individualUsers($name: String) {
						individualUsers(name: $name) {
							email
							name
						}
					}`,
					variables: {
						name:this.$route.params.id
					}
				});
				this.userInfo = res.data.data.individualUsers[0];
			},
			getUserInfo: function () {
				switch (this.$route.params.type) {
					case 'individual_user': this.individualUsers(); break;
					case 'group_user': this.groupUsers(); break;
					case 'group_internal_user': this.groupInternalUsers(); break;
				}
			}
        },
        created: function () {
			this.getUserInfo();
        },
        watch: {
			'$route.params': function() {
				this.getUserInfo();
			}
        }
    }
</script>

<style scoped>
</style>
