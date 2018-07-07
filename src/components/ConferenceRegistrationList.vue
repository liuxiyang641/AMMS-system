<template>
	<div class="ui container">
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
			<tr v-for="register in page" :key="register.registerId">
				<td>{{register.registerId}}</td>
				<td>{{register.individualUser.individualUserId}}</td>
				<td>{{register.individualUser.name}}</td>
				<td>{{register.participateName}}</td>
				<td>{{register.individualUser.email}}</td>
				<td>
					<img :src="register.registerProofUrl" style="color: black" class='min' onclick="this.className = this.className == 'max' ? 'min' : 'max';" id="image1" >
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
	name:'ConferenceRegistrationList',
	data:function(){
		return{
			currentPage:1,
			perPage:10,
			page:[],
			registers:[],
		}
	},
	methods:{
	getRegisters:function() {
    var _this = this;
		axios.get('http://192.144.153.164:9000/register/conference',
			{
				params:{
					conferenceid: this.$route.params.id
				}
			}
		)
    .then((response)=>{
      console.log(response);
			_this.registers=response.data;
		  _this.getPage(_this.currentPage);
		})
    .catch((err)=>{
			console.log(err);
		});
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
