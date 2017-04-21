var _ = require('lodash');

app.get('/questionnaire', function(req, res){
  var Questionnaire = app.models.Questionnaire;

  Questionnaire.retrieve({}, function(error, questionnaires){
    if(error) return res.json(500, error);
    res.json(questionnaires);
  });

});
