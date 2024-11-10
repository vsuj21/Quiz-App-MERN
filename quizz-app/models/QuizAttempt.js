const mongoose = require('mongoose');

// QuizAttempt schema definition
const quizAttemptSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedAnswer: { type: String }
  }],
  score: { type: Number }
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
