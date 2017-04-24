var _ = require('lodash');

app.get('/questionnaireTemplate/:id', function(req, res){
  var QuestionnaireTemplate = app.models.QuestionnaireTemplate;
  var id = req.params.id;

  QuestionnaireTemplate.retrieveById({id}, function(error, questionnaire){
    if(error) return res.json(500, error);
    res.json(questionnaire);
  });

});
