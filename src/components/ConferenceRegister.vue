<template>
  <div class="ui container">
	  <div id="register" class="ui form">
      <div class="inline required field">
					<label>参会人姓名</label>
					<input type="text" placeholder="Full Name" v-model="form.participatename">
          <div class="ui left pointing red basic label" ref="participatename" style="display:none">
              请填写参会人姓名
          </div>
			</div>
			<div class="inline required field">
				<label>联系方式</label>
				<input type="text" placeholder="phone" v-model="form.phone">
        <div class="ui left pointing red basic label" ref="phone" style="display:none">
            请填写联系方式
        </div>
			</div>
			<div class="required inline fields">
				<label for="sex">性别</label>
				<div class="field">
					<div class="ui radio checkbox">
						<input type="radio" name="sex" v-model="form.participatesex" value="man" checked="checked">
       				<label>男</label>
					</div>
				</div>
				<div class="field">
					<div class="ui radio checkbox">
						<input type="radio" name="sex" v-model="form.participatesex" value="woman">
       				<label>女</label>
					</div>
				</div>
        <div class="ui left pointing red basic label" ref="participatesex" style="display:none">
            请选择性别
        </div>
      </div>
      <div class="required inline fields">
				<label for="chose">是否需要预约住宿</label>
				<div class="field">
					<div class="ui radio checkbox">
						<input type="radio" name="chose" v-model="form.ifAccommodation" value="1" checked="checked">
       				<label>是</label>
					</div>
				</div>
				<div class="field">
					<div class="ui radio checkbox">
						<input type="radio" name="chose" v-model="form.ifAccommodation" value="0">
       				<label>否</label>
					</div>
				</div>
        <div class="ui left pointing red basic label" ref="ifAccommodation" style="display:none">
            请选择住宿情况
        </div>
      </div>
			<div class="field">
				<label>已投稿论文</label>
        <textarea v-html="paper_name" readonly="readonly"></textarea>
			</div>
			<div class="required field">
				<label>备注（未投稿用户请填：聆听参会）</label>
        <textarea v-model="form.remark" name="others"></textarea>
        <div class="ui pointing red basic label" ref="remark" style="display:none">
            请填写参会备注
        </div>
			</div>
      <div class="inline required field v-centered">
        <label>注册缴费凭证</label>
        <span class="ui teal button fileinput-button">
          <span>上传</span>
          <input type="file" name="file" @change="getFile($event)" />
        </span>
        <div ref="fileobj" class="ui left pointing red basic label" style="display:none;">
            请选择稿件上传
        </div>
        <div class="ui left pointing red basic label filename" 
            v-if="fileobj">
          {{ this.fileobj.name }}
        </div>
      </div>
      <br/>
      <div class="ui orange button" 
          @click="getUrl($event)">
          <i class="upload icon"></i>
          &nbsp;提交注册信息
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
	name: 'ConferenceRegister',
	data: function() {
		return {
			form: {
		  	userid: this.Session.get('user_id'),
		  	url: '',
		  	conferenceid: this.$route.params.id,
		  	ifAccommodation:'',
		  	participatename:'',
		  	participatesex:'',
		  	remark:''
		  },
		  paper_name: '',
      fileobj: ''
    }
  },
  updated: function() {
    $('#register .ui.pointing.label').each(function() {
      if(!$(this).hasClass('filename')) $(this).hide();
    });
  },
	methods: {
    getFile(event) {
      this.fileobj = event.target.files[0];
    },
    check() {
       var required = ['participatename', 'phone', 'fileobj', 'participatesex', 'remark', 'ifAccommodation'];
       for(var i = 0; i < required.length; i++) {
          if(required[i] != 'fileobj' && !this.form[required[i]]) {
            this.$refs[required[i]].style.display = '';
            this.remind({
              type: 'warning',
              header: '请填写必填项！'
            })
            return false;
          }
          if(required[i] == 'fileobj' && !this[required[i]]) {
            this.$refs[required[i]].style.display = '';
            this.remind({
              type: 'warning',
              header: '请填写必填项！'
            })
            return false;
          }
       }
       return true;
    },
	  getUrl(event) {
      if(!this.check()) return;
      this.remind({
        type: 'success',
        header: '正在上传...',
        info: '请耐心等候...',
        finished: 1
      })
      var _this = this;
      var file_data = new FormData();
      file_data.append('file', this.fileobj);
      axios.post('http://192.144.153.164:9000/upload/register', file_data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
	    .then(res => {
        console.log(res);
        if(res.data == "upload fail") {
          this.remind({
            type: 'error',
            header: '凭证文件大小超过限制'
          });
          return;
        }
		    _this.form.url = res.data;
		    $.post('http://192.144.153.164:9000/registerconference', _this.form,
          function(data) {
            console.log(data);
            if(!data.registerId) {
              _this.remind({
                type: 'error',
                header: '您已注册过次会议'
              })
            }
            else {
              _this.remind({
                type: 'success',
               header: '注册成功！'
              });
            }
            _this.$router.push({
              path: '/conference/' + _this.$route.params.id + '/info'
            })
        });
		  })
		}
	},
  mounted: function() {
    $('#register .ui.radio.checkbox').checkbox();
  },
  created: function () {
    axios.get('http://192.144.153.164:9000/paper/conference/user',{
      params:{
        conferenceid:this.$route.params.id,
        userid:this.Session.get('user_id')
      }
    })
    .then((response)=>{
      for(var i=0;i<response.data.length;i++) {
        this.paper_name=this.paper_name+response.data[i]+'\n';
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}
</script>
