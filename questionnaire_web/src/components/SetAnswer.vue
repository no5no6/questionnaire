<template>
  <div>
    <el-row type="flex" justify="start" align="middle" class="markSetRow">
      <el-col :span="12" :offset="1">
        <el-radio class="radio" v-model="question.type" label="单选">单选</el-radio>
        <el-radio class="radio" v-model="question.type" label="多选">多选</el-radio>
        <el-radio class="radio" v-model="question.type" label="问答">问答</el-radio>
        <el-radio class="radio" v-model="question.type" label="打分">打分</el-radio>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-switch v-model="question.must" on-text="必填" off-text="选填" off-color="#ff4949"></el-switch>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start" align="middle" class="markSetRow" style="padding-bottom: 30px">
      <el-col :span="13" :offset="1">
        <el-input type="textarea" :rows="3" placeholder="请编辑题目" v-model="question.question"></el-input>
      </el-col>
    </el-row>
    <el-row v-if="showAnswer" type="flex" justify="start" align="middle" class="markSetRow" v-for="(answer, index) in question.options" :key="index">
      <el-col :span="14" :offset="1">
        <el-input type="textarea" :rows="2" placeholder="请编辑答案" v-model="answer.content"></el-input>
      </el-col>
      <el-col :span="10" :offset="1">
        <span>附加文字说明</span>
        <el-switch on-text="开" off-text="关" v-model="answer.allowAddReasonStatus" off-color="#ff4949" :disabled="allowAddReasonDisable"></el-switch>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-button v-if="index === question.options.length - 1" type="primary" icon="plus" class="addLable" @click="addAnswer"></el-button>
        <el-button  v-if="question.options.length > 1" type="danger" icon="minus" class="addLable" @click="removeAnswer(index)"></el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end" align="middle" style="padding-top: 30px">
      <el-col :span="5" :offset="1"><el-button type="primary" style="width: 100px" @click="save">保存题目</el-button></el-col>
      <el-col :span="5"><el-button style="width: 100px" @click="clear">清空题目</el-button></el-col>
      <el-col :span="5"><el-button style="width: 100px" type="danger" @click="remove">删除题目</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash';
  import bus from '../utils/bus';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'SetAnswer',
    data(){
      return {
        answerTemplate: {
          content: '',
          allowAddReasonStatus: false,
        },
        questionTemplate: {
          type: '单选',
          question: '',
          must: true,  // 是否必填
          options: [],
        },
        question: {},
        selectedIndex: -1,
        showAnswer: true, // 是否可以设置答案
        allowAddReasonDisable: false, // 是否可以设置附加答案
      }
    },
    methods: {
      ...mapActions(['setAnswerList', 'unSetAnswerList']),
      init() {
        this.bindEvent();
        this.clear(); // 初始化问题和答案
      },
      bindEvent() {
        bus.$on('setQuestion', (index) => {
          this.selectedIndex = index;
          this.question = _.cloneDeep(this.QuestionnaireTemplate.template.topic[index]);
        });

        this.$watch('question.type', y => {
          this.showAnswer = this.question.type === '单选' || this.question.type === '多选';
          this.allowAddReasonDisable = this.question.type !== '单选';
        })
      },
      addAnswer() {
        this.question.options.push(_.cloneDeep(this.answerTemplate));
      },
      removeAnswer(index) {
        this.question.options.splice(index, 1);
      },
      save() {
        if(this.question.type === '打分' || this.question.type === '问答') {
          this.question = _.omit(this.question, 'options')
        }
        this.setAnswerList({question: this.question, index: this.selectedIndex});
        this.clear();
      },
      clear() {
        this.question = _.cloneDeep(this.questionTemplate);
        this.question.options.push(_.cloneDeep(this.answerTemplate));
        this.selectedIndex = -1;
      },
      remove() {
        this.unSetAnswerList({index: this.selectedIndex}).then(y => {
          this.clear()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          });
        });
      }
    },
    computed: {
      ...mapState({
        QuestionnaireTemplate: state => state.QuestionnaireTemplate
      }),
    },
    mounted() {
      this.init();
    }
  }
</script>

<style>

</style>
