import React from 'react';
import { Button as MUIButton } from '@mui/material';
import { motion } from 'framer-motion';

const Button = ({ children, ...props }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <MUIButton variant="contained" color="primary" {...props}>
        {children}
      </MUIButton>
    </motion.div>
  );
};

export default Button;
