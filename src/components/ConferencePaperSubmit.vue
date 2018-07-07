<template>
    <div class="ui container">
        <form class="ui form" id="submission-form" ref="submissionref">
            <div v-if="update" class="ui visible warning message">
              <div class="header">正在修改论文: {{ paper_id }}</div>
              <p>请更新相关信息并填写更新说明</p>
            </div>
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
            <div v-if="update" class="required field">
                <label>修改说明</label>
                <textarea v-model="modify_description"></textarea>
                <div class="ui pointing red basic label" ref="modify_description" style="display: none">
                    请填写这次修改的相关说明
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
                <div class="ui left pointing red basic label filename" v-if="file!=='' " style="display: inline-block;position: absolute">{{this.file.name}}</div>
            </div>

            <br/>
            <div id="paper-submit-btn" class="ui orange button" 
              @click="update ? Update($event) : submit($event)" 
              style="margin-top: 0.5rem">
                <i class="upload icon"></i>
                &nbsp;{{ update ? '提交修改' : '提交论文' }}
            </div>
            
        </form>
    </div>
</template>

<script>
    import querystring from 'querystring';

    export default {
        name: "PaperSubmission",
        data () {
            return {
                file: '',
                file_status: null,
                institution: null,
                modify_description: null,
                paper_abstract: null,
                paper_author: null,
                paper_name: null,
                file_url: null,
                paper_id: null,
                update: false
            }
        },
        mounted: function() {
          this.update = this.$route.query.update;
          var info = this.update ? this.$route.query.paper_info : {};
          for(var key in this.$data) {
            if(key in info) this.$data[key] = info[key];
          }
        },
        updated: function() {
          this.hideAllMessage();
        },
        methods: {
            uploading:function(event) {
                this.file = event.target.files[0];//获取文件
            },
            checkSubmission: function () {
                if (!this.paper_name) {
                    this.$refs.paper_name.style.display="";
                    return false;
                }
                if (!this.paper_abstract) {
                    this.$refs.paper_abstract.style.display="";
                    return false;
                }
                if (!this.paper_author) {
                    this.$refs.paper_author.style.display="";
                    return false;
                }
                if (this.update && !this.modify_description) {
                    this.$refs.modify_description.style.display="";
                    return false;
                }
                return true;
            },
            hideAllMessage: function () {
                $('#submission-form .ui.pointing.label').each(function() {
                    if(!$(this).hasClass('filename')) $(this).hide();
                })
            },
            uploadPost: function(file_data) {
              var _this = this;
              return new Promise((resolve, reject) => {
                  this.Axios.post(
                    'http://193.112.111.199:9090/upload-file',
                    file_data,
                    {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                      }
                    }
                  )
                  .then(res => {
                    res = JSON.parse(res.data.replace(/'/g,'\"'));
                    if (res.status === '1') {
                      _this.file_status = res.status;
                      _this.file_url = res.file_url;
                      resolve();
                    }
                    else reject('upload failed');
                  })
              })            
            },
            updateContribute: function(updateParam) {
                 this.Axios.post(
                      'http://193.112.111.199:9090/modify_contribution', 
                      querystring.stringify(updateParam),
                      {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        }
                      }
                  )
                  .then(res => {
                    var stat = parseInt(res.data);
                    var correspond = [
                      {
                        type: 'error',
                        header: '您无权限更新',
                        info: ''
                      },
                      {
                         type: 'error',
                         header: '更新失败，请联系管理员！',
                         info: ''
                      },
                      {
                        type: 'success',
                        header: '修改成功！',
                        info: '' 
                      },
                      {
                        type: 'error',
                        header: '论文可能重复'
                      },
                      {
                        type: 'error',
                        header: '超过截稿时间'
                      },
                      {
                        type: 'error',
                        header: '论文不可修改'
                      }
                    ];
                    this.remind(correspond[stat]);
                    this.$router.push({
                      path: '/conference/' + this.$route.params.id + '/papers'
                    })
                  })
                  .catch(err => {
                    this.remind({
                      type: 'error',
                      header: '更新失败，请联系管理员！'
                    })
                  });
            },
            Update: function(event) {
              event.preventDefault();
              this.hideAllMessage();
              if(!this.checkSubmission()) {
                this.remind({
                  type: 'warning',
                  header: '注意',
                  info: '请填写必选项！'
                });
                return;
              }
              var if_file = (this.file === '' ? false : true);
              var file_data = null;
              var updateParam = {
                 institution: this.institution,
                 paper_abstract: this.paper_abstract,
                 paper_author: this.paper_author,
                 paper_name: this.paper_name,
                 conference_id: this.$route.params.id,
                 user_ids: this.Session.get('user_id'),
                 if_update_file: '0',
                 paper_id: this.paper_id,
                 modify_description: this.modify_description
              };
              var _this = this;
              if(if_file) {
                file_data = new FormData();
                file_data.append('UPLOAD', this.file);
                file_data.append('conference_id', this.$route.params.id); 
                updateParam.if_update_file = '1';
              }
              this.remind({
                type: 'success',
                finished: 1,
                header: '正在更新...',
                info: '请耐心等待...'
              })

              if(!if_file) {
                this.updateContribute(updateParam); 
              }
              else {
                this.uploadPost(file_data).then(() => {
                  updateParam.file_status = _this.file_status;
                  updateParam.file_url = _this.file_url;
                  _this.updateContribute(updateParam);
                })
              }
            },
            submit: function(event) {
                event.preventDefault(); 
                this.hideAllMessage();
                //检查必填项
                if (!this.checkSubmission()) {
                  this.remind({
                    type: 'warning',
                    header: '请填写必选项！'
                  });
                  return;
                }
                //没有选择文件
                if (this.file === '') {
                  this.remind({
                    type: 'warning',
                    header: '请填写必选项！'
                  })
                  this.$refs.file.style.display="";
                  return;
                }
                let fileData = new FormData();
                fileData.append('UPLOAD', this.file);
                fileData.append('conference_id', this.$route.params.id);

                //先上传文件，再post所有投稿信息
                this.remind({
                  type: 'success',
                  finished: 1,
                  header: '正在上传...',
                  info: '请耐心等待...'
                })

                this.Axios.post(
                  'http://193.112.111.199:9090/upload-file',
                  fileData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    }
                  }
                )
                .then(res => {
                  console.log(res);
                  res = JSON.parse(res.data.replace(/'/g,'\"'));
                  if (res.status === '1') {
                      this.file_status = res.status;
                      this.file_url = res.file_url;
                  }
                  else throw 'upload failed';
                })
                .then(() => {
                  let submissionParam = {
                      file_status: this.file_status,
                      institution: this.institution,
                      paper_abstract: this.paper_abstract,
                      paper_author: this.paper_author,
                      paper_name: this.paper_name,
                      file_url: this.file_url,
                      conference_id: this.$route.params.id,
                      user_ids: this.Session.get('user_id')
                  };
                  this.Axios.post(
                      'http://193.112.111.199:9090/contribute', 
                      querystring.stringify(submissionParam),
                      {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        }
                      }
                  )
                  .then(res => {
                     var stat = parseInt(res.data);
                     var correspond = [
                      {
                        type: 'error',
                        header: '您无权限更新',
                        info: ''
                      },
                      {
                        type: 'error',
                        header: '论文可能重复'
                      },
                      {
                        type: 'success',
                        header: '修改成功！',
                        info: '' 
                      },
                      {
                        type: 'error',
                        header: '超过截稿时间'
                      }
                    ];
                    this.remind(correspond[stat]);
                    this.$router.push({
                      path: '/conference/' + this.$route.params.id + '/papers'
                    })
                  })
                  .catch(error => {
                    throw error;
                  });
                })
                .catch(err => {
                   console.log(err);
                   this.remind({
                      type: 'error',
                      header: '更新失败，请联系管理员！'
                   })
                })
            }
        }
    }
</script>

