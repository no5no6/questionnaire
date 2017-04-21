import _ from 'lodash';
import Vue from 'vue';
import bus from '../utils/bus';
import axios from 'axios';

const state = {
  templateId: '',
  template: {
    title: '',
    topic: []
  }, // 新增模板
  list: [], // 调查问卷设置问题列表
  question: {},  // 设置问卷页面左侧显示的问题
}

const mutations = {
  getQuestionnaireTemplateList (state, data) {
    state.list = data;
  },
  setAnswerList(state, data) {
    state.template.topic.push(_.cloneDeep(data));
  },
  unSetAnswerList(state, {index}) {
    state.template.topic.splice(index, 1);
  },
  setQuestionnaireTitle(state, {title}) {
    state.template.title = title;
  },
  setQuestionnaireTemplateById(state, data) {
    state.template = data;
  },
  removeTemplateById(state, {index}) {
    state.list = state.list.splice(index, 1);
  }

}
//http://localhost:3000/questionnaireTemplets
const actions = {
  getQuestionnaireTemplateList({commit, state}) {
    return new Promise((resolve, reject) => {
      axios.get(`${bus.host}/questionnaireTemplates`)
        .then(function ({data}) {
          commit('getQuestionnaireTemplateList', data);
        })
        .catch(function (error) {
          console.log(error, 'questionnaireTemplet');
        });
    });
  },
  getQuestionnaireTemplateById({commit, state}, param) {
    return new Promise((resolve, reject) => {
      axios.get(`${bus.host}/questionnaireTemplate/${param.id}`)
        .then(function ({data}) {
          commit('setQuestionnaireTemplateById', data);
          resolve(data);
        })
        .catch(function (error) {
          console.log(error, 'questionnaireTemplet');
        });
    });
  },
  setAnswerList({commit, state}, data) {
    commit('setAnswerList', data);
  },
  unSetAnswerList({commit, state}, data) {
    return new Promise((resolve, reject) => {
      if(state.templateId) {

      }else {
        commit('unSetAnswerList', data);
        resolve();
      }
    });
  },
  setQuestionnaireTitle({commit, state}, data) {
    commit('setQuestionnaireTitle', data);
  },
  saveQuestionnaireTemplate() {
    return new Promise((resolve, reject) => {
      if(state.templateId) {

      }else {
        axios.post(`${bus.host}/questionnaireTemplate`, state.template)
          .then(function ({data}) {
            //commit('getQuestionnaireTemplateById', data);
            resolve(null, data);
          })
          .catch(function (error) {
            resolve(error);
          });
      }
    });
  },
  removeTemplateById({commit, state}, {templateId, index}) {
    return new Promise((resolve, reject) => {

      axios.patch(`${bus.host}/questionnaireTemplate/${templateId}/remove`)
        .then(function ({data}) {
          commit('removeTemplateById', {index});
          resolve(null, data);
        })
        .catch(function (error) {
          resolve(error);
        });

    });
  }
}

const getters = {
  // getRangeTime (state){
  //   return {
  //     begin: utils.getFormatTimeByArr(state.beginDotTime),
  //     end: utils.getFormatTimeByArr(state.endDotTime)
  //   }
  // }
}

export default {
  state,
  actions,
  getters,
  mutations
}
