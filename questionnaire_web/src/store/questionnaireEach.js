import _ from 'lodash';
import Vue from 'vue';
import bus from '../utils/bus';
import axios from 'axios';

const state = {
  list: [], // 调差问卷设置问题列表
}

const mutations = {
  getQuestionnaireEachList (state, data) {
    state.list = data;
  },
}

const actions = {
  getQuestionnaireEachList({commit, state}) {
    return new Promise((resolve, reject) => {
      axios.get(`${bus.host}/questionnaireEachs`)
        .then(function ({data}) {
          commit('getQuestionnaireEachList', data);
        })
        .catch(function (error) {
          console.log(error, 'questionnaireEach');
        });
    });
  },
  getQuestionnaireEachById({commit, state}, param) {
    return new Promise((resolve, reject) => {
      axios.get(`${bus.host}/questionnaireEach/${param.id}`)
        .then(function ({data}) {
          console.log(data, 'data');
          resolve(data);
        })
        .catch(function (error) {
          resolve();
        });
    });
  },
  addQuestionnaire({commit, state}, param) {
    // 添加登录人信息
    _.assignIn(param, {operation: {userName: 'yuanyang'}});

    return new Promise((resolve, reject) => {
      axios.post(`${bus.host}/questionnaireEach`, param)
        .then(function ({data}) {
          resolve();
        })
        .catch(function (error) {
          console.log(error, 'questionnaire');
        });
    });
  },
  changeQuestionnaireEachStatus({commit, state}, param) {
    return new Promise((resolve, reject) => {
      axios.patch(`${bus.host}/questionnaireEach/${param.id}/status`, {status: param.status})
        .then(function ({data}) {
          resolve(data);
        })
        .catch(function (error) {
          resolve();
        });
    });
  }
}

const getters = {
  getRangeTime (state){
    return {
      begin: utils.getFormatTimeByArr(state.beginDotTime),
      end: utils.getFormatTimeByArr(state.endDotTime)
    }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
