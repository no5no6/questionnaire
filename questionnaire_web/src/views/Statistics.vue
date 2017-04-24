<template>
  <div>
    <el-row type="flex" justify="center" align="middle" >
      <h1>{{title}}</h1>
    </el-row>
    <el-row type="flex" justify="left" align="middle" v-for="(item, index) in Questionnaire.list" :key="item._id">
      <el-col>
        <el-row type="flex" justify="left" align="middle">{{`${index + 1}、${item._id}`}}</el-row>
        <el-row class="questionRow" type="flex" justify="left" align="middle" >
          <el-col >
            <el-row class="answerRow" v-if="item.result[0].type === '单选' || item.result[0].type === '多选'">
              <el-row justify="left" align="middle" class="answerRow" v-for="(optionName, index) in item.result[0].optionSort" :key="index">
                <el-col :span="5">
                  <el-tag type="gray">{{optionName}}</el-tag>
                </el-col>
                <el-col :span="4" >
                  <span >
                    <span>{{(item.countSelect[optionName] || 0) / item.personSum * 100}}</span>
                    <span>%({{(item.countSelect[optionName] || 0)}}票)</span>
                  </span>
                </el-col>
              </el-row>
              <el-row class="additionalRow" >
                <el-tag class="additionalTag" type="primary" v-for="(item, index) in item.additionalArr" :key="index">
                  {{item.additional}}
                </el-tag>
              </el-row>
            </el-row>
            <el-row class="answerRow" v-if="item.result[0].type === '问答'">
              <el-row class="answerRow" v-for="(item, index) in item.answerArr" :key="index">
                <el-tag type="primary">
                  {{item.additional}}
                </el-tag>
              </el-row>
            </el-row>
            <el-row class="answerRow" v-if="item.result[0].type === '打分'">
              <el-row justify="left" align="middle" class="answerRow">
                <el-col :span="2">
                  <el-tag type="gray">本月平均分：</el-tag>
                </el-col>
                <el-col :span="4" >
                  <span >{{item.scroe / item.personSum }}</span>
                </el-col>
              </el-row>
              <el-row class="additionalRow" >
                <el-tag class="additionalTag" type="primary" v-for="(item, index) in item.result" :key="index">
                  {{item.selectContent}}分
                </el-tag>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Statistics',
    data(){
      return {
        title: '',
      }
    },
    methods: {
      ...mapActions(['getQuestionnaireList', 'setQuestionnaireList']),
      init() {
        this.title = this.$route.query.questionnaireName + '问卷数据统计';
        this.getQuestionnaireList({questionnaireId: this.$route.query.questionnaireId}).then((questionnaireList) => {
          questionnaireList = this.putCheckboxData(questionnaireList);
          questionnaireList = this.countResult(questionnaireList);
          this.setQuestionnaireList(questionnaireList)
        });
      },
      putCheckboxData (questionnaireList) {
        return questionnaireList.map((question) => {
          if(question.result[0].type === '多选') {
            question.result = question.result.reduce((memo, item) => {
              if(item.selectMultipleContent.length === 0) {
                _.assignIn(item, {selectContent: '无'});
                memo.push(item);
              }else if(item.selectMultipleContent.length > 1){
                item.selectMultipleContent.forEach((answer) => {
                  let obj = _.cloneDeep(item)
                  _.assignIn(obj, {selectContent: answer});
                  memo.push(obj);
                });
              }else {
                _.assignIn(item, {selectContent: item.selectMultipleContent[0]})
                memo.push(item);
              }
              return memo;
            }, [])
          }
          return question;
        });
      },
      countResult(questionnaireList) {
        return questionnaireList.map((question) => {

          if(question.result[0].type === '单选' || question.result[0].type === '多选') {
            let countSelect = _.countBy(question.result, 'selectContent');
            // _.assignIn(question, {countSelect});

            let additionalArr = question.result.reduce((memo, answer) => {
              if(answer.additional){
                memo.push({userName: answer.userName, additional: answer.additional})
              }
              return memo;
            }, []);

            _.assignIn(question, {additionalArr, countSelect, personSum: question.result.length});

          }else if(question.result[0].type === '问答'){
            let answerArr = question.result.reduce((memo, answer) => {
              if(answer.selectContent){
                memo.push({userName: answer.userName, additional: answer.selectContent})
              }
              return memo;
            }, []);

            _.assignIn(question, {answerArr});
          }else if (question.result[0].type === '打分'){
            let scroe = question.result.reduce((memo, answer) => {
              if(answer.selectContent){
                memo += parseInt(answer.selectContent);
              }
              return memo;
            }, 0);

            _.assignIn(question, {scroe, personSum: question.result.length, hightest: 10});
          }

          return question;
        });
      }
    },
    components: {

    },
    computed: {
      ...mapState({
        Questionnaire: state => state.Questionnaire,
      }),
    },
    mounted() {
      this.init();
    }
  }
</script>

<style>
  .additionalRow {
    padding-top: 20px;
  }
  .additionalTag {
    margin-left: 20px;
  }
</style>
