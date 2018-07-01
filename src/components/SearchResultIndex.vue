<template>
  <div class="ui container">    
	  <ConferenceItem v-for="conference in page" :key="conference.conference_id" :conference="conference"></ConferenceItem>
	  <b-pagination :total-rows="conferences.length" :per-page="perPage" v-model="currentPage"></b-pagination>
  </div>
</template>

<script>
import ConferenceItem from '@/components/ConferenceItem'

export default {
	name: 'ConferenceList',
	components: {
		ConferenceItem
	},
	data: function () {
		return {
			currentPage: 1,
			perPage: 10,
			page: [],
			conferences: []
		}
	},
	mounted: function () {
		$.get('http://192.144.136.166:4040/graphql', 
			{
				query: `
					{
						GetConferences {
							title
							introduction
							status
							start_time
							institution
						}
					}`
				,
				variables: {
					keyword: this.$route.query.keyword,
					paper_ddl_begin: this.$route.query.paper_ddl_begin,
					paper_ddl_end: this.$route.query.paper_ddl_end,
					start_time_begin: this.$route.query.start_time_begin,
					start_time_end: this.$route.query.start_time_end
				}
			},
			(response) => {
				this.conferences = response.data.GetConferences;
				this.getPage(this.currentPage);
			}
		);
	},
	watch: {
		currentPage: function (newVal) {
			this.getPage(newVal);
		}
	},
	methods: {
		getPage: function (currentPage) {
			this.page = [];
			for(var i = (currentPage - 1) * this.perPage; i < Math.min(currentPage * this.perPage, this.conferences.length); i++)
				this.page.push(this.conferences[i]);
		}
	}
}
</script>

<style scoped>
</style>
