var _      = require('lodash');
var moment = require('moment');

app.post('/questionnaire', function(req, res){
  var Questionnaire = app.models.Questionnaire;
  var data = req.body;
  console.log(data, 'ddddd');
  Questionnaire.retrieveByUserName({questionnaireId: data.questionnaireId, userName: data.userName}, function(error, checkData){
    console.log(checkData, 'cccccc')
    if(_.size(checkData)) return res.json(400, {type: 0, message: '您已经填写完问卷'});
    // 不用审批的用户自动审批
    console.log(data, 'addQuestionnaire');

    var questionnaire = new Questionnaire(data);
    questionnaire.save(function(error, model){
      if(error){
        res.json(500, error);
      }else{
        res.json(200);
      }
    });
  });
});
