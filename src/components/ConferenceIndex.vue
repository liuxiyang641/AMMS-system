<template>
<<<<<<< HEAD
  <div class="ui container">
    <ConferenceInfo></ConferenceInfo>
  </div>
=======
    <div class="ui container">
        <b-card no-body>
            <b-tabs pills card vertical>
                <b-tab title="会议信息">
                    <ConferenceInfo></ConferenceInfo>
                </b-tab>
                <b-tab v-if="Session.individualUser()" title="注册会议">
                </b-tab>
                <b-tab v-if="Session.individualUser()" title="投稿">
                    <PaperSubmission></PaperSubmission>
                </b-tab>
                <b-tab v-if="Session.individualUser()" title="我的投稿">
                </b-tab>
                <b-tab v-if="isOwner" title="会议投稿">
                    <PaperList :papers="papers"></PaperList>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>

>>>>>>> cf564dc99efcda6ef63183102a388cbb530a89ff
</template>

<script>
  import ConferenceInfo from '@/components/ConferenceInfo'
<<<<<<< HEAD
=======
  import SearchPanel from '@/components/SearchPanel'
  import PaperSubmission from '@/components/paper-submission'
  import PaperList from '@/components/PaperList'
  import axios from 'axios'


>>>>>>> cf564dc99efcda6ef63183102a388cbb530a89ff
  export default {
    name: "ConferenceIndex",
    components: {
      ConferenceInfo,
<<<<<<< HEAD
=======
      SearchPanel,
	  PaperSubmission,
	  PaperList,
    },
	data: function () {
		return {
			papers: [],
            isOwner:null
		}
	},
	methods: {
	},
      mounted:function () {
          let typecode;
          switch (this.Session.get('type')){
              case 'individual_user':
                  typecode=1;
                  break;
              case 'group_user':
                  typecode=2;
                  break;
              case 'group_internal_user':
                  typecode=3;
                  break;
          }
          let url='http://192.144.153.164:9000/conference/permission?conferenceid='+this.$route.params.id+'&userid='+this.Session.get('user_id')+'&type='+typecode;
          axios.get(url).then(
              (res)=> {
             this.isOwner=res.data;
          }).catch((error) => {
              console.log(error);
          });
>>>>>>> cf564dc99efcda6ef63183102a388cbb530a89ff
    }
}
</script>

<style scoped>

</style>
