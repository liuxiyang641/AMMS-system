<template>
	<div>
		<h5><b-link href="#">{{conference.title}}</b-link><b-badge>{{ conference.status }}</b-badge></h5>
		<p>{{conference.introduction}}</p>
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
	}
}
</script>

<style>
</style>
