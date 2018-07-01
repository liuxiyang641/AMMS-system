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
      <textarea v-model="form.essay_info"></textarea>
    </div>
		<div class="field">
      <label>日程安排</label>
      <textarea v-model="form.schedule"></textarea>
    </div>
		<div class="equal width fields">
			<div class="required field">
		    <label>截稿日期</label>
		    <input type="date" v-model="form.paper_deadline">
		  </div>
			<div class="field">
		    <label>录用通知日期</label>
		    <input type="date" v-model="form.acceptance_deadline">
		  </div>
			<div class="field">
		    <label>会议注册日期</label>
		    <input type="date" v-model="form.register_deadline">
		  </div>
		</div>
		<div class="equal width fields">
			<div class="required field">
		    <label>会议开始日期</label>
		    <input type="date" v-model="form.start_time">
		  </div>
			<div class="required field">
		    <label>会议结束日期</label>
		    <input type="date" v-model="form.end_time">
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
		    <input type="file" v-on:change="form.paper_template_url">
		  </div>
			<div class="field">
		    <label>注册费用</label>
		    <input type="number" v-model="form.register_fee">
		  </div>
		</div>
		<div class="field">
      <label>住宿交通</label>
      <textarea v-model="form.accommodation_transportation"></textarea>
    </div>
		<div class="required field">
      <label>联系信息</label>
      <textarea v-model="form.contact_us"></textarea>
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
    data () {
      return {
        form: {
          title:'',
          introduction:'',
          essay_info:'',
          schedule:'',
          paper_deadline:'',
          acceptance_deadline:'',
          register_deadline:'',
          start_time: '',
          end_time: '',
          institution:'',
          accommodation_transportation:'',
          register_fee:'',
          contact_us:'',
          address: ''
        }
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault();
        async function newConference(form_data) {
				const res = await axios.post('http://192.144.153.164:9000/graphiql', {
                        query: `
                            mutation newConference(
                                $title:String, 
                                $introduction:String,
                                $essay_info:String,
                                $schedule:String,
                                $paper_deadline:String,
                                $acceptance_deadline:String,
                                $register_deadline:String,
                                $start_time: String,
                                $end_time: String,
                                $institution:String,
                                $accommodation_transportation:String,
                                $register_fee:String,
                                $contact_us:String,
                                $address: String
                              ) {
                                  newConference(
                                    title:$title, 
                                    introduction:$introduction,
                                    essay_info:$essay_info,
                                    schedule:$schedule,
                                    paper_deadline:$paper_deadline,
                                    acceptance_deadline:$acceptance_deadline,
                                    register_deadline:$register_deadline,
                                    start_time: $start_time,
                                    end_time: $end_time,
                                    institution:$institution,
                                    accommodation_transportation:$accommodation_transportation,
                                    register_fee:$register_fee,
                                    contact_us:$contact_us,
                                    address: $address
                                  ) {
                                    conference_id
                                  }
                            }`,
                        variables: form_data
                    });
                  }
                  for(var key in this.form) {
                    if(this.form[key] != '' && (key.slice(-8) == 'deadline' || key.slice(-4) == 'time')) {
                      this.form[key] += ' 00:00:00';
                    }
                  }
                  console.log(this.form);
                  console.log(newConference(this.form));
      },
      onReset (evt) {
        evt.preventDefault();
        /* Reset our form values */
        for(var key in this.form) {
          this.form[key] = '';
        }        
      }
    }
  }
</script>

<style scoped>

</style>
