<template>

    <div>
		<b-container fluid>
    <b-row class="my-1">
      <b-col sm="1.7"><label>截止时间:从</label></b-col>
      <b-col sm="4"><b-form-input v-model="last_time_from" type="date"></b-form-input></b-col>
      <b-col sm="0.3"><label>到</label></b-col>
      <b-col sm="4"><b-form-input v-model="last_time_to" type="date"></b-form-input></b-col>,
    </b-row>
    <b-row class="my-1">
      <b-col sm="1.7"><label>会议时间:从</label></b-col>
      <b-col sm="4"><b-form-input v-model="begin_time_from" type="date"></b-form-input></b-col>
      <b-col sm="0.3"><label>到</label></b-col>
      <b-col sm="4"><b-form-input v-model="begin_time_to" type="date"></b-form-input></b-col>;
    </b-row>
  </b-container>
        <div class="search-input">
            <input type="text" v-model="keyword" @keyup="get($event)" @keydown.enter="search()">
            <span class="search-reset" @click="clearInput()">&times;</span>
            <button class="search-btn" @click="search()">搜一下</button>
            <div class="search-select">
                <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>

                    <li v-for="(value,index) in myData" :class="{selectback:index==now}" class="search-select-option search-select-list" @mouseover="selectHover(index)" @click="selectClick(index)" :key="value">

                        {{value}}

                    </li>

                </transition-group>

            </div>

        </div>

    </div>

</template>



<script type="text/javascript">
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

// import xxx from someSrc     es6中得到模块的方法。
export default {

    //注册组件
    name: 'SearchPanel',

    components: {
		
    },

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

            logoData: [{

                searchSrc: 'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='

            }]

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

        selectDown: function() {

            this.now++;

            //到达最后一个时，再按下就回到第一个

            if (this.now == this.myData.length) {

                this.now = 0;

            }

            this.keyword = this.myData[this.now];

        },

        selectUp: function() {

            this.now--;

            //同上

            if (this.now == -1) {

                this.now = this.myData.length - 1;

            }

            this.keyword = this.myData[this.now];

        },

        search: function() {

            //打开对应的搜索界面

            window.open(this.logoData[this.searchIndex].searchSrc +'kw='+ this.keyword+'&last_time_from='+this.last_time_from+'&last_time_to='+this.last_time_to+'&begin_time_from='+this.begin_time_from+'&begin_time_to='+this.begin_time_to);

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

            this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function(res) {

                this.myData = res.data.s;

            });

        },

        getIndex: function(index) {

            this.searchIndex = index;

        }

    }

}

</script>



<style type="text/css">

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

    ;

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

.search-select ul{margin:0;text-align: left; }

</style>
