<template>
  <div>
    <el-row type="flex" justify="start" align="middle" >
      <el-col :span="15"><h1>问卷系统</h1></el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="问卷管理" name="first">
        <set-questionnaire></set-questionnaire>
      </el-tab-pane>
      <el-tab-pane label="模板管理" name="second">
        <set-questionnaire-template></set-questionnaire-template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import SetQuestionnaire from '../components/SetQuestionnaire';
  import SetQuestionnaireTemplate from '../components/SetQuestionnaireTemplate';

  export default {
    name: 'QuestionList',
    data(){
      return {
        activeName: 'first',
      }
    },
    methods: {
      handleClick() {

      }
    },
    components: {
      SetQuestionnaire,
      SetQuestionnaireTemplate
    }
  }
</script>

<style>

</style>
