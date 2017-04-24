var _      = require('lodash');
var moment = require('moment');

app.post('/questionnaire', function(req, res){
  var Questionnaire = app.models.Questionnaire;
  var data = req.body;

  Questionnaire.retrieveByUserName({questionnaireId: data.questionnaireId, userName: data.userName}, function(error, checkData){
    if(_.size(checkData)) return res.json(400, {type: 0, message: '您已经填写完问卷'});

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
