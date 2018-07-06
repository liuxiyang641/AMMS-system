<template>
<div class="ui relaxed divided list">
	<div class="ui container">
		<user_item v-for="users in page" :key="users.user_id" :user=user"></user_item>
	</div>
	<b-pagination class="mt-4" :total-rows="conferences.length" :per-page="perPage" v-model="currentPage"></b-pagination>
</div> 
</template>

<script>
	import useritem from '@/components/UserItem'
	
	export default{
		name:'examine_users',
		components:{
			useritem
		},
		data:function(){
			return{
				currentpage:1,
				perPage:12,
				page:[],
				user:[],
			},
			
		},
		watch:{
			currentPage:function(newVal){
				this.getPage(newVal);
			}
		},
		methods:{
			
			getPage:function(currentPage){
				this.page=[];
				for(var i=(currentPage-1)*this.perPage;i<Math.min(currentPage*this.perPage,this.user.length);i++)
					this.page.push(this.user[i]);
				}
		}
	}
</script>