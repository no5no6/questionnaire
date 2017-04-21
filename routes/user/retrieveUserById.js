var _ = require("lodash");

app.get('/user/:id/info', function(req, res){
  var user = app.models.User;
  var id = req.params.id;

  user.retrieveByObjectId(id, function(error, user){
    if(error) return res.json(500, error);
    res.json(user);
  });
});
