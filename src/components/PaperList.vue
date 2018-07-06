<template>
	<table class="ui celled table">
		<thead>
			<tr>
				<th>序号</th>
				<th>论文名称</th>
				<th>论文作者</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="paper in page" :key="paper.paperid">
				<td>{{paper.paperid}}</td>
				<td>{{paper.papername}}</td>
				<td>{{paper.paperauthor}}</td>
				<td><a :href="paper.paperurl">下载</a></td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th colspan="4">
					<b-pagination class="mt-4" :total-rows="papers.length" :per-page="perPage" v-model="currentPage"></b-pagination>
				</th>
			</tr>
		</tfoot>
	</table>
</template>

<script>
import axios from 'axios';

export default {
	name: 'PaperList',
	data: function () {
		return {
			currentPage: 1,
			perPage: 10,
			page: [],
			papers: []
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
			this.page = this.papers.slice((currentPage - 1) * this.perPage, Math.min(currentPage * this.perPage, this.papers.length));
		},
		getPapers: async function () {
			const res = await axios.get('http://192.144.153.164:9000/conference/paper', 
				{
					params: {
						conferenceid: this.$route.params.id
					}
				}
			).then((response) => {
				this.papers = response.data;
			}).catch((err) => {
				console.log(err);
			});
			this.getPage(this.currentPage);
		},
	},
	created: function () {
		this.getPapers();
	}
}
</script>

<style scoped>
</style>
