const express = require('express');
const { getQuizzes, attemptQuiz } = require('../controllers/quizController');
const router = express.Router();

// Route to get all quizzes with questions populated
router.get('/quizzes', getQuizzes);

// Route to attempt a quiz
router.post('/attempt-quiz/:quizId', attemptQuiz);

module.exports = router;
