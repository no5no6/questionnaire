<template>
  <div>
    <el-row type="flex" justify="end" align="middle" style="padding: 20px">
      <el-col :span="5" ><el-input v-model="questionnaireName" placeholder="问卷名称"></el-input></el-col>
      <el-col :span="4" :offset="1">
        <el-select v-model="questionnaireTemplateId" placeholder="选择模板">
          <el-option
            v-for="item in this.QuestionnaireTemplate.list"
            :key="item._id"
            :label="item.title"
            :value="item._id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2" :offset="1"><el-button type="primary" size="large" style="postio" @click="add">添加问卷</el-button></el-col>
    </el-row>
    <el-table
      :data="this.QuestionnaireEach.list"
      border
      style="width: 100%;">
      <el-table-column
        label="名称"
        width="300">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="180">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.operation.dateString }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作人"
        width="150">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.operation.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            v-if="scope.row.status"
            type="danger"
            size="small"
            @click="changeStatus(scope.row._id, !scope.row.status)">关闭</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            @click="changeStatus(scope.row._id, !scope.row.status)">开启</el-button>
          <router-link :to="{ path: 'statistics', query: { questionnaireId: scope.row._id, questionnaireName: scope.row.title }}">
            <el-button
              size="small">统计</el-button>
          </router-link>
          <router-link :to="{ path: `questionnaire/${scope.row._id}`}">
            <el-button
              size="small">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'SetQuestionnaire',
    data(){
      return {
        questionnaireName: '',
        questionnaireTemplateId: '',
      }
    },
    methods: {
      ...mapActions(['getQuestionnaireEachList', 'getQuestionnaireTemplateList', 'addQuestionnaire', 'changeQuestionnaireEachStatus']),
      init() {
        this.getQuestionnaireEachList();
        this.getQuestionnaireTemplateList();
      },
      add() {
        this.addQuestionnaire({title: this.questionnaireName, templateId: this.questionnaireTemplateId}).then(()=> {
          this.getQuestionnaireEachList();
          this.$notify({
            title: '成功',
            message: '问卷添加成功',
            type: 'success'
          });
        });
      },
      changeStatus(id, status) {
        this.changeQuestionnaireEachStatus({id, status}).then((data) => {
          if(data) {
            this.getQuestionnaireEachList();
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success'
            });
          }else {
            this.$notify({
              title: '警告',
              message: '开启新问卷前，请先关闭同一模板下的其他问卷。',
              type: 'warning'
            });
          }

        });
      },

    },
    computed: {
      ...mapState({
        Question: state => state.question,
      }),
    },
    computed: {
      ...mapState({
        QuestionnaireEach: state => state.QuestionnaireEach,
        QuestionnaireTemplate: state => state.QuestionnaireTemplate,
      }),
    },
    mounted() {
      this.init();
    }
  }
</script>

<style>
</style>
