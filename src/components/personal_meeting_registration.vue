<template>
	<div class="ui form" >
	
	
		<div><br />
				<div class="required field" style="display:inline">
					<label>1.参会人姓名:</label>
					<input type="text" placeholder="Full Name" v-model="form.participatename" style="width:150px; height:20px">
				</div>
				<div class="required field" style="display:inline">
					<label>&nbsp;2.联系方式:</label>
					<input type="text" placeholder="phone" v-model="form.phone" style="width:150px; height:20px">
				</div>
		</div>
		<br />
		<div>
			<div class="inline fields">
				<label for="sex">3.性别:&nbsp;</label>
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
				<br />
				<label for="chose">4.是否需要预约住宿:&nbsp;</label>
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
				<br />
      		</div>
		</div
		<br />
		<div>
			<div>
				<label>5.论文ID（投稿用户必填）:</label>
				<input type="text" v-model="form.paperid" name="essay_id" style="width:150px; height:20px">
			</div>
			<br />
			<div>
				<label>&nbsp;6.备注（未投稿用户请填：聆听参会）:</label>
				<input type="text" v-model="form.remark" name="others" style="width:300px; height:20px">
			</div>
		</div>
		<br />
		<div class="panel panel-default" >
      		<div class="panel-heading"><label>7.上传注册缴费凭证</label></div>
      		<div class="panel-body">
			<br />
        	<!--<input type="file" @change="getFile($event)" name="file" style="width:250px; height:50px"/>-->
			<form enctype="multipart/form-data" id="form1" method="post" action="http://d342dc7a.ngrok.io/upload/register">
        请选择文件
        	<input input type="file" name="file"/>
			<!--<button class="positive ui button" @click="submitForm($event)">提交</button>-->
			<input type="submit" id="tj" value="提交" @click="getUrl($event)">
			</form>
			<br />
  			</div>
    	</div>
	</div>
</template>




<script type="text/javascript">

$('.ui.radio.checkbox')
  .checkbox()
;
import axios from 'axios'
export default{
	name:'personal_meeting_registration',
	data:function(){
		return {
			form:{
			userid:'1',
			url:'1',
			conferenceid:'1',
			paperid:'',
			ifAccommodation:'',
			participatename:'',
			participatesex:'',
			remark:'',

			}}},
	methods: {
		  
          getFile(event) {
            this.form.file = event.target.files[0];
            console.log(this.file);
          },
          submitForm(url1) {
		    this.form.url=url1;
            event.preventDefault();
			/*let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }}
            var formData = new FormData();
            formData.append('participatename', this.participatename);
            formData.append('userid', this.userid);
			formData.append('conferenceid', this.conferenceid);
			formData.append('participatesex', this.participatesex);
			formData.append('ifAccommodation', this.ifAccommodation);
            formData.append('file', this.file);
			formData.append('paperid', this.paperid);
			formData.append('remark', this.remark);
 			
			
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
 
            this.$http.post('http://192.144.153.164：9000/rejisterconference', formData, config).then(function (res) {
              if (res.status === 2000) {
              }
            })
          
		  axios.post('http://53df43ec.ngrok.io/registerconference?userid=1',this.form).then(function(res){
		  	console.log(res);
			window.location.href = 'http://www.baidu.com' ;
			}).catch(function(err){
				console.log(err);
			});*/
			console.log(this.form);
			$.post('http://d342dc7a.ngrok.io/registerconference',this.form,function(data){console.log(data)})
		  },
		  getUrl(event){
		  	$("#form1").ajaxForm((data) => {
				if(data=="upload fail")
					alert("文件上传失败");
				else this.submitForm(data)
				})
			}
		}
	}
</script>