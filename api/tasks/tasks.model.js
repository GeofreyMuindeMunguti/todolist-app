const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const taskSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  user_id: { type: Schema.Types.ObjectId },
  task_text: String,
  done: { type: Boolean, default: false },
});

const Task = Model('Task', taskSchema);
module.exports = { Task : Task };