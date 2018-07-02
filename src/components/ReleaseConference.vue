<template> 
  <div class="ui form">
    <div class="required field">
      <label>会议名称</label>
      <input type="text" v-model="form.title" required>
    </div>
    <div class="required field">
      <label>会议简介</label>
      <textarea v-model="form.introduction"></textarea>
    </div>
		<div class="required field">
      <label>征文信息</label>
      <textarea v-model="form.essayInfo"></textarea>
    </div>
		<div class="field">
      <label>日程安排</label>
      <textarea v-model="form.schedule"></textarea>
    </div>
		<div class="equal width fields">
			<div class="required field">
		    <label>截稿日期</label>
		    <input type="date" v-model="form.paperDeadline">
		  </div>
			<div class="field">
		    <label>录用通知日期</label>
		    <input type="date" v-model="form.acceptanceDeadline">
		  </div>
			<div class="field">
		    <label>会议注册日期</label>
		    <input type="date" v-model="form.registerDeadline">
		  </div>
		</div>
		<div class="equal width fields">
			<div class="required field">
		    <label>会议开始日期</label>
		    <input type="date" v-model="form.startTime">
		  </div>
			<div class="required field">
		    <label>会议结束日期</label>
		    <input type="date" v-model="form.endTime">
		  </div>
		</div>
		<div class="equal width fields">
			<div class="required field">
		    <label>组织机构</label>
		    <input type="text" v-model="form.institution">
		  </div>
			<div class="required field">
		    <label>开会地点</label>
		    <input type="text" v-model="form.address">
		  </div>
		</div>
		
		<div class="equal width fields">
			<div class="field">
		    <label>论文模板</label>
		    <input type="file" v-on:change="uploadTemplate">
		  </div>
			<div class="field">
		    <label>注册费用</label>
		    <input type="number" v-model="form.registerFee">
		  </div>
		</div>
		<div class="field">
      <label>住宿交通</label>
      <textarea v-model="form.accommodationTransportation"></textarea>
    </div>
		<div class="required field">
      <label>联系信息</label>
      <textarea v-model="form.contactUs"></textarea>
    </div>
    <div class="ui buttons">
      <button class="ui big submit button" @click="onReset">重置</button>
      <div class="or"></div>
      <button class="ui big positive submit button" @click="onSubmit">提交</button>
    </div>
	</div>
</template>

<script>
  import axios from 'axios'
  export default {
    data: function() {
      return {
        form: {
          title:'',
          introduction:'',
          essayInfo:'',
          schedule:'',
          paperDeadline:'',
          acceptanceDeadline:'',
          registerDeadline:'',
          startTime: '',
          endTime: '',
          institution:'',
          accommodationTransportation:'',
          registerFee:0,
          contactUs:'',
          address: ''
        }
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault();
        for(var key in this.form) {
          if(this.form[key] != '' && (key.slice(-8) == 'Deadline' || key.slice(-4) == 'Time')) {
            this.form[key] += ' 00:00:00';
          }
          if(key == 'registerFee') this.form[key] = parseInt(this.form[key]);
        }
			  axios.post('http://192.144.153.164:9000/conference', this.form).then(function(res) {
          console.log(res);
          window.location.href = '/#/conference/' + res.data.conferenceId;
        }).catch(function(err) {
          console.log(err);
        });
      },
      onReset (evt) {
        evt.preventDefault();
        for(var key in this.form) {
          this.form[key] = '';
        }        
      },
      uploadTemplate() {
        //console.log(this.files);
      }
    }
  }
</script>

<style scoped>

</style>
