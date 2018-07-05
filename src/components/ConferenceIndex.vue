<template>
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
                <b-tab title="会议投稿">
                    <PaperList :papers="papers"></PaperList>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>

</template>

<script>
  import ConferenceInfo from '@/components/ConferenceInfo'
  import SearchPanel from '@/components/SearchPanel'
  import PaperSubmission from '@/components/paper-submission'
  import PaperList from '@/components/PaperList'

  export default {
    name: "ConferenceIndex",
    components: {
      ConferenceInfo,
      SearchPanel,
	  PaperSubmission,
	  PaperList,
    },
	data: function () {
		return {
			papers: []
		}
	},
	methods: {
	}
}
</script>

<style scoped>

</style>
