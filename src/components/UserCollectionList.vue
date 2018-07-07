<template>
  <div class="ui container">
	<table class="ui celled structured table">
		<thead>
			<tr>
				<th rowspan="2">会议名称</th>
				<th rowspan="2">举办机构</th>
				<th rowspan="2">举办地点</th>
				<th colspan="5">相关时间</th>
				<th rowspan="2">操作</th>
			</tr>
			<tr>
				<th>会议开始日期</th>
				<th>会议结束日期</th>
				<th>截稿日期</th>
				<th>录用通知日期</th>
				<th>注册截止日期</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="conference in favorite" :key="conference.conferenceid">
				<td><a :href="'/#/conference/' + conference.conferenceid">{{conference.conferenceName}}</a></td>
				<td>{{conference.institution}}</td>
				<td>{{conference.address}}</td>
				<td>{{conference.startTime.split(" ")[0]}}</td>
				<td>{{conference.endTime.split(" ")[0]}}</td>
				<td>{{conference.paperDeadline.split(" ")[0]}}</td>
				<td>{{conference.acceptanceDeadline.split(" ")[0]}}</td>
				<td>{{conference.registerDeadline.split(" ")[0]}}</td>
				<td>
					<button @click="changeUserFavorite(conference.conferenceid)">取消收藏</button>
				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th colspan="9">
					<b-pagination class="mt-4" :total-rows="favorite.length" :per-page="perPage" v-model="currentPage"></b-pagination>
				</th>
			</tr>
		</tfoot>
	</table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'FavoriteList',
	data: function () {
		return {
			currentPage: 1,
			perPage: 10,
			page: [],
			favorite: []
		}
	},
	watch: {
		currentPage: function (newVal) {
			this.getPage(newVal);
		},
		'$route.params': function () {
			this.currentPage = 1;
		}
	},
	methods: {
		getPage: function (currentPage) {
			this.page = this.favorite.slice((currentPage - 1) * this.perPage, Math.min(currentPage * this.perPage, this.favorite.length));
		},
		getFavorite: function () {
      var _this = this;
			axios.get('http://192.144.153.164:9000/collection/user', 
				{
					params: {
						userid: this.$route.params.id
					}
				}
			).then((response) => {
				console.log(response.data);
				_this.favorite = response.data;
				_this.getPage(_this.currentPage);
			}).catch((err) => {
				console.log(err);
			});
		},
		changeUserFavorite: function(conferenceId) {
      var _this = this;
			$.post('http://192.144.153.164:9000/collection', {
				conferenceid: conferenceId,
				userid: this.$route.params.id
			}, (data) => {
				console.log(data);
				if(data == '取消收藏' || data == '收藏成功')
					_this.getFavorite();
				else
					alert(data);
			});
		},
	},
	created: function () {
		this.getFavorite();
	},
	
}
</script>

<style scoped>
</style>

