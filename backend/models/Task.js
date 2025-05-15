const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date },
  status: { type: String, default: 'À faire', enum: ['À faire', 'En cours', 'Terminé'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', TaskSchema);