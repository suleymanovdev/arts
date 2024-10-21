import React, { useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import Button from '../components/Button';
import TextField from '../components/TextField';
import AlertMessage from '../components/AlertMessage';
import apiService from '../api/apiService';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setValidationErrors({});

    const newValidationErrors = {};

    if (!formData.email) {
      newValidationErrors.email = 'Email is required.';
    }
    if (!formData.password) {
      newValidationErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newValidationErrors.password = 'Password must be at least 6 characters long.';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newValidationErrors.password = 'Password must contain at least one special character.';
    }

    if (Object.keys(newValidationErrors).length) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.login(formData);
      Cookies.set('jwtToken', response.jwtToken, { expires: 1 / 24 });
      Cookies.set('email', response.email, { expires: 1 / 24 });
      setSuccess(true);
      navigate('/profile');
    } catch (error) {
      setError(error || 'Login failed. Please check your email and password.');
    } finally {
      setLoading(false);
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
            LogIn
          </Typography>

          <AlertMessage message={error} severity="error" />
          <AlertMessage message={success && 'Login successful!'} severity="success" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
                disabled={loading}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!validationErrors.password}
                helperText={validationErrors.password}
                disabled={loading}
            />
            <Button type="submit" fullWidth sx={{ mt: 3 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'LogIn'}
            </Button>

            <Button variant="text" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/signup')}>
                Don't have an account? Sign Up
            </Button>
          </Box>
        </motion.div>
      </Container>
  );
};

export default LogIn;
