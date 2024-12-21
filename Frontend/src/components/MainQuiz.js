import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Button, Container, Radio, FormControlLabel, FormControl, FormLabel, Paper } from '@mui/material';
import { styled } from '@mui/system';
import SwipeableViews from 'react-swipeable-views';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { RadioGroup } from '@mui/material';

const PinkBackground = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 192, 203, 0.7)',
  padding: theme.spacing(2),
  margin: 'auto',
  marginTop: theme.spacing(2),
}));

const MainQuiz = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const quizData = location.state;

  const { title, questions, options, correct_answer } = quizData;

  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [activeStep, setActiveStep] = useState(0);

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === correct_answer[i]) {
        score++;
      }
    }
    return score;
  };
  const score = calculateScore();

    const sendQuizData = async () => {
      try {
        const payload = {
          "email": user,
          "title": title,
          "questions": questions,
          "options": options,
          "correct_answer": correct_answer,
        };

        const response = await axios.post('http://127.0.0.1:5000/files/database', payload);

        if (response.status === 200) {
          // alert(response.data);
          const { _id } = response.data;
          // Send user data after successful quiz data submission
          const userPayload = {
            "email": user,
            "quiz_id": _id,
            "correct_answer": correct_answer,
            "score": score,
          };

          const userResponse = await axios.post('http://127.0.0.1:5000/files/userschema', userPayload);

          if (userResponse.status === 200) {
            console.log('User data API response:', userResponse.data);
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[activeStep] = options[activeStep][optionIndex];
    setUserAnswers(newAnswers);
    handleNext();
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <PinkBackground elevation={3}>
          <Typography variant="h4" align="center" sx={{ marginBottom: '1rem' }}>{title}</Typography>
          <SwipeableViews
            axis="x"
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {questions.map((question, index) => (
              <div key={index}>
                <FormControl component="fieldset" sx={{ marginTop: '1rem' }}>
                  <FormLabel component="legend">
                    <Typography variant="h6">{question}</Typography>
                  </FormLabel>
                  <RadioGroup
                    aria-label={`question-${index}`}
                    value={userAnswers[index]}
                    onChange={(e) => handleAnswerSelect(options[index].indexOf(e.target.value))}
                  >
                    {options[index].map((option, optionIndex) => (
                      <FormControlLabel key={optionIndex} value={option} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            ))}
          </SwipeableViews>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ marginRight: '1rem' }}>Back</Button>
          )}
          {activeStep !== questions.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
          ) : (
            <Button variant="contained" color="primary" onClick={() => {
              const score = calculateScore();
              alert(`Your score is: ${score}`);
              sendQuizData();
            }}>Submit Answers</Button>
          )}
        </PinkBackground>
      </Container>
    </div>
  );
};

export default MainQuiz;