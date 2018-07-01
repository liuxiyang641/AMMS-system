<template>
  <div class="ui container">
    <a v-bind:class="'ui ' + ((parseInt(entry.stat) & 1) ? 'red' : 'green') + ' fluid card'" v-for="entry in conference">
      <div class="content">
        <div class="header"> {{ entry.name }} </div>
        <div class="meta"> {{ entry.institution }} </div>
        <div class="description"> {{ entry.info }} </div>
      </div>
      <div class="extra content">
        <i class="purple calendar check icon"></i> 
        <span> {{ entry.start_date }} </span>
        <i v-bind:class="((parseInt(entry.stat) & 1) ? 'red' : 'green') + ' circle icon'"></i> 
        <span> {{ entry.stat }} </span>
      </div>
    </a>
  </div>  
</template>

<script>
export default {
  name: 'ConferenceList',
  data: () => {
    return {
      conference: [
        {
          name: 'IEEE Conference CVPR 2018',
          info: 'Computer Vision Conference ...',
          stat: '0',
          institution: 'Beihang University',
          start_date: '2018.7.1'
        },
        {
          name: 'IEEE Conference CVPR 2018',
          info: 'Computer Vision Conference ...',
          stat: '1',
          institution: 'Beihang University',
          start_date: '2018.7.1'
        },
        {
          name: 'IEEE Conference CVPR 2018',
          info: 'Computer Vision Conference ...',
          stat: '2',
          institution: 'Beihang University',
          start_date: '2018.7.1'
        },
        {
          name: 'IEEE Conference CVPR 2018',
          info: 'Computer Vision Conference ...',
          stat: '3',
          institution: 'Beihang University',
          start_date: '2018.7.1'
        }
      ]
    } 
  }
}
</script>

<style scoped>
  i {
    margin-left: 5%;
  }
</style>

