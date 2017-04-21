var _ = require('lodash');

app.get('/questionnaire/:questionnaireId/statistics', function(req, res){
  var Questionnaire = app.models.Questionnaire;
  var questionnaireId = req.params.questionnaireId;

  Questionnaire.retrieveByQuestionnaireId({questionnaireId}, function(error, questionnaires){
    if(error) return res.json(500, error);
    res.json(questionnaires);
  });

});
