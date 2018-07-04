<template>
  <div class="ui container">
    <SearchPanel></SearchPanel>
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="会议信息" active>
          <ConferenceInfo :conferenceInfo="this.conferenceInfo"></ConferenceInfo>
        </b-tab>
        <b-tab title="注册会议">
        </b-tab>
        <b-tab title="投稿">
            <PaperSubmission></PaperSubmission>
        </b-tab>
        <b-tab title="我的投稿">
        </b-tab>
      </b-tabs>
    </b-card>
 </div>
</template>

<script>
  import ConferenceInfo from '@/components/ConferenceInfo'
  import SearchPanel from '@/components/SearchPanel'
  import PaperSubmission from "./paper-submission";
  import axios from 'axios';

  export default {
    name: "ConferenceIndex",
    components: {
        ConferenceInfo,
        SearchPanel,
        PaperSubmission
    },
      data:function () {
         return{
             conferenceInfo : {
                 items: [],
                 title: '',
                 abstract: '',
                 status: '',
                 essay_info: '',
                 schedule: '',
                 institution: '',

                 accommodation_transportation: '',
                 contact_us: '',
                 address: '',
                 variant_class: ''
             },
         }
      },
      methods: {
          async GetConferenceInfo() {
              this.conferenceInfo.items = [];
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
                         address
                      }
                     }`,
                  variables: {
                      id:this.$route.params.id
                  }
              });
              let tempInfo = res.data.data.GetConferences[0];
              switch (Number(tempInfo.status)) {
                  case 0:
                      this.conferenceInfo.variant_class='primary';
                      this.conferenceInfo.status='投稿中';
                      break;
                  case 2:
                      this.conferenceInfo.variant_class='info';
                      this.conferenceInfo.status='注册中';
                      break;
                  case 1:
                  case 3:
                      this.conferenceInfo.variant_class='secondary';
                      this.conferenceInfo.status='截止注册';
                      break;
                  case 4:
                      this.conferenceInfo.variant_class='success';
                      this.conferenceInfo.status='会议中';
                      break;
                  case 5:
                      this.conferenceInfo.variant_class='dark';
                      // this.$refs.mbadge.style.backgroundColor='deeppink';
                      this.conferenceInfo.status='会议完成';
                      break;
                  default:
                      this.conferenceInfo.variant_class='warning';
                      this.conferenceInfo.status='error';
                      break;
              }
              let date_anno = {
                  paper_deadline: '截稿日期',
                  acceptance_deadline: '录用通知日期',
                  register_deadline: '会议注册日期',
                  start_time: '会议开始日期',
                  end_time: '会议结束日期',
              };
              for(var key in tempInfo) {
                  if(key.slice(-8) == 'deadline' || key.slice(-4) == 'time') {
                      this.conferenceInfo.items.push({
                          相关日期: date_anno[key],
                          具体时间: tempInfo[key].split('T')[0]
                      })
                  }
              }
              this.conferenceInfo.title = tempInfo.title;
              this.conferenceInfo.abstract = tempInfo.introduction;
              this.conferenceInfo.essay_info = tempInfo.essay_info;
              this.conferenceInfo.schedule = tempInfo.schedule;
              this.conferenceInfo.institution = tempInfo.institution;
              this.conferenceInfo.accommodation_transportation = tempInfo.accommodation_transportation;
              this.conferenceInfo.contact_us = tempInfo.contact_us;
              this.conferenceInfo.address = tempInfo.address;
          }
      },
      created: function () {
          this.GetConferenceInfo();
      },
      watch: {
          '$route.params': function() {
              this.GetConferenceInfo();
          }
      }
  }
</script>

<style scoped>

</style>
