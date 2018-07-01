<template>
    <div id="app">
        <!--<router-view/>-->
        <ConferenceInfo></ConferenceInfo>
    </div>
</template>

<script>
    import ConferenceInfo from './components/ConferenceInfo'
    export default {
        name: 'App',
        components:{
            ConferenceInfo
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
