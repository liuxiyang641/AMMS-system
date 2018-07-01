<template>
  <div class="ui container">
    <!--<img src="../assets/logo.png" />-->
    <SearchPanel id="search"></SearchPanel>
  </div>
</template>

<script>
import SearchPanel from '@/components/search-panel'

export default {
	name: 'Index',
	components: {
    SearchPanel
	}
}

</script>

<style scoped>
  #search {
    margin-top: 18%;
    margin-left: 28%;
  }
</style>
