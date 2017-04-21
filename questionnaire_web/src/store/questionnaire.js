import _ from 'lodash';
import Vue from 'vue';
import bus from '../utils/bus';
import axios from 'axios';

const state = {
  template: [], // 调差问卷设置问题列表
  list: [], // 所有答案
  choiceQuestion: [], // 单选多选
  essayQuestion: [], // 问答题
  grade: [], // 评分题
}

const mutations = {
  setTemplate (state, data) {
    state.template = data;
  },
  setQuestionnaireList (state, data) {
    state.list = data;
  }

}

const actions = {
  setTemplate ({commit, state}, data) {
    commit('setTemplate', data);
  },
  saveQuestionnaire ({commit, state}, param) {
    return new Promise((resolve, reject) => {
      axios.post(`${bus.host}/questionnaire`, param)
        .then(function ({data}) {
          commit('getQuestionnaireEachList', data);
          resolve();
        })
        .catch(function (error) {
          resolve(error);
        });
    });
  },
  getUserInfoById ({commit, state}, param) {
    return new Promise((resolve, reject) => {
      axios.get(`${bus.host}/user/${param.uid}/info`)
        .then(function ({data}) {
          resolve(data);
        })
        .catch(function (error) {
          resolve();
        });
    });
  },
  authUserFinishedQuestionnaire({commit, state}, {id, userName}) {
    return new Promise((resolve, reject) => {
      axios.get(`${bus.host}/questionnaire/${id}/user/finished?userName=${userName}`)
        .then(function ({data}) {
          resolve(data);
        })
        .catch(function (error) {
          resolve();
        });
    });
  },
  getQuestionnaireList({commit, state}, param) {

    return new Promise((resolve, reject) => {
      axios.get(`${bus.host}/questionnaire/${param.questionnaireId}/statistics`)
        .then(function ({data}) {
          resolve(data);
        })
        .catch(function (error) {
          resolve();
        });
    });
  },
  setQuestionnaireList({commit, state}, data) {
    commit('setQuestionnaireList', data);
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
