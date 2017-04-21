var _      = require('lodash');
var moment = require('moment');

app.patch('/questionnaireEach/:id/status', function(req, res){
  var QuestionnaireEach = app.models.QuestionnaireEach;
  // var QuestionnaireTemplate = app.models.QuestionnaireTemplate;
  var status = req.body.status;
  var id = req.params.id

  var saveModel = function(questionnaireEach) {
    questionnaireEach.status = status;

    questionnaireEach.save(function(error, model){
      if(error){
        res.json(500, error);
      }else{
        res.json(200);
      }
    });
  }

  QuestionnaireEach.retrieveById({id: id}, function(error, questionnaireEach){
    if(error) return res.json(500, error);
    if(!_.size(questionnaireEach)) return res.json(400, {type: 0, message: '未找到更新的问卷，请刷新后再操作'});

    if(status) {
      // 如果是打开问卷，需查看同一模板是否还有未关闭的问卷
      QuestionnaireEach.retrieveByTemplateId({templateId: questionnaireEach.templateId}, function(error, openQuestionnaireEach){
        if(error) return res.json(500, error);
        if(_.size(openQuestionnaireEach)) return res.json(400, {type: 0, message: '开启新问卷前，请关闭同一模板下的其他问卷。'});
        saveModel(questionnaireEach);
      });
    }else {
      saveModel(questionnaireEach);
    }
  });
});
