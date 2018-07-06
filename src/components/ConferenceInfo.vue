<template>
    <Template1 v-if="template == 1"></Template1>
	<Template2 v-else-if="template == 2"></Template2>
</template>

<script>
    import axios from 'axios';
	import Template1 from '@/components/templates/Template1'
	import Template2 from '@/components/templates/Template2'

    export default {
        name: "ConferenceInfo",
		components: {
			Template1, Template2
		},
        data () {
            return {
                fields: [ '相关日期', '具体时间' ],
                template:null
            }
        },
        methods: {
            async GetConferenceTemplate() {
				this.items = [];
				const res = await axios.post('http://192.144.136.166:4040/graphql', {
					query: `
						query GetConferences($id: Int) {
							GetConferences(id: $id) {
								template
							}
						}`,
					variables: {
						id:this.$route.params.id
					}
				});
				this.template = res.data.data.GetConferences[0].template;
			},
			session: function(key) {
				return window.sessionStorage.getItem(key);
			},
        },
        created: function () {
            this.GetConferenceTemplate();
        },
        watch:{
            '$route.params': function () {
				this.GetConferenceTemplate();
            }
        },
    }
</script>

<style scoped>
</style>
