var _ = require("lodash");

app.post('/user/login', function(req, res){
  var User = app.models.User;
  var loginUser = req.body;

  console.log(loginUser, 'loginUser');

  User.retrieveLoginUser(loginUser, function(error, user){
    if(error) return res.json(500, error);
    // if(user) req.session.userName = user.userName;
    res.json(user);
  });
});
