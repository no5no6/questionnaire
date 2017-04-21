var _ = require('lodash');

app.get('/questionnaireTemplates', function(req, res){
  var QuestionnaireTemplate = app.models.QuestionnaireTemplate;

  QuestionnaireTemplate.retrieve({}, function(error, questionnaires){
    if(error) return res.json(500, error);
    res.json(questionnaires);
  });

});
