app.get('/user/config', function(req, res){
  var user = app.models.User;
  
  user.retrieveConfig(function(error, config){
    if(error) return res.json(500, error);
    res.json(config);
  });
});
