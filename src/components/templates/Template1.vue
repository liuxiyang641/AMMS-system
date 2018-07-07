<template>
    <div class="modal-content">
        <div class="modal-header text-center">
            <h2 class="modal-title">
                {{title}}&nbsp;&nbsp;&nbsp;&nbsp;
                <b-badge ref="mbadge" :variant="variant_class">
                  {{status}}
                </b-badge>
            </h2>
		      	<span v-if="Session.login() && Session.individualUser()">
		      		<button v-if="!favorite" 
                  class="ui labeled basic button" 
                  @click="ChangeUserFavorite">
                <i class="empty star icon"></i>
                收藏
              </button>
		      		<button v-else 
                class="ui labeled basic button" 
                @click="ChangeUserFavorite">
                <i class="star icon"></i>
                取消收藏
              </button>
		      	</span>
        </div>
        <div class="modal-body">
            <b-container>
                <!--会议简介-->
                <b-row>
                    <h4><i class="info circle icon"></i>会议简介</h4>
                    <p class="lead">&nbsp;&nbsp;{{introduction===''?'暂无简介':introduction}}</p>
                </b-row>
                <!--征文信息-->
                <b-row>
                    <h4><i class="file text icon"></i>征文信息</h4>
                    <p class="lead">&nbsp;&nbsp;{{essay_info===''?'暂无简介':essay_info}}</p>
                </b-row>
                <!--相关日期-->
                <b-row>
                    <h4> <i class="calendar outline icon"></i>会议相关日期</h4>
                    <p style="width: 100%">
                        <b-table striped hover bordered :items="items" :fields="fields" style="width: 40%"></b-table>
                    </p>
                </b-row>
                <!--论文模板-->
                 <b-row>
                    <h4><i class="calendar icon"></i>论文模板</h4>
                    <p>
                    <form action='http://192.144.136.166:4040/download'
                          method='post'
                           encType="multipart/form-data">
                        <input v-model="confId" type="text" name="ConferenceID_Download" hidden/>
                        <input type='submit' v-if="paper_template_url" :value='paper_template_url'/>
                    </form>
                    </p>
                </b-row>


                <!--日程安排-->
                <b-row>
                    <h4><i class="calendar icon"></i>日程安排</h4>
                    <br/>
                    <p class="lead"> &nbsp;&nbsp;{{schedule===''?'暂无简介':schedule}}</p>
                </b-row>
                <!--组织机构-->
                <b-row>
                    <h4><i class="university icon"></i>主办单位</h4>
                    <br/>
                    <p class="lead"> &nbsp;&nbsp;{{institution===''?'暂无简介':institution}}</p>
                </b-row>
                <!--会议地点-->
                <b-row>
                    <h4><i class="map signs icon"></i>会议地点</h4>
                    <br/>
                    <p class="lead"> &nbsp;&nbsp;{{address===''?'暂无简介':address}}</p>
                </b-row>
                <!--住宿交通-->
                <b-row>
                    <h4><i class="compass icon"></i>住宿与交通</h4>
                    <br/>
                    <p class="lead"> &nbsp;&nbsp;{{accommodation_transportation===''?'暂无简介':accommodation_transportation}}</p>
                </b-row>
                <!--联系方式-->
                <b-row>
                    <h4><i class="mail icon"></i>联系方式</h4>
                    <br/>
                    <address style="width: 100%">
                        <span class="lead">&nbsp;&nbsp;{{contact_us===''?'暂无简介':contact_us}}</span>
                    </address>
                </b-row>
            </b-container>
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
        margin-top: 0.7rem;
        margin-bottom: 2.0rem;
        width: 100%;
    }
    i{
        color: #603811;
    }
</style>
