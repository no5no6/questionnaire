var _ = require('lodash');

app.get('/questionnaireEachs', function(req, res){
  var QuestionnaireEach = app.models.QuestionnaireEach;

  QuestionnaireEach.retrieve({}, function(error, questionnaires){
    if(error) return res.json(500, error);
    res.json(questionnaires);
  });

});
