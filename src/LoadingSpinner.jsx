import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = () => (
  <Box 
    display="flex" 
    flexDirection="column" 
    alignItems="center" 
    justifyContent="center" 
    minHeight="80vh"
  >
    <CircularProgress size={60} />
    <Typography variant="h6" mt={2}>Loading...</Typography>
  </Box>
);

export default LoadingSpinner;