const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuizAttempt = require('../models/QuizAttempt');

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found' });
    }
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
};

const attemptQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { userId, answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    answers.forEach((answer) => {
      const question = quiz.questions.find(q => q._id.toString() === answer.questionId.toString());
      if (question && question.correctAnswer === answer.selectedAnswer) {
        score++;
      }
    });

    const newAttempt = new QuizAttempt({
      userId,
      quizId,
      answers,
      score
    });

    await newAttempt.save();
    res.json({ message: 'Quiz attempted successfully', score });
  } catch (error) {
    console.error('Error attempting quiz:', error);
    res.status(500).json({ message: 'Error attempting quiz', error: error.message });
  }
};

module.exports = {
  getQuizzes,
  attemptQuiz
};
