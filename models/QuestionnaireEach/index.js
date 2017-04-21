var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var mObjectId = mongoose.Types.ObjectId;
var event    = require('../Shared/event.js');
var moment   = require('moment');

var QuestionnaireEach = {
  title: String,
  templateId: ObjectId,
  status: {type: Boolean, default: false},
  date: String,  // 首次提交
  operation: event,
  // url: String
}

QuestionnaireEach = new Schema(QuestionnaireEach, {versionKey: false, id: false});

QuestionnaireEach.set('validateBeforeSave', false);

/**
 * 中间件
 * */
QuestionnaireEach.pre('save', function(next){
  if(!this.date) this.date = moment().format('YYYY-MM-DD');
  next();
});

QuestionnaireEach.statics.retrieve = function(param, callback) {
  this.find()
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaires){
    if(error) return callback(error);
    callback(null, questionnaires);
  });
}

QuestionnaireEach.statics.retrieveById = function(param, callback) {
  this.findOne({_id: new mObjectId(param.id)})
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaire){
    if(error) return callback(error);
    callback(null, questionnaire);
  });
}

QuestionnaireEach.statics.retrieveByTemplateId = function(param, callback) {
  this.findOne({templateId: new mObjectId(param.templateId), status: true})
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaire){
    if(error) return callback(error);
    callback(null, questionnaire);
  });
}

QuestionnaireEach.statics.retrieveByTitle = function(param, callback) {
  this.findOne({title: param.title})
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaire){
    if(error) return callback(error);
    callback(null, questionnaire);
  });
}

module.exports = QuestionnaireEach;
