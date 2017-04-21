var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var seqSchema = {
  _id: String,
  seq: Number
}

seqSchema = new Schema(seqSchema, { versionKey: false });

seqSchema.statics.retrieveIdentity = function(type, cb) {
  this.findByIdAndUpdate(type, {$inc:{seq:1}}, {upsert: true}, function(err, data){
    if(err) return cb(err);
    cb(null, data.seq);
  })
}

seqSchema.statics.retrieveBarcode = function(type, cb) {
  var _this = this;
  this.retrieveIdentity(type, function(err, identity){
    if(err) return cb(err);
    cb(null, identity);
  });
}

module.exports = seqSchema;
