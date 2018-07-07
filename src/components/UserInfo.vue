<template>
  <div class="ui container">
    <div v-if="$route.params.type == 'individual_user'">
      <div v-if="modify==false" >
      <h3>{{userInfo.name}}</h3>
      <p>邮箱：{{userInfo.email}}</p>
      </div>
      <div v-else-if="modify==true">
        <div class="ui labeled input">
          <div class="ui label">
            用户名
          </div>
          <input type="text" v-model="userInfo.name">
        </div>
        <br>
        <div class="ui labeled disabled input">
          <div class="ui label">
            邮箱
          </div>
          <input type="text" v-model="userInfo.email">
        </div>
      </div>
    </div>
    <div v-else-if="$route.params.type == 'group_user'">
      <div v-if="modify==false" >
      <h3>{{userInfo.companyName}}</h3>
      <p>邮箱：{{userInfo.email}}</p>
      <p>联系人姓名：{{userInfo.contacterName}}</p>
      <p>联系人电话：{{userInfo.contacterPhone}}</p>
      <p>通信地址：{{userInfo.communicationAddress}}</p>
      </div>
      <div  v-else-if="modify==true" >
        <div class="ui labeled input">
          <div class="ui label">
            公司名
          </div>
          <input type="text" v-model="userInfo.companyName">
        </div>
        <br>
        <div class="ui labeled disabled input">
          <div class="ui label">
            邮箱
          </div>
          <input type="text" v-model="userInfo.email">
        </div>
        <br>
        <div class="ui labeled input">
          <div class="ui label">
            联系人姓名
          </div>
          <input type="text" v-model="userInfo.contacterName">
        </div>
        <br>
        <div class="ui labeled input">
          <div class="ui label">
            联系人电话
          </div>
          <input type="text" v-model="userInfo.contacterPhone">
        </div>
        <br>
        <div class="ui labeled input">
        <div class="ui label">
          通信地址
        </div>
        <input type="text" v-model="userInfo.communicationAddress">
        </div>
      </div>
    </div>
    <div v-else-if="$route.params.type == 'group_internal_user'">
      <div v-if="modify==false">
      <h3>{{userInfo.name}}</h3>
      <p>电子邮箱：{{userInfo.email}}</p>
      <p>所属单位：{{userInfo.group.companyName}}</p>
      </div>
      <div  v-else-if="modify==true">
        <div class="ui labeled input">
          <div class="ui label">
            用户名
          </div>
          <input type="text" v-model="userInfo.name">
        </div>
        <br>
        <div class="ui labeled disabled input">
          <div class="ui label">
            邮箱
          </div>
          <input type="text" v-model="userInfo.email">
        </div>
        <br>
        <div class="ui labeled disabled input">
          <div class="ui label">
            所属单位
          </div>
          <input type="text" v-model="userInfo.name">
        </div>
      </div>
    </div>
    <div v-if="$route.params.type == 'individual_user'">
      <button class="ui button" v-on:click="update">修改信息</button>
      <button class="ui button" v-on:click="submit1">提交</button>
    </div>
    <div v-if="$route.params.type == 'group_user'">
      <button class="ui button" v-on:click="update">修改信息</button>
      <button class="ui button" v-on:click="submit2">提交</button>
    </div>
    <div v-if="$route.params.type == 'group_internal_user'">
      <button class="ui button" v-on:click="update">修改信息</button>
      <button class="ui button" v-on:click="submit3">提交</button>
    </div>
    <div class="ui success hidden message">
      <p>修改成功！</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import util from 'util'

  export default {
    name: "UserInfo",
    data () {
      return {
        userInfo: {},
        modify:false
      }
    },
    methods: {
      async groupInternalUsers() {
        const res = await axios.post('http://193.112.111.199:9090/graphql', {
          query: `query groupInternalUsers($id: String) {
						groupInternalUsers(id: $id) {
							group {
								companyName
							}
							email
							name
						}
					}`,
          variables: {
            id:this.$route.params.id
          }
        });
        this.userInfo = res.data.data.groupInternalUsers[0];
      },
      async groupUsers() {
        const res = await axios.post('http://193.112.111.199:9090/graphql', {
          query: `query groupUsers($id: String) {
						groupUsers(id: $id) {
							email
							contacterName
							contacterPhone
							companyName
							communicationAddress
							corporationPhotoUrl
						}
					}`,
          variables: {
            id:this.$route.params.id
          }
        });
        this.userInfo = res.data.data.groupUsers[0];
      },
      async individualUsers() {
        const res = await axios.post('http://193.112.111.199:9090/graphql', {
          query: `query individualUsers($id: String) {
						individualUsers(id: $id) {
							email
							name
						}
					}`,
          variables: {
            id:this.$route.params.id
          }
        });
        this.userInfo = res.data.data.individualUsers[0];
      },
      getUserInfo: function () {
        this.type = this.$route.params.type;
        switch (this.$route.params.type) {
          case 'individual_user': this.individualUsers(); break;
          case 'group_user': this.groupUsers(); break;
          case 'group_internal_user': this.groupInternalUsers(); break;
        }
      },
      update:function () {
        this.modify=true;
      },
      submit1:function () {
        let requestData = {
          query: util.format(`
              mutation {
                UpdateUserInfo(id:%d,name:"%s")
              }
          `,
            Number(this.$route.params.id),
            this.userInfo.name)
        };
        console.log(requestData);
        axios.post('http://192.144.136.166:4040/graphql/UpdateUserInfo',
          requestData).then(
          (res)=>{
            console.log(res);
            if (res.data.data.UpdateUserInfo === true) {
              $('.ui.success.message').removeClass('hidden');
              setTimeout(function() {
                $('.ui.success.message').addClass('hidden');
              }, 5000);
            }
            else {
              alert(res.data);
            }
          }
        );
        this.modify=false;
      },
      submit2:function () {
        let requestData = {
          query: util.format(`
              mutation {
                UpdateGroupUserInfo(id:%d,company_name:"%s",
                contacter_name:"%s",contacter_phone:"%s",communication_address:"%s")
              }
          `,
          Number(this.$route.params.id),
          this.userInfo.companyName,
          this.userInfo.contacterName,
          this.userInfo.contacterPhone,
          this.userInfo.communicationAddress)
        };
        console.log(requestData);
        axios.post('http://192.144.136.166:4040/graphql/UpdateGroupUserInfo',
          requestData).then(
          (res)=>{
            console.log(res);
            if (res.data.data.UpdateGroupUserInfo === true) {
              $('.ui.success.message').removeClass('hidden');
              setTimeout(function() {
                $('.ui.success.message').addClass('hidden');
              }, 5000);
            }
            else {
              alert(res.data);
            }
          }
        );
        this.modify=false;
      },
      submit3:function () {
        let requestData = {
          query: util.format(`
              mutation {
                UpdateGroupInternalUserInfo(id:%d,name:"%s")
              }
          `,
            Number(this.$route.params.id),
            this.userInfo.name)
        };
        console.log(requestData);
        axios.post('http://192.144.136.166:4040/graphql/UpdateGroupInternalUserInfo',
          requestData).then(
          (res)=>{
            console.log(res);
            if (res.data.data.UpdateGroupInternalUserInfo === true) {
              $('.ui.success.message').removeClass('hidden');
              setTimeout(function() {
                $('.ui.success.message').addClass('hidden');
              }, 5000);
            }
            else {
              alert(res.data);
            }
          }
        );
        this.modify=false;
      }
    },
    created: function () {
      $('.ui.success.message').hide();
      this.getUserInfo();
    },
    watch: {
        '$route.params': function() {
        this.getUserInfo();
      }
    }
  }
</script>
<style scoped>
  .ui.button{
    margin-top:9px
  }
  .ui.labeled.input{
    margin-top:5px
  }
</style>
