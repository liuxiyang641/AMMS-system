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
  import util from 'util'
  
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
  
      search: function() {
  		   $.get('http://192.144.136.166:4040/graphql', 
  			 {
  				query: util.format(`
  					{
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
  				  this.conferences = response.data.GetConferences;
  				  this.getPage(this.currentPage);
  			  }
  		  );
  
      },
  
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
