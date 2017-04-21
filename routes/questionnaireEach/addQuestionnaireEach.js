var _      = require('lodash');
var moment = require('moment');

app.post('/questionnaireEach', function(req, res){
  var QuestionnaireEach = app.models.QuestionnaireEach;
  var data = req.body;

  QuestionnaireEach.retrieveByTitle({title: data.title}, function(error, checkData){
    if(_.size(checkData)) return res.json(400, {type: 0, message: '该用问卷已存在，请不要重复添加'});

    var questionnaireEach = new QuestionnaireEach(data);

    questionnaireEach.save(function(error, model){
      if(error){
        res.json(500, error);
      }else{
        res.json(200);
      }
    });
  });
});
