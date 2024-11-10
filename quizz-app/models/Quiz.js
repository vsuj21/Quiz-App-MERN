const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: String, required: true },  // Simple string for creator's name
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]  // Reference to Question model
});

module.exports = mongoose.model('Quiz', quizSchema);
