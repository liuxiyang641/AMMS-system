<template>
    <div class="ui container" style="margin-top: 5rem;width: 60%">
        <div class="ui three top steps ordered">
            <div class="step" :class="classOfStep(1)">
                <div class="content">
                    <div class="title">选择注册类型</div>
                    <div class="description">个人/单位用户</div>
                </div>
            </div>
            <div class="step" :class="classOfStep(2)">
                <div class="content">
                    <div class="title">填写注册信息</div>
                    <div class="description">请确保信息正确</div>
                </div>
            </div>
            <div class="step" :class="classOfStep(3)">
                <div class="content">
                    <div class="title">完成注册</div>
                </div>
            </div>
        </div>

        <div class="ui segment" v-if="stepControl.currentStep===1">
            <div class="ui two column grid">
                <div class="column">
                    <div class="ui fluid card" @click="stepControl.registerType=0">
                        <div class="blurring dimmable image">
                            <div class="ui dimmer dimmer-of-type">
                                <div class="content">
                                    <div class="center">
                                        <div class="ui inverted button" @click="stepControl.currentStep=2">选择</div>
                                    </div>
                                </div>
                            </div>
                            <img src="@/assets/individual_user.png">
                        </div>
                        <div class="content" style="position: center;text-align:center">
                            <span class="header" style="position: center;width: 100%">个体用户</span>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="ui fluid card" @click="stepControl.registerType=1">
                        <div class="blurring dimmable image">
                            <div class="ui dimmer dimmer-of-type">
                                <div class="content">
                                    <div class="center">
                                        <div class="ui inverted button" @click="stepControl.currentStep=2">选择</div>
                                    </div>
                                </div>
                            </div>
                            <img src="@/assets/group_user.png" style="height: 100%">
                        </div>
                        <div class="content" style="position: center;text-align:center">
                            <a class="header">单位用户</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui segment" v-if="stepControl.currentStep===2">
            <form class="ui form" id="individual-user-form" v-if="stepControl.registerType===0">
                <div class="required field">
                    <label>用户名称</label>
                    <input type="text" placeholder="用户名称" v-model="individualName">
                    <div class="ui pointing red basic label" ref="individualName" style="display:none">
                        请填写用户名称
                    </div>
                </div>
                <div class="required field">
                    <label>用户邮箱</label>
                    <input type="text" placeholder="邮箱" v-model="individualEmail">
                    <div class="ui pointing red basic label" ref="individualEmail" style="display:none">
                        请填写用户邮箱
                    </div>
                </div>
                <div class="required field">
                    <label>密码</label>
                    <input type="password" v-model="individualPassword"/>
                    <div class="ui pointing red basic label" ref="individualPassword" style="display: none">
                        请填写用户密码
                    </div>
                </div>
                <br/>
                <button class="ui black button"
                   @click.prevent="individualUserRegister()" 
                   style="margin-bottom: 0.5rem">
                  &nbsp;注册
                </button>

                
            </form>

            <form class="ui form" ref="companyUserForm" id="company-user-form" v-if="stepControl.registerType===1">
                <div class="required field">
                    <label>单位用户注册邮箱</label>
                    <input type="text" placeholder="邮箱" v-model="companyUserEmail">
                    <div class="ui pointing red basic label" ref="companyUserEmail" style="display:none">
                        请填写单位注册邮箱
                    </div>
                </div>
                <div class="required field">
                    <label>单位用户名称</label>
                    <input type="text" placeholder="单位用户名称" v-model="companyUserName" name="contactername">
                    <div class="ui pointing red basic label" ref="companyUserName" style="display:none">
                        请填写单位用户名称
                    </div>
                </div>
                <div class="required field">
                    <label>密码</label>
                    <input type="password" v-model="companyUserPassword" name="password"/>
                    <div class="ui pointing red basic label" ref="companyUserPassword" style="display: none">
                        请填写用户密码
                    </div>
                </div>
                <div class="required field">
                    <label>所在单位/组织机构名称</label>
                    <input type="text" placeholder="所在单位名称" v-model="companyName" name="companyname">
                    <div class="ui pointing red basic label" ref="companyName" style="display:none">
                        请填写所在单位名称
                    </div>
                </div>
                <div class="required field">
                    <label>所在单位/组织机构代码</label>
                    <input type="text" placeholder="所在单位代码" v-model="companyId" name="companyid">
                    <div class="ui pointing red basic label" ref="companyId" style="display:none">
                        请填写所在单位代码
                    </div>
                </div>
                <div class="required field">
                    <label>联系电话</label>
                    <input type="text" placeholder="联系电话" v-model="contactPhone" name="contacterphone">
                    <div class="ui pointing red basic label" ref="contactPhone" style="display:none">
                        请填写联系电话
                    </div>
                </div>
                <div class="required field">
                    <label>单位所在地址</label>
                    <input type="text" placeholder="单位所在地址" v-model="companyAddress" name="communicationaddress">
                    <div class="ui pointing red basic label" ref="companyAddress" style="display:none">
                        请填写单位地址
                    </div>
                </div>

                <div class="required field" style="display: inline">
                            <span class="required ui black button fileinput-button">
                                <span>上传法人照片</span>
                                <input type="file" @change="uploading($event)" name="file"/>
                            </span>
                    <div class="ui left pointing red basic label" 
                        style="display:none;position: absolute" ref="file">
                        请选择稿件上传
                    </div>
                    <div class="ui left pointing red basic label" v-if="relatedFile!=='' " style="display: inline-block;position: absolute">{{this.relatedFile.name}}</div>
                </div>

                <br/>
                <br/>
                <button class="ui black button" 
                  @click.prevent="companyUserRegister()" 
                  style="margin-bottom: 0.5rem">
                    &nbsp;注册
                </button>
               
            </form>

        </div>

        <div id="suc" class="ui segment" v-if="stepControl.currentStep===3">
            <div class="ui success message" v-if="stepControl.registerType===0" style="display: block">
                <div class="header">注册成功!</div>
                <p>你的账号已成功注册，现在可以登陆了！</p>
            </div>
            <div class="ui success message" v-if="stepControl.registerType===1" style="display: block">
                <div class="header">成功提交注册申请</div>
                <p>您的注册申请发送成功，请耐心等待审核！</p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Register",
        data:function () {
            return {
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
                stepControl:{
                    currentStep:1,
                    registerType:null
                }
            }
        },
        methods:{
            classOfStep:function (stepNumber) {
                if (stepNumber=== this.stepControl.currentStep)
                    return {active:true};
                else if (stepNumber< this.stepControl.currentStep)
                    return {completed:true};
                else return {disabled:true};
            },
            uploading:function(event){
                this.relatedFile = event.target.files[0];//获取文件
            },
            individualUserRegister:function () {
                if (this.individualName===''||this.individualEmail===''||this.individualPassword===''){
                  this.remind({
                    type: 'warning',
                    header: '请填写必填项！'
                  });
                  return;
                }
                let requestData= {
                    name:this.individualName,
                    email:this.individualEmail,
                    password:this.individualPassword
                };
                var _this = this;
                this.remind({
                  type: 'success',
                  header: '正在提交...',
                  info: '请耐心等待...',
                  finished: 1
                });
                axios.post('http://192.144.153.164:9000/individual/register',requestData).then(
                    (res)=>{
                        if (res.data==='注册成功') {
                            _this.unremind();
                            _this.stepControl.currentStep=3;
                            $('#suc .ui.success.message').show();
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
                      this.remind({
                        type: 'warning',
                        header: '请填写必选项！'
                      });
                      return;
                }
                let formData = new FormData();
                formData.append('email',this.companyUserEmail);
                formData.append('password',this.companyUserPassword);
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
                };
                this.remind({
                  type: 'success',
                  header: '正在提交...',
                  info: '请耐心等待...',
                  finished: 1
                });
                var _this = this;
                axios.post('http://192.144.153.164:9000/group/register', formData, config).then(
                    (res)=>{
                        //注册成功
                        if (res.data==='注册成功，请等待审核结果') {
                            _this.unremind();
                            _this.stepControl.currentStep=3;
                            $('#suc .ui.success.message').show();
                        }
                    }
                ).catch((error) => {
                    console.log(error);
                });

            }
        },
        mounted:function(){
            axios.interceptors.request.use(config => {
                $('#loading_dimmer').show();
                return config
            }, error => {
                //请求错误时做些事
                return Promise.reject(error)
            });
            //添加响应拦截器
            axios.interceptors.response.use(response => {
                $('#loading_dimmer').hide();
                return response
            }, error => {
                //请求错误时做些事
                return Promise.reject(error)
            });
            $('.dimmer-of-type').dimmer({
                on: 'hover'
            });
        },
        updated:function () {
            $('#loading_dimmer').hide();
        },
    }
</script>


