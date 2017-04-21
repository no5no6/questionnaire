var _ = require("lodash");

app.put('/user/:name/:status', function(req, res){
  var User = app.models.User;
  var name = req.params.name
  var status = req.params.status;

  User.retrieveByName(name, function(error, user){
    if(error) return res.json(500, error);
    if(!_.size(user)) return res.json(400, {type: 0, message: '更新用户不存在'});

    user.status = status;
    user.save(function(error, model){
      if(error){
        res.json(500, error);
      }else{
        res.json(user);
      }
    });
  });
});
