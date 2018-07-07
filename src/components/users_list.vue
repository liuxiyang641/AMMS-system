<template>
	<div>
		<b-alert :show="messageArg.dismissCountDown"
        	dismissible
            variant="success"
            @dismissed="messageArg.dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            评审结果发送成功
        </b-alert>
		<table class="ui celled padded table">
			<thead>
			<tr>
				<th>注册ID</th>
				<th>邮箱</th>
				<th>单位名称</th>
				<th>单位ID</th>
				<th>联系电话</th>
				<th>法人照片</th>
				<th>状态</th>
				<th>评审</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="user in page" :key="user.id">
				<td>{{user.id}}</td>
				<td>{{user.email}}</td>
				<td>{{user.company_name}}</td>
				<td>{{user.company_id}}</td>
				<td>{{user.contacter_phone}}</td>
				<td>
					<img :src="'http://' + user.corporation_photo_url" style="color: black" class='min' onclick="this.className = this.className == 'max' ? 'min' : 'max';" id="image1" >
				</td>
				<td v-html="showStatus(user.status)"></td>
				<td>
					<button class="ui black basic button" v-if="user.status===0" @click="showModal(user.id,user.status)">评审</button>
                    <!--通过显示✅-->
                    <i class="checkmark icon" v-if="user.status===1"></i>
                    <i class="times icon" v-if="user.status===2"></i>
				</td>
			</tr>
			</tbody>
			<tfoot>
            <tr>
                <th colspan="6">
                    <b-pagination class="mt-6" :total-rows="user.length" :per-page="perPage" v-model="currentPage"></b-pagination>
                </th>
            </tr>
            </tfoot>
		</table>
		<b-modal ref="review_modal" id="review_modal" centered title="录入审核结果" style="height: auto;">
            <div>
                <select class="ui dropdown" v-model="reviewResult.resultStatus" style="width: 50%;" >
                    <option :value="1" style="display: flow">通过</option>
                    <option :value="2">未通过</option>
                </select>
            </div>
            <div class="ui segment" style="display: none">
                <p></p>
                <div class="ui dimmer active">
                    <div class="ui loader"></div>
                </div>
            </div>
            <div class="ui warning message" style="display: none">
                <div class="header">注意：</div>
                <p>请选择相应的审核结果</p>
            </div>
            <div class="ui success message" style="display: none">
                <div class="header">成功</div>
                <p>审核结果发送成功</p>
            </div>
            <div slot="modal-footer">
                <div class="ui black button" @click="hideModal">取消</div>
                <div class="ui positive right labeled icon button" @click="postReviewResults">
                    提交
                    <i class="checkmark icon"></i>
                </div>
            </div>
        </b-modal>
				
	</div>
</template>

<script>

import axios from 'axios';

export default{
	name:"user_list",
	data:function(){
		return{
			currentPage:1,
			perPage:10,
			page:[],
			user:[],
			reviewResult:{
				resultuserid:null,
				resultStatus:null
			},
			messageArg:{
                dismissSecs: 1,
                dismissCountDown: 0
            }
		}
	},
	watch: {
		currentPage: function (newVal) {
			this.getPage(newVal);
		},
		'$route.params': function () {
			this.currentPage = 1;
		}
	},
	methods:{
		countDownChanged (dismissCountDown) {
            this.messageArg.dismissCountDown = dismissCountDown
        },
        showAlert () {
            this.messageArg.dismissCountDown = this.messageArg.dismissSecs
        },
		enlargeImage1:function(obj){
			console.log(obj);
			obj.width="30px";
			obj.height="3px";
		},
		dropImage1(e){
			console.log(e);
			let image=e.currentTarget;
			image.width="100px";
			image.height="100px";
		},
		resetData:function(){
			this.resultStatus=null;
			this.resultuserid=null;
		},
		hideModal:function(){
            this.resetData();
            $('.ui.warning.message').hide();
            $('.ui.success.message').hide();
            $('.ui.segment').hide();
	        this.$refs.review_modal.hide();
        },
        showModal:function(group_user_id,status){
            this.$refs.review_modal.show();
            $('.ui.warning.message').hide();
            $('.ui.success.message').hide();
            this.reviewResult.resultuserid=group_user_id;
            this.reviewResult.resultStatus=status;
			console.log(this.reviewResult);
        },
        showStatus: function (statusCode) {
            switch (statusCode){
                case 0:
                    return '待审核';
                case 1:
                    return '已通过';
                case 2:
                    return'未通过'
            }
        },
		postReviewResults:function(){
            if (this.reviewResult.resultStatus!==null){      //选择了评审结果
                let postData;
                postData={
                     group_user_id:this.reviewResult.resultuserid,
                     is_approved:this.reviewResult.resultStatus,
                }
				console.log(postData);
			this.user=[];
			axios.post('http://192.144.136.166:4040/graphql',{
				query: `mutation VerifyGroupUser($group_user_id:Int,$is_approved:Boolean)
						{
							VerifyGroupUser(group_user_id:$group_user_id,is_approved:$is_approved)
						}` ,
				variables: postData
				}).then(
				(res)=>{
					console.log(res);
					this.page.find(function(users){
						if(users.group_user_id===postData.group_user_id){
							users.is_approved=postData.status;
							return true;
						}
						return false;
					});
					this.hideModal();
					this.showAlert();
					this.getUsers();
					this.currentPage = 1;
				}
				).catch((error)=>{
					console.log(error);
				});
		}
		else{
			$('.ui.warning.message').show();
			}
		},
		getPage: function (currentPage) {
			this.page = this.user.slice((currentPage - 1) * this.perPage, Math.min(currentPage * this.perPage, this.user.length));
		},
		getUsers: function () {
			axios.post('http://192.144.136.166:4040/graphql',
				{
					query: `
						 {
							GetPendingGroupUsers {
								id
								email
								contacter_name
								contacter_phone
								company_name
								company_id
								communication_address
								corporation_photo_url
								status
							}
						}`
				}
			).then((response) => {
				
				this.user = response.data.data.GetPendingGroupUsers;
				
				this.getPage(this.currentPage);
				console.log(response.data);
			}).catch((err) => {
				console.log(err);
			});
		},

	
	},
	created: function () {
		this.getUsers();
	},
	 mounted:function(){
        axios.interceptors.request.use(config => {
            $('.ui.segment').show();
            return config
        }, error => {
            //请求错误时做些事
            return Promise.reject(error)
        });
        //添加响应拦截器
        axios.interceptors.response.use(response => {
            $('.ui.segment').hide();
            return response
        }, error => {
            //请求错误时做些事
            return Promise.reject(error)
        });
    },
}

</script>

<style>
	.max{
		width:100%;
		height:auto;
	}
	.min{
		width:30px !important;
		height:auto;
	}
</style>