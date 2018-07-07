<template>
  <div class="ui container">
    <button class="ui button" v-on:click="update">修改信息</button>
    <releaseconf v-bind:fatherconf="confinfo"></releaseconf>
  </div>
</template>

<script>
  import axios from 'axios';
  import releaseconf from '@/components/releaseconf'

  export default {
    name: "updateconf",
    components:{
      releaseconf
    },
    data () {
      return {
        confinfo:""
      }
    },
    methods: {
      async GetConferences() {
        try {
          const res = await axios.post('http://192.144.136.166:4040/graphql', {
            query: `
                            query GetConferences($confid:Int){
                                  GetConferences(id:$confid){
                                    conference_id,
                                    title,
                                    introduction,
                                    status,
                                    essay_info,
                                    paper_deadline,
                                    acceptance_deadline,
                                    register_deadline,
                                    start_time,
                                    end_time,
                                    schedule,
                                    institution,
                                    paper_template_url,
                                    register_fee,
                                    accommodation_transportation,
                                    contact_us,
                                    address,
                                    template,
                                    groupid,
                                    if_twice
                                    }
                            }`
            ,
            variables: {
              //confid:this.$route.params.id
              confid:2
            }
          });
          this.confinfo = res.data.data.GetConferences[0];
          console.log(this.confinfo);
        } catch (e) {
          console.log('err', e)
        }
      },
      update:function () {
        this.GetConferences();
      }
    }
  }
</script>
<style scoped>
  .ui.button{
    margin-top:9px
  }
  .ui.labeled.input{
    margin-top:5px
  }
</style>
