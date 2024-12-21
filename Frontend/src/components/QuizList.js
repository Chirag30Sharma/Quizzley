import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const QuizList = () => {
  const location = useLocation();
  const topic = location.topic; // Access topic from location state
  const [quizzes, setQuizzes] = useState([]);
  const user = useSelector(state => state.user); // Access user from Redux state
  const [grade, setGrade] = useState(""); // Corrected typo in variable name

  useEffect(() => {
    const getStandard = async () => {
      try {
        const response = await axios.post('http://localhost:3002/user/getStandard', { email: user}); // Pass user email instead of user object
        console.log(response);
        if (response.data.success) {
          const { currentClass } = response.data; // Destructure currentClass from response
          setGrade(currentClass); // Update grade state
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching standard:', error.message);
      }
    };

    getStandard(); // Call getStandard function
  }, [user]); // Add user.email to dependency array

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/quizzes', {
          "topic": String(topic),
          "class": grade
        });
        if (response.data.success) {
          console.log(response.data);
          setQuizzes(response.data.quizzes);
        } else {
          throw new Error('Failed to fetch quizzes');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuizzes();
  }, [topic, grade]); // Add grade to dependency array

  return (
    <div>
      <h1>Quiz List</h1>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>{quiz.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
