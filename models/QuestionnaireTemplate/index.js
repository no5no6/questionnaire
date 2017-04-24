var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var mObjectId = mongoose.Types.ObjectId;
var event    = require('../Shared/event.js');

var optionSchema = {
  name: String,
  content: String,
  allowAddReasonStatus: {type: Boolean, default: false} // 某一项选择中是否可以用户选择后添加文字说明
}

var gradeSchema = {
  step: Number,
  begin: Number,
  end: Number,
  type: String
}

gradeSchema = new Schema(gradeSchema, {versionKey: false, id: false});

var topicSchema = {
  number: Number,
  question: String,
  options: [optionSchema],
  type: {type: String, default: '单选', enum: ['单选', '多选', '问答', '打分']},
  // allowAddGrade: {type: Boolean, default: false}, // 是否添加打分
  grade: gradeSchema,
  must: {type: Boolean, default: true}, // 是否必填项
}

topicSchema = new Schema(topicSchema, {versionKey: false, id: false});

var questionnaireTemplateSchema = {
  title: String,
  status: {type: Boolean, default: true},
  topic: [topicSchema],
  date: String,
  operation: event,
}

questionnaireTemplateSchema = new Schema(questionnaireTemplateSchema, { versionKey: false });

questionnaireTemplateSchema.set('validateBeforeSave', false);


questionnaireTemplateSchema.statics.retrieve = function(param, callback) {
  this.find({status: true})
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaires){
    if(error) return callback(error);
    callback(null, questionnaires);
  });
}

questionnaireTemplateSchema.statics.retrieveById = function(param, callback) {
  this.findOne({_id: new mObjectId(param.id)})
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaire){
    if(error) return callback(error);
    callback(null, questionnaire);
  });
}

questionnaireTemplateSchema.statics.retrieveByTitle = function(param, callback) {
  this.findOne({title: param.title, status: true})
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaire){
    if(error) return callback(error);
    callback(null, questionnaire);
  });
}

module.exports = questionnaireTemplateSchema;
