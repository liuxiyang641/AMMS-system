<template>
    <div class="ui container">
        <h1 class="ui header">
            {{title}}
            <span v-if="Session.login() && Session.individualUser()" class="right floated star">
            <i class="empty heart icon" v-if="!favorite"
               @click="ChangeUserFavorite"></i>
            <i class="heart icon red" v-else
               @click="ChangeUserFavorite"></i>
            </span>
        </h1>
        <h4 class="ui inverted divider"></h4>
        <div class="ui grid">
            <div class="ten wide column">
                <div class="ui piled segment">
                    <div class="ui blue ribbon label huge">
                        <i class="info icon"></i>会议简介
                    </div>
                    <div class="content">
                        <br/>
                        <p class="lead">{{introduction===''?'暂无简介':introduction}}</p>
                    </div>
                </div>
                <div class="ui piled segment">
                    <div class="ui blue ribbon label huge">
                        <i class="file text icon"></i>征文信息
                    </div>
                    <!--<h2 class="ui header"><i class="file text icon"></i>征文信息</h2>-->
                    <div class="content">
                        <br/>
                        <p class="lead">{{introduction===''?'暂无简介':introduction}}</p>
                    </div>
                </div>
                <div class="ui piled segment">
                    <!--<h2 class="ui header"><i class="calendar icon"></i>日程安排</h2>-->
                    <div class="ui blue ribbon label huge">
                        <i class="calendar icon"></i>日程安排
                    </div>
                    <div class="content scroll">
                        <br/>
                        <p class="lead" v-html="schedule===''?'暂无简介':schedule" style="white-space: pre-wrap"></p>
                    </div>
                </div>
            </div>
            <div class="six wide column">
                <div class="ui piled segment">
                    <!--<h2 class="ui header"></h2>-->
                    <div class="ui teal right ribbon label huge"><i class="calendar outline icon right"></i>会议相关日期</div>
                    <div class="content" style="width: 100%">
                        <br/>
                        <b-table class="lead" striped hover bordered :items="items" :fields="fields" style="width: 100%"></b-table>
                    </div>
                </div>
                <div class="ui piled segment">
                    <!--<h2 class="ui header"><i class="university icon"></i>主办单位</h2>-->
                    <div class="ui teal right ribbon label huge">
                        <i class="university icon"></i>主办单位
                    </div>
                    <div class="content">
                        <p class="lead"> &nbsp;&nbsp;{{institution===''?'暂无简介':institution}}</p>
                    </div>
                </div>
                <div class="ui piled segment">
                    <!--<h2 class="ui header"><i class="map signs icon"></i>会议地点</h2>-->
                    <div class="ui teal right ribbon label huge">
                        <i class="map signs icon"></i>会议地点
                    </div>
                    <div class="content">
                        <p class="lead">&nbsp;&nbsp;{{address===''?'暂无简介':address}}}</p>
                    </div>
                </div>
                <div class="ui piled segment">
                    <!--<h2 class="ui header"><i class="compass icon"></i>住宿与交通</h2>-->
                    <div class="ui teal right ribbon label huge">
                        <i class="compass icon"></i>住宿与交通
                    </div>
                    <div class="content">
                        <p class="lead"> &nbsp;&nbsp;{{accommodation_transportation===''?'暂无简介':accommodation_transportation}}</p>
                    </div>
                </div>
                <div class="ui piled segment">
                    <!--<h2 class="ui header"><i class="mail icon"></i>联系方式</h2>-->
                    <div class="ui teal right ribbon label huge">
                        <i class="mail icon"></i>联系方式
                    </div>
                    <div class="content">
                        <p class="lead">&nbsp;&nbsp;{{contact_us===''?'暂无简介':contact_us}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Template1",
        data: function() {
            var raw = {
                fields: [ '相关日期', '具体时间' ],
				        favorite: false,
                variant_class: '',
                items: [],
                confId: this.$route.params.id
            };
            for(var key in this.conf) raw[key] = this.conf[key];
            return raw;
        },
        props: {
          conf: {
            type: Object,
            required: true
          }
        },
        methods: {
          ChangeUserFavorite: function() {
			       $.post('http://192.144.153.164:9000/collection', {
			     	  conferenceid: this.$route.params.id,
			     	  userid: this.Session.get('user_id')
			       }, (data) => {
			     	  if(data == '取消收藏' || data == '收藏成功')
			     		  this.IsUserFavorite();
			     	  else
			     		  alert(data);
			       });
			    },
		    	async IsUserFavorite() {
		    		const res = await axios.get('http://192.144.153.164:9000/collection',
		    		{
		    			params: {
		    				conferenceid: this.$route.params.id,
		    				userid: this.Session.get('user_id')
		    			}
		    		}).then((response) => {
		    			this.favorite = response.data;
		    		}).catch((err) => {
		    			console.log(err);
		    		});
		    	}
        },
        created: function () {
		      	this.IsUserFavorite();

        },
        watch:{
            '$route.params': function () {
				        this.IsUserFavorite();
            }
        }
    }
</script>

<style scoped>
    .modal-header {
        margin-bottom: 20px;
    }
    p {
        margin-top: 0.2rem;
        margin-bottom: 1.0rem;
        width: 100%;
        /*text-indent: 2rem;*/
    }
    i{
        /*color: #603811;*/
    }
</style>
