<template>
  <a v-bind:href="'/#/conference/' + conference.conference_id" v-bind:class="'ui ' + ((parseInt(conference.status) & 1) ? 'red' : 'green') + ' fluid card'">
      <div class="center aligned content">
        <div class="header"> {{ conference.title }} </div>
        <div class="meta"> {{ conference.institution }} </div>
        <div class="description"> {{ conference.introduction }} </div>
      </div>
      <div class="center aligned extra content">
        <i class="purple calendar check icon"></i> 
        <span> {{ conference.start_time.split('T')[0] }} </span>
        <i v-bind:class="((parseInt(conference.status) & 1) ? 'red' : 'green') + ' circle icon'"></i> 
        <span> {{ text_stat[parseInt(conference.status)] }} </span>
      </div>
  </a>
</template>

<script>
export default {
	name: 'ConferenceItem',
  data: () => {
    return {
      text_stat: ['投稿中', '已截稿', '注册中', '截止注册', '会议中', '会议完成']
    }
  },
	props: {
		conference: {
			type: Object,
			required: true
		}
	}
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  i {
    margin-left: 5%;
  }
</style>
