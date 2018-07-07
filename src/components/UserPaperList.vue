<template>
  <div class="modal-content ui container">
    <table class="ui compact celled definition table">
      <thead class="full-width" align="center">
      <tr>
        <th width="90">序号</th>
        <th width="90">论文名称</th>
        <th width="90">所属会议</th>
        <th width="90">作者</th>
        <th width="90">当前状态</th>
      </tr>
      </thead>
      <tbody>
      <tr class="cont" align="center" v-for="paper in paperInfo">
        <td>{{paper.paper_id}}</td>
        <td>{{paper.paper_name}}</td>
        <td>{{paper.conference_name}}</td>
        <td>{{paper.author}}</td>
        <td>{{paper.paper_status}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios'
  import util from 'util'
  export default {
    name: "UserPaperList",
    data () {
      return {
        paperInfo:[]
      }
    },

    methods:{
      async GetAllSubmissions() {
        try {
          const res = await axios.post('http://192.144.136.166:4040/graphql', {
            query: util.format(`
                            query a {
                                  GetAllSubmissions(individual_user_id:%d){
                                    paper_id,
                                    paper_name,
                                    conference_name,
                                    paper_status,
                                    author
                                    }
                            }`, this.$route.params.id)
          });
          this.paperInfo = res.data.data.GetAllSubmissions;
          var tmp = this.paperInfo;
          console.log(tmp);
          for(var p in tmp)
          {
            switch (tmp[p].paper_status)
            {
            case 1:
              this.paperInfo[p].paper_status='待审核';
              break;
            case 2:
              this.paperInfo[p].paper_status='已通过';
              break;
            case 3:
              this.paperInfo[p].paper_status='修改中';
              break;
            case 4:
              this.paperInfo[p].paper_status='未通过';
              break;
            }
          }
          console.log(res.data.data.GetAllSubmissions);
        } catch (e) {
          console.log('err', e)
        }
      }
    },
    created: function () {
      this.GetAllSubmissions();
    }
  }
</script>


<style scoped>
</style>

