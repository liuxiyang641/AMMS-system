<template>
    <div>
        <form class="ui form" id="submission-form" ref="submissionref">
            <div class="required field">
                <label>投稿名称</label>
                <input type="text" name="first-name" placeholder="投稿论文名称">
                <div class="ui pointing red basic label">
                    请填写投稿名称
                </div>
            </div>
            <div class="two field">
                <div class="required  field">
                    <label>投稿人姓名</label>
                    <input type="text" name="last-name" placeholder="第一作者/第二作者">
                    <div class="ui pointing red basic label">
                        请填写投稿人姓名
                    </div>
                </div>
                <div class="field">
                    <label>单位</label>
                    <input type="text" name="last-name" placeholder="单位">
                </div>
            </div>
            <div class="required field">
                <label>摘要</label>
                <textarea></textarea>
                <div class="ui pointing red basic label">
                    请填写必要的摘要
                </div>
            </div>
            <!--<input type="file" @change="uploading($event)"/>-->
            <span class="required ui teal button fileinput-button">
                <span>选择文件</span>
                <input type="file" @change="uploading($event)"/>
            </span>
            <div class="ui left pointing red basic label">
                请选择稿件上传
            </div>
            <div class="ui left pointing red basic label" v-if="file!=='' ">{{this.file.name}}</div>
            <br/>
            <button class="ui orange button" @click="submit($event)" style="margin-top: 1rem"><i class="upload icon"></i>&nbsp;提交论文</button>
            <div class="ui success message">
                <div class="header">提交成功!</div>
                <p>你的论文已提交成功，请耐心等待评审结果</p>
            </div>
            <div class="ui error message">
                <div class="header">错误！</div>
                <p>你的提交由于一些原因失败了</p>
            </div>
            <div class="ui warning message">
                <div class="header">注意：</div>
                <p>请检查你的提交，保证每一个必选项都得到了正确的填写</p>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "PaperSubmission",
        data () {
            return {
                file:'',
            }
        },
        methods: {
            showSubmission: function () {
                $('.ui.modal').modal('show');
            },
            uploading:function(event){
                this.file = event.target.files[0];//获取文件
            },
            submit: function(event) {
                event.preventDefault();//取消默认行为
                let formdata = new FormData();
                formdata.append('ConferenceID_Upload', this.$route.params.id);
                formdata.append('TemplateFile', this.file);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                    }
                };
                console.log(this.$refs.submissionref);
                // axios.post('http://192.144.136.166:4040/upload', formdata, config).then((res) => {
                //     $('.ui.success.message').show();
                // }).catch((error) => {
                //     console.log(error);
                //     $('.ui.error.message').show();
                // });
            }
        }
    }
</script>

<style scoped>
    .fileinput-button {
        position: relative;
        display: inline-block;
        overflow: hidden;
    }

    .fileinput-button input{
        position: absolute;
        left: 0px;
        top: 0px;
        opacity: 0;
        -ms-filter: 'alpha(opacity=0)';
    }
</style>
