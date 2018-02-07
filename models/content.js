var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
  title: {
  	type: String,
  	required:true
  },
  link: {
  	type: String,
  	required:true
  },
 
});

var Content = mongoose.model("Content", ContentSchema);
module.exports = Content;