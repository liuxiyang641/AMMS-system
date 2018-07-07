<template>
  <div class="ui container">
	  <div class="ui form">
    <div class="fields">
      <div class="inline required field">
					<label>1.参会人姓名:</label>
					<input type="text" placeholder="Full Name" v-model="form.participatename">
				</div>
				<div class="inline required field">
					<label>&nbsp;2.联系方式:</label>
					<input type="text" placeholder="phone" v-model="form.phone">
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
    </div>
		<br />
		<div>
			<div>
				<label>5.已投稿论文:</label>
				<textarea  v-html="paper_name" style="width:500px; height:auto" readonly="readonly" >
        </textarea>
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
			<form enctype="multipart/form-data" id="form1" method="post" action="http://192.144.153.164:9000/upload/register">
        请选择文件
        	<input input type="file" name="file"/>
			<!--<button class="positive ui button" @click="submitForm($event)">提交</button>-->
			<input type="submit" id="tj" value="提交" @click="getUrl($event)">
			</form>
			<br />
  			</div>
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
	name:'ConferenceRegister',
	data:function(){
		return {
			form:{
			userid: this.Session.get('user_id'),
			url: '',
			conferenceid: this.$route.params.id,
			ifAccommodation:'',
			participatename:'',
			participatesex:'',
			remark:'',

			},
			  paper_name:''
    }},
	  methods: {
          getFile(event) {
            this.form.file = event.target.files[0];
            //console.log(this.file);
          },
          submitForm(url1) {
		        this.form.url=url1;
			      event.preventDefault();
			      $.post('http://192.144.153.164:9000/registerconference',this.form,function(data){console.log(data)})
		      },
		  getUrl(event){
		  	$("#form1").ajaxForm((data) => {
				if(data=="upload fail")
					alert("文件上传失败");
				else this.submitForm(data)
				})
			}
		},
  created: function () {
    axios.get('http://192.144.153.164:9000/paper/conference/user',{
      params:{
        conferenceid:this.$route.params.id,
        userid:this.Session.get('user_id')
      }
    }).then((response)=>{
      //console.log(response.data[3]);
      for(var i=0;i<response.data.length;i++)
      {
        this.paper_name=this.paper_name+response.data[i]+'\n';
      }
    }).catch((err)=>{
      console.log(err);
    });

  }
	}
</script>
