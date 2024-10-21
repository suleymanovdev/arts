import React from 'react';
import { TextField as MUITextField } from '@mui/material';

const TextField = ({ label, name, value, onChange, type = 'text', ...props }) => {
  return (
    <MUITextField
      fullWidth
      label={label}
      name={name}
      variant="outlined"
      margin="normal"
      value={value}
      onChange={onChange}
      type={type}
      {...props}
    />
  );
};

export default TextField;
