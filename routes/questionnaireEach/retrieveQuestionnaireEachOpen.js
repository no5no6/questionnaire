var _ = require('lodash');

// :id 为模板id
app.get('/questionnaireEach/:templateId/open', function(req, res){
  var QuestionnaireEach = app.models.QuestionnaireEach;
  var templateId = req.params.templateId;
  // var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
  //
  // if(!reg.test(date)) return res.json(400, {type:0, message: '日期格式错误'});

  QuestionnaireEach.retrieveByTemplateId({templateId}, function(error, questionnaire){
    if(error) return res.json(500, error);
    res.json(questionnaire);
  });

});
