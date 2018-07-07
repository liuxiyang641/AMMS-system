<template>
  <div class="modal-content">
    <table class="ui compact celled definition table">
      <thead class="full-width" align="center">
      <tr>
        <th width="90">序号</th>
        <th width="90">论文名称</th>
        <th width="90">论文版本</th>
        <th width="90">作者</th>
        <th width="90">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr class="cont" align="center" v-for="paper in paperInfo">
        <td>{{paper.paper_id}}</td>
        <td>{{paper.paper_name}}</td>
        <td>{{paper.version}}</td>
        <td>{{paper.paper_author}}</td>
        <td>
          <button class="ui button" v-on:click="mod">重新上传</button>
        </td>
      </tr>
      </tbody>
      <tfoot class="full-width">
      <tr>
        <th></th>
        <th colspan="4">
          <div class="ui right floated small primary labeled icon button" @click="">
            <i class="user icon"></i> 新的上传
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
    name: "manege",
    data () {
      return {
        file:'',
        file_status:null,
        institution:null,
        modify_description:null,
        paper_abstract:null,
        paper_author:null,
        paper_name:null,
        file_url:null,
        conference_id:null,
        paperInfo:[],
        user_ids:window.sessionStorage.getItem('id'),
      }
    },

    methods:{
      async GetPaper() {
        try {
          const res = await axios.post('http://192.144.136.166:4040/graphql', {
            query: `
                            query GetPaper($userid:Int,$confid:Int){
                                  GetPaper(individual_user_id:$userid,conference_id:$confid){
                                    paper_id,
                                    paper_name,
                                    version,
                                    paper_author
                                    }
                            }`
            ,
            variables: {
              // id:this.$route.params.id
              userid: 1,
              confid: 1
            }
          });
          this.paperInfo = res.data.data.GetPaper;
          console.log(res.data.data.GetPaper);
        } catch (e) {
          console.log('err', e)
        }
      }
    },
    created: function () {
      this.GetPaper();
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

