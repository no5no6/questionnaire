var _ = require('lodash');

app.get('/questionnaireEachs', function(req, res){
  var QuestionnaireEach = app.models.QuestionnaireEach;
  var QuestionnaireTemplate = app.models.QuestionnaireTemplate;

  QuestionnaireEach.retrieve({}, function(error, questionnaires){
    if(error) return res.json(500, error);
    res.json(questionnaires);
    // async
    // QuestionnaireTemplate.retrieveById({id: questionnaires.templateId}, function(questionnairesTemplate){
    //   if(error) return res.json(500, error);
    //   _.assignIn(questionnaires, {templateTitle: questionnairesTemplate.title})
    //   console.log(questionnaires, 'questionnaires');
    //   res.json(questionnaires);
    // });
  });

});
