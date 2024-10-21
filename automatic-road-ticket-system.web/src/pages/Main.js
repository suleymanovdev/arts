import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Main = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <img
              src="/logo512.png"
              alt="Logo"
              style={{ width: '150px', height: '150px' }}
            />
          </Box>

          <Typography variant="h2" gutterBottom>
            Welcome to the Automatic Road Ticket System
          </Typography>
          <Typography variant="body1" gutterBottom>
            Experience easy and efficient road ticket management.
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button component={Link} to="/signup">
              Get Started
            </Button>
            <Button component={Link} to="/login">
              Login
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Main;
