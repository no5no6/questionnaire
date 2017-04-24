<template>
  <div>
    <el-row type="flex" justify="end" align="middle" style="padding: 20px">
      <el-col :span="2">
        <router-link :to="{ path: 'setQuestion'}">
          <el-button type="primary" size="large" style="postio">添加模板</el-button>
        </router-link>
      </el-col>
    </el-row>
    <el-table
      :data="this.QuestionnaireTemplate.list"
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
        label="题目数量"
        width="180">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.topic.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <router-link :to="{ path: 'setQuestion', query: { questionnaireTemplateId: scope.row._id}}">
            <el-button size="small">编辑</el-button>
          </router-link>
          <el-button type="danger" size="small" @click="remove(scope.row._id, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'SetQuestionnaireTemplate',
    data(){
      return {
        fullscreenLoading: false
      }
    },
    methods: {
      ...mapActions(['removeTemplateById']),
      remove(templateId, index) {
        this.removeTemplateById({templateId: templateId, index: index}).then((error) => {
          if(error){
            this.$notify.error({
              title: '错误',
              message: '删除失败'
            });
          }else {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          }
        });
      }
    },
    computed: {
      ...mapState({
        QuestionnaireTemplate: state => state.QuestionnaireTemplate,
      }),
    }
  }
</script>

<style>
</style>
