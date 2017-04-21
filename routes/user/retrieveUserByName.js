var _ = require("lodash");

app.get('/user/:name', function(req, res){
  var user = app.models.User;
  var name = req.params.name;
  console.log(name, 'name');
  user.retrieveByName(name, function(error, user){
    if(error) return res.json(500, error);
    res.json(user);
  });
});
