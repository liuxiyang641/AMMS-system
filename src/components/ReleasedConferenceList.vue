<template>
  <div class="ui container">
    <table class="ui celled table">
        <thead>
        <tr>
            <th>序号</th>
            <th>会议名称</th>
            <th>会议状态</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr align="center" v-for="conference in conferencesList" :key="conference.conference_id">
            <td>{{conference.conference_id}}</td>
            <td><a :href=" '/conference/' + conference.conference_id + '/info'">{{conference.title}}</a></td>
            <td v-html="showStatus(conference.status)"></td>
            <td>
              <div class="ui small button" @click="updateConference">修改会议信息</div>
            </td>
        </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ReleasedConferenceList",
        data:function(){
            return{
                conferencesList:null
            }
        },
        methods: {
          updateConference: function() {

          },
            showStatus: function (statusCode) {
                switch (statusCode){
                    case '0':
                        return '投稿中';
                    case '1':
                        return '已截稿';
                    case '2':
                        return '注册中';
                    case '3':
                        return'截止注册';
                    case '4':
                        return'会议中';
                    case '5':
                        return'会议完成'
                }
            },
            getConferenceList:function () {
                axios.post('http://192.144.136.166:4040/graphql', {
                    query: `
						query GetConferenceList($id: Int,$user_type:String) {
							GetPublishedConferences(id: $id,user_type: $user_type) {
								conference_id,
                                    title,
                                    status
							}
						}`,
                    variables: {
                        id:this.Session.get('user_id'),
                        user_type:this.Session.get('type')
                    }
                }).then(
                    (res)=>{
                        this.conferencesList=res.data.data.GetPublishedConferences;
                    }
                ).catch(
                    (error)=>{
                        console.log(error);
                    }
                )
            }
        },
        created:function () {
            this.getConferenceList();
        }
    }
</script>

<style scoped>

</style>
