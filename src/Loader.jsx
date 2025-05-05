import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = ({ size = 40, color = 'primary' }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={4}>
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default Loader;