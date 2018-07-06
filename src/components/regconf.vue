<template>
  <div class="modal-content">
    <table class="ui compact celled definition table">
      <thead class="full-width" align="center">
      <tr>
        <th width="90">序号</th>
        <th width="90">会议名称</th>
        <th width="90">开始时间</th>
        <th width="90">截止时间</th>
        <th width="90">举办地点</th>
      </tr>
      </thead>
      <tbody>
      <tr class="cont" align="center" v-for="conf in confInfo">
        <td>{{conf.conference_id}}</td>
        <td>{{conf.title}}</td>
        <td>{{conf.start_time}}</td>
        <td>{{conf.end_time}}</td>
        <td>{{conf.address}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "regconf",
    data () {
      return {
        confInfo:[]
      }
    },

    methods:{
      async GetRegisteredConferences() {
        try {
          const res = await axios.post('http://192.144.136.166:4040/graphql', {
            query: `
                            query GetRegisteredConferences($userid:Int){
                                  GetRegisteredConferences(individual_user_id:$userid){
                                    conference_id,
                                    title,
                                    start_time,
                                    end_time,
                                    address
                                    }
                            }`
            ,
            variables: {
              // id:this.$route.params.id
              userid: 1
            }
          });
          this.confInfo = res.data.data.GetRegisteredConferences;
          //console.log(res.data.data.GetRegisteredConferences);
        } catch (e) {
          console.log('err', e)
        }
      }
    },
    created: function () {
      this.GetRegisteredConferences();
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

