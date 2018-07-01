<template>
	<div>
		<h5><b-link href="#">{{conference.title}}</b-link><b-badge>{{conference.status}}</b-badge></h5>
		<p>{{conference.abstract}}</p>
	</div>
</template>

<script>
export default {
	name: 'ConferenceItem',
	props: {
		conference: {
			type: Object,
			required: true
		}
	},
	data: function () {
		return {}
	}
}
</script>

<style>
</style>
