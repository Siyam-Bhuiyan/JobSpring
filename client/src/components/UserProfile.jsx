import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  InputAdornment
} from '@mui/material';
import {
  PhotoCamera,
  CloudUpload,
  Delete,
  Save,
  Person,
  School,
  Work,
  LocationOn,
  Phone,
  Language,
  LinkedIn,
  GitHub,
  Twitter
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyProfile,
  updateProfile,
  uploadProfilePicture,
  uploadCV,
  deleteProfilePicture,
  deleteCV,
  clearProfileError,
  clearProfileMessage
} from '../store/slices/profileSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error, message } = useSelector((state) => state.profile);
  
  const [formData, setFormData] = useState({
    phone: '',
    location: '',
    university: '',
    degree: '',
    graduationYear: null,
    experience: '',
    skills: '',
    bio: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    twitterUrl: ''
  });
  
  const [skillsArray, setSkillsArray] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  
  useEffect(() => {
    if (profile && profile.id) {
      setFormData({
        phone: profile.phone || '',
        location: profile.location || '',
        university: profile.university || '',
        degree: profile.degree || '',
        graduationYear: profile.graduationYear || null,
        experience: profile.experience || '',
        skills: profile.skills || '',
        bio: profile.bio || '',
        portfolioUrl: profile.portfolioUrl || '',
        linkedinUrl: profile.linkedinUrl || '',
        githubUrl: profile.githubUrl || '',
        twitterUrl: profile.twitterUrl || ''
      });
      
      if (profile.skills) {
        setSkillsArray(profile.skills.split(',').map(skill => skill.trim()).filter(skill => skill));
      }
    }
  }, [profile]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !skillsArray.includes(skillInput.trim())) {
      const newSkillsArray = [...skillsArray, skillInput.trim()];
      setSkillsArray(newSkillsArray);
      setFormData(prev => ({
        ...prev,
        skills: newSkillsArray.join(', ')
      }));
      setSkillInput('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove) => {
    const newSkillsArray = skillsArray.filter(skill => skill !== skillToRemove);
    setSkillsArray(newSkillsArray);
    setFormData(prev => ({
      ...prev,
      skills: newSkillsArray.join(', ')
    }));
  };
  
  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };
  
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadProfilePicture(file));
    }
  };
  
  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadCV(file));
    }
  };
  
  const handleDeleteProfilePicture = () => {
    dispatch(deleteProfilePicture());
  };
  
  const handleDeleteCV = () => {
    dispatch(deleteCV());
  };
  
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearProfileMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearProfileError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);
  
  if (loading && !profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {/* Profile Picture and CV Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={profile?.profilePictureUrl}
                sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
              >
                <Person sx={{ fontSize: 60 }} />
              </Avatar>
              
              <Box sx={{ mb: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-picture-upload"
                  type="file"
                  onChange={handleProfilePictureUpload}
                />
                <label htmlFor="profile-picture-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                    sx={{ mr: 1 }}
                    disabled={loading}
                  >
                    Upload Photo
                  </Button>
                </label>
                
                {profile?.profilePictureUrl && (
                  <IconButton
                    color="error"
                    onClick={handleDeleteProfilePicture}
                    disabled={loading}
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                CV/Resume
              </Typography>
              
              {profile?.cvUrl ? (
                <Box>
                  <Button
                    variant="outlined"
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    View Current CV
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteCV}
                    startIcon={<Delete />}
                    disabled={loading}
                  >
                    Delete CV
                  </Button>
                </Box>
              ) : (
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  No CV uploaded
                </Typography>
              )}
              
              <Box sx={{ mt: 2 }}>
                <input
                  accept=".pdf"
                  style={{ display: 'none' }}
                  id="cv-upload"
                  type="file"
                  onChange={handleCVUpload}
                />
                <label htmlFor="cv-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUpload />}
                    disabled={loading}
                  >
                    Upload CV
                  </Button>
                </label>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Profile Form Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Contact Information */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <Person sx={{ mr: 1 }} />
                      Contact Information
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOn />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  {/* Education */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <School sx={{ mr: 1 }} />
                      Education
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="University"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Graduation Year"
                      name="graduationYear"
                      type="number"
                      value={formData.graduationYear || ''}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  
                  {/* Experience */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Work sx={{ mr: 1 }} />
                      Experience
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Work Experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
                      placeholder="Describe your work experience..."
                    />
                  </Grid>
                  
                  {/* Skills */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Skills
                    </Typography>
                    <TextField
                      fullWidth
                      label="Add Skill"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={handleSkillKeyPress}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button onClick={handleAddSkill} disabled={!skillInput.trim()}>
                              Add
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ mt: 1 }}>
                      {skillsArray.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          onDelete={() => handleRemoveSkill(skill)}
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  </Grid>
                  
                  {/* Bio */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  </Grid>
                  
                  {/* Social Links */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Language sx={{ mr: 1 }} />
                      Social Links
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Portfolio URL"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Language />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="LinkedIn URL"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkedIn />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="GitHub URL"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <GitHub />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Twitter URL"
                      name="twitterUrl"
                      value={formData.twitterUrl}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Twitter />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Save />}
                      disabled={loading}
                      sx={{ mt: 2 }}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Save Profile'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
