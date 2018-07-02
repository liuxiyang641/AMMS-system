<template>
	<div class="ui container">
		<SearchPanel></SearchPanel>
		<div class="ui three cards">
			<ConferenceItem v-for="conference in page" :key="conference.conference_id" :conference="conference"></ConferenceItem>
		</div>
		<b-pagination class="mt-4" :total-rows="conferences.length" :per-page="perPage" v-model="currentPage"></b-pagination>
	</div>
</template>

<script>
	import ConferenceItem from '@/components/ConferenceItem'
	import SearchPanel from '@/components/SearchPanel'
	import axios from 'axios';
	
	export default {
		name: 'ConferenceList',
		components: {
			ConferenceItem,
			SearchPanel
		},
		data: function () {
			return {
				currentPage: 1,
				perPage: 12,
				page: [],
				conferences: [],
			}
		},
		mounted: function() {
			this.search();
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
			search: async function () {
				const res = await axios.post('http://192.144.136.166:4040/graphql', {
					query: `
						query GetConferences($keyword: String, $paper_ddl_begin: String, $paper_ddl_end: String, $start_time_begin: String, $start_time_end: String) {
							GetConferences(keyword: $keyword, paper_ddl_begin: $paper_ddl_begin, paper_ddl_end: $paper_ddl_end, start_time_begin: $start_time_begin, start_time_end: $start_time_end) {
								title
								introduction
								status
								start_time
								institution
								conference_id
							}
						}`,
						variables: {
							keyword: this.$route.query.keyword,
							paper_ddl_begin: this.$route.query.paper_ddl_begin,
							paper_ddl_end: this.$route.query.paper_ddl_end,
							start_time_begin: this.$route.query.start_time_begin,
							start_time_end: this.$route.query.start_time_end
						}
					}
				);
				this.conferences = res.data.data.GetConferences;
				this.currentPage = 1;
				this.getPage(this.currentPage);
			},
	
			getPage: function (currentPage) {
				this.page = this.conferences.slice((currentPage - 1) * this.perPage, Math.min(currentPage * this.perPage, this.conferences.length));
			}
		}
	}
</script>

<style scoped>
</style>
