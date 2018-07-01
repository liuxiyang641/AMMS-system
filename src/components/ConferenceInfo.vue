<template>
    <div class="modal-content">
        <div class="modal-header text-center">
            <h1 class="modal-title" style="width: 100%">{{title}}&nbsp;&nbsp;&nbsp;&nbsp;
                <b-badge style="font-size: smaller" variant="info">{{status}}</b-badge>
            </h1>
        </div>
        <div class="modal-body">
            <b-container>
                <!--会议简介-->
                <b-row>
                    <h2>会议简介</h2>
                    <p class="lead">&nbsp;&nbsp;{{abstract===''?'暂无简介':abstract}}</p>
                </b-row>
                <!--征文信息-->
                <b-row>
                    <h2>征文信息</h2>
                    <p class="lead">&nbsp;&nbsp;{{essay_info===''?'暂无简介':essay_info}}</p>
                </b-row>
                <!--相关日期-->
                <b-row>
                    <h2>会议相关日期</h2>
                    <p style="width: 100%">
                        <b-table striped hover bordered :items="items" :fields="fields" style="width: 40%"></b-table>
                    </p>
                </b-row>
                <!--日程安排-->
                <b-row>
                    <h2>日程安排</h2>
                    <br/>
                    <p class="lead">&nbsp;&nbsp;{{schedule===''?'暂无简介':schedule}}</p>
                </b-row>
                <!--组织机构-->
                <b-row>
                    <h2>主办单位</h2>
                    <br/>
                    <p class="text-primary lead"> &nbsp;&nbsp;{{institution===''?'暂无简介':institution}}</p>
                </b-row>
                <!--住宿交通-->
                <b-row>
                    <h2>住宿与交通</h2>
                    <br/>
                    <p class="lead"> &nbsp;&nbsp;{{accommodation_transportation===''?'暂无简介':accommodation_transportation}}</p>
                </b-row>
                <!--联系方式-->
                <b-row>
                    <h2>联系方式</h2>
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
    import axios from 'axios'
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
                address:''
            }
        },
        methods:{
            async GetConferenceInfo()
            {
                try
                {
                    const res = await axios.post('http://192.144.136.166:4040/graphql', {
                        query: `
                            query GetConferenceById($id:Int){
                                  GetConferenceById(id:$id){
                                    conference_id,
                                    title,
                                    abstract,
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
                            }`
                        ,
                        variables: {
                            id:this.$route.params.id
                        }
                    });
                    let conferenceInfo = res.data.data.GetConferenceById;
                    this.title=conferenceInfo.title;
                    this.abstract=conferenceInfo.abstract;
                    this.status=conferenceInfo.status;
                    this.essay_info=conferenceInfo.essay_info;
                    if (conferenceInfo.paper_deadline)
                        this.items.push({相关日期: '截稿日期', 具体时间: conferenceInfo.paper_deadline});
                    if (conferenceInfo.acceptance_deadline)
                        this.items.push({相关日期: '录用通知日期', 具体时间: conferenceInfo.acceptance_deadline});
                    if (conferenceInfo.register_deadline)
                        this.items.push({相关日期: '注册日期', 具体时间: conferenceInfo.register_deadline});
                    if (conferenceInfo.start_time)
                        this.items.push({相关日期: '会议开始日期', 具体时间: conferenceInfo.start_time});
                    if (conferenceInfo.end_time)
                        this.items.push({相关日期: '会议结束日期', 具体时间: conferenceInfo.end_time});
                    this.schedule=conferenceInfo.schedule;
                    this.institution=conferenceInfo.institution;
                    this.accommodation_transportation=conferenceInfo.accommodation_transportation;
                    this.contact_us=conferenceInfo.contact_us;
                    this.address=conferenceInfo.address;
                } catch (e)
                {
                    console.log('err', e)
                }
            }
        },
        created: function () {
            this.GetConferenceInfo();
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
</style>
