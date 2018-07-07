<template>
  <div class="ui container">
    <Template1 :conf="conferenceInfo" v-if="conferenceInfo.template == 1"></Template1>
	  <Template2 :conf="conferenceInfo" v-else-if="conferenceInfo.template == 2"></Template2>
  </div>
</template>

<script>
    import axios from 'axios';
  	import Template1 from '@/components/templates/Template1'
  	import Template2 from '@/components/templates/Template2'

    export default {
        name: "ConferenceInfo",
		    components: {
			      Template1, Template2
		    },
        data () {
            return {
                fields: [ '相关日期', '具体时间' ],
                conferenceInfo: {}
            }
        },
        methods: {
          async GetConference() {
               const res = await axios.post('http://192.144.136.166:4040/graphql', {
                  query: `
                     query GetConferences($id: Int) {
                        GetConferences(id: $id) {
                           conference_id,
                           title,
                           introduction,
                           status,
                           essay_info,

                           paper_deadline,
                           acceptance_deadline,
                           register_deadline,
                           start_time,
                           end_time,
                           schedule,
                           institution,
                           paper_template_url,
                           register_fee,

                           accommodation_transportation,
                           contact_us,
                           address,
                           template
                      }
                     }`,
                 variables: {
                     id: this.$route.params.id
                 }
             });
             var conferenceInfo = res.data.data.GetConferences[0];
             var statusText = ['投稿中', '已截稿', '注册中', '截止注册', '会议中', '会议完成'];
             conferenceInfo.status = statusText[parseInt(conferenceInfo.status)]; 
             var date_anno = {
               paper_deadline: '截稿日期',
               acceptance_deadline: '录用通知日期',
               register_deadline: '会议注册日期',
               start_time: '会议开始日期',
               end_time: '会议结束日期',
             };
             var items = [];
             for(var key in date_anno) {
               items.push({
                 相关日期: date_anno[key],
                 具体时间: conferenceInfo[key]
               })
             }
             console.log(items);
             conferenceInfo.items = items;
             this.conferenceInfo = conferenceInfo;
            }
        },
        created: function () {
            this.GetConference();
        },
        watch:{
            '$route.params': function () {
				        this.GetConference();
            }
        }
    }
</script>

