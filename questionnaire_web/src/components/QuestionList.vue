<template>
  <div>
    <el-row type="flex" justify="left" align="middle" class="markSetRow" >
      <el-col :offset="1">
        <el-row type="flex" justify="left" align="middle" class="questionListRow" v-for="(item,index) in QuestionnaireTemplate.template.topic" :key="index" >
          <el-col><el-button @click="selectedRow(index)" :type="selectRow === index ? 'primary' : 'gray'" class="questionListText" >问题{{index + 1}}({{item.type}})：{{item.question}}</el-button ></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import bus from '../utils/bus';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'QuestionList',
    data(){
      return {
        tagColor: 'gray',
        selectRow: -1,
      }
    },
    methods: {
      selectedRow(index) {
        this.selectRow=index;
        bus.$emit('setQuestion', index);
      }
    },
    computed: {
      ...mapState({
        QuestionnaireTemplate: state => state.QuestionnaireTemplate
      }),
    }
  }
</script>

<style>
  .questionListText {
    font-size: 16px;
  }
  .questionListRow {
    padding-bottom: 10px
  }
</style>
