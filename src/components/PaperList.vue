<template>
  <div>
    <b-table striped hover :items="page"></b-table>
	<b-pagination class="mt-4" :total-rows="papers.length" :per-page="perPage" v-model="currentPage"></b-pagination>
  </div>
</template>

<script>
import ConferenceItem from '@/components/ConferenceItem'
import SearchPanel from '@/components/search-panel'
import util from 'util'

export default {
	name: 'PaperList',
	data: function () {
		return {
			currentPage: 1,
			perPage: 10,
			page: [],
			papers: [],
		}
	},
	watch: {
		currentPage: function (newVal) {
			this.getPage(newVal);
		},
		'$route.query': function() {
		  this.search();
		}
	},
	methods: {

    search: function() {
		console.log(JSON.stringify(this.$route.query));
			$.get('http://192.144.136.166:4040/graphql', 
				{
					query: util.format(`
						{
							???
							GetConferences(keyword: "%s", paper_ddl_begin: "%s", paper_ddl_end: "%s", start_time_begin: "%s", start_time_end: "%s") {
								title
								introduction
								status
								start_time
								institution
								conference_id
							}
					}`, this.$route.query.keyword, this.$route.query.paper_ddl_begin ,this.$route.query.paper_ddl_end, this.$route.query.start_time_begin, this.$route.query.start_time_end)				
				},
				(response) => {
					this.pages = response.???;
					this.getPage(this.currentPage);
				}
		  );
		},

		getPage: function (currentPage) {
			this.page = this.pages.slice((currentPage - 1) * this.perPage, Math.min(currentPage * this.perPage, this.conferences.length) - 1);
		}
	}
}
</script>

<style scoped>
</style>
