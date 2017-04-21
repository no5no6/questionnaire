var _ = require('lodash');

app.get('/questionnaireTemplate/:id', function(req, res){
  var QuestionnaireTemplate = app.models.QuestionnaireTemplate;
  var id = req.params.id;
  // var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
  //
  // if(!reg.test(date)) return res.json(400, {type:0, message: '日期格式错误'});

  QuestionnaireTemplate.retrieveById({id}, function(error, questionnaire){
    if(error) return res.json(500, error);
    res.json(questionnaire);
  });

});
