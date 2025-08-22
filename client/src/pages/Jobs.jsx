import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import { LocationOn, Work, Business } from "@mui/icons-material";
import { fetchJobs } from "../redux/slices/jobSlice";
import { createApplicationForJob } from "../redux/slices/applicationSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { loading: applyLoading } = useSelector((state) => state.applications);

  const [selectedJob, setSelectedJob] = useState(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState("");

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleApplyClick = (job) => {
    if (!isAuthenticated) {
      alert("Please login to apply for jobs");
      return;
    }
    setSelectedJob(job);
    setApplyDialogOpen(true);
    setCoverLetter("");
    setApplyError("");
    setApplySuccess("");
  };

  const handleApplySubmit = async () => {
    if (!coverLetter.trim()) {
      setApplyError("Please write a cover letter");
      return;
    }

    try {
      await dispatch(
        createApplicationForJob({
          jobId: selectedJob.id,
          applicationData: {
            status: "applied",
            coverLetter: coverLetter,
          },
        })
      ).unwrap();

      setApplySuccess("Application submitted successfully!");
      setTimeout(() => {
        setApplyDialogOpen(false);
        setApplySuccess("");
      }, 2000);
    } catch (error) {
      setApplyError(error || "Failed to submit application");
    }
  };

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
        Job Opportunities
      </Typography>

      {jobs.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Work sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No jobs available at the moment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check back later for new opportunities
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={job.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {job.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Business
                      sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {job.company?.name || "Company Name"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocationOn
                      sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {job.description?.substring(0, 100)}...
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {job.skills?.slice(0, 3).map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ textTransform: "none" }}
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Apply Dialog */}
      <Dialog
        open={applyDialogOpen}
        onClose={() => setApplyDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
        <DialogContent>
          {applyError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {applyError}
            </Alert>
          )}
          {applySuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {applySuccess}
            </Alert>
          )}

          <Typography variant="body2" sx={{ mb: 2 }}>
            At {selectedJob?.company?.name} • {selectedJob?.location}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={6}
            label="Cover Letter"
            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            disabled={applyLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setApplyDialogOpen(false)}
            disabled={applyLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApplySubmit}
            variant="contained"
            disabled={applyLoading || !coverLetter.trim()}
            startIcon={applyLoading && <CircularProgress size={20} />}
          >
            {applyLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Jobs;
