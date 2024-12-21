import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box, TextField, Button, Typography, IconButton, InputAdornment, Select, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import QuizImage from './assets/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '600px',
    maxHeight: '100vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
  },
  inputRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  passwordInput: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '1rem',
  },
  selectLabel: {
    marginBottom: '0.5rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.54)',
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  },
  select: {
    textAlign: 'left',
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentClass, setCurrentClass] = useState('');
  const [school, setSchool] = useState('');
  const [board, setBoard] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3002/auth/register', {
        name: `${firstName} ${lastName}`,
        email,
        password,
        current_class: currentClass,
        school,
        board,
      });

      console.log(response.data);
      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        navigate('/signin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <img src={QuizImage} alt="StartQuiz" style={{ width: '200px', marginBottom: '1rem' }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please create your account.
        </Typography>
        <Box className={classes.inputRow}>
          <TextField
            type="text"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            type="text"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
        </Box>
        <TextField
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box className={classes.passwordInput}>
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
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
        </Box>
        <Box className={classes.passwordInput}>
          <TextField
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <label className={classes.selectLabel}>Current Class</label>
        <Select
          className={classes.select}
          value={currentClass}
          onChange={(e) => setCurrentClass(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="">Select Current Class</MenuItem>
          <MenuItem value="9">9</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="11">11</MenuItem>
          <MenuItem value="12">12</MenuItem>
        </Select>
        <TextField
          label="School Name"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          fullWidth
          margin="normal"
        />
        <label className={classes.selectLabel}>Board</label>
        <Select
          className={classes.select}
          value={board}
          onChange={(e) => setBoard(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="">Select Board</MenuItem>
          <MenuItem value="CBSE">CBSE</MenuItem>
          <MenuItem value="ICSE">ICSE</MenuItem>
          <MenuItem value="IB">IB</MenuItem>
          <MenuItem value="State Board">State Board</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUp;