<template>
    <div class="modal-content">
        <div class="modal-header text-center">
            <h2 class="modal-title" style="width: 100%">{{title}}&nbsp;&nbsp;&nbsp;&nbsp;
                <b-badge ref="mbadge" :variant=variant_class>{{status}}</b-badge>
            </h2>
        </div>
        <div class="modal-body">
            <b-container>
                <!--会议简介-->
                <b-row>
                    <h4><i class="info circle icon"></i>会议简介</h4>
                    <p class="lead">&nbsp;&nbsp;{{abstract===''?'暂无简介':abstract}}</p>
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
                        <!--<strong style="font-size: larger">邮箱：</strong>-->
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
        name: "ConferenceInfo",
        data () {
            return {
                fields: [ '相关日期', '具体时间' ],
                items: [],
                title:'',
                abstract:'',
                status:'',
                essay_info:'',
                schedule:'',
                institution:'',

                accommodation_transportation:'',
                contact_us:'',
                address:'',
                variant_class:''
            }
        },
        methods: {
            async GetConferenceInfo() {
               this.items = [];
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
             let conferenceInfo = res.data.data.GetConferences[0];
             switch (Number(conferenceInfo.status)) {
                 case 0:
                     this.variant_class='primary';
                     this.status='投稿中';
                     break;
                 case 2:
                     this.variant_class='info';
                     this.status='注册中';
                     break;
                 case 1:
                 case 3:
                     this.variant_class='secondary';
                     this.status='截止注册';
                     break;
                 case 4:
                     this.variant_class='success';
                     this.status='会议中';
                     break;
                 case 5:
                     this.variant_class='';
                     this.$refs.mbadge.style.backgroundColor='deeppink';
                     this.status='会议完成';
                     break;
                 default:
                     this.variant_class='warning';
                     this.status='error';
                     break;
             }
             let date_anno = {
               paper_deadline: '截稿日期',
               acceptance_deadline: '录用通知日期',
               register_deadline: '会议注册日期',
               start_time: '会议开始日期',
               end_time: '会议结束日期',
             };
             for(var key in conferenceInfo) {
               if(key.slice(-8) == 'deadline' || key.slice(-4) == 'time') {
                 this.items.push({
                   相关日期: date_anno[key],
                   具体时间: conferenceInfo[key].split('T')[0]
                 })
               }
             }
             this.title = conferenceInfo.title;
             this.abstract = conferenceInfo.introduction;
             this.essay_info = conferenceInfo.essay_info;
             this.schedule = conferenceInfo.schedule;
             this.institution = conferenceInfo.institution;
             this.accommodation_transportation = conferenceInfo.accommodation_transportation;
             this.contact_us = conferenceInfo.contact_us;
             this.address = conferenceInfo.address;     
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
    h1 {
        align-content: center;
        font-size: 2.5rem;
    }
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
