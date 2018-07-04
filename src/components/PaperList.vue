<template>
	<div>
		<div v-for="paper in page" :key="paper.papername">
			<h4>{{paper.papername}}</h4>
			<p>作者：{{paper.paperauthor}}</p>
			<p>摘要：{{paper.paperabstract}}</p>
		</div>
		<b-pagination class="mt-4" :total-rows="papers.length" :per-page="perPage" v-model="currentPage"></b-pagination>
	</div>
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
	},
	watch: {
		'$route.params': function() {
			this.getPapers();
		}
	}
}
</script>

<style scoped>
</style>
