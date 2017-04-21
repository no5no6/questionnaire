/**
 * 主服务
 */
var express = require('express');
var http    = require('http');
var path    = require('path');
var app     = express();
var models  = require("./models");
var event   = require('./models/Shared/event.js');
var host    = 'localhost';

// express对象赋给全局
global.app  = app;

// express设置
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// 解决跨域
var origin = [/\/user/, /\/user\/*/, /\/statistics/, /\/statistics\/*/, /\/questionnaire/, /\/questionnaire\/*/, /\/questionnaireTemplate/, /\/questionnaireTemplate\/*/, /\/questionnaireEach/, /\/questionnaireEach\/*/];

app.all('*', function(req, res, next){
  console.log(req.path, 'req.path')
  var istrue = origin.some(function(url){
    return url.test(req.path);
  });

  if(istrue){
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS,PATCH');
    res.header('X-Powered-By',' 3.2.1')
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
      return res.send(200);
    }
  }
  next();
});

// 根据请求域名得到Mongoose模型。
models(host, function(err, models){
  if(err) return res.send(400,err.stack);
  app.models = models;
  app.event = event
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 引入api
require('./routes/user/addUser');
require('./routes/user/retrieveConfig');
require('./routes/user/retrieveUserByName');
require('./routes/user/retrieveUserById');
require('./routes/user/retrieveUsersGroup');
require('./routes/user/removeUserByName');

require('./routes/statistics/questionnaireResult');

require('./routes/questionnaire/retrieveQuestionnaires');
require('./routes/questionnaire/addQuestionnaire');
require('./routes/questionnaire/retrieveQuestionnaireById');
require('./routes/questionnaire/retrieveQuestionnaireFinishedByUserName');

require('./routes/questionnaireTemplate/retrieveQuestionnaireTemplates');
require('./routes/questionnaireTemplate/addQuestionnaireTemplate');
require('./routes/questionnaireTemplate/retrieveQuestionnaireTemplateById');
require('./routes/questionnaireTemplate/updateQuestionnaireTemplate');
require('./routes/questionnaireTemplate/updateQuestionnaireTemplateStatus');

require('./routes/questionnaireEach/retrieveQuestionnaireEachs');
require('./routes/questionnaireEach/addQuestionnaireEach');
require('./routes/questionnaireEach/retrieveQuestionnaireEachById');
require('./routes/questionnaireEach/updateQuestionnaireEachStatus');
require('./routes/questionnaireEach/retrieveQuestionnaireEachOpen');


// 首页
app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
