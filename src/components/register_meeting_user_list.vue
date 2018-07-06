<template>
	<div>
		<table class="ui celled padded table">
			<thead>
			<tr>
				<th>&nbsp;&nbsp;</th>
				<th>用户ID</th>
				<th>用户名</th>
				<th>参会者姓名</th>
				<th>邮箱</th>
				<th>缴费证明</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="registers in page" :key="registers.registerId">
				<td>{{registers.registerId}}</td>
				<td>{{registers.individualUser.individualUserId}}</td>
				<td>{{registers.individualUser.name}}</td>
				<td>{{registers.participateName}}</td>
				<td>{{registers.individualUser.email}}</td>
				<td>
					<img :src="registers.registerProofUrl" style="color: black" class='min' onclick="this.className = this.className == 'max' ? 'min' : 'max';" id="image1" >
				</td>
			</tr>
			</tbody>
			<tfoot>
            <tr>
                <th colspan="6">
                    <b-pagination class="mt-6" :total-rows="registers.length" :per-page="perPage" v-model="currentPage"></b-pagination>
                </th>
            </tr>
            </tfoot>
		</table>
	</div>
</template>

<script>
import axios from 'axios'

export default{
	name:'register_meeting_user_list',
	data:function(){
		return{
			currentPage:1,
			perPage:10,
			page:[],
			registers:[],
		}
	},
	methods:{
	getRegisters:function(){
		axios.get('192.144.153.164:9000/register/conference?conferenceid=',
			{
				params:{
					conferenceid:this.$route.params.id
				}
			}
		).then((response)=>{
			this.registers=response.data;
		}).catch((err)=>{
			console.log(err);
		});
		this.getPage(this.currentPage);
	},
	getPage: function (currentPage) {
			this.page = this.registers.slice((currentPage - 1) * this.perPage, Math.min(currentPage * this.perPage, this.registers.length));
		}
	},
	created: function () {
		this.getRegisters();
	}
}
</script>

<style>
	.max{
		width:100%;
		height:auto;
	}
	.min{
		width:30px !important;
		height:auto;
	}
</style>