var _      = require('lodash');
var moment = require('moment');

app.patch('/questionnaireTemplate/:id/remove', function(req, res){
  var QuestionnaireTemplate = app.models.QuestionnaireTemplate;
  var id = req.params.id

  QuestionnaireTemplate.retrieveById({id: id}, function(error, questionnaireTemplate){
    if(error) return res.json(500, error);
    if(!_.size(questionnaireTemplate)) return res.json(400, {type: 0, message: '未找到更新的问卷，请刷新后再操作'});

    questionnaireTemplate.status = false;

    questionnaireTemplate.save(function(error, model){
      if(error){
        res.json(500, error);
      }else{
        res.json(200);
      }
    });

  });
});
