<template>
  <div style="height: 100%;">
    <Navbar></Navbar>
    <div class="ui grid" style="height: 90%;">
      <div class="three wide column">
        <Sidebar></Sidebar>
      </div>
      <div class="thirteen wide column">
       <!-- <SearchPanel></SearchPanel>
        <div class="ui three cards">
          <ConferenceItem v-for="conference in page" :key="conference.conference_id" :conference="conference"></ConferenceItem>
        </div>
        <b-pagination class="mt-4" :total-rows="conferences.length" :per-page="perPage" v-model="currentPage"></b-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
  import ConferenceItem from '@/components/ConferenceItem'
  import SearchPanel from '@/components/SearchPanel'
  import Navbar from '@/components/Navbar'
  import Sidebar from '@/components/Sidebar'
  import util from 'util'
  
  export default {
  	name: 'ConferenceList',
  	components: {
  		ConferenceItem,
      SearchPanel,
      Navbar,
      Sidebar
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
