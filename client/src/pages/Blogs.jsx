import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Article } from '@mui/icons-material';

const Blogs = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Career Blogs
      </Typography>
      
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Article sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Career guidance blogs coming soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Read insights and tips from industry experts
        </Typography>
      </Box>
    </Container>
  );
};

export default Blogs;
