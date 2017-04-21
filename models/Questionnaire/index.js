var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var mObjectId = mongoose.Types.ObjectId;
var event    = require('../Shared/event.js');

var gradeSchema = {
  begin: Number,
  end: Number,
  type: String
}

gradeSchema = new Schema(gradeSchema, {versionKey: false, id: false});

// resultSchema = {
//   type: {type: String, default: '单选', enum: ['单选', '多选', '问答', '评分']},
//   selectContext:
//   selectId: [ObjectId],
// }

var answerSchema = {
  topicId: ObjectId, // 问题id
  // questionId: ObjectId,
  number: Number, // 题号
  question: String,    // 问题文字描述
  selectContent: String,
  selectMultipleContent: [String],
  selectId: ObjectId,
  selectMultipleId: [ObjectId],
  type: {type: String, default: '单选', enum: ['单选', '多选', '问答', '评分']},
  additional: String, // 附加文字补充
  grade: gradeSchema,
  optionSort: Array,
  must: {type: Boolean, default: true},
}

answerSchema = new Schema(answerSchema, {versionKey: false, id: false});

var questionnaireSchema = {
  templetId: ObjectId,
  questionnaireId: ObjectId,
  questionnaireTitle: String,
  userName: String,   // 回答者姓名
  department: String, // 部门
  status: {type: Boolean, default: true},
  answer: [answerSchema],
  date: String,  // 首次提交
  operation: event,
}

questionnaireSchema = new Schema(questionnaireSchema, {versionKey: false, id: false});

questionnaireSchema.set('validateBeforeSave', false);


questionnaireSchema.statics.retrieve = function(param, callback) {
  this.find()
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaires){
    if(error) return callback(error);
    callback(null, questionnaires);
  });
}

questionnaireSchema.statics.retrieveByUserName = function(param, callback) {
  this.findOne({questionnaireId: new mObjectId(param.questionnaireId), userName: param.userName})
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaire){
    if(error) return callback(error);
    callback(null, questionnaire);
  });
}

questionnaireSchema.statics.retrieveById = function(param, callback) {
  this.findOne({_id: new mObjectId(param.id)})
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaire){
    if(error) return callback(error);
    callback(null, questionnaire);
  });
}

questionnaireSchema.statics.retrieveByQuestionnaireId = function(param, callback) {
  this.aggregate([
    {
      $match: {
        'questionnaireId': new mObjectId(param.questionnaireId)
      }
    },
    {
      $unwind: '$answer'
    },
    {
      $project: {
        _id: 0,
        number: 1,
        userName: 1,
        department: 1,
        answer: 1
      }
    },
    {
      $group: {
        _id: '$answer.question',
        result: {
          '$push': {
            number: '$answer.number',
            userName: '$userName',
            department: '$department',
            selectContent: '$answer.selectContent',
            additional: '$answer.additional',
            optionSort: '$answer.optionSort',
            type: '$answer.type',
            selectMultipleContent: '$answer.selectMultipleContent',
            grade: '$answer.grade'
          }
        }
      }
    },
    {
      $sort: {'result.number': 1}
    }
  ], function(error, questionnaires){
    if(error) return callback(error);
    callback(null, questionnaires);
  });
}

questionnaireSchema.statics.retrieveByTitle = function(param, callback) {
  this.findOne({date: param.date})
  .select(param.items ? param.items.join(' ') : '')
  .exec(function(error, questionnaire){
    if(error) return callback(error);
    callback(null, questionnaire);
  });
}

module.exports = questionnaireSchema;
