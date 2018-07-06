<template>
	<div>
		<button>添加内部用户</button>
		<table class="ui celled table">
			<thead>
				<tr>
					<th>用户名</th>
					<th>电子邮箱</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="internalUser in internalUsers" :key="internalUser.id">
					<td>{{internalUser.name}}</td>
					<td>{{internalUser.email}}</td>
					<td>
						<button>删除</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'PaperList',
	data: function () {
		return {
			internalUsers: []
		}
	},
	methods: {
		async getInternalUsers() {
			const res = await axios.post('http://193.112.111.199:9090/graphql', {
				query: `query groupUsers($id: String) {
					groupUsers(id: $id) {
						groupinternaluserSet {
							id
							name
							email
						}
					}
				}`,
				variables: {
					id:this.$route.params.id
				}
			});
			console.log(res);
			this.internalUsers = res.data.data.groupUsers[0].groupinternaluserSet;
		},
	},
	created: function () {
		this.getInternalUsers();
	},
	watch: {
		'$route.params': function() {
			this.getInternalUsers();
		}
	}
}
</script>

<style scoped>
</style>
