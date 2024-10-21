import React from 'react';
import { Alert } from '@mui/material';

const AlertMessage = ({ message, severity }) => {
  return message ? <Alert severity={severity}>{message}</Alert> : null;
};

export default AlertMessage;
