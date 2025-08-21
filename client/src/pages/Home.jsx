import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Find Your Dream Job',
      description: 'Browse through thousands of job opportunities from top companies.',
      action: 'Browse Jobs',
      link: '/jobs',
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      title: 'Discover Companies',
      description: 'Explore company profiles and find the perfect workplace culture.',
      action: 'View Companies',
      link: '/companies',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'success.main' }} />,
      title: 'Career Growth',
      description: 'Get personalized career recommendations and growth paths.',
      action: 'Get Started',
      link: '/register',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 48, color: 'info.main' }} />,
      title: 'Learn & Develop',
      description: 'Access career guidance blogs and interview preparation resources.',
      action: 'Read Blogs',
      link: '/blogs',
    },
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 8,
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 3,
            }}
          >
            Your Career Journey Starts Here
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              textAlign: 'center',
              mb: 4,
              opacity: 0.9,
            }}
          >
            Connect with opportunities, grow your career, and achieve your professional goals
            with JobSpring's comprehensive career platform.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/jobs"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
                px: 4,
                py: 1.5,
              }}
            >
              Explore Jobs
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                px: 4,
                py: 1.5,
              }}
            >
              Join Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Everything You Need for Career Success
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button
                    component={Link}
                    to={feature.link}
                    variant="contained"
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    {feature.action}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <Box
          sx={{
            mt: 8,
            py: 6,
            backgroundColor: 'primary.main',
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: 'white', fontWeight: 600, mb: 4 }}
          >
            Join Thousands of Successful Professionals
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                10K+
              </Typography>
              <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
                Active Jobs
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                500+
              </Typography>
              <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
                Companies
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                50K+
              </Typography>
              <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
                Success Stories
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
