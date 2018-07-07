<template>
  <div class="modal-content ui container">
    <table class="ui compact celled definition table">
      <thead class="full-width" align="center">
      <tr>
        <th>序号</th>
        <th>会议名称</th>
        <th>开始时间</th>
        <th>截止时间</th>
        <th>举办地点</th>
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
  import util from 'util'
  export default {
    name: "UserRegistrationList",
    data () {
      return {
        confInfo:[]
      }
    },

    methods:{
      async GetRegisteredConferences() {
        try {
          const res = await axios.post('http://192.144.136.166:4040/graphql', {
            query: util.format(`
                            query a {
                                  GetRegisteredConferences(individual_user_id: %d){
                                    conference_id,
                                    title,
                                    start_time,
                                    end_time,
                                    address
                                    }
                            }`, this.$route.params.id)
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

