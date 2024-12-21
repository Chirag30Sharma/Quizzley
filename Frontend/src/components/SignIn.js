import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import QuizImage from './assets/logo.png';
import CapImage from './assets/graduationcap.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#fafafa',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'relative',
    width: '400px', // Reduce the width of the card
  },
  capImage: {
    position: 'absolute',
    top: '-200px', // Increase the top position
    left: '-125px', // Increase the left position
    width: '300px', // Increase the width of the cap image
    transform: 'rotate(-20deg)',
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3002/auth/login', {
        email,
        password,
      });

      console.log(response.data);

      if (response.status === 200) {
        setEmail(response.data.email);
        console.log('Login successful:', response.data);
        dispatch({ type: 'LOGIN', payload: email }); // Dispatch LOGIN action
        navigate('/'); // Redirect to the root path
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <img src={CapImage} alt="Graduation Cap" className={classes.capImage} />
        <img src={QuizImage} alt="Quizzley" style={{ width: '200px', marginBottom: '1rem' }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome back!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please login to your account.
        </Typography>
        <TextField
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          style={{ marginBottom: '0.5rem' }}
        >
          Log In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/signup')}
          fullWidth
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignIn;