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
    <div class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        Profile Picture
      </div>
      <div class="scrolling content">
        <form class="ui form" id="submission-form" ref="submissionref">
          <div class="required field">
            <label>投稿名称</label>
            <input type="text" placeholder="投稿论文名称" v-model="paper_name" >
            <div class="ui pointing red basic label" ref="paper_name" style="display:none">
              请填写投稿名称
            </div>
          </div>
          <div class="two field">
            <div class="required  field">
              <label>投稿人姓名</label>
              <input type="text"  placeholder="第一作者;第二作者" v-model="paper_author">
              <div class="ui pointing red basic label" ref="paper_author" style="display: none">
                请填写投稿人姓名
              </div>
            </div>
            <div class="field">
              <label>单位</label>
              <input type="text"  placeholder="单位" v-model="institution">
            </div>
          </div>
          <div class="required field">
            <label>摘要</label>
            <textarea v-model="paper_abstract"></textarea>
            <div class="ui pointing red basic label" ref="paper_abstract" style="display: none">
              请填写必要的摘要
            </div>
          </div>
          <div class="required field" style="display: inline">
                <span class="required ui teal button fileinput-button">
                    <span>选择文件</span>
                    <input type="file" @change="uploading($event)"/>
                </span>
            <div class="ui left pointing red basic label" style="display:none;position: absolute" ref="file">
              请选择稿件上传
            </div>
            <div class="ui left pointing red basic label" v-if="file!=='' " style="display: inline-block;position: absolute">{{this.file.name}}</div>
          </div>

          <br/>
          <button class="ui orange button" @click="submit($event)" style="margin-top: 0.5rem"><i class="upload icon"></i>&nbsp;提交论文</button>
          <div class="ui success message">
            <div class="header">提交成功!</div>
            <p>你的论文已提交成功，请耐心等待评审结果</p>
          </div>
          <div class="ui error message" id="errorSubmission">
            <div class="header">错误！</div>
            <p>你的提交由于一些原因失败了</p>
          </div>
          <div class="ui error message" id="repeatPaper">
            <div class="header">错误！</div>
            <p>已存在重复论文</p>
          </div>
          <div class="ui warning message">
            <div class="header">注意：</div>
            <p>请检查你的提交，保证每一个必选项都得到了正确的填写</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "GetPaper",
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

    methods:
   {
    uploading:function(event){
      this.file = event.target.files[0];//获取文件
    },
    checkSubmission:function () {
      if (this.paper_name===''){
        this.$refs.paper_name.style.display="";
        return false;
      }
      if (this.paper_abstract===''){
        this.$refs.paper_abstract.style.display="";
        return false;
      }
      if (this.paper_author===''){
        this.$refs.paper_author.style.display="";
        return false;
      }
      return true;
    },
    hideAllMessage:function () {
      this.$refs.paper_name.style.display="none";
      this.$refs.paper_abstract.style.display="none";
      this.$refs.paper_author.style.display="none";
      this.$refs.file.style.display="none";
      $('.ui.warning.message').hide();
      $('.ui.success.message').hide();
      $('#errorSubmission').hide();
      $('#repeatPaper').hide();
    },
    async submit (event) {
    event.preventDefault();//取消默认行为
    console.log()
    this.hideAllMessage();
    //检查必填项
    if (!this.checkSubmission()) {
      $('.ui.warning.message').show();
      return;
    }
    //没有选择文件
    if (this.file===''){
      $('.ui.warning.message').show();
      this.$refs.file.style.display="";
      return;
    }
    let fileData = new FormData();
    fileData.append('UPLOAD', this.file);

    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',  //之前说的以表单传数据的格式来传递fromdata
      }
    };
    //先上传文件，再post所有投稿信息
    axios.post('http://193.112.111.199:9090/upload-file', fileData, config).then(
      (res)=>{
        res=JSON.parse(res.data.replace(/'/g,`"`));
        if (res.status==='1'){
          //获取返回值，第二次post用到
          this.file_status=res.status;
          this.file_url=res.file_url;
        }
        else {
          $('#errorSubmission').show();
        }
      }
    ).catch((error) => {
      console.log(error);
      $('#errorSubmission').show();
    }).then(
      ()=>{
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          }
        };
        let data={
          file_status: this.file_status,
          institution: this.institution,
          paper_abstract:this.paper_abstract,
          paper_author:this.paper_author,
          paper_name:this.paper_name,
          file_url:this.file_url,
          conference_id:this.$route.params.id,
          user_ids:'1'
        };
        //深渊无敌巨坑，axios与jQuery的post方法实现起来不一样！！要发送application/x-www-form-urlencoded，需要querystring
        axios.post('http://193.112.111.199:9090/contribute',querystring.stringify(data),config).then((res) => {
          //处理返回的结果
          console.log(res);
          if (res.data===1){            //重复论文提交
            $('#repeatPaper').show();
          }
          else if (res.data===2){           //提交成功
            $('.ui.success.message').show();
          }
          else {
            $('.ui.warning.message').show();        //无文件上传
          }
        }).catch((error) => {
          console.log(error);
          $('#errorSubmission').show();
        });
      });
  },
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
      },
      mod(){
        $('.ui.modal')
          .modal('show')
        ;
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

