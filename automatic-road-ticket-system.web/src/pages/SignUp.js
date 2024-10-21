import React, { useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import Button from '../components/Button';
import TextField from '../components/TextField';
import AlertMessage from '../components/AlertMessage';
import apiService from '../api/apiService';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    const { name, surname, email, password, confirmPassword } = formData;

    if (!name) errors.name = ["Name is required"];
    if (!surname) errors.surname = ["Surname is required"];
    if (!email) errors.email = ["Email is required"];
    if (!password) errors.password = ["Password is required"];
    if (!confirmPassword) errors.confirmPassword = ["Confirm Password is required"];

    if (password && password.length < 6) {
      errors.password = errors.password || [];
      errors.password.push("Password must be at least 6 characters long");
    }

    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (password && !specialCharacterPattern.test(password)) {
      errors.password = errors.password || [];
      errors.password.push("Password must contain at least one special character");
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = ["Passwords don't match!"];
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setValidationErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await apiService.register(formData);
      setSuccess(true);
      navigate(`/verify-otp/${formData.email}`);
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setValidationErrors(error.response.data.errors);
        } else {
          setError(error.response.data || 'Registration failed. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <img
                src="/logo512.png"
                alt="Logo"
                style={{ width: '150px', height: '150px' }}
            />
          </Box>

          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>

          <AlertMessage message={error} severity="error" />
          <AlertMessage message={success && 'Registration successful! Please verify your email.'} severity="success" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!validationErrors.name}
                helperText={validationErrors.name && validationErrors.name[0]}
            />
            <TextField
                label="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                error={!!validationErrors.surname}
                helperText={validationErrors.surname && validationErrors.surname[0]}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!validationErrors.email}
                helperText={validationErrors.email && validationErrors.email[0]}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!validationErrors.password}
                helperText={validationErrors.password && validationErrors.password.join(', ')}
            />
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!validationErrors.confirmPassword}
                helperText={validationErrors.confirmPassword && validationErrors.confirmPassword[0]}
            />

            {isLoading ? (
                <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                  <CircularProgress />
                </Box>
            ) : (
                <Button type="submit" fullWidth sx={{ mt: 3 }}>
                  Register
                </Button>
            )}

            <Button variant="text" fullWidth onClick={() => navigate('/login')} sx={{ mt: 1 }}>
              Already have an account? Login
            </Button>
          </Box>
        </motion.div>
      </Container>
  );
};

export default SignUp;
