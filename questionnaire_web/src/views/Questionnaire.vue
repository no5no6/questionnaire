<template>
  <div id="questionnairePage">
    <el-row type="flex" justify="center" align="middle" >
      <h1>{{questionnaireName}}</h1>
    </el-row>
    <el-row v-if="result.answer.length > 0" type="flex" justify="left" align="middle" v-for="(topic, index) in Questionnaire.template.topic" :key="topic._id">
      <el-col>
        <el-row type="flex" justify="left" align="middle">{{`${index + 1}、${topic.question}`}}{{topic.must ? "（必填）" : "（选填）"}}</el-row>
        <el-row class="questionRow" v-if="topic.type === '单选'" type="flex" justify="left" align="middle" >
          <el-col >
            <el-row class="answerRow" v-for="(option, opIndex) in topic.options" :key="option._id">
              <el-radio v-model="result.answer[index].selectContent" class="radio" :label="option.content"></el-radio>
              <el-input v-if="option.allowAddReasonStatus" v-model="result.answer[index].additional" placeholder="请输入理由" :disabled="result.answer[index].selectContent !== option.content"></el-input>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="questionRow" v-if="topic.type === '多选'" type="flex" justify="left" align="middle" >
          <el-col >
            <el-checkbox-group class="answerRow" v-model="result.answer[index].selectMultipleContent">
              <el-checkbox :label="option.content" v-for="(option, opIndex) in topic.options" :key="option._id"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row class="questionRow" v-if="topic.type === '问答'" type="flex" justify="left" align="middle" >
          <el-col>
            <el-input class="answerRow" type="textarea" :rows="4" v-model="result.answer[index].selectContent" placeholder="请输入期望与建议"></el-input>
          </el-col>
        </el-row>
        <el-row class="questionRow" v-if="topic.type === '打分'" type="flex" justify="left" align="middle" >
          <el-rate
            class="answerRow"
            v-model="result.answer[index].selectContent"
            :max="10"
            :low-threshold="4"
            :high-threshold="8"
            :texts="['极差', '极差', '失望', '失望', '一般', '一般', '满意', '满意', '惊喜', '惊喜']"
            show-text>
          </el-rate>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle" >
      <router-link v-if="preview" :to="{ path: '/setQuestion' }" replace>
        <el-button  type="primary" >返回</el-button>
      </router-link>
      <el-button v-else type="primary" @click="finished">提交问卷</el-button>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Questionnaire',
    data(){
      return {
        questionnaireId: '',
        questionnaireName: '',
        rate: null,
        radio: [],
        result: {
          templetId: '',
          questionnaireId: '',
          questionnaireTitle: '',
          userName: '',   // 回答者姓名
          department: '', // 部门
          answer: []
        },
        preview: ''
      }
    },
    methods: {
      ...mapActions(['getQuestionnaireTemplateById', 'setTemplate', 'getQuestionnaireEachById', 'saveQuestionnaire', 'getUserInfoById', 'authUserFinishedQuestionnaire']),
      init() {

        let localData = JSON.parse(localStorage.getItem('questionnaire'));
        this.questionnaireId = this.$route.params.id;

        if(this.questionnaireId === 'preview') {
          this.preview = this.questionnaireId;
          this.previewQuestionnaire(this.QuestionnaireTemplate.template);
        }else {
          if (localData && localData.id === this.questionnaireId) {
            this.$router.push({path: '/success'});
          }else {
            this.getQuestionnaireEachById({id: this.questionnaireId}).then((eachData) => {
              if(!eachData) {
                this.$router.push({path: '/error'});
              } else {
                this.setQuestionnaire(eachData)
              }
            });
          }
        }
      },
      previewQuestionnaire(data) {
        this.questionnaireName = data.title;
        this.result.questionnaireTitle = data.title;
        this.putResultAnswer(data);
        this.setTemplate(data);
      },
      setQuestionnaire(eachData) {
        this.questionnaireName = eachData.title;
        this.result.questionnaireTitle = eachData.title;
        this.result.questionnaireId = eachData._id;
        this.result.templetId = eachData.templateId;
        this.getQuestionnaireTemplateById({id: eachData.templateId}).then((data) => {
          this.putResultAnswer(data);
          this.setTemplate(data);
        });
      },
      putResultAnswer(data) {
        data.topic.forEach((item) => {
          if(item.type === '单选'){
            if(item.allowAddReasonStatus) {
              this.result.answer.push({topicId: item._id, number: item.number, must: item.must, question: item.question, type: item.type, selectContent: '', additional: '', optionSort: _.map(item.options, 'content')});
            }else {
              this.result.answer.push({topicId: item._id, number: item.number, must: item.must, question: item.question, type: item.type, selectContent: '', optionSort: _.map(item.options, 'content')});
            }
          }else if(item.type === '多选') {
            this.result.answer.push({topicId: item._id, number: item.number, must: item.must, question: item.question, type: item.type, selectMultipleContent: [], optionSort: _.map(item.options, 'content')});
          }else if(item.type === '问答') {
            this.result.answer.push({topicId: item._id, number: item.number, must: item.must, question: item.question, type: item.type, selectContent: ''});
          }else {
            this.result.answer.push({topicId: item._id, number: item.number, must: item.must, question: item.question, type: item.type, selectContent: 0 });
          }
        });
      },
      dataIsNum() {
        return this.result.answer.some((item) => {
          if(item.must) {
            if(item.type === '多选'){
              return item.selectMultipleContent.length === 0;
            }else {
              return !!!item.selectContent;
            }
          }else {
            return false;
          }
        });
      },
      finished() {
        if(!this.dataIsNum()){
          this.saveQuestionnaire(this.result).then((error) => {
            if(error){
              this.$notify.error({
                title: '失败',
                message: '提交失败'
              });
            }else {
              localStorage.setItem('questionnaire', `{"date": "${moment().format('YYYY-MM-DD')}", "id": "${this.questionnaireId}"}`);
              this.$notify({
                title: '成功',
                message: '感谢您的参与，问卷提交成功！',
                type: 'success'
              });
              this.$router.push({path: '/success'});
            }
          });
        }else {
          this.$notify({
            title: '警告',
            message: '请完成必填题目后再提交问卷',
            type: 'warning'
          });
        }

      }
    },
    computed: {
      ...mapState({
        QuestionnaireTemplate: state => state.QuestionnaireTemplate,
        Questionnaire: state => state.Questionnaire,
      }),
    },
    beforeMount() {
      this.init();
    }
  }
</script>

<style>
  #questionnairePage {
    padding-left: 20px;
    padding-right: 20px;
  }
  .questionRow {
    padding-bottom: 40px;
  }
  .answerRow {
    padding-top: 5px;
  }
</style>
