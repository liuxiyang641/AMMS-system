<template>
    <div class="modal-content">
        <div class="modal-header text-center">
            <h1 class="modal-title" style="width: 100%">2019电力工程与控制技术国际会议(CEECT2019)&nbsp;&nbsp;&nbsp;&nbsp;
                <b-badge style="font-size: smaller" variant="info">投稿中</b-badge>
            </h1>
        </div>
        <div class="modal-body">
            <b-container>
                <!--会议简介-->
                <b-row>
                    <h2>会议简介</h2>
                    <p class="lead">
                        2019电力工程与控制技术国际会议(CEECT2019)将于2019年12月5日至7日在新加坡举行。EECT
                        2019由亚太科学与工程研究所（APISE）主办。这次会议是一个为来自世界各地的研究人员、工程师、院士以及工业专业人士提供了一个展示他们在电力工程与控制技术研究方面的成果的平台，
                        为与会代表提供了面对面交流新思想和应用经验和建立业务或研究和寻找未来全球伙伴合作关系的机会。我们真诚邀请所有研究人员、学者、工程师、学生和感兴趣的学者来参加CEECT
                        2019。
                    </p>
                </b-row>
                <!--征文信息-->
                <b-row>
                    <h2>征文信息</h2>
                    <p class="lead">1.会议收录的文章将出版在会议论文集中，由Ei Compendex, SCOPUS, Inspec,\nConference Proceedings Citation Index – Science (CPCI-S)(Thomson Reuters, Web of Science)，及其它学术数据库进行检索。2. 优秀论文将被推荐发表在国际期刊中。
                        能源系统
                        数据库和信息系统
                        配电系统
                        动态模型辨识
                        能源经济学
                        控制技术
                        人工智能
                        人工神经网络计算
                        人工神经网
                    </p>
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
                    <p class="lead">
                        第一天吃饭
                        第二天睡觉
                        第三天拿钱
                    </p>
                </b-row>
                <!--组织机构-->
                <b-row>
                    <h2>主办单位</h2>
                    <br/>
                    <p class="text-primary lead"> APISE</p>
                </b-row>
                <!--住宿交通-->
                <b-row>
                    <h2>住宿与交通</h2>
                    <br/>
                    <p class="lead"> 来中国，北京，自己找. 车多人多，不好找</p>
                </b-row>
                <!--联系方式-->
                <b-row>
                    <h2>联系方式</h2>
                    <br/>
                    <address style="width: 100%">
                        <strong style="font-size: larger">邮箱：</strong>
                        <a href="mailto:#"><span class="lead">@somedomain.com</span></a>
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
                items: [
                    { isActive: true, 相关日期: '截稿日期', 具体时间: '2018/7/28' },
                    { isActive: true, 相关日期: '录用通知日期', 具体时间: '2018/9/10' }
                ]
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
</style>
