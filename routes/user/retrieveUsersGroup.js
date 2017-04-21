var _ = require("lodash");

app.get('/users/group', function(req, res){
  var user = app.models.User;
 
  user.retrieve(function(error, users){
    if(error) return res.json(500, error);
    
    users = _
      .chain(users)
      .orderBy('lunchGroup')
      .groupBy('lunchGroup')
      .value();
    
    users = _.map(users, function(item, key){
      return {
        [key]: _.groupBy(item, 'department')
      };
    });

    res.json(users);
  });

});
