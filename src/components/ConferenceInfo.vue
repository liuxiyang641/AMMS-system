<template>
    <div class="modal-content">
        <div class="modal-header text-center">
            <h2 class="modal-title" style="width: 100%">{{conferenceInfo.title}}&nbsp;&nbsp;&nbsp;&nbsp;
                <b-badge ref="mbadge" :variant=conferenceInfo.variant_class>{{conferenceInfo.status}}</b-badge>
            </h2>
        </div>
        <div class="modal-body">
            <b-container>
                <!--会议简介-->
                <b-row>
                    <h4><i class="info circle icon"></i>会议简介</h4>
                    <p class="lead">&nbsp;&nbsp;{{conferenceInfo.abstract===''?'暂无简介':conferenceInfo.abstract}}</p>
                </b-row>
                <!--征文信息-->
                <b-row>
                    <h4><i class="file text icon"></i>征文信息</h4>
                    <p class="lead">&nbsp;&nbsp;{{conferenceInfo.essay_info===''?'暂无简介':conferenceInfo.essay_info}}</p>
                </b-row>
                <!--相关日期-->
                <b-row>
                    <h4> <i class="calendar outline icon"></i>会议相关日期</h4>
                    <p style="width: 100%">
                        <b-table striped hover bordered :items="conferenceInfo.items" :fields="fields" style="width: 40%"></b-table>
                    </p>
                </b-row>
                <!--日程安排-->
                <b-row>
                    <h4><i class="calendar icon"></i>日程安排</h4>
                    <br/>
                    <p class="lead"> &nbsp;&nbsp;{{conferenceInfo.schedule===''?'暂无简介':conferenceInfo.schedule}}</p>
                </b-row>
                <!--组织机构-->
                <b-row>
                    <h4><i class="university icon"></i>主办单位</h4>
                    <br/>
                    <p class="lead"> &nbsp;&nbsp;{{conferenceInfo.institution===''?'暂无简介':conferenceInfo.institution}}</p>
                </b-row>
                <!--会议地点-->
                <b-row>
                    <h4><i class="map signs icon"></i>会议地点</h4>
                    <br/>
                    <p class="lead"> &nbsp;&nbsp;{{conferenceInfo.address===''?'暂无简介':conferenceInfo.address}}</p>
                </b-row>
                <!--住宿交通-->
                <b-row>
                    <h4><i class="compass icon"></i>住宿与交通</h4>
                    <br/>
                    <p class="lead"> &nbsp;&nbsp;{{conferenceInfo.accommodation_transportation===''?'暂无简介':conferenceInfo.accommodation_transportation}}</p>
                </b-row>
                <!--联系方式-->
                <b-row>
                    <h4><i class="mail icon"></i>联系方式</h4>
                    <br/>
                    <address style="width: 100%">
                        <!--<strong style="font-size: larger">邮箱：</strong>-->
                        <span class="lead">&nbsp;&nbsp;{{conferenceInfo.contact_us===''?'暂无简介':conferenceInfo.contact_us}}</span>
                    </address>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConferenceInfo",
        data () {
            return {
                fields: [ '相关日期', '具体时间' ],
            }
        },
        props:{
            conferenceInfo:{
                type:Object,
                required:true
            }
        },
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
