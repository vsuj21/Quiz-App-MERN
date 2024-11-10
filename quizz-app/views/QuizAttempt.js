import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizAttempt = ({ quizId, userId }) => {
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    // Fetch quiz data
    axios.get(`/quizzes/${quizId}`)
      .then(response => setQuiz(response.data))
      .catch(error => console.error("Error fetching quiz data:", error));
  }, [quizId]);

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setUserAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      const index = updatedAnswers.findIndex(answer => answer.questionId === questionId);
      if (index !== -1) {
        updatedAnswers[index].selectedAnswer = selectedAnswer;
      } else {
        updatedAnswers.push({ questionId, selectedAnswer });
      }
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    axios.post(`/attempt-quiz/${quizId}`, { userId, answers: userAnswers })
      .then(response => {
        alert(`Your score: ${response.data.score}`);
      })
      .catch(error => {
        console.error('Error submitting quiz:', error);
      });
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      {quiz.questions.map((question) => (
        <div key={question._id}>
          <p>{question.questionText}</p>
          {question.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                onChange={() => handleAnswerChange(question._id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuizAttempt;
