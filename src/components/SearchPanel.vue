<template>
	<div class="mb-4">
		<div class="search-input" style="display:inline-block;">
		    <input type="text" v-model="keyword" @keyup="get($event)" @keydown.enter="search()">
		    <span class="search-reset" @click="clearInput()">&times;</span>
        <button class="search-btn" @click="search()">搜索会议</button>
		    <div class="search-select">
		        <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>

		            <li v-for="(value,index) in myData" :class="{selectback:index==now}" class="search-select-option search-select-list" @mouseover="selectHover(index)" @click="selectClick(index)" :key="value">

		                {{value}}

		            </li>

		        </transition-group>

		    </div>
		</div>

		<div style="display:inline-block;">
			<b-btn v-b-toggle.collapse1 variant="primary">高级搜索</b-btn>
			<b-collapse id="collapse1" class="mt-4">
				<b-card>		
					<b-container fluid>
						<b-row class="my-1">
							<b-col sm="1.7"><label>截止时间: 从&nbsp;&nbsp;</label></b-col>
							<b-col sm="4.2"><b-form-input v-model="last_time_from" type="date"></b-form-input></b-col>
							<b-col sm="0.3"><label>&nbsp;&nbsp;到&nbsp;&nbsp;</label></b-col>
							<b-col sm="4.2"><b-form-input v-model="last_time_to" type="date"></b-form-input></b-col>
						</b-row>
						<b-row class="my-1">
							<b-col sm="1.7"><label>会议时间: 从&nbsp;&nbsp;</label></b-col>
							<b-col sm="4.2"><b-form-input v-model="begin_time_from" type="date"></b-form-input></b-col>
							<b-col sm="0.3"><label>&nbsp;&nbsp;到&nbsp;&nbsp;</label></b-col>
							<b-col sm="4.2"><b-form-input v-model="begin_time_to" type="date"></b-form-input></b-col>
						</b-row>
					</b-container> 			
				</b-card>
			</b-collapse>
		</div>
  </div>
</template>

<script>
export default {
    name: 'SearchPanel',
    data: function() {
        return {
		      last_time_from:'',
	  	    last_time_to:'',
	      	begin_time_from:'',
	  	    begin_time_to:'',
      	  types: [
        	  'text', 'password', 'email', 'number', 'url',
        	  'tel', 'date', `time`, 'range', 'color'
      	  ],
          myData: [],//用来接收ajax得到的数据
          keyword: '',//v-model绑定的输入框的value
          now: -1,
          searchIndex: 0,
        }
    },

    methods: {
        // &event是实参，表示event对象
        get: function(ev) {
            // 如果按得键是上或者下，就不进行ajax
            if (ev.keyCode == 38 || ev.keyCode == 40) {
                return;
            }
        },
        search: function() {
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

<style scoped>
	.search-input {
		height: 45px;
		width: 600px;
		margin: 0 auto;
		margin-top: 10px;
		position: relative;
	}

	.search-input input {
		border: 1px solid #e4e4e4;
		box-sizing: border-box;
		width: 500px;
		height: 45px;
		font-size: 18px;
		float: left;
		padding-left: 10px;
		padding-right: 10px;
		overflow: hidden;
	}

	.search-btn {
		height: 45px;
		width: 100px;
		border: 1px solid mediumseagreen;
		background-color: mediumseagreen;
		color: white;
		font-size: 16px;
		font-weight: bold;
		float: left;
	}

	.search-btn {
		cursor: pointer
	}

	.search-select {
		position: absolute;
		top: 45px;
		width: 500px;
		box-sizing: border-box;
		z-index: 999;
	}

	.search-select li {
		border: 1px solid #d4d4d4;
		border-top: none;
		border-bottom: none;
		background-color: #fff;
		width: 100%
	}

	.search-select-option {
		box-sizing: border-box;
		padding: 7px 10px;
	}

	.selectback {
		background-color: #eee !important;
		cursor: pointer
	}

	input::-ms-clear {
		display: none
	}

	.search-reset {
		width: 21px;
		height: 21px;
		position: absolute;
		display: block;
		line-height: 21px;
		text-align: center;
		cursor: pointer;
		font-size: 20px;
		right: 110px;
		top: 12px
	}

	.search-select-list {
		transition: all 0.5s
	}

	.itemfade-enter,
	.itemfade-leave-active {
		opacity: 0;
	}

	.itemfade-leave-active {
		position: absolute;
	}

	.selectback {
		background-color: #eee !important;
		cursor: pointer
	}

	.search-select ul {
		margin: 0;
		text-align: left;
	}
</style>
