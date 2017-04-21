var _      = require('lodash');
var moment = require('moment');

app.post('/questionnaireTemplate', function(req, res){
  var QuestionnaireTemplate = app.models.QuestionnaireTemplate;
  var data = req.body;

  QuestionnaireTemplate.retrieveByTitle({title: data.title}, function(error, checkData){
    if(_.size(checkData)) return res.json(400, {type: 0, message: '该用问卷已存在，请不要重复添加'});
    console.log(data.topic, 'data.topic');
    // 添加题号
    data.topic.forEach(function(item, index){
      _.assignIn(item, {number: index+1});
      //
      // if(item.options){
      //   item.options.forEach(function(option, opIdx){
      //     _.assignIn(option, {number: opIdx+1});
      //   });
      // }
    });

    var questionnaireTemplate = new QuestionnaireTemplate(data);

    questionnaireTemplate.save(function(error, model){
      if(error){
        res.json(500, error);
      }else{
        res.json(200);
      }
    });
  });
});
