<template>
    <div>
        <Navbar></Navbar>
        <div class="ui container" style="margin-top: 5rem;">
            <b-card style="width: 50%;margin-left: 25%" no-body>
                <div class="ui attached message" style="background-color: inherit">
                    <div class="header">欢迎来到我们的网站！ </div>
                    <p>填写下面的表单来注册新的账户</p>
                </div>
                <b-tabs card>
                    <b-tab title="个人用户注册" active>
                        <form class="ui form" id="inxividual-user-form">
                            <div class="required field">
                                <label>用户名称</label>
                                <input type="text" placeholder="用户名称" v-model="individualName" >
                                <div class="ui pointing red basic label" ref="" style="display:none">
                                    请填写用户名称
                                </div>
                            </div>
                            <div class="required field">
                                <label>用户邮箱</label>
                                <input type="text" placeholder="邮箱" v-model="individualEmail" >
                                <div class="ui pointing red basic label" ref="paper_name" style="display:none">
                                    请填写用户邮箱
                                </div>
                            </div>
                            <div class="required field">
                                <label>密码</label>
                                <input type="password" v-model="individualPassword"/>
                                <div class="ui pointing red basic label" ref="paper_abstract" style="display: none">
                                    请填写用户密码
                                </div>
                            </div>
                            <br/>
                            <button class="ui orange button" @click.prevent="individualUserRegister()" style="margin-bottom: 0.5rem">&nbsp;注册</button>
                            <div class="ui warning message">
                                <div class="header">注意：</div>
                                <p>请检查你的提交，保证每一个必选项都得到了正确的填写</p>
                            </div>
                        </form>
                    </b-tab>
                    <b-tab title="单位账户注册">
                        <form class="ui form" ref="companyUserForm" id="company-user-form">
                            <div class="required field">
                                <label>单位用户注册邮箱</label>
                                <input type="text" placeholder="邮箱" v-model="companyUserEmail">
                                <div class="ui pointing red basic label" ref="" style="display:none">
                                    请填写单位注册邮箱
                                </div>
                            </div>
                            <div class="required field">
                                <label>单位用户名称</label>
                                <input type="text" placeholder="单位用户名称" v-model="companyUserName" name="contactername">
                                <div class="ui pointing red basic label" ref="" style="display:none">
                                    请填写单位用户名称
                                </div>
                            </div>
                            <div class="required field">
                                <label>密码</label>
                                <input type="password" v-model="companyUserPassword" name="password"/>
                                <div class="ui pointing red basic label" ref="" style="display: none">
                                    请填写用户密码
                                </div>
                            </div>
                            <div class="required field">
                                <label>所在单位/组织机构名称</label>
                                <input type="text" placeholder="所在单位名称" v-model="companyName" name="companyname">
                                <div class="ui pointing red basic label" ref="" style="display:none">
                                    请填写所在单位名称
                                </div>
                            </div>
                            <div class="required field">
                                <label>所在单位/组织机构代码</label>
                                <input type="text" placeholder="所在单位代码" v-model="companyId" name="companyid">
                                <div class="ui pointing red basic label" ref="" style="display:none">
                                    请填写所在单位代码
                                </div>
                            </div>
                            <div class="required field">
                                <label>联系电话</label>
                                <input type="text" placeholder="联系电话" v-model="contactPhone" name="contacterphone">
                                <div class="ui pointing red basic label" ref="" style="display:none">
                                    请填写联系电话
                                </div>
                            </div>
                            <div class="required field">
                                <label>单位所在地址</label>
                                <input type="text" placeholder="单位所在地址" v-model="companyAddress" name="communicationaddress">
                                <div class="ui pointing red basic label" ref="" style="display:none">
                                    请填写单位地址
                                </div>
                            </div>

                            <div class="required field" style="display: inline">
                            <span class="required ui teal button fileinput-button">
                                <span>选择相关文件</span>
                                <input type="file" @change="uploading($event)" name="file"/>
                            </span>
                                <div class="ui left pointing red basic label" style="display:none;position: absolute" ref="">
                                    请选择稿件上传
                                </div>
                                <div class="ui left pointing red basic label" v-if="relatedFile!=='' " style="display: inline-block;position: absolute">{{this.relatedFile.name}}</div>
                            </div>

                            <br/>
                            <br/>
                            <button class="ui orange button" @click.prevent="companyUserRegister()" style="margin-bottom: 0.5rem">&nbsp;注册</button>
                            <div class="ui warning message">
                                <div class="header">注意：</div>
                                <p>请检查你的提交，保证每一个必选项都得到了正确的填写</p>
                            </div>
                        </form>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    import Navbar from '@/components/Navbar'

    export default {
        name: "Register",
        data:function () {
            return{
                individualName:'',
                individualEmail:'',
                individualPassword:'',
                companyUserEmail:'',
                companyUserName:'',
                companyUserPassword:'',
                contactPhone:'',
                companyName:'',
                companyId:'',
                companyAddress:'',
                relatedFile:'',
            }
        },
        components:{
            Navbar
        },
        methods:{
            uploading:function(event){
                this.relatedFile = event.target.files[0];//获取文件
            },
            individualUserRegister:function () {
                $('.ui.warning.message').hide();
                if (this.individualName===''||this.individualEmail===''||this.individualPassword===''){
                    $('.ui.warning.message').show();
                    return;
                }
                let requestData={
                    name:this.individualName,
                    email:this.individualEmail,
                    password:this.individualPassword
                };
                axios.post('http://192.144.153.164:9000/individual/register',requestData).then(
                    (res)=>{
                        console.log(res);
                        if (res.data==='注册成功'){
                            alert('注册成功');
                            window.location.reload();
                        }
                        else {
                            alert(res.data);
                        }

                    }
                );
            },
            companyUserRegister:function(){
                if (this.companyUserEmail === '' ||
                    this.companyUserName=== ''||
                    this.companyUserPassword===''||
                    this.contactPhone===''||
                    this.companyName===''||
                    this.companyId===''||
                    this.companyAddress===''||
                    this.relatedFile===''){
                    $('.ui.warning.message').show();
                    return;
                }
                let formData = new FormData();
                formData.append('eamil',this.companyUserEmail);
                formData.append('pwssword',this.companyUserPassword);
                formData.append('contactername',this.companyUserName);
                formData.append('contacterphone',this.contactPhone);
                formData.append('companyname',this.companyName);
                formData.append('companyid',this.companyId);
                formData.append('communicationaddress',this.companyAddress);
                formData.append('file',this.relatedFile);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',  //之前说的以表单传数据的格式来传递fromdata
                    }
                }
                axios.post('http://d342dc7a.ngrok.io/group/register', formData, config).then(
                    (res)=>{
                        console.log(res);
                    }
                ).catch((error) => {
                    console.log(error);
                })

            }
        },
        updated:function () {
            $('.ui.warning.message').hide();
        },
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
