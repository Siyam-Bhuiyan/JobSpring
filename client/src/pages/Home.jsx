import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  ArrowForward as ArrowIcon,
} from "@mui/icons-material";

const Home = () => {
  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 32, color: "#000" }} />,
      title: "Find Jobs That Matter",
      description: "Real opportunities from companies that actually care about their people."
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 32, color: "#000" }} />,
      title: "Company Deep Dives",
      description: "Get the inside scoop on workplace culture before you apply."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32, color: "#000" }} />,
      title: "Career Guidance",
      description: "Personalized advice that doesn't sound like it came from a robot."
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 32, color: "#000" }} />,
      title: "Interview Prep",
      description: "Practice with real questions from actual interviews."
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          py: { xs: 6, md: 10 },
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 600,
                  lineHeight: 1.2,
                  mb: 3,
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                }}
              >
                Your next career move starts here
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  fontWeight: 400,
                  mb: 4,
                  opacity: 0.8,
                  maxWidth: "500px",
                  lineHeight: 1.6,
                }}
              >
                We're not just another job board. We help you discover opportunities that actually align with who you are and where you want to go.
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Button
                  component={Link}
                  to="/jobs"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowIcon />}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: 0,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  Browse Jobs
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#fff",
                    color: "#fff",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: 0,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#fff",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ mb: 8, textAlign: "left" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.8rem" },
              fontWeight: 600,
              mb: 3,
              color: "#000",
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Everything you need to land your dream job
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.2rem",
              color: "#666",
              maxWidth: "600px",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            No fluff, no false promises. Just the tools and insights you need to make smarter career decisions.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 0,
                  boxShadow: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                    borderColor: "#000",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: "#000",
                      fontSize: "1.2rem",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#666",
                      lineHeight: 1.6,
                      fontSize: "1rem",
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box
          sx={{
            mt: 10,
            py: { xs: 6, md: 8 },
            backgroundColor: "#000",
            textAlign: "center",
            borderRadius: 0,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 600,
              color: "#fff",
              mb: 3,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Ready to take the next step?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.2rem",
              color: "rgba(255, 255, 255, 0.8)",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
              fontWeight: 400,
            }}
          >
            Join thousands of professionals who've found their perfect career match through JobSpring.
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            endIcon={<ArrowIcon />}
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 500,
              borderRadius: 0,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Start Your Journey
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;