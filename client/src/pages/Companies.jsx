import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Business, Language, LocationOn } from "@mui/icons-material";
import { fetchCompanies } from "../redux/slices/companySlice";

const Companies = () => {
  const dispatch = useDispatch();
  const { companies, loading } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600, mb: 4 }}
      >
        Companies
      </Typography>

      {companies.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Business sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No companies available at the moment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check back later for new companies
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {companies.map((company) => (
            <Grid item xs={12} md={6} lg={4} key={company.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Business sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h6" component="h2">
                      {company.name}
                    </Typography>
                  </Box>

                  {company.location && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <LocationOn
                        sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {company.location}
                      </Typography>
                    </Box>
                  )}

                  {company.website && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Language
                        sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                      />
                      <MuiLink
                        href={company.website}
                        target="_blank"
                        rel="noopener"
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Visit Website
                      </MuiLink>
                    </Box>
                  )}

                  <Typography variant="body2" sx={{ mb: 3 }}>
                    {company.description || "No description available"}
                  </Typography>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ textTransform: "none", mt: "auto" }}
                    onClick={() => {
                      // Navigate to company jobs or details
                      console.log("View company details:", company.id);
                    }}
                  >
                    View Jobs
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Companies;
