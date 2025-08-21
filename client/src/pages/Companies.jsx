import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Business } from '@mui/icons-material';

const Companies = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Companies
      </Typography>
      
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Business sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Companies directory coming soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discover top companies and their opportunities
        </Typography>
      </Box>
    </Container>
  );
};

export default Companies;
