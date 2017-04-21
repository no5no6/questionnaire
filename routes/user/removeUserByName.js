var _ = require("lodash");

app.delete('/user/:name', function(req, res){
  var User = app.models.User;
  var name = req.params.name

  User.retrieveByName(name, function(error, user){
    if(error) return res.json(500, error);
    if(!_.size(user)) return res.json(400, {type: 0, message: '删除用户不存在'});
    
    User.removeUser(name, function(error, result){
      if(error) return res.json(500, error);
      res.json(200);
    });
  });
});
