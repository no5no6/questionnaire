var _ = require('lodash');

app.get('/questionnaire/:id/user/finished', function(req, res){
  var Questionnaire = app.models.Questionnaire;
  var id = req.params.id;
  var userName = req.query.userName;

  Questionnaire.retrieveByUserName({questionnaireId: id, userName: userName}, function(error, data){
    if(error) {
      return res.json(500);
    }else {
      return res.json(200, data);
    }
  });
});
