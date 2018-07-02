<template>
  <div class="ui container">
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="会议信息" active>
          <ConferenceInfo></ConferenceInfo>
        </b-tab>
        <b-tab title="注册会议">
        </b-tab>
        <b-tab title="投稿">
            <PaperSubmission></PaperSubmission>
        </b-tab>
        <b-tab title="我的投稿">
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
    import ConferenceInfo from '@/components/ConferenceInfo';
    import PaperSubmission from "./paper-submission";

    export default {
        name: 'ConferenceInfoIndex',
        components: {
            PaperSubmission,
            ConferenceInfo
        }
    }

</script>
