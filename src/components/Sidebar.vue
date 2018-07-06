<template>
  <div class="ui left fixed inverted vertical menu v-centered" 
    :style="'top: 5.9rem; bottom:0; border-radius: 0; padding-top: ' + (Session.login() ? '2.5rem;':'10rem')">

    <img class="ui centered small circular image"
      :src="Session.login() ? userImg : userNone" />
    
    <div class="ui hidden divider"></div>
    <div class="item" style="text-align: center;">
      <div class="header" style="font-size: 1.3rem;"> 
        {{ Session.login() ? Session.get('username') : '游客'}} 
      </div>
      <div class="mt-4">
        <i :class="'small ' + (Session.login() ? 'green':'red') + ' circle icon'"></i>
        {{ Session.login() ? Session.type() : '未登录' }}
      </div>
    </div>
    
    <div class="ui hidden divider"></div>
    <a v-for="entry in services" 
        :href="entry.route" 
        class="ui dropdown item" 
        style="text-align: center; font-size: 1.2rem;">
      <i class="angle right icon"></i>
      {{ entry.service }}
    </a>
    
  </div> 
</template>

<script>
  import userImg from '@/assets/user.png'
  import userNone from '@/assets/user-none.png'
  export default {
    name: 'Sidebar',
    data: function() {
      return {
        userImg: userImg,
        userNone: userNone
      }
    },
    props: {
      services: {
        type: Array,
        required: true
      }
    } 
  }
</script>
