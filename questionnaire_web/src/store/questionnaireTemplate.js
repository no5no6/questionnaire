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
  setAnswerList(state, {question, index}) {
    if(index === -1){
      state.template.topic.push(_.cloneDeep(question));
    }else {
      state.template.topic[index] = _.cloneDeep(question);
    }
  },
  unSetAnswerList(state, {index}) {
    state.template.topic.splice(index, 1);
  },
  setQuestionnaireTitle(state, {title}) {
    state.template.title = title;
  },
  clearAnswerList(state) {
    state.template.topic = [];
  },
  setQuestionnaireTemplateById(state, data) {
    state.template = data;
  },
  removeTemplateById(state, {index}) {
    state.list.splice(index, 1);
  },

}

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
      if(state.template._id) {

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
      if(state.template._id) {
        axios.put(`${bus.host}/questionnaireTemplate/${state.template._id}`, state.template)
          .then(function ({data}) {
            resolve(null, data);
          })
          .catch(function (error) {
            resolve(error);
          });
      }else {
        axios.post(`${bus.host}/questionnaireTemplate`, state.template)
          .then(function ({data}) {
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
  },
  clearTemplate({commit, state}) {
    commit('setQuestionnaireTitle', {title: ''});
    commit('clearAnswerList');
  }
}

const getters = {

}

export default {
  state,
  actions,
  getters,
  mutations
}
