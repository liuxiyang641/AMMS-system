<template>
  <div class="ui container">
    <table class="ui compact celled definition table">
      <thead class="full-width" align="center">
      <tr>
        <th>序号</th>
        <th>论文名称</th>
        <th>论文版本</th>
        <th>作者</th>
        <th>最新修改说明</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr align="center" v-for="paper in paperInfo">
        <td>{{paper.paper_index}}</td>
        <td>{{paper.paper_name}}</td>
        <td>{{paper.version}}</td>
        <td>{{paper.paper_author}}</td>
        <td>{{paper.modify_description}}</td>
        <td>
          <div class="ui button" @click="download(paper.paper_id)">下载稿件</div>
          <div class="ui button" @click="update(paper.paper_id)">修改稿件</div>
        </td>
      </tr>
      </tbody>
      <tfoot class="full-width">
      <tr>
        <th></th>
        <th colspan="5">
          <div class="ui right floated small primary labeled icon button" @click="submit">
            <i class="user icon"></i> 上传稿件
          </div>
        </th>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "ConferencePersonalPaperList",
    data () {
      return {
        paperInfo: []
      }
    },
    methods: {
      GetPaper: function() {
        console.log(1);
        axios.post('http://192.144.136.166:4040/graphql', {
          query: `
                  query GetPaper($userid:Int,$confid:Int) {
                    GetPaper(individual_user_id:$userid,conference_id:$confid){
                      paper_id,
                      paper_name,
                      paper_abstract,
                      version,
                      paper_author,
                      modify_description
                    }
                  }
              `,
          variables: {
               userid: parseInt(this.Session.get('user_id')),
               confid: this.$route.params.id
            }
          })
          .then(res => {
            this.paperInfo = res.data.data.GetPaper;
            console.log(this.paperInfo);
            var count = 0;
            for(var key in this.paperInfo) {
              count++;
              this.paperInfo[key].paper_index = count;
            }
          })
          .catch(err => {
            console.log(err);
          })
       },
       submit: function() {
         this.$router.push({
           path: '/conference/' + this.$route.params.id + '/submit'
         })
       },
       update: function(paper_id) {
          var paper_info = null;
          for(var key in this.paperInfo) {
            if(this.paperInfo[key].paper_id == paper_id) paper_info = this.paperInfo[key];
          }
          this.$router.push({
            path: '/conference/' + this.$route.params.id + '/submit',
            query: {
              update: true,
              paper_info: paper_info
            }
          })
       },
       download: function(paper_id) {
           this.ajaxPromise({
               url: 'http://193.112.111.199:9090/download',
               type: "POST",
               data: {
                   paper_id: parseInt(paper_id)
               },
               xhrFields: {
                   withCredentials: true
               },
               crossDomain: true
           })
               .then(res => {
                   window.location.href = res;
               })
               .catch(err => {
                   console.log(err);
               })
       }
    },
    created: function () {
      this.GetPaper();
    }
  }
</script>

<style scoped>
</style>

