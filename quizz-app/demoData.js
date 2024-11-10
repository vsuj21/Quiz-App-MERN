const mongoose = require('mongoose');
require('dotenv').config();
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Step 1: Create demo questions
    const question1 = new Question({
      questionText: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    });

    const question2 = new Question({
      questionText: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 'Mars',
    });

    const question3 = new Question({
      questionText: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    });

    await question1.save();
    await question2.save();
    await question3.save();

    console.log('Demo questions saved!');

    // Step 2: Create demo quiz with questions
    const quiz = new Quiz({
      title: 'General Knowledge Quiz',
      description: 'A simple general knowledge quiz to test your knowledge!',
      creator: 'Admin',
      questions: [question1._id, question2._id, question3._id],  // Referencing the demo questions
    });

    await quiz.save();
    console.log('Demo quiz saved!');
    process.exit();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB or saving data:', error);
    process.exit(1);
  });
