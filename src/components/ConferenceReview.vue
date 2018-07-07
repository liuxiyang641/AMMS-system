<template>
    <div class="ui container">
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
                <th>序号</th>
                <th>论文名称</th>
                <th>论文作者</th>
                <th>状态</th>
                <th>下载</th>
                <th>评审</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="paper in page" :key="paper.paperid">
                <td>{{paper.paperid}}</td>
                <td>{{paper.papername}}</td>
                <td>{{paper.paperauthor}}</td>
                <td v-html="showStatus(paper.status)"></td>
                <td>
                    <a :href="paper.paperurl" style="color: black"><i class="download icon"></i></a>
                </td>
                <td>
                    <button class="ui black basic button" v-if="paper.status===1||paper.status===3" @click="showModal(paper.paperid,paper.status)">评审</button>
                    <!--通过显示✅-->
                    <i class="checkmark icon" v-if="paper.status===2"></i>
                    <i class="times icon" v-if="paper.status===4"></i>
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <th colspan="6">
                    <b-pagination class="mt-6" :total-rows="papers.length" :per-page="perPage" v-model="currentPage"></b-pagination>
                </th>
            </tr>
            </tfoot>
        </table>
        <b-modal ref="review_modal" id="review_modal" centered title="录入评审结果" style="height: auto;">
            <div>
                <select class="ui dropdown" v-model="reviewResult.resultStatus" style="width: 50%;">
                    <option :value="2" style="display: flow">通过</option>
                    <!--修改中不需要再次提交修改意见-->
                    <option :value="3" v-if="this.reviewResult.reviewPaperStatus!==3">需要修改</option>
                    <option :value="4">未通过</option>
                </select>
                <form class="ui form" v-if="reviewResult.resultStatus===3" style="margin-top: 10px">
                    <div class="field">
                            <label>修改说明</label>
                            <textarea v-model="reviewResult.reviewDescription"></textarea>
                    </div>
                </form>
            </div>
            <div class="ui segment" style="display: none">
                <p></p>
                <div class="ui dimmer active">
                    <div class="ui loader"></div>
                </div>
            </div>
            <div class="ui warning message" style="display: none">
                <div class="header">注意：</div>
                <p>请选择相应的评审结果</p>
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

export default {
	name: 'ConferenceReview',
	data: function () {
		return {
			currentPage: 1,
			perPage: 10,
			page: [],
			papers: [],
            reviewResult:{
                resultStatus:null,
                reviewPaperId:null,
                reviewPaperStatus:null,
                reviewDescription:null
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
	methods: {
        countDownChanged (dismissCountDown) {
            this.messageArg.dismissCountDown = dismissCountDown
        },
        showAlert () {
            this.messageArg.dismissCountDown = this.messageArg.dismissSecs
        },
	    resetData:function(){
            this.reviewResult.resultStatus=null;
            this.reviewResult.reviewPaperId=null;
            this.reviewResult.reviewPaperStatus=null;
            this.reviewResult.reviewDescription=null;
        },
	    hideModal:function(){
            this.resetData();
            $('.ui.warning.message').hide();
            $('.ui.segment').hide();
	        this.$refs.review_modal.hide();
        },
        showModal:function(paperid,paperstatus){
            this.$refs.review_modal.show();
            $('.ui.warning.message').hide();
            this.reviewResult.reviewPaperId=paperid;
            this.reviewResult.reviewPaperStatus=paperstatus;
        },
        showStatus: function (statusCode) {
            switch (statusCode){
                case 1:
                    return '待审核';
                case 2:
                    return '已通过';
                case 3:
                    return'修改中';
                case 4:
                    return'未通过'
            }
        },
        postReviewResults:function(){
            if (this.reviewResult.resultStatus!==null){      //选择了评审结果
                let postData;
                if (this.reviewResult.resultStatus===3){
                    postData={
                        paperid:this.reviewResult.reviewPaperId,
                        status:this.reviewResult.resultStatus,
                        modifydescription:this.reviewResult.reviewDescription
                    }
                }
                else {
                    postData={
                        paperid:this.reviewResult.reviewPaperId,
                        status:this.reviewResult.resultStatus,
                    }
                }
                axios.put('http://192.144.153.164:9000/paper/review', postData).then(
                    (res)=>{
                        //评审结果发送
                        //修改相应的paper状态
                        this.page.find(function(paper) {
                            if (paper.paperid===postData.paperid){
                                paper.status=postData.status;
                                return true;
                            }
                            return false;
                        });
                        this.hideModal();
                        this.showAlert();
                    }
                ).catch((error) => {
                    console.log(error);
                });
            }
            else {
                $('.ui.warning.message').show();
            }
        },
		getPage: function (currentPage) {
			this.page = this.papers.slice((currentPage - 1) * this.perPage, Math.min(currentPage * this.perPage, this.papers.length));
		},
		getPapers: async function () {
			const res = await axios.get('http://192.144.153.164:9000/conference/paper',
				{
					params: {
						conferenceid: this.$route.params.id
					}
				}
			).then((response) => {
				this.papers = response.data;
			}).catch((err) => {
				console.log(err);
			});
			this.getPage(this.currentPage);
		},

	},
	created: function () {
		this.getPapers();
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
        })
    },
    updated:function () {
    },
}
</script>

<style scoped>
</style>
