'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: String,
  completed: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);
