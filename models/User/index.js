var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var event    = require('../Shared/event.js');

/***
 * 静态数据
 */
var STATIC_DEPARTMETS = ['技术开发部', '产品部', '市场部', '销售部', '运营部', '商务拓展部', '项目管理部', '终端商务拓展部', '人事行政部', '财务部', '大数据研究部', '总裁办'];
var STATIC_LUNCH_GROUP = ['A', 'B', 'C'];
var STATIC_ROLES = ['审核人', '用户', '管理员', '财务', '无审核人'];
var STATIC_AUDITORS = ['陈军', '张斓', '李树群', '陈晓梅', '杨德宝', '王斌', '张猛', '陆承恩', '张偶', '周敬', '李静楠', '冯锴', '胡芳', '高蔚', '吕海媛'];

/***
 * 模型
 */
var userSchema = {
  uid: String,
  name: String,
  department: String,
  lunchGroup: String,
  auditor: String,
  role: {type: String, default: '用户'},
  operation: event
}

userSchema = new Schema(userSchema, {versionKey: false, id: false});

userSchema.set('validateBeforeSave', false);
userSchema.index({uid: 1});

/***
 * 中间件
 */
userSchema.pre('save', function(next, done){
  if(!this.uid){
    var _this = this;
    app.models.Seq.retrieveBarcode('User', function(err, uid){
      _this.uid = uid;
      _this.save();
      done();
    });
  }
  next();
});

/***
 * 静态方法
 */
userSchema.statics.retrieve = function(callback, items){
  this.find()
  .select(items ? items.join(' ') : '')
  .exec(function(error, users){
    if(error) return callback(error);
    callback(null, users);
  });
}

userSchema.statics.retrieveById = function(uid, callback, items){
  this.findOne({uid: uid})
  .select(items ? items.join(' ') : '')
  .exec(function(error, user){
    if(error) return callback(error);
    callback(null, user);
  });
}
userSchema.statics.retrieveByObjectId = function(id, callback, items){
  this.findOne({_id: id})
  .select(items ? items.join(' ') : '')
  .exec(function(error, user){
    if(error) return callback(error);
    callback(null, user);
  });
}

userSchema.statics.retrieveByName = function(name, callback, items){
  this.findOne({name: name})
  .select(items ? items.join(' ') : '')
  .exec(function(error, user){
    if(error) return callback(error);
    callback(null, user);
  });
}

userSchema.statics.retrieveByRole = function(role, callback, items){
  this.find({role: role})
  .select(items ? items.join(' ') : '')
  .exec(function(error, users){
    if(error) return callback(error);
    callback(null, users);
  });
}

userSchema.statics.retrieveConfig = function(callback){
  var config = {
    departments: STATIC_DEPARTMETS,
    roles: STATIC_ROLES,
    group: STATIC_LUNCH_GROUP,
    auditors: STATIC_AUDITORS
  }
  callback(null, config);
}

userSchema.statics.removeUser = function(name, callback){
  this.remove({name: name})
  .exec(function(error, result){
    if(error) return callback(error);
    callback(null, result);
  });
}

module.exports = userSchema;
