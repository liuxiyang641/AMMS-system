<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup1"
                    label="会议标题"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      type="text"
                      v-model="title"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="会议简介"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="brief"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3"
                    label="征文信息"
                    label-for="exampleInput3">
        <b-form-input id="exampleInput3"
                      type="text"
                      v-model="zhengwen"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup4"
                    label="截稿日期"
                    label-for="exampleInput4" description="格式：2018-6-5">
        <b-form-input id="exampleInput4"
                      type="text"
                      v-model="deadline"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup4"
                    label="录用通知日期"
                    label-for="exampleInput4" description="格式：2018-6-5">
        <b-form-input id="exampleInput4"
                      type="text"
                      v-model="inform"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup4"
                    label="注册日期"
                    label-for="exampleInput4" description="格式：2018-6-5">
        <b-form-input id="exampleInput4"
                      type="text"
                      v-model="sign"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup4"
                    label="会议注册日期"
                    label-for="exampleInput4" description="格式：2018-6-5">
        <b-form-input id="exampleInput4"
                      type="text"
                      v-model="meetsign"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup4"
                    label="日程安排"
                    label-for="exampleInput4">
        <b-form-input id="exampleInput4"
                      type="text"
                      v-model="routing"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup5"
                    label="组织机构"
                    label-for="exampleInput5">
        <b-form-input id="exampleInput5"
                      type="text"
                      v-model="authority"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup6"
                    label="论文模板"
                    label-for="exampleInput6">
        <b-form-input id="exampleInput6"
                      type="text"
                      v-model="moban"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup7"
                    label="注册费用"
                    label-for="exampleInput7">
        <b-form-input id="exampleInput7"
                      type="text"
                      v-model="cost"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup8"
                    label="住宿交通"
                    label-for="exampleInput8">
        <b-form-input id="exampleInput8"
                      type="text"
                      v-model="room"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup1"
                    label="联系信息"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      type="text"
                      v-model="contact"
                      required>
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          title:'',
          brief:'',
          zhengwen:'',
          routing:'',
          deadline:'',
          inform:'',
          sign:'',
          meetsign:'',
          authority:'',
          moban:'',
          room:'',
          cost:'',
          contact:''
        },
        show: true
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault();
        alert("提交成功");
      },
      onReset (evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.title = '';
        this.brief = '';
        this.zhengwen= '';
        this.routing= '';
        this.deadline = '';
        this.inform = '';
        this.sign= '';
        this.meetsign= '';
        this.contact= '';
        this.authority = '';
        this.moban = '';
        this.room= '';
        this.cost= '';
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => { this.show = true });
      }
    }
  }
</script>

<style scoped>

</style>
