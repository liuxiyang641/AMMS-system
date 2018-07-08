<template>
  <a @click="toConfInfo(conference.conference_id)" class="ui fluid card">
    <div class="center aligned content">
      <div class="header"> {{ conference.title }} </div>
      <div class="meta"> {{ conference.institution }} </div>
      <div class="description"> {{ conference.introduction.length > 100 ? (conference.introduction.substr(0,100) + '......') : conference.introduction }} </div>
    </div>
    <div class="center aligned extra content">
      <i class="purple calendar check icon"></i> 
      {{ conference.start_time }}
      <i :class="((parseInt(conference.status) & 1) ? 'red' : 'green') + ' circle icon'"></i> 
      {{ text_stat[parseInt(conference.status)] }}
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
  methods: {
    toConfInfo: function(id) {
      this.$router.push({
        path: '/conference/' + id + '/info' 
      })
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
