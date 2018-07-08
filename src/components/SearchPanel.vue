<template>
  <div class="ui container" style="padding-left:15%;padding-right:15%">
      <div class="ui fluid action input">
        <input v-model="keyword" class="prompt" type="text" placeholder="Search by keyword or dates" />
        <div class="ui teal button" @click="search">
            搜索会议
        </div>
      </div>
      <div class="ui action input mt-4">
         <input @change="getdate('#c1')" v-model="last_time_from" class="prompt" type="text" id="c1"/>
         <span class="ui green button" @click="calendar(1)">
          <span>最小截稿日期</span>
        </span>
      </div>
       <div class="ui action input mt-4 ml-4">
         <input v-model="last_time_to" class="prompt" type="text" id="c2"/>
         <span class="ui green button" @click="calendar(2)">
          <span>最大截稿日期</span>
        </span>
      </div>
      <div class="ui action input mt-4">
         <input v-model="begin_time_from" class="prompt" type="text" id="c3"/>
         <span class="ui green button" @click="calendar(3)">
          <span>最小会议开始日期</span>
        </span>
      </div>
      <div class="ui action input mt-4 ml-4">
         <input v-model="begin_time_to" class="prompt" type="text" id="c4"/>
         <span class="ui green button" @click="calendar(4)">
            <span>最大会议开始日期</span>
         </span>
      </div>
  </div>
</template>

<script>

export default {
    name: 'SearchPanel',
    data: function() {
        return {
          keyword: '',
		      last_time_from:'',
	  	    last_time_to:'',
	      	begin_time_from:'',
	  	    begin_time_to:'',
        }
    },
    mounted: function() {
        $('#c1').datepicker();
        $('#c2').datepicker();
        $('#c3').datepicker();
        $('#c4').datepicker();
    },
   
    methods: {
      calendar(id) {
        $('#c' + id).datepicker('show');
      },
      getdate(id) {
        console.log($(id).text());
      },
        search: function() {
          console.log($('#c1').text());
          this.$router.push({path:'/search', query:{
            keyword: this.keyword,
            paper_ddl_begin: this.last_time_from,
            paper_ddl_end: this.last_time_to,
            start_time_begin: this.begin_time_from,
            start_time_end: this.begin_time_to
          }})
        },
        selectHover: function(index) {
            this.now = index
        },
        selectClick: function(index) {
            this.keyword = this.myData[index];
            this.search();
        },
        clearInput: function() {
            this.keyword = '';
        },
        getIndex: function(index) {
            this.searchIndex = index;
        }
    }
}

</script>

