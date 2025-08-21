import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600, mb: 4 }}
      >
        Dashboard
      </Typography>

      <Box sx={{ textAlign: "center", mt: 8 }}>
        <DashboardIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Dashboard coming soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your applications, profile views, and career progress
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
