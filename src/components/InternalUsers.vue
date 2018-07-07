<template>
	<div>
		<button v-b-modal.modal2>添加内部用户</button>
		<b-modal v-model="visible" centered title="内部用户注册" hide-footer id="modal2">
			<form class="ui form" id="internal-user-form">
				<div class="required field">
					<label>用户名称</label>
					<input type="text" placeholder="用户名称" v-model="newInternalUser.name" >
					<div class="ui pointing red basic label" ref="" style="display:none">
						请填写用户名称
					</div>
				</div>
				<div class="required field">
					<label>用户邮箱</label>
					<input type="text" placeholder="邮箱" v-model="newInternalUser.email" >
					<div class="ui pointing red basic label" ref="paper_name" style="display:none">
						请填写用户邮箱
					</div>
				</div>
				<div class="required field">
					<label>密码</label>
					<input type="password" v-model="newInternalUser.password"/>
					<div class="ui pointing red basic label" ref="paper_abstract" style="display: none">
						请填写用户密码
					</div>
				</div>
				<br/>
				<button class="ui black button" @click.prevent="internalUserRegister()" style="margin-bottom: 0.5rem">&nbsp;注册</button>
				<div class="ui segment" style="display: none">
					<p></p>
					<div class="ui dimmer active">
						<div class="ui loader"></div>
					</div>
				</div>
				
			</form>
		</b-modal>
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
						<button @click="deleteInternalUser(internalUser.id)">删除</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'InternalUsers',
	data: function () {
		return {
			visible: false,
			internalUsers: [],
			newInternalUser: {
				name: '',
				email: '',
				password: '',
				groupuserid: parseInt(this.$route.params.id)
			}
		}
	},
	methods: {
		alertRegisterWarning: function() {
			var header = $('<div class="header">注意</div>');
			var p = $('<p>请检查你的提交，保证每一个必选项都得到了正确的填写</p>');
			var warning = $('<div style="z-index:1100; position:fixed; top:20px; right:20px; display:block;" class="ui warning message"></div>');
			warning.append(header);
			warning.append(p);
			
			var body = $("body");
			body.append(warning);
			setTimeout(() => {
				warning.fadeOut(() => {
					warning.remove();
				});
			}, 1000);
		},
		alertRegisterSuccess: function() {
			var header = $('<div class="header">注册成功</div>');
			var p = $('<p>你的账号已成功注册，现在可以登陆了！</p>');
			var success = $('<div style="z-index:1100; position:fixed; top:20px; right:20px; display:block;" class="ui success message"></div>');
			success.append(header);
			success.append(p);
			
			var body = $("body");
			body.append(success);
			setTimeout(() => {
				success.fadeOut(() => {
					success.remove();
				});
			}, 1000);
		},
		alertRegisterError: function(error) {
			var header = $('<div class="header">注册失败</div>');
			var p = $('<p>' + error + '</p>');
			var failure = $('<div style="z-index:1100; position:fixed; top:20px; right:20px; display:block;" class="ui error message"></div>');
			failure.append(header);
			failure.append(p);
			
			var body = $("body");
			body.append(failure);
			setTimeout(() => {
				failure.fadeOut(() => {
					failure.remove();
				});
			}, 1000);
		},
		alertDeleteSuccess: function() {
			var header = $('<div class="header">删除成功</div>');
			var success = $('<div style="z-index:1100; position:fixed; top:20px; right:20px; display:block;" class="ui success message"></div>');
			success.append(header);
			
			var body = $("body");
			body.append(success);
			setTimeout(() => {
				success.fadeOut(() => {
					success.remove();
				});
			}, 1000);
		},
		alertDeleteError: function() {
			var header = $('<div class="header">删除失败，请稍后重试！</div>');
			var failure = $('<div style="z-index:1100; position:fixed; top:20px; right:20px; display:block;" class="ui error message"></div>');
			failure.append(header);
			
			var body = $("body");
			body.append(failure);
			setTimeout(() => {
				failure.fadeOut(() => {
					failure.remove();
				});
			}, 1000);
		},
		internalUserRegister:function () {
			if (this.newInternalUser.name === '' || this.newInternalUser.email === '' || this.newInternalUser.password === '' ) {
				this.alertRegisterWarning();
				return;
			}
			console.log(this.newInternalUser);
			axios.post('http://192.144.153.164:9000/groupinternal/register',this.newInternalUser).then(
				(res) => {
					console.log(res);
					if (res.data==='注册成功'){
						this.alertRegisterSuccess();
						this.getInternalUsers();
						this.newInternalUser.name = '';
						this.newInternalUser.email = '';
						this.newInternalUser.password = '';
					}
					else {
						this.alertRegisterError(res.data);
					}
				}
			);
		},
		deleteInternalUser: function(internalUserId) {
			axios.delete('http://192.144.153.164:9000/groupinternal/delete', {
				params: {
					group: parseInt(this.$route.params.id),
					internaluser: parseInt(internalUserId)
				}
			}).then((res) => {
				if(res.data) {
					this.alertDeleteSuccess();
					this.getInternalUsers();
				}
				else
					this.alertDeleteError();
			})
		},
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
		}
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
