import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Assignment } from '@mui/icons-material';

const Applications = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        My Applications
      </Typography>
      
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No applications yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start applying to jobs to see your applications here
        </Typography>
      </Box>
    </Container>
  );
};

export default Applications;
