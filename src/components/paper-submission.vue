<template>
    <div>
        <form class="ui form" id="submission-form" ref="submissionref">
            <div class="required field">
                <label>投稿名称</label>
                <input type="text" placeholder="投稿论文名称" v-model="paper_name" >
                <div class="ui pointing red basic label" ref="paper_name" style="display:none">
                    请填写投稿名称
                </div>
            </div>
            <div class="two field">
                <div class="required  field">
                    <label>投稿人姓名</label>
                    <input type="text"  placeholder="第一作者;第二作者" v-model="paper_author">
                    <div class="ui pointing red basic label" ref="paper_author" style="display: none">
                        请填写投稿人姓名
                    </div>
                </div>
                <div class="field">
                    <label>单位</label>
                    <input type="text"  placeholder="单位" v-model="institution">
                </div>
            </div>
            <div class="required field">
                <label>摘要</label>
                <textarea v-model="paper_abstract"></textarea>
                <div class="ui pointing red basic label" ref="paper_abstract" style="display: none">
                    请填写必要的摘要
                </div>
            </div>
            <!--<input type="file" @change="uploading($event)"/>-->
            <span class="required ui teal button fileinput-button">
                <span>选择文件</span>
                <input type="file" @change="uploading($event)"/>
            </span>
            <div class="ui left pointing red basic label" style="display: none" ref="file">
                请选择稿件上传
            </div>
            <div class="ui left pointing red basic label" v-if="file!=='' ">{{this.file.name}}</div>
            <br/>
            <button class="ui orange button" @click="submit($event)" style="margin-top: 1rem"><i class="upload icon"></i>&nbsp;提交论文</button>
            <div class="ui success message">
                <div class="header">提交成功!</div>
                <p>你的论文已提交成功，请耐心等待评审结果</p>
            </div>
            <div class="ui error message" id="errorSubmission">
                <div class="header">错误！</div>
                <p>你的提交由于一些原因失败了</p>
            </div>
            <div class="ui error message" id="repeatPaper">
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
                file_status:'',
                institution:'',
                modify_description:'',
                paper_abstract:'',
                paper_author:'',
                paper_name:'',
                file_url:'',
                conference_id:'',
                user_id_set:'',
            }
        },
        methods: {
            uploading:function(event){
                this.file = event.target.files[0];//获取文件
            },
            checkSubmission:function () {
                if (this.paper_name===''){
                    this.$refs.paper_name.style.display="";
                    return false;
                }
                if (this.paper_abstract===''){
                    this.$refs.paper_abstract.style.display="";
                    return false;
                }
                if (this.paper_author===''){
                    this.$refs.paper_author.style.display="";
                    return false;
                }
                return true;
            },
            hideAllMessage:function () {
                this.$refs.paper_name.style.display="none";
                this.$refs.paper_abstract.style.display="none";
                this.$refs.paper_author.style.display="none";
                this.$refs.file.style.display="none";
                $('.ui.warning.message').hide();
                $('.ui.success.message').hide();
                $('#errorSubmission').hide();
                $('#repeatPaper').hide();
            },
            submit: function(event) {
                event.preventDefault();//取消默认行为
                this.hideAllMessage();
                //检查必填项
                if (!this.checkSubmission()) {
                    $('.ui.warning.message').show();
                    return;
                }
                //没有选择文件
                if (this.file===''){
                    $('.ui.warning.message').show();
                    this.$refs.file.style.display="";
                    return;
                }
                let fileData = new FormData();
                fileData.append('UPLOAD', this.file);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',  //之前说的以表单传数据的格式来传递fromdata
                    }
                };
                //先上传文件，再post所有投稿信息
                axios.post('http://193.112.111.199:9090/upload-file', fileData, config).then((res) => {
                    //处理返回的结果
                    res=JSON.parse(res.data.replace(/'/g,`"`));
                    if (res.status==='1'){
                        //获取返回值，第二次post用到
                        this.file_status=res.status;
                        this.file_url=res.file_url;
                    }
                    else {
                        $('#errorSubmission').show();
                    }
                }).catch((error) => {
                    console.log(error);
                    $('#errorSubmission').show();
                }).then(() =>{
                    console.log(this.file_status);
                    console.log(this.file_url);
                    axios.post('http://193.112.111.199:9090/contribute',{
                        file_status: this.file_status,
                        institution: this.institution,
                        modify_description:'',
                        paper_abstract:this.paper_abstract,
                        paper_author:this.paper_author,
                        paper_name:this.paper_name,
                        file_url:this.file_url,
                        conference_id:Number(this.$route.params.id),
                        user_id_set:'1'
                    }).then((res) => {
                        //处理返回的结果
                        if (res.data==='1'){            //重复论文提交
                            $('#repeatPaper').show();
                        }
                        else if (res.data==='2'){           //提交成功
                            $('.ui.success.message').show();
                        }
                        else {
                            $('.ui.warning.message').show();        //无文件上传
                        }
                    }).catch((error) => {
                        console.log(error);
                        $('#errorSubmission').show();
                    });
                });

            },

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
