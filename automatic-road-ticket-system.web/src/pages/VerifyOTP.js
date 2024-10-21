import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Button from '../components/Button';
import TextField from '../components/TextField';
import AlertMessage from '../components/AlertMessage';
import apiService from '../api/apiService';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const VerifyOTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!guidPattern.test(otp)) {
      setError('Invalid OTP format. Example: 123e4567-e89b-12d3-a456-426614174000');
      return;
    }

    try {
      await apiService.verifyOTP(email, otp);
      setSuccess(true);
      navigate('/login');
    } catch (error) {
      setError('OTP verification failed. Please try again.');
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
          Verify OTP
        </Typography>

        <Typography variant="h2" align="center" gutterBottom>
          Check Your Email
        </Typography>

        <AlertMessage message={error} severity="error" />
        
        <AlertMessage message={success && 'OTP verified successfully!'} severity="success" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="OTP"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button type="submit" fullWidth sx={{ mt: 3 }}>
            Verify OTP
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default VerifyOTP;
